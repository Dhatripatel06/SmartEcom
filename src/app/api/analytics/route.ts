import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import Order from '@/models/Order';
import { authenticateToken } from '@/lib/authMiddleware';

// GET: Fetch comprehensive analytics data
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

    // Ensure models are registered
    Product;

    // Get basic counts
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Calculate total revenue with validation
    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' },
          avgOrderValue: { $avg: '$totalAmount' },
          maxOrderValue: { $max: '$totalAmount' },
          minOrderValue: { $min: '$totalAmount' }
        }
      }
    ]);
    const totalRevenue = revenueResult[0]?.totalRevenue || 0;
    const avgOrderValue = revenueResult[0]?.avgOrderValue || 0;

    // Get monthly sales data using aggregation (last 12 months)
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const monthlySales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: twelveMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          month: '$_id.month',
          revenue: { $round: ['$revenue', 2] },
          orders: 1,
          monthName: {
            $concat: [
              {
                $arrayElemAt: [
                  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                  { $subtract: ['$_id.month', 1] }
                ]
              },
              ' ',
              { $toString: '$_id.year' }
            ]
          }
        }
      }
    ]);

    // Get recent orders (last 5)
    const recentOrders = await Order.find({})
      .populate({
        path: 'products.productId',
        select: 'name price',
        strictPopulate: false
      })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // Get order status breakdown
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const statusBreakdown = {
      pending: 0,
      shipped: 0,
      delivered: 0
    };

    ordersByStatus.forEach((item: any) => {
      if (item._id in statusBreakdown) {
        statusBreakdown[item._id as keyof typeof statusBreakdown] = item.count;
      }
    });

    // Get top products by order frequency
    const topProducts = await Order.aggregate([
      { $unwind: '$products' },
      {
        $group: {
          _id: '$products.productId',
          totalQuantity: { $sum: '$products.qty' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      { $unwind: { path: '$productDetails', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          name: '$productDetails.name',
          totalQuantity: 1,
          orderCount: 1
        }
      }
    ]);

    return NextResponse.json({
      success: true,
      analytics: {
        overview: {
          totalProducts,
          totalOrders,
          totalRevenue: Math.round(totalRevenue * 100) / 100, // Round to 2 decimals
          avgOrderValue: Math.round(avgOrderValue * 100) / 100,
        },
        monthlySales,
        recentOrders,
        statusBreakdown,
        topProducts: topProducts.filter(p => p.name), // Filter out products without details
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics', details: error.message },
      { status: 500 }
    );
  }
}
