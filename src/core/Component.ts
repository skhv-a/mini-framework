import {
  ComponentOptions,
  IComponent,
  ComponentClass,
  ParsedComponent,
} from "@src/models/Component";
import { DomListeners } from "./DomListeners";
import { parseChildrenComponents } from "./utils/componentsParser";
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

  private getRootFromTemplate(): Element {
    const ROOT_TAG_REG_EXP = /(?<=<)\w+/i;
    const ROOT_ATTRS_REG_EXP = /(?<=\<\w+\s).*?(?=>)/g;

    const [rootTag] = this.template.match(ROOT_TAG_REG_EXP) ?? [""];

    if (!rootTag) {
      throw new Error("Cannot get root tag from template");
    }

    const $root = document.createElement(rootTag);

    const [unsplitedAttrs] = this.template.match(ROOT_ATTRS_REG_EXP) ?? [""];

    const attrs = unsplitedAttrs.split(" ");

    attrs.forEach((attrWithValue) => {
      if (!attrWithValue) return;

      const [attr, value] = attrWithValue.split("=");
      $root.setAttribute(attr, value);
    });

    return $root;
  }

  private getInnerHtmlOfRootTemplate(): string {
    const INNER_HTML_REG_EXP = /(?<=>).*(?=<\/\w+>)/g;
    const [innterHtml] = this.template.match(INNER_HTML_REG_EXP) ?? [""];

    return innterHtml;
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
    this._$root = this.getRootFromTemplate();
    this._$root.innerHTML = this.getInnerHtmlOfRootTemplate();

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
