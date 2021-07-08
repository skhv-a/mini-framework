import { Component } from "@src/core/Component";

export interface IComponentComposite {
  init: () => void;
  mountTo: (container: Component | Element) => void;
  rerender: () => void;
  unmount: () => void;
}
