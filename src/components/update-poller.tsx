import React, { Fragment, useReducer, useRef, useEffect } from 'react';

const UpdatePoller: React.FunctionComponent<UpdatePollerProps> = ({
  children,
  hasUpdate,
  pollingIntervalMs,
}) => {
  type UpdatePollerState = {
    error?: string;
    updateAvailable: boolean;
  };

  const initialState: UpdatePollerState = {
    error: '',
    updateAvailable: false,
  };

  const intervalRef = useRef<number | null>(null);

  const clearUpdateCheckInterval = () => {
    if (typeof window !== 'undefined' && intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
  };

  const reducer = (
    state: UpdatePollerState,
    action: { type: string; payload?: string },
  ): UpdatePollerState => {
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
  };

  const [{ error, updateAvailable }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const checkForUpdates = async () => {
    try {
      if (!updateAvailable && (await hasUpdate())) {
        dispatch({ type: 'UPDATE_AVAILABLE' });
      }
    } catch (err) {
      dispatch({ type: 'UPDATE_FAILURE', payload: err.message });
    }
  };

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
  return <Fragment>{children({ error, updateAvailable })}</Fragment>;
};

type UpdatePollerProps = {
  readonly children: (
    { error, updateAvailable }: UpdatePollerChildrenProps,
  ) => React.ReactNode;
  // hasUpdate is a function provided by the consumer to determine whether or
  // not there is an updated version of the code available. This typically
  // involves fetching a non-cached version of some data that can be compared
  // to the current/running version. It should return true if the data is
  // different or false if it's unchanged.
  readonly hasUpdate: () => Promise<boolean>;
  readonly pollingIntervalMs: number;
};

type UpdatePollerChildrenProps = {
  readonly error?: string;
  readonly updateAvailable: boolean;
};

UpdatePoller.defaultProps = {
  children: () => null,
  pollingIntervalMs: 3600000, // 1 hour
};

export default UpdatePoller;
