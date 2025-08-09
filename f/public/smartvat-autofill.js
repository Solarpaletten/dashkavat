// 🎯 SMARTVAT AUTO-FILL SCRIPT для vat.swapoil.de
// Version: März 2025 - ASSET LOGISTICS REAL CASE

console.log('🚀 SmartVat Auto-Fill Script loaded - März 2025 Version')

// Глобальная функция автозаполнения
window.fillSmartVatData = function() {
  console.log('🧮 Starting SmartVat Auto-Fill...')
  
  // Получаем сохраненные данные
  const savedData = localStorage.getItem('smartvat_calculation')
  if (!savedData) {
    alert('❌ Данные SmartVat не найдены!\n\nСначала:\n1. Выполните расчет в SmartVat\n2. Нажмите "Открыть vat.swapoil.de"\n3. Вернитесь сюда и выполните fillSmartVatData()')
    return false
  }
  
  let data
  try {
    data = JSON.parse(savedData)
    console.log('📊 Loaded SmartVat data:', data)
  } catch (error) {
    alert('❌ Ошибка чтения данных SmartVat: ' + error.message)
    return false
  }
  
  // Проверяем правильную страницу
  if (!window.location.href.includes('vat.swapoil.de') && 
      !window.location.href.includes('localhost')) {
    alert('❌ Этот скрипт работает только на vat.swapoil.de')
    return false
  }
  
  console.log('🎯 Target page confirmed, starting field mapping...')
  
  // Функция поиска и заполнения поля
  const fillField = (selectors, value, label) => {
    for (const selector of selectors) {
      const element = document.querySelector(selector)
      if (element) {
        const oldValue = element.value
        element.value = typeof value === 'number' ? value.toFixed(2) : value
        
        // Триггерим события для обновления формы
        element.dispatchEvent(new Event('input', { bubbles: true }))
        element.dispatchEvent(new Event('change', { bubbles: true }))
        element.dispatchEvent(new Event('blur', { bubbles: true }))
        
        // Дополнительные события для сложных форм
        element.dispatchEvent(new Event('keyup', { bubbles: true }))
        element.dispatchEvent(new Event('paste', { bubbles: true }))
        
        console.log(`✅ ${label}: "${oldValue}" → "${element.value}"`)
        return true
      }
    }
    console.warn(`⚠️  ${label}: поле не найдено в форме`)
    return false
  }
  
  // МАППИНГ ПОЛЕЙ для vat.swapoil.de (адаптировать под реальную структуру)
  const fieldMappings = [
    // === UMSÄTZE (ВЫРУЧКА) ===
    {
      selectors: [
        'input[name="field40a"]', 'input[id="field40a"]', 'input[data-field="40a"]',
        '#field_40a', '#umsatz_19', 'input[placeholder*="40a"]',
        'input[data-code="40a"]', '[name="40a"]'
      ],
      value: data.inputData?.field40a || 18400.00,
      label: 'Field 40a - Umsätze 19% (ЕС экспорт)'
    },
    
    {
      selectors: [
        'input[name="field41a"]', 'input[id="field41a"]', 'input[data-field="41a"]',
        '#field_41a', '#innergemeinschaftlich', 'input[placeholder*="41a"]'
      ],
      value: data.inputData?.field41 || 18400.00,
      label: 'Field 41a - Innergemeinschaftliche Lieferungen'
    },
    
    // === VORSTEUER (ЗАЧЕТНЫЙ НДС) ===
    {
      selectors: [
        'input[name="field66"]', 'input[id="field66"]', 'input[data-field="66"]',
        '#field_66', '#vorsteuer_rechnungen', 'input[placeholder*="66"]'
      ],
      value: data.field66 || 0.00,
      label: 'Field 66 - Vorsteuer aus Rechnungen'
    },
    
    {
      selectors: [
        'input[name="field61"]', 'input[id="field61"]', 'input[data-field="61"]',
        '#field_61', '#import_ust_eu', 'input[placeholder*="61"]'
      ],
      value: data.field61 || 3085.59,
      label: 'Field 61 - Import-USt EU'
    },
    
    {
      selectors: [
        'input[name="field62"]', 'input[id="field62"]', 'input[data-field="62"]',
        '#field_62', '#einfuhrumsatzsteuer', 'input[placeholder*="62"]'
      ],
      value: data.field62 || 3085.59,
      label: 'Field 62 - Entrichtete Einfuhrumsatzsteuer'
    },
    
    {
      selectors: [
        'input[name="field67"]', 'input[id="field67"]', 'input[data-field="67"]',
        '#field_67', '#vorsteuer_innergemeinschaftlich', 'input[placeholder*="67"]'
      ],
      value: data.inputData?.field67 || 0.00,
      label: 'Field 67 - Vorsteuer innergemeinschaftliche Erwerbe'
    },
    
    // === ERGEBNIS ===
    {
      selectors: [
        'input[name="field83"]', 'input[id="field83"]', 'input[data-field="83"]',
        '#field_83', '#zahllast', '#erstattung', 'input[placeholder*="83"]'
      ],
      value: data.field83 || -3085.59,
      label: 'Field 83 - Zahllast/Erstattung'
    },
    
    // === EU IMPORT DATA ===
    {
      selectors: [
        'input[name="field89a"]', 'input[id="field89a"]', 'input[data-field="89a"]',
        '#field_89a', '#eu_erwerb', 'input[placeholder*="89a"]'
      ],
      value: data.inputData?.field89a || 15755.00,
      label: 'Field 89a - EU Erwerb'
    },
    
    {
      selectors: [
        'input[name="field89b"]', 'input[id="field89b"]', 'input[data-field="89b"]',
        '#field_89b', '#drittland', 'input[placeholder*="89b"]'
      ],
      value: data.inputData?.field89b || 484.96,
      label: 'Field 89b - Drittland Import'
    }
  ]
  
  // Заполняем все поля
  let filledCount = 0
  let foundFields = []
  
  fieldMappings.forEach(mapping => {
    if (fillField(mapping.selectors, mapping.value, mapping.label)) {
      filledCount++
      foundFields.push(mapping.label)
    }
  })
  
  // Заполняем метаданные компании
  fillField(
    ['input[name="company"]', '#company', '#firma', 'input[placeholder*="Company"]'],
    'ASSET LOGISTICS GMBH',
    'Company Name'
  )
  
  fillField(
    ['input[name="period"]', '#period', '#zeitraum', 'input[placeholder*="Period"]'],
    '2025-03',
    'Period'
  )
  
  fillField(
    ['input[name="steuernummer"]', '#steuernummer', 'input[placeholder*="Steuer"]'],
    'DE987654321',
    'Steuernummer'
  )
  
  // Результат автозаполнения
  if (filledCount > 0) {
    const resultMessage = `✅ SmartVat Auto-Fill завершен успешно!

📊 РЕЗУЛЬТАТЫ:
• Заполнено полей: ${filledCount}
• Field 83: ${data.field83?.toFixed(2)}€
• Status: ${data.status}
• Компания: ASSET LOGISTICS GMBH
• Период: März 2025

🎯 ОПЕРАЦИЯ:
Import: 23t × 685€ = 15,755€
Export: 23t × 800€ = 18,400€ (0% VAT ЕС)

⚠️ ВАЖНО: Проверьте все данные перед отправкой!`

    alert(resultMessage)
    console.log('🎉 SmartVat Auto-Fill completed successfully!')
    console.log('📋 Filled fields:', foundFields)
    
    // Подсвечиваем заполненные поля
    setTimeout(() => {
      document.querySelectorAll('input[value]:not([value=""])').forEach(input => {
        if (parseFloat(input.value) !== 0 || input.value.includes('ASSET')) {
          input.style.backgroundColor = '#dcfce7' // light green
          input.style.border = '2px solid #22c55e'
          input.style.boxShadow = '0 0 5px rgba(34, 197, 94, 0.3)'
        }
      })
    }, 500)
    
    // Дополнительная проверка ключевых полей
    setTimeout(() => {
      const field83 = document.querySelector('input[name="field83"], #field_83')
      if (field83 && Math.abs(parseFloat(field83.value) - data.field83) < 0.1) {
        console.log('✅ Field 83 verification passed:', field83.value)
      } else {
        console.warn('⚠️ Field 83 verification failed')
      }
    }, 1000)
    
  } else {
    const errorMessage = `❌ Автозаполнение не удалось!

Возможные причины:
• Структура формы изменилась
• Поля имеют другие названия
• JavaScript заблокирован

🔧 Ручное заполнение:
Field 66: ${data.field66?.toFixed(2)}€
Field 61: ${data.field61?.toFixed(2)}€
Field 62: ${data.field62?.toFixed(2)}€
Field 83: ${data.field83?.toFixed(2)}€

💡 Попробуйте:
1. Обновить страницу
2. Проверить консоль (F12)
3. Заполнить поля вручную`

    alert(errorMessage)
    console.error('❌ Auto-fill failed - no fields found')
    
    // Показать все доступные input поля для отладки
    console.log('🔍 Available input fields on page:')
    document.querySelectorAll('input').forEach((input, index) => {
      console.log(`${index}: `, {
        name: input.name,
        id: input.id,
        placeholder: input.placeholder,
        type: input.type,
        className: input.className
      })
    })
  }
  
  return filledCount > 0
}

// Автоматическое добавление кнопки на страницу
window.addEventListener('load', function() {
  console.log('🌐 Page loaded, checking for SmartVat data...')
  
  const hasData = localStorage.getItem('smartvat_calculation')
  
  if (hasData && (window.location.href.includes('vat.swapoil.de') || 
                  window.location.href.includes('localhost'))) {
    
    console.log('📊 SmartVat data found, creating auto-fill button...')
    
    // Создаем floating кнопку
    const button = document.createElement('button')
    button.innerHTML = '🚀 SmartVat Auto-Fill'
    button.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      background: linear-gradient(135deg, #22c55e, #16a34a);
      color: white;
      border: none;
      padding: 15px 25px;
      border-radius: 12px;
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0 8px 25px rgba(34, 197, 94, 0.3);
      transition: all 0.3s ease;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `
    
    // Hover effects
    button.onmouseover = () => {
      button.style.transform = 'translateY(-2px)'
      button.style.boxShadow = '0 12px 35px rgba(34, 197, 94, 0.4)'
    }
    button.onmouseout = () => {
      button.style.transform = 'translateY(0)'
      button.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.3)'
    }
    
    button.onclick = () => {
      console.log('🔄 Auto-fill button clicked')
      window.fillSmartVatData()
    }
    
    document.body.appendChild(button)
    
    console.log('✅ SmartVat Auto-Fill ready!')
    console.log('💡 Use: fillSmartVatData() or click the button')
    
    // Показать информацию о данных
    try {
      const data = JSON.parse(hasData)
      console.log('📋 Ready to fill with data:', {
        field83: data.field83,
        status: data.status,
        company: data.company,
        timestamp: data.timestamp
      })
    } catch (e) {
      console.warn('⚠️ Could not parse SmartVat data')
    }
    
  } else {
    console.log('ℹ️ No SmartVat data found or wrong page')
  }
})

// Экспорт для использования в других скриптах
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fillSmartVatData: window.fillSmartVatData }
}

console.log('✅ SmartVat Auto-Fill Script initialized - März 2025 Version')
