import React from 'react';
import { css } from '@emotion/core';
import { light } from '../theme';
import { mq } from '../utils';

// N.B. You cannot use @emotion/styled in here.

const NoScriptMessage: React.FunctionComponent = () => (
  <article
    css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      color: ${light.colors.brandedText};
    `}
  >
    <p
      css={css`
        font-weight: 300;
        font-size: 1.25rem;
        margin: 0 0 2rem;
        max-width: 26rem;
        ${mq.md} {
          text-align: center;
          font-size: 1.5rem;
          margin-bottom: 4rem;
          max-width: 32rem;
        }
        ${mq.lg} {
          font-size: 2.25rem;
          max-width: 48rem;
        }
      `}
    >
      This application requires JavaScript.
    </p>
    <p
      css={css`
        text-align: center;
        font-weight: 300;
        font-size: 1.25rem;
        margin: 0 0 2rem;
        max-width: 20rem;
        ${mq.md} {
          text-align: center;
          font-size: 1.5rem;
          margin-bottom: 4rem;
          max-width: 32rem;
        }
        ${mq.lg} {
          font-size: 2.25rem;
          max-width: 48rem;
        }
      `}
    >
      You&apos;re either using an incompatible browser or JavaScript is
      disabled.
    </p>
  </article>
);

export default NoScriptMessage;
