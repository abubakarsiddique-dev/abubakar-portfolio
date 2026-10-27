import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Journey from '../Journey';
import { profileData } from '../../data/profile';

describe('Journey Component', () => {
  it('renders section title, subtitle, and descriptive text', () => {
    render(<Journey />);

    expect(screen.getByText(/Academic & Technical Path/i)).toBeInTheDocument();
    expect(screen.getByText(/My Development Journey/i)).toBeInTheDocument();
    expect(screen.getByText(/A transparent timeline of my software engineering studies/i)).toBeInTheDocument();
  });

  it('renders each journey milestone with role, institution, and skills', () => {
    render(<Journey />);

    profileData.journey.forEach((milestone) => {
      expect(screen.getByText(milestone.period)).toBeInTheDocument();
      expect(screen.getByText(milestone.role)).toBeInTheDocument();
      expect(screen.getByText(milestone.institution)).toBeInTheDocument();
      expect(screen.getByText(milestone.description)).toBeInTheDocument();

      milestone.skills.forEach((skill) => {
        expect(screen.getByText(skill)).toBeInTheDocument();
      });
    });
  });

  it('renders experience section anchor and alternating timeline layout classes', () => {
    const { container } = render(<Journey />);

    const section = container.querySelector('#experience');
    expect(section).toBeInTheDocument();

    const timelineItems = container.querySelectorAll('.timeline-item');
    expect(timelineItems.length).toBe(profileData.journey.length);

    timelineItems.forEach((item, idx) => {
      const expectedClass = idx % 2 === 0 ? 'left' : 'right';
      expect(item).toHaveClass(expectedClass);
    });
  });
});
