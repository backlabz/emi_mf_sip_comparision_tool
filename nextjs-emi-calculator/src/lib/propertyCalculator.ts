export function calculatePropertyValue(initialValue: number, appreciationRate: number, years: number): number {
  return initialValue * (1 + appreciationRate / 100) ** years;
}

export function calculateEquity(propertyValue: number, loanBalance: number, downPayment: number): number {
  return propertyValue - loanBalance;
}
