import { ChildrenComponentsParser } from "@src/core/ChildrenComponentsParser";
import { Component } from "@src/core/Component";

class StaticChild extends Component {
  constructor() {
    super({ name: "StaticChild" });
  }

  render() {
    return /* html */ `
        <div>
            StaticChild 
        </div>
      `;
  }
}

class DynamicChild extends Component {
  constructor() {
    super({ name: "DynamicChild" });
  }

  render() {
    return /* html */ `
        <div>
            DynamicChild 
        </div>
        `;
  }
}

type State = { isDynamicChild: boolean; isRandomComponent: boolean };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class Parent extends Component<any, State> {
  constructor() {
    super({
      name: "Parent",
      components: { StaticChild, DynamicChild },
      state: { isDynamicChild: true, isRandomComponent: false } as State,
    });
  }

  unmountDynamicComponent = () => {
    this.setState({ isDynamicChild: false });
  };

  render() {
    return /* html */ `
        <div>
            <StaticChild/>
            ${this.state.isDynamicChild ? "<DynamicChild />" : ""}
        </div>
    `;
  }
}

class ParentWithNonexistingChild extends Component {
  constructor() {
    super({ name: "Parent" });
  }

  render() {
    return /* html */ `<div><RandomChild/></div>`;
  }
}

const PARENT = new Parent();
const STATIC_CHILD = new StaticChild();
const DYNAMIC_CHILD = new DynamicChild();
const PARENT_WITH_NON_EXISTING_CHILD = new ParentWithNonexistingChild();

describe("ChildrenComponentsParser", () => {
  let childrenParser: ChildrenComponentsParser;
  
  const setUpChildrenParser = (parent: Component): void => {
    childrenParser = new ChildrenComponentsParser(parent);
  };

  describe("methods", () => {
    beforeAll(() => {
      PARENT.init().mountTo(document.createElement("div"));
      setUpChildrenParser(PARENT);
    });

    it("getExstingComponents", () => {
      expect(childrenParser.getExstingComponents()).toEqual([
        STATIC_CHILD,
        DYNAMIC_CHILD,
      ]);
    });

    it("getNonExstingComponents", () => {
      PARENT.unmountDynamicComponent();
      expect(childrenParser.getNonExstingComponents()).toEqual([DYNAMIC_CHILD]);
    });
  });

  describe("errors", () => {
    beforeAll(() => {
      setUpChildrenParser(PARENT_WITH_NON_EXISTING_CHILD);
    });

    it("Component not found in 'components'", () => {
      expect(() => childrenParser.getExstingComponents()).toThrow(
        'RandomChild not found in Parent "components"'
      );
    });
  });
});
