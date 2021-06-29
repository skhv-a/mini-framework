import { Component } from "../Component";

export const findComponentMarker = (
  componentName: string,
  container: Component
): Element => {
  const componentMarker = container.$root.querySelector(
    `[data-component="${componentName}"]`
  );

  if (!componentMarker)
    throw Error(`${componentName} component marker not found`);

  return componentMarker;
};
