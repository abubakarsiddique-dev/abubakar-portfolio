import { describe, expect, it } from 'vitest';
import { navLinks } from '../navigation';

describe('navigation data', () => {
  it('contains unique labels and section targets', () => {
    const labels = navLinks.map(({ name }) => name);
    const targets = navLinks.map(({ href }) => href);

    expect(new Set(labels).size).toBe(labels.length);
    expect(new Set(targets).size).toBe(targets.length);
    expect(targets.every((href) => href.startsWith('#'))).toBe(true);
  });

  it('keeps the primary portfolio sections in navigation', () => {
    const targets = navLinks.map(({ href }) => href);

    expect(targets).toEqual(expect.arrayContaining([
      '#home', '#about', '#projects', '#services', '#skills', '#experience', '#contact',
    ]));
  });

  it('ensures each navigation item defines a valid icon component and non-empty label', () => {
    for (const link of navLinks) {
      expect(typeof link.name).toBe('string');
      expect(link.name.trim().length).toBeGreaterThan(0);
      expect(typeof link.href).toBe('string');
      expect(typeof link.icon).toBe('function');
    }
  });
});

