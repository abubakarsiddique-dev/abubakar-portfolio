export const socialLinks = {
  github: "https://github.com/abubakarsiddique-dev",
  linkedin: "https://www.linkedin.com/in/abu-bakar-siddique-a82747425/",
  email: "abubakar1siddique2@gmail.com",
  mailto: "mailto:abubakar1siddique2@gmail.com"
};

export const formatSocialDisplay = (url) => {
  if (typeof url !== 'string') return '';
  return url.trim().replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
};

