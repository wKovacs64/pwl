interface BreakpointMap {
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

const breakpoints: BreakpointMap = {
  // mobile-first, so there is no 'xs' for portrait phones
  sm: 576, // landscape phones
  md: 768, // tablets
  lg: 992, // landscape tablets and desktops
  xl: 1200, // extra large desktops
};

type MediaQueries = { [Breakpoint in keyof BreakpointMap]: string };
type MediaQueriesAccumulator = { [Breakpoint in keyof BreakpointMap]?: string };

const mq: MediaQueries = Object.entries(breakpoints).reduce(
  (
    accumulator: MediaQueriesAccumulator,
    [label, bp]: [string, number],
  ): MediaQueriesAccumulator => {
    accumulator[label as keyof BreakpointMap] = `@media (min-width: ${bp}px)`;
    return accumulator;
  },
  {},
) as MediaQueries;

export default mq;
