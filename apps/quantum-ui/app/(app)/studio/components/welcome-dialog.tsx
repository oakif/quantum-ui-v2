"use client"

import * as React from "react"

import { Icons } from "@/components/icons"
import { Button } from "@/styles/base-nova/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/styles/base-nova/ui/dialog"

const STORAGE_KEY = "quantum-studio-welcome"

export function WelcomeDialog() {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) {
      setIsOpen(true)
    }
  }, [])

  // Stable callback — avoids re-creation on every render. (rerender-functional-setstate)
  const handleOpenChange = React.useCallback((open: boolean) => {
    setIsOpen(open)
    if (!open) {
      localStorage.setItem(STORAGE_KEY, "true")
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="dialog-ring max-w-92 min-w-0 gap-0 overflow-hidden rounded-xl p-0 sm:max-w-sm dark:bg-neutral-900"
      >
        <div className="flex aspect-[2/1.2] w-full items-center justify-center rounded-t-xl bg-neutral-950 text-center text-neutral-100 sm:aspect-2/1">
          <div className="font-mono text-2xl font-bold">
            <Icons.logo className="size-12" />
          </div>
        </div>
        <DialogHeader className="gap-1 p-4">
          <DialogTitle className="text-left text-base">
            Welcome to Quantum UI Studio
          </DialogTitle>
          <DialogDescription className="text-left leading-relaxed text-foreground">
            Browse composed UI blocks, tune your design tokens, and see
            changes in real time. Pick a block from the dropdown above to
            get started.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="m-0">
          <DialogClose render={<Button className="w-full" />}>
            Start Exploring
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
