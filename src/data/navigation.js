import { FaHome, FaUser, FaMicrochip, FaCode, FaBriefcase, FaEnvelope } from 'react-icons/fa';

/**
 * @typedef {Object} NavLinkItem
 * @property {string} name - Human-readable label for navigation item.
 * @property {string} href - Anchor link targeting section ID.
 * @property {import('react-icons').IconType} icon - React icon component associated with the route.
 */

/** @type {NavLinkItem[]} */
export const navLinks = [
  { name: 'Home', href: '#home', icon: FaHome },
  { name: 'About', href: '#about', icon: FaUser },
  { name: 'Projects', href: '#projects', icon: FaCode },
  { name: 'Services', href: '#services', icon: FaBriefcase },
  { name: 'Skills', href: '#skills', icon: FaMicrochip },
  { name: 'Experience', href: '#experience', icon: FaBriefcase },
  { name: 'Contact', href: '#contact', icon: FaEnvelope },
];

