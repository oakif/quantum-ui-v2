import * as React from "react"

import { cn } from "@ui/lib/utils"

export interface ScrollFadeProps extends React.ComponentPropsWithoutRef<"div"> {
  wrapperClassName?: string
  orientation?: "horizontal" | "vertical"
  fadeMode?: "position" | "edge"
  intensity?: number
  scrollToEnd?: boolean
  trigger?: unknown
}

export function ScrollFade({
  className,
  wrapperClassName,
  orientation = "horizontal",
  fadeMode = "position",
  intensity = 64,
  scrollToEnd = false,
  trigger,
  style,
  children,
  ...props
}: ScrollFadeProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const startOverlayRef = React.useRef<HTMLDivElement>(null)
  const endOverlayRef = React.useRef<HTMLDivElement>(null)
  const hasAutoScrolledRef = React.useRef(false)
  const isHorizontal = orientation === "horizontal"

  const updateFades = React.useCallback(() => {
    const el = scrollRef.current
    const startEl = startOverlayRef.current
    const endEl = endOverlayRef.current
    if (!el || !startEl || !endEl) return

    let startOpacity: number
    let endOpacity: number
    const scrollPos = isHorizontal ? el.scrollLeft : el.scrollTop
    const maxScroll = isHorizontal
      ? el.scrollWidth - el.clientWidth
      : el.scrollHeight - el.clientHeight

    if (fadeMode === "edge") {
      startOpacity = scrollPos > 2 ? 1 : 0
      endOpacity = maxScroll - scrollPos > 2 ? 1 : 0
    } else {
      startOpacity = Math.min(scrollPos / intensity, 1)
      endOpacity = Math.min((maxScroll - scrollPos) / intensity, 1)
    }

    startEl.style.opacity = String(startOpacity)
    endEl.style.opacity = String(endOpacity)
  }, [isHorizontal, fadeMode, intensity])

  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const tryScrollToEnd = () => {
      if (!scrollToEnd || hasAutoScrolledRef.current) return
      const canScroll = isHorizontal
        ? el.scrollWidth > el.clientWidth
        : el.scrollHeight > el.clientHeight
      if (canScroll) {
        if (isHorizontal) el.scrollLeft = el.scrollWidth
        else el.scrollTop = el.scrollHeight
        hasAutoScrolledRef.current = true
      }
    }

    tryScrollToEnd()
    updateFades()

    const onScroll = () => {
      hasAutoScrolledRef.current = true
      updateFades()
    }

    el.addEventListener("scroll", onScroll, { passive: true })
    const ro = new ResizeObserver(() => { tryScrollToEnd(); updateFades() })
    ro.observe(el)

    return () => {
      el.removeEventListener("scroll", onScroll)
      ro.disconnect()
    }
  }, [updateFades, scrollToEnd, isHorizontal])

  // Re-check fades when trigger changes (e.g. parent becomes visible after animation)
  React.useEffect(() => {
    if (trigger === undefined) return
    const raf = requestAnimationFrame(() => requestAnimationFrame(updateFades))
    return () => cancelAnimationFrame(raf)
  }, [trigger, updateFades])

  return (
    <div
      className={cn(
        "scroll-fade-wrapper",
        isHorizontal ? "scroll-fade-wrapper-x" : "scroll-fade-wrapper-y",
        wrapperClassName,
      )}
      style={{ "--scroll-fade-size": `${Math.max(intensity, 0)}px`, ...style } as React.CSSProperties}
    >
      <div
        ref={startOverlayRef}
        className={cn("scroll-fade-overlay", isHorizontal ? "scroll-fade-overlay-x-start" : "scroll-fade-overlay-y-start")}
        aria-hidden
      />
      <div
        ref={scrollRef}
        className={cn(isHorizontal ? "scroll-fade-x" : "scroll-fade-y", className)}
        {...props}
      >
        {children}
      </div>
      <div
        ref={endOverlayRef}
        className={cn("scroll-fade-overlay", isHorizontal ? "scroll-fade-overlay-x-end" : "scroll-fade-overlay-y-end")}
        aria-hidden
      />
    </div>
  )
}
