import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Skills from '../Skills';
import { skillCategories } from '../../data/skills';

describe('Skills Component', () => {
  it('renders section title, subtitle, and all category filter tabs', () => {
    render(<Skills />);

    expect(screen.getByText(/Technical Proficiency/i)).toBeInTheDocument();
    expect(screen.getByText(/Skills & Technologies/i)).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /All Skills/i })).toBeInTheDocument();

    skillCategories.forEach((cat) => {
      expect(screen.getByRole('tab', { name: new RegExp(cat.title, 'i') })).toBeInTheDocument();
    });
  });

  it('renders skill categories and skills when All Skills tab is active', () => {
    render(<Skills />);

    skillCategories.forEach((cat) => {
      expect(screen.getByText(cat.title, { selector: 'h3' })).toBeInTheDocument();
      cat.skills.forEach((skill) => {
        expect(screen.getByText(skill.name)).toBeInTheDocument();
      });
    });
  });

  it('filters visible skills when clicking a specific category tab', () => {
    render(<Skills />);

    const mobileTab = screen.getByRole('tab', { name: /Mobile Development/i });
    fireEvent.click(mobileTab);

    expect(screen.getByText('Mobile Development', { selector: 'h3' })).toBeInTheDocument();
    // Non-matching category heading should not be present
    expect(screen.queryByText('Backend & Services', { selector: 'h3' })).not.toBeInTheDocument();

    // Clicking All Skills restores all categories
    fireEvent.click(screen.getByRole('tab', { name: /All Skills/i }));
    expect(screen.getByText('Backend & Services', { selector: 'h3' })).toBeInTheDocument();
  });
});
