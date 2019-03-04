import React, { useReducer, useRef, useEffect } from 'react';

type Interval = number | null;

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

interface State {
  error: string;
  updateAvailable: boolean;
}

const clearIntervalSafely = (interval: Interval): void => {
  if (typeof window !== 'undefined' && interval) {
    window.clearInterval(interval);
  }
};

const useUpdatePoller = (
  hasUpdate: () => Promise<boolean>,
  pollingIntervalMs: number,
): [boolean, string] => {
  const intervalRef = useRef<Interval>(null);

  const initialState: State = {
    error: '',
    updateAvailable: false,
  };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case ActionType.UPDATE_AVAILABLE:
        clearIntervalSafely(intervalRef.current);
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

  const [{ error, updateAvailable }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const checkForUpdates = React.useCallback(async (): Promise<void> => {
    try {
      if (!updateAvailable && (await hasUpdate())) {
        dispatch({ type: ActionType.UPDATE_AVAILABLE });
      }
    } catch (err) {
      dispatch({
        type: ActionType.UPDATE_FAILURE,
        payload: err.message,
      });
    }
  }, [hasUpdate, updateAvailable]);

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
  }, [checkForUpdates, pollingIntervalMs]);

  return [updateAvailable, error];
};

export default useUpdatePoller;
