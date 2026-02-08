# openSpoke - Setup & Testing Guide

## Quick Start

### 1. Install Dependencies
```bash
cd ~/projects/openspoke
npm install
```

### 2. Set Up Environment
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your Google Maps API key
# NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

**Get Google Maps API Key:**
1. Go to https://console.cloud.google.com/
2. Create a new project
3. Go to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "API Key"
5. Enable these APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API

### 3. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000

### 4. Build for Production
```bash
npm run build
npm start
```

---

## Testing Checklist

### ✅ Prerequisites
- [ ] Node.js 18+ installed
- [ ] Google Maps API key obtained and configured
- [ ] Dependencies installed (`npm install`)
- [ ] .env.local file created

### ✅ Build Verification
```bash
npm run build
```
Expected output:
- ✓ Compiled successfully
- All 6 routes generated:
  - `/` (Home)
  - `/auth/login` (Login)
  - `/driver/dashboard` (Driver Dashboard)
  - `/dispatcher/dashboard` (Dispatcher Dashboard)
  - `/customer/tracking` (Customer Tracking)
  - `/_not-found` (404 page)

### ✅ Development Server Test
```bash
npm run dev
```

Open browser and test each route:

#### Home Page (`http://localhost:3000`)
- [ ] Page loads without errors
- [ ] Hero section displays correctly
- [ ] Three role cards shown (Driver, Dispatcher, Customer)
- [ ] "Get Started" buttons work
- [ ] Responsive design on mobile

#### Login Page (`http://localhost:3000/auth/login`)
- [ ] Page loads without errors
- [ ] Role selection buttons work (Driver, Dispatcher, Customer)
- [ ] Email input accepts valid email
- [ ] Password input accepts characters
- [ ] Form validation works
- [ ] "Sign In" button enables after role selection
- [ ] Redirects correctly based on selected role:
  - Driver → `/driver/dashboard`
  - Dispatcher → `/dispatcher/dashboard`
  - Customer → `/customer/tracking`

#### Driver Dashboard (`http://localhost:3000/driver/dashboard`)
- [ ] Page loads without errors
- [ ] Header with user name and logout button displays
- [ ] Trip info card shows correctly
- [ ] Map component displays (if Google Maps API key is set)
- [ ] Stop cards display correctly
- [ ] "Optimize Route" button works
- [ ] Stop status buttons work (Arrived, Delivered)
- [ ] Progress indicator shows correctly

#### Dispatcher Dashboard (`http://localhost:3000/dispatcher/dashboard`)
- [ ] Page loads without errors
- [ ] Sidebar with trip list displays
- [ ] "New Trip" button works
- [ ] Trip creation form appears
- [ ] Trip list shows trips (or empty state)
- [ ] Trip cards are clickable
- [ ] Map displays when trip is selected
- [ ] Stop cards display correctly
- [ ] "Re-optimize" button works
- [ ] Responsive design (sidebar on mobile)

#### Customer Tracking (`http://localhost:3000/customer/tracking`)
- [ ] Page loads without errors
- [ ] Tracking form displays
- [ ] "Track Delivery" button works
- [ ] Mock alert shows on search
- [ ] Responsive design

---

## Feature Testing

### Authentication Flow
1. **Driver Login**
   - [ ] Select "Driver" role
   - [ ] Enter email and password
   - [ ] Click "Sign In"
   - [ ] Redirect to `/driver/dashboard`
   - [ ] User is authenticated in store

2. **Dispatcher Login**
   - [ ] Select "Dispatcher" role
   - [ ] Enter email and password
   - [ ] Click "Sign In"
   - [ ] Redirect to `/dispatcher/dashboard`

3. **Customer Login**
   - [ ] Select "Customer" role
   - [ ] Enter email and password
   - [ ] Click "Sign In"
   - [ ] Redirect to `/customer/tracking`

### Trip Management (Dispatcher)
1. **Create Trip**
   - [ ] Click "New Trip"
   - [ ] Enter trip name
   - [ ] Click "Create"
   - [ ] Trip appears in list
   - [ ] Trip is stored in tripStore

2. **View Trip**
   - [ ] Click on a trip card
   - [ ] Trip loads in main area
   - [ ] Map displays markers
   - [ ] Stop cards display

3. **Optimize Route**
   - [ ] Select a trip with stops
   - [ ] Click "Optimize Route" / "Re-optimize"
   - [ ] Loading indicator shows
   - [ ] Route is optimized (mock)

### Delivery Actions (Driver)
1. **View Route**
   - [ ] Trip info displays
   - [ ] Progress bar shows
   - [ ] Map shows route
   - [ ] Stop cards display in sequence

2. **Update Stop Status**
   - [ ] Click "Arrived" on a stop
   - [ ] Status updates to "arrived"
   - [ ] Click "Delivered" on a stop
   - [ ] Status updates to "delivered"
   - [ ] Progress bar updates

3. **Logout**
   - [ ] Click logout button
   - [ ] Redirect to login page
   - [ ] Auth state is cleared

### Map Component
1. **Google Maps Integration**
   - [ ] Map loads correctly (requires API key)
   - [ ] Markers display at stop locations
   - [ ] Polylines show route
   - [ ] Map is responsive
   - [ ] Map fits bounds to markers

### Responsive Design
- [ ] Home page works on mobile (375px - 768px)
- [ ] Login page works on mobile
- [ ] Driver dashboard works on mobile
- [ ] Dispatcher dashboard sidebar collapses on mobile
- [ ] Customer tracking works on mobile

---

## Troubleshooting

### Build Errors
**Error:** "Module not found: Can't resolve 'lucide-react'"
```bash
npm install lucide-react
```

**Error:** "Property 'load' does not exist on type 'Loader'"
- Solution: Use direct Google Maps script loading (fixed in current version)

**Error:** "Route conflict: /dispatcher/dashboard and /driver"
- Solution: Renamed route groups to avoid conflicts (fixed in current version)

### Runtime Errors
**Error:** Maps don't display
- Check: Google Maps API key in `.env.local`
- Check: Console for API key errors
- Solution: Get valid API key from Google Cloud Console

**Error:** "Cannot find name 'CardBody'"
- Solution: Import CardBody from '@/components/ui/Card'

### Environment Issues
**Error:** .env.local not loading
- Restart dev server after creating file
- Check file is in project root
- Verify NEXT_PUBLIC_ prefix for client-side env vars

---

## Performance Checks

### Lighthouse (Chrome DevTools)
- [ ] Performance score > 90
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] SEO score > 90

### Bundle Size
```bash
npm run build
# Check .next/analyze/ or use next-bundle-analyzer
```
- [ ] Main bundle < 500KB
- [ ] Initial JS < 200KB

---

## Deployment Preparation

### Pre-deploy Checklist
- [ ] All tests passing
- [ ] Build succeeds
- [ ] Environment variables configured
- [ ] API keys secured
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Responsive design verified

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables on Vercel
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` → Your Google Maps API key

---

## Development Workflow

### Feature Development
1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes
3. Test locally
4. Commit with conventional commits
5. Push and create PR

### Commit Examples
```bash
feat: add stop creation form
fix: resolve map marker positioning issue
docs: update setup guide
chore: upgrade dependencies
test: add trip management tests
```

### Pull Request Process
1. Create PR from feature branch to `main`
2. Update PR description
3. Request review
4. Address feedback
5. Merge after approval

---

## Next Steps

### Immediate (MVP)
- [ ] Set up real API integration
- [ ] Connect to PostgreSQL database
- [ ] Implement real Google Maps route optimization
- [ ] Add form validation
- [ ] Implement real-time updates with Socket.io

### Short-term (Phase 2)
- [ ] Customer tracking with real data
- [ ] Push notifications
- [ ] Offline mode for drivers
- [ ] Analytics dashboard
- [ ] Advanced filtering and search

### Long-term (Phase 3)
- [ ] Multi-vehicle route optimization
- [ ] Machine learning for ETA prediction
- [ ] Mobile apps (React Native)
- [ ] Third-party integrations
- [ ] Payment processing

---

**Last Updated:** 2026-02-08
