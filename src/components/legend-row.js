import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';

const LegendRow = ({ charType, color }) => (
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
    <span>{charType}</span>
  </div>
);

LegendRow.propTypes = {
  charType: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default LegendRow;
