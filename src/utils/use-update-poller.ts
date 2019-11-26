import React from 'react';
import { Machine, assign } from 'xstate';
import { useMachine } from '@xstate/react';

interface UpdatePollerSchema {
  states: {
    idle: {};
    updateAvailable: {};
    error: {};
  };
}

interface UpdateAvailableEvent {
  type: 'UPDATE_AVAILABLE';
}

interface UpdateFailureEvent {
  type: 'UPDATE_FAILURE';
  payload: string;
}

type UpdatePollerEvent = UpdateAvailableEvent | UpdateFailureEvent;

interface UpdatePollerContext {
  error: string;
  updateAvailable: boolean;
}

const initialContext: UpdatePollerContext = {
  error: '',
  updateAvailable: false,
};

const updatePollerMachine = Machine<
  UpdatePollerContext,
  UpdatePollerSchema,
  UpdatePollerEvent
>(
  {
    id: 'Update Poller',
    initial: 'idle',
    context: initialContext,
    states: {
      idle: {
        on: {
          UPDATE_AVAILABLE: 'updateAvailable',
          UPDATE_FAILURE: 'error',
        },
      },
      updateAvailable: {
        entry: 'enableUpdateAvailable',
        type: 'final',
      },
      error: {
        entry: 'setErrorMessage',
        on: {
          UPDATE_AVAILABLE: 'updateAvailable',
          UPDATE_FAILURE: 'error',
        },
      },
    },
  },
  {
    actions: {
      enableUpdateAvailable: assign<UpdatePollerContext>({
        ...initialContext,
        updateAvailable: true,
      }),
      setErrorMessage: assign<UpdatePollerContext>({
        ...initialContext,
        error: (_, event) => event.payload,
      }),
    },
  },
);

type Interval = number | null;

const clearIntervalSafely = (interval: Interval): void => {
  if (typeof window !== 'undefined' && interval) {
    window.clearInterval(interval);
  }
};

interface UpdatePollerOptions {
  // whether or not to poll immediately (in addition to the interval)
  checkImmediately: boolean;
}

const useUpdatePoller = (
  hasUpdate: () => Promise<boolean>,
  pollingIntervalMs: number,
  { checkImmediately }: UpdatePollerOptions = { checkImmediately: false },
): [boolean, string] => {
  const intervalRef = React.useRef<Interval>(null);

  const [current, send] = useMachine(updatePollerMachine);
  const { updateAvailable, error } = current.context;

  const checkForUpdates = React.useCallback(async (): Promise<void> => {
    try {
      if (!updateAvailable && (await hasUpdate())) {
        send({ type: 'UPDATE_AVAILABLE' });
      }
    } catch (err) {
      send({ type: 'UPDATE_FAILURE', payload: err.message });
    }
  }, [hasUpdate, updateAvailable, send]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (checkImmediately) {
        checkForUpdates();
      }
      intervalRef.current = window.setInterval(
        checkForUpdates,
        pollingIntervalMs,
      );
      return () => clearIntervalSafely(intervalRef.current);
    }
    return () => {};
  }, [checkForUpdates, pollingIntervalMs, checkImmediately]);

  return [updateAvailable, error];
};

export default useUpdatePoller;
