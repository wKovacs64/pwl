import * as React from 'react';
import styled from '@emotion/styled';
import { useMachine } from '@xstate/react';
import { pwnedInfoMachine } from '../machines/pwned-info.machine';
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

function PwnedInfo({
  /* delayLoadingMs, */ password,
  ...props
}: PwnedInfoProps): JSX.Element {
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
}

// PwnedInfo.defaultProps = {
//   delayLoadingMs: 750,
// };

interface PwnedInfoProps {
  // delayLoadingMs: number;
  password: string;
}

export default PwnedInfo;
