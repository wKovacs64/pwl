import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';

const LegendRow = ({ color }) => (
  <div
    className={css`
      display: flex;
      align-items: center;
    `}
  >
    <div
      className={css`
        display: inline-block;
        background-color: ${color.value};
        height: 1rem;
        width: 1rem;
        margin-right: 1rem;
      `}
    />
    <span>{color.label}</span>
  </div>
);

LegendRow.propTypes = {
  color: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
};

export default LegendRow;
