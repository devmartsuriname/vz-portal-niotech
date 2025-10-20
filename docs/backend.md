# Backend Integration

## Current Status
✅ **Phase 1 Complete: Frontend Integration**  
✅ **Phase 2 Complete: Admin Backend with Authentication**

The Niotech React Template frontend is fully integrated and the admin backend with Lovable Cloud authentication is now operational.

---

## Phase 2: Admin Backend Integration (Complete)

### Overview
The admin backend uses **Lovable Cloud** (Supabase-powered) for authentication and data management. The system provides a secure, protected admin area separate from the public Niotech frontend.

### Authentication System

**Backend**: Lovable Cloud (Supabase)  
**Features**:
- Email/password authentication
- Session persistence
- Auto-confirm email (development mode)
- Protected routes
- Secure session management

### Admin Structure

```
src/
├── pages/admin/
│   ├── SignIn.tsx          # Admin login page
│   ├── SignUp.tsx          # Admin registration
│   └── Dashboard.tsx       # Protected dashboard
├── components/auth/
│   └── ProtectedRoute.tsx  # Route protection wrapper
├── integrations/supabase/
│   ├── client.ts           # Auto-generated Supabase client
│   ├── types.ts            # Auto-generated DB types
│   └── auth.tsx            # Authentication context
└── Routes/
    ├── Routes.jsx          # Main routing
    └── AdminRoutes.jsx     # Admin routes
```

### Admin Routes
- `/admin/auth/sign-in` - Admin login (public)
- `/admin/auth/sign-up` - Admin registration (public)
- `/admin/dashboard` - Admin dashboard (protected)
- `/admin` - Redirects to dashboard (protected)

### Security Implementation
✅ **Authentication Context**
- Proper session state handling (both user and session objects)
- Auth state listeners configured correctly
- Prevents session loss on page refresh

✅ **Protected Routes**
- `ProtectedRoute` wrapper for admin pages
- Automatic redirect to login for unauthenticated users
- Loading state while checking authentication

✅ **Input Validation**
- Email format validation
- Password strength requirements (min 6 characters)
- Password confirmation matching
- Proper error messages for users

✅ **Session Management**
- Session persistence across page reloads
- Automatic token refresh
- Secure sign-out functionality

### Design System (Admin)
- Dark gradient theme (Slate 900 → Purple 900)
- Modern card-based layout
- shadcn/ui component system
- Gradient accents (Purple 500 → Blue 500)
- Fully responsive design

### Tech Stack (Backend)
- **Authentication**: Lovable Cloud (Supabase)
- **UI Components**: shadcn/ui
- **Routing**: React Router DOM 6.30.1
- **Styling**: Tailwind CSS
- **Language**: TypeScript

---

## Frontend-Backend Separation

### Architecture
```
Application
├── Public Frontend (Niotech)
│   ├── Routes: / (all except /admin/*)
│   ├── Styling: Bootstrap + Custom CSS
│   ├── Language: JavaScript (.jsx)
│   └── Access: Public, no authentication
│
└── Admin Backend
    ├── Routes: /admin/*
    ├── Styling: Tailwind CSS + shadcn/ui
    ├── Language: TypeScript (.tsx)
    └── Access: Protected, requires authentication
```

### Data Flow
```
User Request
    ↓
Router (src/Routes/Routes.jsx)
    ↓
    ├─→ Public Route (/)
    │       ↓
    │   Niotech Components (No Auth)
    │       ↓
    │   Public Content
    │
    └─→ Admin Route (/admin/*)
            ↓
        Protected Route Check
            ↓
            ├─→ Authenticated
            │       ↓
            │   Admin Dashboard
            │
            └─→ Not Authenticated
                    ↓
                Redirect to Sign In
```

---

## Phase 3: Full Backend Features (Planned)

### Database Schema (To Be Implemented)
1. **profiles** - Extended user information
2. **content** - CMS for Niotech pages
3. **blogs** - Blog post management
4. **projects** - Project portfolio data
5. **team_members** - Team information
6. **services** - Services data
7. **pricing_plans** - Pricing information
8. **user_roles** - Role-based access control

### Planned Features
- 📊 Content Management System (CMS)
- 👥 User management and roles
- 📝 Blog post CRUD operations
- 🎨 Project portfolio management
- 📧 Contact form submissions
- 📈 Analytics dashboard
- 🔐 Advanced role-based permissions
- 📁 File upload and management

### API Endpoints (Planned)
```
/api/
├── /content
│   ├── GET /blogs
│   ├── POST /blogs
│   ├── PUT /blogs/:id
│   └── DELETE /blogs/:id
├── /users
│   ├── GET /users
│   ├── GET /users/:id
│   ├── PUT /users/:id
│   └── DELETE /users/:id
└── /analytics
    └── GET /stats
```

---

## Environment Configuration

### Lovable Cloud (Auto-configured)
```env
VITE_SUPABASE_URL=<auto-configured>
VITE_SUPABASE_PUBLISHABLE_KEY=<auto-configured>
VITE_SUPABASE_PROJECT_ID=<auto-configured>
```

**Note**: These environment variables are automatically managed by Lovable Cloud. Do not edit `.env` manually.

---

## Security Best Practices

### Implemented
✅ Auto-confirm email enabled (development)  
✅ Password minimum length (6 characters)  
✅ Email format validation  
✅ Secure session management  
✅ Protected route wrappers  
✅ Proper error handling  
✅ No sensitive data in console logs  

### To Be Implemented (Phase 3)
- [ ] Row Level Security (RLS) policies for database
- [ ] User roles and permissions table
- [ ] Input sanitization for CMS content
- [ ] Rate limiting on auth endpoints
- [ ] Password strength requirements (uppercase, numbers, special chars)
- [ ] Two-factor authentication (optional)
- [ ] Audit logging for admin actions

---

## Development Workflow

### Running Locally
```bash
# Start development server
npm run dev

# Frontend: http://localhost:8080
# Admin: http://localhost:8080/admin
```

### Testing Authentication
1. Navigate to `/admin/auth/sign-up`
2. Create an admin account
3. Sign in at `/admin/auth/sign-in`
4. Access dashboard at `/admin/dashboard`

**Note**: Auto-confirm email is enabled, so no email verification required during development.

### Accessing Backend
Use the Lovable Cloud interface to:
- View database tables
- Manage authentication settings
- Monitor API usage
- View logs and analytics

---

## Troubleshooting

### Common Issues

**Issue**: "Unauthorized" error on protected routes  
**Solution**: Check if user is logged in, session may have expired

**Issue**: Sign-up not working  
**Solution**: Check email format, ensure password is at least 6 characters

**Issue**: Dashboard not loading  
**Solution**: Verify authentication context is wrapping the app in `src/main.jsx`

**Issue**: Public frontend affected by admin changes  
**Solution**: Admin and frontend are separate - check routing configuration

---

## Next Steps

### Phase 3: Full Data Integration
1. Design database schema for content management
2. Implement RLS policies for security
3. Create CRUD operations for admin
4. Build content management interface
5. Add user role management
6. Implement analytics tracking
7. Create file upload system
8. Build advanced admin features

---

**Phase 1 Completed**: 2025-10-20 (Niotech Frontend)  
**Phase 2 Completed**: 2025-10-20 (Admin Backend + Auth)  
**Status**: ✅ Backend Operational with Authentication  
**Next**: Phase 3 - Full Backend Features & Data Integration

### Overview
The next phase will integrate the Darkone admin dashboard backend system to provide:
- Admin panel functionality
- Database management
- API endpoints
- User authentication
- Content management

### Darkone Files Available
The project repository includes Darkone backend files in:
```
Darkone-React_v1.0/
├── src/
│   ├── app/
│   │   └── (admin)/     # Admin routes
│   ├── components/      # Backend UI components
│   ├── helpers/         # Backend utilities
│   └── routes/          # Backend routing
```

### Integration Strategy (To Be Implemented)
1. **Separate Admin Routes**: Keep admin panel distinct from public-facing Niotech frontend
2. **Authentication Layer**: Implement protected routes for admin access
3. **API Structure**: Create RESTful API endpoints for data management
4. **Database Schema**: Design and implement database structure
5. **State Management**: Potentially integrate Redux or Context API for complex state

### Planned Features
- 📊 Admin dashboard with analytics
- 👥 User management
- 📝 Content management system (CMS)
- 🎨 UI component library (Apex Charts, base UI components)
- 🔐 Role-based access control
- 📈 Data visualization

### Tech Stack (Backend - Planned)
- **Admin Framework**: Darkone React Admin Template
- **Authentication**: To be determined (JWT, OAuth, etc.)
- **Database**: To be determined (PostgreSQL, MongoDB, etc.)
- **API**: To be determined (REST, GraphQL)
- **Backend Runtime**: To be determined (Node.js/Express, Supabase, etc.)

## Frontend-Backend Separation

### Current Architecture
```
Frontend (Niotech)
├── Public Routes
│   ├── Home, About, Services
│   ├── Blog, Projects, Team
│   └── Contact, Pricing, FAQ
```

### Planned Architecture
```
Frontend (Niotech) + Backend (Darkone)
├── Public Routes (Niotech)
│   ├── Home, About, Services
│   ├── Blog, Projects, Team
│   └── Contact, Pricing, FAQ
│
└── Admin Routes (Darkone)
    ├── /admin/dashboard
    ├── /admin/users
    ├── /admin/content
    ├── /admin/analytics
    └── /admin/settings
```

## API Endpoints (To Be Implemented)

### Proposed Structure
```
/api/v1/
├── /auth
│   ├── POST /login
│   ├── POST /register
│   ├── POST /logout
│   └── GET /me
├── /content
│   ├── GET /blogs
│   ├── POST /blogs
│   ├── PUT /blogs/:id
│   └── DELETE /blogs/:id
├── /users
│   ├── GET /users
│   ├── GET /users/:id
│   ├── PUT /users/:id
│   └── DELETE /users/:id
└── /analytics
    └── GET /stats
```

## Data Flow (Planned)

### Content Management
```
Admin Dashboard (Darkone)
    ↓ (Create/Edit)
Backend API
    ↓ (Store)
Database
    ↓ (Fetch)
Frontend (Niotech)
    ↓ (Display)
End Users
```

## Security Considerations (To Be Implemented)

### Authentication
- JWT token-based authentication
- Secure password hashing
- Session management
- Refresh token rotation

### Authorization
- Role-based access control (RBAC)
- Admin, Editor, Viewer roles
- Protected API endpoints
- Route guards for admin pages

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF tokens
- Rate limiting

## Environment Variables (To Be Configured)

```env
# Backend API
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=10000

# Database
DATABASE_URL=
DATABASE_NAME=

# Authentication
JWT_SECRET=
JWT_EXPIRY=

# Third-party Services
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

## Database Schema (To Be Designed)

### Proposed Tables
1. **users**
   - id, email, password_hash, role, created_at, updated_at

2. **blogs**
   - id, title, slug, content, author_id, published_at, created_at, updated_at

3. **projects**
   - id, title, description, image_url, category, created_at, updated_at

4. **team_members**
   - id, name, position, bio, image_url, social_links, created_at, updated_at

5. **services**
   - id, title, description, icon_url, created_at, updated_at

6. **pricing_plans**
   - id, name, price, features, created_at, updated_at

## Development Roadmap

### Phase 2A: Backend Setup (Upcoming)
- [ ] Choose and configure backend framework
- [ ] Set up database
- [ ] Implement authentication system
- [ ] Create basic CRUD API endpoints
- [ ] Integrate with Niotech frontend

### Phase 2B: Admin Dashboard (Upcoming)
- [ ] Integrate Darkone admin template
- [ ] Implement admin routes
- [ ] Create content management interface
- [ ] Build user management system
- [ ] Add analytics dashboard

### Phase 2C: Advanced Features (Future)
- [ ] File upload system
- [ ] Email notifications
- [ ] Search functionality
- [ ] Caching layer
- [ ] Rate limiting
- [ ] Logging and monitoring

## Testing Strategy (To Be Implemented)

### Backend Testing
- Unit tests for API endpoints
- Integration tests for database operations
- E2E tests for authentication flow

### Frontend-Backend Integration
- API contract testing
- Mock server for frontend development
- Cypress E2E tests for full user flows

---

**Status**: 🔄 Phase 1 Complete, Phase 2 Pending
**Last Updated**: 2025-10-20
**Awaiting**: Further instructions for Darkone backend integration
