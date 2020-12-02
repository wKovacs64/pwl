import * as React from 'react';
import { ColorMap, LabelMap } from '../legend';
import LegendItem from './legend-item';

interface LegendProps {
  className?: string;
  colors: ColorMap;
  labels: LabelMap;
}

function Legend({
  className,
  colors,
  labels,
  ...props
}: LegendProps): JSX.Element {
  return (
    <section data-testid="legend" className={className} {...props}>
      <p>Legend:</p>
      <LegendItem color={colors.number} label={labels.number} />
      <LegendItem color={colors.uppercase} label={labels.uppercase} />
      <LegendItem color={colors.lowercase} label={labels.lowercase} />
      <LegendItem color={colors.special} label={labels.special} />
    </section>
  );
}

Legend.defaultProps = {
  className: '',
};

export default Legend;
