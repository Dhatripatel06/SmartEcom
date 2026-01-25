import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), '.env.local') });

// Import models
import User from '../models/User';
import Category from '../models/Category';
import Product from '../models/Product';
import Order from '../models/Order';

// ========================
// DATABASE CONNECTION
// ========================

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.error('❌ ERROR: MONGODB_URI environment variable is not defined');
  console.error('Please check your .env.local file');
  process.exit(1);
}

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}

// ========================
// SEED DATA
// ========================

const users = [
  {
    name: 'Admin User',
    email: 'admin@smartecom.com',
    password: 'admin123',
    role: 'admin' as const,
  },
  {
    name: 'John Staff',
    email: 'john@smartecom.com',
    password: 'staff123',
    role: 'staff' as const,
  },
  {
    name: 'Sarah Staff',
    email: 'sarah@smartecom.com',
    password: 'staff123',
    role: 'staff' as const,
  },
];

const categories = [
  {
    name: 'Electronics',
    description: 'Electronic devices, gadgets, and accessories',
  },
  {
    name: 'Fashion',
    description: 'Clothing, shoes, and fashion accessories',
  },
  {
    name: 'Home & Kitchen',
    description: 'Home decor, kitchen appliances, and furniture',
  },
  {
    name: 'Books',
    description: 'Books, magazines, and educational materials',
  },
];

const products = [
  {
    name: 'Wireless Headphones',
    price: 79.99,
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life',
    category: 'Electronics',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/headphones.jpg',
    stock: 45,
  },
  {
    name: 'Smart Watch',
    price: 199.99,
    description: 'Fitness tracker with heart rate monitor, GPS, and water resistance',
    category: 'Electronics',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/smartwatch.jpg',
    stock: 32,
  },
  {
    name: 'Laptop Stand',
    price: 39.99,
    description: 'Ergonomic aluminum laptop stand with adjustable height',
    category: 'Electronics',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/laptop-stand.jpg',
    stock: 78,
  },
  {
    name: 'Men\'s Running Shoes',
    price: 89.99,
    description: 'Lightweight running shoes with breathable mesh and cushioned sole',
    category: 'Fashion',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/running-shoes.jpg',
    stock: 56,
  },
  {
    name: 'Women\'s Leather Jacket',
    price: 149.99,
    description: 'Genuine leather jacket with classic design and multiple pockets',
    category: 'Fashion',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/leather-jacket.jpg',
    stock: 23,
  },
  {
    name: 'Designer Sunglasses',
    price: 129.99,
    description: 'UV protection sunglasses with polarized lenses',
    category: 'Fashion',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/sunglasses.jpg',
    stock: 41,
  },
  {
    name: 'Coffee Maker',
    price: 69.99,
    description: 'Programmable coffee maker with thermal carafe and auto-brew feature',
    category: 'Home & Kitchen',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/coffee-maker.jpg',
    stock: 34,
  },
  {
    name: 'Air Fryer',
    price: 99.99,
    description: 'Digital air fryer with 8 preset cooking functions and non-stick basket',
    category: 'Home & Kitchen',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/air-fryer.jpg',
    stock: 28,
  },
  {
    name: 'Decorative Throw Pillows',
    price: 24.99,
    description: 'Set of 2 cotton throw pillows with modern geometric patterns',
    category: 'Home & Kitchen',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/throw-pillows.jpg',
    stock: 67,
  },
  {
    name: 'JavaScript: The Definitive Guide',
    price: 49.99,
    description: 'Comprehensive guide to JavaScript programming for developers',
    category: 'Books',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/js-book.jpg',
    stock: 52,
  },
  {
    name: 'The Art of Computer Programming',
    price: 199.99,
    description: 'Classic computer science textbook series by Donald Knuth',
    category: 'Books',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/cs-book.jpg',
    stock: 15,
  },
  {
    name: 'Clean Code',
    price: 39.99,
    description: 'A handbook of agile software craftsmanship',
    category: 'Books',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/clean-code.jpg',
    stock: 44,
  },
];

const orders = [
  {
    customerName: 'Alice Johnson',
    customerEmail: 'alice.johnson@example.com',
    productNames: ['Wireless Headphones', 'Laptop Stand'],
    quantities: [2, 1],
    status: 'delivered' as const,
    daysAgo: 15,
  },
  {
    customerName: 'Bob Smith',
    customerEmail: 'bob.smith@example.com',
    productNames: ['Smart Watch', 'Men\'s Running Shoes'],
    quantities: [1, 1],
    status: 'shipped' as const,
    daysAgo: 5,
  },
  {
    customerName: 'Carol Davis',
    customerEmail: 'carol.davis@example.com',
    productNames: ['Women\'s Leather Jacket', 'Designer Sunglasses'],
    quantities: [1, 2],
    status: 'delivered' as const,
    daysAgo: 20,
  },
  {
    customerName: 'David Wilson',
    customerEmail: 'david.wilson@example.com',
    productNames: ['Coffee Maker', 'Air Fryer', 'Decorative Throw Pillows'],
    quantities: [1, 1, 2],
    status: 'pending' as const,
    daysAgo: 2,
  },
  {
    customerName: 'Emma Brown',
    customerEmail: 'emma.brown@example.com',
    productNames: ['JavaScript: The Definitive Guide', 'Clean Code'],
    quantities: [2, 1],
    status: 'shipped' as const,
    daysAgo: 7,
  },
  {
    customerName: 'Frank Miller',
    customerEmail: 'frank.miller@example.com',
    productNames: ['Smart Watch', 'Wireless Headphones'],
    quantities: [1, 1],
    status: 'delivered' as const,
    daysAgo: 12,
  },
  {
    customerName: 'Grace Lee',
    customerEmail: 'grace.lee@example.com',
    productNames: ['Air Fryer', 'Coffee Maker'],
    quantities: [2, 1],
    status: 'pending' as const,
    daysAgo: 1,
  },
  {
    customerName: 'Henry Taylor',
    customerEmail: 'henry.taylor@example.com',
    productNames: ['The Art of Computer Programming', 'Laptop Stand'],
    quantities: [1, 1],
    status: 'shipped' as const,
    daysAgo: 4,
  },
];

// ========================
// SEED FUNCTIONS
// ========================

async function clearCollections() {
  console.log('🗑️  Clearing existing collections...');
  
  await User.deleteMany({});
  await Category.deleteMany({});
  await Product.deleteMany({});
  await Order.deleteMany({});
  
  console.log('✅ Collections cleared successfully');
}

async function seedUsers() {
  console.log('\n👤 Seeding users...');
  
  // Use .save() instead of .insertMany() to trigger password hashing
  const createdUsers = [];
  for (const userData of users) {
    const user = new User(userData);
    await user.save();
    createdUsers.push(user);
  }
  
  console.log(`✅ Created ${createdUsers.length} users:`);
  createdUsers.forEach(user => {
    console.log(`   - ${user.email} (${user.role})`);
  });
  
  return createdUsers;
}

async function seedCategories() {
  console.log('\n📁 Seeding categories...');
  
  const createdCategories = await Category.insertMany(categories);
  
  console.log(`✅ Created ${createdCategories.length} categories:`);
  createdCategories.forEach(category => {
    console.log(`   - ${category.name}`);
  });
  
  return createdCategories;
}

async function seedProducts(categoryMap: Map<string, mongoose.Types.ObjectId>) {
  console.log('\n📦 Seeding products...');
  
  const productsToCreate = products.map(product => ({
    name: product.name,
    price: product.price,
    description: product.description,
    categoryId: categoryMap.get(product.category)!,
    image: product.image,
    stock: product.stock,
  }));
  
  const createdProducts = await Product.insertMany(productsToCreate);
  
  console.log(`✅ Created ${createdProducts.length} products:`);
  createdProducts.forEach(product => {
    console.log(`   - ${product.name} ($${product.price}) - Stock: ${product.stock}`);
  });
  
  return createdProducts;
}

async function seedOrders(productMap: Map<string, any>) {
  console.log('\n🛍️  Seeding orders...');
  
  const ordersToCreate = orders.map(order => {
    // Calculate products array and total amount
    const orderProducts = order.productNames.map((productName, index) => {
      const product = productMap.get(productName)!;
      return {
        productId: product._id,
        quantity: order.quantities[index],
      };
    });
    
    const totalAmount = order.productNames.reduce((sum, productName, index) => {
      const product = productMap.get(productName)!;
      return sum + (product.price * order.quantities[index]);
    }, 0);
    
    // Calculate createdAt date (days ago from now)
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - order.daysAgo);
    
    return {
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      products: orderProducts,
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      status: order.status,
      createdAt,
    };
  });
  
  const createdOrders = await Order.insertMany(ordersToCreate);
  
  console.log(`✅ Created ${createdOrders.length} orders:`);
  createdOrders.forEach(order => {
    console.log(`   - ${order.customerName} ($${order.totalAmount}) - ${order.status}`);
  });
  
  return createdOrders;
}

// ========================
// MAIN SEED FUNCTION
// ========================

async function seed() {
  try {
    console.log('🌱 Starting database seeding...\n');
    console.log('📡 Connecting to MongoDB...');
    
    await connectDB();
    console.log('✅ Connected to MongoDB\n');
    
    // Clear existing data
    await clearCollections();
    
    // Seed users
    await seedUsers();
    
    // Seed categories
    const createdCategories = await seedCategories();
    const categoryMap = new Map(
      createdCategories.map(cat => [cat.name, cat._id as mongoose.Types.ObjectId])
    );
    
    // Seed products
    const createdProducts = await seedProducts(categoryMap);
    const productMap = new Map(
      createdProducts.map(prod => [prod.name, prod])
    );
    
    // Seed orders
    await seedOrders(productMap);
    
    console.log('\n' + '='.repeat(50));
    console.log('🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('='.repeat(50));
    console.log('\n📊 Summary:');
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Categories: ${categories.length}`);
    console.log(`   - Products: ${products.length}`);
    console.log(`   - Orders: ${orders.length}`);
    console.log('\n✅ You can now:');
    console.log('   - Login as: admin@smartecom.com / admin123');
    console.log('   - View products in the dashboard');
    console.log('   - Check orders and analytics');
    console.log('   - Test all CRUD operations\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ ERROR: Seeding failed!');
    console.error(error);
    process.exit(1);
  }
}

// Run the seed function
seed();
