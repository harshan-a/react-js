export function formatMoney(costCents) {
  return costCents < 0 
    ? `-$${(costCents / -100).toFixed(2)}`
    : `$${(costCents / 100).toFixed(2)}`
}