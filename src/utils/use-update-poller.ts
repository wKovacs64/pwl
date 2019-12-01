import React from 'react';
import { Machine, assign, DoneInvokeEvent } from 'xstate';
import { useMachine } from '@xstate/react';

interface UpdatePollerSchema {
  states: {
    idle: {};
    checkingForUpdate: {};
    success: {};
    failure: {};
    updateAvailable: {};
  };
}

interface UpdatePollerCheckEvent {
  type: 'CHECK_FOR_UPDATE';
  checkForUpdate: () => Promise<boolean>;
}

type UpdatePollerCheckSuccessEvent = DoneInvokeEvent<boolean>;
type UpdatePollerCheckFailureEvent = DoneInvokeEvent<Error>;
type UpdatePollerEvent = UpdatePollerCheckEvent;
// | UpdatePollerCheckSuccessEvent
// | UpdatePollerCheckFailureEvent;

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
          CHECK_FOR_UPDATE: 'checkingForUpdate',
        },
      },
      checkingForUpdate: {
        id: 'checkForUpdate',
        entry: assign<UpdatePollerContext>(initialContext),
        invoke: {
          src: (_, event) => (event as UpdatePollerCheckEvent).checkForUpdate(),
          onDone: {
            target: 'success',
            actions: assign<UpdatePollerContext, UpdatePollerCheckSuccessEvent>(
              {
                ...initialContext,
                updateAvailable: (_, event) => event.data,
              },
            ),
          },
          onError: {
            target: 'failure',
            actions: assign<UpdatePollerContext, UpdatePollerCheckFailureEvent>(
              {
                ...initialContext,
                error: (_, event) => event.data.message,
              },
            ),
          },
        },
      },
      success: {
        on: {
          '': [
            {
              cond: 'updateAvailable',
              target: 'updateAvailable',
            },
            {
              cond: 'updateNotAvailable',
              target: 'idle',
            },
          ],
        },
      },
      failure: {
        on: {
          CHECK_FOR_UPDATE: 'checkingForUpdate',
        },
      },
      updateAvailable: {
        type: 'final',
      },
    },
  },
  {
    guards: {
      updateAvailable: context => context.updateAvailable,
      updateNotAvailable: context => !context.updateAvailable,
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

  const checkForUpdate = React.useCallback(() => {
    send({ type: 'CHECK_FOR_UPDATE', checkForUpdate: hasUpdate });
  }, [hasUpdate, send]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (checkImmediately) {
        checkForUpdate();
      }
      intervalRef.current = window.setInterval(
        checkForUpdate,
        pollingIntervalMs,
      );
      return () => clearIntervalSafely(intervalRef.current);
    }
    return () => {};
  }, [checkForUpdate, pollingIntervalMs, checkImmediately]);

  return [updateAvailable, error];
};

export default useUpdatePoller;
