// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    reset: 'SET_NUM_PWNS' | 'SET_ERROR' | 'GET_PWNED_INFO';
    assignNumPwns: 'SET_NUM_PWNS';
    assignError: 'SET_ERROR';
  };
  internalEvents: {
    'xstate.init': { type: 'xstate.init' };
    'done.invoke.pwnedPassword': {
      type: 'done.invoke.pwnedPassword';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.pwnedPassword': {
      type: 'error.platform.pwnedPassword';
      data: unknown;
    };
  };
  invokeSrcNameMap: {
    getNumPwns: 'done.invoke.pwnedPassword';
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    getNumPwns: 'GET_PWNED_INFO';
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: 'idle' | 'gettingNumPwns' | 'success' | 'failure';
  tags: never;
}
