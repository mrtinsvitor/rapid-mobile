export const capitalizeWords = (string) => {
  return string.toLowerCase().replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });

  // return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}