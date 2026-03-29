"use client"

import { getPresetCode } from "@/app/(app)/studio/lib/preset-code"
import { useDesignSystemSearchParams } from "@/app/(app)/studio/lib/search-params"

// Returns the canonical preset code derived from the current search params.
export function usePresetCode() {
  const [params] = useDesignSystemSearchParams()

  return getPresetCode(params)
}
