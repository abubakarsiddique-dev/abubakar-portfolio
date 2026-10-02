import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Footer from '../Footer';
import { profileData } from '../../data/profile';
import { navLinks } from '../../data/navigation';

describe('Footer Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders brand identity, short name badge, and professional tagline', () => {
    render(<Footer />);

    expect(screen.getByText(profileData.shortName)).toBeInTheDocument();
    expect(screen.getByText(profileData.name)).toBeInTheDocument();
    expect(screen.getByText(/Flutter App Developer · Firebase Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()} Abubakar Siddique`, 'i'))).toBeInTheDocument();
  });

  it('renders navigation links mapped from navigation configuration', () => {
    render(<Footer />);

    navLinks.forEach((link) => {
      const navItem = screen.getByRole('link', { name: link.name });
      expect(navItem).toBeInTheDocument();
      expect(navItem).toHaveAttribute('href', link.href);
    });
  });

  it('renders secure social and contact communication channels', () => {
    render(<Footer />);

    const githubLink = screen.getByRole('link', { name: /GitHub Profile/i });
    expect(githubLink).toHaveAttribute('href', profileData.socials.github);
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

    const linkedinLink = screen.getByRole('link', { name: /LinkedIn Profile/i });
    expect(linkedinLink).toHaveAttribute('href', profileData.socials.linkedin);
    expect(linkedinLink).toHaveAttribute('target', '_blank');

    const mailLink = screen.getByRole('link', { name: /Send Direct Email/i });
    expect(mailLink).toHaveAttribute('href', profileData.socials.mailto);
  });

  it('scrolls to top when clicking back to top button', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(<Footer />);

    const backToTopButton = screen.getByRole('button', { name: /Back to top of page/i });
    fireEvent.click(backToTopButton);

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    });
  });
});
