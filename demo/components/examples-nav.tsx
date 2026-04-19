"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/registry/new-york-v4/ui/scroll-area"

const examples = [
  {
    name: "Dashboard Example",
    href: "/examples/dashboard",
    hidden: false,
  },
  {
    name: "Tasks Example",
    href: "/examples/tasks",
    hidden: false,
  },
  {
    name: "Playground Example",
    href: "/examples/playground",
    hidden: false,
  },
  {
    name: "Authentication Example",
    href: "/examples/authentication",
    hidden: false,
  },
  {
    name: "RTL Layout Example",
    href: "/examples/rtl",
    hidden: false,
  },
]

export function ExamplesNav({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const pathname = usePathname()

  return (
    <div className={cn("flex items-center", className)} {...props}>
      <ScrollArea className="max-w-[96%] md:max-w-[600px] lg:max-w-none">
        <div className="flex items-center">
          <ExampleLink
            example={{ name: "Examples", href: "/", code: "", hidden: false }}
            isActive={pathname === "/"}
          />
          {examples.map((example) => (
            <ExampleLink
              key={example.href}
              example={example}
              isActive={pathname?.startsWith(example.href) ?? false}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  )
}

function ExampleLink({
  example,
  isActive,
}: {
  example: (typeof examples)[number]
  isActive: boolean
}) {
  if (example.hidden) {
    return null
  }

  return (
    <Link
      href={example.href}
      key={example.href}
      className="flex h-7 items-center justify-center gap-2 px-4 text-center text-base font-medium text-muted-foreground transition-colors hover:text-primary data-[active=true]:text-primary"
      data-active={isActive}
    >
      {example.name}
    </Link>
  )
}
