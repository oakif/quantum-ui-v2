"use client"

import * as React from "react"
import { Monitor, Smartphone, Tablet } from "lucide-react"
import { type PanelImperativeHandle } from "react-resizable-panels"

import { CMD_K_FORWARD_TYPE } from "@/app/(app)/studio/components/action-menu"
import {
  BlockSelector,
  type BlockGroup,
} from "@/app/(app)/studio/components/block-selector"
import {
  REDO_FORWARD_TYPE,
  UNDO_FORWARD_TYPE,
} from "@/app/(app)/studio/components/history-buttons"
import { DARK_MODE_FORWARD_TYPE } from "@/app/(app)/studio/components/mode-switcher"
import { RANDOMIZE_FORWARD_TYPE } from "@/app/(app)/studio/components/random-button"
import { sendToIframe } from "@/app/(app)/studio/hooks/use-iframe-sync"
import { RESET_FORWARD_TYPE } from "@/app/(app)/studio/hooks/use-reset"
import {
  serializeDesignSystemSearchParams,
  useDesignSystemSearchParams,
} from "@/app/(app)/studio/lib/search-params"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/new-york-v4/ui/resizable"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york-v4/ui/tabs"

// Hoisted — avoids recreating on every message event. (js-hoist-regexp)
const MAC_REGEX = /Mac|iPhone|iPad|iPod/

// Hoisted — only uses module-level constants, no component state. (rendering-hoist-jsx)
function handleMessage(event: MessageEvent) {
  if (
    typeof window === "undefined" ||
    event.origin !== window.location.origin
  ) {
    return
  }

  const type = event.data.type
  if (type === CMD_K_FORWARD_TYPE) {
    const isMac = MAC_REGEX.test(navigator.userAgent)
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: event.data.key || "k",
        metaKey: isMac,
        ctrlKey: !isMac,
        bubbles: true,
        cancelable: true,
      })
    )
  } else if (type === RANDOMIZE_FORWARD_TYPE) {
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: event.data.key || "r",
        bubbles: true,
        cancelable: true,
      })
    )
  } else if (type === UNDO_FORWARD_TYPE) {
    const isMac = MAC_REGEX.test(navigator.userAgent)
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "z",
        metaKey: isMac,
        ctrlKey: !isMac,
        bubbles: true,
        cancelable: true,
      })
    )
  } else if (type === REDO_FORWARD_TYPE) {
    const isMac = MAC_REGEX.test(navigator.userAgent)
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "z",
        shiftKey: true,
        metaKey: isMac,
        ctrlKey: !isMac,
        bubbles: true,
        cancelable: true,
      })
    )
  } else if (type === RESET_FORWARD_TYPE) {
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "R",
        shiftKey: true,
        bubbles: true,
        cancelable: true,
      })
    )
  } else if (type === DARK_MODE_FORWARD_TYPE) {
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

const PREVIEW_SIZE_PERCENTAGES: Record<PreviewSize, number> = {
  desktop: 100,
  tablet: 60,
  mobile: 30,
}

export function Preview({ blockGroups }: { blockGroups: BlockGroup[] }) {
  const [params] = useDesignSystemSearchParams()
  const iframeRef = React.useRef<HTMLIFrameElement>(null)
  const resizablePanelRef = React.useRef<PanelImperativeHandle>(null)
  const [selectedBlockId, setSelectedBlockId] = React.useState(
    blockGroups[0]?.blocks[0]?.id ?? ""
  )
  const [previewSize, setPreviewSize] = React.useState<PreviewSize>("desktop")
  const [view, setView] = React.useState<"preview" | "code">("preview")

  React.useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) {
      return
    }

    const sendParams = () => {
      sendToIframe(iframe, "design-system-params", params)
    }

    if (iframe.contentWindow) {
      sendParams()
    }

    iframe.addEventListener("load", sendParams)
    return () => {
      iframe.removeEventListener("load", sendParams)
    }
  }, [params])

  React.useEffect(() => {
    window.addEventListener("message", handleMessage)
    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  const iframeSrc = React.useMemo(() => {
    if (selectedBlockId) {
      return `/view/new-york-v4/${selectedBlockId}`
    }
    // Fallback to the original preview route
    return serializeDesignSystemSearchParams(
      `/preview/${params.base}/${params.item}`,
      params
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBlockId, params.base, params.item])

  const handleResize = React.useCallback(
    (size: PreviewSize) => {
      setPreviewSize(size)
      setView("preview")
      resizablePanelRef.current?.resize(PREVIEW_SIZE_PERCENTAGES[size])
    },
    []
  )

  return (
    <div className="relative flex flex-1 flex-col gap-3 overflow-hidden">
      <div className="flex items-center justify-between gap-2">
        <BlockSelector
          groups={blockGroups}
          onSelect={setSelectedBlockId}
        />
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
          <div className="relative flex w-full flex-1 overflow-hidden bg-zinc-950/50">
            <div className="absolute inset-0 [background-image:radial-gradient(var(--color-muted-foreground)_0.5px,transparent_0.5px)] [background-size:20px_20px] opacity-30" />
            <ResizablePanelGroup
              orientation="horizontal"
              className="relative z-10 h-full"
            >
              <ResizablePanel
                panelRef={resizablePanelRef}
                className="relative overflow-hidden rounded-lg border shadow-xl"
                defaultSize={100}
                minSize={30}
              >
                <iframe
                  key={selectedBlockId || params.base + params.item}
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
          <div className="flex flex-1 items-center justify-center bg-muted/50 p-8 text-sm text-muted-foreground">
            Select a block to view its code
          </div>
        )}
      </div>
    </div>
  )
}
