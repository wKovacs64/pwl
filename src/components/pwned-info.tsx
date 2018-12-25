/* eslint-disable no-nested-ternary */
import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { pwnedPassword } from 'hibp';
import debounce from 'lodash/debounce';

const CleanExclamation = styled.span`
  color: ${({ theme }) => theme.colors.cleanExclamation};
`;

const PwnedExclamation = styled.span`
  color: ${({ theme }) => theme.colors.pwnedExclamation};
`;

function PwnedInfo({ /* delayLoadingMs, */ password, ...props }) {
  const initialState = {
    loading: false,
    numPwns: -1,
    error: false,
  };

  function reducer(state, action) {
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
          numPwns: action.payload,
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
  }

  const [{ loading, numPwns, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  async function fetchPwnedInfo() {
    dispatch({ type: 'PWNED_REQUEST' });
    try {
      dispatch({
        type: 'PWNED_SUCCESS',
        payload: await pwnedPassword(password),
      });
    } catch (err) {
      dispatch({ type: 'PWNED_FAILURE' });
    }
  }

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
}

PwnedInfo.propTypes = {
  // delayLoadingMs: PropTypes.number,
  password: PropTypes.string.isRequired,
};

// PwnedInfo.defaultProps = {
//   delayLoadingMs: 750,
// };

export default PwnedInfo;
