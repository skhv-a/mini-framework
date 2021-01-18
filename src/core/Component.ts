import {
  ComponentClass,
  ComponentOptions,
  IComponent,
} from "../models/Component";

export class Component implements IComponent {
  name: string;
  template: string;
  components: ComponentClass[];

  constructor({ name, template, components = [] }: ComponentOptions) {
    this.name = name;
    this.template = template;
    this.components = components;
  }
}
