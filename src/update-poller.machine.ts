/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { assign, createMachine } from 'xstate';

interface UpdatePollerContext {
  error: string;
  updateAvailable: boolean;
}

const initialContext: UpdatePollerContext = {
  error: '',
  updateAvailable: false,
};

type UpdatePollerEvent =
  | { type: 'CHECK_FOR_UPDATE'; checkForUpdate: () => Promise<boolean> }
  | { type: 'SET_UPDATE_AVAILABLE'; updateAvailable: boolean }
  | { type: 'SET_ERROR_MESSAGE'; message: string };

export const updatePollerMachine = createMachine(
  {
    tsTypes: {} as import('./update-poller.machine.typegen').Typegen0,
    schema: {
      context: {} as UpdatePollerContext,
      events: {} as UpdatePollerEvent,
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
        },
        on: {
          SET_UPDATE_AVAILABLE: {
            actions: ['reset', 'assignUpdateAvailable'],
            target: 'success',
          },
          SET_ERROR_MESSAGE: {
            actions: ['reset', 'assignError'],
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
        updateAvailable: (_, event) => event.updateAvailable,
      }),
      assignError: assign({ error: (_, event) => event.message }),
      reset: assign(initialContext),
    },
    guards: {
      updateAvailable: (context) => context.updateAvailable,
      updateNotAvailable: (context) => !context.updateAvailable,
    },
    services: {
      checkForUpdate: (_, event) => async (sendBack) => {
        let isCancelled = false;
        try {
          const updateAvailable = await event.checkForUpdate();
          if (!isCancelled) {
            sendBack({
              type: 'SET_UPDATE_AVAILABLE',
              updateAvailable,
            });
          }
        } catch (err: unknown) {
          if (!isCancelled) {
            sendBack({
              type: 'SET_ERROR_MESSAGE',
              message:
                err instanceof Error ? err.message : 'Update check failed.',
            });
          }
        }
        return () => {
          isCancelled = true;
        };
      },
    },
  },
);
