import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import Category from '@/models/Category';
import { authenticateToken } from '@/lib/authMiddleware';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { validateProduct, ValidationException } from '@/lib/validation';

// GET: Fetch all products
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
    
    // Ensure Category model is registered before populate
    Category;
    
    const products = await Product.find({})
      .populate({
        path: 'categoryId',
        select: 'name',
        strictPopulate: false
      })
      .sort({ createdAt: -1 })
      .lean();

    // Filter out products with missing categories and format response
    const validProducts = products.filter(product => product.categoryId);

    return NextResponse.json({
      success: true,
      products: validProducts,
    });
  } catch (error: any) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST: Create new product with image upload
export async function POST(request: NextRequest) {
  try {
    const user = authenticateToken(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid or missing token' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const name = formData.get('name') as string;
    const price = formData.get('price') as string;
    const description = formData.get('description') as string;
    const categoryId = formData.get('categoryId') as string;
    const stock = formData.get('stock') as string;
    const imageFile = formData.get('image') as File;

    // Validate product data
    const validationErrors = validateProduct({
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
      categoryId,
    });

    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          errors: validationErrors,
        },
        { status: 400 }
      );
    }

    if (!imageFile) {
      return NextResponse.json(
        { error: 'Product image is required' },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uploadResult = await uploadToCloudinary(buffer, 'smart-ecom/products');

    await connectDB();

    const product = await Product.create({
      name: name.trim(),
      price: parseFloat(price),
      description: description?.trim() || '',
      categoryId,
      image: uploadResult.secure_url,
      stock: parseInt(stock) || 0,
    });

    const populatedProduct = await Product.findById(product._id).populate('categoryId', 'name');

    return NextResponse.json(
      {
        success: true,
        product: populatedProduct,
        message: 'Product created successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Product creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}
