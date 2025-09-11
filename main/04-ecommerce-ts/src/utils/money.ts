export function formatMoney(costCents: number): string {
  return costCents < 0 
    ? `-$${(costCents / -100).toFixed(2)}`
    : `$${(costCents / 100).toFixed(2)}`
}