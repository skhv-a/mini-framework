/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDomListeners } from "../models/DomListeners";
import { Component } from "./Component";

type EventHandlers = Record<string, (e: Event) => void>;

export class DomListeners implements IDomListeners {
  private eventHandlers: EventHandlers = {};

  constructor(private component: Component<any>) {}

  addDOMListeners(): void {
    this.component.events.forEach((event) => {
      let handler = this.component[event as keyof Component];

      if (!handler) {
        throw new Error(
          `Method "${event}" does not implemented in "${this.component.name}" component`
        );
      }

      handler = handler.bind(this.component);

      this.eventHandlers[event] = handler;
      this.component.$root.addEventListener(event, handler);
    });
  }

  removeDOMListeners(): void {
    Object.keys(this.eventHandlers).forEach((event) => {
      const handler = this.eventHandlers[event];
      this.component.$root.removeEventListener(event, handler);
    });
  }
}
