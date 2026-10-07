import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Hero from '../Hero';
import { profileData } from '../../data/profile';

describe('Hero Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders hero title, subtitle, badge, and description', () => {
    render(<Hero />);

    expect(screen.getByText(profileData.heroBadge)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(profileData.heroHeading);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(profileData.heroSubheading);
    expect(screen.getByText(profileData.heroDescription)).toBeInTheDocument();
  });

  it('renders call to action links and social profile buttons', () => {
    render(<Hero />);

    const projectsLink = screen.getByRole('link', { name: /View Projects/i });
    expect(projectsLink).toHaveAttribute('href', '#projects');

    const hireMeLink = screen.getByRole('link', { name: /Hire Me/i });
    expect(hireMeLink).toHaveAttribute('href', '#contact');

    const githubLink = screen.getByRole('link', { name: /GitHub Profile/i });
    expect(githubLink).toHaveAttribute('href', profileData.socials.github);
  });

  it('allows switching between interactive code snippet tabs', () => {
    render(<Hero />);

    const providerTab = screen.getByRole('button', { name: 'provider.dart' });
    fireEvent.click(providerTab);

    expect(providerTab).toHaveClass('active');
    expect(screen.getByText(/class AuthNotifier extends ChangeNotifier/i)).toBeInTheDocument();

    const apiClientTab = screen.getByRole('button', { name: 'api_client.dart' });
    fireEvent.click(apiClientTab);

    expect(apiClientTab).toHaveClass('active');
    expect(screen.getByText(/class ApiClient/i)).toBeInTheDocument();
  });

  it('copies active code snippet to clipboard when copy button is clicked', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock
      }
    });

    render(<Hero />);

    const copyBtn = screen.getByRole('button', { name: /Copy code snippet/i });
    fireEvent.click(copyBtn);

    expect(writeTextMock).toHaveBeenCalled();
  });
});
