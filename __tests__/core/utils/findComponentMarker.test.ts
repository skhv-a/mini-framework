import { Component } from "@src/core/Component";
import { findComponentMarker } from "@src/core/utils/findComponentMarker";

class Parent extends Component {
  constructor() {
    super({ name: "parent" });
  }

  render() {
    return /* html */ `
      <div>
        <div></div>
        <div data-component="Child"></div>
        <span></span>
      </div>`;
  }
}

const PARENT = new Parent().init();

describe("findComponentMarker", () => {
  it("Component marker exists", () => {
    expect(findComponentMarker("Child", PARENT).outerHTML).toBe(
      '<div data-component="Child"></div>'
    );
  });

  it("Component marker does not exist", () => {
    expect(() => findComponentMarker("NonExistingChild", PARENT)).toThrow(
      "NonExistingChild component marker not found"
    );
  });
});
