import { PARSED_COMPONENT, PARSED_COMPONENT_WITH_KEY } from "@mocks/components";
import { getParsedComponentsWithKeys } from "@src/core/utils/getParsedComponentsWithKeys";
import { ParsedComponentWithKey } from "@src/models/Component";

const NAME = "AnotherComponent";

const ANOTHER_PARSED_COMPONENT = {
  ...PARSED_COMPONENT,
  name: NAME,
};

const ANOTHER_PARSED_COMPONENT_WITH_KEY: ParsedComponentWithKey = {
  ...ANOTHER_PARSED_COMPONENT,
  key: NAME,
};

const DUPLICATE_WITH_UNIQ_KEY: ParsedComponentWithKey = {
  ...PARSED_COMPONENT,
  key: "Component1",
};

describe("getParsedComponentsWithKeys", () => {
  it("Without the same names", () => {
    expect(
      getParsedComponentsWithKeys([PARSED_COMPONENT, ANOTHER_PARSED_COMPONENT])
    ).toEqual([PARSED_COMPONENT_WITH_KEY, ANOTHER_PARSED_COMPONENT_WITH_KEY]);
  });
  it("With the same names", () => {
    expect(
      getParsedComponentsWithKeys([PARSED_COMPONENT, PARSED_COMPONENT])
    ).toEqual([PARSED_COMPONENT_WITH_KEY, DUPLICATE_WITH_UNIQ_KEY]);
  });
});
