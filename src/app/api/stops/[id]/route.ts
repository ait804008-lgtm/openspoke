import { NextRequest, NextResponse } from 'next/server';

// In-memory data storage (mock database)
let stops: any[] = [];

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

    const stop = stops.find((s) => s.id === id);

    if (!stop) {
      return NextResponse.json(
        { error: 'Stop not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(stop);
  } catch (error) {
    console.error('Error fetching stop:', error);
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

    const stopIndex = stops.findIndex((s) => s.id === id);

    if (stopIndex === -1) {
      return NextResponse.json(
        { error: 'Stop not found' },
        { status: 404 }
      );
    }

    // Store original stop BEFORE modifying
    const originalStop = { ...stops[stopIndex] };

    // Validate status if provided
    if (body.status && !validateStatus(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    // Check deliveredAt on ORIGINAL stop, not the updated one
    const shouldSetDeliveredAt = body.status === 'delivered' && !originalStop.deliveredAt;

    const updatedStop = {
      ...originalStop,
      ...body,
      updatedAt: new Date().toISOString(),
      ...(shouldSetDeliveredAt ? { deliveredAt: new Date().toISOString() } : {}),
    };

    stops[stopIndex] = updatedStop;

    return NextResponse.json(updatedStop);
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('Invalid JSON in request body:', error);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    console.error('Error updating stop:', error):
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

    const stopIndex = stops.findIndex((s) => s.id === id);

    if (stopIndex === -1) {
      return NextResponse.json(
        { error: 'Stop not found' },
        { status: 404 }
      );
    }

    stops.splice(stopIndex, 1);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting stop:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
