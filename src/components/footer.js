import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import mq from '../utils/mq';

const Footer = ({ className }) => (
  <footer
    className={css`
      display: flex;
      ${mq.md(css`
        justify-content: center;
      `)};
      ${className};
    `}
  >
    <a
      href="https://github.com/wKovacs64/pwl"
      rel="noopener noreferrer"
      className={css`
        color: blue;
        padding-bottom: 0.25rem;
        text-decoration: none;
        border-bottom: 1px solid transparent;
        transition: border-color 0.3s ease;
        &:hover {
          border-color: blue;
        }
      `}
    >
      source
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
