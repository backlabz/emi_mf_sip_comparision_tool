export function calculatePropertyValue(initialValue: number, appreciationRate: number, years: number, saturationYears?: number): number {
  if (!saturationYears || saturationYears >= years) {
    // No saturation or saturation period is longer than total years - apply full appreciation
    return initialValue * (1 + appreciationRate / 100) ** years;
  } else {
    // Apply appreciation for saturation period, then no more appreciation
    const valueAfterSaturation = initialValue * (1 + appreciationRate / 100) ** saturationYears;
    const remainingYears = years - saturationYears;
    // No appreciation for remaining years
    return valueAfterSaturation;
  }
}

export function calculateEquity(propertyValue: number, loanBalance: number, downPayment: number): number {
  return propertyValue - loanBalance;
}
