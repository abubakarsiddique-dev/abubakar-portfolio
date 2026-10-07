import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProjectModal from '../ProjectModal';
import { projectsData } from '../../data/projects';

describe('ProjectModal Component', () => {
  const sampleProject = projectsData[0];

  it('returns null and renders nothing when project is not provided', () => {
    const { container } = render(<ProjectModal project={null} onClose={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders modal dialog with project title, badge, and overview', () => {
    render(<ProjectModal project={sampleProject} onClose={vi.fn()} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: sampleProject.title })).toBeInTheDocument();
    expect(screen.getByText(sampleProject.badge)).toBeInTheDocument();
    expect(screen.getByText(sampleProject.tagline)).toBeInTheDocument();
  });

  it('renders key features and technology pills of the project', () => {
    render(<ProjectModal project={sampleProject} onClose={vi.fn()} />);

    sampleProject.features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });

    sampleProject.technologies.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it('calls onClose callback when close button is clicked', () => {
    const onCloseMock = vi.fn();
    render(<ProjectModal project={sampleProject} onClose={onCloseMock} />);

    const closeBtn = screen.getByRole('button', { name: /Close project modal/i });
    fireEvent.click(closeBtn);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onClose callback when Escape key is pressed', () => {
    const onCloseMock = vi.fn();
    render(<ProjectModal project={sampleProject} onClose={onCloseMock} />);

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
