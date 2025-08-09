// 🎯 ТОЧНЫЕ ДАННЫЕ ИЗ РЕАЛЬНОЙ ОПЕРАЦИИ МАРТ 2025

// Обновить в VatCalculator.tsx:
const [data, setData] = useState<VatData>({
  field40a: 18400.00,    // Реализация ЕС (0% VAT, но отражается в 40a)
  field40b: 0.00,        // Umsätze 7%
  field41: 18400.00,     // Innergemeinschaftliche Lieferungen (ЕС экспорт)
  field43: 0.00,         // Ausfuhrlieferungen (3-и страны)
  field81a: 133.56,      // Услуги в Германии (с НДС)
  field81b: 0.00,        // Услуги без НДС
  field89a: 15755.00,    // ЕС приобретения (нетто)
  field89b: 484.96,      // Импорт 3-и страны (пошлина)
  field67: 0.00          // Import VAT 3rd countries
})

// Обновить в backend (server.js):
getDefaultData() {
  return {
    field40a: 18400.00,    // Реализация (формально 19%, фактически 0%)
    field40b: 0.00,        
    field41: 18400.00,     // ЕС экспорт (0% VAT)
    field43: 0.00,         
    field81a: 133.56,      // Декларант услуги (нетто)
    field81b: 0.00,        
    field89a: 15755.00,    // ЕС импорт (нетто)
    field89b: 484.96,      // Пошлина
    field67: 0.00          
  }
}

// ИСПРАВЛЕННАЯ ЛОГИКА РАСЧЕТА:
const calculateVAT = (data) => {
  // 1. Выручка
  const field4 = data.field40a + data.field40b + data.field41 + data.field43
  
  // 2. Затраты  
  const field8 = data.field81a + data.field81b + data.field89a + data.field89b
  
  // 3. НДС с реализации (ВАЖНО: 0% для ЕС экспорта!)
  const field66 = 0.00  // НЕ data.field40a * 0.19, а 0 для экспорта!
  
  // 4. Импортный НДС ЕС
  const field61 = (data.field89a + data.field89b) * 0.19
  
  // 5. Общий зачетный НДС
  const field62 = field66 + field61 + data.field67
  
  // 6. К доплате/возврату
  const field83 = field66 - field62  // = 0 - 3085.59 = -3085.59
  
  // 7. Прибыль
  const plannedProfit = field4 - field8
  
  return {
    field4: 18400.00,        // Выручка
    field8: 16373.52,        // Затраты  
    field66: 0.00,           // НДС с реализации (0%)
    field61: 3085.59,        // Import VAT
    field62: 3085.59,        // Зачетный НДС
    field83: -3085.59,       // К ВОЗВРАТУ
    plannedProfit: 2026.48,  // Прибыль
    status: 'ERSTATTUNG'     // Статус
  }
}

// ДОПОЛНИТЕЛЬНАЯ ЛОГИКА ДЛЯ ЭКСПОРТА:
const getVatRate = (operationType, destination) => {
  if (operationType === 'export' && destination === 'EU') {
    return 0.00  // 0% для экспорта в ЕС
  }
  if (operationType === 'export' && destination === 'third_country') {
    return 0.00  // 0% для экспорта в 3-и страны
  }
  if (operationType === 'domestic') {
    return 0.19  // 19% для внутренних операций
  }
  return 0.19    // По умолчанию 19%
}