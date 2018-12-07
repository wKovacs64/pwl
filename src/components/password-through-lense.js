import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import mq from '../utils/mq';
import classifyCharacters from '../utils/classify-characters';

const PasswordThroughLense = ({ colors, labels, password }) => (
  <div
    css={css`
      color: #f4f4f4;
      background-color: #1c304a;
      &::-webkit-scrollbar {
        width: 1rem;
      }
      &::-webkit-scrollbar-thumb {
        background: #cdcdcd;
      }
      &::-webkit-scrollbar-track {
        background: #f0f0f0;
      }
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
      text-align: center;
      width: 100%;
      font-size: 1.25rem;
      ${mq.md} {
        font-size: 1.5rem;
      }
      ${mq.lg} {
        font-size: 2.25rem;
      }
    `}
  >
    <div
      data-testid="password-through-lense"
      css={css`
        font-family: 'Courier New', Courier, monospace;
        display: inline-block;
        margin: 1rem;
      `}
    >
      {classifyCharacters(password, colors, labels).map(
        (classifiedCharacter, index, chars) => (
          <span
            title={classifiedCharacter.label}
            css={css`
              color: ${classifiedCharacter.color};
              border-bottom: thin dotted #f4f4f4;
              margin-right: ${index < chars.length - 1 ? '0.25rem' : 0};
              white-space: pre;
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
  password: '',
};

export default PasswordThroughLense;
