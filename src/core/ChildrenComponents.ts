import { IChildrenComponents } from "@src/models/ChildrenComponents";
import { ParsedComponent } from "@src/models/Component";
import { Component } from "./Component";
import { parseChildrenComponents } from "./utils/componentsParser";

export class ChildrenComponents<props> implements IChildrenComponents {
  private parent: Component<unknown>;
  private parsedComponents: ParsedComponent[];
  private initiatedComponents: Component<unknown>[];

  constructor(parent: Component<props>) {
    this.parent = parent;
    this.parsedComponents = [];
    this.initiatedComponents = [];
  }

  parse(): ChildrenComponents<props> {
    this.parsedComponents = parseChildrenComponents(this.parent);
    return this;
  }

  init(): ChildrenComponents<props> {
    this.initiatedComponents = this.parsedComponents.map((parsedComponent) => {
      const { name, props } = parsedComponent;

      const ComponentConstructor = this.parent.components[name];
      if (!ComponentConstructor)
        throw Error(`${name} not found in ${this.parent.name} "components"`);

      return new ComponentConstructor(props).init();
    });

    return this;
  }

  mount(): ChildrenComponents<props> {
    this.initiatedComponents.forEach((component) => {
      const componentMarker = this.parent.$root.querySelector(
        `[data-component="${component.name}"]`
      );

      if (!componentMarker)
        throw Error(`${component.name} component marker not found`);

      this.parent.$root.insertBefore(component.$root, componentMarker);
      this.parent.$root.removeChild(componentMarker);
    });

    return this;
  }
}
