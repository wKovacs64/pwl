import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';

const LegendRow = ({ color, label }) => (
  <div
    className={css`
      display: flex;
      align-items: center;
    `}
  >
    <div
      className={css`
        display: inline-block;
        background-color: ${color};
        height: 1rem;
        width: 1rem;
        margin-right: 1rem;
      `}
    />
    <span>{label}</span>
  </div>
);

LegendRow.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default LegendRow;
