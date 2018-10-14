import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { pwnedPassword } from 'hibp';
import debounce from 'lodash.debounce';
import wait from '../utils/wait';

class PwnedInfo extends Component {
  static propTypes = {
    className: PropTypes.string,
    delayLoadingMs: PropTypes.number,
    password: PropTypes.string.isRequired,
  };

  static defaultProps = {
    className: '',
    delayLoadingMs: 750,
  };

  static SHOW_LOADING = Symbol('show-loading');

  static initialState = {
    loading: false,
    numPwns: -1,
    error: false,
  };

  state = PwnedInfo.initialState;

  componentDidMount() {
    this.mounted = true;
    this.debouncedFetchPwnedInfo = debounce(this.fetchPwnedInfo, 250, {
      leading: true,
    });
    this.debouncedFetchPwnedInfo();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.password !== this.props.password) {
      this.debouncedFetchPwnedInfo();
    }
  }

  componentWillUnmount() {
    this.debouncedFetchPwnedInfo.cancel();
    this.mounted = false;
  }

  safeSetState = (...args) => {
    if (this.mounted) {
      this.setState(...args);
    }
  };

  maybeShowLoadingEventually = async getPwnedInfo => {
    const { delayLoadingMs } = this.props;
    const showLoading = wait(delayLoadingMs).then(() => PwnedInfo.SHOW_LOADING);
    const winner = await Promise.race([showLoading, getPwnedInfo]);

    if (winner === PwnedInfo.SHOW_LOADING) {
      this.safeSetState({ loading: true });
    }
  };

  fetchPwnedInfo = async () => {
    try {
      const getPwnedInfo = pwnedPassword(this.props.password);
      this.maybeShowLoadingEventually(getPwnedInfo);
      const numPwns = await getPwnedInfo;
      this.safeSetState({
        ...PwnedInfo.initialState,
        loading: false,
        numPwns,
      });
    } catch (err) {
      this.safeSetState({
        ...PwnedInfo.initialState,
        loading: false,
        error: true,
      });
    }
  };

  renderContent = content => (
    <section
      data-testid="pwned-info"
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

    if (numPwns > 0) {
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
          <span>{Number(numPwns).toLocaleString()}</span> data breach
          {numPwns > 1 && 'es'}. It should NOT be used.
        </p>,
      );
    }

    if (numPwns === 0) {
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

    // loading, but not time to show it yet (...probably)
    return this.renderContent(null);
  }
}

export default PwnedInfo;
