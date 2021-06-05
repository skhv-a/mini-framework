export const isStateChanged = <State>(
  prevState: State,
  newState: State
): boolean => JSON.stringify(prevState) !== JSON.stringify(newState);
