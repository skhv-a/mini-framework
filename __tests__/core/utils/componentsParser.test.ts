import { parseComponentsNames } from "@core/utils/componentsParser";
import { NORMALIZED_TEMPLATE } from "@mocks/templates";

describe("Component Parser", () => {
  it("parseComponentsNames", () => {
    expect(parseComponentsNames(NORMALIZED_TEMPLATE)).toEqual([
      "Button",
      "ComponentWithALotOfProps",
    ]);
  });
});
