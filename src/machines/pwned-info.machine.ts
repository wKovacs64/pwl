import { createMachine, DoneInvokeEvent } from 'xstate';
import { createModel } from 'xstate/lib/model';
import { pwnedPassword } from 'hibp';

const pwnedInfoModel = createModel<PwnedInfoContext, PwnedInfoResultsEvent>({
  numPwns: -1,
  error: false,
});

const assignNumPwns = pwnedInfoModel.assign({
  numPwns: (context, event) =>
    typeof event.data === 'number' ? event.data : context.numPwns,
});
const assignError = pwnedInfoModel.assign({ error: true });
const reset = pwnedInfoModel.reset();

export const pwnedInfoMachine = createMachine<
  PwnedInfoContext,
  PwnedInfoRequestEvent,
  PwnedInfoState
>({
  id: 'pwnedInfo',
  initial: 'idle',
  context: pwnedInfoModel.initialContext,
  on: { REQUEST: 'loading' },
  states: {
    idle: {},
    loading: {
      entry: reset,
      invoke: {
        id: 'pwnedPassword',
        src: (_, event) => pwnedPassword(event.payload),
        onDone: {
          target: 'success',
          actions: [reset, assignNumPwns],
        },
        onError: {
          target: 'failure',
          actions: [reset, assignError],
        },
      },
    },
    success: {},
    failure: {},
  },
});

interface PwnedInfoContext {
  numPwns: number;
  error: boolean;
}

type PwnedInfoState =
  | { value: 'idle'; context: PwnedInfoContext }
  | { value: 'loading'; context: PwnedInfoContext }
  | { value: 'success'; context: PwnedInfoContext }
  | { value: 'failure'; context: PwnedInfoContext };

// external/incoming events
interface PwnedInfoRequestEvent {
  type: 'REQUEST';
  payload: string;
}

// internal events (results from invoking the pwnedPassword promise)
type PwnedInfoPwnedPasswordSuccessEvent = DoneInvokeEvent<number>;
type PwnedInfoPwnedPasswordFailureEvent = DoneInvokeEvent<Error>;
type PwnedInfoResultsEvent =
  | PwnedInfoPwnedPasswordSuccessEvent
  | PwnedInfoPwnedPasswordFailureEvent;
