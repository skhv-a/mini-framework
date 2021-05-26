export const normalizeTemplate = (template: string): string => {
  const EXTRA_SPACE_REG_EXP = /\s{2,}/g;

  const withoutTagsExtraSpace = removeTagsExtraSpace(template);
  const normalizedTemplate = withoutTagsExtraSpace.replace(
    EXTRA_SPACE_REG_EXP,
    " "
  );

  return normalizedTemplate;
};

function removeTagsExtraSpace(template: string): string {
  const EXTRA_SPACE_BEFORE_OPENING_TAG_REG_EXP = /\s{2,}(?=\<)/g;
  const EXTRA_SPACE_AFTER_CLOSING_TAG_REG_EXP = /(?<=\>)\s{2,}/g;

  const withoutTagsExtraSpace = template
    .replace(EXTRA_SPACE_BEFORE_OPENING_TAG_REG_EXP, "")
    .replace(EXTRA_SPACE_AFTER_CLOSING_TAG_REG_EXP, "");

  return withoutTagsExtraSpace;
}
