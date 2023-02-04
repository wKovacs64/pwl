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

export const updatePollerMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFcAOECGAXMAFA9gDaFgBOAdAJYQkDEAwgBICi9A0gPoBiA8gEocAqrgAiAQQAqzANoAGALqJQqfLEpZK+AHZKQAD0QBGAGwBWcgE4rVgOyGATMeMAWABzH7AGhABPI8YBmS1MA2SsQgIsbR3sAX1jvNEwcAmIycgBjAAswDIBrSi0oLnxSQXRsMFoIbTAqLQA3fDy67Ny8krKKnDlFJBAVNQ1tXQMEGwCbclcbZwtXANdnANNHU28-BHtTQ3JnWQ9DC2cbGw9jQ3jE7rwiEgo2-MLi0vLkqrJSUvJUQmwAM1KAFtMjl8p03pVerpBupNDp+mMJlMZnMFksVmsNkYArtrFEHKZjK5TBYriAkpVUvdyLBkBkMnBYLRof1YcMEaAxoZDAc9sS7FEJu51r5EPYLEFjBZHEsJvZXLIwsZyZSUnd0nSGUyWYY+spVHCRojEMjprN5otlqszNiEJNZNMHM5jGdLZK4gkKTdqel-hhKIRkKQqkxWJxeAJhOIpKyDUN4aNTcTyB40YYbK5XA4LMY7dm9tYbBZSbJcRZDAF4l6tPgIHBdGrbmlSDDDRykwgALR5sXd8z4weDqtepu+ijUEhthPGrmIZxePsZ+zkEIuXEnBYl46qn0ah5ggpFCE3adGzn6RBW6bLZHzUwTUzOO0OKYl3EOALODOnFWjvctrS9KMrA8Bsu2iYmgg8xTC6Mz2I4Jz2CYz59hKeILq6uZWCYI7XO847kP6gbBmAZ4dlBMH8vBiHRChdoWI6sgLB+IQnAuC67gR+7kE2YgNAGfwAEZTuBM4XtyoRBIYRLIQushHAExJ2hKjrSjEuY2GWlojvEQA */
  createMachine(
    {
      predictableActionArguments: true,
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
            typeof event.data === 'string'
              ? event.data
              : 'Update check failed.',
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
