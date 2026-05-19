"use client"

import { useState } from "react"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
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

export default function DrawerDemoPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader>
        <PageHeaderHeading>Drawer</PageHeaderHeading>
        <PageHeaderDescription>
          A bottom sheet powered by vaul, with composable Dialog stacking.
        </PageHeaderDescription>
      </PageHeader>
      <div className="container-wrapper flex-1 pb-12">
        <div className="container max-w-4xl space-y-12">
          <DefaultSection />
          <NestedSection />
          <AlwaysMountedSection />
        </div>
      </div>
    </div>
  )
}

function DefaultSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Default</h2>
      <p className="text-sm text-muted-foreground">
        Standard Drawer with vaul&rsquo;s built-in focus trap and scroll lock.
      </p>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Edit profile</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile and save when done.
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4">
              <Input placeholder="Display name" />
            </div>
            <DrawerFooter>
              <Button>Save</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </section>
  )
}

function NestedSection() {
  const [confirmOpen, setConfirmOpen] = useState(false)
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Nested with Dialog</h2>
      <p className="text-sm text-muted-foreground">
        Pass <code className="font-mono text-xs">nested</code> on Drawer and use{" "}
        <code className="font-mono text-xs">DrawerAction</code> to open a Dialog
        from inside. Backdrop and outside-click dismissal stay; the focus trap
        moves to the Dialog with no aria-hidden warning.
      </p>
      <Drawer nested>
        <DrawerTrigger asChild>
          <Button variant="outline">Open Nested Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Delete account</DrawerTitle>
              <DrawerDescription>
                You can confirm via a Dialog without losing the Drawer
                underneath.
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
              This action permanently removes the account. The input below
              should be focusable on first tap.
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
    </section>
  )
}

function AlwaysMountedSection() {
  const [editing, setEditing] = useState<{ name: string } | null>(null)
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Always-mounted (controlled)</h2>
      <p className="text-sm text-muted-foreground">
        Conditionally rendering the Drawer skips Radix&rsquo; exit animation.
        Always render the Drawer and drive it from state with{" "}
        <code className="font-mono text-xs">open={"{!!state}"}</code>.
      </p>
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
                The Drawer stays mounted, so the close animation runs even when
                the data source goes away.
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
    </section>
  )
}
