import {
  ComponentOptions,
  IComponent,
  ComponentClass,
  ParsedComponent,
} from "@src/models/Component";
import { DomListeners } from "./DomListeners";
import { parseChildrenComponents } from "./utils/componentsParser";
import { createRootFromTemplate } from "./utils/createRootFromTemplate";
import { normalizeTemplate } from "./utils/normalizeTemplate";
import { replaceComponentsToHtmlMarkers } from "./utils/replaceComponentsToHtmlMarkers";

export abstract class Component<props>
  extends DomListeners
  implements IComponent
{
  name: string;
  template: string;
  props: props;
  components: { [name: string]: ComponentClass };
  $parent: Element | null;
  private parsedComponents: ParsedComponent[];
  private _$root: Element | null;

  get $root(): Element {
    if (!this._$root) {
      throw Error(`${this.name} $root is ${this._$root}`);
    }

    return this._$root;
  }

  constructor({
    name,
    props = {},
    components = {},
    events = [],
  }: ComponentOptions) {
    super(events);

    this.name = name;
    this.props = props;
    this.components = components;
    this._$root = null;
    this.$parent = null;
    this.parsedComponents = [];
  }

  private initComponents(): void {
    this.parsedComponents.forEach((parsedComponent) => {
      const { name, props } = parsedComponent;

      const ComponentConstructor = this.components[name];
      if (!ComponentConstructor)
        throw Error(`${name} not found in ${this.name} "components"`);

      const component = new ComponentConstructor(props);
      const componentMarker = this.$root.querySelector(
        `[data-component="${name}"]`
      );

      this.replaceComponentMarker(component, componentMarker);
    });
  }

  private replaceComponentMarker(
    component: Component<unknown>,
    componentMarker: Element | null
  ): void {
    if (!componentMarker)
      throw Error(`${component.name} component marker not found`);

    component.init();

    this.$root.insertBefore(component.$root, componentMarker);
    this.$root.removeChild(componentMarker);
  }

  init(): Component<props> {
    const html = this.render();
    const htmlWithoutExtraSpaces = normalizeTemplate(html);

    this.template = htmlWithoutExtraSpaces;
    this.parsedComponents = parseChildrenComponents(this);
    this.template = replaceComponentsToHtmlMarkers(this.template);
    this._$root = createRootFromTemplate(this.template);

    this.initComponents();

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
