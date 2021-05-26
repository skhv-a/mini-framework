import { IChildrenComponents } from "@src/models/ChildrenComponents";
import { ComponentOptions, IComponent } from "@src/models/Component";
import { IDomListeners } from "@src/models/DomListeners";
import { ChildrenComponents } from "./ChildrenComponents";
import { DomListeners } from "./DomListeners";
import { createRootFromTemplate } from "./utils/createRootFromTemplate";
import { normalizeTemplate } from "./utils/normalizeTemplate";
import { replaceComponentsToHtmlMarkers } from "./utils/replaceComponentsToHtmlMarkers";

export abstract class Component<props> implements IComponent {
  private _$root: Element | null;
  private domListeners: IDomListeners;
  private childrenComponents: IChildrenComponents;

  name: string;
  props: props;
  template: string;
  $parent: Element | null;

  constructor({
    name,
    props = {},
    components = {},
    events = [],
  }: ComponentOptions) {
    this.name = name;
    this.props = props;
    this.template = "";
    this._$root = null;
    this.$parent = null;

    this.domListeners = new DomListeners(this, events);
    this.childrenComponents = new ChildrenComponents<props>(this, components);
  }

  get $root(): Element {
    if (!this._$root) {
      throw Error(`${this.name} $root is ${this._$root}`);
    }

    return this._$root;
  }

  init(): Component<props> {
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
    return;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
  }

  abstract render(): string;
}
