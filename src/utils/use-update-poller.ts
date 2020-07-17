import * as React from 'react';
import { assign, createMachine, DoneInvokeEvent } from 'xstate';
import { useMachine } from '@xstate/react';

interface UpdatePollerCheckEvent {
  type: 'CHECK_FOR_UPDATE';
  checkForUpdate: () => Promise<boolean>;
}

type UpdatePollerCheckSuccessEvent = DoneInvokeEvent<boolean>;
type UpdatePollerCheckFailureEvent = DoneInvokeEvent<Error>;
// incoming event types only (internal events will be added internally)
type UpdatePollerEvent = UpdatePollerCheckEvent;

interface UpdatePollerContext {
  error: string;
  updateAvailable: boolean;
}

type UpdatePollerState =
  | { value: 'idle'; context: UpdatePollerContext }
  | { value: 'checkingForUpdate'; context: UpdatePollerContext }
  | { value: 'success'; context: UpdatePollerContext }
  | { value: 'failure'; context: UpdatePollerContext }
  | { value: 'updateAvailable'; context: UpdatePollerContext };

const initialContext: UpdatePollerContext = {
  error: '',
  updateAvailable: false,
};

const updatePollerMachine = createMachine<
  UpdatePollerContext,
  UpdatePollerEvent,
  UpdatePollerState
>(
  {
    id: 'updatePoller',
    initial: 'idle',
    context: initialContext,
    states: {
      idle: {
        on: {
          CHECK_FOR_UPDATE: 'checkingForUpdate',
        },
      },
      checkingForUpdate: {
        entry: 'reset',
        invoke: {
          id: 'checkForUpdate',
          src: (_, event) => event.checkForUpdate(),
          onDone: {
            target: 'success',
            actions: [
              'reset',
              assign<UpdatePollerContext, UpdatePollerCheckSuccessEvent>({
                updateAvailable: (_, event) => event.data,
              }),
            ],
          },
          onError: {
            target: 'failure',
            actions: [
              'reset',
              assign<UpdatePollerContext, UpdatePollerCheckFailureEvent>({
                error: (_, event) => event.data.message,
              }),
            ],
          },
        },
      },
      success: {
        always: [
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
    actions: {
      reset: assign(initialContext),
    },
    guards: {
      updateAvailable: (context) => context.updateAvailable,
      updateNotAvailable: (context) => !context.updateAvailable,
    },
  },
);

type Interval = number | null;

const clearIntervalSafely = (interval: Interval) => {
  if (typeof window !== 'undefined' && interval) {
    window.clearInterval(interval);
  }
};

interface UpdatePollerOptions {
  // whether or not to poll immediately (in addition to the interval)
  checkImmediately: boolean;
}

type UseUpdatePollerFn = (
  hasUpdate: () => Promise<boolean>,
  pollingIntervalMs: number,
  options?: UpdatePollerOptions,
) => readonly [boolean, string];

export const useUpdatePoller: UseUpdatePollerFn = (
  hasUpdate,
  pollingIntervalMs,
  { checkImmediately } = { checkImmediately: false },
) => {
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
