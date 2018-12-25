import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import mq from '../utils/mq';
import classifyCharacters from '../utils/classify-characters';

const Lense = styled.div`
  background-color: ${({ theme }) => theme.colors.lenseBackground};
  border: 2px solid ${({ theme }) => theme.colors.lenseBorder};
  scrollbar-color: ${({ theme }) =>
    `${theme.colors.lenseScrollThumb} ${theme.colors.lenseScrollTrack}}`};
  /* TODO: remove -webkit-scrollbar once Chrome supports scrollbar-color */
  &::-webkit-scrollbar {
    width: 1rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.lenseScrollThumb};
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.lenseScrollTrack};
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
`;

const Character = styled.span`
  border-bottom: 1px dotted ${({ theme }) => theme.colors.lenseUnderline};
  white-space: pre;
`;

const PasswordThroughLense = ({ colors, labels, password }) => (
  <Lense>
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
          <Character
            title={classifiedCharacter.label}
            css={css`
              color: ${classifiedCharacter.color};
              margin-right: ${index < chars.length - 1 ? '0.25rem' : 0};
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
          </Character>
        ),
      )}
    </div>
  </Lense>
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
