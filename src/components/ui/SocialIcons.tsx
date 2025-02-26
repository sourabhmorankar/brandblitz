import React from 'react';

const SocialIcons = () => {
  return (
    <>
      <a className="social-icon" href="mailto:hello@brandblitz.shop" target="_blank" rel="noopener" aria-label="Mail Address">
        <i className="bi bi-envelope-fill"></i>
      </a>
      <a className="social-icon" href="https://twitter.com/brandblitzshop" target="_blank" rel="noopener" aria-label="Twitter">
        <i className="bi bi-twitter-x"></i>
      </a>
      <a className="social-icon" href="https://www.instagram.com/brandblitz.shop" target="_blank" rel="noopener" aria-label="Instagram">
        <i className="bi bi-instagram"></i>
      </a>
      <a className="social-icon" href="https://www.linkedin.com/company/brandblitzshop" target="_blank" rel="noopener" aria-label="LinkedIn">
        <i className="bi bi-linkedin"></i>
      </a>
    </>
  );
};

export default SocialIcons;