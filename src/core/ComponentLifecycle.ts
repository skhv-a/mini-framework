import { ILifecycle } from "@src/models/ComponentLifecycle";
import { Component } from "./Component";
import { Dom } from "./Dom";
import { DomListeners } from "./DomListeners";
import { createRootFromTemplate } from "./utils/createRootFromTemplate";
import { normalizeTemplate } from "./utils/normalizeTemplate";
import { replaceComponentsToHtmlMarkers } from "./utils/replaceComponentsToHtmlMarkers";

export class ComponentLifecycle implements ILifecycle {
  private _$root: Element | null = null;
  private _$parent: Element | null = null;
  private isMounted = false;
  private dom = new Dom();
  private domListeners: DomListeners;

  constructor(protected readonly component: Component) {
    this.setUpComponentRoot();
    this.domListeners = new DomListeners(component);
  }

  get $root(): Element {
    if (!this._$root) {
      throw Error(`${this.component.name} $root is ${this._$root}`);
    }

    return this._$root;
  }

  get $parent(): Element {
    if (!this._$parent) {
      throw Error(`${this.component.name} $parent is ${this._$parent}`);
    }

    return this._$parent;
  }

  private setUpComponentRoot(): void {
    const template = normalizeTemplate(this.component.render());
    const templateWithMarkers = replaceComponentsToHtmlMarkers(template);

    this.component.template = template;
    this._$root = createRootFromTemplate(templateWithMarkers || "<div></div>");
  }

  init(): ILifecycle {
    this.setUpComponentRoot();
    this.domListeners.addDOMListeners();

    return this;
  }

  mountTo(container: Element | Component): ILifecycle {
    this._$parent = container instanceof Element ? container : container.$root;

    this.dom.mount(this.component, container);

    if (!this.isMounted) {
      this.component.componentDidMount();
      this.isMounted = true;
    }

    return this;
  }

  rerender(): ILifecycle {
    const $snapshot = this.$root;

    this.init().mountTo(this.$parent);
    this.dom.replace($snapshot, this.component);

    return this;
  }

  unmount(): ILifecycle {
    this.component.componentDidUnmount();
    this.domListeners.removeDOMListeners();
    this.dom.unmount(this.component, this.$parent);

    return this;
  }
}
