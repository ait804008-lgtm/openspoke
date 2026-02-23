import { NextRequest, NextResponse } from 'next/server';

// In-memory data storage (mock database)
let stops: any[] = [];
let stopCounter = 1;

// Simple validation functions - avoiding complex regex to prevent TypeScript errors
function validateStopData(body: any): { valid: boolean; error?: string } {
  if (!body.tripId || typeof body.tripId !== 'string') {
    return { valid: false, error: 'Trip ID is required' };
  }

  if (!body.address || !body.address.street || !body.address.city) {
    return { valid: false, error: 'Street and city are required' };
  }

  if (!body.contactInfo || !body.contactInfo.name || !body.contactInfo.phone) {
    return { valid: false, error: 'Contact name and phone are required' };
  }

  const phone = body.contactInfo.phone;

  if (!phone || phone.length < 10) {
    return { valid: false, error: 'Phone number is too short' };
  }

  if (phone.length > 15) {
    return { valid: false, error: 'Phone number is too long' };
  }

  return { valid: true };
}

function isValidId(id: string): boolean {
  return typeof id === 'string' && id.length > 0 && id.length < 100;
}

function validateStatus(status: string): boolean {
  const validStatuses = ['pending', 'picked_up', 'in_transit', 'arrived', 'delivered', 'failed'];
  return validStatuses.includes(status);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!isValidId(id)) {
      return NextResponse.json(
        { error: 'Invalid stop ID' },
        { status: 400 }
      );
    }

    const stop = stops.find((s: any) => s.id === id);

    if (!stop) {
      return NextResponse.json(
        { error: 'Stop not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(stop);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!isValidId(id)) {
      return NextResponse.json(
        { error: 'Invalid stop ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const stopIndex = stops.findIndex((s: any) => s.id === id);

    if (stopIndex === -1) {
      return NextResponse.json(
        { error: 'Stop not found' },
        { status: 404 }
      );
    }

    const originalStop = { ...stops[stopIndex] };

    if (body.status && !validateStatus(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    const shouldSetDeliveredAt = body.status === 'delivered' && !originalStop.deliveredAt;

    const updatedStop = {
      ...originalStop,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    if (shouldSetDeliveredAt) {
      updatedStop.deliveredAt = new Date().toISOString();
    }

    stops[stopIndex] = updatedStop;

    return NextResponse.json(updatedStop);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!isValidId(id)) {
      return NextResponse.json(
        { error: 'Invalid stop ID' },
        { status: 400 }
      );
    }

    const stopIndex = stops.findIndex((s: any) => s.id === id);

    if (stopIndex === -1) {
      return NextResponse.json(
        { error: 'Stop not found' },
        { status: 404 }
      );
    }

    stops.splice(stopIndex, 1);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
