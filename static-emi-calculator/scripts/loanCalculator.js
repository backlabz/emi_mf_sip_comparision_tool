function calculateEMI(principal, rate, tenureYears) {
  const monthlyRate = rate / 12 / 100;
  const tenureMonths = tenureYears * 12;
  return principal * monthlyRate * (1 + monthlyRate) ** tenureMonths / ((1 + monthlyRate) ** tenureMonths - 1);
}

function calculateAmortization(principal, rate, tenureYears, emi, extraPrepayment = 0, months = 24) {
  let balance = principal;
  let interestPaid = 0;
  let principalPaid = 0;
  const monthlyRate = rate / 12 / 100;
  const amortization = [];

  for (let month = 1; month <= months && balance > 0; month++) {
    const interest = balance * monthlyRate;
    const principalPayment = Math.min(emi + extraPrepayment - interest, balance);
    balance -= principalPayment;
    interestPaid += interest;
    principalPaid += principalPayment;
    amortization.push({ month, balance, interest, principalPayment });
  }

  return { balance, interestPaid, principalPaid, amortization };
}
