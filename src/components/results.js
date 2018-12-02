import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import PasswordThroughLense from './password-through-lense';
import Legend from './legend';
import PwnedInfo from './pwned-info';

const Results = ({ colors, labels, password, ...props }) => (
  <section data-testid="results" {...props}>
    <PasswordThroughLense colors={colors} labels={labels} password={password} />
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
        password={password}
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
  password: PropTypes.string,
};

Results.defaultProps = {
  password: '',
};

export default Results;
