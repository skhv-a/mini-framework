type Props = {
  [key: string]: any;
};

let props: Props = {};

export const getTemplateComponentProps = (): Props => props;

export const templateComponent = (
  name: string,
  componentProps?: Props
): string => {
  const $templateComponent = document.createElement("div");
  $templateComponent.setAttribute("data-component", name);

  props = componentProps || {};

  return $templateComponent.outerHTML;
};
