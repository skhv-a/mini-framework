import { Component } from "@core/Component";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IComponent {
  name: string;
  props: any;
  $root: Element;
  template: string;
  state: Record<string, any>;
  init($parent: Element): Component<any>;
  componentDidMount(): void;
  render(): string;
}

export type ComponentClass = {
  new (props: any): Component<any>;
};

export type ComponentOptions = {
  name: string;
  components?: { [name: string]: ComponentClass };
  props?: any;
  events?: string[];
};

export type PropValue =
  | string
  | number
  | null
  | boolean
  | undefined
  | Record<string, unknown>
  // eslint-disable-next-line @typescript-eslint/ban-types
  | Function
  | PropValue[];

export type Props = {
  [propName: string]: PropValue;
};

export type ParsedComponent = { name: string; props: Props };
