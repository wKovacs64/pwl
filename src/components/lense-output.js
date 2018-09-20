import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import memoizeOne from 'memoize-one';
import mq from '../utils/mq';
import Legend from './legend';

const colors = {
  number: '#f1f227', // yellow
  upperCaseLetter: '#00CFFF', // blue
  lowerCaseLetter: '#4add8c', // green
  special: '#ff6347', // red
};

const colorFromChar = memoizeOne(c => {
  if (/[0-9]/.test(c)) {
    return colors.number;
  }
  if (/[A-Z]/.test(c)) {
    return colors.upperCaseLetter;
  }
  if (/[a-z]/.test(c)) {
    return colors.lowerCaseLetter;
  }
  return colors.special;
});

const colorize = password =>
  password.split('').map((c, i) => (
    <span
      className={css`
        color: ${colorFromChar(c)};
      `}
      // N.B. Generally, using an array index as a key is ill advised, but in
      // this particular case, it is acceptable as we don't have a unique ID for
      // each character in the string that we are processing, and the order of
      // the array elements will not change.
      //
      // eslint-disable-next-line react/no-array-index-key
      key={i}
    >
      {c}
    </span>
  ));

const LenseOutput = ({ className, password }) => (
  <section>
    <div
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
        {colorize(password)}
      </div>
    </div>
    <Legend
      className={css`
        margin-top: 2rem;
      `}
      colors={colors}
    />
  </section>
);

LenseOutput.propTypes = {
  className: PropTypes.string,
  password: PropTypes.string,
};

LenseOutput.defaultProps = {
  className: '',
  password: '',
};

export default LenseOutput;
