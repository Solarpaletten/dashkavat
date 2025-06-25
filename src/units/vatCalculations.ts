// src/units/vatCalculations.ts
// Модульные функции для расчетов НДС

// Field 4 - Общая выручка
export function calculateField4(field40a: number, field40b: number, field41: number, field43: number): number {
  return field40a + field40b + field41 + field43
}

// Field 8 - Общие затраты  
export function calculateField8(field81a: number, field81b: number, field89a: number, field89b: number): number {
  return field81a + field81b + field89a + field89b
}

// Field 61 - Импортный НДС ЕС
export function calculateField61(field89a: number, vatRate19: number): number {
  return field89a * vatRate19
}

// Field 67 - Импорт товара из третьих стран
export function calculateField67(field89b: number, vatRate19: number): number {
  return field89b * vatRate19
}

// Field 66 - НДС со строки 81a (19%)
export function calculateField66(field81a: number, vatRate19: number): number {
  return field81a * vatRate19
}

// Field 62 - Общий зачетный НДС
export function calculateField62(field66: number, field61: number, field67: number): number {
  return field66 + field61 + field67
}

// Field 83 - К доплате/возврату - ИСПРАВЛЕНА ФОРМУЛА!
export function calculateField83(field66: number, field61: number, field67: number, field62: number): number {
  return field66 + field61 + field67 - field62
}

// Планируемая прибыль
export function calculateProfit(field4: number, field8: number): number {
  return field4 - field8
}