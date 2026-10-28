import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaInfoCircle, 
  FaCheck, 
  FaLock, 
  FaBookOpen 
} from 'react-icons/fa';
import { getDemoIcon } from '../utils/iconMap';

export default function ProjectCard({ project, onOpenModal }) {
  const getDemoTitle = () => {
    switch (project.demoType) {
      case 'video':
        return 'Watch Demo Video';
      case 'apk':
        return 'Download APK';
      case 'live':
        return 'Live Demo';
      default:
        return 'Case Study Only';
    }
  };

  return (
    <motion.div
      className="card project-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <div className="project-image-container">
        {project.image ? (
          <img src={project.image} alt={`${project.title} app preview`} className="project-img" width="600" height="340" loading="lazy" decoding="async" />
        ) : (
          <div className="project-image-placeholder" aria-label={`${project.title} project preview placeholder`}>
            <span className="placeholder-monogram">{project.title.slice(0, 2).toUpperCase()}</span>
            <span className="placeholder-label">Project Preview</span>
          </div>
        )}
        <div className="project-image-overlay">
          <span className="project-category-badge">{project.badge}</span>
          <span className={`project-status-badge ${project.githubStatus || 'private'}`}>
            {project.githubStatus === 'public' ? (
              <>Open Source</>
            ) : project.githubStatus === 'case-study' ? (
              <><FaBookOpen className="badge-icon" aria-hidden="true" /> Case Study</>
            ) : (
              <><FaLock className="badge-icon" aria-hidden="true" /> Private Repo</>
            )}
          </span>
        </div>
      </div>

      <div className="project-card-body">
        <div className="project-header">
          <h3 className="project-title">{project.title}</h3>
          <span className="project-tagline">{project.tagline}</span>
        </div>

        <p className="project-description">{project.shortDescription}</p>

        {project.contribution && (
          <div className="project-contribution-summary">
            <div className="contribution-summary-label">My Contribution</div>
            <div className="contribution-summary-role">{project.contribution.role}</div>
            <p>{project.contribution.summary}</p>
          </div>
        )}

        {project.proofPoints?.length > 0 && (
          <div className="project-proof-points" aria-label={`${project.title} verified scope`}>
            <div className="proof-points-label">Verified scope</div>
            {project.proofPoints.slice(0, 2).map((point) => (
              <span key={point} className="proof-point">{point}</span>
            ))}
          </div>
        )}

        <ul className="project-features-list">
          {project.features.slice(0, 3).map((feat, idx) => (
            <li key={idx} className="feature-item">
              <FaCheck className="feature-check" aria-hidden="true" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        <div className="project-tech-stack">
          {project.technologies.map((tech, tIdx) => (
            <span key={tIdx} className="tech-badge">{tech}</span>
          ))}
        </div>

        <div className="project-card-actions">
          <button
            type="button"
            className="btn btn-primary btn-sm flex-1"
            onClick={() => onOpenModal(project)}
            aria-label={`View details for ${project.title}`}
          >
            <FaInfoCircle aria-hidden="true" />
            <span>View Details</span>
          </button>

          {/* Source Code Action Button or Badge */}
          {Boolean(project.githubUrl) && project.githubStatus === 'public' ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              title="View Source on GitHub"
              aria-label={`View ${project.title} repository on GitHub`}
            >
              <FaGithub aria-hidden="true" />
            </a>
          ) : (
            <span 
              className="action-status-badge repo-badge"
              title={project.githubStatusNote || "Private Repository (Available Upon Request)"}
            >
              <FaLock className="badge-icon" />
              <span>{project.githubStatus === 'case-study' ? 'Case Study' : 'Private'}</span>
            </span>
          )}

          {/* Demo Action Button or Badge */}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              title={getDemoTitle()}
              aria-label={`View ${project.title} ${getDemoTitle()}`}
            >
              {getDemoIcon(project.demoType)}
            </a>
          ) : (
            <span 
              className="action-status-badge demo-badge"
              title={`Demo Format: ${getDemoTitle()}`}
            >
              {getDemoIcon(project.demoType)}
              <span>{project.demoType === 'apk' ? 'APK' : project.demoType === 'video' ? 'Video' : project.demoType === 'live' ? 'Live' : 'Overview'}</span>
            </span>
          )}
        </div>
      </div>

      <style>{`
        .project-card {
          padding: 0;
          display: flex;
          flex-direction: column;
          height: 100%;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
        }

        .project-image-container {
          position: relative;
          width: 100%;
          height: 230px;
          overflow: hidden;
          background: var(--bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .project-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: var(--radius-sm);
          transition: transform var(--transition-slow);
        }

        .project-image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background: linear-gradient(135deg, var(--bg-primary), var(--bg-card-hover));
          color: var(--accent-primary);
          font-family: var(--font-mono);
        }

        .placeholder-monogram {
          display: grid;
          place-items: center;
          width: 76px;
          height: 76px;
          border: 1px solid var(--accent-primary);
          border-radius: var(--radius-md);
          font-family: var(--font-heading);
          font-size: 2rem;
          color: var(--text-primary);
        }

        .placeholder-label {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .project-card:hover .project-img {
          transform: scale(1.02);
        }

        .project-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 55%, var(--bg-primary) 100%);
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 0.85rem;
          pointer-events: none;
        }

        .project-category-badge {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
          pointer-events: auto;
        }

        .project-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 0.725rem;
          font-weight: 500;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
          pointer-events: auto;
        }

        .project-status-badge.public {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        .badge-icon {
          font-size: 0.7rem;
        }

        .project-card-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .project-header {
          margin-bottom: 0.75rem;
        }

        .project-title {
          font-size: 1.35rem;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
          font-family: var(--font-heading);
        }

        .project-tagline {
          font-size: 0.85rem;
          color: var(--accent-primary);
          font-weight: 500;
          font-family: var(--font-mono);
        }

        .project-description {
          font-size: 0.925rem;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
          line-height: 1.6;
        }

        .project-contribution-summary {
          margin-bottom: 1.25rem;
          padding: 0.85rem 1rem;
          background: var(--bg-secondary);
          border-left: 2px solid var(--accent-primary);
          border-radius: var(--radius-sm);
        }

        .contribution-summary-label {
          color: var(--accent-primary);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.2rem;
        }

        .contribution-summary-role {
          color: var(--text-primary);
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .project-contribution-summary p {
          color: var(--text-muted);
          font-size: 0.8rem;
          line-height: 1.5;
          margin: 0;
        }

        .project-proof-points {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin-bottom: 1.1rem;
          padding: 0.8rem 0.9rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
        }

        .proof-points-label {
          color: var(--accent-primary);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .proof-point {
          color: var(--text-secondary);
          font-size: 0.78rem;
          line-height: 1.45;
        }

        .project-features-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-bottom: 1.25rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.825rem;
          color: var(--text-secondary);
        }

        .feature-check {
          color: var(--accent-primary);
          font-size: 0.75rem;
          flex-shrink: 0;
        }

        .project-tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: auto;
          padding-top: 1rem;
          margin-bottom: 1.25rem;
          border-top: 1px solid var(--border-color);
        }

        .tech-badge {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 0.75rem;
          font-weight: 400;
          font-family: var(--font-mono);
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
        }

        .project-card-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .flex-1 {
          flex: 1;
        }

        .action-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.775rem;
          font-weight: 500;
          font-family: var(--font-mono);
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          white-space: nowrap;
        }

        .repo-badge {
          color: var(--accent-primary);
          border-color: var(--border-color);
        }

        .demo-badge {
          color: var(--accent-primary);
          border-color: var(--border-color);
        }

        @media (max-width: 640px) {
          .project-image-container {
            height: 200px;
          }
        }
      `}</style>
    </motion.div>
  );
}

