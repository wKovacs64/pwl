import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import LegendRow from './legend-row';

const Legend = ({ className, colors }) => (
  <div
    className={css`
      ${className};
    `}
  >
    <p>Legend:</p>
    <LegendRow charType="Number" color={colors.number} />
    <LegendRow charType="Uppercase Letter" color={colors.upperCaseLetter} />
    <LegendRow charType="Lowercase Letter" color={colors.lowerCaseLetter} />
    <LegendRow charType="Special" color={colors.special} />
  </div>
);

Legend.propTypes = {
  className: PropTypes.string,
  colors: PropTypes.shape({
    number: PropTypes.string.isRequired,
    upperCaseLetter: PropTypes.string.isRequired,
    lowerCaseLetter: PropTypes.string.isRequired,
    special: PropTypes.string.isRequired,
  }).isRequired,
};

Legend.defaultProps = {
  className: '',
};

export default Legend;
