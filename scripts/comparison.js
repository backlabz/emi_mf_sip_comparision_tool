function compareOptions(inputs) {
  const { principal, loanRate, tenure, propertyValue, downPayment, appRate, rental, mfRate, extraAmount, timePeriod = 2, appreciationSaturation } = inputs;
  const emi = calculateEMI(principal, loanRate, tenure);
  const months = timePeriod * 12;
  const years = timePeriod;

  // Option A: Prepay EMI + extraAmount + Rental
  const optionA = calculateAmortization(principal, loanRate, tenure, emi, extraAmount, months);
  const propertyValueA = calculatePropertyValue(propertyValue, appRate, years, appreciationSaturation);
  const equityA = calculateEquity(propertyValueA, optionA.balance, downPayment);
  const mfValueA = calculateMFValue(rental, mfRate, months);
  const netWealthA = equityA + mfValueA;

  // Option B: EMI + extraAmount in MF + Rental
  const optionB = calculateAmortization(principal, loanRate, tenure, emi, 0, months);
  const propertyValueB = calculatePropertyValue(propertyValue, appRate, years, appreciationSaturation);
  const equityB = calculateEquity(propertyValueB, optionB.balance, downPayment);
  const mfValueB = calculateMFValue(extraAmount + rental, mfRate, months);
  const netWealthB = equityB + mfValueB;

  // Option C: No Loan, All in MF
  const mfValueC = calculateInitialMFValue(downPayment, mfRate, months) + calculateMFValue(emi + extraAmount, mfRate, months);
  const netWealthC = mfValueC;

  // Generate table data
  return [
    {
      option: 'Option A (Prepay + Rental)',
      propertyValue: propertyValueA,
      outstandingLoan: optionA.balance,
      equity: equityA,
      mfValue: mfValueA,
      netWealth: netWealthA,
      interestPaid: optionA.interestPaid,
      rentalIncome: rental * months,
      totalOutflow: downPayment + (emi * months + extraAmount * months)
    },
    {
      option: 'Option B (EMI + MF + Rental)',
      propertyValue: propertyValueB,
      outstandingLoan: optionB.balance,
      equity: equityB,
      mfValue: mfValueB,
      netWealth: netWealthB,
      interestPaid: optionB.interestPaid,
      rentalIncome: rental * months,
      totalOutflow: downPayment + (emi * months + extraAmount * months)
    },
    {
      option: 'Option C (No Loan, All MF)',
      propertyValue: 0,
      outstandingLoan: 0,
      equity: 0,
      mfValue: mfValueC,
      netWealth: mfValueC,
      interestPaid: 0,
      rentalIncome: 0,
      totalOutflow: downPayment + (emi + extraAmount) * months
    }
  ];
}

function generateTable(results, title) {
  let html = `<div class="mt-8">
    <h3 class="text-xl font-semibold mb-4 text-center text-gray-800">${title}</h3>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
        <thead>
          <tr class="bg-gray-50">
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Metric</th>`;

  results.forEach((result, index) => {
    html += `<th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">${result.option}</th>`;
  });

  html += `</tr></thead><tbody>`;

  const metrics = [
    { key: 'propertyValue', label: 'Property Value (₹)' },
    { key: 'outstandingLoan', label: 'Outstanding Loan (₹)' },
    { key: 'equity', label: 'Equity in Property (₹)' },
    { key: 'mfValue', label: 'MF Value (₹)' },
    { key: 'netWealth', label: 'Net Wealth (₹)' },
    { key: 'interestPaid', label: 'Interest Paid (₹)' },
    { key: 'rentalIncome', label: 'Rental Income (₹)' },
    { key: 'totalOutflow', label: 'Total Cash Outflow (₹)' },
  ];

  metrics.forEach((metric, metricIndex) => {
    const rowClass = metricIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50';
    html += `<tr class="${rowClass}">
      <td class="px-4 py-3 text-sm font-medium text-gray-900 border-b">${metric.label}</td>`;

    results.forEach((result) => {
      const value = Math.round(result[metric.key] || 0);
      const formattedValue = new Intl.NumberFormat('en-IN').format(value);
      html += `<td class="px-4 py-3 text-sm text-gray-900 border-b">₹${formattedValue}</td>`;
    });

    html += `</tr>`;
  });

  html += `</tbody></table></div>`;

  // Summary Cards
  html += `<div class="grid md:grid-cols-3 gap-4 mt-6">`;
  results.forEach((result) => {
    const netWealth = Math.round(result.netWealth);
    const formattedNetWealth = new Intl.NumberFormat('en-IN').format(netWealth);

    html += `<div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
      <h4 class="font-semibold text-gray-800 mb-2 text-center">${result.option}</h4>
      <div class="text-center">
        <div class="text-2xl font-bold text-green-600 mb-1">₹${formattedNetWealth}</div>
        <div class="text-sm text-gray-600">Net Wealth</div>
      </div>
    </div>`;
  });

  html += `</div></div>`;

  return html;
}
