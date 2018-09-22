import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import LegendItem from './legend-item';

const Legend = ({ className, colors, labels }) => (
  <section
    data-testid="legend"
    className={css`
      ${className};
    `}
  >
    <p>Legend:</p>
    <LegendItem color={colors.number} label={labels.number} />
    <LegendItem color={colors.uppercase} label={labels.uppercase} />
    <LegendItem color={colors.lowercase} label={labels.lowercase} />
    <LegendItem color={colors.special} label={labels.special} />
  </section>
);

Legend.propTypes = {
  className: PropTypes.string,
  colors: PropTypes.shape({
    number: PropTypes.string.isRequired,
    uppercase: PropTypes.string.isRequired,
    lowercase: PropTypes.string.isRequired,
    special: PropTypes.string.isRequired,
  }).isRequired,
  labels: PropTypes.shape({
    number: PropTypes.string.isRequired,
    uppercase: PropTypes.string.isRequired,
    lowercase: PropTypes.string.isRequired,
    special: PropTypes.string.isRequired,
  }).isRequired,
};

Legend.defaultProps = {
  className: '',
};

export default Legend;
