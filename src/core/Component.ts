import {
  ComponentClass,
  ComponentOptions,
  IComponent,
} from "@src/models/Component";
import { ComponentComposite } from "./ComponentComposite";
import { isStateChanged } from "./utils/isStateChanged";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Obj = Record<string, any>;

export abstract class Component<Props = Obj, State = Obj>
  implements IComponent
{
  name: string;
  props: Props;
  state: State;
  template = "";
  events: string[];
  components: Record<string, ComponentClass>;
  composite: ComponentComposite;

  constructor({
    name,
    props = {},
    components = {},
    events = [],
    state = {},
  }: ComponentOptions) {
    this.name = name;
    this.props = props;
    this.events = events;
    this.components = components;
    this.state = state as State;

    this.composite = new ComponentComposite(this);
  }

  get $root(): Element {
    return this.composite.$root;
  }

  get $parent(): Element {
    return this.composite.$parent;
  }

  init(): Component {
    this.composite.init();
    return this;
  }

  mountTo(container: Element | Component): Component {
    this.composite.mountTo(container);
    return this;
  }

  rerender(): Component {
    this.composite.rerender();
    return this;
  }

  setState(newState: Partial<State>): void {
    if (isStateChanged(this.state, { ...this.state, ...newState })) {
      this.state = { ...this.state, ...newState };
      this.rerender();
    }
  }

  unmount(): Component {
    this.composite.unmount();
    return this;
  }

  componentDidMount(): void {
    // do nothing
  }

  componentDidUnmount(): void {
    // do nothing
  }

  abstract render(): string;
}
