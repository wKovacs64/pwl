import React from 'react';
import styled from '@emotion/styled';
import { Machine, assign, DoneInvokeEvent } from 'xstate';
import { useMachine } from '@xstate/react';
import { pwnedPassword } from 'hibp';
import { light, dark } from '../theme';

const CleanExclamation = styled.span`
  body.light-mode & {
    color: ${light.colors.cleanExclamation};
  }
  body.dark-mode & {
    color: ${dark.colors.cleanExclamation};
  }
`;

const PwnedExclamation = styled.span`
  body.light-mode & {
    color: ${light.colors.pwnedExclamation};
  }
  body.dark-mode & {
    color: ${dark.colors.pwnedExclamation};
  }
`;

interface PwnedInfoSchema {
  states: {
    idle: {};
    loading: {};
    success: {};
    failure: {};
  };
}

interface PwnedInfoRequestEvent {
  type: 'REQUEST';
  payload: string;
}

type PwnedInfoPwnedPasswordSuccessEvent = DoneInvokeEvent<number>;
type PwnedInfoPwnedPasswordFailureEvent = DoneInvokeEvent<Error>;
// incoming event types only (internal events will be added internally)
type PwnedInfoEvent = PwnedInfoRequestEvent;

interface PwnedInfoContext {
  numPwns: number;
  error: boolean;
}

const initialContext: PwnedInfoContext = {
  numPwns: -1,
  error: false,
};

const pwnedInfoMachine = Machine<
  PwnedInfoContext,
  PwnedInfoSchema,
  PwnedInfoEvent
>({
  id: 'Check Password Exposure',
  initial: 'idle',
  context: initialContext,
  states: {
    idle: {
      on: { REQUEST: 'loading' },
    },
    loading: {
      entry: assign<PwnedInfoContext>(initialContext),
      invoke: {
        id: 'pwnedPassword',
        src: (_, event) =>
          pwnedPassword((event as PwnedInfoRequestEvent).payload),
        onDone: {
          target: 'success',
          actions: assign<PwnedInfoContext, PwnedInfoPwnedPasswordSuccessEvent>(
            {
              ...initialContext,
              numPwns: (_, event) => event.data,
            },
          ),
        },
        onError: {
          target: 'failure',
          actions: assign<PwnedInfoContext, PwnedInfoPwnedPasswordFailureEvent>(
            {
              ...initialContext,
              error: true,
            },
          ),
        },
      },
      on: { REQUEST: 'loading' },
    },
    success: {
      on: { REQUEST: 'loading' },
    },
    failure: {
      on: { REQUEST: 'loading' },
    },
  },
});

interface PwnedInfoProps {
  // delayLoadingMs: number;
  password: string;
}

const PwnedInfo: React.FunctionComponent<PwnedInfoProps> = ({
  /* delayLoadingMs, */ password,
  ...props
}) => {
  const [current, send] = useMachine(pwnedInfoMachine);
  const { numPwns, error } = current.context;

  React.useEffect(() => {
    send({ type: 'REQUEST', payload: password });
  }, [send, password]);

  return (
    <section data-testid="pwned-info" {...props}>
      <p>Public Exposure:</p>
      {error ? (
        <p>
          <em>Public exposure information is currently unavailable.</em>
        </p>
      ) : current.matches('loading') ? (
        <p>Loading...</p>
      ) : numPwns > 0 ? (
        <p>
          <PwnedExclamation>Uh-oh!</PwnedExclamation> This password has been
          publicly exposed in <span>{Number(numPwns).toLocaleString()}</span>{' '}
          data breach
          {numPwns > 1 && 'es'}. It should NOT be used.
        </p>
      ) : (
        <p>
          <CleanExclamation>Congratulations!</CleanExclamation> This password
          has not been publicly exposed in any data breaches.
        </p>
      )}
    </section>
  );
};

// PwnedInfo.defaultProps = {
//   delayLoadingMs: 750,
// };

export default PwnedInfo;
