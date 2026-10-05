import React, { useEffect } from 'react';
import '../styles/modal-shared.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, 
  FaGithub, 
  FaExternalLinkAlt, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaLightbulb, 
  FaUserCheck,
  FaLock,
  FaVideo,
  FaAndroid,
  FaBookOpen,
  FaShieldAlt
} from 'react-icons/fa';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  const renderDemoButton = () => {
    if (project.liveUrl) {
      if (project.demoType === 'video') {
        return (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
            aria-label={`Watch ${project.title} demo video`}
          >
            <FaVideo /> Watch Demo Video
          </a>
        );
      }
      if (project.demoType === 'apk') {
        return (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
            aria-label={`Download ${project.title} APK`}
          >
            <FaAndroid /> Download APK
          </a>
        );
      }
      return (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm"
          aria-label={`View ${project.title} live demo`}
        >
          <FaExternalLinkAlt /> Live Web Demo
        </a>
      );
    }

    // Secondary informative label if no direct URL is configured yet
    if (project.demoType === 'apk') {
      return (
        <span className="modal-status-badge-inline" title="APK Download">
          <FaAndroid /> Android APK
        </span>
      );
    }
    if (project.demoType === 'video') {
      return (
        <span className="modal-status-badge-inline" title="Video Recording">
          <FaVideo /> Video Demo
        </span>
      );
    }
    if (project.demoType === 'live') {
      return (
        <span className="modal-status-badge-inline" title="Web Build">
          <FaExternalLinkAlt /> Web Hosted
        </span>
      );
    }
    return (
      <span className="modal-status-badge-inline" title="Case Study Only">
        <FaBookOpen /> Case Study
      </span>
    );
  };

  return (
    <AnimatePresence>
      <div key="project-modal-backdrop" className="shared-modal-backdrop modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <motion.div
          className="shared-modal-container modal-content glass-panel"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
        >
          {/* Modal Header Bar */}
          <div className="modal-header">
            <div className="modal-header-badges">
              <span className="modal-badge">{project.badge}</span>
              <span className={`modal-status-pill ${project.githubStatus || 'private'}`}>
                {project.githubStatus === 'public' ? 'Open Source' : project.githubStatus === 'case-study' ? 'Academic Case Study' : 'Private Repository'}
              </span>
            </div>
            <button type="button" className="shared-modal-close-btn" onClick={onClose} aria-label="Close project modal">
              <FaTimes />
            </button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            {/* Banner Image Container */}
            <div className="modal-image-wrapper">
              {project.image ? (
                <img src={project.image} alt={`${project.title} Screenshot`} className="modal-banner-img" width="800" height="400" loading="lazy" decoding="async" />
              ) : (
                <div className="modal-image-placeholder">
                  <span>{project.title.slice(0, 2).toUpperCase()}</span>
                  <small>Project preview available on request</small>
                </div>
              )}
              <div className="modal-banner-info">
                <h2 id="modal-title" className="modal-title">{project.title}</h2>
                <p className="modal-tagline">{project.tagline}</p>
              </div>
            </div>

            {/* Quick Actions & Tech Stack */}
            <div className="modal-quick-bar">
              <div className="modal-tech-pills">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="modal-tech-tag">{tech}</span>
                ))}
              </div>
              <div className="modal-action-btns">
                {project.githubUrl && project.githubStatus === 'public' ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    aria-label={`View ${project.title} GitHub repository`}
                  >
                    <FaGithub /> View Source
                  </a>
                ) : (
                  <span className="modal-status-badge-inline" title={project.githubStatusNote}>
                    <FaLock /> {project.githubStatus === 'case-study' ? 'Case Study Code' : 'Private Repo'}
                  </span>
                )}
                {renderDemoButton()}
              </div>
            </div>

            {/* Repository Visibility Notice */}
            {project.githubStatus !== 'public' && (
              <div className="modal-notice-banner">
                <FaShieldAlt className="notice-icon" />
                <span>
                  <strong>Repository Note:</strong> {project.githubStatusNote || 'This codebase is kept in a private repository for client/academic confidentiality. Architecture, database schemas, and implementation patterns are outlined below.'}
                </span>
              </div>
            )}

            {/* Overview */}
            <div className="modal-section">
              <h3 className="modal-section-title">Overview</h3>
              <p className="modal-text">{project.shortDescription}</p>
            </div>

            {project.proofPoints?.length > 0 && (
              <div className="modal-section modal-proof-section">
                <h3 className="modal-section-title">Proof Points & Scope</h3>
                <div className="modal-proof-grid">
                  {project.proofPoints.map((point) => (
                    <div key={point} className="modal-proof-item">
                      <FaCheckCircle className="check-icon" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Problem & Solution Grid */}
            <div className="modal-grid-2">
              <div className="card modal-card problem-card">
                <div className="modal-card-header text-red">
                  <FaExclamationTriangle className="modal-icon" />
                  <h4>The Engineering Challenge</h4>
                </div>
                <p className="modal-card-text">{project.modalData.problem}</p>
              </div>

              <div className="card modal-card solution-card">
                <div className="modal-card-header text-cyan">
                  <FaLightbulb className="modal-icon" />
                  <h4>The Architectural Solution</h4>
                </div>
                <p className="modal-card-text">{project.modalData.solution}</p>
              </div>
            </div>

            {project.modalData.result && (
              <div className="card modal-result-card">
                <div className="modal-card-header text-cyan">
                  <FaCheckCircle className="modal-icon" />
                  <h4>The Result</h4>
                </div>
                <p className="modal-card-text">{project.modalData.result}</p>
              </div>
            )}

            {/* Features List */}
            <div className="modal-section">
              <h3 className="modal-section-title">Key Implemented Features</h3>
              <div className="modal-features-grid">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="modal-feature-item">
                    <FaCheckCircle className="check-icon" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contribution & Key Challenges */}
            <div className="modal-grid-2">
              <div className="modal-section">
                <h3 className="modal-section-title">
                  <FaUserCheck className="inline-icon text-cyan" /> My Specific Contribution
                </h3>
                {project.contribution ? (
                  <div className="modal-contribution-panel">
                    <div className="modal-contribution-role">{project.contribution.role}</div>
                    <p className="modal-text">{project.contribution.summary}</p>
                    <ul className="modal-contribution-list">
                      {project.contribution.responsibilities.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                    <span className="modal-team-label">{project.contribution.team}</span>
                  </div>
                ) : (
                  <p className="modal-text">{project.modalData.contribution}</p>
                )}
              </div>

              <div className="modal-section">
                <h3 className="modal-section-title">Technical Challenges Overcome</h3>
                <ul className="modal-bullets">
                  {project.modalData.challenges.map((challenge, cIdx) => (
                    <li key={cIdx}>{challenge}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose} aria-label="Close case study details">
              Close Details
            </button>
          </div>
        </motion.div>
      </div>

      <style>{`
        .modal-content {
          background: var(--bg-secondary);
          max-width: 860px;
          max-height: 90vh;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--border-color);
          background: var(--bg-primary);
        }

        .modal-header-badges {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .modal-badge {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--accent-primary);
          font-family: var(--font-mono);
          font-size: 0.775rem;
          font-weight: 500;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
        }

        .modal-status-pill {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
        }

        .modal-status-pill.public {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        .modal-status-badge-inline {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-sm);
          font-size: 0.825rem;
          font-weight: 500;
          font-family: var(--font-mono);
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--accent-primary);
        }

        .modal-notice-banner {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 0.85rem 1.15rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .modal-notice-banner .notice-icon {
          color: var(--accent-primary);
          font-size: 1.1rem;
          flex-shrink: 0;
          margin-top: 0.15rem;
        }



        .modal-body {
          padding: 1.5rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .modal-image-wrapper {
          position: relative;
          width: 100%;
          height: 320px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background: var(--bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border: 1px solid var(--border-color);
        }

        .modal-banner-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: var(--radius-sm);
        }

        .modal-image-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--bg-primary), var(--bg-card-hover));
          color: var(--text-primary);
          font-family: var(--font-heading);
          font-size: 3rem;
        }

        .modal-image-placeholder small {
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 0.7rem;
        }

        .modal-banner-info {
          position: absolute;
          bottom: 0.75rem;
          left: 1rem;
          right: 1rem;
          background: var(--bg-secondary);
          padding: 0.6rem 1rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--text-primary);
          font-family: var(--font-heading);
        }

        .modal-tagline {
          font-size: 0.85rem;
          color: var(--accent-primary);
          font-weight: 500;
          font-family: var(--font-mono);
        }

        .modal-quick-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-color);
        }

        .modal-tech-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .modal-tech-tag {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-size: 0.775rem;
          font-weight: 400;
          font-family: var(--font-mono);
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-sm);
        }

        .modal-action-btns {
          display: flex;
          gap: 0.75rem;
        }

        .modal-section-title {
          font-size: 1.15rem;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-heading);
        }

        .modal-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .modal-proof-section {
          padding: 1rem 1.1rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
        }

        .modal-proof-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem 1rem;
        }

        .modal-proof-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .modal-proof-item .check-icon {
          margin-top: 0.2rem;
        }

        .modal-result-card {
          margin: 1.25rem 0;
          padding: 1.1rem 1.25rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-left: 2px solid var(--accent-primary);
          border-radius: var(--radius-sm);
        }

        .modal-contribution-panel {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-left: 2px solid var(--accent-primary);
          border-radius: var(--radius-sm);
          padding: 1rem 1.1rem;
        }

        .modal-contribution-role {
          color: var(--text-primary);
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.4rem;
        }

        .modal-contribution-panel .modal-text {
          font-size: 0.9rem;
          margin-bottom: 0.75rem;
        }

        .modal-contribution-list {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          padding-left: 1.1rem;
          color: var(--text-secondary);
          font-size: 0.85rem;
          line-height: 1.5;
        }

        .modal-team-label {
          display: inline-flex;
          margin-top: 0.85rem;
          color: var(--accent-primary);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .modal-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        .modal-card {
          padding: 1.25rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
        }

        .modal-card-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .modal-card-text {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .modal-features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .modal-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
          background: var(--bg-card);
          padding: 0.65rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
        }

        .modal-bullets {
          list-style: disc;
          padding-left: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .inline-icon {
          font-size: 1.1rem;
        }

        .modal-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid var(--border-color);
          background: var(--bg-primary);
          display: flex;
          justify-content: flex-end;
        }

        @media (max-width: 768px) {
          .modal-grid-2, .modal-features-grid {
            grid-template-columns: 1fr;
          }
          .modal-quick-bar {
            flex-direction: column;
            align-items: flex-start;
          }
          .modal-image-wrapper {
            height: 220px;
          }
          .modal-title {
            font-size: 1.35rem;
          }
        }
      `}</style>
    </AnimatePresence>
  );
}
