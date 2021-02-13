/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDomListeners } from "../models/DomListeners";

export abstract class DomListeners implements IDomListeners {
  events: string[];
  abstract getRoot(): Element;
  abstract name: string;

  constructor(events: string[]) {
    this.events = events;
  }

  initDOMListeners(): void {
    const $root = this.getRoot();

    this.events.forEach((event) => {
      if (!(this as any)[event]) {
        throw new Error(
          `Method "${event}" does not implemented in "${this.name}" component`
        );
      }

      (this as any)[event] = (this as any)[event].bind(this);

      $root.addEventListener(event, (this as any)[event]);
    });
  }
}
