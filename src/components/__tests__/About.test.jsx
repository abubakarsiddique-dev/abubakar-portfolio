import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from '../About';
import { profileData } from '../../data/profile';

describe('About Component', () => {
  it('renders section title, subtitle, and intro text', () => {
    render(<About />);

    expect(screen.getByText(/Background & Mindset/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /About Me/i })).toBeInTheDocument();
  });

  it('renders profile portrait image with descriptive alt text', () => {
    render(<About />);

    const img = screen.getByRole('img', { name: new RegExp(profileData.name, 'i') });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', profileData.profileImage);
  });

  it('renders philosophy heading and numbered engineering mindset bullets', () => {
    render(<About />);

    expect(screen.getByText(profileData.philosophy.heading)).toBeInTheDocument();
    profileData.philosophy.bullets.forEach((bullet) => {
      expect(screen.getByText(bullet)).toBeInTheDocument();
    });
  });

  it('renders narrative background story paragraphs', () => {
    render(<About />);

    profileData.aboutText.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
  });

  it('renders continuous learning topics and education badge', () => {
    render(<About />);

    expect(screen.getByText(profileData.education)).toBeInTheDocument();
    profileData.currentlyLearning.forEach((item) => {
      expect(screen.getByText(item.title, { selector: '.learning-name' })).toBeInTheDocument();
      expect(screen.getByText(item.detail)).toBeInTheDocument();
    });
  });
});
