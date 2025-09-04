'use client';

import { useState } from 'react';
import InputForm from '@/components/InputForm';
import ResultsTable from '@/components/ResultsTable';
import { CalculatorInputs, ComparisonResult, compareOptions } from '@/lib/comparison';

export default function Home() {
  const [results6, setResults6] = useState<ComparisonResult[]>([]);
  const [results12, setResults12] = useState<ComparisonResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = (inputs: CalculatorInputs) => {
    const resultsAt6 = compareOptions({ ...inputs, appRate: 6 });
    const resultsAt12 = compareOptions({ ...inputs, appRate: 12 });

    setResults6(resultsAt6);
    setResults12(resultsAt12);
    setShowResults(true);
  };

  const handleReset = () => {
    setResults6([]);
    setResults12([]);
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
        {showResults && (
          <div className="mt-12 space-y-12">
            <ResultsTable
              results={results6}
              title="6% YoY Property Appreciation"
            />

            <ResultsTable
              results={results12}
              title="12% YoY Property Appreciation"
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
