import { Component } from "@src/core/Component";

export type Container = Component | Element;

export interface IDom {
  mount: (child: Component, container: Container) => void;
  unmount: (child: Component, container: Container) => void;
  replace: ($snapshot: Element, component: Component) => void;
}
