# openSpoke

A modern delivery logistics platform built with Next.js, React, TypeScript, and Tailwind CSS.

## About

openSpoke helps delivery drivers, dispatchers, and customers organize delivery trips, optimize routes and stops, and track delivery processes in real-time.

## Features

### MVP (Phase 1)
- **Multi-role Authentication** - Driver, dispatcher, and customer accounts
- **Trip Management** - Create trips, add stops, assign to drivers
- **Route Optimization** - Automatic stop sequencing with Google Maps
- **Driver Dashboard** - Daily routes, turn-by-turn navigation, delivery actions
- **Dispatcher Dashboard** - Fleet overview, trip planning, route management
- **Real-time Tracking** - Live driver location on map, delivery status updates
- **Communication** - Driver-customer messaging (basic)

### Planned (Phase 2+)
- Customer portal for tracking
- Advanced route optimization with time windows
- Push notifications
- Offline mode for drivers
- Analytics and reporting

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod validation
- **Maps:** Google Maps JavaScript API
- **Real-time:** Socket.io (planned)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Google Maps API Key ([Get one here](https://developers.google.com/maps/documentation/javascript/get-api-key))

### Installation

1. Clone the repository
```bash
git clone <repo-url>
cd openspoke
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Google Maps API key:
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
openspoke/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Authentication routes
│   │   │   └── login/          # Login page
│   │   ├── (driver)/           # Driver routes
│   │   │   └── dashboard/      # Driver dashboard
│   │   └── (dispatcher)/       # Dispatcher routes
│   │       └── dashboard/      # Dispatcher dashboard
│   ├── components/            # React components
│   │   ├── ui/                 # Base UI components
│   │   ├── map/                # Map components
│   │   ├── stop/               # Stop components
│   │   └── trip/               # Trip components
│   ├── lib/                    # Utility functions
│   ├── stores/                # Zustand stores
│   ├── hooks/                  # Custom React hooks
│   └── types/                  # TypeScript types
├── public/                     # Static assets
└── package.json
```

## Usage

### Driver Dashboard
1. Log in as a driver
2. View assigned trips with stops
3. Navigate through stops with turn-by-turn directions
4. Mark deliveries as arrived/delivered
5. Capture proof of delivery

### Dispatcher Dashboard
1. Log in as a dispatcher
2. Create new delivery trips
3. Add stops with addresses and delivery details
4. Optimize routes automatically
5. Assign trips to drivers
6. Monitor fleet in real-time

## Development

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

### Linting

```bash
npm run lint
```

## Contributing

1. Create a feature branch: `feature/description`
2. Make your changes
3. Write tests
4. Commit with conventional commits
5. Push and create PR

## License

MIT
