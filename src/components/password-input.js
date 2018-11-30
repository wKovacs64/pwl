import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import mq from '../utils/mq';

const PasswordInput = ({ password, onChange, onKeyDown, ...props }) => (
  <div {...props}>
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
      css={css`
        font-family: 'Courier New', Courier, monospace;
        border: 2px solid rgba(0, 0, 0, 0.3);
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
        &::-ms-clear {
          display: none;
        }
      `}
    />
  </div>
);

PasswordInput.propTypes = {
  password: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
};

PasswordInput.defaultProps = {
  password: '',
  onKeyDown: () => {},
};

export default PasswordInput;
