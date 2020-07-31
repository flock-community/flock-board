export function removePrefix(string: string, prefix: string) {
  return !string.startsWith(prefix)
    ? string
    : string.substring(prefix.length, string.length);
}

export function substringBefore(
  string: string,
  delimiter: string,
  missingDelimiterValue?: string
) {
  missingDelimiterValue =
    missingDelimiterValue != null ? missingDelimiterValue : string;
  const index = string.indexOf(delimiter);
  return index === -1 ? missingDelimiterValue : string.substring(0, index);
}

export function substringAfter(
  string: string,
  delimiter: string,
  missingDelimiterValue: string = string
) {
  const index = string.indexOf(delimiter);
  return index === -1
    ? missingDelimiterValue
    : string.substring(index + delimiter.length, string.length);
}

export function split(
  string: string,
  separator: string | RegExp,
  limit?: number
) {
  return string.split(separator, limit);
}
