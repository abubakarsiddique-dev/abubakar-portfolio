import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import { profileData } from '../data/profile';
import { navLinks } from '../data/navigation';

export default function Footer() {
  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

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
    <footer className="footer-container">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="footer-logo" aria-label="Abubakar Siddique Portfolio Home">
              <span className="logo-badge">{profileData.shortName}</span>
              <span className="logo-text">{profileData.name}</span>
            </a>
            <p className="footer-tagline">
              Flutter App Developer · Firebase Engineer
            </p>
            <p className="footer-subtext">
              Building modern, reliable, and user-friendly mobile applications.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-socials-col">
            <h4 className="footer-heading">Connect</h4>
            <div className="footer-social-icons">
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="social-icon-btn"
              >
                <FaGithub />
              </a>
              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="social-icon-btn"
              >
                <FaLinkedin />
              </a>
              <a
                href={profileData.socials.mailto}
                aria-label="Send Direct Email"
                className="social-icon-btn"
              >
                <FaEnvelope />
              </a>
            </div>
            <button className="btn btn-outline btn-sm scroll-top-btn" onClick={scrollToTop} aria-label="Back to top of page">
              <FaArrowUp /> Back to top
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright-text">
            © {new Date().getFullYear()} Abubakar Siddique. All rights reserved.
          </p>
          <p className="built-tag">
            Built with <span className="highlight">React.js</span> & <span className="highlight">Framer Motion</span>
          </p>
        </div>
      </div>

      <style>{`
        .footer-container {
          background: var(--bg-primary);
          border-top: 1px solid var(--border-color);
          padding-top: 4rem;
          padding-bottom: 2.5rem;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3.5rem;
        }

        .footer-logo {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 500;
          font-size: 1.25rem;
          color: var(--text-primary);
          font-family: var(--font-heading);
          margin-bottom: 0.75rem;
        }

        .footer-tagline {
          font-weight: 500;
          color: var(--accent-primary);
          font-size: 0.9rem;
          font-family: var(--font-mono);
          margin-bottom: 0.5rem;
        }

        .footer-subtext {
          font-size: 0.875rem;
          color: var(--text-muted);
          max-width: 380px;
          line-height: 1.6;
        }

        .footer-heading {
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
          font-family: var(--font-heading);
        }

        .footer-links {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.6rem;
        }

        .footer-links a {
          color: var(--text-secondary);
          font-size: 0.85rem;
          transition: color var(--transition-fast);
        }

        .footer-links a:hover {
          color: var(--accent-primary);
        }

        .footer-socials-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .footer-social-icons {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .social-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: var(--radius-sm);
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 1.1rem;
          transition: all var(--transition-fast);
        }

        .social-icon-btn:hover {
          color: var(--accent-primary);
          border-color: var(--accent-primary);
        }

        .scroll-top-btn {
          margin-top: auto;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
          font-size: 0.825rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .highlight {
          color: var(--accent-primary);
          font-weight: 500;
        }

        @media (max-width: 900px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
