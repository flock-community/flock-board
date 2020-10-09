export function appendUrl(baseUrl: string, path: string) {
  if (baseUrl.endsWith("/")) {
    return `${baseUrl}${path}`;
  } else {
    return `${baseUrl}/${path}`;
  }
}
