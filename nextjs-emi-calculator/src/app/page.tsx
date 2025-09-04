'use client';

import { useState } from 'react';
import InputForm from '@/components/InputForm';
import ResultsTable from '@/components/ResultsTable';
import { CalculatorInputs, ComparisonResult, compareOptions } from '@/lib/comparison';

export default function Home() {
  const [results, setResults] = useState<ComparisonResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [currentInputs, setCurrentInputs] = useState<CalculatorInputs | null>(null);

  const handleCalculate = (inputs: CalculatorInputs) => {
    const timePeriod = inputs.timePeriod || 2;
    const userAppRate = inputs.appRate || 6;

    // Use user's appreciation rate for first table
    const resultsAtUserRate = compareOptions({ ...inputs, appRate: userAppRate, timePeriod });

    // Use a comparison rate (user's rate + 3%) for second table
    const comparisonRate = userAppRate + 3;
    const resultsAtComparisonRate = compareOptions({ ...inputs, appRate: comparisonRate, timePeriod });

    setCurrentInputs(inputs);
    setResults(resultsAtUserRate);
    setShowResults(true);
  };

  const handleReset = () => {
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Home Loan & Investment Comparator
          </h1>
          <p className="text-lg text-gray-600">
            Compare loan prepayment strategies and investment options
          </p>
        </header>

        {/* Input Form */}
        <InputForm onCalculate={handleCalculate} onReset={handleReset} />

        {/* Results */}
        {showResults && currentInputs && (
          <div className="mt-12 space-y-12">
            <ResultsTable
              results={results}
              title={`${currentInputs.appRate || 6}% YoY Property Appreciation (${currentInputs.timePeriod || 2} Years)`}
              timePeriod={currentInputs.timePeriod || 2}
            />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p className="mb-2">
            <strong>Assumptions:</strong> Fixed rates, no taxes/fees, client-side calculations.
          </p>
          <p>
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}
