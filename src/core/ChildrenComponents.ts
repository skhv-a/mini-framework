import { IChildrenComponents } from "@src/models/ChildrenComponents";
import {
  ComponentClass,
  ParsedComponent,
  ParsedComponentWithKey,
} from "@src/models/Component";
import { Component } from "./Component";
import { parseChildrenComponents } from "./utils/componentsParser";
import { getParsedComponentsWithKeys } from "./utils/getParsedComponentsWithKeys";

type Components = Record<string, ComponentClass>;
export class ChildrenComponents<props> implements IChildrenComponents {
  private parent: Component<props>;
  private components: Components;
  private parsedComponentsWithKeys: ParsedComponentWithKey[];
  private initiatedComponents: Record<string, Component<unknown>>;

  constructor(parent: Component<props>, components: Components) {
    this.parent = parent;
    this.components = components;
    this.initiatedComponents = {};
    this.parsedComponentsWithKeys = [];
  }

  parse(): ChildrenComponents<props> {
    const parsedComps = parseChildrenComponents(this.parent);
    const parsedCompsWithKeys = getParsedComponentsWithKeys(parsedComps);

    this.parsedComponentsWithKeys = parsedCompsWithKeys;

    return this;
  }

  init(): ChildrenComponents<props> {
    this.parsedComponentsWithKeys.forEach((parsedComponent) => {
      const { key } = parsedComponent;
      let component = this.initiatedComponents[key];

      if (component) {
        component.init(this.parent.$root);
      } else {
        component = this.createComponent(parsedComponent);
        this.initiatedComponents[key] = component.init(this.parent.$root);
      }
    });

    return this;
  }

  mount(): ChildrenComponents<props> {
    this.unmountAndDeleteNonExistentComponents();
  
    Object.values(this.initiatedComponents).forEach((component) => {
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

  unmount(): ChildrenComponents<props> {
    Object.values(this.initiatedComponents).forEach((c) => c.unmount());
    return this;
  }

  private createComponent(parsedComp: ParsedComponent): Component<unknown> {
    const { name, props } = parsedComp;

    const ComponentConstructor = this.components[name];
    if (!ComponentConstructor)
      throw Error(`${name} not found in ${this.parent.name} "components"`);

    return new ComponentConstructor(props);
  }

  private unmountAndDeleteNonExistentComponents(): void {
    const componentsKeys = Object.keys(this.initiatedComponents);
    const existingComponentsKeys = this.parsedComponentsWithKeys.map(
      (c) => c.key
    );
    const nonExistingComponentsKeys = componentsKeys.filter(
      (componentKey) => !existingComponentsKeys.includes(componentKey)
    );

    nonExistingComponentsKeys.forEach((key) => {
      this.initiatedComponents[key].unmount();
      delete this.initiatedComponents[key];
    });
  }
}
