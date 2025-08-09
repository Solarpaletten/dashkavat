import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface VatFormData {
  field40a: number
  field40b: number
  field41: number
  field43: number
  field81a: number
  field81b: number
  field89a: number
  field89b: number
  field67: number
  field66: number
  field61: number
  field62: number
  field83: number
  calculatedAt: string
  companyName: string
  period: string
}

export default function VatForm() {
  const [formData, setFormData] = useState<VatFormData | null>(null)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    // Load data from localStorage or set defaults
    const savedData = localStorage.getItem('smartvat-calculation')
    if (savedData) {
      const parsed = JSON.parse(savedData)
      setFormData({
        ...parsed,
        companyName: 'ASSET LOGISTICS GMBH',
        period: 'März 2025'
      })
    } else {
      // Default ASSET LOGISTICS data
      setFormData({
        field40a: 18400.00,
        field40b: 0.00,
        field41: 18400.00,
        field43: 0.00,
        field81a: 133.56,
        field81b: 0.00,
        field89a: 15755.00,
        field89b: 484.96,
        field67: 0.00,
        field66: 0.00,
        field61: 3085.59,
        field62: 3085.59,
        field83: -3085.59,
        calculatedAt: new Date().toISOString(),
        companyName: 'ASSET LOGISTICS GMBH',
        period: 'März 2025'
      })
    }
  }, [])

  const updateField = (field: keyof VatFormData, value: number) => {
    if (!formData) return
    setFormData(prev => prev ? { ...prev, [field]: value } : null)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const formatNumber = (amount: number) => {
    return new Intl.NumberFormat('de-DE', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const printForm = () => {
    window.print()
  }

  const exportData = () => {
    if (!formData) return
    const dataStr = JSON.stringify(formData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `vat-declaration-${formData.companyName}-${formData.period}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  if (!formData) {
    return <div className="text-center p-8">Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6 print:p-0">
      {/* Header - Hide in print */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 print:hidden">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              📄 Umsatzsteuer-Voranmeldung
            </h1>
            <p className="text-gray-600">
              Official German VAT Declaration Form • {formData.companyName}
            </p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => setEditMode(!editMode)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              {editMode ? '👁️ View' : '✏️ Edit'}
            </button>
            <button
              onClick={printForm}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              🖨️ Print
            </button>
            <button
              onClick={exportData}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
            >
              💾 Export
            </button>
            <Link 
              to="/" 
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              ← Calculator
            </Link>
          </div>
        </div>
      </div>

      {/* Official VAT Form */}
      <div className="bg-white border-2 border-gray-300 print:border-black print:shadow-none">
        {/* Form Header */}
        <div className="bg-blue-50 p-4 border-b-2 border-gray-300 print:bg-white">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800">
              UMSATZSTEUER-VORANMELDUNG
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              nach § 18 Abs. 1 UStG für {formData.period}
            </p>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Unternehmen:</strong> {formData.companyName}
            </div>
            <div>
              <strong>Zeitraum:</strong> {formData.period}
            </div>
          </div>
        </div>

        {/* Section 1: Lieferungen und sonstige Leistungen */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-800 mb-3 bg-gray-100 p-2">
            1. Lieferungen und sonstige Leistungen
          </h3>
          
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4 items-center">
              <label className="text-sm">Feld 40a - Umsätze 19% (netto):</label>
              {editMode ? (
                <input
                  type="number"
                  step="0.01"
                  value={formData.field40a}
                  onChange={(e) => updateField('field40a', parseFloat(e.target.value) || 0)}
                  className="border border-gray-300 rounded px-3 py-1 text-right"
                />
              ) : (
                <span className="text-right font-mono">{formatNumber(formData.field40a)}</span>
              )}
              <span className="text-sm text-gray-600">EUR</span>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center">
              <label className="text-sm">Feld 40b - Umsätze 7% (netto):</label>
              {editMode ? (
                <input
                  type="number"
                  step="0.01"
                  value={formData.field40b}
                  onChange={(e) => updateField('field40b', parseFloat(e.target.value) || 0)}
                  className="border border-gray-300 rounded px-3 py-1 text-right"
                />
              ) : (
                <span className="text-right font-mono">{formatNumber(formData.field40b)}</span>
              )}
              <span className="text-sm text-gray-600">EUR</span>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center">
              <label className="text-sm">Feld 41 - Innergemeinschaftliche Lieferungen:</label>
              {editMode ? (
                <input
                  type="number"
                  step="0.01"
                  value={formData.field41}
                  onChange={(e) => updateField('field41', parseFloat(e.target.value) || 0)}
                  className="border border-gray-300 rounded px-3 py-1 text-right"
                />
              ) : (
                <span className="text-right font-mono">{formatNumber(formData.field41)}</span>
              )}
              <span className="text-sm text-gray-600">EUR</span>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center">
              <label className="text-sm">Feld 43 - Ausfuhrlieferungen:</label>
              {editMode ? (
                <input
                  type="number"
                  step="0.01"
                  value={formData.field43}
                  onChange={(e) => updateField('field43', parseFloat(e.target.value) || 0)}
                  className="border border-gray-300 rounded px-3 py-1 text-right"
                />
              ) : (
                <span className="text-right font-mono">{formatNumber(formData.field43)}</span>
              )}
              <span className="text-sm text-gray-600">EUR</span>
            </div>
          </div>
        </div>

        {/* Section 2: Steuerberechnung */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-800 mb-3 bg-gray-100 p-2">
            2. Steuerberechnung
          </h3>
          
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4 items-center bg-blue-50 p-2 rounded">
              <label className="text-sm font-bold">Feld 66 - Umsatzsteuer 19%:</label>
              <span className="text-right font-mono font-bold">{formatNumber(formData.field66)}</span>
              <span className="text-sm text-gray-600">EUR</span>
            </div>
          </div>
        </div>

        {/* Section 3: Vorsteuer */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-800 mb-3 bg-gray-100 p-2">
            3. Abziehbare Vorsteuer
          </h3>
          
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4 items-center">
              <label className="text-sm">Feld 61 - Vorsteuer EU-Erwerb:</label>
              <span className="text-right font-mono">{formatNumber(formData.field61)}</span>
              <span className="text-sm text-gray-600">EUR</span>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center">
              <label className="text-sm">Feld 67 - Import-USt Drittland:</label>
              <span className="text-right font-mono">{formatNumber(formData.field67)}</span>
              <span className="text-sm text-gray-600">EUR</span>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center bg-blue-50 p-2 rounded">
              <label className="text-sm font-bold">Feld 62 - Gesamte Vorsteuer:</label>
              <span className="text-right font-mono font-bold">{formatNumber(formData.field62)}</span>
              <span className="text-sm text-gray-600">EUR</span>
            </div>
          </div>
        </div>

        {/* Section 4: Zahllast/Erstattung */}
        <div className="p-4">
          <h3 className="font-bold text-gray-800 mb-3 bg-gray-100 p-2">
            4. Zahllast / Erstattung
          </h3>
          
          <div className="space-y-3">
            <div className={`grid grid-cols-3 gap-4 items-center p-3 rounded-lg font-bold text-lg ${
              formData.field83 > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}>
              <label>Feld 83 - {formData.field83 > 0 ? 'Zahllast' : 'Erstattung'}:</label>
              <span className="text-right font-mono">{formatNumber(Math.abs(formData.field83))}</span>
              <span className="text-sm">EUR</span>
            </div>

            <div className="text-center mt-4 p-4 bg-gray-50 rounded">
              <p className="text-lg font-bold">
                {formData.field83 > 0 ? '💸 ZAHLLAST' : '💰 ERSTATTUNG'}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {formData.field83 > 0 
                  ? 'Zu zahlender Betrag an das Finanzamt' 
                  : 'Zu erstattender Betrag vom Finanzamt'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Form Footer */}
        <div className="bg-gray-50 p-4 border-t-2 border-gray-300 text-xs text-gray-600">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Erstellt mit:</strong> SmartVat v1.1.0 - IT AI SOLAR</p>
              <p><strong>Berechnet am:</strong> {new Date(formData.calculatedAt).toLocaleString('de-DE')}</p>
            </div>
            <div className="text-right">
              <p><strong>Finanzamt-konform</strong></p>
              <p>Umsatzsteuer-Voranmeldung nach § 18 UStG</p>
            </div>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style jsx>{`
        @media print {
          @page {
            margin: 1cm;
            size: A4;
          }
          body {
            font-size: 12px;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:border-black {
            border-color: black !important;
          }
          .print\\:bg-white {
            background-color: white !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  )
}
