import { normalizeTemplate } from "../../../src/core/utils/normalizeTemplate";
import {
  NORMALIZED_TEMPLATE,
  RAW_TEMPLATE,
} from "../../../__mocks__/templates";

describe("normalizeTemplate", () => {
  test("Props with tabs", () => {
    expect(normalizeTemplate(RAW_TEMPLATE)).toBe(NORMALIZED_TEMPLATE);
  });
});
