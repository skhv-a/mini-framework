import { Component } from "../core/Component";
import { DomListeners } from "../core/DomListeners";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IComponent extends DomListeners {
  name: string;
  props: any;
  components: { [name: string]: ComponentClass };
  $root: Element | null;
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
