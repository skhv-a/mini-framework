import { Component } from "@src/core/Component";

export interface ILifecycle {
  $root: Element;
  $parent: Element;
  init: () => ILifecycle;
  mountTo: (container: Component | Element) => ILifecycle;
  rerender: () => ILifecycle;
  unmount: () => ILifecycle;
}
