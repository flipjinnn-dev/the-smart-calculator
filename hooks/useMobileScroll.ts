"use client"
import { RefObject } from "react"

export function useMobileScroll() {
  const scrollToRef = (ref: RefObject<HTMLElement>) => {
    if (typeof window !== "undefined" && window.innerWidth <= 768 && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }
  return scrollToRef
}
