import { describe, expect, it } from "vitest"
import { cn } from "./utils"

describe("cn", () => {
  it("joins plain class strings", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1")
  })

  it("drops falsy values", () => {
    expect(cn("px-2", false, null, undefined, "py-1")).toBe("px-2 py-1")
  })

  it("applies conditional classes from objects", () => {
    expect(cn("base", { active: true, hidden: false })).toBe("base active")
  })

  it("merges conflicting Tailwind classes, keeping the last one", () => {
    expect(cn("px-2", "px-4")).toBe("px-4")
    expect(cn("text-sm text-red-500", "text-lg")).toBe("text-red-500 text-lg")
  })

  it("merges arrays of class values", () => {
    expect(cn(["px-2", "py-1"], "font-bold")).toBe("px-2 py-1 font-bold")
  })

  it("returns an empty string when given nothing usable", () => {
    expect(cn()).toBe("")
    expect(cn(false, null, undefined)).toBe("")
  })
})
