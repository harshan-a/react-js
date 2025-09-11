export type CartItem = {
  _id: string
  quantity: number
  product: Product | string
  deliveryOption: DeliveryOption | string
}

export type DeliveryOption = {
    _id: string
    deliveryDays: number
    priceCents: number,
    estimatedDeliveryTimeMs?: number
  }

export type Product = {
    _id: string
    image: string
    name: string
    rating: {
      stars: number
      count: number
    }
    priceCents: number
    keyword: string[]
  }

export type Order = {
  _id: string
  orderTimeMs: number
  totalCostCents: number
  products: {
    product: Product | string
    quantity: number
    estimatedDeliveryTimeMs: number
  }[]
}
export type PaymentSummaryData = {
  totalItems: number
  productCostCents: number
  shippingCostCents: number
  totalCostBeforeTaxCents: number
  taxCents: number
  totalCostCents: number
}

export type Cart = CartItem[]
export type Orders = Order[]
export type Products = Product[]
export type DeliveryOptions = DeliveryOption[]
export type LoadCart = () => Promise<void>

