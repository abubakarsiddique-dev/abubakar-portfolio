import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Navbar from '../Navbar';
import { profileData } from '../../data/profile';
import { navLinks } from '../../data/navigation';

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.body.removeAttribute('data-theme');
  });

  it('renders brand identity logo and desktop navigation links', () => {
    render(<Navbar />);

    expect(screen.getByText(profileData.shortName)).toBeInTheDocument();
    expect(screen.getByText(profileData.name)).toBeInTheDocument();

    navLinks.forEach((link) => {
      const desktopLinks = screen.getAllByRole('link', { name: new RegExp(link.name, 'i') });
      expect(desktopLinks.length).toBeGreaterThan(0);
    });
  });

  it('allows toggling between dark and light theme palettes', () => {
    render(<Navbar />);

    const lightThemeBtn = screen.getByRole('button', { name: /Switch to Light Theme/i });
    const darkThemeBtn = screen.getByRole('button', { name: /Switch to Dark Theme/i });

    fireEvent.click(lightThemeBtn);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(document.body.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');

    fireEvent.click(darkThemeBtn);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.body.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('toggles mobile menu open and closed when mobile hamburger button is clicked', () => {
    const { container } = render(<Navbar />);

    const mobileToggleBtn = container.querySelector('.mobile-toggle-btn');
    expect(mobileToggleBtn).toBeInTheDocument();
    expect(mobileToggleBtn).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(mobileToggleBtn);
    expect(mobileToggleBtn).toHaveAttribute('aria-expanded', 'true');
    expect(container.querySelector('.mobile-drawer')).toBeInTheDocument();
    expect(screen.getByText(/View Resume \/ CV/i)).toBeInTheDocument();

    fireEvent.click(mobileToggleBtn);
    expect(mobileToggleBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes mobile menu when user presses the Escape key', () => {
    const { container } = render(<Navbar />);

    const mobileToggleBtn = container.querySelector('.mobile-toggle-btn');
    fireEvent.click(mobileToggleBtn);
    expect(mobileToggleBtn).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mobileToggleBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens resume modal trigger when CV / Resume button is clicked', async () => {
    render(<Navbar />);

    const resumeBtn = screen.getByRole('button', { name: /Open Resume CV/i });
    fireEvent.click(resumeBtn);

    await waitFor(() => {
      expect(screen.getByRole('dialog', { hidden: true })).toBeInTheDocument();
    });
  });
});
