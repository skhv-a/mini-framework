import {
  ComponentOptions,
  IComponent,
  ComponentClass,
} from "@src/models/Component";
import { DomListeners } from "./DomListeners";
import { parseChildrenComponents } from "./utils/componentsParser";
import { normalizeTemplate } from "./utils/normalizeTemplate";

export abstract class Component<props>
  extends DomListeners
  implements IComponent
{
  name: string;
  template: string;
  props: props;
  components: { [name: string]: ComponentClass };
  $root: Element | null;
  $parent: Element | null;

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
    this.$root = null;
    this.$parent = null;
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
    const parsedComponents = parseChildrenComponents(this);

    console.log(this.template);
  }

  init(): Component<props> {
    const html = this.render();
    const htmlWithoutExtraSpaces = normalizeTemplate(html);

    this.template = htmlWithoutExtraSpaces;
    this.$root = this.getRootFromTemplate();

    this.$root.innerHTML = this.getInnerHtmlOfRootTemplate();
    this.initComponents();

    super.initDOMListeners();

    // this.initComponents();
    // this.componentDidMount();

    return this;
  }

  getRoot(): Element {
    if (!this.$root) {
      // throw new Error('Run "init" method before "getRoot" method');
      return document.createElement("div");
    }

    return this.$root;
  }

  componentDidMount(): void {
    return;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    // this.init();
  }

  abstract render(): string;
}
