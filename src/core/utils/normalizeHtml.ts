export const removeExtraSpacesFromHtml = (html: string): string => {
  return html.replace(/\s{2,}/g, "");
};
