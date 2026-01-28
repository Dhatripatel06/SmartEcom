# Smart E-Commerce Admin Dashboard

A professional, production-ready admin dashboard for managing e-commerce operations. Built with Next.js 14, TypeScript, MongoDB, and JWT authentication.

## 🚀 Features

### Week 1 - Foundation ✅
- **Landing Page** - Professional homepage with feature highlights
- **Authentication UI** - Login and Signup pages with modern design
- **Dashboard Layout** - Persistent sidebar and navbar
- **Responsive Design** - Mobile-first approach with hamburger menu
- **Clean UI** - Enterprise-style interface with Tailwind CSS

### Week 2 - Authentication System ✅
- **MongoDB Integration** - Secure database with Mongoose ODM
- **User Management** - Registration and login with validation
- **JWT Authentication** - Secure token-based authentication (7-day expiry)
- **Password Hashing** - bcrypt encryption for user passwords
- **Protected Routes** - Dashboard accessible only after login
- **Session Persistence** - Auto-login on page refresh
- **Secure Logout** - Token cleanup and redirect

### Week 3 - Products & Categories CRUD ✅
- **Category Management** - Create and view product categories
- **Product CRUD** - Complete create, read, update, delete operations
- **Image Upload** - Cloudinary integration for product images
- **Category Relationships** - Products linked to categories with populate
- **Real-time Stats** - Live inventory tracking and stock alerts
- **Professional UI** - Table views with image thumbnails and detail modals
- **No Static Data** - All data fetched from MongoDB

### Week 4 - Order Management ✅
- **Order Model** - Customer info, products array, status tracking
- **Order CRUD API** - JWT-protected endpoints for order operations
- **Real-time Status Updates** - Instant order status changes (pending/shipped/delivered)
- **Order Details View** - Comprehensive modal with customer and product info
- **Product Population** - Orders display full product details with images
- **Dashboard Integration** - Order statistics and revenue tracking
- **Professional Admin UI** - Clean table layout with status badges

### Week 5 - Analytics & Dashboard ✅
- **MongoDB Aggregations** - Real-time data from database
  - Total products count
  - Total orders count
  - Total revenue calculation (sum of all orders)
  - Monthly sales breakdown (revenue + orders per month)
  - Order status distribution (pending/shipped/delivered)
  - Top products by quantity sold
  - Recent orders feed
- **Recharts Integration** - Interactive data visualization
  - Bar Chart: Monthly revenue trends
  - Line Chart: Sales performance over time
  - Pie Chart: Order status breakdown
- **Advanced Analytics Page** - Dedicated `/dashboard/analytics` route
  - Multiple chart types for comprehensive insights
  - Real-time data updates from MongoDB
  - Professional gradient cards for key metrics
- **Dashboard Stats** - Live statistics cards
  - Inventory value calculation
  - Stock level monitoring
  - Order pipeline tracking

### Week 6 - Production Polish ✅
- **Backend Validation**
  - Comprehensive validation utilities (`src/lib/validation.ts`)
  - Product validation: name (3-100 chars), price (0-1M), stock (≥0)
  - Category validation: name (2-50 chars), description (<500 chars)
  - Order validation: customer info, products array, total amount
  - User validation: email format, password strength (≥6 chars)
  - Structured error responses with field-level details
- **Frontend Validation & Feedback**
  - Toast notification system (success/error/info/warning)
  - Custom `useToast` hook for easy integration
  - Form validation with inline error messages
  - Loading states on all submit buttons
  - Disabled inputs during processing
- **Loading States**
  - Skeleton loaders for all data-heavy pages
  - TableSkeleton, CardSkeleton, ChartSkeleton components
  - Smooth pulse animations
  - Content-aware placeholders
- **Empty States**
  - Enhanced with SVG icons and CTAs
  - Specific variants: EmptyProducts, EmptyCategories, EmptyOrders
  - Actionable next steps for users
  - Professional empty state design
- **UI Polish**
  - Custom CSS animations (slide-in, pulse-subtle)
  - Consistent transitions (200-300ms)
  - Hover effects and scale animations
  - Mobile-first responsive design
  - Consistent color palette (#4F8CFF primary, #6C7CFF secondary)
- **Code Quality**
  - TypeScript strict mode
  - No console.logs in production code
  - Reusable component library
  - DRY principles applied
  - Production-ready error handling

### Week 7 - Users Management ✅
- **User CRUD API** - Complete user management endpoints
  - GET /api/users - List all users (JWT protected)
  - GET /api/users/[id] - Get single user
  - PUT /api/users/[id] - Update user role (admin/staff)
  - DELETE /api/users/[id] - Delete user
- **Users Admin Page** - `/dashboard/users`
  - View all registered users
  - Role management (admin/staff)
  - User statistics (total, admins, staff)
  - Delete users functionality
  - Real-time role updates
- **Role-Based Access** - User model includes role field
  - Admin role for full permissions
  - Staff role for basic access
  - Dropdown role selector in UI

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

| Requirement | Version | Download Link |
|------------|---------|---------------|
| **Node.js** | 18.0 or higher | [nodejs.org](https://nodejs.org) |
| **MongoDB** | 6.0 or higher | [mongodb.com/download](https://www.mongodb.com/try/download/community) |
| **npm** | 9.0 or higher | Included with Node.js |

**Optional:**
- **MongoDB Atlas Account** - For cloud-hosted database ([Sign up free](https://www.mongodb.com/cloud/atlas/register))
- **Cloudinary Account** - For image uploads ([Sign up free](https://cloudinary.com/users/register/free))

---

### Environment Variables

Create a `.env.local` file in the root directory and configure the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/smart-ecom

# JWT Authentication Secret (use a strong random string)
JWT_SECRET=your-super-secure-random-secret-key-change-this

# Cloudinary Configuration (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

**Important Notes:**
- **MONGODB_URI**: 
  - Local: `mongodb://localhost:27017/smart-ecom`
  - Atlas: `mongodb+srv://<username>:<password>@cluster.mongodb.net/smart-ecom`
- **JWT_SECRET**: Generate a secure random string (minimum 32 characters recommended)
- **Cloudinary Variables**: Optional, but required for product image uploads

---

### Installation Steps

Follow these steps to get the project running locally:

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd smart-ecom
```

#### 2. Install Dependencies
```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- TypeScript
- MongoDB & Mongoose
- Tailwind CSS
- Recharts (for analytics)
- bcryptjs (for password hashing)
- jsonwebtoken (for authentication)

#### 3. Configure Environment
```bash
# Create environment file
cp .env.example .env.local

# Edit .env.local with your actual values
```

#### 4. Verify MongoDB Connection

**Option A: Local MongoDB**
```bash
# Start MongoDB service
mongod

# Verify it's running (in another terminal)
mongosh
```

**Option B: MongoDB Atlas**
- Create a cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Get your connection string
- Update `MONGODB_URI` in `.env.local`

#### 5. Seed the Database

Run the seed script to populate your database with sample data:

```bash
npm run seed
```

**What gets seeded:**
- ✅ 3 Users (1 admin, 2 staff members)
- ✅ 4 Product Categories
- ✅ 12 Sample Products with images
- ✅ 8 Sample Orders with various statuses

**Default Admin Credentials:**
```
Email: admin@smartecom.com
Password: admin123
```

> 💡 **Tip:** The seed script is located at `src/scripts/seed.ts`. See [src/scripts/README.md](src/scripts/README.md) for more details.

⚠️ **Warning:** The seed script clears all existing data. Only use in development environments!

---

### Development Commands

#### Start Development Server
```bash
npm run dev
```
Opens at [http://localhost:3000](http://localhost:3000)

#### Build for Production
```bash
npm run build
```
Creates an optimized production build in `.next/` directory

#### Start Production Server
```bash
npm start
```
Runs the production build (requires `npm run build` first)

#### Run Seed Script
```bash
npm run seed
```
Populates database with test data

#### Type Checking
```bash
npm run type-check
```
Runs TypeScript compiler without emitting files

---

### Quick Start Guide

**Get up and running in 5 minutes:**

1. **Install & Configure**
   ```bash
   npm install
   cp .env.example .env.local
   # Edit .env.local with your MongoDB URI and JWT_SECRET
   ```

2. **Seed Database**
   ```bash
   npm run seed
   ```

3. **Start Development**
   ```bash
   npm run dev
   ```

4. **Login to Dashboard**
   - Navigate to [http://localhost:3000/login](http://localhost:3000/login)
   - Use credentials: `admin@smartecom.com` / `admin123`
   - Explore the dashboard!

---

## 📁 Project Structure

```
smart-ecom/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/route.ts          # Login API endpoint
│   │   │   │   └── signup/route.ts         # Signup API endpoint
│   │   │   ├── categories/route.ts         # Category CRUD
│   │   │   ├── products/
│   │   │   │   ├── route.ts                # Product list/create
│   │   │   │   └── [id]/route.ts           # Product update/delete
│   │   │   ├── orders/
│   │   │   │   ├── route.ts                # Order list/create
│   │   │   │   └── [id]/route.ts           # Order update/delete
│   │   │   └── dashboard/
│   │   │       └── stats/route.ts          # Real-time statistics
│   │   ├── dashboard/
│   │   │   ├── layout.tsx                  # Dashboard layout with protection
│   │   │   ├── page.tsx                    # Main dashboard with stats
│   │   │   ├── products/page.tsx           # Products management
│   │   │   ├── categories/page.tsx         # Categories management
│   │   │   └── orders/page.tsx             # Orders management
│   │   ├── login/page.tsx                  # Login page
│   │   ├── signup/page.tsx                 # Signup page
│   │   └── page.tsx                        # Landing page
│   ├── components/
│   │   ├── ProductForm.tsx                 # Product create/edit form
│   │   ├── Navbar.tsx                      # Top navigation bar
│   │   ├── ProtectedRoute.tsx              # Route protection wrapper
│   │   └── Sidebar.tsx                     # Side navigation menu
│   ├── lib/
│   │   ├── auth.ts                         # JWT utilities
│   │   ├── authMiddleware.ts               # JWT validation middleware
│   │   ├── cloudinary.ts                   # Cloudinary upload utilities
│   │   └── db.ts                           # MongoDB connection
│   ├── models/
│   │   ├── User.ts                         # User schema
│   │   ├── Category.ts                     # Category schema
│   │   ├── Product.ts                      # Product schema with refs
│   │   └── Order.ts                        # Order schema with products
│   └── styles/
│       └── globals.css                     # Global styles
├── scripts/
│   └── seed-orders.js                      # Sample order generator
├── .env.local                              # Environment variables
├── package.json                            # Dependencies
└── tailwind.config.ts                      # Custom color palette
```

## 🔐 Authentication Flow

1. **Signup** (`/signup`)
   - User provides name, email, password
   - Password hashed with bcrypt (10 salt rounds)
   - User saved to MongoDB
   - JWT token generated (7-day expiry)
   - Token stored in localStorage
   - Redirect to dashboard

2. **Login** (`/login`)
   - User provides email, password
   - Credentials validated against database
   - Password verified using bcrypt
   - JWT token generated
   - Token stored in localStorage
   - Redirect to dashboard

3. **Protected Routes**
   - `ProtectedRoute` component checks for valid token
   - Redirects to `/login` if unauthenticated
   - Shows loading state during validation

4. **Logout**
   - Clears token from localStorage
   - Removes user data
   - Redirects to login page

## 🎯 API Endpoints

### Authentication (Public)
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login existing user

### Categories (Protected)
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category

### Products (Protected)
- `GET /api/products` - Get all products with category populate
- `POST /api/products` - Create product (FormData with image upload)
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product (optional new image)
- `DELETE /api/products/[id]` - Delete product

### Orders (Protected)
- `GET /api/orders` - Get all orders with product populate
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get single order details
- `PUT /api/orders/[id]` - Update order status
- `DELETE /api/orders/[id]` - Delete order

### Dashboard (Protected)
- `GET /api/dashboard/stats` - Get real-time statistics
  - Product counts (total, in-stock, low-stock, out-of-stock)
  - Order counts (total, pending, shipped, delivered)
  - Revenue totals
  - Inventory value

## 📊 Database Models

### User Model
```typescript
{
  name: string (required)
  email: string (required, unique)
  password: string (required, hashed with bcrypt)
  role: enum ['admin', 'staff'] (default: 'staff')
  createdAt: Date
}
```

### Category Model
```typescript
{
  name: string (required, unique)
  description: string
  createdAt: Date
}
```

### Product Model
```typescript
{
  name: string (required)
  price: number (required, min: 0)
  description: string
  categoryId: ObjectId → Category (required)
  image: string (optional, Cloudinary URL)
  stock: number (default: 0, min: 0)
  createdAt: Date
}
```

### Order Model
```typescript
{
  customerName: string (required)
  customerEmail: string (required, validated)
  products: [{
    productId: ObjectId → Product (required)
    quantity: number (required, min: 1)
  }]
  totalAmount: number (required, min: 0)
  status: enum ['pending', 'shipped', 'delivered']
  createdAt: Date
}
```

## 🖼️ Image Upload (Cloudinary)

Week 3 introduced Cloudinary integration for product images:

**Setup:**
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Features:**
- Automatic image optimization (800x800, quality: auto)
- Secure uploads to `smart-ecom/products` folder
- Next.js Image component integration
- Old image deletion on update
- 5MB file size limit validation

## 📈 Dashboard Features

### Real-time Statistics
- **Products**: Total count, inventory value, stock levels
- **Orders**: Total orders, pending/shipped/delivered counts
- **Revenue**: Total revenue from all orders
- **Inventory**: Total value calculation from price × stock

### Quick Actions
- Add new product
- View all products
- Manage categories
- View orders

### Status Tracking
- Inventory health (in-stock, low-stock, out-of-stock)
- Order pipeline (pending → shipped → delivered)
- System health monitoring

## 🧪 Testing & Seeding

### Seed Sample Orders
```bash
node scripts/seed-orders.js
```

This script:
- Connects to MongoDB
- Fetches existing products
- Creates 8 sample orders with random products
- Assigns different statuses (pending/shipped/delivered)
- Shows summary with revenue totals

### Manual Testing Flow
1. **Run Seed Script** - `npm run seed` to populate database with test data
2. **Signup/Login** - Use `admin@smartecom.com / admin123` or create new account
3. **View Dashboard** - Check real-time stats (should show seeded data)
4. **Browse Products** - See 12 seeded products across 4 categories
5. **Manage Orders** - View 8 seeded orders, change statuses
6. **Test CRUD** - Create, edit, delete products/categories
7. **Analytics** - View charts with real seeded data
8. **Manage Users** - View users list, update roles (admin/staff)

**💡 Tip:** Run `npm run seed` anytime to reset database to clean state with fresh test data.

## 🚀 Deployment (Vercel)

### Prerequisites
- GitHub account with project repository
- Vercel account (free tier available at [vercel.com](https://vercel.com))
- MongoDB Atlas cluster (production database)

### Step 1: Prepare MongoDB Atlas for Production

1. **Login to MongoDB Atlas** ([cloud.mongodb.com](https://cloud.mongodb.com))
2. **Create Production Cluster** (if not exists)
   - Choose region closest to Vercel deployment
   - Select M0 Sandbox (free tier) or paid tier
3. **Configure Network Access**
   - Go to "Network Access" → "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - This is required for Vercel serverless functions
4. **Get Connection String**
   - Go to "Database" → "Connect" → "Connect your application"
   - Copy connection string (e.g., `mongodb+srv://username:password@cluster.mongodb.net/smart-ecom`)
   - Replace `<password>` with your actual password

### Step 2: Deploy to Vercel

#### Option A: Vercel Dashboard (Recommended)

1. **Push Code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import Project on Vercel**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   - In "Environment Variables" section, add:
   ```
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/smart-ecom
   JWT_SECRET = your-production-secret-minimum-32-characters-long
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = your_cloud_name
   CLOUDINARY_API_KEY = your_api_key
   CLOUDINARY_API_SECRET = your_api_secret
   ```
   - **IMPORTANT**: Use a strong, unique JWT_SECRET for production
   - Generate with: `openssl rand -base64 32`

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build completion
   - Your app will be live at `https://your-project.vercel.app`

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variables
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_API_KEY
vercel env add CLOUDINARY_API_SECRET

# Deploy to production
vercel --prod
```

### Step 3: Post-Deployment Configuration

1. **Test Authentication**
   - Visit your deployed URL
   - Create a new account via `/signup`
   - Login and verify JWT token works
   - Check MongoDB Atlas to confirm user was created

2. **Upload Test Data**
   - Create categories
   - Upload products with images
   - Generate test orders
   - Verify all CRUD operations work

3. **Configure Custom Domain** (Optional)
   - Go to Vercel Dashboard → Project Settings → Domains
   - Add custom domain (e.g., `admin.yourdomain.com`)
   - Update DNS records as instructed
   - SSL certificate auto-generated

### Step 4: Continuous Deployment

Vercel automatically redeploys on every push to `main` branch:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main
# Vercel auto-deploys in 2-3 minutes
```

### Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `MONGODB_URI` | ✅ Yes | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/smart-ecom` |
| `JWT_SECRET` | ✅ Yes | Secret key for JWT signing (32+ chars) | `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6` |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | ✅ Yes | Cloudinary cloud name | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | ✅ Yes | Cloudinary API key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | ✅ Yes | Cloudinary API secret | `abcdefghijklmnopqrstuvwxy` |

### Troubleshooting Deployment

**Build Fails:**
- Check build logs in Vercel dashboard
- Ensure all dependencies in `package.json`
- Verify TypeScript has no errors: `npm run build` locally

**Database Connection Fails:**
- Verify MongoDB Atlas IP whitelist (0.0.0.0/0)
- Check connection string is correct
- Ensure user has read/write permissions

**Images Not Uploading:**
- Verify all Cloudinary environment variables set
- Check API key permissions in Cloudinary dashboard
- Test upload locally first

**Authentication Not Working:**
- Ensure JWT_SECRET is set and strong
- Check browser console for CORS errors
- Verify token is stored in localStorage

## 📸 Screenshots

### Landing Page
![Landing Page](./screenshots/landing.png)

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Products Management
![Products](./screenshots/products.png)

### Orders Management
![Orders](./screenshots/orders.png)

### Analytics
![Analytics](./screenshots/analytics.png)

### Users Management
![Users](./screenshots/users.png)

> **Note**: Add screenshots to `/screenshots` folder in project root

## 🎯 Project Completion Checklist

✅ **Week 1** - Landing page, Login/Signup UI, Dashboard layout  
✅ **Week 2** - Authentication API, JWT, Protected routes, MongoDB users  
✅ **Week 3** - Products & Categories CRUD, Image upload, Real data  
✅ **Week 4** - Orders CRUD, Status updates, Customer info, Real data  
✅ **Week 5** - Analytics API, Real stats, Charts (Recharts), Dashboard  
✅ **Week 6** - Validation, Error handling, Loading states, UI polish  
✅ **Week 7** - Users management, Role-based access  

## 📄 License

This project is created for educational purposes as part of an academic assignment.

## 👨‍💻 Developer

Developed by [Dhatri patel]  
GitHub: [github.com/Dhatripatel06/SmartEcom](https://github.com/Dhatripatel06/SmartEcom)  
Contact: dhatripatel67@gmail.com

---

**Status**: Production Ready ✅  
**Last Updated**: January 25, 2026