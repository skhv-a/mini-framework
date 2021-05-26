import {
  isRawPropValueObject,
  normalizeProps,
  parseChildrenComponents,
  parseComponentPropsFromTemplate,
  parseComponentsNames,
  parsePropName,
  parsePropRawValue,
  parsePropValue,
} from "@core/utils/componentsParser";
import { PROPS_PARSER_TEST_COMPONENT } from "@mocks/components";
import { ParsedComponent } from "@src/models/Component";

const TEST_COMPONENT = new PROPS_PARSER_TEST_COMPONENT();

const TEST_COMPONENT_CHILD_NAME = "ComponentForTest";

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

const RAW_PROP = 'string="hello!"';
const RAW_PROP_NAME = "string";
const RAW_PROP_VALUE = '"hello!"';

const PARSED_PROPS = {
  string: "hello!",
  number: 28,
  boolean: true,
  null: null,
  undefined: undefined,
  object: { name: "Alex" },
  array: ["foo", "bar"],
  function: (() => {
    alert("hi!");
  }).bind(TEST_COMPONENT), // bind for test
  onClick: TEST_COMPONENT.clickHandler.bind(TEST_COMPONENT), // bind for test
};

const UNPARSED_PROPS = {
  string: '"hello!"',
  number: "28",
  boolean: "true",
  null: "null",
  undefined: "undefined",
  object: '{name: "Alex"}',
  array: '["foo", "bar"]',
  function: '() => {alert("hi!");}',
  onClick: "this.clickHandler",
};

const PARSED_COMPONENT: ParsedComponent = {
  name: TEST_COMPONENT_CHILD_NAME,
  props: PARSED_PROPS,
};

describe("Components Parser", () => {
  it("parseComponentsNames", () => {
    expect(parseComponentsNames(TEST_COMPONENT.template)).toEqual([
      TEST_COMPONENT_CHILD_NAME,
    ]);
  });

  it("parseComponentPropsFromTemplate", () => {
    expect(
      parseComponentPropsFromTemplate(
        TEST_COMPONENT_CHILD_NAME,
        TEST_COMPONENT.template
      )
    ).toBe(RAW_PROPS);
  });

  it("normalizeProps", () => {
    expect(normalizeProps(RAW_PROPS)).toEqual(NORMALIZED_RAW_PROPS);
  });

  it("parsePropName", () => {
    expect(parsePropName(RAW_PROP)).toBe(RAW_PROP_NAME);
  });

  it("parsePropRawValue", () => {
    expect(parsePropRawValue(RAW_PROP)).toBe(RAW_PROP_VALUE);
  });

  describe("parsePropValue", () => {
    describe("isRawPropValueObject", () => {
      it("object", () => {
        expect(isRawPropValueObject(UNPARSED_PROPS.object)).toBeTruthy();
      });

      it("not object", () => {
        expect(isRawPropValueObject(UNPARSED_PROPS.string)).toBeFalsy();
      });
    });

    it("string", () => {
      expect(parsePropValue(UNPARSED_PROPS.string, TEST_COMPONENT)).toBe(
        PARSED_PROPS.string
      );
    });

    it("number", () => {
      expect(parsePropValue(UNPARSED_PROPS.number, TEST_COMPONENT)).toBe(
        PARSED_PROPS.number
      );
    });

    it("boolean", () => {
      expect(parsePropValue(UNPARSED_PROPS.boolean, TEST_COMPONENT)).toBe(
        PARSED_PROPS.boolean
      );
    });

    it("null", () => {
      expect(parsePropValue(UNPARSED_PROPS.null, TEST_COMPONENT)).toBe(
        PARSED_PROPS.null
      );
    });

    it("undefined", () => {
      expect(parsePropValue(UNPARSED_PROPS.undefined, TEST_COMPONENT)).toBe(
        PARSED_PROPS.undefined
      );
    });

    it("object", () => {
      expect(parsePropValue(UNPARSED_PROPS.object, TEST_COMPONENT)).toEqual(
        PARSED_PROPS.object
      );
    });

    it("array", () => {
      expect(parsePropValue(UNPARSED_PROPS.array, TEST_COMPONENT)).toEqual(
        PARSED_PROPS.array
      );
    });

    it("function", () => {
      expect(
        typeof parsePropValue(UNPARSED_PROPS.function, TEST_COMPONENT)
      ).toBe("function");
    });

    it("Component method", () => {
      expect(
        typeof parsePropValue(UNPARSED_PROPS.onClick, TEST_COMPONENT)
      ).toBe("function");
    });

    it("this", () => {
      expect(parsePropValue("this", TEST_COMPONENT)).toBe(TEST_COMPONENT);
    });
  });

  it("parseChildrenComponents", () => {
    expect(JSON.stringify(parseChildrenComponents(TEST_COMPONENT))).toBe(
      JSON.stringify([PARSED_COMPONENT])
    );
  });
});
