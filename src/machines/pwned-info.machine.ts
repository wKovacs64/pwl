import { createModel } from 'xstate/lib/model';
import { pwnedPassword } from 'hibp';

const initialContext = {
  numPwns: -1,
  error: false,
};

const creators = {
  events: {
    getPwnedInfo: (password: string) => ({ password }),
    setNumPwns: (numPwns: number) => ({ numPwns }),
    setError: () => ({}),
  },
};

export const pwnedInfoModel = createModel(initialContext, creators);

const assignNumPwns = pwnedInfoModel.assign(
  { numPwns: (_, event) => event.numPwns },
  'setNumPwns',
);

const assignError = pwnedInfoModel.assign({ error: true });

const reset = pwnedInfoModel.reset();

export const pwnedInfoMachine = pwnedInfoModel.createMachine({
  id: 'pwnedInfo',
  initial: 'idle',
  context: pwnedInfoModel.initialContext,
  on: { getPwnedInfo: 'loading' },
  states: {
    idle: {},
    loading: {
      entry: reset,
      invoke: {
        id: 'pwnedPassword',
        src: (_, event) => async (send) => {
          if (event.type !== 'getPwnedInfo') return;
          try {
            const numPwns = await pwnedPassword(event.password);
            send(pwnedInfoModel.events.setNumPwns(numPwns));
          } catch (err: unknown) {
            send(pwnedInfoModel.events.setError());
          }
        },
      },
      on: {
        setNumPwns: {
          actions: [reset, assignNumPwns],
          target: 'success',
        },
        setError: {
          actions: [reset, assignError],
          target: 'failure',
        },
      },
    },
    success: {},
    failure: {},
  },
});
