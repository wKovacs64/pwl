import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { ColorMap, LabelMap } from '../legend';
import PasswordThroughLense from './password-through-lense';
import Legend from './legend';
import PwnedInfo from './pwned-info';

const AdditionalInfo = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

interface ResultsProps {
  colors: ColorMap;
  labels: LabelMap;
  passwordInput: string;
  passwordToCheck: string;
}

const Results: React.FunctionComponent<ResultsProps> = ({
  colors,
  labels,
  passwordInput,
  passwordToCheck,
  ...props
}) => (
  <section data-testid="results" {...props}>
    <PasswordThroughLense
      colors={colors}
      labels={labels}
      password={passwordInput}
    />
    <AdditionalInfo>
      <Legend
        css={css`
          flex: 1;
          margin-top: 2rem;
        `}
        colors={colors}
        labels={labels}
      />
      <PwnedInfo
        css={css`
          flex: 1;
          margin-top: 2rem;
        `}
        password={passwordToCheck}
      />
    </AdditionalInfo>
  </section>
);

export default Results;
