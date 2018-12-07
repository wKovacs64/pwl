const breakpoints = {
  // mobile-first, so there is no 'xs' for portrait phones
  sm: 576, // landscape phones
  md: 768, // tablets
  lg: 992, // landscape tablets and desktops
  xl: 1200, // extra large desktops
};

const mq = Object.entries(breakpoints).reduce((accumulator, [label, bp]) => {
  accumulator[label] = `@media (min-width: ${bp}px)`;
  return accumulator;
}, {});

export default mq;
