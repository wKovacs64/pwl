import { useReducer, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function UpdatePoller({ children, hasUpdate, pollingIntervalMs }) {
  const initialState = {
    error: '',
    updateAvailable: false,
  };

  const intervalRef = useRef(null);

  function clearUpdateCheckInterval() {
    if (typeof window !== 'undefined' && intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
  }

  function reducer(state, action) {
    switch (action.type) {
      case 'UPDATE_AVAILABLE':
        clearUpdateCheckInterval();
        return {
          error: '',
          updateAvailable: true,
        };
      case 'UPDATE_FAILURE':
        return {
          error: action.payload,
          updateAvailable: false,
        };
      default:
        return state;
    }
  }

  const [{ error, updateAvailable }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  async function checkForUpdates() {
    try {
      if (!updateAvailable && (await hasUpdate())) {
        dispatch({ type: 'UPDATE_AVAILABLE' });
      }
    } catch (err) {
      dispatch({ type: 'UPDATE_FAILURE', payload: err.message });
    }
  }

  useEffect(
    () => {
      if (typeof window !== 'undefined') {
        checkForUpdates();
        intervalRef.current = window.setInterval(
          checkForUpdates,
          pollingIntervalMs,
        );
        return () => clearUpdateCheckInterval();
      }
      return () => {};
    },
    [
      /* empty inputs array so it doesn't run again on re-renders */
    ],
  );

  return children({ error, updateAvailable });
}

UpdatePoller.propTypes = {
  children: PropTypes.func,
  // hasUpdate is a function provided by the consumer to determine whether or
  // not there is an updated version of the code available. This typically
  // involves fetching a non-cached version of some data that can be compared
  // to the current/running version. It should return true if the data is
  // different or false if it's unchanged.
  hasUpdate: PropTypes.func.isRequired,
  pollingIntervalMs: PropTypes.number,
};

UpdatePoller.defaultProps = {
  children: () => null,
  pollingIntervalMs: 3600000, // 1 hour
};

export default UpdatePoller;
