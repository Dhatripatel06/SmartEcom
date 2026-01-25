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

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd smart-ecom
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup MongoDB**

**Option A: Local MongoDB**
- Install MongoDB Community Edition
- Start MongoDB service:
  ```bash
  mongod
  ```

**Option B: MongoDB Atlas (Cloud)**
- Create account at [mongodb.com/atlas](https://mongodb.com/atlas)
- Create a cluster and get connection string
- Replace `MONGODB_URI` in `.env.local`

4. **Configure Environment Variables**

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Update `.env.local` with your values:
```env
MONGODB_URI=mongodb://localhost:27017/smart-ecom
JWT_SECRET=your-secure-random-secret-key
```

5. **Start Development Server**
```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

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
  password: string (required, hashed)
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
1. **Signup/Login** - Create account and authenticate
2. **Add Category** - Navigate to Categories, create test category
3. **Add Product** - Create product with image upload
4. **View Dashboard** - Check real-time stats update
5. **Run Seed Script** - Generate sample orders
6. **Manage Orders** - Change order status, view details
7. **Verify Stats** - Dashboard reflects all changes