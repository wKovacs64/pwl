import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
// TODO: tree-shaking broken? why is this so large?
import { FaGithub } from 'react-icons/fa';

const Footer = ({ className }) => (
  <footer
    className={css`
      display: flex;
      justify-content: center;
      ${className};
    `}
  >
    <a
      href="https://github.com/wKovacs64/pwl"
      rel="noopener noreferrer"
      className={css`
        color: #111111;
        padding-bottom: 0.25rem;
        text-decoration: none;
        transition: color 0.3s ease;
        & :hover {
          color: #00cfff;
        }
      `}
    >
      <FaGithub aria-label="View source on GitHub" size={32} />
    </a>
  </footer>
);

Footer.propTypes = {
  className: PropTypes.string,
};

Footer.defaultProps = {
  className: '',
};

export default Footer;
