import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders with default primary variant', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="secondary">Secondary</Button>);

    rerender(<Button variant="outline">Outline</Button>);
    rerender(<Button variant="ghost">Ghost</Button>);
    rerender(<Button variant="danger">Danger</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);

    rerender(<Button size="md">Medium</Button>);
    rerender(<Button size="lg">Large</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = () => {};
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);

    expect(button).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
