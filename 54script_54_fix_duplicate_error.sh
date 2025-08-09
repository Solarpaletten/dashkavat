# 🚀 SCRIPT 54 - FIX DUPLICATE FUNCTION ERROR

echo "🚨 Fixing duplicate function error in VatCalculator.tsx..."

cd f/src

# Backup current file
cp VatCalculator.tsx VatCalculator.tsx.backup

# Remove duplicate lines and fix the file
cat > VatCalculator.tsx << 'EOF'
import { useState } from 'react'
import { Link } from 'react-router-dom'

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
  calculatedAt: string
}

export default function VatCalculator() {
  // ТОЧНЫЕ ДАННЫЕ ИЗ РЕАЛЬНОЙ ОПЕРАЦИИ ASSET LOGISTICS МАРТ 2025
  const [data, setData] = useState<VatData>({
    field40a: 18400.00,    // Реализация ЕС (23т × 800€)
    field40b: 0.00,        // Umsätze 7%
    field41: 18400.00,     // Innergemeinschaftliche (ЕС экспорт)
    field43: 0.00,         // Ausfuhrlieferungen (3-и страны)
    field81a: 133.56,      // Услуги декларанта (нетто)
    field81b: 0.00,        // Услуги без НДС
    field89a: 15755.00,    // ЕС импорт (23т × 685€)
    field89b: 484.96,      // Пошлина (импорт 3-и страны)
    field67: 0.00          // Import VAT 3rd countries
  })
  
  const [result, setResult] = useState<VatResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [connected, setConnected] = useState(false)

  // ЕДИНСТВЕННАЯ функция saveCalculationData
  const saveCalculationData = (vatData: VatData, calculationResult?: VatResult | null) => {
    const dataToSave = {
      ...vatData,
      ...(calculationResult || {}),
      calculatedAt: new Date().toISOString(),
      companyName: 'ASSET LOGISTICS GMBH',
      period: 'März 2025'
    }
    localStorage.setItem('smartvat-calculation', JSON.stringify(dataToSave))
    console.log('💾 Data saved to localStorage:', dataToSave)
  }

  const updateField = (field: keyof VatData, value: string) => {
    const newData = {
      ...data,
      [field]: parseFloat(value) || 0
    }
    setData(newData)
    
    // Auto-save to localStorage when data changes
    saveCalculationData(newData, result)
  }

  const testConnection = async () => {
    try {
      const response = await fetch('http://localhost:4000/health')
      const json = await response.json()
      if (json.status === 'OK') {
        setConnected(true)
        alert('✅ Backend connection successful!\n' + json.service)
      }
    } catch (error) {
      setConnected(false)
      alert('❌ Backend connection failed. Make sure backend is running on port 4000.')
    }
  }

  const loadRealData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/vat/test')
      const json = await response.json()
      if (json.success) {
        setData(json.testData)
        setResult(json.calculation)
        saveCalculationData(json.testData, json.calculation)
        alert('✅ REAL März 2025 data loaded!\nField 83: ' + json.calculation.field83 + '€')
      }
    } catch (error) {
      alert('❌ Failed to load test data: ' + error)
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
        saveCalculationData(data, json.data)
        setConnected(true)
      } else {
        alert('❌ Calculation error: ' + json.error)
      }
    } catch (error) {
      alert('❌ Backend connection error: ' + error)
      setConnected(false)
    }
    setLoading(false)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(num)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          📄 SmartVat - VAT Declaration System
        </h1>
        <p className="text-gray-600 mb-4">
          ASSET LOGISTICS GMBH - März 2025 - Real Case
        </p>
        <p className="text-sm text-blue-600 mb-4">
          🚛 Import: 23t × 685€ = 15,755€ → Export: 23t × 800€ = 18,400€
        </p>
        
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm">
            {connected ? 'Backend Connected (Port 4000)' : 'Backend Disconnected'}
          </span>
        </div>

        <div className="space-x-4">
          <button
            onClick={testConnection}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            🔗 Test Connection
          </button>
          <button
            onClick={loadRealData}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
          >
            📊 Load REAL März 2025 Data
          </button>
          <button
            onClick={calculateVat}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition disabled:opacity-50"
          >
            {loading ? '⏳ Calculating...' : '🧮 Calculate VAT'}
          </button>
        </div>
      </div>

      {/* Input Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Fields */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">💰 VAT Input Data</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field 40a - EC Реализация (0% VAT):
              </label>
              <input
                type="number"
                step="0.01"
                value={data.field40a}
                onChange={(e) => updateField('field40a', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field 81a - Услуги в Германии (нетто):
              </label>
              <input
                type="number"
                step="0.01"
                value={data.field81a}
                onChange={(e) => updateField('field81a', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field 89a - EC Импорт (нетто):
              </label>
              <input
                type="number"
                step="0.01"
                value={data.field89a}
                onChange={(e) => updateField('field89a', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field 89b - Пошлина/Импорт 3-и страны:
              </label>
              <input
                type="number"
                step="0.01"
                value={data.field89b}
                onChange={(e) => updateField('field89b', e.target.value)}
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
                onChange={(e) => updateField('field67', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📊 VAT Calculation Results</h2>
          
          {result ? (
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Total Revenue:</span>
                <span className="font-bold text-blue-600">{formatNumber(result.field4)}€</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Total Costs:</span>
                <span className="font-bold text-blue-600">{formatNumber(result.field8)}€</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Output VAT (Field 66):</span>
                <span className="font-bold text-blue-600">{formatNumber(result.field66)}€</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Import VAT EU (Field 61):</span>
                <span className="font-bold text-blue-600">{formatNumber(result.field61)}€</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Total Input VAT (Field 62):</span>
                <span className="font-bold text-blue-600">{formatNumber(result.field62)}€</span>
              </div>
              <div className="flex justify-between py-3 text-lg font-bold">
                <span>VAT Payment (Field 83):</span>
                <span className={`${result.field83 > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {formatNumber(result.field83)}€
                </span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-200">
                <span className="text-gray-600">Planned Profit:</span>
                <span className="font-bold text-green-600">{formatNumber(result.plannedProfit)}€</span>
              </div>
              
              <div className="mt-6 p-4 rounded-lg text-center" style={{
                backgroundColor: result.field83 > 0 ? '#fee2e2' : '#dcfce7'
              }}>
                <div className="text-2xl mb-2">
                  {result.field83 > 0 ? '💸' : '💰'}
                </div>
                <div className="text-lg font-bold">
                  {result.field83 > 0 ? 'ZAHLLAST' : 'ERSTATTUNG'}
                </div>
                <div className="text-sm text-gray-600">
                  Refund Expected: {formatNumber(Math.abs(result.field83))}€
                </div>
              </div>

              {/* Navigation to VAT Form */}
              <div className="mt-6 text-center">
                <Link 
                  to="/vat-form" 
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition inline-flex items-center gap-2 font-bold"
                >
                  📄 Open Official VAT Form
                </Link>
                <p className="text-xs text-gray-500 mt-2">
                  Data automatically saved and will be loaded in the form
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                Click "Calculate VAT" to see results
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📋 Заполнение официальной формы</h2>
        <p className="text-gray-600 mb-4">
          Автоматически заполните официальную форму Umsatzsteuer-Voranmeldung рассчитанными данными
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-bold mb-2">🎯 Ожидаемый результат:</p>
            <p>Field 83 = -3085.59€ (ERSTATTUNG)</p>
          </div>
          <div>
            <p className="font-bold mb-2">📊 Реальный кейс:</p>
            <p>Import 23t Rapeseed Oil → Export EC (0% VAT)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
EOF

echo "✅ Duplicate function error fixed!"
echo "🧹 Clean VatCalculator.tsx created!"
echo "💾 Auto-save functionality preserved!"
echo ""
echo "🚀 Restarting frontend server..."