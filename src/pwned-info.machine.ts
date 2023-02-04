/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { assign, createMachine } from 'xstate';
import { pwnedPassword } from 'hibp';

interface PwnedInfoContext {
  numPwns: number;
  hasFailed: boolean;
}

const initialContext: PwnedInfoContext = {
  numPwns: -1,
  hasFailed: false,
};

/** @xstate-layout N4IgpgJg5mDOIC5QAcDuA7SBJdAzA9gMQDiAogCoD6ACgOoBypAIpVvQGIDyA2gAwC6iFPlgBLAC6j86ISAAeiACwAmADQgAnogCMAZkUA6AKy6AbIoAciowE5lu7UYDsugL6v1aTBBwEDMcUl0KHoAVwBbagxYQghpMANRdAA3fABrBK9IagBDWFhUfAAnCD5BJBBkEQkpGQqFBCNTJwMLbWUjI21LU14nU211LQQ2415xpytebt6u908MbDx8fzBApJCIqPQYsCKi4oNkABsc8QIi8KPFiFz8wpKy2SqxSWlZBqaWto6unr6BkNEMpxgYbLxTA4jCDbIonE53B4QOh8BA4M8br58M9qm86qAGgBaUxAhCEoxgmxU6k06luJFZHzLRIQY5gHGvWofRCTAxObS8GyQ7QWMw2XROIyk7Q2Cm8MxGCzKUymIWC+kLbxY1brYJhSLRDk1d71YG6GwGFQy5RKiy9Fxw0k2CzGBX2bo2EVOZQIhmY5mwUIAYyDcHgFRexvx8h5vIskt4HUFvHjil00u0pktJhBHT0SvsNnmlX9flwOVEx1CRXZEdxXNNCHhLvjRkTbfBqfTmjNFIssJsighTj6ilMykRriAA */
export const pwnedInfoMachine = createMachine(
  {
    predictableActionArguments: true,
    context: initialContext,
    tsTypes: {} as import('./pwned-info.machine.typegen').Typegen0,
    schema: {
      context: {} as PwnedInfoContext,
      events: {} as { type: 'GET_PWNED_INFO'; password: string },
      services: {} as {
        getNumPwns: { data: number };
      },
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
          onDone: {
            actions: ['reset', 'assignNumPwns'],
            target: 'success',
          },
          onError: {
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
      assignNumPwns: assign({ numPwns: (_, event) => event.data }),
      assignError: assign({ hasFailed: (_) => true }),
      reset: assign(initialContext),
    },
    services: {
      getNumPwns: (_, event) => pwnedPassword(event.password),
    },
  },
);
