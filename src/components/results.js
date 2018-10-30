import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import PasswordThroughLense from './password-through-lense';
import Legend from './legend';
import PwnedInfo from './pwned-info';

const Results = ({
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
    <aside
      css={css`
        display: flex;
        flex-wrap: wrap;
      `}
    >
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
    </aside>
  </section>
);

Results.propTypes = {
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
  passwordInput: PropTypes.string,
  passwordToCheck: PropTypes.string,
};

Results.defaultProps = {
  passwordInput: '',
  passwordToCheck: '',
};

export default Results;
