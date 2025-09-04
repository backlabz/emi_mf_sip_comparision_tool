function calculateMFValue(monthlyInvestment, rate, months) {
  const monthlyRate = (1 + rate / 100) ** (1 / 12) - 1;
  return monthlyInvestment * ((1 + monthlyRate) ** months - 1) / monthlyRate;
}

function calculateInitialMFValue(initialInvestment, rate, months) {
  const monthlyRate = (1 + rate / 100) ** (1 / 12) - 1;
  return initialInvestment * (1 + monthlyRate) ** months;
}
