import { ComponentClass } from "@src/models/Component";
import { IApp } from "../models/App";
import { Component } from "./Component";

export class App implements IApp {
  $rootNode: Element;
  rootComponent: Component;

  constructor(rootSelector: string, Component: ComponentClass) {
    this.$rootNode = document.querySelector(rootSelector) as Element;
    this.rootComponent = new Component({});

    if (!this.$rootNode) {
      throw new Error(`"${rootSelector}" element not found`);
    }
  }

  mount(): void {
    this.rootComponent.init(this.$rootNode);
    this.$rootNode.append(this.rootComponent.$root);
  }

  unmount(): void {
    this.rootComponent.unmount();
  }
}
