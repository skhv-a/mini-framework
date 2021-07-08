import { Component } from "@core/Component";
import { ILifecycle } from "./ComponentLifecycle";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IComponent extends ILifecycle {
  name: string;
  props: any;
  template: string;
  state: Record<string, any>;
  components: { [name: string]: ComponentClass };
  events: string[];
  componentDidMount(): void;
  componentDidUnmount(): void;
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
  state?: Record<string, any>;
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

export type ParsedComponent = { name: string; key: string; props: Props };
