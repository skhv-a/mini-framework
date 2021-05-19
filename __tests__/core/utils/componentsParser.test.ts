import {
  normalizeProps,
  parseComponentPropsFromTemplate,
  parseComponentsNames,
  parsePropName,
} from "@core/utils/componentsParser";
import { PROPS_PARSER_TEST_COMPONENT } from "@mocks/components";
import { NORMALIZED_TEMPLATE } from "@mocks/templates";

const TEST_COMPONENT = new PROPS_PARSER_TEST_COMPONENT();

const RAW_PROPS =
  ' :string="hello!" :number=28 :boolean=true :null=null :undefined=undefined :object={name: "Alex"} :array=["foo", "bar"] :function=() => {alert("hi!");} :onClick=this.clickHandler ';

const NORMALIZED_RAW_PROPS: string[] = [
  'string="hello!"',
  "number=28",
  "boolean=true",
  "null=null",
  "undefined=undefined",
  'object={name: "Alex"}',
  'array=["foo", "bar"]',
  'function=() => {alert("hi!");}',
  "onClick=this.clickHandler",
];

const UPARSED_PROP = 'string="hello!"';
const UPARSED_PROP_NAME = "string";
const UPARSED_PROP_VALUE = '"hello!"';

describe("Components Parser", () => {
  it("parseComponentsNames", () => {
    expect(parseComponentsNames(NORMALIZED_TEMPLATE)).toEqual([
      "Button",
      "ComponentWithALotOfProps",
    ]);
  });

  it("parseComponentPropsFromTemplate", () => {
    expect(
      parseComponentPropsFromTemplate(
        "ComponentForTest",
        TEST_COMPONENT.template
      )
    ).toBe(RAW_PROPS);
  });

  it("normalizeProps", () => {
    expect(normalizeProps(RAW_PROPS)).toEqual(NORMALIZED_RAW_PROPS);
  });

  it("parsePropName", () => {
    expect(parsePropName(UPARSED_PROP)).toBe(UPARSED_PROP_NAME);
  });
});
