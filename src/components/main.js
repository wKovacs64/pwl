import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import mq from '../utils/mq';

const Main = ({ children }) => (
  <main
    css={css`
      padding-top: 2rem;
      padding-right: 1rem;
      padding-bottom: 4rem;
      padding-left: 1rem;
      ${mq.md} {
        padding-top: 4rem;
        padding-right: 0;
        padding-bottom: 8rem;
        padding-left: 0;
      }
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
