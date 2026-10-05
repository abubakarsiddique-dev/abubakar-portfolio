import React, { useEffect, useRef, useState } from 'react';
import '../styles/modal-shared.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, FaPrint, FaEnvelope, FaGithub, FaLinkedin, 
  FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaCode, FaCheckCircle, FaCopy, FaCheck 
} from 'react-icons/fa';
import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';
import { skillCategories } from '../data/skills';
import { socialLinks, formatSocialDisplay } from '../data/socialLinks';

export default function ResumeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const copyResetTimeoutRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => () => {
    if (copyResetTimeoutRef.current) clearTimeout(copyResetTimeoutRef.current);
  }, []);

  if (!isOpen) return null;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard?.writeText(profileData.email);
      setCopied(true);
      if (copyResetTimeoutRef.current) clearTimeout(copyResetTimeoutRef.current);
      copyResetTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div key="resume-modal-backdrop" className="shared-modal-backdrop resume-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="resume-title">
        <motion.div
          className="shared-modal-container resume-modal-container glass-panel"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 25 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {/* Modal Top Toolbar */}
          <div className="resume-toolbar no-print">
            <div className="toolbar-title">
              <FaBriefcase className="toolbar-icon" aria-hidden="true" />
              <span>Developer Curriculum Vitae</span>
            </div>
            <div className="toolbar-actions">
              <button type="button" className="btn btn-secondary btn-sm toolbar-action-btn" onClick={handleCopyEmail} title="Copy Email" aria-label="Copy email address">
                {copied ? <FaCheck aria-hidden="true" style={{ color: '#10B981' }} /> : <FaCopy aria-hidden="true" />}
                <span className="toolbar-btn-text" aria-live="polite">{copied ? 'Copied!' : 'Copy Email'}</span>
              </button>

              <button type="button" className="btn btn-primary btn-sm toolbar-action-btn" onClick={handlePrint} title="Print or Save as PDF" aria-label="Print or save resume as PDF">
                <FaPrint aria-hidden="true" />
                <span className="toolbar-btn-text">Print / Save PDF</span>
              </button>

              <button type="button" className="shared-modal-close-btn resume-close-btn" onClick={onClose} aria-label="Close Resume Modal">
                <FaTimes aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Printable Resume Document Wrapper */}
          <div className="resume-document-wrapper">
            <div className="resume-document">
              {/* Header Section */}
              <header className="resume-header">
                <div className="resume-header-main">
                  <h1 id="resume-title" className="resume-name">{profileData.name}</h1>
                  <h2 className="resume-headline">{profileData.title}</h2>
                  <p className="resume-summary">
                    Software Engineering student and dedicated Flutter Developer skilled in building cross-platform mobile applications, integrating Firebase backend services, connecting RESTful APIs, and implementing scalable application architecture.
                  </p>
                </div>

                <div className="resume-contact-meta">
                  <div className="contact-meta-item">
                    <FaEnvelope className="meta-icon" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="contact-meta-item">
                    <FaMapMarkerAlt className="meta-icon" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="contact-meta-item">
                    <FaGraduationCap className="meta-icon" />
                    <span>{profileData.education}</span>
                  </div>
                  <div className="contact-meta-item">
                    <FaGithub className="meta-icon" />
                    <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">{formatSocialDisplay(socialLinks.github)}</a>
                  </div>
                  <div className="contact-meta-item">
                    <FaLinkedin className="meta-icon" />
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
                  </div>
                </div>
              </header>

              <hr className="resume-divider" />

              {/* Main Body Grid */}
              <div className="resume-body-grid">
                {/* Left Column: Education, Core Tech, Key Attributes */}
                <aside className="resume-sidebar">
                  {/* Education */}
                  <section className="resume-section">
                    <h3 className="section-heading">
                      <FaGraduationCap className="heading-icon" /> Education
                    </h3>
                    <div className="resume-block">
                      <h4 className="block-title">BS Software Engineering</h4>
                      <span className="block-meta">University Degree Program</span>
                      <p className="block-desc">
                        Focusing on Software Architecture, OOP, Data Structures, Requirements Engineering, Database Management, and Software Testing.
                      </p>
                    </div>
                  </section>

                  {/* Core Technical Stack */}
                  <section className="resume-section">
                    <h3 className="section-heading">
                      <FaCode className="heading-icon" /> Technical Stack
                    </h3>
                    {skillCategories.map(cat => (
                      <div key={cat.id} className="skill-cat-block">
                        <h4 className="cat-block-name">{cat.title}</h4>
                        <div className="skill-tags">
                          {cat.skills.map((s, idx) => (
                            <span key={idx} className="resume-skill-badge">{s.name}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </section>
                </aside>

                {/* Right Column: Experience, Featured Projects */}
                <main className="resume-main-content">
                  {/* Experience & Practical Journey */}
                  <section className="resume-section">
                    <h3 className="section-heading">
                      <FaBriefcase className="heading-icon" /> Engineering Experience
                    </h3>
                    {profileData.journey.map((item, idx) => (
                      <div key={idx} className="resume-block mb-3">
                        <div className="block-header-row">
                          <h4 className="block-title">{item.role}</h4>
                          <span className="block-badge">{item.period}</span>
                        </div>
                        <span className="block-meta">{item.institution}</span>
                        <p className="block-desc">{item.description}</p>
                        <div className="block-tags">
                          {item.skills.map((sk, sIdx) => (
                            <span key={sIdx} className="mini-tag">#{sk}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </section>

                  {/* Featured Projects Showcase */}
                  <section className="resume-section">
                    <h3 className="section-heading">
                      <FaCheckCircle className="heading-icon" /> Featured Mobile Applications
                    </h3>
                    {projectsData.slice(0, 3).map((proj) => (
                      <div key={proj.id} className="resume-block mb-3">
                        <div className="block-header-row">
                          <h4 className="block-title">{proj.title}</h4>
                          <span className="block-badge">{proj.category}</span>
                        </div>
                        <span className="block-meta">{proj.tagline}</span>
                        <p className="block-desc">{proj.shortDescription}</p>
                        <div className="block-tags">
                          {proj.technologies.map((tech, tIdx) => (
                            <span key={tIdx} className="resume-skill-badge">{tech}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </section>
                </main>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .resume-modal-container {
          background: var(--bg-primary);
          max-width: 920px;
          max-height: 92vh;
        }

        .resume-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.5rem;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
        }

        .toolbar-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--text-primary);
          font-family: var(--font-heading);
        }

        .toolbar-icon {
          color: var(--accent-primary);
        }

        .toolbar-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }



        .resume-document-wrapper {
          padding: 2rem;
          overflow-y: auto;
          background: var(--bg-secondary);
        }

        .resume-document {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 2.25rem;
        }

        .resume-header-main {
          margin-bottom: 1.25rem;
        }

        .resume-name {
          font-size: 2.25rem;
          font-weight: 500;
          color: var(--text-primary);
          font-family: var(--font-heading);
          margin-bottom: 0.2rem;
        }

        .resume-headline {
          font-size: 1rem;
          color: var(--accent-primary);
          font-weight: 500;
          font-family: var(--font-mono);
          margin-bottom: 0.75rem;
        }

        .resume-summary {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.65;
        }

        .resume-contact-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem;
          background: var(--bg-secondary);
          padding: 0.85rem 1.25rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          font-size: 0.825rem;
          font-family: var(--font-mono);
        }

        .contact-meta-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          color: var(--text-secondary);
        }

        .meta-icon {
          color: var(--accent-primary);
        }

        .resume-divider {
          border: none;
          border-top: 1px solid var(--border-color);
          margin: 1.75rem 0;
        }

        .resume-body-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 2rem;
        }

        .resume-section {
          margin-bottom: 1.75rem;
        }

        .section-heading {
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-heading);
          border-bottom: 1px solid var(--accent-primary);
          padding-bottom: 0.35rem;
        }

        .heading-icon {
          color: var(--accent-primary);
        }

        .resume-block {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 1rem 1.15rem;
        }

        .mb-3 { margin-bottom: 1rem; }

        .block-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          margin-bottom: 0.25rem;
        }

        .block-title {
          font-size: 0.975rem;
          font-weight: 500;
          color: var(--text-primary);
          font-family: var(--font-heading);
        }

        .block-badge {
          font-size: 0.725rem;
          font-family: var(--font-mono);
          background: var(--bg-card);
          color: var(--accent-primary);
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
        }

        .block-meta {
          display: block;
          font-size: 0.8rem;
          color: var(--accent-primary);
          font-weight: 500;
          font-family: var(--font-mono);
          margin-bottom: 0.4rem;
        }

        .block-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin-bottom: 0.6rem;
        }

        .block-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .mini-tag {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .skill-cat-block {
          margin-bottom: 1rem;
        }

        .cat-block-name {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-secondary);
          margin-bottom: 0.4rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-family: var(--font-mono);
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .resume-skill-badge {
          font-size: 0.75rem;
          font-family: var(--font-mono);
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-sm);
          max-width: 100%;
          word-break: break-word;
        }

        /* Print Media Style Rules */
        @media print {
          .no-print, .resume-backdrop {
            position: static !important;
            background: white !important;
            padding: 0 !important;
            overflow: visible !important;
          }
          .resume-modal-container {
            max-width: 100% !important;
            max-height: 100% !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
            color: black !important;
          }
          .resume-document {
            border: none !important;
            background: white !important;
            color: black !important;
            padding: 0 !important;
          }
          .resume-name, .block-title, .section-heading, .cat-block-name {
            color: #000 !important;
          }
          .resume-summary, .block-desc, .contact-meta-item {
            color: #333 !important;
          }
        }

        @media (max-width: 768px) {
          .resume-body-grid {
            grid-template-columns: 1fr;
          }
          .resume-contact-meta {
            flex-direction: column;
            gap: 0.6rem;
          }
          .resume-document-wrapper {
            padding: 1rem;
          }
          .resume-document {
            padding: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .resume-backdrop {
            padding: 0.75rem 0.5rem;
          }
          .resume-modal-container {
            max-height: 96vh;
            border-radius: var(--radius-md);
          }
          .resume-toolbar {
            padding: 0.75rem 0.85rem;
          }
          .toolbar-title {
            font-size: 0.85rem;
          }
          .toolbar-btn-text {
            display: none;
          }
          .toolbar-action-btn {
            padding: 0.5rem 0.75rem;
            min-height: 44px;
            min-width: 44px;
          }
          .resume-document-wrapper {
            padding: 0.75rem 0.5rem;
          }
          .resume-document {
            padding: 1rem 0.85rem;
          }
          .resume-name {
            font-size: 1.6rem;
            line-height: 1.25;
          }
          .resume-headline {
            font-size: 0.975rem;
          }
          .resume-summary {
            font-size: 0.875rem;
            line-height: 1.6;
          }
          .resume-contact-meta {
            padding: 0.75rem 0.85rem;
            gap: 0.5rem;
          }
          .contact-meta-item {
            font-size: 0.825rem;
            word-break: break-word;
            overflow-wrap: anywhere;
          }
          .block-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.35rem;
          }
          .block-title {
            font-size: 0.925rem;
          }
          .block-badge {
            align-self: flex-start;
          }
          .resume-block {
            padding: 0.85rem 0.85rem;
          }
          .resume-divider {
            margin: 1.25rem 0;
          }
        }
      `}</style>
    </AnimatePresence>
  );
}
