import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import mq from '../utils/mq';

const LenseInput = ({ className, password, onChange }) => (
  <div
    className={css`
      ${className};
    `}
  >
    <input
      aria-label="Password"
      type="text"
      onChange={onChange}
      value={password}
      className={css`
        padding: 1rem;
        text-align: center;
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

LenseInput.propTypes = {
  className: PropTypes.string,
  password: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

LenseInput.defaultProps = {
  className: '',
  password: '',
};

export default LenseInput;
