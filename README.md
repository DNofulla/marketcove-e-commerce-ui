# MarketCove E-Commerce Platform UI

<div align="center">
	<img src="./src/assets/MarketCoveFullVertical.png" alt="MarketCove E-Commerce Platform" width="300" />	
</div>

## 📖 Overview

MarketCove is a comprehensive e-commerce platform supporting multiple user roles with advanced authentication and authorization features. Built with React, TypeScript, Tailwind CSS, and modern web technologies.

## 🚀 Quick Start

### Environment Setup
Create a `.env` file in the root directory with the following fields:

```javascript
VITE_APP_TITLE="MarketCove E-Commerce Platform"
VITE_STRIPE_PUBLISHABLE_KEY=""
```

### Local Development
```bash
npm install
npm run dev
```

### Docker Deployment
```bash
# Build and run with Docker
docker build -t marketcove-e-commerce-ui .
docker run -p 5173:80 marketcove-e-commerce-ui
```

## 🔐 Authentication & Authorization System

### Features Implemented

#### 1. **Multi-Role User Registration & Login**
- **Supported Roles**: CUSTOMER, SELLER, BUSINESS_OWNER, ADMIN
- **Dynamic Forms**: Role-specific fields that appear based on user selection
- **Validation**: Comprehensive client-side and server-side validation
- **Security**: Password strength requirements (minimum 8 characters)
- **UX Features**: Password visibility toggle, "Remember Me" functionality

#### 2. **Password Management**
- **Forgot Password**: Email-based password reset workflow
- **Reset Password**: Secure token-based password reset
- **Validation**: Password confirmation and strength checking
- **User Feedback**: Clear success/error messages and guidance

#### 3. **Authentication State Management**
- **React Context**: Centralized authentication state
- **Auto Token Refresh**: Automatic JWT token renewal
- **Persistent Sessions**: Login state restoration from localStorage
- **Loading States**: Proper loading indicators during operations
- **Error Handling**: Comprehensive error management and user feedback

#### 4. **API Integration**
- **RESTful Service**: Complete integration with backend authentication endpoints
- **Axios Interceptors**: Automatic token attachment and error handling
- **Type Safety**: Fully typed TypeScript interfaces for all API interactions

### User Interface Components

#### 🔑 Login Screen (`/login`)
- Clean, modern design with MarketCove branding
- Email and password fields with real-time validation
- Password visibility toggle
- Remember me functionality
- Forgot password link and sign up redirect
- Comprehensive error display

#### 📝 Sign Up Screen (`/signup`)
- **Role Selection**: Account type selection with descriptions
- **Dynamic Fields**: Role-specific form sections
  - **Business Owners**: Business details, registration numbers, tax IDs, website URLs
  - **Sellers**: Shop information, contact details, descriptions
  - **Customers**: Basic profile information
- **Responsive Design**: Mobile-first approach
- **Validation**: Real-time form validation with helpful error messages

#### 🔄 Forgot Password (`/forgot-password`)
- Email input with validation
- Success confirmation with clear next steps
- Option to try different email address
- Back to login navigation

#### 🔑 Reset Password (`/reset-password`)
- Token-based access control (URL parameter validation)
- New password and confirmation fields
- Password strength requirements display
- Success confirmation with automatic redirect

#### 🎉 Authentication Success (`/auth-success`)
- Personalized welcome message with user details
- Account status indicators (email verified, profile verified)
- Role-specific next steps and guidance
- Quick action buttons for common tasks
- User account information summary

#### 📊 Dashboard (`/dashboard`)
- **Role-Based Layouts**: Customized dashboards for each user type
- **User Information**: Account details and verification status
- **Quick Actions**: Role-specific action cards
- **Recent Activity**: Activity tracking section
- **Navigation**: Header with user info and logout functionality

### Security Features

#### 🛡️ Protected Routes
- Route-based access control
- Automatic redirect to login for unauthenticated users
- Loading states during authentication verification
- Location-based redirect after successful login

#### 🔐 Token Management
- JWT token storage in localStorage
- Automatic token expiration detection
- Refresh token implementation
- Secure token validation and cleanup

#### ✅ Form Validation
- Real-time client-side validation
- Server-side validation integration
- Email format validation
- Password strength requirements
- Required field validation with helpful messages

## 🏗️ Technical Architecture

### File Structure
```
src/
├── components/
│   ├── auth/
│   │   ├── context/
│   │   │   ├── AuthContext.tsx          # Authentication state management
│   │   │   └── AuthTypes.ts             # TypeScript interfaces and types
│   │   ├── services/
│   │   │   └── authService.ts           # API service layer
│   │   ├── login/
│   │   │   └── Login.tsx                # Login component
│   │   ├── signup/
│   │   │   └── Signup.tsx               # Registration component
│   │   ├── forgot-password/
│   │   │   └── ForgotPassword.tsx       # Forgot password component
│   │   ├── reset-password/
│   │   │   └── ResetPassword.tsx        # Reset password component
│   │   ├── success/
│   │   │   └── AuthSuccess.tsx          # Success confirmation component
│   │   └── ProtectedRoute.tsx           # Route protection component
│   ├── dashboard/
│   │   └── Dashboard.tsx                # User dashboard
│   └── home/
│       └── Home.tsx                     # Landing page
├── assets/                              # Images and static files
└── App.tsx                              # Main application component
```

### API Endpoints Integration

#### Implemented Endpoints:
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration (multi-role)
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset confirmation
- `POST /api/auth/refresh-token` - JWT token refresh
- `GET /api/auth/verify-email` - Email verification
- `GET /api/auth/check-email` - Email availability check

### User Roles & Capabilities

#### 👤 CUSTOMER
- Product browsing and searching
- Shopping cart and checkout
- Order tracking and history
- Wishlist management
- Account preferences and settings

#### 🛍️ SELLER
- Product listing and inventory management
- Sales analytics and reporting
- Order fulfillment and tracking
- Shop configuration and branding
- Customer communication tools

#### 🏢 BUSINESS_OWNER
- Business operations dashboard
- Team and staff management
- Financial reporting and analytics
- Business verification process
- Multi-location management

#### ⚙️ ADMIN
- Platform administration
- User management and moderation
- Content review and approval
- System configuration
- Analytics and reporting

## 🛠️ Technology Stack

### Frontend Technologies
- **React 18** - Modern React with hooks and context
- **TypeScript** - Full type safety and better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API communication

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Docker** - Containerization for deployment

## 🎯 Key Features

### ✅ Responsive Design
- Mobile-first responsive design
- Cross-browser compatibility
- Dark mode support
- Accessible UI components

### ✅ User Experience
- Intuitive navigation and workflows
- Clear error messages and feedback
- Loading indicators for better UX
- Success confirmations and guidance

### ✅ Type Safety
- Full TypeScript implementation
- Strict type checking enabled
- Interface-driven development
- Runtime type validation

### ✅ Error Handling
- Global error state management
- Network error handling
- Graceful fallbacks
- User-friendly error messages

## 🔄 Available Routes

### Public Routes
- `/` - Home/Landing page
- `/login` - User login
- `/signup` - User registration
- `/forgot-password` - Password recovery
- `/reset-password` - Password reset (requires token)

### Protected Routes
- `/dashboard` - Role-based user dashboard
- `/auth-success` - Authentication success confirmation

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd marketcove-e-commerce-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open http://localhost:5173 in your browser
   - Navigate to `/login` or `/signup` to test authentication

## 🧪 Testing Authentication

### Test Different User Roles:
1. Visit `/signup` and create accounts with different roles
2. Test role-specific form fields and validation
3. Complete the registration process
4. Test login with created accounts
5. Explore role-specific dashboard features

### Test Password Recovery:
1. Visit `/forgot-password`
2. Enter email address
3. Check email for reset link (in development, check console/network tab)
4. Follow reset link to `/reset-password?token=<token>`
5. Set new password and confirm

## 🔧 Configuration

### Environment Variables
```bash
VITE_APP_TITLE="MarketCove E-Commerce Platform"
VITE_STRIPE_PUBLISHABLE_KEY="pk_test_..." # Stripe public key
VITE_API_BASE_URL="http://localhost:8080" # Backend API URL (optional)
```

### API Configuration
The authentication service is configured to connect to `http://localhost:8080/api/auth` by default. Update the `API_BASE_URL` in `src/components/auth/services/authService.ts` to match your backend configuration.

## 📝 Development Guidelines

### Adding New Authentication Features
1. Update TypeScript interfaces in `AuthTypes.ts`
2. Add API methods to `authService.ts`
3. Update context in `AuthContext.tsx`
4. Create UI components following established patterns
5. Add routes to `App.tsx`

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow dark mode patterns with `dark:` prefixes
- Maintain responsive design with `sm:`, `md:`, `lg:` prefixes
- Use consistent spacing and color schemes

## 🤝 Contributing

1. Follow the established file structure
2. Maintain TypeScript strict mode compliance
3. Add proper error handling for all API calls
4. Include loading states for user interactions
5. Test all authentication flows before submitting

## 📄 License

This project is part of the MarketCove E-Commerce Platform suite. See LICENSE file for details.

---

**Built with ❤️ for MarketCove E-Commerce Platform**

