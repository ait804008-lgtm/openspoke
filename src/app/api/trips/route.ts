import { NextRequest, NextResponse } from 'next/server';

// In-memory data storage (mock database)
let trips: any[] = [];
let stopCounter = 1;

// Validation utilities
function validateTripData(body: any): { valid: boolean; error?: string } {
  if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
    return { valid: false, error: 'Trip name is required' };
  }

  if (!body.dispatcherId || typeof body.dispatcherId !== 'string') {
    return { valid: false, error: 'Dispatcher ID is required' };
  }

  if (body.priority && !['low', 'medium', 'high'].includes(body.priority)) {
    return { valid: false, error: 'Invalid priority value' };
  }

  if (body.status && !['draft', 'assigned', 'in_progress', 'completed', 'cancelled'].includes(body.status)) {
    return { valid: false, error: 'Invalid status value' };
  }

  return { valid: true };
}

function isValidId(id: string): boolean {
  // Basic ID validation - in production, use proper UUID validation
  return typeof id === 'string' && id.length > 0 && id.length < 100;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dispatcherId = searchParams.get('dispatcherId');

  try {
    let filteredTrips = trips;

    // Validate dispatcherId before filtering
    if (dispatcherId) {
      if (!isValidId(dispatcherId)) {
        return NextResponse.json(
          { error: 'Invalid dispatcher ID format' },
          { status: 400 }
        );
      }
      filteredTrips = trips.filter((t) => t.dispatcherId === dispatcherId);
    }

    return NextResponse.json({ trips: filteredTrips });
  } catch (error) {
    console.error('Error fetching trips:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = validateTripData(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const newTrip = {
      id: `trip-${stopCounter++}`,
      name: body.name.trim(),
      dispatcherId: body.dispatcherId,
      date: body.date || new Date().toISOString(),
      status: body.status || 'draft',
      priority: body.priority || 'medium',
      stops: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      optimizedRoute: null,
    };

    trips.push(newTrip);

    return NextResponse.json(newTrip, { status: 201 });
  } catch (error) {
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      console.error('Invalid JSON in request body:', error);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    console.error('Error creating trip:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
