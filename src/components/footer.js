import React from 'react';
import { css } from '@emotion/core';
import { FaGithub } from 'react-icons/fa';

const Footer = () => (
  <footer
    css={css`
      display: flex;
      justify-content: center;
    `}
  >
    <a
      href="https://github.com/wKovacs64/pwl"
      rel="noopener noreferrer"
      css={css`
        color: #111111;
        padding-bottom: 0.25rem;
        text-decoration: none;
        transition: color 0.3s ease;
        &:hover,
        &:focus {
          color: #00cfff;
        }
      `}
    >
      <FaGithub aria-label="View source on GitHub" size={32} />
    </a>
  </footer>
);

export default Footer;
