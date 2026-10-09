import { describe, expect, it } from 'vitest';
import { formatSocialDisplay, socialLinks } from '../socialLinks';

describe('social link helpers', () => {
  it('keeps public profile URLs available for navigation', () => {
    expect(socialLinks.github).toMatch(/^https:\/\/github\.com\//);
    expect(socialLinks.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\//);
  });

  it('formats profile URLs without a protocol or trailing slash', () => {
    expect(formatSocialDisplay('https://github.com/abubakarsiddique-dev/')).toBe('github.com/abubakarsiddique-dev');
    expect(formatSocialDisplay('')).toBe('');
  });

  it('normalizes accidental whitespace around a profile URL', () => {
    expect(formatSocialDisplay('  https://github.com/abubakarsiddique-dev/  ')).toBe('github.com/abubakarsiddique-dev');
  });

  it('returns an empty display value for non-string input', () => {
    expect(formatSocialDisplay(null)).toBe('');
  });
});
