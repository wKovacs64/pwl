import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import mq from '../utils/mq';

const Main = ({ css: cssOverrides, children }) => (
  <main
    css={[
      css`
        padding-top: 2rem;
        padding-bottom: 4rem;
        ${mq.md(css`
          padding-top: 4rem;
          padding-bottom: 8rem;
        `)};
      `,
      cssOverrides,
    ]}
  >
    {children}
  </main>
);

Main.propTypes = {
  children: PropTypes.node,
  css: PropTypes.shape(),
};

Main.defaultProps = {
  children: null,
  css: undefined,
};

export default Main;
