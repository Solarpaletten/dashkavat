# 🚀 FRONTEND IMMEDIATE SETUP

# In another terminal window:
cd f

# 1. Install Tailwind CSS properly
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 2. Configure Tailwind - update tailwind.config.js
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

# 3. Update src/index.css with Tailwind
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
EOF

# 4. Create simple VAT Calculator component
cat > src/VatCalculator.tsx << 'EOF'
import React, { useState } from 'react'

interface VatData {
  field40a: number
  field40b: number
  field41: number
  field43: number
  field81a: number
  field81b: number
  field89a: number
  field89b: number
  field67: number
}

interface VatResult {
  field4: number
  field8: number
  field61: number
  field66: number
  field62: number
  field83: number
  plannedProfit: number
  status: string
}

const VatCalculator: React.FC = () => {
  const [data, setData] = useState<VatData>({
    field40a: 18400.00,
    field40b: 0.00,
    field41: 0.00,
    field43: 0.00,
    field81a: 133.56,
    field81b: 0.00,
    field89a: 15755.00,
    field89b: 484.96,
    field67: 0.00
  })
  
  const [result, setResult] = useState<VatResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: keyof VatData, value: string) => {
    setData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }))
  }

  const calculateVat = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:4000/api/vat/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      
      const json = await response.json()
      if (json.success) {
        setResult(json.data)
      } else {
        alert('Error: ' + json.error)
      }
    } catch (error) {
      alert('Backend connection error: ' + error)
    }
    setLoading(false)
  }

  const testBackend = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/vat/test')
      const json = await response.json()
      if (json.success) {
        setData(json.testData)
        setResult(json.calculation)
      }
    } catch (error) {
      alert('Backend test error: ' + error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          📄 VAT Declaration System
        </h1>
        <p className="text-gray-600">
          ASSET LOGISTICS GMBH - {new Date().toLocaleDateString('de-DE')}
        </p>
        <div className="mt-4 space-x-4">
          <button
            onClick={testBackend}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            🧮 Load Test Data
          </button>
          <button
            onClick={calculateVat}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? '⏳ Calculating...' : '📊 Calculate VAT'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">💰 Input Data</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field 40a - Revenue 19% (net):
              </label>
              <input
                type="number"
                step="0.01"
                value={data.field40a}
                onChange={(e) => handleInputChange('field40a', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field 81a - Input VAT Germany:
              </label>
              <input
                type="number"
                step="0.01"
                value={data.field81a}
                onChange={(e) => handleInputChange('field81a', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field 89a - EU Purchases:
              </label>
              <input
                type="number"
                step="0.01"
                value={data.field89a}
                onChange={(e) => handleInputChange('field89a', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field 89b - Third Country Imports:
              </label>
              <input
                type="number"
                step="0.01"
                value={data.field89b}
                onChange={(e) => handleInputChange('field89b', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Results</h2>
          
          {result ? (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Revenue (Field 4):</span>
                <span className="font-bold">{result.field4.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between">
                <span>Total Costs (Field 8):</span>
                <span className="font-bold">{result.field8.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between">
                <span>Output VAT (Field 66):</span>
                <span className="font-bold">{result.field66.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between">
                <span>Input VAT (Field 62):</span>
                <span className="font-bold">{result.field62.toFixed(2)}€</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg">
                <span>VAT Payment (Field 83):</span>
                <span className={`font-bold ${result.field83 > 0 ? 'text-red-600' : result.field83 < 0 ? 'text-green-600' : 'text-blue-600'}`}>
                  {result.field83.toFixed(2)}€
                </span>
              </div>
              <div className="flex justify-between">
                <span>Planned Profit:</span>
                <span className={`font-bold ${result.plannedProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {result.plannedProfit.toFixed(2)}€
                </span>
              </div>
              <div className="text-center mt-4 p-3 rounded" style={{
                backgroundColor: result.field83 > 0 ? '#fee2e2' : result.field83 < 0 ? '#dcfce7' : '#dbeafe'
              }}>
                <span className="font-bold">
                  Status: {result.status}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-center py-8">
              Click "Calculate VAT" to see results
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VatCalculator
EOF

# 5. Update App.tsx
cat > src/App.tsx << 'EOF'
import React from 'react'
import VatCalculator from './VatCalculator'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <VatCalculator />
    </div>
  )
}

export default App
EOF

# 6. Start frontend
echo "✅ Frontend setup complete!"
echo "🚀 Starting React development server..."
npm start