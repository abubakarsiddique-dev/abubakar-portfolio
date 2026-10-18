import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaBug, FaCloud, FaMobileAlt } from 'react-icons/fa';

/**
 * @typedef {Object} ServiceItem
 * @property {import('react-icons').IconType} icon - React icon component representing the service category.
 * @property {string} title - Short title identifying the service offering.
 * @property {string} description - Detailed description of the service scope and value proposition.
 * @property {string[]} deliverables - List of concrete deliverables included in the service.
 */

/** @type {ServiceItem[]} */
const services = [
  {
    icon: FaMobileAlt,
    title: 'Flutter MVP Development',
    description: 'Turn a validated idea into a polished cross-platform MVP with clear flows, responsive UI, and a foundation ready for iteration.',
    deliverables: ['Product flow mapping', 'Flutter UI implementation', 'App-ready build']
  },
  {
    icon: FaCloud,
    title: 'Firebase Integration',
    description: 'Connect your app to dependable backend services for authentication, real-time data, storage, notifications, and role-based access.',
    deliverables: ['Firebase Auth & Firestore', 'Security rules', 'REST API integration']
  },
  {
    icon: FaBug,
    title: 'UI Revamp & Bug Fixes',
    description: 'Improve an existing Flutter app with focused UI refinement, state-flow fixes, performance debugging, and a smoother user experience.',
    deliverables: ['UI consistency pass', 'State and layout debugging', 'Targeted improvements']
  }
];

export default function Services() {
  const scrollToContact = (event) => {
    event.preventDefault();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('contact')?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section id="services" className="section services-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">What I Can Build</span>
          <h2 className="section-title">Services for Your Next Mobile Product</h2>
          <p className="section-description">
            Clear, focused ways to work together—from a first MVP to the fixes that make an existing app ready to grow.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                className="card service-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <div className="service-icon"><Icon /></div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-deliverables">
                  {service.deliverables.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </motion.article>
            );
          })}
        </div>

        <div className="services-cta card">
          <div>
            <span className="services-cta-kicker">Have a product in mind?</span>
            <h3>Let’s scope the right next step.</h3>
            <p>Share your idea, current app, or biggest blocker and I’ll reply within 24 hours.</p>
          </div>
          <a href="#contact" onClick={scrollToContact} className="btn btn-primary">
            Hire Me <FaArrowRight />
          </a>
        </div>
      </div>

      <style>{`
        .services-section {
          background: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        .service-card {
          display: flex;
          flex-direction: column;
          padding: 1.75rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
        }

        .service-icon {
          display: grid;
          place-items: center;
          width: 2.75rem;
          height: 2.75rem;
          margin-bottom: 1.25rem;
          color: var(--accent-primary);
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
        }

        .service-title {
          margin-bottom: 0.65rem;
          color: var(--text-primary);
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 500;
        }

        .service-description {
          min-height: 5.2rem;
          margin-bottom: 1.25rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.65;
        }

        .service-deliverables {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          margin: auto 0 0;
          padding: 1rem 0 0 1rem;
          border-top: 1px solid var(--border-color);
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 0.75rem;
        }

        .services-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          margin-top: 1.5rem;
          padding: 1.5rem 1.75rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-left: 2px solid var(--accent-primary);
          border-radius: var(--radius-sm);
        }

        .services-cta-kicker {
          display: block;
          margin-bottom: 0.3rem;
          color: var(--accent-primary);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .services-cta h3 {
          margin-bottom: 0.3rem;
          color: var(--text-primary);
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 500;
        }

        .services-cta p {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .services-cta .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .services-grid { grid-template-columns: 1fr; }
          .service-description { min-height: auto; }
        }

        @media (max-width: 600px) {
          .services-cta { flex-direction: column; align-items: flex-start; }
          .services-cta .btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
