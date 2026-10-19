import React from 'react';
import { 
  FaMobileAlt, 
  FaServer, 
  FaBolt, 
  FaCodeBranch, 
  FaVideo, 
  FaAndroid, 
  FaExternalLinkAlt, 
  FaBookOpen 
} from 'react-icons/fa';

/**
 * Returns a React icon element corresponding to a category icon name with optional props forwarding.
 *
 * @param {string} iconName - The icon identifier (e.g. 'FaMobileAlt', 'FaServer', 'FaBolt', 'FaCodeBranch').
 * @param {Record<string, unknown>} [props={}] - Optional JSX props forwarded to the icon component.
 * @returns {React.ReactElement} The corresponding React icon element.
 */
export const getCategoryIcon = (iconName, props = {}) => {
  switch (iconName) {
    case 'FaMobileAlt':
      return <FaMobileAlt {...props} />;
    case 'FaServer':
      return <FaServer {...props} />;
    case 'FaBolt':
      return <FaBolt {...props} />;
    case 'FaCodeBranch':
      return <FaCodeBranch {...props} />;
    default:
      return <FaMobileAlt {...props} />;
  }
};

/**
 * Returns a React icon element corresponding to a project demo type with optional props forwarding.
 *
 * @param {string} demoType - The demo type identifier ('video', 'apk', 'live', or fallback).
 * @param {Record<string, unknown>} [props={}] - Optional JSX props forwarded to the icon component.
 * @returns {React.ReactElement} The corresponding React icon element.
 */
export const getDemoIcon = (demoType, props = {}) => {
  switch (demoType) {
    case 'video':
      return <FaVideo {...props} />;
    case 'apk':
      return <FaAndroid {...props} />;
    case 'live':
      return <FaExternalLinkAlt {...props} />;
    default:
      return <FaBookOpen {...props} />;
  }
};

