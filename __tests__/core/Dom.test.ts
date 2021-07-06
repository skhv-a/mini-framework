import { Component } from "@src/core/Component";
import { Dom } from "@src/core/Dom";

class Child extends Component {
  constructor() {
    super({ name: "Child" });
  }

  render() {
    return /* html */ `<div>Child</div>`;
  }
}

class Parent extends Component {
  constructor() {
    super({ name: "Parent", components: { Child } });
  }

  render() {
    return /* html */ `
      <div>
        <div>some div</div>
        <Child/>
        <span>some span</span>
      </div>
    `;
  }
}

class RandomComponent extends Component {
  constructor() {
    super({ name: "Random" });
  }

  render() {
    return /* html */ `<div>random component</div>`;
  }
}

describe("Dom", () => {
  const dom = new Dom();

  let CHILD: Child;
  let PARENT: Parent;
  let ELEMENT: Element;
  let RANDOM_COMPONENT: RandomComponent;

  const getParentOuterHtml = () => PARENT.$root.outerHTML;
  const getElementOuterHtml = () => ELEMENT.outerHTML;

  const mountChildToParent = () => dom.mount(CHILD, PARENT);
  const mountChildToElement = () => dom.mount(CHILD, ELEMENT);

  beforeEach(() => {
    CHILD = new Child();
    PARENT = new Parent();
    RANDOM_COMPONENT = new RandomComponent();
    ELEMENT = document.createElement("div");
    ELEMENT.textContent = "some text";
  });

  describe("mount", () => {
    it("component", () => {
      mountChildToParent();
      expect(getParentOuterHtml()).toBe(
        "<div><div>some div</div><div>Child</div><span>some span</span></div>"
      );
    });
    it("element", () => {
      mountChildToElement();
      expect(getElementOuterHtml()).toBe(
        "<div>some text<div>Child</div></div>"
      );
    });
  });

  describe("unmount", () => {
    it("component", () => {
      mountChildToParent();
      dom.unmount(CHILD, PARENT);
      expect(getParentOuterHtml()).toBe(
        "<div><div>some div</div><span>some span</span></div>"
      );
    });

    it("element", () => {
      mountChildToElement();
      dom.unmount(CHILD, ELEMENT);
      expect(getElementOuterHtml()).toBe("<div>some text</div>");
    });
  });

  describe("replace", () => {
    it("replacing element with parent", () => {
      mountChildToElement();
      dom.replace(CHILD.$root, RANDOM_COMPONENT);

      expect(getElementOuterHtml()).toBe(
        "<div>some text<div>random component</div></div>"
      );
    });

    it("replacing element without parent", () => {
      mountChildToElement();
      const $element = document.createElement("div");

      expect(() => dom.replace($element, RANDOM_COMPONENT)).toThrow(
        "$element does not have parent"
      );
    });
  });
});
