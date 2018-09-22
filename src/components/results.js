import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import PasswordThroughLense from './password-through-lense';
import Legend from './legend';
import PwnedInfo from './pwned-info';

const Results = ({ className, colors, password }) => (
  <section data-testid="results" className={className}>
    <PasswordThroughLense colors={colors} password={password} />
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
    number: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    upperCaseLetter: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    lowerCaseLetter: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    special: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  password: PropTypes.string,
};

Results.defaultProps = {
  className: '',
  password: '',
};

export default Results;
