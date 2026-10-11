import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Keep the error visible to browser monitoring without exposing details to visitors.
    console.error('Portfolio render error:', error, errorInfo);
  }

  handleReset = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="error-boundary-fallback" role="alert" aria-live="assertive">
        <div className="error-boundary-card">
          <span className="error-boundary-kicker">Temporary issue</span>
          <h1>Something went wrong while loading this portfolio.</h1>
          <p>Please refresh the page or get in touch directly if the problem continues.</p>
          <button type="button" onClick={this.handleReset} className="btn btn-primary" aria-label="Refresh Portfolio">
            Refresh Portfolio
          </button>
        </div>
        <style>{`
          .error-boundary-fallback {
            min-height: 100vh;
            display: grid;
            place-items: center;
            padding: 2rem;
            background: var(--bg-primary);
            color: var(--text-primary);
          }

          .error-boundary-card {
            width: min(100%, 560px);
            padding: 2.5rem;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-left: 2px solid var(--accent-primary);
            border-radius: var(--radius-sm);
          }

          .error-boundary-kicker {
            color: var(--accent-primary);
            font-family: var(--font-mono);
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }

          .error-boundary-card h1 {
            margin: 0.75rem 0;
            font-family: var(--font-heading);
            font-size: clamp(1.8rem, 5vw, 2.75rem);
            font-weight: 500;
          }

          .error-boundary-card p {
            margin-bottom: 1.5rem;
            color: var(--text-secondary);
            line-height: 1.6;
          }
        `}</style>
      </main>
    );
  }
}
