import { describe, expect, it } from 'vitest';
import { extractSocialUsername, formatSocialDisplay, socialLinks } from '../socialLinks';

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
    expect(formatSocialDisplay(undefined)).toBe('');
    expect(formatSocialDisplay(12345)).toBe('');
  });

  it('extracts username handle from standard profile links', () => {
    expect(extractSocialUsername('https://github.com/abubakarsiddique-dev')).toBe('abubakarsiddique-dev');
    expect(extractSocialUsername('https://linkedin.com/in/abu-bakar-siddique-a82747425/')).toBe('abu-bakar-siddique-a82747425');
  });

  it('handles invalid or non-string inputs safely in extractSocialUsername', () => {
    expect(extractSocialUsername('')).toBe('');
    expect(extractSocialUsername(null)).toBe('');
    expect(extractSocialUsername('https://github.com/')).toBe('');
  });
});

