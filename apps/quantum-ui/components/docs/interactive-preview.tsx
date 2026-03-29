"use client"

import * as React from "react"
import { codeToHtml } from "shiki"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york-v4/ui/button"

export interface PreviewSetting {
  name: string
  type?: "tabs" | "dropdown" | "toggle"
  options: { label: string; value: string; preview?: string[] }[]
}

function SettingControl({
  setting,
  value,
  onChange,
}: {
  setting: PreviewSetting
  value: string
  onChange: (value: string) => void
}) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!dropdownOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [dropdownOpen])

  const selectedOption = setting.options.find((o) => o.value === value)

  if (setting.type === "dropdown") {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          {setting.name}
        </span>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors",
              "text-foreground hover:bg-accent"
            )}
          >
            {selectedOption?.preview && (
              <span className="relative flex items-center" style={{ width: 16, height: 12 }}>
                {selectedOption.preview.slice(0, 2).map((color, i) => (
                  <span
                    key={i}
                    className="absolute rounded-full border border-black/20"
                    style={{
                      backgroundColor: color,
                      width: i === 0 ? 12 : 10,
                      height: i === 0 ? 12 : 10,
                      left: i === 0 ? 0 : 6,
                      top: i === 0 ? 0 : 1,
                      zIndex: i === 0 ? 2 : 1,
                    }}
                  />
                ))}
              </span>
            )}
            {selectedOption?.label}
            <svg
              className="size-3 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute top-full left-0 z-50 mt-1 min-w-[120px] rounded-lg border bg-popover p-1 shadow-md">
              {setting.options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value)
                    setDropdownOpen(false)
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                    value === option.value
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {option.preview && (
                    <span className="flex items-center gap-0.5">
                      {option.preview.map((color, i) => (
                        <span
                          key={i}
                          className="inline-block size-2.5 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </span>
                  )}
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (setting.type === "toggle") {
    const isOn = value === "on"
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          {setting.name}
        </span>
        <button
          type="button"
          onClick={() => onChange(isOn ? "off" : "on")}
          className={cn(
            "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
            isOn ? "bg-primary" : "bg-input"
          )}
        >
          <span
            className={cn(
              "pointer-events-none block size-4 rounded-full bg-background shadow-sm ring-0 transition-transform",
              isOn ? "translate-x-4" : "translate-x-0"
            )}
          />
        </button>
      </div>
    )
  }

  // Default: tabs
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground">
        {setting.name}
      </span>
      <div className="flex items-center rounded-lg border p-0.5">
        {setting.options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
              value === option.value
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
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
          <SettingControl
            key={setting.name}
            setting={setting}
            value={values[setting.name]}
            onChange={(value) =>
              setValues((prev) => ({
                ...prev,
                [setting.name]: value,
              }))
            }
          />
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
