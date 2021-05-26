import { IChildrenComponents } from "@src/models/ChildrenComponents";
import { ComponentOptions, IComponent } from "@src/models/Component";
import { IDomListeners } from "@src/models/DomListeners";
import { ChildrenComponents } from "./ChildrenComponents";
import { DomListeners } from "./DomListeners";
import { createRootFromTemplate } from "./utils/createRootFromTemplate";
import { isStateChanged } from "./utils/isStateChanged";
import { normalizeTemplate } from "./utils/normalizeTemplate";
import { replaceComponentsToHtmlMarkers } from "./utils/replaceComponentsToHtmlMarkers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Obj = Record<string, any>;

export abstract class Component<Props = Obj, State = Obj>
  implements IComponent
{
  private _$root: Element | null;
  private _$parent: Element | null;
  private domListeners: IDomListeners;
  private childrenComponents: IChildrenComponents;

  name: string;
  props: Props;
  state: State;
  template: string;

  constructor({
    name,
    props = {},
    components = {},
    events = [],
  }: ComponentOptions) {
    this._$root = null;
    this._$parent = null;

    this.name = name;
    this.props = props;
    this.template = "";
    this.state = {} as State;

    this.domListeners = new DomListeners(this, events);
    this.childrenComponents = new ChildrenComponents<Props>(this, components);
  }

  get $root(): Element {
    if (!this._$root) {
      throw Error(`${this.name} $root is ${this._$root}`);
    }

    return this._$root;
  }

  get $parent(): Element {
    if (!this._$parent) {
      throw Error(`${this.name} $parent is ${this._$parent}`);
    }

    return this._$parent;
  }

  private rerender(): void {
    const $snapshot = this.$root;

    this.init(this.$parent);
    this.$parent.replaceChild(this.$root, $snapshot);
  }

  setState(newState: State): void {
    if (isStateChanged(this.state, newState)) {
      this.state = { ...this.state, ...newState };
      this.rerender();
    }
  }

  init($parent: Element): Component<Props> {
    this._$parent = $parent;

    const template = normalizeTemplate(this.render());
    const templateWithMarkers = replaceComponentsToHtmlMarkers(template);

    this.template = template;
    this._$root = createRootFromTemplate(templateWithMarkers);
    this.domListeners.initDOMListeners();
    this.childrenComponents.parse().init().mount();

    this.componentDidMount();

    return this;
  }

  componentDidMount(): void {
    // do nothing
  }

  abstract render(): string;
}
