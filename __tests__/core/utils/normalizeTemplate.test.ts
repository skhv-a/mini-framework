import { normalizeTemplate } from "@core/utils/normalizeTemplate";
import { NORMALIZED_TEMPLATE, RAW_TEMPLATE } from "@mocks/templates";

describe("normalizeTemplate", () => {
  test("Props with tabs", () => {
    expect(normalizeTemplate(RAW_TEMPLATE)).toBe(NORMALIZED_TEMPLATE);
  });
});
