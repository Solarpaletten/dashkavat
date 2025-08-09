# 🚀 FRONTEND SETUP - Execute in NEW terminal

cd f

# 1. Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 2. Configure Tailwind
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

# 3. Update CSS with Tailwind
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  background-color: #f3f4f6;
}
EOF

# 4. Create VAT Calculator Component
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
  field4?: number
  field8?: number
  field61: number
  field66: number
  field62: number
  field83: number
  plannedProfit?: number
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
  const [connected, setConnected] = useState(false)

  const handleInputChange = (field: keyof VatData, value: string) => {
    setData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }))
  }

  const testConnection = async () => {
    try {
      const response = await fetch('http://localhost:4000/health')
      const json = await response.json()
      if (json.status === 'OK') {
        setConnected(true)
        alert('✅ Backend connection successful!')
      }
    } catch (error) {
      setConnected(false)
      alert('❌ Backend connection failed: ' + error)
    }
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
        setConnected(true)
      } else {
        alert('Error: ' + json.error)
      }
    } catch (error) {
      setConnected(false)
      alert('Backend connection error: ' + error)
    }
    setLoading(false)
  }

  const loadTestData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/vat/test')
      const json = await response.json()
      if (json.success) {
        setData(json.testData)
        setResult(json.calculation)
        setConnected(true)
      }
    } catch (error) {
      setConnected(false)
      alert('Backend test error: ' + error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📄 SmartVat - VAT Declaration System
          </h1>
          <p className="text-gray-600 mb-4">
            ASSET LOGISTICS GMBH - {new Date().toLocaleDateString('de-DE')}
          </p>
          
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded ${connected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm font-medium">
                {connected ? 'Backend Connected' : 'Backend Disconnected'}
              </span>
            </div>
            
            <button
              onClick={testConnection}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
            >
              🔗 Test Connection
            </button>
            
            <button
              onClick={loadTestData}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 text-sm"
            >
              📊 Load Test Data
            </button>
            
            <button
              onClick={calculateVat}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50 text-sm"
            >
              {loading ? '⏳ Calculating...' : '🧮 Calculate VAT'}
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
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
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
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
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
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
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
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Field 67 - Import VAT Third Countries:
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={data.field67}
                  onChange={(e) => handleInputChange('field67', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Calculation Results</h2>
            
            {result ? (
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Output VAT (Field 66):</span>
                  <span className="font-bold text-blue-600">{result.field66.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Import VAT EU (Field 61):</span>
                  <span className="font-bold text-blue-600">{result.field61.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Total Input VAT (Field 62):</span>
                  <span className="font-bold text-blue-600">{result.field62.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between py-3 text-lg font-bold">
                  <span>VAT Payment (Field 83):</span>
                  <span className={`${result.field83 > 0 ? 'text-red-600' : result.field83 < 0 ? 'text-green-600' : 'text-blue-600'}`}>
                    {result.field83.toFixed(2)}€
                  </span>
                </div>
                
                <div className="mt-6 p-4 rounded-lg text-center" style={{
                  backgroundColor: result.field83 > 0 ? '#fee2e2' : result.field83 < 0 ? '#dcfce7' : '#dbeafe'
                }}>
                  <div className="text-2xl mb-2">
                    {result.field83 > 0 ? '💸' : result.field83 < 0 ? '💰' : '⚖️'}
                  </div>
                  <div className="font-bold text-lg">
                    Status: {result.status}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {result.field83 > 0 
                      ? `Payment due: ${result.field83.toFixed(2)}€`
                      : result.field83 < 0 
                      ? `Refund expected: ${Math.abs(result.field83).toFixed(2)}€`
                      : 'No payment or refund'
                    }
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-center py-12">
                <div className="text-4xl mb-4">🧮</div>
                <div className="text-lg">Click "Calculate VAT" to see results</div>
                <div className="text-sm mt-2">Enter your data and calculate German VAT</div>
              </div>
            )}
          </div>
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

function App() {
  return <VatCalculator />
}

export default App
EOF

# 6. Start frontend
echo "✅ Frontend setup complete!"
echo "🚀 Starting React development server..."
npm start