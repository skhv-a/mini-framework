import { ComponentClass } from "./Component";

export interface AppOptions {
  components: ComponentClass[];
}

export interface IApp {
  $root: Element | null;
  options: AppOptions;
  mount(): void;
  unmount(): void;
}
