import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { FaGithub } from 'react-icons/fa';

const Footer = ({ css: cssOverrides }) => (
  <footer
    css={[
      css`
        display: flex;
        justify-content: center;
      `,
      cssOverrides,
    ]}
  >
    <a
      href="https://github.com/wKovacs64/pwl"
      rel="noopener noreferrer"
      css={css`
        color: #111111;
        padding-bottom: 0.25rem;
        text-decoration: none;
        transition: color 0.3s ease;
        &:hover {
          color: #00cfff;
        }
      `}
    >
      <FaGithub aria-label="View source on GitHub" size={32} />
    </a>
  </footer>
);

Footer.propTypes = {
  css: PropTypes.shape(),
};

Footer.defaultProps = {
  css: undefined,
};

export default Footer;
