import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';

const LegendItem = ({ color, label }) => (
  <div
    data-testid={`legend-row--${label}`}
    className={css`
      display: flex;
      align-items: center;
    `}
  >
    <div
      data-testid="color"
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

LegendItem.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default LegendItem;
