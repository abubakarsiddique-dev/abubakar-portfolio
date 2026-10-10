/**
 * @typedef {Object} SocialLinks
 * @property {string} github - Official GitHub profile URL.
 * @property {string} linkedin - Official LinkedIn profile URL.
 * @property {string} email - Primary contact email address.
 * @property {string} mailto - Pre-formatted mailto link scheme.
 */

/** @type {SocialLinks} */
export const socialLinks = {
  github: "https://github.com/abubakarsiddique-dev",
  linkedin: "https://www.linkedin.com/in/abu-bakar-siddique-a82747425/",
  email: "abubakar1siddique2@gmail.com",
  mailto: "mailto:abubakar1siddique2@gmail.com"
};

/**
 * Formats a raw social URL into a clean, human-readable display string by stripping protocol and trailing slash.
 *
 * @param {string} url - The raw web URL to format.
 * @returns {string} The normalized URL display string.
 */
export const formatSocialDisplay = (url) => {
  if (typeof url !== 'string') return '';
  return url.trim().replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
};

/**
 * Extracts the handle or username path segment from a given profile URL.
 *
 * @param {string} url - The social profile URL.
 * @returns {string} The extracted handle or empty string if invalid.
 */
export const extractSocialUsername = (url) => {
  if (typeof url !== 'string' || !url.trim()) return '';
  const cleaned = formatSocialDisplay(url);
  const segments = cleaned.split('/').filter(Boolean);
  return segments.length > 1 ? segments[segments.length - 1] : '';
};


