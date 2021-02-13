import { ComponentOptions } from "../../models/Component";

export const templateComponent = (
  name: string,
  options?: ComponentOptions
): string => {
  const $templateComponent = document.createElement("div");
  $templateComponent.setAttribute("data-component", name);
  $templateComponent.setAttribute("data-props", JSON.stringify(options || {}));

  return $templateComponent.outerHTML;
};
