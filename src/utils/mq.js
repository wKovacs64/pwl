// Adapted from https://emotion.sh/docs/media-queries
import { css } from '@emotion/core';

const breakpoints = {
  // mobile-first, so there is no 'xs' for portrait phones
  sm: 576, // landscape phones
  md: 768, // tablets
  lg: 992, // landscape tablets and desktops
  xl: 1200, // extra large desktops
};

const mq = Object.keys(breakpoints).reduce((accumulator, label) => {
  const prefix = typeof breakpoints[label] === 'string' ? '' : 'min-width:';
  const suffix = typeof breakpoints[label] === 'string' ? '' : 'px';
  accumulator[label] = cssStyles =>
    css`
      @media (${prefix + breakpoints[label] + suffix}) {
        ${cssStyles};
      }
    `;
  return accumulator;
}, {});

export default mq;
