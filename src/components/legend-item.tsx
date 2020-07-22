import * as React from 'react';
import styled from '@emotion/styled';

const LegendRow = styled.div`
  display: flex;
  align-items: center;
`;

const LegendColor = styled.div`
  display: inline-block;
  background-color: ${(props) => props.color};
  height: 1rem;
  width: 1rem;
  margin-right: 1rem;
`;

interface LegendItemProps {
  color: string;
  label: string;
}

function LegendItem({ color, label }: LegendItemProps): JSX.Element {
  return (
    <LegendRow data-testid={`legend-row--${label}`}>
      <LegendColor data-testid="color" color={color} />
      <span>{label}</span>
    </LegendRow>
  );
}

export default LegendItem;
