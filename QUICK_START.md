# 🚀 Quick Start Guide

Get the Smart E-Commerce Admin Dashboard running in under 5 minutes!

## ⚡ Super Quick Setup

```bash
# 1. Clone and install
git clone <repository-url>
cd smart-ecom
npm install

# 2. Create environment file
cp .env.example .env.local

# 3. Add your MongoDB connection (edit .env.local)
MONGODB_URI=mongodb://localhost:27017/smart-ecom
# Or use MongoDB Atlas: mongodb+srv://user:pass@cluster.mongodb.net/smart-ecom

# 4. Seed database with test data
npm run seed

# 5. Start development server
npm run dev
```

## 🎯 Login to Dashboard

1. Open browser: [http://localhost:3000](http://localhost:3000)
2. Click **"Go to Dashboard"**
3. Login with seeded admin account:
   ```
   Email: admin@smartecom.com
   Password: admin123
   ```

## ✅ What You'll See

After seeding, the dashboard contains:
- 📊 **Dashboard** - Real statistics and charts
- 📦 **12 Products** - Across 4 categories (Electronics, Fashion, etc.)
- 🛍️ **8 Orders** - With various statuses (pending, shipped, delivered)
- 📁 **4 Categories** - Organized product categories
- 👥 **3 Users** - Admin and staff accounts
- 📈 **Analytics** - Charts with real MongoDB data

## 🎓 For First-Time Users

### Test the Features

1. **Browse Products** → `/dashboard/products`
   - See 12 seeded products
   - Try editing or deleting one
   - Create a new product

2. **Manage Orders** → `/dashboard/orders`
   - View 8 sample orders
   - Change order status
   - See total amounts calculated

3. **View Analytics** → `/dashboard/analytics`
   - Monthly sales chart
   - Order status breakdown
   - Top products pie chart

4. **Manage Users** → `/dashboard/users`
   - See all registered users
   - Update user roles (admin/staff)
   - Delete users

### Create Your Own Data

1. **Add Category**
   - Go to Categories page
   - Click "Add Category"
   - Enter name and description

2. **Add Product**
   - Go to Products page
   - Click "Add Product"
   - Fill form (name, price, stock, category)
   - Optionally upload image

3. **Add Order**
   - Go to Orders page
   - Click "Add Order"
   - Select products and quantities
   - Enter customer details

## 🔄 Reset Database

To clear all data and re-seed:

```bash
npm run seed
```

This is useful when you want to:
- Start fresh after testing
- Demo the application
- Fix data inconsistencies

## 🐛 Common Issues

### Error: "Cannot connect to MongoDB"
```bash
# Check MongoDB is running (local setup)
mongod

# OR verify MongoDB Atlas connection string in .env.local
```

### Error: "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

## 📚 Next Steps

- **Customize** - Modify seed data in `src/scripts/seed.ts`
- **Deploy** - Follow [Deployment Guide](README.md#deployment-vercel)
- **Learn** - Read [Full Documentation](README.md)
- **Extend** - Add new features and pages

## 🆘 Need Help?

- **Seed Script Details**: [src/scripts/README.md](src/scripts/README.md)
- **Full Documentation**: [README.md](README.md)
- **Project Review**: [FINAL_REVIEW_REPORT.md](FINAL_REVIEW_REPORT.md)

## 🎉 You're Ready!

The dashboard is now running with full test data. Explore all features and build something amazing!

**Pro Tip:** Keep the seed script handy - run `npm run seed` anytime you need fresh data for demos or testing.
