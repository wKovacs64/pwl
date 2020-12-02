import * as React from 'react';
import styled from '@emotion/styled';
import { ColorMap, LabelMap } from '../legend';
import PasswordThroughLense from './password-through-lense';
import Legend from './legend';
import PwnedInfo from './pwned-info';

const AdditionalInfo = styled.section`
  display: flex;
  flex-wrap: wrap;

  > * {
    flex: 1;
    margin-top: 2rem;
  }
`;

interface ResultsProps {
  className?: string;
  colors: ColorMap;
  labels: LabelMap;
  passwordInput: string;
  passwordToCheck: string;
}

function Results({
  className,
  colors,
  labels,
  passwordInput,
  passwordToCheck,
  ...props
}: ResultsProps): JSX.Element {
  return (
    <section data-testid="results" className={className} {...props}>
      <PasswordThroughLense
        colors={colors}
        labels={labels}
        password={passwordInput}
      />
      <AdditionalInfo>
        <Legend colors={colors} labels={labels} />
        <PwnedInfo password={passwordToCheck} />
      </AdditionalInfo>
    </section>
  );
}

Results.defaultProps = {
  className: '',
};

export default Results;
