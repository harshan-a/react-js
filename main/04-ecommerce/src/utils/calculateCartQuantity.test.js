import { describe, it, expect } from "vitest"
import { calculateCartQuantity } from "./calculateCartQuantity" 

describe("calculatCartQuantity", () => {
  it("gives the correct cart quantity", () => {
    
    expect(
      calculateCartQuantity([{quantity: 10}, {quantity: 4}])
    ).toBe(14)
    expect(
      calculateCartQuantity([{quantity: 3}, {quantity: 4}])
    ).toBe(7)
    expect(
      calculateCartQuantity([{quantity: 0}, {quantity: 4}])
    ).toBe(4)
  })

  it("gives 0 for empty cart", () => {
    expect(calculateCartQuantity([])).toBe(0)
  })
})