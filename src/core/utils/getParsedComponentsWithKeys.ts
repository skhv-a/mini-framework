import { ParsedComponent, ParsedComponentWithKey } from "@src/models/Component";

export const getParsedComponentsWithKeys = (
  parsedComponents: ParsedComponent[]
): ParsedComponentWithKey[] => {
  const parsedComponentsWithKeys: ParsedComponentWithKey[] = [];

  const withUniqNames: ParsedComponent[] = [];
  const withDuplicatedNames: ParsedComponent[] = [];

  parsedComponents.forEach((component) => {
    const isDuplicate = withUniqNames.find((c) => c.name === component.name);
    const src = isDuplicate ? withDuplicatedNames : withUniqNames;

    src.push(component);
  });

  withUniqNames.forEach((comp) => {
    parsedComponentsWithKeys.push({ ...comp, key: comp.name });
  });

  withDuplicatedNames.forEach((comp, idx) => {
    parsedComponentsWithKeys.push({ ...comp, key: comp.name + ++idx });
  });

  return parsedComponentsWithKeys;
};
