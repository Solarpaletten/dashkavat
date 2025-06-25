// src/core/SmartVatCalculator.ts
import {
  calculateField4,
  calculateField8,
  calculateField61,
  calculateField67,
  calculateField66,
  calculateField62,
  calculateField83,
  calculateProfit
} from '../units/vatCalculations'

// Типы для результатов расчетов
export interface VatCalculationResult {
  field83: number
  field66: number
  field62: number
  field67: number
  field61: number
  field4: number
  field8: number
  plannedProfit: number
}

export interface VatData {
  field10: number
  field40a: number
  field40b: number
  field41: number
  field43: number
  field4: number
  field81a: number
  field81b: number
  field89a: number
  field89b: number
  field8: number
  field66: number
  field61: number
  field67: number
  field62: number
  field83: number
  plannedProfit: number
}

export interface CompanyData {
  name: string
  address: string
  hrb: string
  steuernummer: string
}

export interface ExportData {
  company: CompanyData
  period: string
  timestamp: string
  software: string
  data: VatData
  calculations: VatCalculationResult
}

export default class SmartVatCalculator {
  private vatRate19: number = 0.19 // Mehrwertsteuersatz 19%
  private initialized: boolean = false
  private data: VatData

  constructor() {
    // Инициализируем данные нулевыми значениями
    this.data = {
      field10: 0,
      field40a: 0,
      field40b: 0,
      field41: 0,
      field43: 0,
      field4: 0,
      field81a: 0,
      field81b: 0,
      field89a: 0,
      field89b: 0,
      field8: 0,
      field66: 0,
      field61: 0,
      field67: 0,
      field62: 0,
      field83: 0,
      plannedProfit: 0
    }
  }

  init(): void {
    if (this.initialized) return
    
    this.loadDefaultData()
    this.initialized = true
    console.log('🚀 SmartVat Calculator initialized - Modular Architecture Style')
  }

  // Метод для установки значений полей
  setFieldValue(fieldId: keyof VatData, value: number): void {
    this.data[fieldId] = value
  }

  // Метод для получения значений полей
  getFieldValue(fieldId: keyof VatData): number {
    return this.data[fieldId] || 0
  }

  // Обновление одного поля и пересчет
  updateField(fieldId: keyof VatData, value: number): VatCalculationResult {
    this.setFieldValue(fieldId, value)
    return this.calculateAllFields()
  }

  calculateAllFields(): VatCalculationResult {
    // Получаем значения всех полей
    const field40a = this.getFieldValue('field40a')
    const field40b = this.getFieldValue('field40b')
    const field41 = this.getFieldValue('field41')
    const field43 = this.getFieldValue('field43')
    const field81a = this.getFieldValue('field81a')
    const field81b = this.getFieldValue('field81b')
    const field89a = this.getFieldValue('field89a')
    const field89b = this.getFieldValue('field89b')

    // Расчёты через импортированные модульные функции
    const field4 = calculateField4(field40a, field40b, field41, field43)
    const field8 = calculateField8(field81a, field81b, field89a, field89b)
    const field61 = calculateField61(field89a, this.vatRate19)
    const field67 = calculateField67(field89b, this.vatRate19)
    const field66 = calculateField66(field81a, this.vatRate19)
    const field62 = calculateField62(field66, field61, field67)
    const field83 = calculateField83(field66, field61, field67, field62)
    const plannedProfit = calculateProfit(field4, field8)

    // Сохраняем значения в data
    this.setFieldValue('field4', field4)
    this.setFieldValue('field8', field8)
    this.setFieldValue('field61', field61)
    this.setFieldValue('field67', field67)
    this.setFieldValue('field66', field66)
    this.setFieldValue('field62', field62)
    this.setFieldValue('field83', field83)
    this.setFieldValue('plannedProfit', plannedProfit)

    // Обновляем интерфейс
    this.updateProfitDisplay(field83, plannedProfit)

    console.log('[🔁 Расчет через импортированные модульные функции]', {
      field4, field8, field66, field61, field62, field83, plannedProfit
    })

    return { 
      field83, 
      field66, 
      field62, 
      field67, 
      field61, 
      field4, 
      field8, 
      plannedProfit 
    }
  }

  updateProfitDisplay(field83: number, plannedProfit: number): void {
    // Эта функция для совместимости - в React мы не используем DOM напрямую
    console.log(`💸 Field83: ${field83.toFixed(2)}€, 📈 Profit: ${plannedProfit.toFixed(2)}€`)
  }

  loadDefaultData(): void {
    const defaultData: Partial<VatData> = {
      field10: 0,
      field40a: 18400.00,
      field40b: 0.00,
      field41: 0.00,
      field43: 0.00,
      field4: 18400.00,
      field81a: 133.56, // Весь НДС по покупке в Германии
      field81b: 0, // Это у нас приобретение товара и услуг внутри Германии без НДС здесь только товар без НДС
      field89a: 15755.00, // Это у нас приобретение товара внутри Евросоюза по нулевой ставки НДС отражается начислены в строке 61
      field89b: 484.96, // оплата пошлины которые добавляются к себестоимости импортного товара 
      field83: 0.00, // это у нас
      field8: 16373.52, // 133,56+15755+484,96
      field66: 25.38, // сумма НДС  
      field61: 3085.59, // (15755+484.96)*19/100=3085,59
      field67: 0,
      field62: 3110.97 // 25,38+3085,59+0=3110,97
    }

    Object.entries(defaultData).forEach(([fieldId, value]) => {
      this.setFieldValue(fieldId as keyof VatData, value as number)
    })

    this.calculateAllFields()
    console.log('📊 Стандартные данные загружены точно по вашей логике')
  }

  // Метод для получения всех данных
  getAllData(): VatData {
    return { ...this.data }
  }

  // Метод для установки всех данных
  setAllData(newData: Partial<VatData>): VatCalculationResult {
    Object.entries(newData).forEach(([fieldId, value]) => {
      if (value !== undefined) {
        this.setFieldValue(fieldId as keyof VatData, value as number)
      }
    })
    return this.calculateAllFields()
  }

  exportData(): ExportData {
    return {
      company: {
        name: 'ASSET LOGISTICS GMBH',
        address: 'Kurze Straße 6, 06366 Köthen',
        hrb: '34481',
        steuernummer: 'DE453202061'
      },
      period: 'März 2025',
      timestamp: new Date().toISOString(),
      software: 'IT AI SOLAR Dashka SmartStb v2.0.1',
      data: this.getAllData(),
      calculations: this.calculateAllFields()
    }
  }

  // Алиасы для совместимости
  calculateTax(): VatCalculationResult {
    return this.calculateAllFields()
  }

  updateTotal81(): VatCalculationResult {
    return this.calculateAllFields()
  }

  updateTotal41(): VatCalculationResult {
    return this.calculateAllFields()
  }
}