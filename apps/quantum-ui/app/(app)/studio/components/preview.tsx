"use client"

import * as React from "react"
import { Monitor, Search, Smartphone, Tablet } from "lucide-react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

import { CMD_K_FORWARD_TYPE } from "@/app/(app)/studio/components/action-menu"
import {
  BlockSelector,
  type BlockGroup,
} from "@/app/(app)/studio/components/block-selector"
import { CodeViewer } from "@/app/(app)/studio/components/code-viewer"
import {
  REDO_FORWARD_TYPE,
  UNDO_FORWARD_TYPE,
} from "@/app/(app)/studio/components/history-buttons"
import { DARK_MODE_FORWARD_TYPE } from "@/app/(app)/studio/components/mode-switcher"
import { RANDOMIZE_FORWARD_TYPE } from "@/app/(app)/studio/components/random-button"
import { sendToIframe } from "@/app/(app)/studio/hooks/use-iframe-sync"
import * as ResizablePrimitive from "react-resizable-panels"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/new-york-v4/ui/resizable"
import { useActionMenuTrigger } from "@/app/(app)/studio/hooks/use-action-menu"
import { RESET_FORWARD_TYPE } from "@/app/(app)/studio/hooks/use-reset"
import { usePreviewTheme } from "@/app/(app)/studio/hooks/use-preview-theme"
import {
  useDesignSystemSearchParams,
} from "@/app/(app)/studio/lib/search-params"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york-v4/ui/tabs"

function handleMessage(event: MessageEvent) {
  if (
    event.data.type === CMD_K_FORWARD_TYPE ||
    event.data.type === UNDO_FORWARD_TYPE ||
    event.data.type === REDO_FORWARD_TYPE ||
    event.data.type === RANDOMIZE_FORWARD_TYPE ||
    event.data.type === RESET_FORWARD_TYPE ||
    event.data.type === DARK_MODE_FORWARD_TYPE
  ) {
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: event.data.key || "d",
        bubbles: true,
        cancelable: true,
      })
    )
  }
}

type PreviewSize = "desktop" | "tablet" | "mobile"

const PREVIEW_SIZE_PX: Record<PreviewSize, number | null> = {
  desktop: null, // full width
  tablet: 768,
  mobile: 375,
}

export function Preview({ blockGroups }: { blockGroups: BlockGroup[] }) {
  const [params] = useDesignSystemSearchParams()
  const { resolvedPreviewTheme } = usePreviewTheme()
  const { openActionMenu } = useActionMenuTrigger()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const iframeRef = React.useRef<HTMLIFrameElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const panelRef = React.useRef<ResizablePrimitive.ImperativePanelHandle>(null)
  const [previewSize, setPreviewSize] = React.useState<PreviewSize>("desktop")
  const [view, setView] = React.useState<"preview" | "code">("preview")

  // Read block from URL, fallback to first block
  const blockFromUrl = searchParams.get("block") || blockGroups[0]?.blocks[0]?.id || ""
  const [selectedBlockId, setSelectedBlockId] = React.useState(blockFromUrl)

  // Sync with URL changes (e.g. from Navigate popup)
  React.useEffect(() => {
    if (blockFromUrl && blockFromUrl !== selectedBlockId) {
      setSelectedBlockId(blockFromUrl)
    }
  }, [blockFromUrl, selectedBlockId])

  // Persist block selection to URL
  const handleBlockSelect = React.useCallback(
    (blockId: string) => {
      setSelectedBlockId(blockId)
      const newParams = new URLSearchParams(searchParams.toString())
      newParams.set("block", blockId)
      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false })
    },
    [searchParams, router, pathname]
  )

  // Send params to iframe on load and when params change
  // Iframe src only depends on block ID — no reload on param changes
  const iframeSrc = `/view/new-york-v4/${selectedBlockId}`

  // Send initial params when iframe loads, then live-update via postMessage
  const paramsRef = React.useRef(params)
  paramsRef.current = params

  React.useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const onLoad = () => {
      sendToIframe(iframe, "design-system-params", paramsRef.current)
    }

    iframe.addEventListener("load", onLoad)
    return () => {
      iframe.removeEventListener("load", onLoad)
    }
  }, [iframeSrc])

  // Live-update params without iframe reload
  const paramsKey = JSON.stringify(params)
  React.useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe?.contentWindow) return
    sendToIframe(iframe, "design-system-params", params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsKey])

  React.useEffect(() => {
    window.addEventListener("message", handleMessage)
    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  // Apply dark/light theme to iframe only (not the main page)
  React.useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe?.contentDocument) return
    const html = iframe.contentDocument.documentElement
    if (resolvedPreviewTheme === "dark") {
      html.classList.add("dark")
      html.style.colorScheme = "dark"
    } else {
      html.classList.remove("dark")
      html.style.colorScheme = "light"
    }
  }, [resolvedPreviewTheme])

  const handleResize = React.useCallback(
    (size: PreviewSize) => {
      setPreviewSize(size)
      setView("preview")
      const container = containerRef.current
      const panel = panelRef.current
      if (!container || !panel) return
      const targetPx = PREVIEW_SIZE_PX[size]
      if (!targetPx) {
        panel.resize(100)
      } else {
        const containerWidth = container.offsetWidth
        const pct = Math.min(100, Math.round((targetPx / containerWidth) * 100))
        panel.resize(pct)
      }
    },
    []
  )

  return (
    <div className="relative flex flex-1 flex-col gap-3 overflow-hidden">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BlockSelector
            groups={blockGroups}
            initialBlockId={selectedBlockId}
            onSelect={handleBlockSelect}
          />
          <button
            onClick={openActionMenu}
            className="flex h-8 items-center gap-1.5 rounded-lg border border-foreground/10 px-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            title="Navigate (⌘P)"
          >
            <Search className="size-3.5" />
            <span className="hidden md:inline">Navigate</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-lg border border-foreground/10 p-1 md:flex">
            <button
              onClick={() => handleResize("desktop")}
              data-active={previewSize === "desktop"}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
              title="Desktop"
            >
              <Monitor className="size-3.5" />
            </button>
            <button
              onClick={() => handleResize("tablet")}
              data-active={previewSize === "tablet"}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
              title="Tablet"
            >
              <Tablet className="size-3.5" />
            </button>
            <button
              onClick={() => handleResize("mobile")}
              data-active={previewSize === "mobile"}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
              title="Mobile"
            >
              <Smartphone className="size-3.5" />
            </button>
          </div>
          <Tabs
            value={view}
            onValueChange={(v) => setView(v as "preview" | "code")}
            className="hidden md:flex"
          >
            <TabsList className="h-8! grid-cols-2 rounded-lg border border-foreground/10 bg-transparent p-1 *:data-[slot=tabs-trigger]:h-6 *:data-[slot=tabs-trigger]:rounded-md *:data-[slot=tabs-trigger]:px-2.5 *:data-[slot=tabs-trigger]:text-xs">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="relative flex flex-1 flex-col overflow-hidden rounded-2xl ring ring-foreground/10 md:ring-muted dark:ring-foreground/10">
        {view === "preview" ? (
          <div ref={containerRef} className="relative flex w-full flex-1 overflow-hidden bg-zinc-950/50">
            <div className="absolute inset-0 [background-image:radial-gradient(var(--color-muted-foreground)_0.5px,transparent_0.5px)] [background-size:20px_20px] opacity-30" />
            <ResizablePanelGroup
              orientation="horizontal"
              className="relative z-10 h-full"
            >
              <ResizablePanel
                ref={panelRef}
                className="relative overflow-hidden rounded-lg border shadow-xl"
                defaultSize={100}
                minSize={20}
              >
                <iframe
                  key={iframeSrc}
                  ref={iframeRef}
                  src={iframeSrc}
                  className="h-full w-full bg-background"
                  title="Preview"
                />
              </ResizablePanel>
              <ResizableHandle className="relative hidden w-3 bg-transparent p-0 after:absolute after:top-1/2 after:right-0 after:h-8 after:w-[6px] after:translate-x-[-1px] after:-translate-y-1/2 after:rounded-full after:bg-muted-foreground/50 after:transition-all after:hover:h-10 after:hover:bg-muted-foreground md:block" />
              <ResizablePanel defaultSize={0} minSize={0} />
            </ResizablePanelGroup>
          </div>
        ) : (
          <div className="flex flex-1 overflow-hidden bg-zinc-950">
            <CodeViewer blockId={selectedBlockId} />
          </div>
        )}
      </div>
    </div>
  )
}
