function calculatePropertyValue(initialValue, appreciationRate, years, saturationYears) {
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

function calculateEquity(propertyValue, loanBalance, downPayment) {
  return propertyValue - loanBalance;
}
