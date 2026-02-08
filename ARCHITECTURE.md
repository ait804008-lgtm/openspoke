# openSpoke - Project Architecture

## Overview

openSpoke is a delivery logistics platform built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS. The application follows a modular architecture with clear separation of concerns.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                           Frontend Layer                             │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    Next.js App Router                          │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │  │
│  │  │ (auth)   │  │ (driver) │  │(dispatcher)│  ┌────────────┐ │  │
│  │  │ Routes   │  │ Routes   │  │  Routes   │  │ (customer) │ │  │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘  │  Routes    │ │  │
│  └───────┼────────────┼─────────────┼─────────┴────────────┘ │  │
│          │            │             │                             │  │
└──────────┼────────────┼─────────────┼─────────────────────────────┘
           │            │             │
           ▼            ▼             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Component Layer                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │
│  │   UI Base   │  │   Feature   │  │     Map     │                │
│  │ Components  │  │ Components  │  │ Components  │                │
│  │ Button,Card │  │ Trip,Stop   │  │ GoogleMap   │                │
│  └─────────────┘  └─────────────┘  └─────────────┘                │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        State Management                             │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Zustand Stores                           │   │
│  │  ┌────────────┐           ┌────────────┐                    │   │
│  │  │ authStore │           │ tripStore  │                    │   │
│  │  │           │           │            │                    │   │
│  │  │ • user    │           │ • trips    │                    │   │
│  │  │ • login   │           │ • stops    │                    │   │
│  │  │ • logout  │           │ • optimize │                    │   │
│  │  └────────────┘           └────────────┘                    │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Services Layer (Planned)                     │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐  │
│  │   Auth     │  │   Trips    │  │  Google    │  │   Socket   │  │
│  │   Service  │  │   Service  │  │   Maps     │  │   Client   │  │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        External APIs                                 │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                  │
│  │  Google    │  │  PostgreSQL │  │   Redis    │                  │
│  │   Maps     │  │   (PostGIS) │  │ (Caching)  │                  │
│  └────────────┘  └────────────┘  └────────────┘                  │
└─────────────────────────────────────────────────────────────────────┘
```

## File Tree

```
openspoke/
├── 📄 PRD.md                          # Product Requirements Document
├── 📄 README.md                       # Project documentation
├── 📄 ARCHITECTURE.md                 # This file
├── 📄 .env.example                    # Environment variables template
├── 📄 .gitignore                      # Git ignore rules
├── 📄 package.json                    # Dependencies & scripts
├── 📄 tsconfig.json                   # TypeScript configuration
├── 📄 tailwind.config.ts              # Tailwind CSS configuration
│
├── 📁 public/                        # Static assets
│
├── 📁 src/
│   ├── 📁 app/                        # Next.js App Router
│   │   ├── 📁 (auth)/                 # Authentication route group
│   │   │   └── 📁 login/
│   │   │       └── 📄 page.tsx         # Login page with role selection
│   │   │
│   │   ├── 📁 (driver)/               # Driver route group
│   │   │   └── 📁 dashboard/
│   │   │       └── 📄 page.tsx         # Driver dashboard (routes, stops)
│   │   │
│   │   ├── 📁 (dispatcher)/           # Dispatcher route group
│   │   │   └── 📁 dashboard/
│   │   │       └── 📄 page.tsx         # Dispatcher dashboard (trip management)
│   │   │
│   │   ├── 📁 (customer)/             # Customer route group (planned)
│   │   │   └── 📁 tracking/
│   │   │       └── 📄 page.tsx         # Delivery tracking page
│   │   │
│   │   ├── 📁 api/                    # API routes (planned)
│   │   │   ├── 📁 auth/
│   │   │   ├── 📁 trips/
│   │   │   └── 📁 stops/
│   │   │
│   │   ├── 📄 layout.tsx               # Root layout
│   │   └── 📄 page.tsx                 # Home page
│   │
│   ├── 📁 components/                  # React components
│   │   ├── 📁 ui/                     # Base UI components
│   │   │   ├── 📄 Button.tsx           # Reusable button component
│   │   │   ├── 📄 Card.tsx             # Card container components
│   │   │   ├── 📄 Input.tsx            # Form input component
│   │   │   └── 📄 (more...)           # Other base components
│   │   │
│   │   ├── 📁 map/                    # Map components
│   │   │   └── 📄 GoogleMap.tsx        # Google Maps wrapper
│   │   │
│   │   ├── 📁 trip/                   # Trip-related components
│   │   │   ├── 📄 TripList.tsx         # Trip list for dispatcher
│   │   │   ├── 📄 TripCard.tsx         # Single trip card
│   │   │   └── 📄 TripBuilder.tsx      # Trip creation form
│   │   │
│   │   ├── 📁 stop/                   # Stop-related components
│   │   │   ├── 📄 StopCard.tsx         # Stop display card
│   │   │   ├── 📄 StopForm.tsx         # Stop creation form
│   │   │   └── 📄 StopMap.tsx          # Stop on map
│   │   │
│   │   ├── 📁 driver/                 # Driver-specific components
│   │   │   └── 📄 NavigationWidget.tsx  # Turn-by-turn navigation
│   │   │
│   │   └── 📁 dispatcher/             # Dispatcher-specific components
│   │       ├── 📄 FleetOverview.tsx    # Fleet monitoring
│   │       └── 📁 DriverList.tsx       # Driver list
│   │
│   ├── 📁 lib/                         # Utility functions
│   │   └── 📄 utils.ts                 # Helper functions
│   │       ├── cn()                    # className merging
│   │       ├── formatDistance()         # Distance formatting
│   │       ├── formatDuration()        # Duration formatting
│   │       ├── haversineDistance()     # Geospatial calculation
│   │       └── getETA()                # ETA calculation
│   │
│   ├── 📁 stores/                      # Zustand state management
│   │   ├── 📄 authStore.ts             # Authentication state
│   │   │   ├── user, isAuthenticated
│   │   │   ├── login(), logout()
│   │   │   ├── setDriver(), setDispatcher()
│   │   │   └── Persistence via localStorage
│   │   │
│   │   └── 📄 tripStore.ts             # Trip management state
│   │       ├── trips[], currentTrip
│   │       ├── createTrip(), updateTrip()
│   │       ├── addStop(), updateStop()
│   │       └── optimizeRoute()
│   │
│   ├── 📁 hooks/                       # Custom React hooks (planned)
│   │   ├── 📄 useLocation.ts           # Geolocation hook
│   │   ├── 📄 useTracking.ts           # Real-time tracking
│   │   ├── 📄 useAuth.ts               # Authentication wrapper
│   │   └── 📄 useRoute.ts              # Route optimization hook
│   │
│   └── 📁 types/                       # TypeScript type definitions
│       └── 📄 index.ts                 # All types
│           ├── User, Driver, Dispatcher, Customer
│           ├── Trip, TripStatus
│           ├── Stop, StopStatus
│           ├── Delivery
│           ├── Message, Notification
│           └── RouteOptimizationResult
│
└── 📁 node_modules/                   # Dependencies
```

## Key Architectural Decisions

### 1. **App Router with Route Groups**
- Uses Next.js 16 App Router for better performance
- Route groups `()auth`, `()driver`, `()dispatcher` for role-based layouts
- Clean URL structure without affecting routing

### 2. **Component Organization**
- **UI Components:** Reusable, presentational components in `components/ui/`
- **Feature Components:** Domain-specific in `components/trip/`, `components/stop/`
- **Role Components:** `components/driver/`, `components/dispatcher/`

### 3. **State Management with Zustand**
- Lightweight alternative to Redux
- Simple, mutable state
- Built-in persistence middleware
- TypeScript-first approach

### 4. **Type Safety**
- Comprehensive TypeScript types in `src/types/`
- Shared types across frontend and API
- Zod for runtime validation

### 5. **Modular Utilities**
- Reusable helper functions in `src/lib/`
- Geospatial calculations
- Formatting utilities
- Common UI patterns

## Data Flow

### Authentication Flow
```
User Input → Login Page → authStore.login()
                         ↓
                    Mock API / Backend API
                         ↓
                    Set user state
                         ↓
                    Persist to localStorage
                         ↓
                    Redirect to role dashboard
```

### Trip Creation Flow
```
Dispatcher → Create Trip Form → tripStore.createTrip()
                              ↓
                         Generate trip ID
                              ↓
                         Add to trips array
                              ↓
                    Dispatch to all listeners
                              ↓
                    Update UI (TripList)
```

### Stop Management Flow
```
Add Stop → tripStore.addStop()
         ↓
    Update currentTrip
         ↓
    Re-optimize route (Google Maps API)
         ↓
    Update map markers & polyline
```

### Real-time Updates Flow (Planned)
```
Driver Location Update → Socket.io Client → Backend → Socket.io Server
                                                         ↓
                                                    Broadcast to Dispatchers
                                                         ↓
                                                    Update GoogleMap markers
```

## Technology Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod
- **Maps:** Google Maps JavaScript API
- **Icons:** Lucide React
- **Real-time:** Socket.io Client

### Backend (Planned)
- **API:** Next.js API Routes or Express
- **Database:** PostgreSQL with PostGIS
- **ORM:** Prisma
- **Authentication:** JWT / NextAuth.js
- **Real-time:** Socket.io
- **Caching:** Redis

### External Services
- **Maps:** Google Maps Platform
- **Route Optimization:** OR-Tools or Google Routes API
- **File Storage:** AWS S3 / Cloudflare R2
- **Push Notifications:** Firebase Cloud Messaging

## File Descriptions

### Core Files

| File | Description |
|------|-------------|
| `src/types/index.ts` | All TypeScript type definitions for the entire application |
| `src/stores/authStore.ts` | Authentication state management with login/logout |
| `src/stores/tripStore.ts` | Trip and stop management state |
| `src/lib/utils.ts` | Utility functions for formatting and calculations |
| `src/app/layout.tsx` | Root layout with providers and fonts |

### Components

| Component | Purpose |
|-----------|---------|
| `Button.tsx` | Reusable button with variants (primary, secondary, outline, ghost, danger) |
| `Card.tsx` | Card container with header, body, footer variants |
| `Input.tsx` | Form input with label and error handling |
| `GoogleMap.tsx` | Google Maps wrapper with markers and polylines |
| `StopCard.tsx` | Display delivery stop with status and actions |
| `TripList.tsx` | List of trips for dispatcher dashboard |

### Pages

| Page | Description |
|------|-------------|
| `login/page.tsx` | Authentication with role selection |
| `driver/dashboard/page.tsx` | Driver's daily route and stops |
| `dispatcher/dashboard/page.tsx` | Trip creation and fleet management |

## API Structure (Planned)

```
/api
  /auth
    POST /login
    POST /logout
    POST /register
  /trips
    GET /          - List all trips
    POST /         - Create new trip
    GET /[id]      - Get trip by ID
    PUT /[id]      - Update trip
    DELETE /[id]   - Delete trip
    POST /[id]/optimize - Optimize route
  /stops
    GET /          - List stops for trip
    POST /         - Add stop to trip
    PUT /[id]      - Update stop
    DELETE /[id]   - Delete stop
    POST /[id]/status - Update delivery status
  /drivers
    GET /          - List drivers
    GET /[id]/location - Get driver location
  /notifications
    GET /          - List notifications
    POST /[id]/read - Mark as read
```

## Performance Considerations

1. **Code Splitting:** Automatic with Next.js App Router
2. **Lazy Loading:** Components loaded on demand
3. **Image Optimization:** Next.js Image component
4. **Caching:** Redis for frequently accessed data
5. **Database Indexing:** PostGIS spatial indexes

## Security Considerations

1. **Authentication:** JWT with role-based access control (RBAC)
2. **API Security:** Rate limiting, input validation
3. **Data Encryption:** HTTPS, encrypted database fields
4. **Input Sanitization:** Zod validation on all inputs
5. **CORS:** Configured allowed origins
6. **Audit Logging:** Track critical actions

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CDN (Cloudflare)                         │
│                         │                                   │
└─────────────────────────┼───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                  Vercel / Railway                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Next.js App                             │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │  │
│  │  │  Static    │  │   Server   │  │   API      │    │  │
│  │  │   Assets   │  │  Components│  │  Routes    │    │  │
│  │  └────────────┘  └────────────┘  └────────────┘    │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              Managed Services                               │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ PostgreSQL │  │   Redis    │  │   S3/R2    │            │
│  │ (PostGIS)  │  │ (Cache)    │  │ (Storage)  │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

---

**Last Updated:** 2026-02-08
**Version:** 1.0
