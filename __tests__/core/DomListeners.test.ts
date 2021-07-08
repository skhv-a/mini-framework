import { Component } from "@src/core/Component";
import { DomListeners } from "@src/core/DomListeners";

class Container extends Component {
  constructor() {
    super({ name: "Container", events: ["click"] });
  }

  click = () => {
    // do nothing
  };

  render() {
    return /* html */ `<div></div>`;
  }
}

const CONTAINER = new Container();

describe("DomListeners", () => {
  let domListeners: DomListeners;

  const setUp = () => {
    CONTAINER.click = jest.fn();
    domListeners = new DomListeners(CONTAINER);
  };

  const dispatchClick = () => {
    const event = new Event("click");
    CONTAINER.$root.dispatchEvent(event);
  };

  beforeEach(() => {
    setUp();
  });

  it("addDOMListeners", () => {
    domListeners.addDOMListeners();
    dispatchClick();

    expect(CONTAINER.click).toBeCalledTimes(1);
  });

  it("removeDOMListeners", () => {
    domListeners.addDOMListeners();
    domListeners.removeDOMListeners();
    dispatchClick();

    expect(CONTAINER.click).toBeCalledTimes(0);
  });

  it("Event without handler", () => {
    CONTAINER.events = ["input"];
    expect(() => domListeners.addDOMListeners()).toThrow(
      'Method "input" does not implemented in "Container" component'
    );
  });
});
