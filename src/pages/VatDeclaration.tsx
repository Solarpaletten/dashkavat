import { useEffect, useState } from 'react'
import SmartVatCalculator, { type VatCalculationResult } from '../core/SmartVatCalculator'

export default function VatDeclaration() {
  const [result, setResult] = useState<VatCalculationResult | null>(null)
  const [calculator] = useState(() => new SmartVatCalculator())

  useEffect(() => {
    calculator.init()
    calculator.loadDefaultData()
    const output = calculator.calculateTax()
    setResult(output)
  }, [calculator])

  const handleFieldChange = (fieldId: string, value: string) => {
    const numValue = parseFloat(value) || 0
    const updatedResult = calculator.updateField(fieldId as any, numValue)
    setResult(updatedResult)
  }

  const getCurrentDate = () => {
    const now = new Date()
    return now.toLocaleDateString('de-DE') + ' / ' + now.toLocaleTimeString('de-DE')
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📄 Umsatzsteuer-Voranmeldung</h1>
        <p className="text-gray-600">ASSET LOGISTICS GMBH - {getCurrentDate()}</p>
      </div>

      {/* Eingabefelder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Umsätze */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">💰 Umsätze</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Feld 40a - Umsätze 19% (netto):
              </label>
              <input
                type="number"
                step="0.01"
                defaultValue={calculator.getFieldValue('field40a')}
                onChange={(e) => handleFieldChange('field40a', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Feld 40b - Umsätze ohne USt:
              </label>
              <input
                type="number"
                step="0.01"
                defaultValue={calculator.getFieldValue('field40b')}
                onChange={(e) => handleFieldChange('field40b', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Feld 41 - EU-Lieferungen:
              </label>
              <input
                type="number"
                step="0.01"
                defaultValue={calculator.getFieldValue('field41')}
                onChange={(e) => handleFieldChange('field41', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Feld 43 - Drittland-Exporte:
              </label>
              <input
                type="number"
                step="0.01"
                defaultValue={calculator.getFieldValue('field43')}
                onChange={(e) => handleFieldChange('field43', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        {/* Vorsteuer */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">💸 Vorsteuer</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Feld 81a - Einkäufe Deutschland (netto):
              </label>
              <input
                type="number"
                step="0.01"
                defaultValue={calculator.getFieldValue('field81a')}
                onChange={(e) => handleFieldChange('field81a', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Feld 89a - EU-Erwerb:
              </label>
              <input
                type="number"
                step="0.01"
                defaultValue={calculator.getFieldValue('field89a')}
                onChange={(e) => handleFieldChange('field89a', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Feld 89b - Import-Zölle:
              </label>
              <input
                type="number"
                step="0.01"
                defaultValue={calculator.getFieldValue('field89b')}
                onChange={(e) => handleFieldChange('field89b', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ergebnisse */}
      {result && (
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Berechnungsergebnisse</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Gesamtumsatz</p>
              <p className="text-xl font-bold text-blue-700">{result.field4.toFixed(2)} €</p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Gesamtkosten</p>
              <p className="text-xl font-bold text-orange-700">{result.field8.toFixed(2)} €</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Geplanter Gewinn</p>
              <p className={`text-xl font-bold ${result.plannedProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                {result.plannedProfit.toFixed(2)} €
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Vorsteuer gesamt</p>
              <p className="text-xl font-bold text-purple-700">{result.field62.toFixed(2)} €</p>
            </div>
          </div>

          {/* Hauptergebnis */}
          <div className={`p-6 rounded-lg text-center ${result.field83 > 0 ? 'bg-red-50' : result.field83 < 0 ? 'bg-green-50' : 'bg-blue-50'}`}>
            <h3 className="text-lg font-medium text-gray-800 mb-2">USt-Zahllast (Feld 83)</h3>
            <p className={`text-3xl font-bold ${result.field83 > 0 ? 'text-red-700' : result.field83 < 0 ? 'text-green-700' : 'text-blue-700'}`}>
              {result.field83 > 0 ? '💸 Zahllast: ' : result.field83 < 0 ? '💰 Erstattung: ' : '⚖️ Ausgeglichen: '}
              {Math.abs(result.field83).toFixed(2)} €
            </p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-sm">
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-gray-600">Feld 66 (USt aus 40a):</p>
              <p className="font-semibold">{result.field66.toFixed(2)} €</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-gray-600">Feld 61 (EU-Import USt):</p>
              <p className="font-semibold">{result.field61.toFixed(2)} €</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-gray-600">Feld 67 (Drittland USt):</p>
              <p className="font-semibold">{result.field67.toFixed(2)} €</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}