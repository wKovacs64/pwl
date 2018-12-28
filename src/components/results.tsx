import React from 'react';
import { css } from '@emotion/core';
import styled from '../utils/styled';
import { ColorMap } from '../legend/colors';
import { LabelMap } from '../legend/labels';
import PasswordThroughLense from './password-through-lense';
import Legend from './legend';
import PwnedInfo from './pwned-info';

const LegendContainer = styled.aside`
  display: flex;
  flex-wrap: wrap;
`;

type ResultsProps = {
  colors: ColorMap;
  labels: LabelMap;
  passwordInput: string;
  passwordToCheck: string;
};

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
    <LegendContainer>
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
    </LegendContainer>
  </section>
);

export default Results;
