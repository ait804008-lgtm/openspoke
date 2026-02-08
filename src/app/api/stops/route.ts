import { NextRequest, NextResponse } from 'next/server';

let stops: any[] = [];
let stopCounter = 1;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tripId = searchParams.get('tripId');

  let filteredStops = stops;
  if (tripId) {
    filteredStops = stops.filter((s) => s.tripId === tripId);
  }

  return NextResponse.json({ stops: filteredStops });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const newStop = {
    id: `stop-${stopCounter++}`,
    ...body,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  stops.push(newStop);

  return NextResponse.json(newStop, { status: 201 });
}
