import * as React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { ColorMap, LabelMap } from '../legend';
import { light, dark } from '../theme';
import { classifyCharacters, mq } from '../utils';

const Lense = styled.div`
  border-width: 2px;
  border-style: solid;
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
  /* TODO: remove -webkit-scrollbar once Chrome supports scrollbar-color */
  &::-webkit-scrollbar {
    width: 1rem;
  }
  body.light-mode & {
    background-color: ${light.colors.lenseBackground};
    border-color: ${light.colors.lenseBorder};
    scrollbar-color: ${`${light.colors.lenseScrollThumb} ${light.colors.lenseScrollTrack}}`};
    &::-webkit-scrollbar-thumb {
      background-color: ${light.colors.lenseScrollThumb};
    }
    &::-webkit-scrollbar-track {
      background-color: ${light.colors.lenseScrollTrack};
    }
  }
  body.dark-mode & {
    background-color: ${dark.colors.lenseBackground};
    border-color: ${dark.colors.lenseBorder};
    scrollbar-color: ${`${dark.colors.lenseScrollThumb} ${dark.colors.lenseScrollTrack}}`};
    &::-webkit-scrollbar-thumb {
      background-color: ${dark.colors.lenseScrollThumb};
    }
    &::-webkit-scrollbar-track {
      background-color: ${dark.colors.lenseScrollTrack};
    }
  }
`;

const Character = styled.span`
  border-bottom-width: 1px;
  border-bottom-style: dotted;
  white-space: pre;
  body.light-mode & {
    border-bottom-color: ${light.colors.lenseUnderline};
  }
  body.dark-mode & {
    border-bottom-color: ${dark.colors.lenseUnderline};
  }
`;

function PasswordThroughLense({
  colors,
  labels,
  password,
}: PasswordThroughLenseProps): JSX.Element {
  return (
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
}

interface PasswordThroughLenseProps {
  colors: ColorMap;
  labels: LabelMap;
  password: string;
}

export default PasswordThroughLense;
