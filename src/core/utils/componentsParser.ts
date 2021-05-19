import { Props } from "@src/models/Component";
import { Component } from "@core/Component";

type ParsedComponents = { [componentName: string]: Props };

export const parseChildrenComponentsFromComponent = <T>(
  component: Component<T>
): ParsedComponents => {
  const { template } = component;

  const componentsNames = parseComponentsNames(template);
  const componentsWithProps = componentsNames.reduce((acc, componentName) => {
    const props = parseComponentPropsFromTemplate(componentName, template);
    const normalizedProps = normalizeProps(props);

    //parseProps

    const parsedProps = normalizedProps.reduce((acc, unparsedProp) => {
      const [name = ""] = unparsedProp.match(/\w+(?=\=)/) ?? [];
      const [value = ""] = unparsedProp.match(/(?<=\=).+/) ?? [];

      let parsedValue = eval(value);

      if (typeof parsedValue === "function") {
        parsedValue = parsedValue.bind(component);
      }

      acc[name] = value;

      return acc;
    }, {} as Props);

    acc[componentName] = parsedProps;

    return acc;
  }, {} as ParsedComponents);

  return componentsWithProps;
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

export const normalizeProps = (rawProps: string): string[] => {
  const normalizedProps = rawProps
    .split(/\s:/)
    .filter((p) => !!p)
    .map((p) => p.trim());

  return normalizedProps;
};
