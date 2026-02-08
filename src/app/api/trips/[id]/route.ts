import { NextRequest, NextResponse } from 'next/server';

// Import shared data store (in real app, use database)
// For now, we'll use a simple approach where each route manages its own in-memory store
// In production, use PostgreSQL + Prisma

let trips: any[] = [];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const trip = trips.find((t) => t.id === id);

  if (!trip) {
    return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
  }

  return NextResponse.json(trip);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const tripIndex = trips.findIndex((t) => t.id === id);

  if (tripIndex === -1) {
    return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
  }

  trips[tripIndex] = {
    ...trips[tripIndex],
    ...body,
    updatedAt: new Date().toISOString(),
  };

  return NextResponse.json(trips[tripIndex]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const tripIndex = trips.findIndex((t) => t.id === id);

  if (tripIndex === -1) {
    return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
  }

  trips.splice(tripIndex, 1);

  return NextResponse.json({ success: true });
}
