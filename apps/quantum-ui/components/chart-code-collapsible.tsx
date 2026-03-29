"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { ChartCopyButton } from "@/components/chart-copy-button"
import { Button } from "@/registry/new-york-v4/ui/button"

export function ChartCodeCollapsible({
  code,
  highlightedCode,
  chartName,
}: {
  code: string
  highlightedCode: string
  chartName: string
}) {
  const [isCodeVisible, setIsCodeVisible] = React.useState(false)

  return (
    <div className="relative overflow-hidden">
      {isCodeVisible ? (
        <div className="border-t">
          <div className="relative">
            <div
              className="overflow-x-auto [&_pre]:max-h-96 [&_pre]:overflow-y-auto [&_pre]:p-4 [&_pre]:text-[13px] [&_pre]:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
            <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
              <ChartCopyButton
                event="copy_chart_code"
                name={chartName}
                code={code}
                className="h-7 w-7 rounded-lg bg-background text-foreground shadow-none hover:bg-muted dark:bg-background dark:text-foreground dark:hover:bg-muted [&_svg]:h-3 [&_svg]:w-3"
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-7 rounded-lg bg-background px-2 text-xs text-foreground shadow-none hover:bg-muted dark:bg-background dark:text-foreground dark:hover:bg-muted"
                onClick={() => setIsCodeVisible(false)}
              >
                Hide Code
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative border-t">
          <div
            className="max-h-20 overflow-hidden [&_pre]:p-4 [&_pre]:text-[13px] [&_pre]:leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: highlightedCode,
            }}
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
  )
}
