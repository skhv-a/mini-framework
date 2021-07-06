import { Container, IDom } from "@src/models/Dom";
import { Component } from "./Component";
import { findComponentMarker } from "./utils/findComponentMarker";

export class Dom implements IDom {
  private getContainerRoot(container: Container): Element {
    return container instanceof Component ? container.$root : container;
  }

  mount(child: Component, container: Container): void {
    const $container = this.getContainerRoot(container);

    if (container instanceof Component) {
      const componentMarker = findComponentMarker(child.name, container);
      return this.replace(componentMarker, child);
    }

    $container.append(child.$root);
  }

  unmount(child: Component, container: Container): void {
    const $container = this.getContainerRoot(container);
    $container.removeChild(child.$root);
  }

  replace($element: Element, component: Component): void {
    const $parent = $element.parentElement;

    if (!$parent) throw Error("$element does not have parent");

    $parent.replaceChild(component.$root, $element);
  }
}
