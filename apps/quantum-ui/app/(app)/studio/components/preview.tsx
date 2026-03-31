"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { GripHorizontal, GripVertical, Monitor, RectangleHorizontal, RectangleVertical, Search, Smartphone, Tablet } from "lucide-react"
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

type PreviewSize = "desktop" | "tablet" | "mobile" | "custom"
type Orientation = "portrait" | "landscape"

const PREVIEW_PRESETS: Record<Exclude<PreviewSize, "custom">, {
  portrait: { width: number; height: number | null }
  landscape: { width: number; height: number | null }
}> = {
  desktop: {
    portrait: { width: 99999, height: null },
    landscape: { width: 99999, height: null },
  },
  tablet: {
    portrait: { width: 768, height: 1024 },
    landscape: { width: 1024, height: 768 },
  },
  mobile: {
    portrait: { width: 375, height: 812 },
    landscape: { width: 812, height: 375 },
  },
}

function DragHandle({
  onDrag,
  onDragStart,
  onDragEnd,
}: {
  onDrag: (deltaX: number) => void
  onDragStart?: () => void
  onDragEnd?: () => void
}) {
  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      onDragStart?.()
      const startX = e.clientX
      const onMouseMove = (moveEvent: MouseEvent) => {
        onDrag(moveEvent.clientX - startX)
      }
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseup", onMouseUp)
        document.body.style.cursor = ""
        document.body.style.userSelect = ""
        onDragEnd?.()
      }
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseup", onMouseUp)
    },
    [onDrag, onDragStart, onDragEnd]
  )

  return (
    <div
      onMouseDown={handleMouseDown}
      className="z-20 flex h-full w-4 cursor-col-resize items-center justify-center opacity-60 transition-opacity hover:opacity-100"
    >
      <div className="flex h-8 w-[6px] items-center justify-center rounded-full bg-muted-foreground/50">
        <GripVertical className="size-3 text-background" />
      </div>
    </div>
  )
}

function BottomDragHandle({
  onDrag,
  onDragStart,
  onDragEnd,
}: {
  onDrag: (deltaY: number) => void
  onDragStart?: () => void
  onDragEnd?: () => void
}) {
  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      onDragStart?.()
      const startY = e.clientY
      const onMouseMove = (moveEvent: MouseEvent) => {
        onDrag(moveEvent.clientY - startY)
      }
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseup", onMouseUp)
        document.body.style.cursor = ""
        document.body.style.userSelect = ""
        onDragEnd?.()
      }
      document.body.style.cursor = "row-resize"
      document.body.style.userSelect = "none"
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseup", onMouseUp)
    },
    [onDrag, onDragStart, onDragEnd]
  )

  return (
    <div
      onMouseDown={handleMouseDown}
      className="z-20 flex h-4 w-full cursor-row-resize items-center justify-center opacity-60 transition-opacity hover:opacity-100"
    >
      <div className="flex h-[6px] w-8 items-center justify-center rounded-full bg-muted-foreground/50">
        <GripHorizontal className="size-3 text-background" />
      </div>
    </div>
  )
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
  const [containerRect, setContainerRect] = React.useState<DOMRect | null>(null)
  const [previewSize, setPreviewSize] = React.useState<PreviewSize>("desktop")
  const [orientation, setOrientation] = React.useState<Orientation>("portrait")
  const [customWidth, setCustomWidth] = React.useState<number | null>(null)
  const [customHeight, setCustomHeight] = React.useState<number | null>(null)
  const [view, setView] = React.useState<"preview" | "code">("preview")
  const [isDragging, setIsDragging] = React.useState(false)

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

  // Iframe src only depends on block ID
  const iframeSrc = `/view/new-york-v4/${selectedBlockId}`

  // Send initial params when iframe loads
  const paramsRef = React.useRef(params)
  paramsRef.current = params

  React.useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    const onLoad = () => {
      sendToIframe(iframe, "design-system-params", paramsRef.current)
    }
    iframe.addEventListener("load", onLoad)
    return () => { iframe.removeEventListener("load", onLoad) }
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
    return () => { window.removeEventListener("message", handleMessage) }
  }, [])

  // Apply dark/light theme to iframe only
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

  // Compute the actual preview dimensions
  const presetDims = previewSize !== "custom"
    ? PREVIEW_PRESETS[previewSize][orientation]
    : null

  const previewWidth = presetDims ? presetDims.width : (customWidth ?? 99999)
  const previewHeight = presetDims ? presetDims.height : customHeight

  const maxWidth = containerRef.current?.offsetWidth ?? 1200
  const maxHeight = containerRef.current?.offsetHeight ?? 800
  const clampedWidth = Math.min(previewWidth, maxWidth)
  const clampedHeight = previewHeight !== null
    ? Math.min(previewHeight, maxHeight)
    : undefined

  const handlePresetClick = React.useCallback((size: Exclude<PreviewSize, "custom">) => {
    setPreviewSize(size)
    setView("preview")
  }, [])

  const handleCustomClick = React.useCallback(() => {
    setPreviewSize("custom")
    setView("preview")
  }, [])

  // Drag dimension refs — populated on drag start, reset on mouseup
  const startWidthRef = React.useRef(0)
  const startHeightRef = React.useRef(0)
  const maxWidthRef = React.useRef(0)
  const maxHeightRef = React.useRef(0)
  const customWidthRef = React.useRef(customWidth)
  customWidthRef.current = customWidth

  const handleDragStart = React.useCallback(() => {
    if (!containerRef.current) return
    const el = containerRef.current.querySelector("[data-preview-frame]") as HTMLElement
    startWidthRef.current = el?.offsetWidth ?? containerRef.current.offsetWidth
    startHeightRef.current = el?.offsetHeight ?? containerRef.current.offsetHeight
    maxWidthRef.current = containerRef.current.offsetWidth
    maxHeightRef.current = containerRef.current.offsetHeight
    // Capture current width when entering custom mode via height drag
    if (customWidthRef.current === null) {
      setCustomWidth(startWidthRef.current)
    }
    setIsDragging(true)
  }, [])

  const handleWidthDrag = React.useCallback((deltaX: number) => {
    const newWidth = Math.max(0, Math.min(maxWidthRef.current, startWidthRef.current + deltaX * 2))
    setCustomWidth(newWidth)
    setCustomHeight(startHeightRef.current)
    setPreviewSize("custom")
  }, [])

  const handleHeightDrag = React.useCallback((deltaY: number) => {
    const newHeight = Math.max(0, Math.min(maxHeightRef.current, startHeightRef.current + deltaY * 2))
    setCustomHeight(newHeight)
    setPreviewSize("custom")
  }, [])

  const handleDragEnd = React.useCallback(() => {
    setIsDragging(false)
  }, [])

  // Track container's viewport position (stable — only changes on resize, not drag)
  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setContainerRect(el.getBoundingClientRect())
    const ro = new ResizeObserver(update)
    ro.observe(el)
    update()
    return () => ro.disconnect()
  }, [])

  // Compute handle positions from container rect + clamped dimensions (same render cycle)
  const handlePositions = React.useMemo(() => {
    if (!containerRect) return null
    const w = clampedWidth
    const h = clampedHeight ?? containerRect.height
    const previewLeft = containerRect.left + (containerRect.width - w) / 2
    const previewTop = containerRect.top + (containerRect.height - h) / 2
    return {
      right: { top: previewTop, left: previewLeft + w + 2, height: h },
      bottom: { top: previewTop + h + 2, left: previewLeft, width: w },
    }
  }, [containerRect, clampedWidth, clampedHeight])

  // Reset start dimensions on mouseup
  React.useEffect(() => {
    const reset = () => {
      startWidthRef.current = 0
      startHeightRef.current = 0
      maxWidthRef.current = 0
      maxHeightRef.current = 0
    }
    document.addEventListener("mouseup", reset)
    return () => document.removeEventListener("mouseup", reset)
  }, [])

  return (
    <div className="relative flex min-h-0 flex-1 flex-col gap-3 overflow-hidden">
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
          <div
            className="hidden items-center gap-1 rounded-lg border border-foreground/10 p-1 md:flex"
            data-disabled={previewSize === "desktop" || previewSize === "custom"}
            style={{ opacity: previewSize === "desktop" || previewSize === "custom" ? 0.4 : 1, pointerEvents: previewSize === "desktop" || previewSize === "custom" ? "none" : undefined }}
          >
            <button
              onClick={() => setOrientation("portrait")}
              data-active={orientation === "portrait"}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
              title="Portrait"
            >
              <RectangleVertical className="size-3.5" />
            </button>
            <button
              onClick={() => setOrientation("landscape")}
              data-active={orientation === "landscape"}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
              title="Landscape"
            >
              <RectangleHorizontal className="size-3.5" />
            </button>
          </div>
          <div className="hidden items-center gap-1 rounded-lg border border-foreground/10 p-1 md:flex">
            <button
              onClick={() => handlePresetClick("desktop")}
              data-active={previewSize === "desktop"}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
              title="Desktop"
            >
              <Monitor className="size-3.5" />
            </button>
            <button
              onClick={() => handlePresetClick("tablet")}
              data-active={previewSize === "tablet"}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
              title="Tablet"
            >
              <Tablet className="size-3.5" />
            </button>
            <button
              onClick={() => handlePresetClick("mobile")}
              data-active={previewSize === "mobile"}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
              title="Mobile"
            >
              <Smartphone className="size-3.5" />
            </button>
            {customWidth !== null && (
              <button
                onClick={handleCustomClick}
                data-active={previewSize === "custom"}
                className="rounded-md px-1.5 py-1 text-[10px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
                title={`Custom (${Math.round(customWidth)}${customHeight !== null ? ` × ${Math.round(customHeight)}` : 'px'})`}
              >
                {Math.round(customWidth)}{customHeight !== null ? ` × ${Math.round(customHeight)}` : 'px'}
              </button>
            )}
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
      <div
        ref={containerRef}
        className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl ring ring-foreground/10 md:ring-muted dark:ring-foreground/10"
      >
        {view === "preview" ? (
          <div className="relative flex w-full min-h-0 flex-1 items-center justify-center bg-zinc-950/50">
            <div className="absolute inset-0 [background-image:radial-gradient(var(--color-muted-foreground)_0.5px,transparent_0.5px)] [background-size:20px_20px] opacity-30" />
            <div
              className={`relative z-10 ${isDragging ? '' : 'transition-[width,height] duration-300 ease-in-out'} ${clampedHeight === undefined && !isDragging ? 'h-full' : ''}`}
              style={{
                width: clampedWidth,
                ...(clampedHeight !== undefined || isDragging ? { height: clampedHeight ?? startHeightRef.current } : {}),
              }}
            >
              <div
                data-preview-frame=""
                className="h-full w-full overflow-hidden rounded-lg border shadow-xl"
              >
                <iframe
                  key={iframeSrc}
                  ref={iframeRef}
                  src={iframeSrc}
                  className="h-full w-full bg-background"
                  style={isDragging ? { pointerEvents: "none" } : undefined}
                  title="Preview"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 overflow-hidden bg-zinc-950">
            <CodeViewer blockId={selectedBlockId} />
          </div>
        )}
      </div>
      {handlePositions && view === "preview" && createPortal(
        <>
          <div
            className="fixed z-50"
            style={handlePositions.right}
          >
            <DragHandle onDrag={handleWidthDrag} onDragStart={handleDragStart} onDragEnd={handleDragEnd} />
          </div>
          <div
            className="fixed z-50"
            style={handlePositions.bottom}
          >
            <BottomDragHandle onDrag={handleHeightDrag} onDragStart={handleDragStart} onDragEnd={handleDragEnd} />
          </div>
        </>,
        document.body
      )}
    </div>
  )
}
