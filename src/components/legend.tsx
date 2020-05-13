import React from 'react';
import { ColorMap, LabelMap } from '../legend';
import LegendItem from './legend-item';

interface LegendProps {
  colors: ColorMap;
  labels: LabelMap;
}

const Legend: React.FunctionComponent<LegendProps> = ({
  colors,
  labels,
  ...props
}) => (
  <section data-testid="legend" {...props}>
    <p>Legend:</p>
    <LegendItem color={colors.number} label={labels.number} />
    <LegendItem color={colors.uppercase} label={labels.uppercase} />
    <LegendItem color={colors.lowercase} label={labels.lowercase} />
    <LegendItem color={colors.special} label={labels.special} />
  </section>
);

export default Legend;
