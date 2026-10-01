import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorBoundary from '../ErrorBoundary';

describe('ErrorBoundary Component', () => {
  it('renders child components normally when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div data-testid="safe-child">Clean Application Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('safe-child')).toBeInTheDocument();
    expect(screen.getByText('Clean Application Content')).toBeInTheDocument();
    expect(screen.queryByText(/Something went wrong/i)).not.toBeInTheDocument();
  });

  it('renders fallback error UI when a child component throws an error', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const ThrowingComponent = () => {
      throw new Error('Critical component failure');
    };

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something went wrong while loading this portfolio/i)).toBeInTheDocument();
    expect(screen.getByText(/Temporary issue/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Refresh Portfolio/i })).toBeInTheDocument();
    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });

  it('invokes window reload when user clicks Refresh Portfolio', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: reloadMock }
    });

    const ThrowingComponent = () => {
      throw new Error('Test crash');
    };

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    const refreshButton = screen.getByRole('button', { name: /Refresh Portfolio/i });
    fireEvent.click(refreshButton);

    expect(reloadMock).toHaveBeenCalledTimes(1);
    consoleError.mockRestore();
  });
});
