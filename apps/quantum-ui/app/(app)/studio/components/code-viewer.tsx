"use client"

import * as React from "react"
import { codeToHtml } from "shiki"
import { Copy, Check } from "lucide-react"

import { cn } from "@/lib/utils"

interface RegistryFile {
  path: string
  content: string
}

export function CodeViewer({ blockId }: { blockId: string }) {
  const [files, setFiles] = React.useState<RegistryFile[]>([])
  const [activeFile, setActiveFile] = React.useState(0)
  const [highlightedCode, setHighlightedCode] = React.useState("")
  const [loading, setLoading] = React.useState(true)
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!blockId) return
    setLoading(true)
    fetch(`/r/styles/new-york-v4/${blockId}.json`)
      .then((res) => res.json())
      .then((data) => {
        const registryFiles = (data.files || []).map(
          (f: { path: string; content?: string }) => ({
            path: f.path.split("/").pop() || f.path,
            content: f.content || "",
          })
        )
        setFiles(registryFiles)
        setActiveFile(0)
        setLoading(false)
      })
      .catch(() => {
        setFiles([])
        setLoading(false)
      })
  }, [blockId])

  React.useEffect(() => {
    const file = files[activeFile]
    if (!file?.content) {
      setHighlightedCode("")
      return
    }
    codeToHtml(file.content, {
      lang: "tsx",
      theme: "github-dark-default",
    }).then(setHighlightedCode)
  }, [files, activeFile])

  const handleCopy = React.useCallback(() => {
    const file = files[activeFile]
    if (!file?.content) return
    navigator.clipboard.writeText(file.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [files, activeFile])

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
        Loading...
      </div>
    )
  }

  if (files.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
        No source files found for this block.
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center gap-1 overflow-x-auto border-b px-2">
        {files.map((file, i) => (
          <button
            key={file.path}
            type="button"
            onClick={() => setActiveFile(i)}
            className={cn(
              "shrink-0 border-b-2 px-3 py-2 text-xs font-medium transition-colors",
              i === activeFile
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {file.path}
          </button>
        ))}
        <div className="ml-auto flex items-center">
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-md p-1.5 text-muted-foreground hover:text-foreground"
            title="Copy code"
          >
            {copied ? (
              <Check className="size-3.5" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <div
          className="[&_pre]:p-4 [&_pre]:text-[13px] [&_pre]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </div>
  )
}
