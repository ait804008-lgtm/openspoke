import { NextRequest, NextResponse } from 'next/server';

// In-memory data storage (mock database)
let trips: any[] = [];

function isValidId(id: string): boolean {
  return typeof id === 'string' && id.length > 0 && id.length < 100;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!isValidId(id)) {
      return NextResponse.json(
        { error: 'Invalid trip ID' },
        { status: 400 }
      );
    }

    const trip = trips.find((t) => t.id === id);

    if (!trip) {
      return NextResponse.json(
        { error: 'Trip not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(trip);
  } catch (error) {
    console.error('Error fetching trip:', error);
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
        { error: 'Invalid trip ID' },
        { status: 400 }
      );
    }

    const body = await request.json();

    const tripIndex = trips.findIndex((t) => t.id === id);

    if (tripIndex === -1) {
      return NextResponse.json(
        { error: 'Trip not found' },
        { status: 404 }
      );
    }

    // Validate allowed fields
    const allowedFields = ['name', 'status', 'priority'];
    const invalidFields = Object.keys(body).filter((key) => !allowedFields.includes(key));

    if (invalidFields.length > 0) {
      return NextResponse.json(
        { error: `Invalid fields: ${invalidFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate status value if provided
    if (body.status && !['draft', 'assigned', 'in_progress', 'completed', 'cancelled'].includes(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    // Validate priority value if provided
    if (body.priority && !['low', 'medium', 'high'].includes(body.priority)) {
      return NextResponse.json(
        { error: 'Invalid priority value' },
        { status: 400 }
      );
    }

    const updatedTrip = {
      ...trips[tripIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    trips[tripIndex] = updatedTrip;

    return NextResponse.json(updatedTrip);
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('Invalid JSON in request body:', error);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    console.error('Error updating trip:', error);
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
        { error: 'Invalid trip ID' },
        { status: 400 }
      );
    }

    const tripIndex = trips.findIndex((t) => t.id === id);

    if (tripIndex === -1) {
      return NextResponse.json(
        { error: 'Trip not found' },
        { status: 404 }
      );
    }

    trips.splice(tripIndex, 1);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting trip:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
