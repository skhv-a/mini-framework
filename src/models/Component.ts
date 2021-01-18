export interface IComponent {
  name: string;
  template: string;
  components: ComponentClass[];
}

export type ComponentClass = {
  new (): IComponent;
};

export type ComponentOptions = Pick<IComponent, "name" | "template"> & {
  components?: ComponentClass[];
};
