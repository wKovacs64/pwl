import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import LegendItem from './legend-item';

const Legend = ({ className, colors }) => (
  <section
    className={css`
      ${className};
    `}
  >
    <p>Legend:</p>
    <LegendItem color={colors.number} />
    <LegendItem color={colors.upperCaseLetter} />
    <LegendItem color={colors.lowerCaseLetter} />
    <LegendItem color={colors.special} />
  </section>
);

Legend.propTypes = {
  className: PropTypes.string,
  colors: PropTypes.shape({
    number: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    upperCaseLetter: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    lowerCaseLetter: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    special: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

Legend.defaultProps = {
  className: '',
};

export default Legend;
