import { ILifecycle } from "@src/models/ComponentLifecycle";
import { ChildrenComponentsParser } from "./ChildrenComponentsParser";
import { Component } from "./Component";
import { ComponentLifecycle } from "./ComponentLifecycle";

export class ComponentComposite
  extends ComponentLifecycle
  implements ILifecycle
{
  private componentsParser: ChildrenComponentsParser;

  constructor(component: Component) {
    super(component);
    this.componentsParser = new ChildrenComponentsParser(component);
  }

  private get existingComponents(): Component[] {
    return this.componentsParser.getExstingComponents();
  }

  private get nonExistingComponents(): Component[] {
    return this.componentsParser.getNonExstingComponents();
  }

  init(): ILifecycle {
    super.init();
    this.existingComponents.forEach((c) => c.init());

    return this;
  }

  mountTo(container: Element | Component): ILifecycle {
    this.nonExistingComponents.forEach((c) => c.unmount());

    super.mountTo(container);
    this.existingComponents.forEach((c) => c.mountTo(this.component));

    return this;
  }

  rerender(): ILifecycle {
    super.rerender();
    this.existingComponents.forEach((c) => c.rerender());

    return this;
  }

  unmount(): ILifecycle {
    super.unmount();
    this.existingComponents.forEach((c) => c.unmount());

    return this;
  }
}
