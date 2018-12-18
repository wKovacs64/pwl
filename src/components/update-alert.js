import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import mq from '../utils/mq';

const AlertButton = styled.button`
  cursor: pointer;
  text-transform: uppercase;
  color: currentColor;
  background-color: transparent;
  border: none;
  padding: 0.5rem;
`;

const AlertButtonLabel = styled.span`
  border-bottom: thin solid;
`;

function UpdateAlert({ onReload, onDismiss }) {
  return (
    <div
      aria-live="polite"
      role="alert"
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100vw;
        padding: 0.5rem;
        border-color: #1c304a;
        border-style: solid;
        border-width: 0;
        box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.2);
        color: #b3efff;
        background-color: #1c304a;
        transition: color 0.3s ease, background-color 0.3s ease;
        &:hover,
        &:focus-within {
          color: #1c304a;
          background-color: #b3efff;
        }
        ${mq.md} {
          position: fixed;
          z-index: 9999;
          width: auto;
          border-width: 0 1px 1px;
        }
      `}
    >
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
    </div>
  );
}

UpdateAlert.propTypes = {
  onReload: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default UpdateAlert;
