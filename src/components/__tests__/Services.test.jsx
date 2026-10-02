import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Services from '../Services';

describe('Services Component', () => {
  it('renders section heading and subtitle', () => {
    render(<Services />);

    expect(screen.getByText(/What I Can Build/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Services for Your Next Mobile Product/i })).toBeInTheDocument();
  });

  it('renders all three core service cards with titles and descriptions', () => {
    render(<Services />);

    expect(screen.getByText('Flutter MVP Development')).toBeInTheDocument();
    expect(screen.getByText(/Turn a validated idea into a polished cross-platform MVP/i)).toBeInTheDocument();

    expect(screen.getByText('Firebase Integration')).toBeInTheDocument();
    expect(screen.getByText(/Connect your app to dependable backend services/i)).toBeInTheDocument();

    expect(screen.getByText('UI Revamp & Bug Fixes')).toBeInTheDocument();
    expect(screen.getByText(/Improve an existing Flutter app with focused UI refinement/i)).toBeInTheDocument();
  });

  it('renders deliverables for each service offering', () => {
    render(<Services />);

    expect(screen.getByText('Product flow mapping')).toBeInTheDocument();
    expect(screen.getByText('Firebase Auth & Firestore')).toBeInTheDocument();
    expect(screen.getByText('UI consistency pass')).toBeInTheDocument();
  });

  it('renders CTA card and triggers smooth scroll to contact section on button click', () => {
    const scrollIntoViewMock = vi.fn();
    const mockContactSection = document.createElement('div');
    mockContactSection.id = 'contact';
    mockContactSection.scrollIntoView = scrollIntoViewMock;
    document.body.appendChild(mockContactSection);

    render(<Services />);

    const hireMeButton = screen.getByRole('link', { name: /Hire Me/i });
    expect(hireMeButton).toBeInTheDocument();
    expect(hireMeButton).toHaveAttribute('href', '#contact');

    fireEvent.click(hireMeButton);
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });

    document.body.removeChild(mockContactSection);
  });
});
