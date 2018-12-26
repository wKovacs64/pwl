import React, { Fragment, useReducer, useRef, useEffect } from 'react';

const UpdatePoller: React.FunctionComponent<UpdatePollerProps> = ({
  children,
  hasUpdate,
  pollingIntervalMs,
}) => {
  const initialState = {
    error: '',
    updateAvailable: false,
  };

  const intervalRef = useRef<number | null>(null);

  function clearUpdateCheckInterval() {
    if (typeof window !== 'undefined' && intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
  }

  function reducer(
    state: typeof initialState,
    action: { type: string; payload?: string },
  ): typeof initialState {
    switch (action.type) {
      case 'UPDATE_AVAILABLE':
        clearUpdateCheckInterval();
        return {
          error: '',
          updateAvailable: true,
        };
      case 'UPDATE_FAILURE':
        return {
          error: action.payload || 'Update check failed.',
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

  // wrap in a Fragment to work around DefinitelyTyped/DefinitelyTyped#18051
  return (
    <Fragment>
      {children ? children({ error, updateAvailable }) : null}
    </Fragment>
  );
};

type UpdatePollerProps = {
  children?: (
    { error, updateAvailable }: { error?: string; updateAvailable: boolean },
  ) => React.ReactNode;
  // hasUpdate is a function provided by the consumer to determine whether or
  // not there is an updated version of the code available. This typically
  // involves fetching a non-cached version of some data that can be compared
  // to the current/running version. It should return true if the data is
  // different or false if it's unchanged.
  hasUpdate: () => Promise<boolean>;
  pollingIntervalMs?: number;
};

UpdatePoller.defaultProps = {
  children: () => null,
  pollingIntervalMs: 3600000, // 1 hour
};

export default UpdatePoller;
