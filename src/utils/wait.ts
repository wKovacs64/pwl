export default (ms: number): Promise<undefined> =>
  new Promise((resolve) => setTimeout(resolve, ms));
