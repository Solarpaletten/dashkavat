// 🎯 РЕАЛЬНЫЙ CASE ASSET LOGISTICS - МАРТ 2025

interface RealVatCase {
  // Приобретение (Import)
  import: {
    goods_cost: 15755.00      // 23т × 685€
    import_vat: 3085.59       // Зачетный НДС с импорта
    customs_duty: 484.96      // Пошлина
    declarant_services: 133.56 // Услуги декларанта (без НДС)
    declarant_vat: 25.38      // НДС с услуг декларанта
  }
  
  // Реализация (Export)
  export: {
    goods_sale: 18400.00      // 23т × 800€  
    vat_rate: 0               // 0% для ЕС экспорта
    output_vat: 0.00          // Начисленный НДС = 0
  }
  
  // VAT Calculation
  calculation: {
    field40a: 18400.00        // Umsätze 19% (фактически 0%, но сумма)
    field66: 0.00             // НДС с реализации (0% ставка)
    field61: 3085.59          // Import VAT EU (зачетный)
    field67: 0.00             // Import VAT 3rd countries
    field81a: 133.56          // Услуги декларанта (с НДС)
    field89a: 15755.00        // ЕС приобретения
    field89b: 484.96          // Импорт из 3-х стран (пошлина)
  }
}

// ТОЧНЫЙ РАСЧЕТ ПО ДОКУМЕНТАМ:
const realCalculation = () => {
  // Входные данные из документов
  const field40a = 18400.00    // Реализация (формально 19%, но фактически 0%)
  const field81a = 133.56      // Услуги декларанта (нетто)
  const field89a = 15755.00    // ЕС импорт (нетто) 
  const field89b = 484.96      // Пошлина (3-и страны)
  const field67 = 0.00         // НДС с 3-х стран
  
  // Расчеты
  const field4 = field40a + 0 + 0 + 0              // = 18400.00€ (выручка)
  const field8 = field81a + 0 + field89a + field89b // = 16373.52€ (затраты)
  
  // НДС расчеты
  const field66 = 0.00                             // НДС с реализации (0% ставка!)
  const field61 = (field89a + field89b) * 0.19     // = 3085.59€ (импортный НДС)
  const field62 = field66 + field61 + field67      // = 3085.59€ (общий зачетный)
  const field83 = field66 - field62                // = -3085.59€ (к возврату!)
  
  const plannedProfit = field4 - field8            // = 2026.48€
  
  return {
    field4,     // 18400.00€
    field8,     // 16373.52€  
    field66,    // 0.00€ (!)
    field61,    // 3085.59€
    field62,    // 3085.59€
    field83,    // -3085.59€ (ERSTATTUNG!)
    plannedProfit // 2026.48€
  }
}

// РЕЗУЛЬТАТ ТОЧНО КАК В PDF:
/*
📊 Результат расчета НДС:
💰 К ВОЗВРАТУ: 3085.59€ (а не 3124.46€)

📊 Расчет:
- field66 (НДС с реализации): 0.00€ (0% ставка для ЕС)
- field61 (Import VAT): 3085.59€ 
- field62 (Общий зачетный): 3085.59€
- field83 = 0.00 - 3085.59 = -3085.59€

📈 Плановая прибыль: 2026.48€
*/

// MAPPING для автозаполнения официальной формы:
const officialFormMapping = {
  // Umsätze
  "field_40a": 18400.00,      // Реализация в ЕС (0% VAT)
  "field_40b": 0.00,          // Umsätze 7%
  "field_41a": 18400.00,      // Innergemeinschaftliche Lieferungen  
  "field_41b": 0.00,          // Inlandslieferungen
  "field_43": 0.00,           // Ausfuhrlieferungen
  
  // Vorsteuer  
  "field_66": 0.00,           // Vorsteuer aus Rechnungen
  "field_61": 3085.59,        // Import-USt EU
  "field_62": 3085.59,        // Entrichtete Einfuhrumsatzsteuer
  "field_67": 0.00,           // Vorsteuer innergemeinschaftliche
  
  // Ergebnis
  "field_83": -3085.59,       // Zahllast/Erstattung
  
  // Metadaten
  "company": "ASSET LOGISTICS GMBH",
  "period": "2025-03",
  "steuernummer": "DE987654321"
}

export { realCalculation, officialFormMapping }