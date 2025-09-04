// Form handling and calculations
document.getElementById('calculatorForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form values
  const inputs = {
    principal: parseFloat(document.getElementById('principal').value),
    loanRate: parseFloat(document.getElementById('loanRate').value),
    tenure: parseInt(document.getElementById('tenure').value),
    propertyValue: parseFloat(document.getElementById('propertyValue').value),
    downPayment: parseFloat(document.getElementById('downPayment').value),
    appRate: parseFloat(document.getElementById('appRate').value),
    rental: parseFloat(document.getElementById('rental').value),
    mfRate: parseFloat(document.getElementById('mfRate').value),
    extraAmount: parseFloat(document.getElementById('extraAmount').value),
    timePeriod: parseInt(document.getElementById('timePeriod').value) || 2,
    appreciationSaturation: document.getElementById('appreciationSaturation').value ?
      parseInt(document.getElementById('appreciationSaturation').value) : undefined
  };

  // Calculate results
  const resultsAtUserRate = compareOptions({ ...inputs, appRate: inputs.appRate });
  const resultsAtComparisonRate = compareOptions({ ...inputs, appRate: inputs.appRate + 3 });

  // Generate HTML for results
  const userRateTitle = `${inputs.appRate}% YoY Property Appreciation (${inputs.timePeriod} Years)`;
//   const comparisonRateTitle = `${(inputs.appRate + 3)}% YoY Property Appreciation (${inputs.timePeriod} Years)`;

  const resultsHTML = `
    ${generateTable(resultsAtUserRate, userRateTitle)}
  `;

  // Display results
  document.getElementById('results').innerHTML = resultsHTML;
  document.getElementById('results').classList.remove('hidden');
});

// Reset functionality
document.getElementById('resetBtn').addEventListener('click', function() {
  // Reset form
  document.getElementById('calculatorForm').reset();

  // Reset default values
  document.getElementById('principal').value = '2400000';
  document.getElementById('loanRate').value = '9';
  document.getElementById('tenure').value = '20';
  document.getElementById('propertyValue').value = '2600000';
  document.getElementById('downPayment').value = '200000';
  document.getElementById('appRate').value = '6';
  document.getElementById('rental').value = '8000';
  document.getElementById('mfRate').value = '10.5';
  document.getElementById('extraAmount').value = '50000';
  document.getElementById('timePeriod').value = '2';
  document.getElementById('appreciationSaturation').value = '';

  // Hide results
  document.getElementById('results').innerHTML = '';
  document.getElementById('results').classList.add('hidden');
});
