import { Component } from 'react';
import PropTypes from 'prop-types';

class AutoUpdater extends Component {
  static propTypes = {
    children: PropTypes.func,
    // hasUpdate is a function provided by the consumer to determine whether or
    // not there is an updated version of the code available. This typically
    // involves fetching a non-cached version of some data that can be compared
    // to the current/running version. It should return true if the data is
    // different or false if it's unchanged.
    hasUpdate: PropTypes.func.isRequired,
    pollingIntervalMs: PropTypes.number,
  };

  static defaultProps = {
    children: () => null,
    pollingIntervalMs: 3600000, // 1 hour
  };

  static initialState = {
    error: '',
    updateAvailable: false,
  };

  state = AutoUpdater.initialState;

  componentDidMount() {
    if (typeof window !== 'undefined') {
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
    const { hasUpdate } = this.props;
    const { updateAvailable } = this.state;

    try {
      if (!updateAvailable && (await hasUpdate())) {
        this.setState({ ...AutoUpdater.initialState, updateAvailable: true });
        this.clearUpdateCheckInterval();
      }
    } catch (err) {
      this.setState({ ...AutoUpdater.initialState, error: err.message });
    }
  };

  render() {
    const { children } = this.props;
    const { error, updateAvailable } = this.state;

    return children({ error, updateAvailable });
  }
}

export default AutoUpdater;
