import React from 'react';
import { unstable_createResource as createResource } from 'react-cache';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { pwnedPassword } from 'hibp';

const CleanExclamation = styled.span`
  color: ${({ theme }) => theme.colors.cleanExclamation};
`;

const PwnedExclamation = styled.span`
  color: ${({ theme }) => theme.colors.pwnedExclamation};
`;

const pwnedPasswordInfo = createResource(pwnedPassword);

function PwnedInfoSuspender({ password }) {
  const numPwns = pwnedPasswordInfo.read(password);

  return numPwns > 0 ? (
    <p>
      <PwnedExclamation>Uh-oh!</PwnedExclamation> This password has been
      publicly exposed in <span>{Number(numPwns).toLocaleString()}</span> data
      breach
      {numPwns > 1 && 'es'}. It should NOT be used.
    </p>
  ) : (
    <p>
      <CleanExclamation>Congratulations!</CleanExclamation> This password has
      not been publicly exposed in any data breaches.
    </p>
  );
}

PwnedInfoSuspender.propTypes = {
  password: PropTypes.string.isRequired,
};

export default PwnedInfoSuspender;
