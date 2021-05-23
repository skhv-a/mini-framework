const getRootFromTemplate = (template: string): Element => {
  const ROOT_ATTRS_REG_EXP = /(?<=\<\w+\s).*?(?=>)/g;

  const rootTag = getRootTagFromTemplate(template);
  const $root = document.createElement(rootTag);

  const [unsplitedAttrs] = template.match(ROOT_ATTRS_REG_EXP) ?? [""];

  const attrs = unsplitedAttrs.split(" ");

  attrs.forEach((attrWithValue) => {
    if (!attrWithValue) return;

    const [attr, value] = attrWithValue.split("=");
    $root.setAttribute(attr, value);
  });

  return $root;
};

export const getRootTagFromTemplate = (template: string): string => {
  const ROOT_TAG_REG_EXP = /(?<=<)\w+/i;
  const [rootTag] = template.match(ROOT_TAG_REG_EXP) ?? [""];

  if (!rootTag) throw new Error("Cannot get root tag from template");

  return rootTag;
};

const getInnerHtmlOfRootTemplate = (template: string): string => {
  const INNER_HTML_REG_EXP = /(?<=>).*(?=<\/\w+>)/g;
  const [innterHtml] = template.match(INNER_HTML_REG_EXP) ?? [""];

  return innterHtml;
};
