/**
 * IT AI SOLAR Dashka SmartStb - VAT Calculator Module
 * Модуль расчета НДС для немецких деклараций (Исправленная версия)
 * @author Dasha's Team & Jimmy
 * @version 2.0.1
 */

class VATCalculator {
    constructor() {
        this.vatRate19 = 0.19;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        
        this.setupEventListeners();
        this.loadDefaultData();
        this.initialized = true;
        console.log('🚀 VAT Calculator initialized v2.0.1');
    }

    setupEventListeners() {
        const inputFields = [
            'field10', 'field40a', 'field40b', 'field41a', 'field41b', 'field43',
            'field81a', 'field81b', 'field89a', 'field89b', 
            'field66', 'field62', 'field67'
        ];

        inputFields.forEach(fieldId => {
            const element = document.getElementById(fieldId);
            if (element) {
                element.addEventListener('input', () => this.handleInputChange(fieldId));
            }
        });
    }

    handleInputChange(fieldId) {
        // Пересчитываем все поля при любом изменении
        this.calculateAllFields();
    }

    getFieldValue(fieldId) {
        const element = document.getElementById(fieldId);
        return parseFloat(element?.value) || 0;
    }

    setFieldValue(fieldId, value) {
        const element = document.getElementById(fieldId);
        if (element) {
            element.value = value.toFixed(2);
        }
    }

    // Новая логика расчетов согласно вашему коду
    calculateAllFields() {
        // 1. Рассчитываем field41 (общий 41)
        const field41a = this.getFieldValue('field41a');
        const field41b = this.getFieldValue('field41b');
        const field41 = field41a + field41b;
        this.setFieldValue('field41', field41);

        // 2. Рассчитываем field81 (общий 81)
        const field81a = this.getFieldValue('field81a');
        const field81b = this.getFieldValue('field81b');
        const field81 = field81a + field81b;
        this.setFieldValue('field81', field81);

        // 3. Рассчитываем field4 (общая выручка)
        const field40a = this.getFieldValue('field40a');
        const field40b = this.getFieldValue('field40b');
        const field43 = this.getFieldValue('field43');
        const field4 = field40a + field40b + field41 + field43;
        this.setFieldValue('field4', field4);

        // 4. Рассчитываем field8 (общие затраты)
        const field89a = this.getFieldValue('field89a');
        const field89b = this.getFieldValue('field89b');
        const field8 = field81a + field81b + field89a + field89b;
        this.setFieldValue('field8', field8);

        // 5. Рассчитываем НДС поля
        const field81c = field81a * this.vatRate19; // НДС с 81a
        const field41c = field41b * this.vatRate19; // НДС с 41b
        const field66a = field40a * this.vatRate19; // НДС с 40a
        const field61 = (field89a + field89b) * this.vatRate19; // НДС с ЕС

        this.setFieldValue('field81c', field81c);
        this.setFieldValue('field41c', field41c);
        this.setFieldValue('field66a', field66a);
        this.setFieldValue('field61', field61);

        // 6. Рассчитываем общий зачетный НДС (field62)
        const field66 = this.getFieldValue('field66');
        const field67 = this.getFieldValue('field67');
        const field62 = field66 + field61 + field67;
        this.setFieldValue('field62', field62);

        // 7. Рассчитываем field83 (К доплате/возврату)
        // Берем НДС от реализации из строки 40a и минусуем зачетный НДС 62
        const outputVat = field66a; // Только НДС с внутренней реализации
        const field83 = outputVat - field62;
        this.setFieldValue('field83', field83);

        // 8. Рассчитываем плановую прибыль
        const plannedProfit = field4 - field8;
        this.setFieldValue('plannedProfit', plannedProfit);

        // 9. Обновляем отображение результата
        this.renderResult(field83, field81c, field41c, outputVat, field62, plannedProfit);

        console.log('[SmartVat Расчет]', {
            field4, field8, field66a, field61, field62, field83, plannedProfit
        });

        return { field83, outputVat, field62, plannedProfit };
    }

    renderResult(balance, vat81c, vat41c, totalOutputVat, totalInputVat, plannedProfit) {
        const resultDiv = document.getElementById('result');
        const resultText = document.getElementById('resultText');
        
        if (!resultDiv || !resultText) return;
        
        const field81a = this.getFieldValue('field81a');
        const field41b = this.getFieldValue('field41b');
        const field40a = this.getFieldValue('field40a');
        const field4 = this.getFieldValue('field4');
        const field8 = this.getFieldValue('field8');
        
        let statusHTML = '';
        let statusColor = '';
        
        if (balance > 0) {
            statusHTML = `💸 К ДОПЛАТЕ: ${balance.toFixed(2)} €`;
            statusColor = '#d32f2f';
        } else if (balance < 0) {
            statusHTML = `💰 К ВОЗВРАТУ: ${Math.abs(balance).toFixed(2)} €`;
            statusColor = '#388e3c';
        } else {
            statusHTML = `⚖️ БАЛАНС: 0.00 €`;
            statusColor = '#1976d2';
        }
        
        resultText.innerHTML = `
            <strong style="color: ${statusColor}; font-size: 20px;">${statusHTML}</strong><br><br>
            <div style="text-align: left; background: #f5f5f5; padding: 15px; border-radius: 8px;">
                📊 <strong>Расчет НДС по порядку:</strong><br><br>
                
                <strong>1. Выручка (field 4):</strong> ${field4.toFixed(2)} € 
                <small>(40a + 40b + 41 + 43)</small><br>
                
                <strong>2. Затраты (field 8):</strong> ${field8.toFixed(2)} € 
                <small>(81a + 81b + 89a + 89b)</small><br><br>
                
                <strong>3. НДС к начислению:</strong><br>
                • 81c (19% с ${field81a.toFixed(2)}€): ${vat81c.toFixed(2)} € <em>(не в 83)</em><br>
                • 41c (19% с ${field41b.toFixed(2)}€): ${vat41c.toFixed(2)} € <em>(не в 83)</em><br>
                • 66a (19% с ${field40a.toFixed(2)}€): <strong>${totalOutputVat.toFixed(2)} €</strong> <em>(идет в 83)</em><br><br>
                
                <strong>4. Зачетный НДС (field 62):</strong> ${totalInputVat.toFixed(2)} € 
                <small>(66 + 61 + 67)</small><br><br>
                
                <div style="background: rgba(255,255,255,0.8); padding: 15px; border-radius: 8px; border-left: 4px solid #1976d2;">
                    <strong>Field 83 = ${totalOutputVat.toFixed(2)} - ${totalInputVat.toFixed(2)} = ${balance.toFixed(2)} €</strong><br>
                    <em>Берем НДС от 40a и минусуем весь зачетный НДС 62</em>
                </div><br>
                
                📈 <strong style="color: ${plannedProfit >= 0 ? '#388e3c' : '#d32f2f'};">Плановая прибыль: ${plannedProfit.toFixed(2)} €</strong>
                <small>(выручка ${field4.toFixed(2)} € - затраты ${field8.toFixed(2)} €)</small>
            </div>
        `;
        
        // Обновляем профит в отдельном блоке
        this.updateProfitBreakdown(field4, field8, plannedProfit);
        
        resultDiv.style.display = 'block';
    }

    updateProfitBreakdown(revenue, costs, profit) {
        const profitBreakdown = document.getElementById('profitBreakdown');
        if (profitBreakdown) {
            const profitColor = profit >= 0 ? '#388e3c' : '#d32f2f';
            const profitIcon = profit >= 0 ? '📈' : '📉';
            
            profitBreakdown.innerHTML = `
                Общая выручка (4): <strong style="color: #388e3c;">${revenue.toFixed(2)} €</strong><br>
                Общие затраты (8): <strong style="color: #d32f2f;">${costs.toFixed(2)} €</strong><br>
                ${profitIcon} <strong style="color: ${profitColor};">Плановая прибыль: ${profit.toFixed(2)} €</strong>
            `;
        }
    }

    loadDefaultData() {
        const defaultData = {
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
        };

        Object.entries(defaultData).forEach(([fieldId, value]) => {
            this.setFieldValue(fieldId, value);
        });

        this.calculateAllFields();
    }

    exportData() {
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
            data: {
                field10: this.getFieldValue('field10'), // Номер декларации
                field40a: this.getFieldValue('field40a'),// это у нас реализация с НДС внутри Германии Отар отображаем объем суммы без НДС
                field40b: this.getFieldValue('field40b'),// Это у нас реализация без НДС внутри Германии отображаем сумму без НДС
                field41: this.getFieldValue('field41'), // это у нас реализация внутри Евросоюза Чехия Польша Норвегия Отображаем сумму без НДС с нулевой ставкой НДС
                field43: this.getFieldValue('field43'), // это у нас реализация в третьи страны Казахстан отображаем сумму без НДС с нулевой ставкой НДС
                field4: this.getFieldValue('field4'), // Это у нас сумма реализации товара именно выручки для определения общей выручки для расчёта прибыли 
                field81a: this.getFieldValue('field81a'), // У нас приобретение внутри Германии здесь включён только нетто товара без НДС
                field81b: this.getFieldValue('field81b'), // Это у нас приобретение товара и услуг внутри Германии без НДС здесь только товар без НДС 
                field89a: this.getFieldValue('field89a'), // Приобретение внутри ЕС по 0% НДС
                field89b: this.getFieldValue('field89b'), // Импортные пошлины
                field8: this.getFieldValue('field8'), // Это у нас сумма общего нетто приобретённого для определения себестоимости покупной стоимости для расчёта прибыли 
                field66: this.getFieldValue('field66'), // Это у нас сумма НДС строке 40 а 
                field61: this.getFieldValue('field61'), // Это у нас сумма импортного НДС приобретённого внутри Евросоюза товара 
                field67: this.getFieldValue('field67'), // У нас сумма импортного НДС приобретённого товара из третьих стран
                field62: this.getFieldValue('field62'), // Это у нас сумма 61 66 67 
                field83: this.getFieldValue('field83'), // Сумма НДС который нужно уплатить реализации из строки берём 40a И минусуем все что у нас есть по зачетном ндс 62 
                plannedProfit: this.getFieldValue('plannedProfit')
            },
            calculations: this.calculateAllFields()
        };
    }

    // Добавляем отдельные методы для совместимости
    updateTotal81() {
        this.calculateAllFields();
    }

    updateTotal41() {
        this.calculateAllFields();
    }

    calculateTax() {
        return this.calculateAllFields();
    }

    calculateProfit() {
        const field4 = this.getFieldValue('field4');
        const field8 = this.getFieldValue('field8');
        return field4 - field8;
    }
}

// Глобальные функции для совместимости
let vatCalculator;

function updateTotal81() {
    vatCalculator?.updateTotal81();
}

function updateTotal41() {
    vatCalculator?.updateTotal41();
}

function calculateTax() {
    return vatCalculator?.calculateTax();
}

function loadRealData() {
    vatCalculator?.loadDefaultData();
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    vatCalculator = new VATCalculator();
    window.vatCalculator = vatCalculator; // Глобальный доступ
    vatCalculator.init();
});

console.log("✅ Dashka SmartStb VAT Module v2.0.1 — ready for launch");