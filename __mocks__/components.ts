import { Component } from "@src/core/Component";
import { normalizeTemplate } from "@src/core/utils/normalizeTemplate";
import { ParsedComponent, ParsedComponentWithKey } from "@src/models/Component";

export class PROPS_PARSER_TEST_COMPONENT extends Component<undefined> {
  constructor() {
    super({
      name: "ComponentWithAllTypeOfProps",
    });

    this.template = normalizeTemplate(this.render());
  }

  clickHandler = (): void => {
    console.log("Click");
  };

  render(): string {
    return /* html */ `
        <ComponentForTest 
          :string="hello!"
          :number=28
          :boolean=true
          :null=null
          :undefined=undefined
          :object={name: "Alex"}
          :array=["foo", "bar"]
          :function=() => {alert("hi!");}
          :onClick=this.clickHandler
        />
      `;
  }
}

export const PARSED_COMPONENT: ParsedComponent = {
  name: "Component",
  props: {
    foo: "bar",
  },
};

export const PARSED_COMPONENT_WITH_KEY: ParsedComponentWithKey = {
  name: "Component",
  props: {
    foo: "bar",
  },
  key: "Component",
};
