import { internalPathToUrlPath } from "./path-utils"

/**
 * Creates a shareable URL for a specific content path
 * @param path The content path to share
 * @returns A shareable URL
 */
export function createShareableUrl(path: string): string {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
  // Convert internal path to URL path
  const urlPath = internalPathToUrlPath(path)
  return `${baseUrl}#${urlPath}`
}

/**
 * Copies a shareable URL to the clipboard
 * @param path The content path to share
 * @returns A promise that resolves when the URL is copied
 */
export async function copyShareableUrl(path: string): Promise<boolean> {
  try {
    const url = createShareableUrl(path)
    await navigator.clipboard.writeText(url)
    return true
  } catch (error) {
    console.error("Failed to copy URL to clipboard:", error)
    return false
  }
}

