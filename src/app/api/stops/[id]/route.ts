import { NextRequest, NextResponse } from 'next/server';

let stops: any[] = [];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const stop = stops.find((s) => s.id === id);

  if (!stop) {
    return NextResponse.json({ error: 'Stop not found' }, { status: 404 });
  }

  return NextResponse.json(stop);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const stopIndex = stops.findIndex((s) => s.id === id);

  if (stopIndex === -1) {
    return NextResponse.json({ error: 'Stop not found' }, { status: 404 });
  }

  stops[stopIndex] = {
    ...stops[stopIndex],
    ...body,
    updatedAt: new Date().toISOString(),
  };

  // Update deliveredAt if status is 'delivered'
  if (body.status === 'delivered' && !stops[stopIndex].deliveredAt) {
    stops[stopIndex].deliveredAt = new Date().toISOString();
  }

  return NextResponse.json(stops[stopIndex]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const stopIndex = stops.findIndex((s) => s.id === id);

  if (stopIndex === -1) {
    return NextResponse.json({ error: 'Stop not found' }, { status: 404 });
  }

  stops.splice(stopIndex, 1);

  return NextResponse.json({ success: true });
}
