import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import mq from '../utils/mq';
import colorize from '../utils/colorize';

const PasswordThroughLense = ({ className, colors, password }) => (
  <div
    data-testid="password-through-lense"
    className={css`
      color: #f4f4f4;
      background-color: #1c304a;
      & ::-webkit-scrollbar {
        width: 1rem;
      }
      & ::-webkit-scrollbar-thumb {
        background: #cdcdcd;
      }
      & ::-webkit-scrollbar-track {
        background: #f0f0f0;
      }
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
      text-align: center;
      width: 100%;
      font-size: 1.25rem;
      ${mq.md(css`
        font-size: 1.5rem;
      `)};
      ${mq.lg(css`
        font-size: 2.25rem;
      `)};
      ${className};
    `}
  >
    <div
      className={css`
        font-family: 'Courier New', Courier, monospace;
        display: inline-block;
        margin: 1rem;
      `}
    >
      {colorize(password, colors)}
    </div>
  </div>
);

PasswordThroughLense.propTypes = {
  className: PropTypes.string,
  colors: PropTypes.shape({
    number: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    upperCaseLetter: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    lowerCaseLetter: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    special: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  password: PropTypes.string,
};

PasswordThroughLense.defaultProps = {
  className: '',
  password: '',
};

export default PasswordThroughLense;
