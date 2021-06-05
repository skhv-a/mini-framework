import { IComponent } from "./Component";

export interface IApp {
  $rootNode: Element | null;
  rootComponent: IComponent;
  mount(): void;
  unmount(): void;
}
