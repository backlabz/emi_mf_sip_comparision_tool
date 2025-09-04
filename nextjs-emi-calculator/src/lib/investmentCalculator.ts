export function calculateMFValue(monthlyInvestment: number, rate: number, months: number): number {
  const monthlyRate = (1 + rate / 100) ** (1 / 12) - 1;
  return monthlyInvestment * ((1 + monthlyRate) ** months - 1) / monthlyRate;
}

export function calculateInitialMFValue(initialInvestment: number, rate: number, months: number): number {
  const monthlyRate = (1 + rate / 100) ** (1 / 12) - 1;
  return initialInvestment * (1 + monthlyRate) ** months;
}
