import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Projects from '../Projects';
import { projectsData } from '../../data/projects';

describe('Projects Component', () => {
  it('renders section title, subtitle, and trust summary metrics', () => {
    render(<Projects />);

    expect(screen.getByText(/My Works & Contributions/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Selected Projects/i })).toBeInTheDocument();
    expect(screen.getByText(/featured projects/i)).toBeInTheDocument();
  });

  it('renders all featured project titles in the catalog', () => {
    render(<Projects />);

    projectsData.forEach((project) => {
      expect(screen.getAllByText(project.title).length).toBeGreaterThan(0);
    });
  });

  it('opens ProjectModal dialog when a project card details action is clicked', async () => {
    render(<Projects />);

    const openButtons = screen.getAllByRole('button', { name: /View Details/i });
    expect(openButtons.length).toBeGreaterThan(0);

    fireEvent.click(openButtons[0]);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });
});
