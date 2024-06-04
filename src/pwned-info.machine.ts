/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { assign, fromPromise, setup } from 'xstate';
import { pwnedPassword } from 'hibp';

interface PwnedInfoContext {
  numPwns: number;
  hasFailed: boolean;
}

const initialContext: PwnedInfoContext = {
  numPwns: -1,
  hasFailed: false,
};

/** @xstate-layout N4IgpgJg5mDOIC5QAcDuA7SBJdAzA9gMQDiAogCoD6ACgOoBypAIpVvQGIDyA2gAwC6iFPlgBLAC6j86ISAAeiAEwBWADQgAnogCMAZmUA6XroBsy5aZMmA7GYAsAXwfq0mCDgIGY4yeij0AVwBbagxYQghpMANRdAA3fABraNdIagBDWFhUfAAnCD5BJBBkEQkpGWKFBGVrbQMADm0VZW07BpNeW211LQRteuVeYesGu142ztbdJxcMbDx8LzAfWP9g0PRwsFzcvINkABt08QJcoIP5iAysnPzC2VKxSWlZatrFA3a7O0UTds63V6OgAnPVxiZTCDeDYunYTE5nCB0PgIHBHlcPPhHmUXpVQNUALT-AyKBrQ0xNSEwlTAhCE6yGEHMkGKbTKEENCwguwg2YlTGLGIQQ5gHHPCpvRCE7QmUnk4wmKm6GlqTRKaxGUzKBp-EwgzqshoNfmpdxC7y+dYhMLi8qvKpKXQgr5so1kwG6OzWOmcgwWMyKXRtMENayKaymwWeWABADGcbg8GKT3t+PkiGsIM1YaGKl40LDdl0dLsTIsimM40mvFaUbcWIMuHSokOAVyYpTuMljoQWZzjN4+cL1mLdMUKkaHN5EOscJMikRDiAA */
export const pwnedInfoMachine = setup({
  types: {
    context: {} as PwnedInfoContext,
    events: {} as { type: 'GET_PWNED_INFO'; password: string },
    children: {} as {
      pwnCountFetcher: 'getNumPwns';
    },
  },
  actions: {
    assignNumPwns: assign({ numPwns: (_, numPwns: number) => numPwns }),
    assignError: assign({ hasFailed: () => true }),
    reset: assign(initialContext),
  },
  actors: {
    getNumPwns: fromPromise(({ input }: { input: { password: string } }) =>
      pwnedPassword(input.password),
    ),
  },
}).createMachine({
  context: initialContext,
  id: 'pwnedInfo',
  initial: 'idle',
  states: {
    idle: {},
    gettingNumPwns: {
      entry: 'reset',
      invoke: {
        id: 'pwnCountFetcher',
        src: 'getNumPwns',
        input: ({ event }) => ({ password: event.password }),
        onDone: {
          actions: ['reset', { type: 'assignNumPwns', params: ({ event }) => event.output }],
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
      target: '.gettingNumPwns',
    },
  },
});
