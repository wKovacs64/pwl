import React, { Fragment, useReducer, useRef, useEffect } from 'react';

type Interval = number | null;

const clearIntervalSafely = (interval: Interval): void => {
  if (typeof window !== 'undefined' && interval) {
    window.clearInterval(interval);
  }
};

enum ActionType {
  UPDATE_AVAILABLE,
  UPDATE_FAILURE,
}

interface UpdateAvailable {
  type: ActionType.UPDATE_AVAILABLE;
}

interface UpdateFailure {
  type: ActionType.UPDATE_FAILURE;
  payload: string;
}

type Action = UpdateAvailable | UpdateFailure;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.UPDATE_AVAILABLE:
      return {
        error: '',
        updateAvailable: true,
      };
    case ActionType.UPDATE_FAILURE:
      return {
        error: action.payload,
        updateAvailable: false,
      };
    default:
      return state;
  }
};

interface State {
  error: string;
  updateAvailable: boolean;
}

const initialState: State = {
  error: '',
  updateAvailable: false,
};

interface UpdatePollerProps {
  children: (props: ChildrenProps) => React.ReactNode;
  // hasUpdate is a function provided by the consumer to determine whether or
  // not there is an updated version of the code available. This typically
  // involves fetching a non-cached version of some data that can be compared
  // to the current/running version. It should return true if the data is
  // different or false if it's unchanged.
  hasUpdate: () => Promise<boolean>;
  pollingIntervalMs: number;
}

interface ChildrenProps {
  error: string;
  updateAvailable: boolean;
}

const UpdatePoller: React.FunctionComponent<UpdatePollerProps> = ({
  children,
  hasUpdate,
  pollingIntervalMs,
}) => {
  const intervalRef = useRef<Interval>(null);

  const [{ error, updateAvailable }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const checkForUpdates = async () => {
    try {
      if (!updateAvailable && (await hasUpdate())) {
        clearIntervalSafely(intervalRef.current);
        dispatch({ type: ActionType.UPDATE_AVAILABLE });
      }
    } catch (err) {
      dispatch({
        type: ActionType.UPDATE_FAILURE,
        payload: err.message,
      });
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      checkForUpdates();
      intervalRef.current = window.setInterval(
        checkForUpdates,
        pollingIntervalMs,
      );
      return () => clearIntervalSafely(intervalRef.current);
    }
    return () => {};
  }, [
    /* empty inputs array so it doesn't run again on re-renders */
  ]);

  // wrap in a Fragment to work around DefinitelyTyped/DefinitelyTyped#18051
  return <Fragment>{children({ error, updateAvailable })}</Fragment>;
};

UpdatePoller.defaultProps = {
  children: () => null,
  pollingIntervalMs: 3600000, // 1 hour
};

export default UpdatePoller;
