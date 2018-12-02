import React from 'react';
import PropTypes from 'prop-types';
import LegendItem from './legend-item';

const Legend = ({ colors, labels, ...props }) => (
  <section data-testid="legend" {...props}>
    <p>Legend:</p>
    <LegendItem color={colors.number} label={labels.number} />
    <LegendItem color={colors.uppercase} label={labels.uppercase} />
    <LegendItem color={colors.lowercase} label={labels.lowercase} />
    <LegendItem color={colors.special} label={labels.special} />
  </section>
);

Legend.propTypes = {
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

export default Legend;
