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

export const ScrollFade = React.forwardRef<HTMLDivElement, ScrollFadeProps>(function ScrollFade({
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
}, externalRef) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const startOverlayRef = React.useRef<HTMLDivElement>(null)
  const endOverlayRef = React.useRef<HTMLDivElement>(null)
  const hasAutoScrolledRef = React.useRef(false)
  const isHorizontal = orientation === "horizontal"

  // Merge external ref with internal scroll ref.
  const setScrollRef = (el: HTMLDivElement | null) => {
    scrollRef.current = el
    if (typeof externalRef === "function") externalRef(el)
    else if (externalRef) (externalRef as React.MutableRefObject<HTMLDivElement | null>).current = el
  }

  // Single effect that owns scrolling, fade updates, listeners, and re-renders on trigger.
  // useEffect (not useLayoutEffect) so the synchronous measurement + ResizeObserver
  // setup doesn't block paint. The first frame may render with both overlays at 0
  // opacity, but updateFades runs on the next tick before the user can perceive it.
  React.useEffect(() => {
    const el = scrollRef.current
    const startEl = startOverlayRef.current
    const endEl = endOverlayRef.current
    if (!el || !startEl || !endEl) return

    const updateFades = () => {
      const scrollPos = isHorizontal ? el.scrollLeft : el.scrollTop
      const maxScroll = isHorizontal
        ? el.scrollWidth - el.clientWidth
        : el.scrollHeight - el.clientHeight

      let startOpacity: number
      let endOpacity: number
      if (fadeMode === "edge") {
        startOpacity = scrollPos > 2 ? 1 : 0
        endOpacity = maxScroll - scrollPos > 2 ? 1 : 0
      } else {
        startOpacity = Math.min(scrollPos / intensity, 1)
        endOpacity = Math.min((maxScroll - scrollPos) / intensity, 1)
      }
      startEl.style.opacity = String(startOpacity)
      endEl.style.opacity = String(endOpacity)
      startEl.dataset.opacity = startOpacity.toFixed(2)
      endEl.dataset.opacity = endOpacity.toFixed(2)
    }

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
  }, [scrollToEnd, isHorizontal, fadeMode, intensity, trigger])

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
        ref={setScrollRef}
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
})
