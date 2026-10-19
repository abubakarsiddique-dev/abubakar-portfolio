import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ProjectCard from '../ProjectCard';

const mockProject = {
  id: 'test-project',
  title: 'Test App',
  tagline: 'High-performance testing application',
  category: 'Testing',
  badge: 'Mobile App',
  image: 'https://example.com/test-img.png',
  shortDescription: 'A comprehensive mock project used for testing component rendering.',
  technologies: ['Flutter', 'Dart', 'Firebase'],
  features: ['Real-time sync', 'Offline support', 'Authentication'],
  githubUrl: 'https://github.com/abubakarsiddique-dev/test-project',
  liveUrl: 'https://example.com/demo',
  demoType: 'live',
  githubStatus: 'public',
  githubStatusNote: 'Public Repository',
  proofPoints: ['100% test coverage', 'Clean architecture'],
  contribution: {
    role: 'Lead Mobile Developer',
    summary: 'Built full application architecture and state management.',
  },
};

describe('ProjectCard Component', () => {
  it('renders project title, tagline, badge, and description', () => {
    render(<ProjectCard project={mockProject} onOpenModal={vi.fn()} />);

    expect(screen.getByRole('heading', { name: /Test App/i })).toBeInTheDocument();
    expect(screen.getByText('High-performance testing application')).toBeInTheDocument();
    expect(screen.getByText('Mobile App')).toBeInTheDocument();
    expect(screen.getByText(/comprehensive mock project used for testing/i)).toBeInTheDocument();
  });

  it('renders technologies, features, proof points, and contribution role', () => {
    render(<ProjectCard project={mockProject} onOpenModal={vi.fn()} />);

    expect(screen.getByText('Flutter')).toBeInTheDocument();
    expect(screen.getByText('Dart')).toBeInTheDocument();
    expect(screen.getByText('Firebase')).toBeInTheDocument();

    expect(screen.getByText('Real-time sync')).toBeInTheDocument();
    expect(screen.getByText('Offline support')).toBeInTheDocument();

    expect(screen.getByText('100% test coverage')).toBeInTheDocument();
    expect(screen.getByText('Lead Mobile Developer')).toBeInTheDocument();
  });

  it('triggers onOpenModal callback with project data when clicking View Details button', () => {
    const handleOpenModal = vi.fn();
    render(<ProjectCard project={mockProject} onOpenModal={handleOpenModal} />);

    const detailsBtn = screen.getByRole('button', { name: /View details for Test App/i });
    fireEvent.click(detailsBtn);

    expect(handleOpenModal).toHaveBeenCalledTimes(1);
    expect(handleOpenModal).toHaveBeenCalledWith(mockProject);
  });

  it('renders open source link for public github repositories and live demo link', () => {
    render(<ProjectCard project={mockProject} onOpenModal={vi.fn()} />);

    const githubLink = screen.getByRole('link', { name: /View Test App repository on GitHub/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', mockProject.githubUrl);

    const demoLink = screen.getByRole('link', { name: /View Test App Live Demo/i });
    expect(demoLink).toBeInTheDocument();
    expect(demoLink).toHaveAttribute('href', mockProject.liveUrl);
  });

  it('renders private badge when githubStatus is private or not public', () => {
    const privateProject = {
      ...mockProject,
      githubStatus: 'private',
      liveUrl: '',
      demoType: 'apk',
    };

    render(<ProjectCard project={privateProject} onOpenModal={vi.fn()} />);

    expect(screen.getByText(/Private Repo/i)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /repository on GitHub/i })).not.toBeInTheDocument();
  });

  it('renders monogram placeholder if image is missing', () => {
    const noImageProject = {
      ...mockProject,
      image: null,
    };

    render(<ProjectCard project={noImageProject} onOpenModal={vi.fn()} />);

    expect(screen.getByText('TE')).toBeInTheDocument();
    expect(screen.getByText('Project Preview')).toBeInTheDocument();
  });
});
