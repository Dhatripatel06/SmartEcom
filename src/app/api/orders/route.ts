import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { authenticateToken } from '@/lib/authMiddleware';

// GET: Fetch all orders
export async function GET(request: NextRequest) {
  try {
    const user = authenticateToken(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid or missing token' },
        { status: 401 }
      );
    }

    await connectDB();
    
    // Ensure Product model is registered before populate
    Product;
    
    const orders = await Order.find({})
      .populate({
        path: 'products.productId',
        select: 'name price image',
        strictPopulate: false
      })
      .sort({ createdAt: -1 })
      .lean();

    // Filter out orders with missing product references
    const validOrders = orders.filter(order => 
      order.products.every((p: any) => p.productId)
    );

    return NextResponse.json(validOrders, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders', details: error.message },
      { status: 500 }
    );
  }
}

// POST: Create new order
export async function POST(request: NextRequest) {
  try {
    const user = authenticateToken(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid or missing token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { customerName, customerEmail, products, totalAmount, status } = body;

    // Validation
    if (!customerName || customerName.trim() === '') {
      return NextResponse.json(
        { error: 'Customer name is required' },
        { status: 400 }
      );
    }

    if (!customerEmail || customerEmail.trim() === '') {
      return NextResponse.json(
        { error: 'Customer email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: 'At least one product is required' },
        { status: 400 }
      );
    }

    // Validate each product
    for (const product of products) {
      if (!product.productId) {
        return NextResponse.json(
          { error: 'Product ID is required for each product' },
          { status: 400 }
        );
      }
      if (!product.quantity || product.quantity < 1) {
        return NextResponse.json(
          { error: 'Valid quantity is required for each product' },
          { status: 400 }
        );
      }
    }

    if (totalAmount === undefined || totalAmount < 0) {
      return NextResponse.json(
        { error: 'Valid total amount is required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Verify all products exist
    const productIds = products.map((p: any) => p.productId);
    const existingProducts = await Product.find({ _id: { $in: productIds } });
    
    if (existingProducts.length !== productIds.length) {
      return NextResponse.json(
        { error: 'One or more products not found' },
        { status: 404 }
      );
    }

    // Create order
    const order = await Order.create({
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      products,
      totalAmount,
      status: status || 'pending',
    });

    // Populate product details in response
    const populatedOrder = await Order.findById(order._id).populate({
      path: 'products.productId',
      select: 'name price image',
    });

    return NextResponse.json(populatedOrder, { status: 201 });
  } catch (error: any) {
    console.error('Error creating order:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create order', details: error.message },
      { status: 500 }
    );
  }
}
