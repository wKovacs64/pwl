import React from 'react';
import { ColorMap } from '../legend/colors';
import { LabelMap } from '../legend/labels';
import LegendItem from './legend-item';

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

type LegendProps = {
  colors: ColorMap;
  labels: LabelMap;
};

export default Legend;
