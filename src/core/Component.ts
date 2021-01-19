import { ComponentOptions, IComponent } from "../models/Component";

export class Component<props> implements IComponent {
  name: string;
  props: props;
  children?: string;

  constructor({ name, props = {}, children: ChildrenComponent }: ComponentOptions) {
    this.name = name;
    this.props = props;
    this.children = ChildrenComponent && new ChildrenComponent().render();
  }

  render(): string {
    return "";
  }
}
