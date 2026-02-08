import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { StopForm } from '@/components/stop/StopForm';

// Mock tripStore
const mockAddStop = jest.fn().mockResolvedValue(undefined);
jest.mock('@/stores/tripStore', () => ({
  useTripStore: () => ({
    addStop: mockAddStop,
  }),
}));

describe('StopForm', () => {
  const mockTripId = 'trip-123';
  let mockOnClose: any;

  beforeEach(() => {
    mockOnClose = jest.fn();
    mockAddStop.mockClear();
  });

  it('renders form with all required fields', () => {
    render(<StopForm tripId={mockTripId} onClose={mockOnClose} />);

    expect(screen.getByLabelText(/street address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact phone/i)).toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', () => {
    render(<StopForm tripId={mockTripId} onClose={mockOnClose} />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls addStop when form is submitted', async () => {
    render(<StopForm tripId={mockTripId} onClose={mockOnClose} />);

    // Fill required fields
    fireEvent.change(screen.getByLabelText(/street address/i), {
      target: { value: '123 Main St' },
    });
    fireEvent.change(screen.getByLabelText(/city/i), {
      target: { value: 'New York' },
    });
    fireEvent.change(screen.getByLabelText(/contact name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/contact phone/i), {
      target: { value: '(555) 123-4567' },
    });

    // Submit form
    const submitButton = screen.getByRole('button', { name: /add stop/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAddStop).toHaveBeenCalled();
    });
  });

  it('shows validation when required fields are empty', async () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<StopForm tripId={mockTripId} onClose={mockOnClose} />);

    // Submit without filling fields
    const submitButton = screen.getByRole('button', { name: /add stop/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith(
        'Please fill in all required fields'
      );
    });

    mockAlert.mockRestore();
  });
});
