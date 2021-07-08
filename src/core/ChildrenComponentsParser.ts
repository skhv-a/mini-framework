import { Component } from "./Component";
import { IChildrenComponentsParser } from "@src/models/ChildrenComponentsParser";
import { ParsedComponent } from "@src/models/Component";
import { parseChildrenComponents } from "./utils/componentsParser";

export class ChildrenComponentsParser implements IChildrenComponentsParser {
  private cachedComponents: Record<string, Component> = {};
  private parsedComponents: ParsedComponent[] = [];

  constructor(private component: Component) {}

  private parse(): ChildrenComponentsParser {
    this.parsedComponents = parseChildrenComponents(this.component);
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

  private getCachedComponent(parsedComponent: ParsedComponent): Component {
    const { key, props } = parsedComponent;
    let component = this.cachedComponents[key];

    if (!component) {
      component = this.createComponent(parsedComponent);
      this.cachedComponents[key] = component;
    }

    component.props = props; // to update dynamic props

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
