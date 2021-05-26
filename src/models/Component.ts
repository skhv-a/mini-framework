import { Component } from "@core/Component";
import { DomListeners } from "@core/DomListeners";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IComponent extends DomListeners {
  name: string;
  props: any;
  $root: Element | null;
  template: string;
  components: { [name: string]: ComponentClass };
  init(): Component<any>;
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
