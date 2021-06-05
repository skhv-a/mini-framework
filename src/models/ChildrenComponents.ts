/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChildrenComponents } from "@src/core/ChildrenComponents";

export interface IChildrenComponents {
  parse(): ChildrenComponents<any>;
  init(): ChildrenComponents<any>;
  mount(): ChildrenComponents<any>;
  unmount(): ChildrenComponents<any>;
}
