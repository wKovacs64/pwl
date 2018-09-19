import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
// import mq from '../utils/mq';

const Main = ({ className, children }) => (
  <main
    className={css`
      ${className};
    `}
  >
    {children}
  </main>
);

Main.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Main.defaultProps = {
  children: null,
  className: '',
};

export default Main;
