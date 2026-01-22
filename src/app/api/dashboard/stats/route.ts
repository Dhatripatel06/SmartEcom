import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import { authenticateToken } from '@/lib/authMiddleware';

// GET: Fetch dashboard statistics
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

    // Get product statistics
    const totalProducts = await Product.countDocuments();
    const inStockProducts = await Product.countDocuments({ stock: { $gt: 10 } });
    const lowStockProducts = await Product.countDocuments({ stock: { $gt: 0, $lte: 10 } });
    const outOfStockProducts = await Product.countDocuments({ stock: 0 });

    // Calculate total inventory value
    const products = await Product.find({});
    const totalInventoryValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);

    // Placeholder values for orders and revenue (to be implemented in Week 4)
    const totalOrders = 0;
    const totalRevenue = 0;

    return NextResponse.json({
      success: true,
      stats: {
        products: {
          total: totalProducts,
          inStock: inStockProducts,
          lowStock: lowStockProducts,
          outOfStock: outOfStockProducts,
        },
        orders: {
          total: totalOrders,
        },
        revenue: {
          total: totalRevenue,
        },
        inventory: {
          totalValue: totalInventoryValue,
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
}
