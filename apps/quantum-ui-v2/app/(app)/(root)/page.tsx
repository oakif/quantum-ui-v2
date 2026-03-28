import { type Metadata } from "next"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

import { RootComponents } from "./components"

const title = "Quantum UI"
const description =
  "Internal design system built on shadcn/ui. Browse components, experiment in the studio, and make them your own."

export const dynamic = "force-static"
export const revalidate = false

export const metadata: Metadata = {
  title,
  description,
}

export default function IndexPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader>
        <PageHeaderHeading className="max-w-4xl">{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
      </PageHeader>
      <div className="container-wrapper flex-1 section-soft pb-6">
        <div className="container overflow-hidden">
          <section className="theme-container">
            <RootComponents />
          </section>
        </div>
      </div>
    </div>
  )
}
