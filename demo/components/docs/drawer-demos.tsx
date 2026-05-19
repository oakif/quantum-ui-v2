"use client"

import { useState } from "react"

import { InlinePreview } from "@/components/docs/inline-preview"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/new-york-v4/ui/dialog"
import {
  Drawer,
  DrawerAction,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/new-york-v4/ui/drawer"
import { Input } from "@/registry/new-york-v4/ui/input"

export function DrawerDemoPreview() {
  return (
    <InlinePreview
      code={`<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Edit profile</DrawerTitle>
      <DrawerDescription>Make changes and save.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Save</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
    >
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Edit profile</DrawerTitle>
              <DrawerDescription>
                Make changes and save when done.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Save</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </InlinePreview>
  )
}

export function DrawerNestedPreview() {
  const [confirmOpen, setConfirmOpen] = useState(false)
  return (
    <InlinePreview
      code={`const [confirmOpen, setConfirmOpen] = useState(false)

<Drawer nested>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Nested Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerFooter>
      <DrawerAction asChild onClick={() => setConfirmOpen(true)}>
        <Button variant="destructive">Delete…</Button>
      </DrawerAction>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

<Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
  <DialogContent>
    <Input placeholder="Type to confirm" autoFocus />
  </DialogContent>
</Dialog>`}
    >
      <Drawer nested>
        <DrawerTrigger asChild>
          <Button variant="outline">Open Nested Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Delete account</DrawerTitle>
              <DrawerDescription>
                Confirm via a Dialog stacked on the Drawer.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerAction asChild onClick={() => setConfirmOpen(true)}>
                <Button variant="destructive">Delete&hellip;</Button>
              </DrawerAction>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm deletion</DialogTitle>
            <DialogDescription>
              The input below should be focusable on first tap.
            </DialogDescription>
          </DialogHeader>
          <Input placeholder='Type "delete" to confirm' autoFocus />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive">Delete</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </InlinePreview>
  )
}

export function DrawerAlwaysMountedPreview() {
  const [editing, setEditing] = useState<{ name: string } | null>(null)
  return (
    <InlinePreview
      code={`const [editing, setEditing] = useState<{ name: string } | null>(null)

<Button onClick={() => setEditing({ name: "Olivia" })}>Edit Olivia</Button>
<Button onClick={() => setEditing({ name: "Sam" })}>Edit Sam</Button>

<Drawer
  open={!!editing}
  onOpenChange={(next) => { if (!next) setEditing(null) }}
>
  <DrawerContent>
    <DrawerTitle>Editing {editing?.name ?? ""}</DrawerTitle>
  </DrawerContent>
</Drawer>`}
    >
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() => setEditing({ name: "Olivia" })}
        >
          Edit Olivia
        </Button>
        <Button variant="outline" onClick={() => setEditing({ name: "Sam" })}>
          Edit Sam
        </Button>
      </div>
      <Drawer
        open={!!editing}
        onOpenChange={(next) => {
          if (!next) setEditing(null)
        }}
      >
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Editing {editing?.name ?? ""}</DrawerTitle>
              <DrawerDescription>
                The Drawer stays mounted so the close animation plays.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Done</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </InlinePreview>
  )
}
