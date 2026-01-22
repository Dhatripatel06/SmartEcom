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
│   │   │   └── auth/
│   │   │       ├── login/route.ts      # Login API endpoint
│   │   │       └── signup/route.ts     # Signup API endpoint
│   │   ├── dashboard/
│   │   │   ├── layout.tsx              # Dashboard layout with protection
│   │   │   ├── page.tsx                # Main dashboard
│   │   │   ├── products/page.tsx       # Products page
│   │   │   ├── orders/page.tsx         # Orders page
│   │   │   └── customers/page.tsx      # Customers page
│   │   ├── login/page.tsx              # Login page
│   │   ├── signup/page.tsx             # Signup page
│   │   ├── layout.tsx                  # Root layout
│   │   └── page.tsx                    # Landing page
│   ├── components/
│   │   ├── EmptyState.tsx              # Reusable empty state
│   │   ├── Navbar.tsx                  # Top navigation bar
│   │   ├── ProtectedRoute.tsx          # Route protection wrapper
│   │   └── Sidebar.tsx                 # Side navigation menu
│   ├── lib/
│   │   ├── auth.ts                     # JWT utilities
│   │   └── db.ts                       # MongoDB connection
│   ├── models/
│   │   └── User.ts                     # User schema
│   └── styles/
│       └── globals.css                 # Global styles
├── .env.local                          # Environment variables (not in git)
├── .env.example                        # Environment template
├── package.json                        # Dependencies
├── tsconfig.json                       # TypeScript config
└── tailwind.config.ts                  # Tailwind config
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

### POST `/api/auth/signup`
Create a new user account

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "staff"
}
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "staff"
  }
}
```

### POST `/api/auth/login`
Authenticate existing user

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "staff"
  }
}
```

## 🧪 Testing the Application

1. **Start the server**
```bash
npm run dev
```

2. **Create an account**
   - Visit `http://localhost:3000/signup`
   - Fill in registration form
   - Submit to create account

3. **Login**
   - Visit `http://localhost:3000/login`
   - Enter credentials
   - Access dashboard

4. **Test protected routes**
   - Try accessing `/dashboard` without login (should redirect)
   - Login and access dashboard (should work)
   - Logout and verify redirect to login

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT tokens with expiration
- ✅ HTTP-only authentication flow
- ✅ Input validation on server side
- ✅ Unique email constraint
- ✅ Proper error handling
- ✅ No password exposure in responses

## 🎨 UI/UX Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states on all forms
- ✅ Error message display
- ✅ Smooth transitions and animations
- ✅ Professional color scheme
- ✅ Accessible form labels
- ✅ Toast-style notifications

## 📦 Dependencies

**Production:**
- `next` - React framework
- `react` & `react-dom` - UI library
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `tailwindcss` - Utility-first CSS

**Development:**
- `typescript` - Type safety
- `@types/*` - Type definitions

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
4. Deploy

### Manual Deployment

```bash
npm run build
npm start
```

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/smart-ecom` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secure-random-string` |

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Next.js 14 App Router architecture
- ✅ TypeScript for type safety
- ✅ MongoDB database integration
- ✅ JWT authentication implementation
- ✅ RESTful API design
- ✅ Protected route patterns
- ✅ Responsive UI development
- ✅ Clean code organization
- ✅ Production-ready security

## 📄 License

MIT License - Feel free to use for learning and projects.

## 👨‍💻 Author

Smart E-Commerce Admin Dashboard - 2026

---

**Status:** Week 1 & Week 2 Complete ✅

Ready for production evaluation and internship review.
