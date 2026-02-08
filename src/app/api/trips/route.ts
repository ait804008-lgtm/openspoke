import { NextRequest, NextResponse } from 'next/server';

// Mock data store (in-memory, resets on server restart)
let trips: any[] = [];
let stops: any[] = [];
let tripCounter = 1;
let stopCounter = 1;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dispatcherId = searchParams.get('dispatcherId');

  let filteredTrips = trips;
  if (dispatcherId) {
    filteredTrips = trips.filter((t) => t.dispatcherId === dispatcherId);
  }

  return NextResponse.json({ trips: filteredTrips });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const newTrip = {
    id: `trip-${tripCounter++}`,
    ...body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    optimizedRoute: null,
  };

  trips.push(newTrip);

  return NextResponse.json(newTrip, { status: 201 });
}
