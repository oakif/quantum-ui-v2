"use client"

import * as React from "react"
import { codeToHtml } from "shiki"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york-v4/ui/button"

export interface PreviewSetting {
  name: string
  options: { label: string; value: string }[]
}

export function InteractivePreview({
  settings,
  renderPreview,
  renderCode,
  flush = false,
  className,
}: {
  settings: PreviewSetting[]
  renderPreview: (values: Record<string, string>) => React.ReactNode
  renderCode: (values: Record<string, string>) => string
  flush?: boolean
  className?: string
}) {
  const [values, setValues] = React.useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    for (const setting of settings) {
      initial[setting.name] = setting.options[0].value
    }
    return initial
  })

  const [isCodeVisible, setIsCodeVisible] = React.useState(false)
  const [highlightedFull, setHighlightedFull] = React.useState("")
  const [highlightedPreview, setHighlightedPreview] = React.useState("")

  const code = renderCode(values)

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
      <div
        className={cn(
          "preview relative flex min-h-40 w-full items-center justify-center",
          flush ? "p-0" : "p-10"
        )}
      >
        {renderPreview(values)}
      </div>
      <div className="flex flex-wrap items-center gap-4 border-t px-4 py-3">
        {settings.map((setting) => (
          <div key={setting.name} className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              {setting.name}
            </span>
            <div className="flex items-center rounded-lg border p-0.5">
              {setting.options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    setValues((prev) => ({
                      ...prev,
                      [setting.name]: option.value,
                    }))
                  }
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                    values[setting.name] === option.value
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
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
