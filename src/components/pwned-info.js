import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { pwnedPassword } from 'hibp';
import NumberFormat from 'react-number-format';
import debounce from 'lodash.debounce';

class PwnedInfo extends Component {
  static propTypes = {
    className: PropTypes.string,
    password: PropTypes.string.isRequired,
  };

  static defaultProps = {
    className: '',
  };

  static initialState = {
    loading: true,
    numPwns: -1,
    error: false,
  };

  state = PwnedInfo.initialState;

  debouncedFetch = debounce(
    async () => {
      try {
        const numPwns = await pwnedPassword(this.props.password);
        this.safeSetState({
          ...PwnedInfo.initialState,
          loading: false,
          numPwns,
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        this.safeSetState({
          ...PwnedInfo.initialState,
          loading: false,
          error: true,
        });
      }
    },
    250,
    { leading: true },
  );

  componentDidMount() {
    this.mounted = true;
    this.fetchPwnedInfo();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.password !== this.props.password) {
      this.fetchPwnedInfo();
    }
  }

  componentWillUnmount() {
    this.debouncedFetch.cancel();
    this.mounted = false;
  }

  safeSetState = (...args) => {
    if (this.mounted) {
      this.setState(...args);
    }
  };

  fetchPwnedInfo = () => {
    this.safeSetState(
      {
        ...PwnedInfo.initialState,
      },
      this.debouncedFetch,
    );
  };

  renderContent = content => (
    <section
      className={css`
        ${this.props.className};
      `}
    >
      <p>Public Exposure:</p>
      {content}
    </section>
  );

  render() {
    const { loading, numPwns, error } = this.state;

    if (loading) {
      return this.renderContent(<p>Loading...</p>);
    }

    if (error) {
      return this.renderContent(
        <p>
          <em>Public exposure information is currently unavailable.</em>
        </p>,
      );
    }

    if (numPwns) {
      return this.renderContent(
        <p>
          <span
            className={css`
              color: #e7040f;
            `}
          >
            Uh-oh!
          </span>{' '}
          This password has been publicly exposed in{' '}
          <NumberFormat displayType="text" value={numPwns} thousandSeparator />{' '}
          data breach
          {numPwns > 1 && 'es'}. It should NOT be used.
        </p>,
      );
    }

    return this.renderContent(
      <p>
        <span
          className={css`
            color: #20603c;
          `}
        >
          Congratulations!
        </span>{' '}
        This password has not been publicly exposed in any data breaches.
      </p>,
    );
  }
}

export default PwnedInfo;
