import { AppOptions, IApp } from "../models/App";

export class App implements IApp {
  $root: Element;
  options: AppOptions;

  constructor(rootSelector: string, options: AppOptions) {
    this.$root = document.querySelector(rootSelector) as Element;
    this.options = options;

    if (!this.$root) {
      throw new Error(`"${rootSelector}" element not found`);
    }
  }

  mount(): void {
    this.options.components.forEach((Component) => {
      const component = new Component();
      component.init();

      this.$root.append(component.getRoot());
    });
  }

  unmount(): void {
    console.log("unmounting");
  }
}
