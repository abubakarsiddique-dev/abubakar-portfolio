import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaCodeBranch, FaFolderOpen } from 'react-icons/fa';
import { profileData } from '../data/profile';

export default function GithubSection() {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      targetEl.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section id="github" className="section github-section" aria-labelledby="github-title">
      <div className="container">
        <motion.div
          className="card github-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="github-content-wrapper">
            <div className="github-badge">
              <FaCodeBranch />
              <span>Version Control & Source Code</span>
            </div>

            <h2 id="github-title" className="github-title">Building in Public</h2>

            <div className="github-prose">
              <p>
                I maintain active repositories on GitHub to manage my Flutter projects, document bug resolutions, track state management refactoring, and preserve clean commit histories.
              </p>
              <p>
                All featured application codebases — including multi-role Firestore permissions and client UI state listeners — are version-controlled with structured feature branches.
              </p>
            </div>

            <div className="github-actions">
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                aria-label="View Abubakar Siddique GitHub Profile"
              >
                <FaGithub />
                <span>View GitHub Profile</span>
              </a>

              <a
                href="#projects"
                onClick={(e) => handleNavClick(e, '#projects')}
                className="btn btn-secondary"
                aria-label="Navigate to Featured Projects Section"
              >
                <FaFolderOpen />
                <span>View Featured Projects</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .github-section {
          padding-top: 4rem;
          padding-bottom: 4rem;
        }

        .github-card {
          padding: 3rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
        }

        .github-content-wrapper {
          max-width: 720px;
        }

        .github-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--accent-primary);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-sm);
          font-size: 0.825rem;
          font-weight: 500;
          font-family: var(--font-mono);
          margin-bottom: 1.25rem;
        }

        .github-title {
          font-size: 2.25rem;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
          font-family: var(--font-heading);
        }

        .github-prose {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .github-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 900px) {
          .github-card {
            padding: 1.75rem;
          }
        }
      `}</style>
    </section>
  );
}
