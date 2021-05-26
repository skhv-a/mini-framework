import {
  TEMPLATE_WITH_COMPONENTS,
  TEMPLATE_WITH_COMPONENTS_MARKERS,
} from "@mocks/templates";
import { replaceComponentsToHtmlMarkers } from "@src/core/utils/replaceComponentsToHtmlMarkers";

describe("replaceComponentsToHtmlMarkers", () => {
  it("template with components", () => {
    expect(replaceComponentsToHtmlMarkers(TEMPLATE_WITH_COMPONENTS)).toBe(
      TEMPLATE_WITH_COMPONENTS_MARKERS
    );
  });
});
