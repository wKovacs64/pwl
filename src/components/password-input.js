import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import mq from '../utils/mq';

const PasswordInput = ({ className, password, onChange, onKeyDown }) => (
  <div
    className={css`
      ${className};
    `}
  >
    <input
      aria-label="Password"
      placeholder="Paste Here"
      type="text"
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={password}
      className={css`
        font-family: 'Courier New', Courier, monospace;
        padding: 1rem;
        text-align: center;
        letter-spacing: 0.25rem;
        white-space: pre;
        color: #111111;
        width: 100%;
        font-size: 1.25rem;
        ${mq.md(css`
          font-size: 1.5rem;
        `)};
        ${mq.lg(css`
          font-size: 2.25rem;
        `)};
      `}
    />
  </div>
);

PasswordInput.propTypes = {
  className: PropTypes.string,
  password: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
};

PasswordInput.defaultProps = {
  className: '',
  password: '',
  onKeyDown: () => {},
};

export default PasswordInput;
