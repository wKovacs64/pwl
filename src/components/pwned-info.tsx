import React, { useReducer, useEffect } from 'react';
import styled from '@emotion/styled';
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

enum ActionType {
  PWNED_REQUEST,
  PWNED_SUCCESS,
  PWNED_FAILURE,
}

interface Request {
  type: ActionType.PWNED_REQUEST;
}

interface Success {
  type: ActionType.PWNED_SUCCESS;
  payload: number;
}

interface Failure {
  type: ActionType.PWNED_FAILURE;
}

type Action = Request | Success | Failure;

interface State {
  loading: boolean;
  numPwns: number;
  error: boolean;
}

const initialState: State = {
  loading: false,
  numPwns: -1,
  error: false,
};

interface PwnedInfoProps {
  // delayLoadingMs: number;
  password: string;
}

const PwnedInfo: React.FunctionComponent<PwnedInfoProps> = ({
  /* delayLoadingMs, */ password,
  ...props
}) => {
  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case ActionType.PWNED_REQUEST:
        return {
          ...initialState,
          loading: true,
        };
      case ActionType.PWNED_SUCCESS:
        return {
          ...initialState,
          loading: false,
          numPwns: action.payload,
        };
      case ActionType.PWNED_FAILURE:
        return {
          ...initialState,
          loading: false,
          error: true,
        };
      default:
        return state;
    }
  };

  const [{ loading, numPwns, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const fetchPwnedInfo = React.useCallback(async () => {
    dispatch({ type: ActionType.PWNED_REQUEST });
    try {
      dispatch({
        type: ActionType.PWNED_SUCCESS,
        payload: await pwnedPassword(password),
      });
    } catch (err) {
      dispatch({ type: ActionType.PWNED_FAILURE });
    }
  }, [password]);

  useEffect(() => {
    fetchPwnedInfo();
  }, [fetchPwnedInfo]);

  return (
    <section data-testid="pwned-info" {...props}>
      <p>Public Exposure:</p>
      {error ? (
        <p>
          <em>Public exposure information is currently unavailable.</em>
        </p>
      ) : loading ? (
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
