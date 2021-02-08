import { createMachine, DoneInvokeEvent } from 'xstate';
import { createModel } from 'xstate/lib/model';

const updatePollerModel = createModel<
  UpdatePollerContext,
  UpdatePollerResultsEvent
>({
  error: '',
  updateAvailable: false,
});

const assignUpdateAvailable = updatePollerModel.assign({
  updateAvailable: (context, event) =>
    typeof event.data === 'boolean' ? event.data : context.updateAvailable,
});
const assignError = updatePollerModel.assign({
  error: (context, event) =>
    event.data instanceof Error ? event.data.message : context.error,
});
const reset = updatePollerModel.reset();

export const updatePollerMachine = createMachine<
  UpdatePollerContext,
  UpdatePollerCheckEvent,
  UpdatePollerState
>(
  {
    id: 'updatePoller',
    initial: 'idle',
    context: updatePollerModel.initialContext,
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
            actions: [reset, assignUpdateAvailable],
          },
          onError: {
            target: 'failure',
            actions: [reset, assignError],
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
    guards: {
      updateAvailable: (context) => context.updateAvailable,
      updateNotAvailable: (context) => !context.updateAvailable,
    },
  },
);

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

// external/incoming events
interface UpdatePollerCheckEvent {
  type: 'CHECK_FOR_UPDATE';
  checkForUpdate: () => Promise<boolean>;
}

// internal events (results from invoking the pwnedPassword promise)
type UpdatePollerCheckSuccessEvent = DoneInvokeEvent<boolean>;
type UpdatePollerCheckFailureEvent = DoneInvokeEvent<Error>;
type UpdatePollerResultsEvent =
  | UpdatePollerCheckSuccessEvent
  | UpdatePollerCheckFailureEvent;
