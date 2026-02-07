# openSpoke - Product Requirements Document (PRD)

## Executive Summary

openSpoke is a web-based delivery logistics platform designed to help drivers, dispatchers, and customers organize delivery trips, optimize routes and stops, and track delivery processes in real-time. The platform provides route planning, delivery management, communication tools, and tracking features to streamline last-mile delivery operations.

## 1. Product Vision

**Mission:** To simplify delivery logistics through intelligent route optimization, real-time tracking, and seamless coordination between drivers, dispatchers, and customers.

**Target Audience:**
- **Delivery Drivers:** Manage daily routes, stops, and delivery progress
- **Dispatchers/Managers:** Plan routes, assign deliveries, monitor fleet
- **Customers:** Track deliveries, communicate with drivers, manage orders

## 2. Core Features

### 2.1 Authentication & User Management
- **Multi-role Authentication**
  - Driver accounts
  - Dispatcher/Manager accounts
  - Customer accounts
  - Email/password signup and login
  - Social login (optional)

- **User Profiles**
  - Driver profile (vehicle info, license, availability)
  - Dispatcher profile (assigned fleet, permissions)
  - Customer profile (delivery addresses, preferences)
  - Profile settings and preferences

### 2.2 Trip & Route Management
- **Trip Creation**
  - Create delivery trips from scratch
  - Import deliveries from orders
  - Set trip date and time
  - Define trip metadata (priority, notes)

- **Route Optimization**
  - Automatic stop sequencing (optimize route)
  - Manual stop reordering
  - Distance and time estimation
  - Traffic-aware routing
  - Multiple route options comparison

- **Stop Management**
  - Add/remove stops to trips
  - Edit stop details (address, contact, package info)
  - Set stop priorities and time windows
  - Attach delivery notes and instructions
  - Bulk import stops from CSV

### 2.3 Delivery Tracking
- **Real-time Tracking**
  - Live driver location on map
  - Delivery status updates (en route, arrived, delivered)
  - Estimated arrival times
  - Route progress visualization

- **Delivery Status Workflow**
  - Pending → Assigned → Picked Up → In Transit → Delivered
  - Failed delivery handling
  - Delivery proof capture (photos, signatures)
  - Exception reporting (wrong address, customer unavailable)

### 2.4 Driver Dashboard
- **Daily Route View**
  - Today's stops in sequence
  - Turn-by-turn navigation integration
  - Stop details and instructions
  - Distance/time to next stop

- **Delivery Actions**
  - Mark stop as arrived
  - Confirm delivery completion
  - Capture delivery proof
  - Report delivery issues
  - Add delivery notes

- **Performance Metrics**
  - Completed deliveries today
  - On-time delivery rate
  - Total distance traveled
  - Stops remaining

### 2.5 Dispatcher Dashboard
- **Fleet Overview**
  - All active trips and drivers
  - Real-time driver locations
  - Delivery status across all trips
  - Fleet utilization metrics

- **Trip Management**
  - Create and assign trips to drivers
  - View and edit existing trips
  - Reassign trips between drivers
  - Monitor trip progress

- **Route Planning**
  - Build routes with multiple stops
  - Optimize sequences automatically
  - Manual adjustments
  - Route preview on map

### 2.6 Customer Portal
- **Order Tracking**
  - Track live delivery status
  - View driver location
  - Estimated arrival time
  - Delivery history

- **Delivery Management**
  - Schedule deliveries
  - Provide delivery instructions
  - Request delivery changes
  - Rate delivery experience

### 2.7 Communication System
- **In-App Messaging**
  - Driver-customer chat
  - Dispatcher-driver coordination
  - Group chat for trip updates
  - Automated delivery notifications

- **Notification System**
  - Delivery status updates
  - Trip assignments
  - Route changes
  - Delay alerts
  - Proof of delivery confirmations

### 2.8 Analytics & Reporting
- **Delivery Metrics**
  - Total deliveries
  - On-time delivery rate
  - Average delivery time
  - Delivery completion rate
  - Failed delivery reasons

- **Driver Performance**
  - Stops per day
  - Distance traveled
  - On-time performance
  - Customer ratings

- **Route Analytics**
  - Average route duration
  - Route efficiency scores
  - Traffic impact analysis
  - Optimal stop sequences

## 3. Technical Requirements

### 3.1 Frontend Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Maps:** Mapbox, Google Maps, or Leaflet
- **State Management:** React Context + Zustand/Redux
- **Form Handling:** React Hook Form + Zod validation
- **Real-time:** Socket.io or Server-Sent Events

### 3.2 Backend Stack
- **API:** Next.js API Routes or separate Node.js/Express backend
- **Database:** PostgreSQL (PostGIS for geospatial data)
- **Authentication:** JWT or NextAuth.js with role-based access
- **Geolocation:** GeoJSON coordinates, PostGIS queries
- **Route Optimization:** OR-Tools, OSRM, or external API (Google Routes API)
- **Real-time:** Socket.io or WebSockets
- **File Storage:** AWS S3 or Cloudflare R2 (for photos, documents)

### 3.3 External Services
- **Mapping/Navigation:** Mapbox API or Google Maps Platform
- **Geocoding:** Convert addresses to coordinates
- **Route Optimization:** OR-Tools, OSRM, or commercial API
- **Push Notifications:** Firebase Cloud Messaging or Web Push
- **SMS/Email:** SendGrid, Twilio for notifications

### 3.4 Performance Requirements
- Real-time location updates < 1 second latency
- Route optimization < 5 seconds for 100+ stops
- Page load time < 2 seconds
- Support 10,000+ concurrent users
- Offline capability for drivers (PWA)

### 3.5 Security Requirements
- Role-based access control (RBAC)
- Encrypted location data
- Secure API endpoints
- Rate limiting
- Audit logging for critical actions
- GDPR compliance for customer data

## 4. User Stories

### Epic 1: Authentication & Onboarding
- As a driver, I want to sign up so I can access the app
- As a dispatcher, I want to log in so I can manage deliveries
- As a customer, I want to track my delivery without signing in
- As a new user, I want to complete my profile so I can start receiving deliveries

### Epic 2: Trip & Route Planning
- As a dispatcher, I want to create a trip with multiple stops so I can assign it to a driver
- As a dispatcher, I want to optimize route stops automatically so drivers use the most efficient path
- As a driver, I want to see my route sequence so I know where to go next
- As a driver, I want to get turn-by-turn navigation so I can reach stops easily

### Epic 3: Delivery Management
- As a driver, I want to view stop details so I know what to deliver
- As a driver, I want to mark deliveries as completed so my dispatcher knows I'm done
- As a driver, I want to capture proof of delivery so there's a record
- As a driver, I want to report issues so my dispatcher can help

### Epic 4: Real-Time Tracking
- As a dispatcher, I want to see driver locations so I can monitor progress
- As a customer, I want to track my delivery so I know when it will arrive
- As a dispatcher, I want to see delivery status updates so I can manage expectations
- As a driver, I want my location to update automatically so dispatchers can track me

### Epic 5: Communication
- As a driver, I want to message customers so I can coordinate deliveries
- As a customer, I want to contact my driver so I can provide delivery instructions
- As a dispatcher, I want to communicate with drivers so I can update them on route changes
- As a user, I want to receive delivery notifications so I stay informed

### Epic 6: Analytics & Reporting
- As a dispatcher, I want to view delivery metrics so I can optimize operations
- As a manager, I want to see driver performance so I can recognize achievements
- As a dispatcher, I want to generate reports so I can analyze trends
- As a user, I want to see my delivery history so I can review past deliveries

## 5. MVP Scope (Phase 1)

### Features to Build
1. **Authentication** - Multi-role signup/login (driver, dispatcher)
2. **Trip Creation** - Create trips, add stops, import from CSV
3. **Route Optimization** - Automatic stop sequencing with time/distance estimates
4. **Driver Dashboard** - Daily route view, stop details, navigation
5. **Delivery Actions** - Mark arrived, delivered, capture proof, report issues
6. **Real-Time Tracking** - Live driver location on map, status updates
7. **Basic Communication** - Driver-customer messaging
8. **Delivery History** - Past deliveries list with status

### Out of Scope for MVP
- Customer portal (Phase 2)
- Advanced analytics and reporting (Phase 2)
- Push notifications (Phase 2)
- Multi-stop route optimization algorithms beyond basic sequencing (Phase 2)
- Offline mode for drivers (Phase 2)

## 6. Design Requirements

### 6.1 Visual Design
- Clean, professional UI optimized for outdoor use (high contrast, large buttons)
- Mobile-first responsive design (primary use case: drivers on phones)
- Dark mode support
- Map-centric views for navigation and tracking

### 6.2 UX Principles
- One-handed operation (drivers may be holding packages)
- Quick actions (mark delivered with 1-2 taps)
- Clear visual hierarchy for trip sequences
- Offline-first design where possible
- Voice input/output for delivery notes (optional Phase 2)

### 6.3 Accessibility
- WCAG 2.1 AA compliance
- Voice-over/screen reader support
- Large touch targets (minimum 44px)
- High contrast for outdoor visibility

## 7. Success Metrics

### Operational Metrics
- **On-time delivery rate:** > 90%
- **Route optimization efficiency:** 20% reduction in distance vs. manual planning
- **Delivery completion rate:** > 95%
- **Average stops per driver per day:** Increase by 15%
- **Dispatcher time spent on route planning:** Reduce by 50%

### User Engagement
- Daily active drivers
- App session duration
- Feature adoption rate
- User satisfaction (NPS score)

### Technical Metrics
- Location update latency: < 1 second
- App crash rate: < 0.5%
- API response time: < 200ms (p95)
- Uptime: 99.9%

## 8. Roadmap

### Phase 1: MVP (Weeks 1-8)
- Authentication system (driver, dispatcher roles)
- Trip creation and stop management
- Basic route optimization (stop sequencing)
- Driver dashboard with daily routes
- Delivery actions (arrived, delivered, proof capture)
- Real-time tracking on map
- Driver-customer messaging
- Delivery history

### Phase 2: Enhanced Features (Weeks 9-14)
- Customer portal (tracking, scheduling)
- Advanced route optimization (time windows, traffic)
- Push notifications
- Offline mode for drivers
- Basic analytics dashboard
- Delivery proof gallery
- Bulk trip management

### Phase 3: Growth & Optimization (Weeks 15+)
- Multi-vehicle route optimization
- Predictive delivery times
- Advanced analytics and reporting
- Voice notes and hands-free features
- Integration with e-commerce platforms
- API for third-party integrations
- Machine learning for route prediction

## 9. Technical Architecture

### Frontend Structure
```
openspoke/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/               # Auth routes
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── role-select/
│   │   ├── (driver)/             # Driver routes
│   │   │   ├── dashboard/
│   │   │   ├── trip/[id]/
│   │   │   ├── stops/
│   │   │   └── profile/
│   │   ├── (dispatcher)/         # Dispatcher routes
│   │   │   ├── dashboard/
│   │   │   ├── trips/
│   │   │   ├── fleet/
│   │   │   └── analytics/
│   │   ├── (customer)/           # Customer routes (Phase 2)
│   │   │   ├── track/[id]/
│   │   │   └── history/
│   │   ├── api/                  # API routes
│   │   └── layout.tsx            # Root layout
│   ├── components/               # Reusable components
│   │   ├── ui/                   # Base UI components
│   │   ├── map/                  # Map components
│   │   ├── trip/                 # Trip components
│   │   ├── stop/                 # Stop components
│   │   ├── driver/               # Driver-specific components
│   │   ├── dispatcher/           # Dispatcher-specific components
│   │   └── tracking/             # Tracking components
│   ├── lib/                      # Utilities
│   │   ├── api.ts                # API client
│   │   ├── auth.ts               # Auth utilities
│   │   ├── map.ts                # Map utilities
│   │   ├── route-optimizer.ts    # Route optimization logic
│   │   └── utils.ts              # Helper functions
│   ├── hooks/                    # Custom React hooks
│   │   ├── useLocation.ts        # Geolocation
│   │   ├── useTracking.ts        # Real-time tracking
│   │   └── useAuth.ts            # Authentication
│   ├── types/                    # TypeScript types
│   │   ├── trip.ts
│   │   ├── stop.ts
│   │   ├── user.ts
│   │   └── delivery.ts
│   └── styles/                   # Global styles
```

### Database Schema (PostgreSQL + PostGIS)
```sql
-- Users
users (id, email, password_hash, role, name, phone, created_at)

-- Drivers
drivers (user_id, vehicle_type, license_number, availability, current_location)

-- Trips
trips (id, dispatcher_id, driver_id, date, status, optimized_route)

-- Stops
stops (id, trip_id, sequence, address, coordinates, contact_info, status, time_window)

-- Deliveries
deliveries (id, stop_id, status, proof_photo_url, signature, delivered_at, notes)

-- Messages
messages (id, trip_id, sender_id, recipient_id, content, sent_at)
```

### Key Components
- **Map Component:** Display routes, stops, driver locations
- **Trip Builder:** Drag-and-drop stop sequencing
- **Stop Card:** Stop details with action buttons
- **Navigation Widget:** Turn-by-turn directions
- **Status Timeline:** Visual delivery progress
- **Proof of Delivery:** Photo capture, signature pad
- **Location Tracker:** Real-time GPS updates

## 10. Dependencies

### Frontend Libraries
- `next`: 16.x
- `react`: 19.x
- `react-dom`: 19.x
- `typescript`: ^5.x
- `tailwindcss`: ^4.x
- `react-hook-form`: ^7.x
- `zod`: ^3.x
- `lucide-react`: Icons
- `zustand` or `@reduxjs/toolkit`: State management
- `mapbox-gl` or `@googlemaps/js-api-loader`: Maps
- `socket.io-client`: Real-time updates
- `react-geolocated`: Geolocation
- `react-signature-canvas`: Signature capture

### Backend Dependencies
- `next-auth`: Authentication
- `prisma`: ORM with PostGIS
- `bcrypt`: Password hashing
- `zod`: Validation
- `socket.io`: Real-time
- `@turf/turf`: Geospatial calculations
- `node-geocoder`: Geocoding
- `nodemailer`: Email notifications
- `multer`: File uploads

### External APIs
- **Mapping:** Mapbox API or Google Maps Platform
- **Route Optimization:** OR-Tools, OSRM, or Google Routes API
- **Push Notifications:** Firebase Cloud Messaging
- **SMS:** Twilio

## 11. Testing Strategy

### Frontend Testing
- Unit tests with Jest and React Testing Library
- Component testing for UI components
- Integration tests for delivery flows
- E2E tests with Playwright (critical user journeys)

### Backend Testing
- API endpoint testing
- Database integration tests
- Authentication flow tests
- Route optimization algorithm tests

### Coverage Target
- Unit tests: 80% coverage
- Integration tests: Critical delivery flows
- E2E tests: Main user journeys (driver daily flow, dispatcher trip creation)

## 12. Deployment

### Environment Setup
- **Development:** Local with Next.js dev server + Postgres + Redis
- **Staging:** Vercel preview deployments + staging database
- **Production:** Vercel or self-hosted + managed Postgres (AWS RDS, Railway)

### CI/CD Pipeline
- GitHub Actions for automated testing
- Deploy on main branch merge
- Environment variable management
- Database migrations (Prisma)

### Infrastructure
- **Hosting:** Vercel (frontend) or Railway/Render (full-stack)
- **Database:** PostgreSQL with PostGIS (Railway, AWS RDS)
- **Caching:** Redis (Upstash, AWS ElastiCache)
- **File Storage:** AWS S3 or Cloudflare R2
- **CDN:** Cloudflare for static assets

## 13. Non-Functional Requirements

### Scalability
- Handle 1,000+ concurrent drivers
- Support 50,000+ daily deliveries
- Horizontal scaling capability
- Database sharding readiness

### Availability
- 99.9% uptime SLA
- Graceful degradation (offline mode)
- Backup and disaster recovery
- Multi-region deployment (future)

### Performance
- Real-time location updates < 1 second
- Route optimization < 5 seconds for 100 stops
- Map rendering < 100ms
- Mobile-optimized (60 FPS)

### Security
- Role-based access control (RBAC)
- Encrypted data at rest and in transit
- GDPR compliance
- Audit logging
- Rate limiting and DDoS protection

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Voice control (optional)
- High contrast mode for outdoor use

## 14. Risk Assessment

### Technical Risks
- **GPS accuracy** issues in urban areas
- **Route optimization** complexity at scale
- **Real-time performance** with many active trips
- **Offline capability** complexity

### Mitigation Strategies
- Multiple location sources (GPS, WiFi, cell towers)
- Caching and pre-calculation for routes
- WebSocket connection management with reconnection logic
- Progressive Web App (PWA) with service workers

### Business Risks
- **Competition** from established logistics platforms
- **Driver adoption** challenges
- **Customer trust** in new tracking system

### Mitigation Strategies
- Focus on specific use cases (hyperlocal delivery)
- Simple, intuitive driver interface
- Transparent tracking with proof of delivery

## 15. Documentation

- API documentation
- Component documentation (Storybook)
- Deployment guides
- Driver onboarding guide
- Dispatcher training materials
- Customer help center

---

**Document Version:** 2.0
**Last Updated:** 2026-02-07
**Status:** Updated - Delivery Logistics Platform
