import { Component } from "./Component";
import { IChildrenComponentsParser } from "@src/models/ChildrenComponentsParser";
import { ParsedComponent, ParsedComponentWithKey } from "@src/models/Component";
import { parseChildrenComponents } from "./utils/componentsParser";
import { getParsedComponentsWithKeys } from "./utils/getParsedComponentsWithKeys";

export class ChildrenComponentsParser implements IChildrenComponentsParser {
  private cachedComponents: Record<string, Component> = {};
  private parsedComponents: ParsedComponentWithKey[] = [];

  constructor(private component: Component) {}

  private parse(): ChildrenComponentsParser {
    const parsedComps = parseChildrenComponents(this.component);
    this.parsedComponents = getParsedComponentsWithKeys(parsedComps);

    return this;
  }

  getExstingComponents(): Component[] {
    this.parse();
    return this.parsedComponents.map(this.getCachedComponent.bind(this));
  }

  getNonExstingComponents(): Component[] {
    this.parse();

    const componentsKeys = Object.keys(this.cachedComponents);
    const existingComponentsKeys = this.parsedComponents.map((c) => c.key);
    const nonExistingComponentsKeys = componentsKeys.filter(
      (key) => !existingComponentsKeys.includes(key)
    );

    return nonExistingComponentsKeys.map((key) => {
      const comp = this.cachedComponents[key];

      delete this.cachedComponents[key];

      return comp;
    });
  }

  private getCachedComponent(
    parsedComponent: ParsedComponentWithKey
  ): Component {
    const { key } = parsedComponent;
    let component = this.cachedComponents[key];

    if (!component) {
      component = this.createComponent(parsedComponent);
      this.cachedComponents[key] = component;
    }

    return component;
  }

  private createComponent(parsedComp: ParsedComponent): Component {
    const { name, props } = parsedComp;

    const ComponentConstructor = this.component.components[name];
    if (!ComponentConstructor)
      throw Error(`${name} not found in ${this.component.name} "components"`);

    return new ComponentConstructor(props);
  }
}
