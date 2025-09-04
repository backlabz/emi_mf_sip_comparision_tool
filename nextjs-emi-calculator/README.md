# Next.js EMI Calculator

A modern, responsive web application for comparing loan prepayment strategies and investment options. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

Access the application at: **http://localhost:3000**

## 📋 Overview

This calculator helps users compare three different financial strategies for managing home loans and investments:

- **Option A**: Prepay EMI + extra amount + reinvest rental income in Mutual Funds
- **Option B**: Pay EMI + invest extra amount + rental income in Mutual Funds
- **Option C**: No loan, invest all funds in Mutual Funds

## ✨ Features

- **Comprehensive Financial Analysis**: Compare net wealth across different strategies
- **Flexible Input Parameters**: Customize loan details, property values, and investment rates
- **Dual Appreciation Rates**: Calculate results for both 6% and 12% YoY property appreciation
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Real-time Calculations**: Instant results with formatted currency display
- **Type-Safe**: Built with TypeScript for better development experience
- **Modern UI**: Clean, professional design with Tailwind CSS

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Build Tool**: Next.js built-in bundler

## 📊 Input Parameters

### Loan Details
- Principal Amount (₹)
- Interest Rate (%)
- Tenure (Years)

### Property Details
- Purchase Value (₹)
- Down Payment (₹)
- Appreciation Rate (6% or 12%)
- Monthly Rental Income (₹)

### Investment Details
- Mutual Fund Return Rate (%)
- Monthly Extra Investment Amount (₹)

## 🎯 How It Works

1. **Enter your financial details** in the input form
2. **Click Calculate** to see comparison results
3. **Review two scenarios**: 6% and 12% property appreciation
4. **Compare metrics** across all three options:
   - Property Value
   - Outstanding Loan Balance
   - Equity in Property
   - Mutual Fund Value
   - Net Wealth
   - Interest Paid
   - Rental Income
   - Total Cash Outflow

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd nextjs-emi-calculator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and visit `http://localhost:3000`

## 📁 Project Structure

```
nextjs-emi-calculator/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page component
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── InputForm.tsx       # Input form component
│   │   └── ResultsTable.tsx    # Results display component
│   └── lib/
│       ├── comparison.ts       # Main comparison logic
│       ├── loanCalculator.ts   # Loan calculations
│       ├── investmentCalculator.ts # Investment calculations
│       └── propertyCalculator.ts   # Property calculations
├── public/                     # Static assets
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Key Calculations

### EMI Formula
```
EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
```
Where: P = Principal, r = Monthly rate, n = Total months

### Mutual Fund Future Value
```
FV = P × ((1 + r)^n - 1) / r
```
Where: P = Monthly investment, r = Monthly rate, n = Months

### Property Appreciation
```
Future Value = Current Value × (1 + rate)^years
```

## 🎨 Customization

### Styling
Modify `src/app/globals.css` or component styles to change:
- Color scheme
- Font families
- Layout spacing
- Component styling

### Calculations
Update calculation logic in respective modules:
- `src/lib/loanCalculator.ts` - Loan-related formulas
- `src/lib/investmentCalculator.ts` - Investment calculations
- `src/lib/propertyCalculator.ts` - Property appreciation

### Default Values
Change default input values in `src/components/InputForm.tsx`:
```typescript
const [inputs, setInputs] = useState<CalculatorInputs>({
  principal: 2400000, // Change this value
  // ... other defaults
});
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For questions or issues:
- Check the calculations against your financial planning tools
- Ensure you're using a modern browser with JavaScript enabled
- Verify all input fields are filled correctly

---

**Assumptions**: Fixed interest rates, no taxes/fees, client-side calculations only.
