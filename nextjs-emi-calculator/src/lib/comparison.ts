import { calculateEMI, calculateAmortization } from './loanCalculator';
import { calculateMFValue, calculateInitialMFValue } from './investmentCalculator';
import { calculatePropertyValue, calculateEquity } from './propertyCalculator';

export interface CalculatorInputs {
  principal: number;
  loanRate: number;
  tenure: number;
  propertyValue: number;
  downPayment: number;
  appRate: number;
  rental: number;
  mfRate: number;
  extraAmount: number;
  timePeriod?: number;
}

export interface ComparisonResult {
  option: string;
  propertyValue: number;
  outstandingLoan: number;
  equity: number;
  mfValue: number;
  netWealth: number;
  interestPaid: number;
  rentalIncome: number;
  totalOutflow: number;
}

export function compareOptions(inputs: CalculatorInputs): ComparisonResult[] {
  const { principal, loanRate, tenure, propertyValue, downPayment, appRate, rental, mfRate, extraAmount, timePeriod = 2 } = inputs;
  const emi = calculateEMI(principal, loanRate, tenure);
  const months = timePeriod * 12;
  const years = timePeriod;

  // Option A: Prepay EMI + extraAmount + Rental
  const optionA = calculateAmortization(principal, loanRate, tenure, emi, extraAmount, months);
  const propertyValueA = calculatePropertyValue(propertyValue, appRate, years);
  const equityA = calculateEquity(propertyValueA, optionA.balance, downPayment);
  const mfValueA = calculateMFValue(rental, mfRate, months);
  const netWealthA = equityA + mfValueA;

  // Option B: EMI + extraAmount in MF + Rental
  const optionB = calculateAmortization(principal, loanRate, tenure, emi, 0, months);
  const propertyValueB = calculatePropertyValue(propertyValue, appRate, years);
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
