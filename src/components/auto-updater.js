import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import axios from 'axios';
import mq from '../utils/mq';

class AutoUpdater extends Component {
  static propTypes = {
    siteTitle: PropTypes.string.isRequired,
    indexUrl: PropTypes.string.isRequired,
    isNewer: PropTypes.func.isRequired,
    pollingIntervalMs: PropTypes.number.isRequired,
  };

  state = {
    newCodeAvailable: false,
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.parser = new DOMParser();
      this.checkForUpdates();
      this.interval = window.setInterval(
        this.checkForUpdates,
        this.props.pollingIntervalMs,
      );
    }
  }

  componentWillUnmount() {
    this.clearUpdateCheckInterval();
  }

  clearUpdateCheckInterval = () => {
    if (typeof window !== 'undefined' && this.interval) {
      window.clearInterval(this.interval);
    }
  };

  checkForUpdates = async () => {
    const { isNewer } = this.props;
    const { newCodeAvailable } = this.state;

    if (!newCodeAvailable) {
      try {
        const res = await axios.get(this.props.indexUrl, {
          headers: { Pragma: 'no-cache' },
        });

        if (res.data) {
          const remoteDocument = this.parser.parseFromString(
            res.data,
            'text/html',
          );

          if (isNewer(remoteDocument)) {
            this.setState({ newCodeAvailable: true });
            this.clearUpdateCheckInterval();
          }
        }
      } catch (err) {
        // no-op: we don't really care if the update checks fail
      }
    }
  };

  reloadApp = e => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.location.reload(true);
    }
  };

  render() {
    const { siteTitle } = this.props;

    if (this.state.newCodeAvailable) {
      return (
        <div
          aria-live="polite"
          role="alert"
          className={css`
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            z-index: 9999;
            box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.2);
            ${mq.md(css`
              top: 1rem;
              left: unset;
              right: 1rem;
              width: auto;
            `)};
          `}
        >
          <button
            type="button"
            onClick={this.reloadApp}
            className={css`
              color: #b3efff;
              background-color: #1c304a;
              border: none;
              padding: 1rem;
              width: 100%;
              transition: color 0.3s ease, background-color 0.3s ease;
              & :hover {
                cursor: pointer;
                color: #1c304a;
                background-color: #b3efff;
              }
            `}
          >
            A new version of {siteTitle} is available!
          </button>
        </div>
      );
    }

    return null;
  }
}

export default AutoUpdater;
