import * as React from 'react';
import { css } from '@emotion/core';
import { mq } from '../utils';

const Main: React.FunctionComponent = ({ children }) => (
  <main
    css={css`
      padding-top: 2rem;
      padding-right: 1rem;
      padding-bottom: 4rem;
      padding-left: 1rem;
      ${mq.md} {
        padding-top: 4rem;
        padding-right: 0;
        padding-left: 0;
      }
    `}
  >
    {children}
  </main>
);

export default Main;
