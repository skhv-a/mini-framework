import { ParsedComponent, Props, PropValue } from "@src/models/Component";
import { Component } from "@core/Component";

export const parseChildrenComponents = <T>(
  component: Component<T>
): ParsedComponent[] => {
  const { template } = component;

  const componentsNames = parseComponentsNames(template);

  const parsedComponents: ParsedComponent[] = componentsNames.map(
    (componentName) => {
      const rawProps = parseComponentPropsFromTemplate(componentName, template);
      const normalizedRawProps = normalizeProps(rawProps);

      const parsedProps = normalizedRawProps.reduce((props, rawProp) => {
        const name = parsePropName(rawProp);
        const rawValue = parsePropRawValue(rawProp);
        const parsedValue = parsePropValue(rawValue, component);

        props[name] = parsedValue;

        return props;
      }, {} as Props);

      return { name: componentName, props: parsedProps };
    }
  );

  return parsedComponents;
};

export const parseComponentsNames = (template: string): string[] => {
  const COMPONENT_NAMES_REG_EXP = /(?<=\<)[A-Z]\w+/g;
  const componentsNames = template.match(COMPONENT_NAMES_REG_EXP) ?? [];

  return componentsNames;
};

export const parseComponentPropsFromTemplate = (
  componentName: string,
  template: string
): string => {
  const COMPONENT_PROPS_REG_EXP = new RegExp(
    `(?<=\\<${componentName}\\s?).*?(?=\\/>)`,
    "g"
  );
  const [props = ""] = template.match(COMPONENT_PROPS_REG_EXP) ?? [];

  return props;
};

export const normalizeProps = (rawProps: string): string[] =>
  rawProps
    .split(/\s:/)
    .filter((p) => !!p)
    .map((p) => p.trim());

export const parsePropName = (rawProp: string): string => {
  const PROP_NAME_REG_EXP = /\w+(?=\=)/;
  const [name = ""] = rawProp.match(PROP_NAME_REG_EXP) ?? [];

  return name;
};

export const parsePropRawValue = (rawProp: string): string => {
  const PROP_RAW_VALUE_REG_EXP = /(?<=\=).+/;
  const [rawValue = ""] = rawProp.match(PROP_RAW_VALUE_REG_EXP) ?? [];

  return rawValue;
};

export const parsePropValue = <T>(
  rawValue: string,
  component: Component<T>
): PropValue => {
  let parsedValue: PropValue;

  if (isRawPropValueObject(rawValue)) {
    rawValue = "(" + rawValue + ")";
  }

  (function (this: Component<T>) {
    parsedValue = eval(rawValue);

    if (typeof parsedValue === "function") {
      parsedValue = parsedValue.bind(this);
    }
  }.call(component));

  return parsedValue;
};

export const isRawPropValueObject = (rawValue: string): boolean => {
  const IS_OBJECT_REG_EXP = /^{(.*)}$/g;
  const [obj = ""] = rawValue.match(IS_OBJECT_REG_EXP) ?? [];

  return !!obj;
};
