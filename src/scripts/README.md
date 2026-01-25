# Database Seed Script

## 📋 Overview

This seed script populates the Smart E-Commerce Admin Dashboard with realistic test data for development and demonstration purposes.

## 🎯 What Gets Seeded

### Users (3 total)
- **Admin Account**
  - Email: `admin@smartecom.com`
  - Password: `admin123`
  - Role: `admin`

- **Staff Accounts (2)**
  - `john@smartecom.com` / `staff123` (staff)
  - `sarah@smartecom.com` / `staff123` (staff)

### Categories (4 total)
- Electronics
- Fashion
- Home & Kitchen
- Books

### Products (12 total)
| Product | Category | Price | Stock |
|---------|----------|-------|-------|
| Wireless Headphones | Electronics | $79.99 | 45 |
| Smart Watch | Electronics | $199.99 | 32 |
| Laptop Stand | Electronics | $39.99 | 78 |
| Men's Running Shoes | Fashion | $89.99 | 56 |
| Women's Leather Jacket | Fashion | $149.99 | 23 |
| Designer Sunglasses | Fashion | $129.99 | 41 |
| Coffee Maker | Home & Kitchen | $69.99 | 34 |
| Air Fryer | Home & Kitchen | $99.99 | 28 |
| Decorative Throw Pillows | Home & Kitchen | $24.99 | 67 |
| JavaScript: The Definitive Guide | Books | $49.99 | 52 |
| The Art of Computer Programming | Books | $199.99 | 15 |
| Clean Code | Books | $39.99 | 44 |

### Orders (8 total)
- Mixed statuses: `pending`, `shipped`, `delivered`
- Realistic customer data
- Multiple products per order
- Calculated total amounts
- Historical dates (1-20 days ago)

## 🚀 How to Run

### Prerequisites
Make sure you have:
- MongoDB connection string in `.env.local`
- Node.js installed
- All dependencies installed

### Step 1: Install Dependencies
```bash
npm install
```

This will install `tsx` and `dotenv` needed for the seed script.

### Step 2: Run the Seed Script
```bash
npm run seed
```

### Expected Output
```
🌱 Starting database seeding...

📡 Connecting to MongoDB...
✅ Connected to MongoDB

🗑️  Clearing existing collections...
✅ Collections cleared successfully

👤 Seeding users...
✅ Created 3 users:
   - admin@smartecom.com (admin)
   - john@smartecom.com (staff)
   - sarah@smartecom.com (staff)

📁 Seeding categories...
✅ Created 4 categories:
   - Electronics
   - Fashion
   - Home & Kitchen
   - Books

📦 Seeding products...
✅ Created 12 products:
   - Wireless Headphones ($79.99) - Stock: 45
   - Smart Watch ($199.99) - Stock: 32
   ...

🛍️  Seeding orders...
✅ Created 8 orders:
   - Alice Johnson ($199.97) - delivered
   - Bob Smith ($289.98) - shipped
   ...

==================================================
🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!
==================================================

📊 Summary:
   - Users: 3
   - Categories: 4
   - Products: 12
   - Orders: 8

✅ You can now:
   - Login as: admin@smartecom.com / admin123
   - View products in the dashboard
   - Check orders and analytics
   - Test all CRUD operations
```

## ⚠️ Important Notes

### Safety Features
- **Clears existing data**: The script deletes all existing users, categories, products, and orders before seeding
- **Run in development only**: Do NOT run this on production databases
- **Idempotent**: Can be run multiple times safely

### Environment Variables
Make sure `.env.local` contains:
```env
MONGODB_URI=your_mongodb_connection_string
```

### Password Hashing
- All user passwords are automatically hashed using bcrypt
- Uses the User model's pre-save hook
- Secure authentication ready

## 🔄 Re-seeding

To refresh your database with clean data:

```bash
npm run seed
```

This will:
1. Clear all existing data
2. Create fresh seed data
3. Reset all relationships
4. Generate new IDs

## 🧪 Testing After Seeding

### 1. Test Authentication
```bash
# Login as admin
Email: admin@smartecom.com
Password: admin123
```

### 2. Verify Data in Dashboard
- Navigate to `/dashboard`
- Check **Products** page (should show 12 products)
- Check **Orders** page (should show 8 orders)
- Check **Categories** page (should show 4 categories)
- Check **Users** page (should show 3 users)

### 3. Verify Analytics
- Navigate to `/dashboard/analytics`
- Should see charts with real data
- Monthly sales totals
- Order status breakdown
- Top products

### 4. Test CRUD Operations
- Create a new product
- Edit existing product
- Delete a product
- Update order status

## 🛠️ Customization

To modify seed data, edit `src/scripts/seed.ts`:

### Add More Products
```typescript
const products = [
  // Add new product
  {
    name: 'New Product',
    price: 99.99,
    description: 'Product description',
    category: 'Electronics', // Must match existing category
    image: 'https://...',
    stock: 50,
  },
  // ... existing products
];
```

### Add More Orders
```typescript
const orders = [
  // Add new order
  {
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    productNames: ['Product 1', 'Product 2'], // Must match product names
    quantities: [2, 1],
    status: 'pending',
    daysAgo: 3,
  },
  // ... existing orders
];
```

## 📝 Script Features

- ✅ TypeScript with full type safety
- ✅ Async/await error handling
- ✅ Proper database connection
- ✅ Console logging with emojis
- ✅ Relationship management
- ✅ Realistic test data
- ✅ Clean exit handling
- ✅ Environment variable support

## 🐛 Troubleshooting

### Error: "Cannot connect to MongoDB"
- Check your `MONGODB_URI` in `.env.local`
- Verify MongoDB is running
- Check network connection

### Error: "Module not found"
```bash
# Install missing dependencies
npm install tsx dotenv --save-dev
```

### Error: "Duplicate key error"
- The script clears collections first, but if it fails:
```bash
# Manually clear collections in MongoDB Compass or CLI
db.users.deleteMany({})
db.categories.deleteMany({})
db.products.deleteMany({})
db.orders.deleteMany({})
```

## 📚 Related Documentation

- [MongoDB Setup](../README.md#database-setup)
- [Environment Variables](../README.md#environment-variables)
- [User Management](../README.md#week-7-users-management)

## 🎓 For Academic Reviewers

This seed script demonstrates:
- Database design and relationships
- Data modeling best practices
- TypeScript usage
- Error handling
- Code organization
- Realistic test data generation

After running the seed, all features can be tested without manual data entry.
