import { describe, expect, it } from 'vitest';
import { projectsData } from '../projects';

describe('projects data schema and integrity', () => {
  it('keeps project records uniquely identified and named', () => {
    const ids = projectsData.map(({ id }) => id);
    const titles = projectsData.map(({ title }) => title);

    expect(projectsData.length).toBeGreaterThan(0);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it('ensures all projects have required display fields and non-empty technology stacks', () => {
    for (const project of projectsData) {
      expect(project.id).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.tagline).toBeTruthy();
      expect(project.category).toBeTruthy();
      expect(project.badge).toBeTruthy();
      expect(project.shortDescription).toBeTruthy();
      expect(Array.isArray(project.technologies)).toBe(true);
      expect(project.technologies.length).toBeGreaterThan(0);
      expect(Array.isArray(project.features)).toBe(true);
      expect(project.features.length).toBeGreaterThan(0);
    }
  });

  it('validates repository links and demo type consistency', () => {
    const validGithubStatuses = ['public', 'private', 'case-study'];
    const validDemoTypes = ['live', 'video', 'apk', 'none'];

    for (const project of projectsData) {
      expect(validGithubStatuses).toContain(project.githubStatus);
      expect(validDemoTypes).toContain(project.demoType);

      if (project.githubStatus === 'public') {
        expect(project.githubUrl).toMatch(/^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+$/);
      }
    }
  });

  it('validates architectural case-study modal data structure', () => {
    for (const project of projectsData) {
      expect(project.modalData).toBeDefined();
      expect(typeof project.modalData.problem).toBe('string');
      expect(typeof project.modalData.solution).toBe('string');
      expect(typeof project.modalData.result).toBe('string');
      expect(Array.isArray(project.modalData.challenges)).toBe(true);
      expect(project.modalData.challenges.length).toBeGreaterThan(0);

      expect(project.contribution).toBeDefined();
      expect(project.contribution.role).toBeTruthy();
      expect(Array.isArray(project.contribution.responsibilities)).toBe(true);
      expect(project.contribution.responsibilities.length).toBeGreaterThan(0);
    }
  });
});
