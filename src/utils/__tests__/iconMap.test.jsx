import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { getCategoryIcon, getDemoIcon } from '../iconMap';

describe('iconMap utility functions', () => {
  describe('getCategoryIcon', () => {
    it('renders the expected icon element for known category icon names', () => {
      const { container: mobileContainer } = render(getCategoryIcon('FaMobileAlt'));
      expect(mobileContainer.querySelector('svg')).toBeInTheDocument();

      const { container: serverContainer } = render(getCategoryIcon('FaServer'));
      expect(serverContainer.querySelector('svg')).toBeInTheDocument();

      const { container: boltContainer } = render(getCategoryIcon('FaBolt'));
      expect(boltContainer.querySelector('svg')).toBeInTheDocument();

      const { container: codeBranchContainer } = render(getCategoryIcon('FaCodeBranch'));
      expect(codeBranchContainer.querySelector('svg')).toBeInTheDocument();
    });

    it('falls back to default FaMobileAlt for unknown category icon names', () => {
      const { container: fallbackContainer } = render(getCategoryIcon('UnknownIcon'));
      expect(fallbackContainer.querySelector('svg')).toBeInTheDocument();

      const { container: undefinedContainer } = render(getCategoryIcon(undefined));
      expect(undefinedContainer.querySelector('svg')).toBeInTheDocument();
    });

    it('forwards custom props and accessibility attributes to category icons', () => {
      render(
        getCategoryIcon('FaServer', {
          'data-testid': 'custom-server-icon',
          className: 'test-icon-class',
          'aria-hidden': 'true',
        })
      );

      const icon = screen.getByTestId('custom-server-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('test-icon-class');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('getDemoIcon', () => {
    it('renders the expected icon element for supported demo types', () => {
      const { container: videoContainer } = render(getDemoIcon('video'));
      expect(videoContainer.querySelector('svg')).toBeInTheDocument();

      const { container: apkContainer } = render(getDemoIcon('apk'));
      expect(apkContainer.querySelector('svg')).toBeInTheDocument();

      const { container: liveContainer } = render(getDemoIcon('live'));
      expect(liveContainer.querySelector('svg')).toBeInTheDocument();
    });

    it('falls back to default FaBookOpen for unknown demo types', () => {
      const { container: fallbackContainer } = render(getDemoIcon('unknown-type'));
      expect(fallbackContainer.querySelector('svg')).toBeInTheDocument();

      const { container: noneContainer } = render(getDemoIcon('none'));
      expect(noneContainer.querySelector('svg')).toBeInTheDocument();
    });

    it('forwards custom props and accessibility attributes to demo icons', () => {
      render(
        getDemoIcon('video', {
          'data-testid': 'custom-video-icon',
          className: 'demo-icon-class',
          'aria-hidden': 'true',
        })
      );

      const icon = screen.getByTestId('custom-video-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('demo-icon-class');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
