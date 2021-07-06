export const createRootFromTemplate = (template: string): Element => {
  const $root = createRootTagFromTemplate(template);
  const innterHtml = getInnerHtmlOfRootTemplate(template);

  $root.innerHTML = innterHtml;

  return $root;
};

export const createRootTagFromTemplate = (template: string): Element => {
  const rootTag = getRootTagFromTemplate(template);
  const rawAttrs = getRootRawAttrsFromTemplate(template);
  const attrs = rawAttrsToArray(rawAttrs);

  const $root = document.createElement(rootTag);

  attrs.forEach((attrWithValue) => {
    const [attr, value] = attrWithValue.split("=");
    $root.setAttribute(attr, value);
  });

  return $root;
};

export const getInnerHtmlOfRootTemplate = (template: string): string => {
  const INNER_HTML_REG_EXP = /(?<=>).*(?=<\/\w+>)/g;
  const [innterHtml] = template.match(INNER_HTML_REG_EXP) ?? [""];

  return innterHtml;
};

export const getRootTagFromTemplate = (template: string): string => {
  const ROOT_TAG_REG_EXP = /(?<=<)\w+/i;
  const [rootTag] = template.match(ROOT_TAG_REG_EXP) ?? [""];

  if (!rootTag) throw new Error("Cannot get root tag from template");

  return rootTag;
};

export const getRootRawAttrsFromTemplate = (template: string): string => {
  const ROOT_ATTRS_REG_EXP = /(?<=^\<\w+\s).*?(?=>)/g;
  const [unsplitedAttrs] = template.match(ROOT_ATTRS_REG_EXP) ?? [""];

  return unsplitedAttrs;
};

export const rawAttrsToArray = (rawAttrs: string): string[] =>
  rawAttrs.split(" ").filter((a) => !!a);
