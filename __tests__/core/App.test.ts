import { App } from "@src/core/App";
import { Component } from "@src/core/Component";

class Container extends Component {
  constructor() {
    super({ name: "Container" });
  }

  render() {
    return /* html */ `<div>Container</div>`;
  }
}

describe("App", () => {
  const app = new App("body", Container);
  const body = document.querySelector("body") as Element;

  it("mount", () => {
    app.mount();
    expect(body.outerHTML).toBe("<body><div>Container</div></body>");
  });

  it("unmount", () => {
    app.unmount();
    expect(body.outerHTML).toBe("<body></body>");
  });

  it("root element not found", () => {
    expect(() => new App(".random-div", Container)).toThrow(
      '".random-div" element not found'
    );
  });
});
