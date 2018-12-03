import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import mq from '../utils/mq';

const Main = ({ children }) => (
  <main
    css={css`
      padding-top: 2rem;
      padding-bottom: 4rem;
      ${mq.md(css`
        padding-top: 4rem;
        padding-bottom: 8rem;
      `)};
    `}
  >
    {children}
  </main>
);

Main.propTypes = {
  children: PropTypes.node,
};

Main.defaultProps = {
  children: null,
};

export default Main;
