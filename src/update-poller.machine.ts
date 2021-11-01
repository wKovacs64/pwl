import { createModel } from 'xstate/lib/model';

const initialContext = {
  error: '',
  updateAvailable: false,
};

const creators = {
  events: {
    checkForUpdate: (checkForUpdate: () => Promise<boolean>) => ({
      checkForUpdate,
    }),
    setUpdateAvailable: (updateAvailable: boolean) => ({ updateAvailable }),
    setErrorMessage: (message: string) => ({ message }),
  },
};

export const updatePollerModel = createModel(initialContext, creators);

const assignUpdateAvailable = updatePollerModel.assign(
  {
    updateAvailable: (_, event) => event.updateAvailable,
  },
  'setUpdateAvailable',
);

const assignError = updatePollerModel.assign(
  { error: (_, event) => event.message },
  'setErrorMessage',
);

const reset = updatePollerModel.reset();

export const updatePollerMachine = updatePollerModel.createMachine(
  {
    id: 'updatePoller',
    initial: 'idle',
    context: updatePollerModel.initialContext,
    states: {
      idle: {
        on: {
          checkForUpdate: 'checkingForUpdate',
        },
      },
      checkingForUpdate: {
        entry: reset,
        invoke: {
          id: 'checkForUpdate',
          src: (_, event) => async (send) => {
            if (event.type !== 'checkForUpdate') return;
            try {
              const updateAvailable = await event.checkForUpdate();
              send(
                updatePollerModel.events.setUpdateAvailable(updateAvailable),
              );
            } catch (err: unknown) {
              send(
                updatePollerModel.events.setErrorMessage(
                  err instanceof Error ? err.message : 'Update check failed.',
                ),
              );
            }
          },
        },
        on: {
          setUpdateAvailable: {
            actions: [reset, assignUpdateAvailable],
            target: 'success',
          },
          setErrorMessage: {
            actions: [reset, assignError],
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
          checkForUpdate: 'checkingForUpdate',
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
