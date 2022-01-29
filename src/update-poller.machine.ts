/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { assign, createMachine } from 'xstate';

interface UpdatePollerContext {
  errorMessage: string;
  updateAvailable: boolean;
}

const initialContext: UpdatePollerContext = {
  errorMessage: '',
  updateAvailable: false,
};

export const updatePollerMachine = createMachine(
  {
    tsTypes: {} as import('./update-poller.machine.typegen').Typegen0,
    schema: {
      context: {} as UpdatePollerContext,
      events: {} as {
        type: 'CHECK_FOR_UPDATE';
        checkForUpdate: () => Promise<boolean>;
      },
      services: {} as {
        checkForUpdate: { data: boolean };
      },
    },
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
          src: 'checkForUpdate',
          onDone: {
            actions: ['reset', 'assignUpdateAvailable'],
            target: 'success',
          },
          onError: {
            actions: ['reset', 'assignErrorMessage'],
            target: 'failure',
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
      assignUpdateAvailable: assign({
        updateAvailable: (_, event) => event.data,
      }),
      assignErrorMessage: assign({
        errorMessage: (_, event) =>
          typeof event.data === 'string' ? event.data : 'Update check failed.',
      }),
      reset: assign(initialContext),
    },
    guards: {
      updateAvailable: (context) => context.updateAvailable,
      updateNotAvailable: (context) => !context.updateAvailable,
    },
    services: {
      checkForUpdate: (_, event) => event.checkForUpdate(),
    },
  },
);
