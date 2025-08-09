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
        alert('✅ Backend connection successful!\n' + json.service)
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
        
        // Сохраняем для автозаполнения формы
        localStorage.setItem('smartvat_calculation', JSON.stringify({
          ...json.data,
          inputData: data,
          company: 'ASSET LOGISTICS GMBH',
          timestamp: new Date().toISOString()
        }))
        
      } else {
        alert('❌ Calculation error: ' + json.error)
      }
    } catch (error) {
      setConnected(false)
      alert('❌ Backend connection error: ' + error)
    }
    setLoading(false)
  }

  const loadAssetData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/vat/test')
      const json = await response.json()
      if (json.success) {
        setData(json.testData)
        setResult(json.calculation)
        setConnected(true)
        alert('✅ REAL ASSET LOGISTICS data loaded!\nMärz 2025: ' + json.message)
      }
    } catch (error) {
      setConnected(false)
      alert('❌ Failed to load test data: ' + error)
    }
  }

  const fillOfficialForm = () => {
    if (!result) {
      alert('❌ Сначала выполните расчет VAT')
      return
    }

    // Сохраняем данные для автозаполнения
    localStorage.setItem('smartvat_calculation', JSON.stringify({
      ...result,
      inputData: data,
      company: 'ASSET LOGISTICS GMBH',
      period: 'März 2025',
      timestamp: new Date().toISOString()
    }))

    // Открываем официальную форму
    const formWindow = window.open('https://vat.swapoil.de', '_blank')
    
    if (formWindow) {
      alert('✅ Данные сохранены для автозаполнения!\n\nОткройте консоль (F12) на странице vat.swapoil.de и введите:\nfillSmartVatData()')
    } else {
      alert('❌ Не удалось открыть форму. Откройте https://vat.swapoil.de вручную')
    }
  }

  const copyToClipboard = () => {
    if (!result) return
    
    const formData = `SMARTVAT - ASSET LOGISTICS MÄRZ 2025
======================================
Field 40a (ЕС Реализация): ${data.field40a.toFixed(2)}€
Field 89a (ЕС Импорт): ${data.field89a.toFixed(2)}€
Field 89b (Пошлина): ${data.field89b.toFixed(2)}€
Field 81a (Услуги): ${data.field81a.toFixed(2)}€

РЕЗУЛЬТАТЫ:
Field 66 (НДС реализации): ${result.field66.toFixed(2)}€
Field 61 (Import VAT): ${result.field61.toFixed(2)}€  
Field 62 (Зачетный НДС): ${result.field62.toFixed(2)}€
Field 83 (К доплате/возврату): ${result.field83.toFixed(2)}€

Status: ${result.status}
Прибыль: ${result.plannedProfit.toFixed(2)}€

Операция: Import 23t×685€ → Export 23t×800€
Calculated: ${new Date().toLocaleString('de-DE')}`
    
    navigator.clipboard.writeText(formData).then(() => {
      alert('✅ Данные скопированы в буфер обмена!')
    }).catch(() => {
      alert('❌ Ошибка копирования')
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            📄 SmartVat - VAT Declaration System
          </h1>
          <p className="text-gray-600 mb-2">
            ASSET LOGISTICS GMBH - März 2025 - Real Case
          </p>
          <p className="text-sm text-blue-600 mb-4">
            🎯 Import: 23t × 685€ = 15,755€ → Export: 23t × 800€ = 18,400€
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
              onClick={loadAssetData}
              className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition"
            >
              📊 Load REAL März 2025 Data
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
                  Field 40a - ЕС Реализация (0% VAT)
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
                  Field 81a - Услуги в Германии (нетто)
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
                  Field 89a - ЕС Импорт (нетто)
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
                  Field 89b - Пошлина/Импорт 3-и страны
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

                {/* Auto-fill Form Section */}
                <div className="border-t pt-6 mt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    📄 Заполнение официальной формы
                  </h3>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-blue-800 text-sm mb-3">
                      Автоматически заполните официальную форму Umsatzsteuer-Voranmeldung 
                      рассчитанными данными
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={fillOfficialForm}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center space-x-2"
                      >
                        <span>🔄</span>
                        <span>Открыть vat.swapoil.de</span>
                      </button>
                      
                      <button
                        onClick={copyToClipboard}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition flex items-center space-x-2"
                      >
                        <span>📋</span>
                        <span>Копировать данные</span>
                      </button>
                      
                      <a
                        href="https://vat.swapoil.de"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center space-x-2 no-underline"
                      >
                        <span>📄</span>
                        <span>Открыть форму</span>
                      </a>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800 text-sm">
                      <strong>💡 Ожидаемый результат:</strong> Field 83 = -3085.59€ (ERSTATTUNG)
                      <br />
                      <strong>📊 Реальный case:</strong> Import 23t Rapeseed Oil → Export ЕС (0% VAT)
                    </p>
                  </div>
                </div>

              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🧮</div>
                <div className="text-xl text-gray-600 mb-2">Ready to Calculate</div>
                <div className="text-gray-500">REAL ASSET LOGISTICS case März 2025</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
