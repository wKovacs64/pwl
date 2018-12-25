import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const LegendRow = styled.div`
  display: flex;
  align-items: center;
`;

const LegendColor = styled.div`
  display: inline-block;
  background-color: ${props => props.color};
  height: 1rem;
  width: 1rem;
  margin-right: 1rem;
`;

const LegendItem = ({ color, label }) => (
  <LegendRow data-testid={`legend-row--${label}`}>
    <LegendColor data-testid="color" color={color} />
    <span>{label}</span>
  </LegendRow>
);

LegendItem.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default LegendItem;
