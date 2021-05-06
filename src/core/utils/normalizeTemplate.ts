export const normalizeTemplate = (template: string): string => {
  return template.replace(/\s{2,}/g, "");
};
