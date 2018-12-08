import React from 'react';
import { css } from '@emotion/core';
import mq from '../utils/mq';

function UpdateAlert() {
  return (
    <div
      aria-live="polite"
      role="alert"
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        z-index: 9999;
        border-color: #1c304a;
        border-style: solid;
        border-width: 0;
        box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.2);
        ${mq.md} {
          top: 1rem;
          left: auto;
          right: 1rem;
          width: auto;
          border-width: thin;
        }
      `}
    >
      <button
        type="button"
        onClick={e => {
          e.preventDefault();
          if (typeof window !== 'undefined') {
            window.location.reload(true);
          }
        }}
        css={css`
          color: #b3efff;
          background-color: #1c304a;
          border: none;
          padding: 1rem;
          width: 100%;
          transition: color 0.3s ease, background-color 0.3s ease;
          &:hover {
            cursor: pointer;
            color: #1c304a;
            background-color: #b3efff;
          }
        `}
      >
        A new version is available!
      </button>
    </div>
  );
}

export default UpdateAlert;
