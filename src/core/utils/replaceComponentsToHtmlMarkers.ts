import { parseComponentsNames } from "./componentsParser";

export const replaceComponentsToHtmlMarkers = (
  rootTemplate: string
): string => {
  const componentsNames = parseComponentsNames(rootTemplate);

  const templateWithComponentsMarkers = componentsNames.reduce(
    (template, componentName) => {
      const REPLACE_COMPONENT_REG_EXP = new RegExp(`<${componentName}.*?\\/>`);
      const COMPONENT_HTML_MARKER = `<div data-component="${componentName}"></div>`;

      const templateWithComponentMarker = template.replace(
        REPLACE_COMPONENT_REG_EXP,
        COMPONENT_HTML_MARKER
      );

      return templateWithComponentMarker;
    },
    rootTemplate
  );

  return templateWithComponentsMarkers;
};
