import { GET_ROOT_FROM_TEMPLATE_TEST_TEMPLATE as TEST_TEMPLATE } from "@mocks/templates";
import { getRootTagFromTemplate } from "@src/core/utils/getRootFromTemplate";

const ROOT_TAG = "div";

describe("getRootFromTemplate", () => {
  it("getRootTagFromTemplate", () => {
    expect(getRootTagFromTemplate(TEST_TEMPLATE)).toBe(ROOT_TAG);
  });
});
