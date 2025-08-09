# 🚀 FRONTEND VITE SOLUTION - Execute in NEW terminal

# 1. Remove problematic React folder and create fresh Vite project
rm -rf f
npm create vite@latest f -- --template react-ts

# 2. Navigate to frontend
cd f

# 3. Install dependencies
npm install

# 4. Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 5. Configure Tailwind
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

# 6. Update main CSS
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  background-color: #f3f4f6;
}
EOF

# 7. Create VAT Calculator
cat > src/VatCalculator.tsx << 'EOF'
import { useState } from 'react'

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

export default function VatCalculator() {
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

  const updateField = (field: keyof VatData, value: string) => {
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
      alert('❌ Backend connection failed. Make sure backend is running on port 4000.')
    }
  }

  const calculateVat = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:4000/api/vat/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      const json = await response.json()
      if (json.success) {
        setResult(json.data)
        setConnected(true)
      } else {
        alert('❌ Calculation error: ' + json.error)
      }
    } catch (error) {
      setConnected(false)
      alert('❌ Backend connection error: ' + error)
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
        alert('✅ Test data loaded successfully!')
      }
    } catch (error) {
      setConnected(false)
      alert('❌ Failed to load test data: ' + error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            📄 SmartVat - VAT Declaration System
          </h1>
          <p className="text-gray-600 mb-4">
            ASSET LOGISTICS GMBH - {new Date().toLocaleDateString('de-DE')} - 
            {new Date().toLocaleTimeString('de-DE')}
          </p>
          
          {/* Status and Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              connected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <div className={`w-3 h-3 rounded-full ${
                connected ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className="text-sm font-medium">
                {connected ? 'Backend Connected (Port 4000)' : 'Backend Disconnected'}
              </span>
            </div>
            
            <button
              onClick={testConnection}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              🔗 Test Connection
            </button>
            
            <button
              onClick={loadTestData}
              className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition"
            >
              📊 Load ASSET LOGISTICS Data
            </button>
            
            <button
              onClick={calculateVat}
              disabled={loading}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 transition"
            >
              {loading ? '⏳ Calculating...' : '🧮 Calculate VAT'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">💰 VAT Input Data</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field 40a - Revenue 19% (net)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={data.field40a}
                  onChange={(e) => updateField('field40a', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field 81a - Input VAT Germany
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={data.field81a}
                  onChange={(e) => updateField('field81a', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field 89a - EU Purchases
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={data.field89a}
                  onChange={(e) => updateField('field89a', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field 89b - Third Country Imports
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={data.field89b}
                  onChange={(e) => updateField('field89b', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field 67 - Import VAT Third Countries
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={data.field67}
                  onChange={(e) => updateField('field67', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 VAT Calculation Results</h2>
            
            {result ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-blue-50 p-3 rounded">
                    <div className="text-blue-600 font-medium">Total Revenue</div>
                    <div className="text-xl font-bold text-blue-800">{result.field4.toFixed(2)}€</div>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <div className="text-red-600 font-medium">Total Costs</div>
                    <div className="text-xl font-bold text-red-800">{result.field8.toFixed(2)}€</div>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Output VAT (Field 66):</span>
                    <span className="font-bold text-lg text-blue-600">{result.field66.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Import VAT EU (Field 61):</span>
                    <span className="font-bold text-lg text-blue-600">{result.field61.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Total Input VAT (Field 62):</span>
                    <span className="font-bold text-lg text-blue-600">{result.field62.toFixed(2)}€</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center py-3">
                    <span className="text-xl font-semibold">VAT Payment (Field 83):</span>
                    <span className={`text-2xl font-bold ${
                      result.field83 > 0 ? 'text-red-600' : 
                      result.field83 < 0 ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {result.field83.toFixed(2)}€
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-lg text-gray-700">Planned Profit:</span>
                    <span className={`text-lg font-bold ${
                      result.plannedProfit >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {result.plannedProfit.toFixed(2)}€
                    </span>
                  </div>
                </div>
                
                <div className={`mt-6 p-6 rounded-lg text-center ${
                  result.field83 > 0 ? 'bg-red-50 border border-red-200' : 
                  result.field83 < 0 ? 'bg-green-50 border border-green-200' : 
                  'bg-blue-50 border border-blue-200'
                }`}>
                  <div className="text-4xl mb-3">
                    {result.field83 > 0 ? '💸' : result.field83 < 0 ? '💰' : '⚖️'}
                  </div>
                  <div className="text-2xl font-bold mb-2">
                    {result.status}
                  </div>
                  <div className="text-lg text-gray-700">
                    {result.field83 > 0 
                      ? `Payment Due: ${result.field83.toFixed(2)}€`
                      : result.field83 < 0 
                      ? `Refund Expected: ${Math.abs(result.field83).toFixed(2)}€`
                      : 'No Payment or Refund'
                    }
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🧮</div>
                <div className="text-xl text-gray-600 mb-2">Ready to Calculate</div>
                <div className="text-gray-500">Enter your data and click "Calculate VAT"</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
EOF

# 8. Update App.tsx
cat > src/App.tsx << 'EOF'
import VatCalculator from './VatCalculator'
import './App.css'

function App() {
  return <VatCalculator />
}

export default App
EOF

# 9. Start development server
echo "✅ Vite frontend setup complete!"
echo "🚀 Starting Vite development server..."
npm run dev