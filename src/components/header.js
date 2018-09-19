import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';

const Header = ({ className }) => (
  <header
    className={css`
      display: flex;
      align-items: center;
      justify-content: flex-end;
      ${className};
    `}
  >
    {null /* TBD */}
  </header>
);

Header.propTypes = {
  className: PropTypes.string,
};

Header.defaultProps = {
  className: '',
};

export default Header;
