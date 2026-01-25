// Script to seed sample orders for testing
// Run with: node scripts/seed-orders.js

const mongoose = require('mongoose');

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://dhatripatel67_admin:2336232363@cluster0.trte4xq.mongodb.net/smart-ecom';

// Order Schema
const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
  }],
  totalAmount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

// Product Schema (to fetch existing products)
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  categoryId: mongoose.Schema.Types.ObjectId,
  image: String,
  stock: Number,
  createdAt: Date,
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

// Sample orders data
const sampleOrders = [
  {
    customerName: 'John Smith',
    customerEmail: 'john.smith@example.com',
    status: 'delivered',
  },
  {
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@example.com',
    status: 'shipped',
  },
  {
    customerName: 'Michael Brown',
    customerEmail: 'michael.brown@example.com',
    status: 'pending',
  },
  {
    customerName: 'Emily Davis',
    customerEmail: 'emily.davis@example.com',
    status: 'delivered',
  },
  {
    customerName: 'David Wilson',
    customerEmail: 'david.w@example.com',
    status: 'pending',
  },
  {
    customerName: 'Lisa Anderson',
    customerEmail: 'lisa.anderson@example.com',
    status: 'shipped',
  },
  {
    customerName: 'James Taylor',
    customerEmail: 'james.taylor@example.com',
    status: 'delivered',
  },
  {
    customerName: 'Jennifer Martinez',
    customerEmail: 'jennifer.m@example.com',
    status: 'pending',
  },
];

async function seedOrders() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    // Get all products
    console.log('Fetching products...');
    const products = await Product.find({});
    
    if (products.length === 0) {
      console.log('No products found. Please add products first before seeding orders.');
      process.exit(1);
    }

    console.log(`Found ${products.length} products`);

    // Delete existing orders (optional - comment out to keep existing)
    console.log('Clearing existing orders...');
    await Order.deleteMany({});

    // Create orders with random products
    console.log('Creating sample orders...');
    
    for (const orderData of sampleOrders) {
      // Select 1-3 random products for each order
      const numProducts = Math.floor(Math.random() * 3) + 1;
      const selectedProducts = [];
      let totalAmount = 0;

      for (let i = 0; i < numProducts; i++) {
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 items
        
        selectedProducts.push({
          productId: randomProduct._id,
          quantity: quantity,
        });
        
        totalAmount += randomProduct.price * quantity;
      }

      const order = await Order.create({
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail,
        products: selectedProducts,
        totalAmount: Math.round(totalAmount * 100) / 100, // Round to 2 decimals
        status: orderData.status,
      });

      console.log(`✓ Created order for ${order.customerName} - $${order.totalAmount} (${order.status})`);
    }

    console.log(`\n✅ Successfully created ${sampleOrders.length} orders!`);
    
    // Show summary
    const pending = await Order.countDocuments({ status: 'pending' });
    const shipped = await Order.countDocuments({ status: 'shipped' });
    const delivered = await Order.countDocuments({ status: 'delivered' });
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    console.log('\nOrder Summary:');
    console.log(`- Pending: ${pending}`);
    console.log(`- Shipped: ${shipped}`);
    console.log(`- Delivered: ${delivered}`);
    console.log(`- Total Revenue: $${totalRevenue[0]?.total.toFixed(2) || 0}`);

  } catch (error) {
    console.error('Error seeding orders:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  }
}

// Run the seed function
seedOrders();
