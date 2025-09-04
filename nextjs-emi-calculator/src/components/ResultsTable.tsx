'use client';

import { ComparisonResult } from '@/lib/comparison';

interface ResultsTableProps {
  results: ComparisonResult[];
  title: string;
}

export default function ResultsTable({ results, title }: ResultsTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(amount);
  };

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

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">{title}</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">
                Metric
              </th>
              {results.map((result, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b"
                >
                  {result.option}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric, metricIndex) => (
              <tr
                key={metric.key}
                className={metricIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b">
                  {metric.label}
                </td>
                {results.map((result, resultIndex) => (
                  <td
                    key={resultIndex}
                    className="px-4 py-3 text-sm text-gray-700 border-b"
                  >
                    ₹{formatCurrency(result[metric.key as keyof ComparisonResult] as number)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {results.map((result, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200"
          >
            <h4 className="font-semibold text-gray-800 mb-2 text-center">
              {result.option}
            </h4>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                ₹{formatCurrency(result.netWealth)}
              </div>
              <div className="text-sm text-gray-600">Net Wealth</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
