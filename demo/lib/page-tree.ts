import type { source } from "@/lib/source"

export type PageTreeNode = (typeof source.pageTree)["children"][number]
export type PageTreeFolder = Extract<PageTreeNode, { type: "folder" }>
export type PageTreePage = Extract<PageTreeNode, { type: "page" }>

// Recursively find all pages in a folder tree.
export function getAllPagesFromFolder(folder: PageTreeFolder): PageTreePage[] {
  const pages: PageTreePage[] = []

  for (const child of folder.children) {
    if (child.type === "page") {
      pages.push(child)
    } else if (child.type === "folder") {
      pages.push(...getAllPagesFromFolder(child))
    }
  }

  return pages
}

// Get the pages from a folder.
export function getPagesFromFolder(
  folder: PageTreeFolder,
  _currentBase?: string
): PageTreePage[] {
  return folder.children.filter(
    (child): child is PageTreePage =>
      child.type === "page" && !child.url.endsWith(`/${folder.name.toLowerCase()}`)
  )
}

// Get current base from pathname (kept for compatibility, always returns "radix").
export function getCurrentBase(_pathname: string): string {
  return "radix"
}
