import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import GithubSection from '../GithubSection';
import { profileData } from '../../data/profile';

describe('GithubSection Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders section title, badge, and descriptive prose', () => {
    render(<GithubSection />);

    expect(screen.getByRole('heading', { name: /Building in Public/i })).toBeInTheDocument();
    expect(screen.getByText(/Version Control & Source Code/i)).toBeInTheDocument();
    expect(screen.getByText(/I maintain active repositories on GitHub/i)).toBeInTheDocument();
  });

  it('renders secure external link to Abubakar Siddique GitHub profile', () => {
    render(<GithubSection />);

    const githubLink = screen.getByRole('link', { name: /View Abubakar Siddique GitHub Profile/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', profileData.socials.github);
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('smoothly scrolls to projects section when user clicks featured projects link', () => {
    const scrollIntoViewMock = vi.fn();
    const mockProjectsSection = document.createElement('div');
    mockProjectsSection.id = 'projects';
    mockProjectsSection.scrollIntoView = scrollIntoViewMock;
    document.body.appendChild(mockProjectsSection);

    render(<GithubSection />);

    const projectsLink = screen.getByRole('link', { name: /Navigate to Featured Projects Section/i });
    fireEvent.click(projectsLink);

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });

    document.body.removeChild(mockProjectsSection);
  });

  it('respects prefers-reduced-motion for internal navigation', () => {
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

    const scrollIntoViewMock = vi.fn();
    const mockProjectsSection = document.createElement('div');
    mockProjectsSection.id = 'projects';
    mockProjectsSection.scrollIntoView = scrollIntoViewMock;
    document.body.appendChild(mockProjectsSection);

    render(<GithubSection />);

    const projectsLink = screen.getByRole('link', { name: /Navigate to Featured Projects Section/i });
    fireEvent.click(projectsLink);

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'auto' });

    document.body.removeChild(mockProjectsSection);
  });
});
