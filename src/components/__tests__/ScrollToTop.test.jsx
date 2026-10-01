import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ScrollToTop from '../ScrollToTop';

describe('ScrollToTop Component', () => {
  beforeEach(() => {
    window.scrollY = 0;
    vi.restoreAllMocks();
  });

  it('remains hidden when scroll position is at or below the 350px threshold', () => {
    window.scrollY = 200;
    render(<ScrollToTop />);
    expect(screen.queryByRole('button', { name: /Scroll to top of page/i })).not.toBeInTheDocument();
  });

  it('becomes visible when window scroll exceeds 350px', () => {
    render(<ScrollToTop />);

    act(() => {
      window.scrollY = 450;
      window.dispatchEvent(new Event('scroll'));
    });

    const button = screen.getByRole('button', { name: /Scroll to top of page/i });
    expect(button).toBeInTheDocument();
  });

  it('triggers window.scrollTo with smooth behavior on click by default', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(<ScrollToTop />);

    act(() => {
      window.scrollY = 600;
      window.dispatchEvent(new Event('scroll'));
    });

    const button = screen.getByRole('button', { name: /Scroll to top of page/i });
    fireEvent.click(button);

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    });
  });

  it('respects prefers-reduced-motion when user prefers instant scrolling', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<ScrollToTop />);

    act(() => {
      window.scrollY = 500;
      window.dispatchEvent(new Event('scroll'));
    });

    const button = screen.getByRole('button', { name: /Scroll to top of page/i });
    fireEvent.click(button);

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: 'auto'
    });
  });

  it('cleans up scroll event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<ScrollToTop />);

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
