import { NextRequest, NextResponse } from 'next/server';

// In-memory data storage (mock database)
let stops: any[] = [];
let stopCounter = 1;

// Validation functions
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

  // Simple phone validation (just check format, don't test yet)
  const phone = body.contactInfo.phone;
  if (phone && phone.length < 10) {
    return { valid: false, error: 'Invalid phone format' };
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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tripId = searchParams.get('tripId');

  try {
    let filteredStops = stops;
    if (tripId) {
      filteredStops = stops.filter((s) => s.tripId === tripId);
    }

    return NextResponse.json({ stops: filteredStops });
  } catch (error) {
    console.error('Error fetching stops:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = validateStopData(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const newStop = {
      id: `stop-${stopCounter++}`,
      tripId: body.tripId,
      sequence: 0,
      address: {
        street: body.address.street,
        city: body.address.city,
        state: body.address.state || '',
        zipCode: body.address.zipCode || '',
        coordinates: body.address.coordinates || null,
      },
      contactInfo: {
        name: body.contactInfo.name,
        phone: body.contactInfo.phone,
      },
      packageInfo: body.packageInfo || '',
      instructions: body.instructions || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    stops.push(newStop);

    return NextResponse.json(newStop, { status: 201 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('Invalid JSON in request body:', error);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    console.error('Error creating stop:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
