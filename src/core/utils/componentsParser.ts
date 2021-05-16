import { Props } from "@src/models/Component";

type ParsedComponents = { [componentName: string]: Props };

// parseComponentsFromTemplate
export const parseComponentsFromTemplate = (
  template: string
): ParsedComponents => {
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
        parsedValue = parsedValue.bind(this);
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
    .replace(/\s?:/g, ":")
    .split(":")
    .filter((p) => !!p);

  return normalizedProps;
};
