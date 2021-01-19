/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IComponent {
  name: string;
  children?: string;
  props: any;
  render(): string;
}

export type ComponentClass = {
  new (): IComponent;
};

export type ComponentOptions = {
  name: string;
  children?: ComponentClass;
  props?: any;
};
