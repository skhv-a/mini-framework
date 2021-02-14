import {
  ComponentOptions,
  IComponent,
  ComponentClass,
} from "../models/Component";
import { DomListeners } from "./DomListeners";
import { getTemplateComponentProps } from "./utils/templateComponent";

export abstract class Component<props>
  extends DomListeners
  implements IComponent {
  name: string;
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

  private getRootFromTemplate(template: string): Element {
    const openingTag = template.indexOf("<");
    const closingTag = template.indexOf(">");
    const tagWithAttrs = template.slice(openingTag + 1, closingTag);

    const [tag, ...attrs] = tagWithAttrs.split(" ");

    const $root = document.createElement(tag);

    attrs.forEach((attr) => {
      const [attrName, value] = attr.split("=");
      const valueWithoutQuotes = value.slice(1, -1);

      if ($root) {
        $root.setAttribute(attrName, valueWithoutQuotes);
      }
    });

    return $root;
  }

  private getInnerHtmlOfRootTemplate(template: string): string {
    const innerHTMLStart = template.indexOf(">");
    const innerHTMLEnd = template.lastIndexOf("<");

    return template.slice(innerHTMLStart + 1, innerHTMLEnd);
  }

  private initComponents(): void {
    if (!this.$root) {
      throw new Error("$root does not exist");
    }

    if (!Object.keys(this.components).length) {
      return;
    }

    this.$root
      .querySelectorAll("[data-component]")
      .forEach((templateComponent) => {
        const componentName =
          templateComponent.getAttribute("data-component") ?? "";

        const ComponentConstructor = this.components[componentName];
        if (!ComponentConstructor) {
          throw new Error(
            `${componentName} constructor was not found in 'components' object`
          );
        }

        const component = new ComponentConstructor(
          getTemplateComponentProps()
        ).init(this.$root);

        const templateComponentParent = templateComponent.parentElement;

        if (templateComponentParent && component.$root) {
          templateComponentParent.replaceChild(
            component.$root,
            templateComponent
          );
        } else {
          console.error(
            `Something went wrong :(
            templateComponentParent: ${templateComponentParent}; 
            $root: ${component.$root};`
          );
        }
      });
  }

  init($parent: Element): Component<props> {
    this.$parent = $parent;
    const $prevRoot = $parent.firstChild;
    const html = this.render();

    this.$root = this.getRootFromTemplate(html);
    this.$root.innerHTML = this.getInnerHtmlOfRootTemplate(html);
    if ($prevRoot && !this.$root.isEqualNode($prevRoot)) {
      this.$parent.replaceChild(this.$root, $prevRoot);
    }

    this.componentDidMount();
    super.initDOMListeners();
    this.initComponents();

    return this;
  }

  getRoot(): Element {
    if (!this.$root) {
      throw new Error('Run "init" method before "getRoot" method');
    }

    return this.$root;
  }

  componentDidMount(): void {
    return;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.init(this.$parent);
  }

  abstract render(): string;
}
