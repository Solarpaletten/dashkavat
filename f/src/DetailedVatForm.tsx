import { useState } from 'react'
import { Link } from 'react-router-dom'

interface DetailedVatData {
  // Компания
  companyName: string
  address: string
  hrb: string
  taxNumber: string
  period: string
  
  // КОД 10 - Общая информация
  field10_correction: number
  
  // КОД 81 - Налогооблагаемые продажи (19%)
  field81a_goods_services: number    // Товары/услуги с НДС (сумма без НДС)
  field81b_goods_no_vat: number      // Товары/услуги БЕЗ НДС
  field81_total: number              // ИТОГО код 81
  field81c_calculated_vat: number    // НДС81 - Начисленный НДС с кода 81
  
  // КОД 41 - Почтовые клиенты/Внутриобщественные поставки
  field41a_international: number     // Международные поставки (0%)
  field41b_internal_no_vat: number   // Внутренние поставки с НДС (без НДС)
  field41_total: number              // Код ИТОГО 41
  field41c_calculated_vat: number    // НДС41 - Начисленный НДС с кода 41
  
  // КОД 43 - Экспорт в три страны
  field43_export_third: number       // Экспортные поставки (0%)
  
  // НДС расчеты - Зачетный НДС
  field66_vat_postal: number         // НДС по графикам почтовых операторов
  field62_import_vat: number         // Налог с продаж на ИМПОРТ, уплаченный Уплаченный НДС
  field67_vat_control: number        // НДС для контроля за ввозящими налогами
  
  // Дополнительные поля
  field89a_eu_purchases: number      // ЕС закупки
  field89b_third_country: number     // Закупки 3-и страны (пошлина)
  field81a_services: number          // Услуги в Германии
}

export default function DetailedVatForm() {
  const [data, setData] = useState<DetailedVatData>({
    // Company defaults
    companyName: 'ASSET LOGISTICS GMBH',
    address: 'Кетен, Курше Штрассе 6, Германия, 06366',
    hrb: '34481',
    taxNumber: 'DE453202061',
    period: 'Апрель 2025 г.',
    
    // Fields defaults (based on ASSET LOGISTICS real case)
    field10_correction: 0,
    
    // КОД 81 fields
    field81a_goods_services: 0,
    field81b_goods_no_vat: 0,
    field81_total: 0,
    field81c_calculated_vat: 0,
    
    // КОД 41 fields  
    field41a_international: 18400,     // EU export
    field41b_internal_no_vat: 0,
    field41_total: 18400,
    field41c_calculated_vat: 0,        // 0% for EU export
    
    // КОД 43
    field43_export_third: 0,
    
    // VAT calculations
    field66_vat_postal: 0,
    field62_import_vat: 3085.59,       // Import VAT from EU purchases
    field67_vat_control: 0,
    
    // Additional fields
    field89a_eu_purchases: 15755,      // EU purchases
    field89b_third_country: 484.96,    // Third country imports (customs)
    field81a_services: 133.56          // Services in Germany
  })

  const updateField = (field: keyof DetailedVatData, value: string | number) => {
    const numValue = typeof value === 'string' ? (parseFloat(value) || 0) : value
    setData(prev => {
      const newData = { ...prev, [field]: numValue }
      
      // Auto-calculate totals
      if (field.startsWith('field81')) {
        newData.field81_total = newData.field81a_goods_services + newData.field81b_goods_no_vat
        newData.field81c_calculated_vat = newData.field81a_goods_services * 0.19
      }
      
      if (field.startsWith('field41')) {
        newData.field41_total = newData.field41a_international + newData.field41b_internal_no_vat
        newData.field41c_calculated_vat = newData.field41b_internal_no_vat * 0.19 // Only internal has VAT
      }
      
      return newData
    })
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(num)
  }

  const generateSimpleForm = () => {
    // Create simplified data for main calculator
    const simpleData = {
      field40a: data.field41a_international,
      field40b: data.field81b_goods_no_vat,
      field41: data.field41_total,
      field43: data.field43_export_third,
      field81a: data.field81a_services,
      field81b: 0,
      field89a: data.field89a_eu_purchases,
      field89b: data.field89b_third_country,
      field67: data.field67_vat_control,
      calculatedAt: new Date().toISOString(),
      companyName: data.companyName,
      period: data.period
    }
    
    localStorage.setItem('smartvat-calculation', JSON.stringify(simpleData))
    alert(`✅ Данные переданы в основную форму!\nГотово к расчету VAT.`)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              📝 Детальная форма ввода VAT данных
            </h1>
            <p className="text-gray-600">
              Подробное заполнение всех полей по немецкой форме • v1.2.0
            </p>
          </div>
          <div className="space-x-4">
            <button
              onClick={generateSimpleForm}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              ✅ Передать в основную форму
            </button>
            <Link 
              to="/" 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              📊 К калькулятору
            </Link>
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🏢 Информация о компании</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Компания:
            </label>
            <input
              type="text"
              value={data.companyName}
              onChange={(e) => updateField('companyName', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Налоговый номер:
            </label>
            <input
              type="text"
              value={data.taxNumber}
              onChange={(e) => updateField('taxNumber', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              HRB:
            </label>
            <input
              type="text"
              value={data.hrb}
              onChange={(e) => updateField('hrb', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Отчетный период:
            </label>
            <input
              type="text"
              value={data.period}
              onChange={(e) => updateField('period', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* КОД 81 - Налогооблагаемые продажи */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 bg-blue-100 p-3 rounded">
          🔢 КОД 81 — Налогооблагаемые продажи (19%)
        </h2>
        
        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded">
            <h3 className="font-bold text-orange-800 mb-2">📊 Подробности кода 81</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  81a - Товары/услуги с НДС (сумма без НДС):
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={data.field81a_goods_services}
                  onChange={(e) => updateField('field81a_goods_services', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  81b - Товары/услуги БЕЗ НДС:
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={data.field81b_goods_no_vat}
                  onChange={(e) => updateField('field81b_goods_no_vat', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-100 p-3 rounded">
              <label className="block text-sm font-bold text-green-800 mb-1">
                81 - ИТОГО код 81 (Товары и услуги 19%):
              </label>
              <div className="text-2xl font-bold text-green-700">
                {formatNumber(data.field81_total)}€
              </div>
            </div>
            
            <div className="bg-blue-100 p-3 rounded">
              <label className="block text-sm font-bold text-blue-800 mb-1">
                81c - НДС81 - Начисленный НДС с кода 81:
              </label>
              <div className="text-2xl font-bold text-blue-700">
                {formatNumber(data.field81c_calculated_vat)}€
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* КОД 41 - Почтовые клиенты */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 bg-red-100 p-3 rounded">
          📮 КОД 41 - Почтовые клиенты / Внутриобщественные поставки
        </h2>
        
        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded">
            <h3 className="font-bold text-orange-800 mb-2">📊 Подробности кода 41</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  41a - Международные поставки (0%):
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={data.field41a_international}
                  onChange={(e) => updateField('field41a_international', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  41b - Внутренние поставки с НДС (без НДС):
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={data.field41b_internal_no_vat}
                  onChange={(e) => updateField('field41b_internal_no_vat', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-100 p-3 rounded">
              <label className="block text-sm font-bold text-green-800 mb-1">
                41 - Код ИТОГО 41 (Внутримуниципальные поставки):
              </label>
              <div className="text-2xl font-bold text-green-700">
                {formatNumber(data.field41_total)}€
              </div>
            </div>
            
            <div className="bg-blue-100 p-3 rounded">
              <label className="block text-sm font-bold text-blue-800 mb-1">
                41c - НДС41 - Начисленный НДС с кода 41:
              </label>
              <div className="text-2xl font-bold text-blue-700">
                {formatNumber(data.field41c_calculated_vat)}€
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Экспорт и НДС поля */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Экспорт */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🌍 Экспорт</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              43 - Экспорт в три страны (0%):
            </label>
            <input
              type="number"
              step="0.01"
              value={data.field43_export_third}
              onChange={(e) => updateField('field43_export_third', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* НДС расчеты */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">💰 НДС расчеты</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                66 - НДС по графикам почтовых операторов:
              </label>
              <input
                type="number"
                step="0.01"
                value={data.field66_vat_postal}
                onChange={(e) => updateField('field66_vat_postal', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                62 - Налог с продаж на ИМПОРТ:
              </label>
              <input
                type="number"
                step="0.01"
                value={data.field62_import_vat}
                onChange={(e) => updateField('field62_import_vat', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                67 - НДС для контроля:
              </label>
              <input
                type="number"
                step="0.01"
                value={data.field67_vat_control}
                onChange={(e) => updateField('field67_vat_control', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Дополнительные поля */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📋 Дополнительные данные</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              89a - ЕС закупки (нетто):
            </label>
            <input
              type="number"
              step="0.01"
              value={data.field89a_eu_purchases}
              onChange={(e) => updateField('field89a_eu_purchases', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              89b - Закупки 3-и страны (пошлина):
            </label>
            <input
              type="number"
              step="0.01"
              value={data.field89b_third_country}
              onChange={(e) => updateField('field89b_third_country', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              81a - Услуги в Германии:
            </label>
            <input
              type="number"
              step="0.01"
              value={data.field81a_services}
              onChange={(e) => updateField('field81a_services', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🚀 Готово к расчету</h2>
        
        <div className="space-x-4">
          <button
            onClick={generateSimpleForm}
            className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition font-bold"
          >
            ✅ Передать данные в основную форму
          </button>
          
          <Link 
            to="/vat-form" 
            className="bg-purple-500 text-white px-8 py-3 rounded-lg hover:bg-purple-600 transition font-bold"
          >
            📄 К официальной форме
          </Link>
        </div>
        
        <p className="text-sm text-gray-600 mt-4">
          После передачи данных можно перейти к расчету VAT в основной форме
        </p>
      </div>
    </div>
  )
}
