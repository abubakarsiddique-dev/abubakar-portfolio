import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AnimatedCounter from '../AnimatedCounter';
import * as framerMotion from 'framer-motion';

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    useInView: vi.fn(() => true),
    useReducedMotion: vi.fn(() => false)
  };
});

describe('AnimatedCounter Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with prefix and suffix attached to count', () => {
    render(<AnimatedCounter from={10} to={10} prefix="$" suffix="+" />);
    expect(screen.getByText(/\$10\+/i)).toBeInTheDocument();
  });

  it('immediately displays the target value when reduced motion is preferred', () => {
    vi.mocked(framerMotion.useReducedMotion).mockReturnValue(true);

    render(<AnimatedCounter from={0} to={42} suffix="%" />);
    expect(screen.getByText('42%')).toBeInTheDocument();
  });

  it('renders default initial count when element is not yet in view', () => {
    vi.mocked(framerMotion.useInView).mockReturnValue(false);
    vi.mocked(framerMotion.useReducedMotion).mockReturnValue(false);

    render(<AnimatedCounter from={5} to={50} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('cleans up animation frame callback when unmounted during active animation', () => {
    vi.mocked(framerMotion.useInView).mockReturnValue(true);
    vi.mocked(framerMotion.useReducedMotion).mockReturnValue(false);

    const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame');
    const { unmount } = render(<AnimatedCounter from={0} to={100} duration={2} />);
    
    unmount();
    expect(cancelSpy).toHaveBeenCalled();
  });
});
