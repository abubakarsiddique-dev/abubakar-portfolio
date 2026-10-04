import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  FaBars, FaTimes, FaEnvelope, FaGithub, FaLinkedin,
  FaMoon, FaSun, FaFileAlt
} from 'react-icons/fa';
import { profileData } from '../data/profile';
import { navLinks } from '../data/navigation';

const ResumeModal = React.lazy(() => import('./ResumeModal'));

const getStoredTheme = () => {
  try {
    return localStorage.getItem('theme') || 'dark';
  } catch {
    // localStorage may be unavailable (privacy mode, restricted embeds, etc.)
    return 'dark';
  }
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [theme, setTheme] = useState(getStoredTheme);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const isNavClicking = useRef(false);
  const clickTimeoutRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#66444F' : '#FAF8EE');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Ignore write failures (e.g. storage disabled) — theme still applies for this session
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Skip scroll position recalculations while smooth scrolling from a nav link click
      if (isNavClicking.current) return;

      const scrollPosition = window.scrollY + 180;
      const sectionElements = navLinks
        .map(link => document.getElementById(link.href.substring(1)))
        .filter(Boolean)
        .sort((a, b) => a.offsetTop - b.offsetTop);

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => setMobileMenuOpen((isOpen) => !isOpen);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetEl = document.getElementById(targetId);

    if (targetEl) {
      // Lock scroll listener to prevent intermediate flickering during smooth scroll
      isNavClicking.current = true;
      setActiveSection(targetId);

      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }

      targetEl.scrollIntoView({ behavior: 'smooth' });

      // Unlock scroll listener after smooth scroll finishes
      clickTimeoutRef.current = setTimeout(() => {
        isNavClicking.current = false;
      }, 800);
    }
  };

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      {/* Top Scroll Progress Bar */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />

      <div className="container navbar-container">
        {/* Left: Logo Badge */}
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="navbar-logo" aria-label="Abubakar Siddique Homepage">
          <span className="logo-badge">{profileData.shortName}</span>
          <span className="logo-text">{profileData.name}</span>
        </a>

        {/* Center: Floating Glass Capsule Navigation Bar */}
        <nav className="navbar-desktop" aria-label="Main Navigation">
          <div className="navbar-floating-capsule">
            {navLinks.map((link) => {
              const IconComp = link.icon;
              const targetId = link.href.substring(1);
              const isActive = activeSection === targetId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`capsule-nav-link ${isActive ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <IconComp className="nav-item-icon" />
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="capsuleActivePill"
                      className="capsule-active-bg"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>
        </nav>

        {/* Right: Actions & Theme Switch Capsule */}
        <div className="navbar-actions">
          <button
            className="btn btn-secondary btn-sm resume-nav-btn"
            onClick={() => setIsResumeOpen(true)}
            aria-label="Open Resume CV"
          >
            <FaFileAlt style={{ color: 'var(--accent-secondary)' }} />
            <span className="resume-btn-text">CV / Resume</span>
          </button>

          <div className="theme-capsule-toggle">
            <button
              className={`theme-circle-btn ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => toggleTheme('dark')}
              title="Dark Theme"
              aria-label="Switch to Dark Theme"
            >
              <FaMoon />
            </button>
            <button
              className={`theme-circle-btn ${theme === 'light' ? 'active' : ''}`}
              onClick={() => toggleTheme('light')}
              title="Light Theme"
              aria-label="Switch to Light Theme"
            >
              <FaSun />
            </button>
          </div>

          <button
            className="mobile-toggle-btn"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="container mobile-drawer-content">
              <ul className="mobile-nav-links">
                {navLinks.map((link) => {
                  const IconComp = link.icon;
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="mobile-nav-link"
                        aria-current={activeSection === link.href.substring(1) ? 'page' : undefined}
                        onClick={(e) => {
                          setMobileMenuOpen(false);
                          handleNavClick(e, link.href);
                        }}
                      >
                        <IconComp style={{ fontSize: '1rem' }} />
                        <span>{link.name}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mobile-drawer-footer">
                <button
                  className="btn btn-secondary btn-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsResumeOpen(true);
                  }}
                >
                  <FaFileAlt /> View Resume / CV
                </button>
                <a
                  href="#contact"
                  className="btn btn-primary btn-full"
                  onClick={(event) => {
                    setMobileMenuOpen(false);
                    handleNavClick(event, '#contact');
                  }}
                >
                  <FaEnvelope /> Let's Talk
                </a>
                <div className="mobile-socials">
                  <a href={profileData.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                    <FaGithub />
                  </a>
                  <a href={profileData.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <React.Suspense fallback={null}>
        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      </React.Suspense>

      <style>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1.25rem 0;
          transition: all var(--transition-normal);
          background: transparent;
        }

        .navbar-scrolled {
          padding: 0.75rem 0;
          background: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
        }

        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
          font-size: 1.15rem;
          color: var(--text-primary);
          font-family: var(--font-heading);
        }

        .logo-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          background: var(--accent-primary);
          color: #0D0D11;
          font-weight: 700;
          font-size: 0.9rem;
          font-family: var(--font-mono);
        }

        [data-theme="light"] .logo-badge {
          color: #FFFFFF;
        }

        .logo-text {
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        /* Center Floating Capsule Bar */
        .navbar-desktop {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .navbar-floating-capsule {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          padding: 0.35rem 0.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .capsule-nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 1rem;
          border-radius: var(--radius-full);
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 400;
          font-family: var(--font-sans);
          transition: color var(--transition-fast);
          z-index: 1;
        }

        .capsule-nav-link:hover {
          color: var(--text-primary);
        }

        .capsule-nav-link.active {
          color: #0D0D11;
          font-weight: 600;
        }

        [data-theme="light"] .capsule-nav-link.active {
          color: #FFFFFF;
        }

        .nav-item-icon {
          font-size: 0.9rem;
        }

        .capsule-active-bg {
          position: absolute;
          inset: 0;
          border-radius: var(--radius-full);
          background: var(--accent-primary);
          z-index: -1;
        }

        /* Rightmost Circular Theme Switch Capsule */
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .theme-capsule-toggle {
          display: flex;
          align-items: center;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          padding: 3px;
          gap: 4px;
        }

        .theme-circle-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .theme-circle-btn.active {
          background: var(--bg-card);
          color: var(--accent-primary);
          border: 1px solid var(--border-color);
        }

        .mobile-toggle-btn {
          display: none;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          width: 42px;
          height: 42px;
          min-width: 42px;
          min-height: 42px;
          border-radius: var(--radius-sm);
          font-size: 1.1rem;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .mobile-drawer {
          overflow: hidden;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
        }

        .mobile-drawer-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .mobile-nav-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mobile-nav-link {
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 0.85rem;
          min-height: 44px;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .mobile-nav-link:hover,
        .mobile-nav-link:active {
          color: var(--text-primary);
          background: var(--bg-card);
        }

        .mobile-drawer-footer {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .mobile-drawer-footer .btn {
          min-height: 44px;
          padding: 0.75rem 1rem;
        }

        .btn-full {
          width: 100%;
        }

        .mobile-socials {
          display: flex;
          align-items: center;
          gap: 1rem;
          justify-content: center;
          padding-top: 0.25rem;
        }

        .mobile-socials a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          min-width: 42px;
          min-height: 42px;
          border-radius: var(--radius-sm);
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 1.1rem;
          transition: all var(--transition-fast);
        }

        .mobile-socials a:hover {
          color: var(--accent-primary);
          border-color: var(--accent-primary);
        }

        @media (max-width: 1120px) {
          .capsule-nav-link {
            padding: 0.45rem 0.75rem;
            font-size: 0.825rem;
            gap: 0.35rem;
          }
        }

        @media (max-width: 960px) {
          .navbar-desktop {
            display: none;
          }
          .mobile-toggle-btn {
            display: flex;
          }
        }

        @media (max-width: 480px) {
          .mobile-drawer-content {
            padding: 1.25rem 1rem;
            gap: 1.25rem;
          }
          .logo-text {
            font-size: 0.95rem;
          }
          .logo-badge {
            width: 32px;
            height: 32px;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </header>
  );
}
