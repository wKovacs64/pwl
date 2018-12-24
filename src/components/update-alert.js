import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import mq from '../utils/mq';

const AlertContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  padding: 0.5rem;
  ${mq.md} {
    width: auto;
  }
`;

const AlertButton = styled.button`
  cursor: pointer;
  text-transform: uppercase;
  color: currentColor;
  background-color: transparent;
  border: none;
  padding: 0.5rem;
`;

const AlertButtonLabel = styled.span`
  border-bottom: 1px solid;
`;

function UpdateAlert({ onReload, onDismiss }) {
  return (
    <AlertContainer aria-live="polite" role="alert">
      <span
        css={css`
          padding: 0 0.5rem;
        `}
      >
        A new version is available!
      </span>
      <section>
        <AlertButton type="button" onClick={onReload}>
          <AlertButtonLabel>Reload</AlertButtonLabel>
        </AlertButton>
        <AlertButton type="button" onClick={onDismiss}>
          <AlertButtonLabel>Dismiss</AlertButtonLabel>
        </AlertButton>
      </section>
    </AlertContainer>
  );
}

UpdateAlert.propTypes = {
  onReload: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default UpdateAlert;
