import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Category from '@/models/Category';
import { authenticateToken } from '@/lib/authMiddleware';
import { validateCategory } from '@/lib/validation';

// GET: Fetch all categories
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
    const categories = await Category.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST: Create new category
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
    const { name, description } = body;

    // Validate category data
    const validationErrors = validateCategory({ name, description });

    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          errors: validationErrors,
        },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if category already exists
    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this name already exists' },
        { status: 409 }
      );
    }

    const category = await Category.create({
      name: name.trim(),
      description: description?.trim() || '',
    });

    return NextResponse.json(
      {
        success: true,
        category,
        message: 'Category created successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create category' },
      { status: 500 }
    );
  }
}
