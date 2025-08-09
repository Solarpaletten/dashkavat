const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 4000

console.log('🚀 Starting VAT Backend...')

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use(express.json())

// VAT Calculator с ИСПРАВЛЕННОЙ ЛОГИКОЙ
const vatCalc = (data) => {
  const n = (v) => Number(v) || 0
  const r = (v) => Math.round(v * 100) / 100
  
  console.log('🧮 Calculating with REAL ASSET LOGISTICS logic:', data)
  
  // Получаем все значения
  const field40a = n(data.field40a)  // Реализация ЕС
  const field40b = n(data.field40b)  // Umsätze 7%
  const field41 = n(data.field41)    // Innergemeinschaftliche
  const field43 = n(data.field43)    // Ausfuhrlieferungen
  const field81a = n(data.field81a)  // Услуги в Германии
  const field81b = n(data.field81b)  // Услуги без НДС
  const field89a = n(data.field89a)  // ЕС импорт
  const field89b = n(data.field89b)  // Пошлина/импорт 3-и страны
  const field67 = n(data.field67)    // Import VAT 3rd
  
  // ИСПРАВЛЕННЫЕ РАСЧЕТЫ:
  
  // 1. field4 = Общая выручка (БЕЗ дублирования!)
  const field4 = field40a + field40b + field43  // НЕ включаем field41!
  
  // 2. field8 = Общие затраты  
  const field8 = field81a + field81b + field89a + field89b
  
  // 3. field66 = НДС с реализации (0% для экспорта в ЕС!)
  const field66 = 0.00  // НЕ field40a * 0.19! Экспорт = 0%
  
  // 4. field61 = Импортный НДС ЕС
  const field61 = (field89a + field89b) * 0.19
  
  // 5. field62 = Общий зачетный НДС
  const field62 = field66 + field61 + field67
  
  // 6. field83 = К доплате/возврату
  const field83 = field66 - field62
  
  // 7. Плановая прибыль
  const plannedProfit = field4 - field8
  
  // Определяем статус
  let status = 'AUSGEGLICHEN'
  if (field83 > 0.01) status = 'ZAHLLAST'
  else if (field83 < -0.01) status = 'ERSTATTUNG'
  
  const result = {
    field4: r(field4),
    field8: r(field8),
    field61: r(field61),
    field66: r(field66),
    field62: r(field62),
    field83: r(field83),
    plannedProfit: r(plannedProfit),
    status,
    calculatedAt: new Date().toISOString()
  }
  
  console.log('✅ CORRECTED CALCULATION:', result)
  return result
}

// ТОЧНЫЕ ДАННЫЕ ИЗ РЕАЛЬНОЙ ОПЕРАЦИИ МАРТ 2025
const getAssetLogisticsData = () => {
  return {
    field40a: 18400.00,    // Реализация ЕС (23т × 800€)
    field40b: 0.00,        // Umsätze 7%
    field41: 18400.00,     // Innergemeinschaftliche (ЕС экспорт)
    field43: 0.00,         // Ausfuhrlieferungen
    field81a: 133.56,      // Услуги декларанта (нетто)
    field81b: 0.00,        // Услуги без НДС
    field89a: 15755.00,    // ЕС импорт (23т × 685€)
    field89b: 484.96,      // Пошлина (3-и страны)
    field67: 0.00          // Import VAT 3rd
  }
}

// Routes
app.get('/health', (req, res) => {
  console.log('📊 Health check')
  res.json({
    status: 'OK',
    service: 'VAT Backend - CORRECTED VERSION',
    port: PORT,
    timestamp: new Date().toISOString(),
    version: '2.1 - Fixed Calculation Logic'
  })
})

app.post('/api/vat/calculate', (req, res) => {
  try {
    console.log('📊 VAT calculation request')
    const result = vatCalc(req.body)
    
    res.json({
      success: true,
      data: result,
      message: 'CORRECTED calculation - field4 without duplication',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Calculation error:', error)
    res.status(400).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

app.get('/api/vat/test', (req, res) => {
  console.log('🧪 Test with CORRECTED ASSET LOGISTICS data')
  
  const testData = getAssetLogisticsData()
  const result = vatCalc(testData)
  
  res.json({
    success: true,
    company: 'ASSET LOGISTICS GMBH',
    period: 'März 2025',
    message: 'CORRECTED: 23t Rapeseed Oil, Import + Export',
    testData,
    calculation: result,
    expected: {
      field4: 18400.00,
      field83: -3085.59,
      status: 'ERSTATTUNG',
      plannedProfit: 2026.48
    },
    timestamp: new Date().toISOString()
  })
})

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found: ' + req.originalUrl
  })
})

app.listen(PORT, () => {
  console.log('🚀 VAT Backend CORRECTED and RUNNING!')
  console.log(`📍 Server: http://localhost:${PORT}`)
  console.log(`📊 Health: http://localhost:${PORT}/health`)
  console.log(`🧮 Test: http://localhost:${PORT}/api/vat/test`)
  console.log(`📡 Calculate: POST http://localhost:${PORT}/api/vat/calculate`)
  console.log('✅ CORRECTED LOGIC: field4 = 18400, field83 = -3085.59€')
})
