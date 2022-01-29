/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { assign, createMachine } from 'xstate';
import { pwnedPassword } from 'hibp';

interface PwnedInfoContext {
  numPwns: number;
  error: boolean;
}

const initialContext: PwnedInfoContext = {
  numPwns: -1,
  error: false,
};

type PwnedInfoEvent =
  | { type: 'GET_PWNED_INFO'; password: string }
  | { type: 'SET_NUM_PWNS'; numPwns: number }
  | { type: 'SET_ERROR' };

/** @xstate-layout N4IgpgJg5mDOIC5QAcDuA7SBJdAzA9gHQwAuJAlulAHICuAtgAoawDEAygKIAqA+tQFUAsr0YB1au0Qp8schXzppIAB6IALADYAjIXUAGTQCYArAA5N6gJzb96gMwAaEAE9EV+4X3f99+-qN7MxMjTQB2AF8I5zRMCBwCYjAyShoGZnQ2Lj5OACVcgHlc5WRZeXJFZTUELV0DY3NLGzsnV0RAky8ffW0TMNNLByiYjGw8fFYAcR5RCU4AEV4sagAxApKyhSUkVQ0jZzcEXs7uwMN1IzCzfRMo6JB0fAg4EtH48cJyCAAbMA25LZVRDXQimbraKyaPo3dQHdpGKxdby2dRmexhYwY4YgWJjRKkChUOhMFj-cqVHbVQK6IzWKxhGyaewhXqwtpHbRGQgmHzaNFacyoozY3HvRKwWgAY0lcHgO1KAIq21A1UGXiuvW0YT8JisJm0cKOfiRdisViMZnN3jMIreCSIuAAhuRvrQAE5-eWbJVAhBq-Qa-Xa5l6g3sy4nXlmdRhDH2CG2uL2smAymIPmGzQm6zaC5Mq42W53IA */
export const pwnedInfoMachine = createMachine(
  {
    context: initialContext,
    tsTypes: {} as import('./pwned-info.machine.typegen').Typegen0,
    schema: {
      context: {} as PwnedInfoContext,
      events: {} as PwnedInfoEvent,
    },
    id: 'pwnedInfo',
    initial: 'idle',
    states: {
      idle: {},
      gettingNumPwns: {
        entry: 'reset',
        invoke: {
          id: 'pwnedPassword',
          src: 'getNumPwns',
        },
        on: {
          SET_NUM_PWNS: {
            actions: ['reset', 'assignNumPwns'],
            target: 'success',
          },
          SET_ERROR: {
            actions: ['reset', 'assignError'],
            target: 'failure',
          },
        },
      },
      success: {},
      failure: {},
    },
    on: {
      GET_PWNED_INFO: {
        target: 'gettingNumPwns',
      },
    },
  },
  {
    actions: {
      assignNumPwns: assign({ numPwns: (_, event) => event.numPwns }),
      assignError: assign({ error: (_) => true }),
      reset: assign(initialContext),
    },
    services: {
      getNumPwns: (_, event) => async (sendBack) => {
        let isCancelled = false;
        try {
          const numPwns = await pwnedPassword(event.password);
          if (!isCancelled) sendBack({ type: 'SET_NUM_PWNS', numPwns });
        } catch (err: unknown) {
          if (!isCancelled) sendBack({ type: 'SET_ERROR' });
        }
        return () => {
          isCancelled = true;
        };
      },
    },
  },
);
