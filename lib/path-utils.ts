/**
 * Converts an internal path (with .children.) to a URL-friendly path (with # separators)
 * @param internalPath The internal path format (e.g., "ourDogs.children.championRex")
 * @returns URL-friendly path (e.g., "ourDogs#championRex")
 */
export function internalPathToUrlPath(internalPath: string): string {
  // Split by .children. and join with #
  return internalPath.split(".children.").join("#")
}

/**
 * Converts a URL-friendly path (with # separators) to an internal path (with .children.)
 * @param urlPath The URL path format (e.g., "ourDogs#championRex")
 * @returns Internal path format (e.g., "ourDogs.children.championRex")
 */
export function urlPathToInternalPath(urlPath: string): string {
  // Split by # and join with .children.
  return urlPath.split("#").join(".children.")
}

