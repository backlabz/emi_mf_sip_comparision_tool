'use client';

import { useState } from 'react';
import { CalculatorInputs } from '@/lib/comparison';

interface InputFormProps {
  onCalculate: (inputs: CalculatorInputs) => void;
  onReset: () => void;
}

export default function InputForm({ onCalculate, onReset }: InputFormProps) {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    principal: 2400000,
    loanRate: 9,
    tenure: 20,
    propertyValue: 2600000,
    downPayment: 200000,
    appRate: 6,
    rental: 8000,
    mfRate: 10.5,
    extraAmount: 50000,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(inputs);
  };

  const handleReset = () => {
    setInputs({
      principal: 2400000,
      loanRate: 9,
      tenure: 20,
      propertyValue: 2600000,
      downPayment: 200000,
      appRate: 6,
      rental: 8000,
      mfRate: 10.5,
      extraAmount: 50000,
    });
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Loan & Investment Calculator</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Loan Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Loan Details</h3>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Principal (₹)
            </label>
            <input
              type="number"
              name="principal"
              value={inputs.principal}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Interest Rate (%)
            </label>
            <input
              type="number"
              name="loanRate"
              value={inputs.loanRate}
              onChange={handleInputChange}
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Tenure (Years)
            </label>
            <input
              type="number"
              name="tenure"
              value={inputs.tenure}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>
        </div>

        {/* Property Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Property Details</h3>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Purchase Value (₹)
            </label>
            <input
              type="number"
              name="propertyValue"
              value={inputs.propertyValue}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Down Payment (₹)
            </label>
            <input
              type="number"
              name="downPayment"
              value={inputs.downPayment}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Appreciation Rate (%)
            </label>
            <select
              name="appRate"
              value={inputs.appRate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            >
              <option value={6}>6%</option>
              <option value={12}>12%</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Rental Income (₹/month)
            </label>
            <input
              type="number"
              name="rental"
              value={inputs.rental}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>
        </div>

        {/* Investment Details */}
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Mutual Fund Details</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Return Rate (%)
              </label>
              <input
                type="number"
                name="mfRate"
                value={inputs.mfRate}
                onChange={handleInputChange}
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Monthly Extra Amount (₹)
              </label>
              <input
                type="number"
                name="extraAmount"
                value={inputs.extraAmount}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-8 justify-center">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          Calculate
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
