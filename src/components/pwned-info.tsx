/* eslint-disable no-nested-ternary */
import React, { useReducer, useEffect } from 'react';
import { pwnedPassword } from 'hibp';
import debounce from 'lodash/debounce';
import styled from '../utils/styled';

const CleanExclamation = styled.span`
  color: ${({ theme }) => theme.colors.cleanExclamation};
`;

const PwnedExclamation = styled.span`
  color: ${({ theme }) => theme.colors.pwnedExclamation};
`;

const PwnedInfo: React.FunctionComponent<PwnedInfoProps> = ({
  /* delayLoadingMs, */ password,
  ...props
}) => {
  type PwnedInfoState = {
    loading: boolean;
    numPwns: number;
    error: boolean;
  };

  const initialState: PwnedInfoState = {
    loading: false,
    numPwns: -1,
    error: false,
  };

  const reducer = (
    state: PwnedInfoState,
    action: { type: string; payload?: number },
  ): PwnedInfoState => {
    switch (action.type) {
      case 'PWNED_REQUEST':
        return {
          ...initialState,
          loading: true,
        };
      case 'PWNED_SUCCESS':
        return {
          ...initialState,
          loading: false,
          numPwns: action.payload || initialState.numPwns,
        };
      case 'PWNED_FAILURE':
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

  const fetchPwnedInfo = async () => {
    dispatch({ type: 'PWNED_REQUEST' });
    try {
      dispatch({
        type: 'PWNED_SUCCESS',
        payload: await pwnedPassword(password),
      });
    } catch (err) {
      dispatch({ type: 'PWNED_FAILURE' });
    }
  };

  useEffect(
    () => {
      const debouncedFetchPwnedInfo = debounce(() => fetchPwnedInfo(), 250, {
        leading: true,
      });
      debouncedFetchPwnedInfo();
      return () => debouncedFetchPwnedInfo.cancel();
    },
    [dispatch, password],
  );

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

type PwnedInfoProps = {
  // delayLoadingMs: number;
  password: string;
};

// PwnedInfo.defaultProps = {
//   delayLoadingMs: 750,
// };

export default PwnedInfo;
