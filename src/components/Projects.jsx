import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { projectsData } from '../data/projects';

const ProjectModal = React.lazy(() => import('./ProjectModal'));
import { socialLinks } from '../data/socialLinks';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function Projects() {
  const [activeModalProject, setActiveModalProject] = useState(null);
  const fullStackProjects = projectsData.filter((project) => project.projectType === 'full-stack');
  const contributedProjects = projectsData.filter((project) => project.projectType === 'contributed');
  const privateCount = projectsData.filter((project) => project.githubStatus === 'private').length;
  const soloCount = projectsData.filter((project) => project.contribution?.team === 'Solo project').length;

  const renderProjectGrid = (projects) => (
    <motion.div layout className="projects-grid">
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectCard
              project={project}
              onOpenModal={(proj) => setActiveModalProject(proj)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <section id="projects" className="section projects-section" aria-labelledby="projects-title">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">My Works & Contributions</span>
          <h2 id="projects-title" className="section-title">Selected Projects</h2>
          <p className="section-description">
            A transparent view of the products I built or contributed to, with clear ownership, verified scope, technical decisions, and available evidence for each project.
          </p>
        </div>

        <div className="project-trust-strip" aria-label="Project portfolio summary">
          <div className="project-trust-item">
            <strong>{projectsData.length}</strong>
            <span>featured projects</span>
          </div>
          <div className="project-trust-item">
            <strong>{fullStackProjects.length}</strong>
            <span>full-stack builds</span>
          </div>
          <div className="project-trust-item">
            <strong>{soloCount}</strong>
            <span>solo implementation</span>
          </div>
          <div className="project-trust-item">
            <strong>{privateCount}</strong>
            <span>private/client repos</span>
          </div>
        </div>

        <div className="project-group">
          <div className="project-group-heading">
            <span className="project-group-kicker">01 / Complete Builds</span>
            <h3>Full-Stack Projects</h3>
            <p>Products where I handled the application experience together with backend and data flows.</p>
          </div>
          {renderProjectGrid(fullStackProjects)}
        </div>

        <div className="project-group project-group-contributed">
          <div className="project-group-heading">
            <span className="project-group-kicker">02 / Team Experience</span>
            <h3>Contributed Projects</h3>
            <p>Team products where my contribution focused on UI, selected backend work, or a dedicated admin experience.</p>
          </div>
          {renderProjectGrid(contributedProjects)}
        </div>

        {/* View All Projects on GitHub CTA */}
        <div className="projects-more-cta">
          <div className="projects-more-card">
            <div className="projects-more-info">
              <h3 className="projects-more-title">Looking for more projects?</h3>
              <p className="projects-more-desc">
                Some client repositories remain private. Explore my public GitHub activity, then request a walkthrough of any private case study.
              </p>
            </div>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary github-more-btn"
            >
              <FaGithub style={{ fontSize: '1.25rem' }} />
              <span>Go to My GitHub Profile</span>
              <FaExternalLinkAlt style={{ fontSize: '0.85rem', opacity: 0.85 }} />
            </a>
          </div>
        </div>
      </div>

      {/* Modal Render */}
      {activeModalProject && (
        <React.Suspense fallback={null}>
          <ProjectModal
            project={activeModalProject}
            onClose={() => setActiveModalProject(null)}
          />
        </React.Suspense>
      )}

      <style>{`
        .projects-section {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.75rem;
        }

        .project-trust-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          margin: 2rem 0 3.5rem;
          background: var(--border-color);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          overflow: hidden;
        }

        .project-trust-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 1.1rem 1.25rem;
          background: var(--bg-card);
        }

        .project-trust-item strong {
          color: var(--accent-primary);
          font-family: var(--font-heading);
          font-size: 1.45rem;
          font-weight: 500;
        }

        .project-trust-item span {
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 0.72rem;
        }

        .project-group + .project-group {
          margin-top: 4.5rem;
        }

        .project-group-heading {
          max-width: 680px;
          margin-bottom: 1.5rem;
        }

        .project-group-kicker {
          display: block;
          margin-bottom: 0.35rem;
          color: var(--accent-primary);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .project-group-heading h3 {
          margin-bottom: 0.35rem;
          color: var(--text-primary);
          font-family: var(--font-heading);
          font-size: 1.65rem;
          font-weight: 500;
        }

        .project-group-heading p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .projects-more-cta {
          margin-top: 3.5rem;
          display: flex;
          justify-content: center;
        }

        .projects-more-card {
          width: 100%;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-left: 2px solid var(--accent-primary);
          border-radius: var(--radius-sm);
          padding: 2rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          transition: all var(--transition-normal);
          position: relative;
        }

        .projects-more-card:hover {
          border-color: var(--accent-primary);
        }

        .projects-more-title {
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
          font-family: var(--font-heading);
        }

        .projects-more-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .github-more-btn {
          padding: 0.75rem 1.5rem;
          font-size: 0.925rem;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          white-space: nowrap;
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }

          .projects-more-card {
            flex-direction: column;
            text-align: center;
            padding: 1.75rem 1.5rem;
            gap: 1.25rem;
          }

          .project-trust-strip {
            grid-template-columns: repeat(2, 1fr);
          }

          .github-more-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
