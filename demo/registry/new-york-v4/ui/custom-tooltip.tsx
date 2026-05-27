"use client"

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

export type CustomTooltipProps = {
  content: ReactNode
  children: ReactNode
  side?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
  offset?: number
  delay?: number
  open?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}

type Position = {
  top: number
  left: number
}

// Global coordination: when a tooltip opens, all others dismiss immediately.
const dismissListeners = new Set<() => void>()

function dismissOtherTooltips(except: () => void) {
  for (const listener of dismissListeners) {
    if (listener !== except) listener()
  }
}

export function CustomTooltip({
  content,
  children,
  side = "top",
  align = "center",
  offset = 8,
  delay = 0,
  open,
  onOpenChange,
  disabled = false,
  className,
  style: triggerStyle,
}: CustomTooltipProps) {
  const triggerRef = useRef<HTMLSpanElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 })
  const timerRef = useRef<number | null>(null)
  const fadeTimerRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  const isControlled = open !== undefined
  const isOpen = isControlled ? open : uncontrolledOpen

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  const handleOpen = useCallback(() => {
    if (disabled) return
    if (timerRef.current) window.clearTimeout(timerRef.current)
    if (delay > 0) {
      timerRef.current = window.setTimeout(() => setOpen(true), delay)
    } else {
      setOpen(true)
    }
  }, [delay, disabled, setOpen])

  const handleClose = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    setOpen(false)
  }, [setOpen])

  const dismiss = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setVisible(false)
    setMounted(false)
    setOpen(false)
  }, [setOpen])

  useEffect(() => {
    dismissListeners.add(dismiss)
    return () => {
      dismissListeners.delete(dismiss)
    }
  }, [dismiss])

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
      if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (isOpen && !disabled) {
      dismissOtherTooltips(dismiss)
      setMounted(true)
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = requestAnimationFrame(() => {
          setVisible(true)
        })
      })
    } else {
      setVisible(false)
      fadeTimerRef.current = window.setTimeout(() => setMounted(false), 200)
    }
  }, [isOpen, disabled, dismiss])

  useLayoutEffect(() => {
    if (!mounted || !triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const padding = 8

    const getAlignedLeft = () => {
      if (align === "start") return triggerRect.left
      if (align === "end") return triggerRect.right - tooltipRect.width
      return triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
    }

    const getAlignedTop = () => {
      if (align === "start") return triggerRect.top
      if (align === "end") return triggerRect.bottom - tooltipRect.height
      return triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
    }

    let top = 0
    let left = 0
    let resolvedSide = side

    const fitsTop = triggerRect.top - tooltipRect.height - offset > padding
    const fitsBottom =
      triggerRect.bottom + tooltipRect.height + offset <
      window.innerHeight - padding
    const fitsLeft = triggerRect.left - tooltipRect.width - offset > padding
    const fitsRight =
      triggerRect.right + tooltipRect.width + offset <
      window.innerWidth - padding

    if (side === "top" && !fitsTop && fitsBottom) resolvedSide = "bottom"
    if (side === "bottom" && !fitsBottom && fitsTop) resolvedSide = "top"
    if (side === "left" && !fitsLeft && fitsRight) resolvedSide = "right"
    if (side === "right" && !fitsRight && fitsLeft) resolvedSide = "left"

    switch (resolvedSide) {
      case "bottom":
        top = triggerRect.bottom + offset
        left = getAlignedLeft()
        break
      case "left":
        top = getAlignedTop()
        left = triggerRect.left - tooltipRect.width - offset
        break
      case "right":
        top = getAlignedTop()
        left = triggerRect.right + offset
        break
      default:
        top = triggerRect.top - tooltipRect.height - offset
        left = getAlignedLeft()
    }

    const maxLeft = window.innerWidth - tooltipRect.width - padding
    const maxTop = window.innerHeight - tooltipRect.height - padding
    left = Math.min(Math.max(left, padding), maxLeft)
    top = Math.min(Math.max(top, padding), maxTop)

    setPosition({ top, left })
  }, [align, mounted, visible, offset, side])

  return (
    <span
      ref={triggerRef}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={handleClose}
      style={triggerStyle}
    >
      {children}
      {mounted
        ? createPortal(
            <div
              ref={tooltipRef}
              className={cn(
                "pointer-events-none fixed z-50 max-w-70 rounded-md border border-border/50 bg-card/80 px-3 py-1.5 text-xs text-card-foreground shadow-lg backdrop-blur-xl transition-opacity duration-150",
                visible ? "opacity-100" : "opacity-0",
                className
              )}
              style={{ top: position.top, left: position.left }}
            >
              {content}
            </div>,
            document.body
          )
        : null}
    </span>
  )
}
