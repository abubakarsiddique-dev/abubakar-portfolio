import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Contact, { EMAIL_REGEX } from '../Contact';

// ---------------------------------------------------------------------------
// Smoke test — Contact renders without crashing
// ---------------------------------------------------------------------------
describe('Contact component', () => {
  it('renders the "Send A Message" heading', () => {
    render(<Contact />);
    expect(screen.getByText(/Send A Message/i)).toBeInTheDocument();
  });

  it('marks incomplete submissions as invalid without sending', () => {
    render(<Contact />);

    fireEvent.submit(screen.getByRole('button', { name: /Send Message/i }).closest('form'));

    expect(screen.getByRole('alert')).toHaveTextContent(/valid email address/i);
  });

  it('limits message length to keep contact requests manageable', () => {
    render(<Contact />);

    expect(screen.getByLabelText(/Message/i)).toHaveAttribute('maxLength', '2000');
    expect(screen.getByLabelText(/Your Name/i)).toHaveAttribute('maxLength', '80');
  });

  it('silently ignores submissions that trigger the bot trap', () => {
    render(<Contact />);

    fireEvent.change(screen.getByLabelText('Website'), { target: { value: 'https://spam.example' } });
    fireEvent.submit(screen.getByRole('button', { name: /Send Message/i }).closest('form'));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('updates real-time character count as user types in message', () => {
    render(<Contact />);
    const textarea = screen.getByLabelText(/Message/i);
    expect(screen.getByText(/0 \/ 2000/)).toBeInTheDocument();

    fireEvent.change(textarea, { target: { name: 'message', value: 'Hello Abubakar!' } });
    expect(screen.getByText(/15 \/ 2000/)).toBeInTheDocument();
  });

  it('provides accessible copy email button with initial state', () => {
    render(<Contact />);
    const copyBtn = screen.getByRole('button', { name: /Copy Email Address/i });
    expect(copyBtn).toHaveAttribute('type', 'button');
    expect(copyBtn).toBeInTheDocument();
  });

  it('configures honeypot bot trap field with tabIndex -1 and off autocomplete', () => {
    render(<Contact />);
    const honeypotInput = screen.getByLabelText('Website');
    expect(honeypotInput).toHaveAttribute('tabIndex', '-1');
    expect(honeypotInput).toHaveAttribute('autoComplete', 'off');
    expect(honeypotInput.closest('.contact-honeypot')).toHaveAttribute('aria-hidden', 'true');
  });
});


// ---------------------------------------------------------------------------
// EMAIL_REGEX unit tests
// ---------------------------------------------------------------------------
describe('EMAIL_REGEX', () => {
  it('accepts valid email addresses', () => {
    expect(EMAIL_REGEX.test('user@example.com')).toBe(true);
    expect(EMAIL_REGEX.test('first.last+tag@sub.domain.org')).toBe(true);
  });

  it('rejects invalid email addresses', () => {
    expect(EMAIL_REGEX.test('notanemail')).toBe(false);
    expect(EMAIL_REGEX.test('missing@tld')).toBe(false);
  });
});
