"use client"

import * as React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york-v4/ui/select"
import { InlinePreview } from "@/components/docs/inline-preview"

export function SelectDemoPreview() {
  return (
    <InlinePreview
      code={`<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select format" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="jpeg">JPEG</SelectItem>
    <SelectItem value="raw">RAW</SelectItem>
    <SelectItem value="tiff">TIFF</SelectItem>
  </SelectContent>
</Select>`}
    >
      <Select>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select format" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="jpeg">JPEG</SelectItem>
          <SelectItem value="raw">RAW</SelectItem>
          <SelectItem value="tiff">TIFF</SelectItem>
        </SelectContent>
      </Select>
    </InlinePreview>
  )
}
