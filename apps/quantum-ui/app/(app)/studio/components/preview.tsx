"use client"

import * as React from "react"
import { Monitor, Smartphone, Tablet } from "lucide-react"

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

const PREVIEW_SIZE_WIDTHS: Record<PreviewSize, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
}

export function Preview({ blockGroups }: { blockGroups: BlockGroup[] }) {
  const [params] = useDesignSystemSearchParams()
  const iframeRef = React.useRef<HTMLIFrameElement>(null)
  const [selectedBlockId, setSelectedBlockId] = React.useState(
    blockGroups[0]?.blocks[0]?.id ?? ""
  )
  const [previewSize, setPreviewSize] = React.useState<PreviewSize>("desktop")

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

  return (
    <div className="relative flex flex-1 flex-col gap-3 overflow-hidden">
      <div className="flex items-center justify-between gap-2">
        <BlockSelector
          groups={blockGroups}
          onSelect={setSelectedBlockId}
        />
        <div className="hidden items-center gap-1 rounded-lg border border-foreground/10 p-1 md:flex">
          <button
            onClick={() => setPreviewSize("desktop")}
            data-active={previewSize === "desktop"}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
            title="Desktop"
          >
            <Monitor className="size-3.5" />
          </button>
          <button
            onClick={() => setPreviewSize("tablet")}
            data-active={previewSize === "tablet"}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
            title="Tablet"
          >
            <Tablet className="size-3.5" />
          </button>
          <button
            onClick={() => setPreviewSize("mobile")}
            data-active={previewSize === "mobile"}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
            title="Mobile"
          >
            <Smartphone className="size-3.5" />
          </button>
        </div>
      </div>
      <div className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-2xl ring ring-foreground/10 md:ring-muted dark:ring-foreground/10">
        <div className="relative z-0 mx-auto flex w-full flex-1 flex-col items-center overflow-hidden">
          <div className="absolute inset-0 bg-muted dark:bg-muted/30" />
          <iframe
            key={selectedBlockId || params.base + params.item}
            ref={iframeRef}
            src={iframeSrc}
            className="z-10 h-full flex-1 transition-[width] duration-200"
            style={{ width: PREVIEW_SIZE_WIDTHS[previewSize] }}
            title="Preview"
          />
        </div>
      </div>
    </div>
  )
}
