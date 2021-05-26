/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDomListeners } from "../models/DomListeners";
import { Component } from "./Component";

export class DomListeners implements IDomListeners {
  private events: string[];
  private $component: Component<any>;

  constructor($component: Component, events: string[]) {
    this.$component = $component;
    this.events = events;
  }

  initDOMListeners(): void {
    this.events.forEach((event) => {
      let eventHandler = this.$component[event as keyof Component];

      if (!eventHandler) {
        throw new Error(
          `Method "${event}" does not implemented in "${this.$component.name}" component`
        );
      }

      eventHandler = eventHandler.bind(this.$component);
      this.$component.$root.addEventListener(event, eventHandler);
    });
  }
}
