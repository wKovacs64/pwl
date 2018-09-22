import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import PasswordThroughLense from './password-through-lense';
import Legend from './legend';
import PwnedInfo from './pwned-info';

const Results = ({ className, colors, labels, password }) => (
  <section data-testid="results" className={className}>
    <PasswordThroughLense colors={colors} labels={labels} password={password} />
    <aside
      className={css`
        display: flex;
        flex-wrap: wrap;
      `}
    >
      <Legend
        className={css`
          flex: 1;
          margin-top: 2rem;
        `}
        colors={colors}
        labels={labels}
      />
      <PwnedInfo
        className={css`
          flex: 1;
          margin-top: 2rem;
        `}
        password={password}
      />
    </aside>
  </section>
);

Results.propTypes = {
  className: PropTypes.string,
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
  className: '',
  password: '',
};

export default Results;
