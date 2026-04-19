"use client"

import * as React from "react"
import { codeToHtml } from "shiki"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york-v4/ui/button"

export function InlinePreview({
  children,
  code,
  flush = false,
  className,
}: {
  children: React.ReactNode
  code: string
  flush?: boolean
  className?: string
}) {
  const [isCodeVisible, setIsCodeVisible] = React.useState(false)
  const [highlightedFull, setHighlightedFull] = React.useState("")
  const [highlightedPreview, setHighlightedPreview] = React.useState("")

  React.useEffect(() => {
    const previewCode = code.split("\n").slice(0, 3).join("\n")
    Promise.all([
      codeToHtml(code, { lang: "tsx", theme: "github-dark-default" }),
      codeToHtml(previewCode, {
        lang: "tsx",
        theme: "github-dark-default",
      }),
    ]).then(([full, preview]) => {
      setHighlightedFull(full)
      setHighlightedPreview(preview)
    })
  }, [code])

  return (
    <div
      className={cn(
        "group relative mt-4 mb-12 flex flex-col overflow-hidden rounded-xl border",
        className
      )}
    >
      <div className={cn("preview relative flex min-h-40 w-full items-center justify-center", flush ? "p-0" : "p-10")}>
        {children}
      </div>
      <div className="relative overflow-hidden">
        {isCodeVisible ? (
          <div className="border-t">
            <div className="relative">
              <div
                className="overflow-x-auto [&_pre]:p-4 [&_pre]:text-[13px] [&_pre]:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: highlightedFull }}
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="absolute top-2 right-2 z-10 h-7 rounded-lg bg-background px-2 text-xs text-foreground shadow-none hover:bg-muted dark:bg-background dark:text-foreground dark:hover:bg-muted"
                onClick={() => setIsCodeVisible(false)}
              >
                Hide Code
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative border-t">
            <div
              className="overflow-hidden [&_pre]:p-4 [&_pre]:text-[13px] [&_pre]:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlightedPreview }}
            />
            <div className="absolute inset-0 flex items-center justify-center pb-4">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, var(--color-code, #09090b), color-mix(in oklab, var(--color-code, #09090b) 60%, transparent), transparent)",
                }}
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="relative z-10 rounded-lg bg-background text-foreground shadow-none hover:bg-muted dark:bg-background dark:text-foreground dark:hover:bg-muted"
                onClick={() => setIsCodeVisible(true)}
              >
                View Code
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
