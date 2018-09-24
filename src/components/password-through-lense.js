import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import mq from '../utils/mq';
import classifyCharacters from '../utils/classify-characters';

const PasswordThroughLense = ({ className, colors, labels, password }) => (
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
      data-testid="password-through-lense"
      className={css`
        font-family: 'Courier New', Courier, monospace;
        display: inline-block;
        margin: 1rem;
      `}
    >
      {classifyCharacters(password, colors, labels).map(
        (classifiedCharacter, index) => (
          <span
            title={classifiedCharacter.label}
            className={css`
              color: ${classifiedCharacter.color};
            `}
            // N.B. Generally, using an array index as a key is ill advised, but
            // in this particular case, it is acceptable as we don't have a
            // unique ID for each character in the string that we are
            // processing, and the order of the array elements will not change.
            //
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          >
            {classifiedCharacter.character}
          </span>
        ),
      )}
    </div>
  </div>
);

PasswordThroughLense.propTypes = {
  className: PropTypes.string,
  colors: PropTypes.shape({
    number: PropTypes.string.isRequired,
    uppercase: PropTypes.string.isRequired,
    lowercase: PropTypes.string.isRequired,
    special: PropTypes.string.isRequired,
  }).isRequired,
  labels: PropTypes.shape({
    number: PropTypes.string.isRequired,
    uppercase: PropTypes.string.isRequired,
    lowercase: PropTypes.string.isRequired,
    special: PropTypes.string.isRequired,
  }).isRequired,
  password: PropTypes.string,
};

PasswordThroughLense.defaultProps = {
  className: '',
  password: '',
};

export default PasswordThroughLense;
