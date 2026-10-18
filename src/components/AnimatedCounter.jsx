import React, { useEffect, useState, useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

export default function AnimatedCounter({ from = 0, to, duration = 1.5, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp = null;
    let animationFrameId = null;
    const numericTo = parseFloat(to);

    if (shouldReduceMotion) {
      setCount(numericTo);
      return undefined;
    }

    if (!Number.isFinite(numericTo)) {
      return undefined;
    }

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // Easing out quad
      const easeOut = 1 - (1 - progress) * (1 - progress);
      const currentCount = Math.floor(easeOut * (numericTo - from) + from);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(numericTo);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, from, to, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className="animated-counter-value" aria-live="off">
      {prefix}{count}{suffix}
    </span>
  );
}
