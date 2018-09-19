import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';

const LenseInput = ({ className }) => (
  <div
    className={css`
      ${className};
    `}
  >
    <input type="text" />
  </div>
);

LenseInput.propTypes = {
  className: PropTypes.string,
};

LenseInput.defaultProps = {
  className: '',
};

export default LenseInput;
