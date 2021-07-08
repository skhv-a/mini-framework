import {
  createRootFromTemplate,
  createRootTagFromTemplate,
  getInnerHtmlOfRootTemplate,
  getRootRawAttrsFromTemplate,
  getRootTagFromTemplate,
  rawAttrsToArray,
} from "@src/core/utils/createRootFromTemplate";
import { normalizeTemplate } from "@src/core/utils/normalizeTemplate";

const TEST_TEMPLATE = /* html */ normalizeTemplate(`
  <div class="container" data-attr="test" id="#app">
    <h1>Title</h1>
    <div class="child">some text</div>
  </div>`);
const ROOT_TAG = "div";
const RAW_ATTRS = `class="container" data-attr="test" id="#app"`;
const ATTRS = [`class="container"`, `data-attr="test"`, `id="#app"`];
const OUTER_HTML = `<div class="container" data-attr="test" id="#app"></div>`;
const INNER_HTML = `<h1>Title</h1><div class="child">some text</div>`;

const normalizeOuterHTML = (outerHTML: string) =>
  outerHTML.replace(/&quot;/g, "");

describe("createRootFromTemplate", () => {
  it("getRootTagFromTemplate", () => {
    expect(getRootTagFromTemplate(TEST_TEMPLATE)).toBe(ROOT_TAG);
  });

  describe("getRootRawAttrsFromTemplate", () => {
    it("root has attrs", () => {
      expect(getRootRawAttrsFromTemplate(TEST_TEMPLATE)).toBe(RAW_ATTRS);
    });

    it("root has not attrs", () => {
      const TEMPLATE = "<div></div>";
      expect(getRootRawAttrsFromTemplate(TEMPLATE)).toBe("");
    });

    it("Children attrs does not parse", () => {
      const TEMPLATE = "<div><span class='child'></span></div>";
      expect(getRootRawAttrsFromTemplate(TEMPLATE)).toBe("");
    });
  });

  it("rawAttrsToArray", () => {
    expect(rawAttrsToArray(RAW_ATTRS)).toEqual(ATTRS);
  });

  it("createRootTagFromTemplate", () => {
    expect(
      normalizeOuterHTML(createRootTagFromTemplate(TEST_TEMPLATE).outerHTML)
    ).toBe(OUTER_HTML);
  });

  it("getInnerHtmlOfRootTemplate", () => {
    expect(getInnerHtmlOfRootTemplate(TEST_TEMPLATE)).toBe(INNER_HTML);
  });

  it("createRootFromTemplate", () => {
    expect(
      normalizeOuterHTML(createRootFromTemplate(TEST_TEMPLATE).outerHTML)
    ).toBe(TEST_TEMPLATE);
  });
});
