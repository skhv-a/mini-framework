import {
  ComponentOptions,
  IComponent,
  ComponentClass,
} from "@src/models/Component";
import { ChildrenComponents } from "./ChildrenComponents";
import { DomListeners } from "./DomListeners";
import { createRootFromTemplate } from "./utils/createRootFromTemplate";
import { normalizeTemplate } from "./utils/normalizeTemplate";
import { replaceComponentsToHtmlMarkers } from "./utils/replaceComponentsToHtmlMarkers";

export abstract class Component<props>
  extends DomListeners
  implements IComponent
{
  name: string;
  props: props;
  template: string;
  components: { [name: string]: ComponentClass };
  $parent: Element | null;
  private _$root: Element | null;

  constructor({
    name,
    props = {},
    components = {},
    events = [],
  }: ComponentOptions) {
    super(events);

    this.name = name;
    this.props = props;
    this.template = "";
    this.components = components;
    this._$root = null;
    this.$parent = null;
  }

  get $root(): Element {
    if (!this._$root) {
      throw Error(`${this.name} $root is ${this._$root}`);
    }

    return this._$root;
  }

  init(): Component<props> {
    const childrenComponents = new ChildrenComponents<props>(this);

    const template = normalizeTemplate(this.render());
    const templateWithMarkers = replaceComponentsToHtmlMarkers(template);

    this.template = template;
    this._$root = createRootFromTemplate(templateWithMarkers);

    childrenComponents.parse().init().mount();

    super.initDOMListeners();

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
