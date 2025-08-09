/**
 * SmartVat Calculator - Enhanced VAT Calculation Engine
 * Расширенный модуль расчета НДС в стиле Fraubüller
 * @author IT AI SOLAR Team - Leanid, Dashka, Jimmy
 * @version 2.0 Enhanced - English Code + Deutsche Kommentare
 */

class SmartVatCalculator {
    constructor() {
        this.vatRate19 = 0.19; // Mehrwertsteuersatz 19%
        this.initialized = false; // Initialisierungsstatus
    }

    init() {
        if (this.initialized) return;
        
        this.setupEventListeners(); // Event-Listener für alle Eingabefelder einrichten
        this.loadDefaultData(); // Standarddaten für ASSET LOGISTICS laden
        this.updateCurrentDate(); // Aktuelles Datum setzen
        this.initialized = true;
        console.log('🚀 SmartVat Calculator initialized - Fraubüller Style');
    }

    setupEventListeners() {
        // Event-Listener ТОЛЬКО для полей из вашей логики
        const inputFields = [
            'field10', 'field40a', 'field40b', 'field41', 'field43',
            'field81a', 'field81b', 'field89a', 'field89b', 'field67'
        ];

        inputFields.forEach(fieldId => {
            const element = document.getElementById(fieldId);
            if (element) {
                element.addEventListener('input', () => this.calculateAllFields());
            }
        });
    }

    updateCurrentDate() {
        // Aktuelles Datum und Uhrzeit in deutschem Format setzen
        const now = new Date();
        const dateString = now.toLocaleDateString('de-DE') + ' / ' + now.toLocaleTimeString('de-DE');
        const dateElement = document.getElementById('currentDate');
        if (dateElement) {
            dateElement.textContent = dateString;
        }
    }

    getFieldValue(fieldId) {
        // Wert aus Eingabefeld holen und in Zahl umwandeln
        const element = document.getElementById(fieldId);
        return parseFloat(element?.value) || 0;
    }

    setFieldValue(fieldId, value) {
        // Wert in Eingabefeld setzen (formatiert auf 2 Dezimalstellen)
        const element = document.getElementById(fieldId);
        if (element) {
            element.value = value.toFixed(2);
        }
    }

    calculateAllFields() {
        // ВАША ЛОГИКА: Расчеты по точным формулам из комментариев
        
        // 1. field4 = 40a + 40b + 41 + 43 (общая выручка)
        const field40a = this.getFieldValue('field40a');
        const field40b = this.getFieldValue('field40b');
        const field41 = this.getFieldValue('field41');
        const field43 = this.getFieldValue('field43');
        const field4 = field40a + field40b + field41 + field43;
        this.setFieldValue('field4', field4);

        // 2. field8 = 81a + 81b + 89a + 89b (общие затраты)
        const field81a = this.getFieldValue('field81a');
        const field81b = this.getFieldValue('field81b');
        const field89a = this.getFieldValue('field89a');
        const field89b = this.getFieldValue('field89b');
        const field8 = field81a + field81b + field89a + field89b;
        this.setFieldValue('field8', field8);

        // 3. field61 = (89a + 89b) * 19% - импортный НДС ЕС
        const field61 = (field89a + field89b) * this.vatRate19;
        this.setFieldValue('field61', field61);

        // 4. field66 = НДС со строки 40a (19%)
        const field66 = field40a * this.vatRate19;
        this.setFieldValue('field66', field66);

        // 5. field62 = 66 + 61 + 67 (общий зачетный НДС)
        const field67 = this.getFieldValue('field67');
        const field62 = field66 + field61 + field67;
        this.setFieldValue('field62', field62);

        // 6. field83 = НДС от 40a МИНУС зачетный НДС 62
        const field83 = field66 - field62;
        this.setFieldValue('field83', field83);

        // 7. plannedProfit = field4 - field8 (выручка - затраты)
        const plannedProfit = field4 - field8;
        this.setFieldValue('plannedProfit', plannedProfit);

        // Обновляем дисплей
        this.updateProfitDisplay(field83, plannedProfit);

        console.log('[Расчет по ВАШЕЙ логике]', {
            field4, field8, field66, field61, field62, field83, plannedProfit
        });

        return { field83, field66, field62, plannedProfit };
    }

    updateProfitDisplay(field83, plannedProfit) {
        // Gewinn- und USt-Anzeige im Control-Panel aktualisieren
        const display = document.getElementById('profitDisplay');
        if (!display) return;

        let statusText = '';
        let statusColor = '';

        // USt-Status bestimmen
        if (field83 > 0) {
            statusText = `💸 Zahllast: ${field83.toFixed(2)}€`;
            statusColor = '#d32f2f';
        } else if (field83 < 0) {
            statusText = `💰 Erstattung: ${Math.abs(field83).toFixed(2)}€`;
            statusColor = '#4caf50';
        } else {
            statusText = `⚖️ Ausgeglichen: 0.00€`;
            statusColor = '#1976d2';
        }

        // Gewinn-Status bestimmen  
        const profitText = plannedProfit >= 0 ? 
            `📈 Gewinn: ${plannedProfit.toFixed(2)}€` : 
            `📉 Verlust: ${Math.abs(plannedProfit).toFixed(2)}€`;
        const profitColor = plannedProfit >= 0 ? '#4caf50' : '#d32f2f';

        // HTML für die Anzeige erstellen
        display.innerHTML = `
            <span style="color: ${statusColor}; font-weight: bold;">${statusText}</span> | 
            <span style="color: ${profitColor}; font-weight: bold;">${profitText}</span>
        `;
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
        console.log('📊 Стандартные данные загружены точно по вашей логике');
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

    // Kompatibilitätsmethoden für HTML-Aufrufe
    updateTotal81() { this.calculateAllFields(); }
    updateTotal41() { this.calculateAllFields(); }
    calculateTax() { return this.calculateAllFields(); }
}

// Globale Instanz und Funktionen
let smartVatCalculator;

// HTML-kompatible Funktionen
function calculateTax() {
    return smartVatCalculator?.calculateTax();
}

function loadRealData() {
    smartVatCalculator?.loadDefaultData();
}

// Initialisierung beim Laden der Seite
document.addEventListener('DOMContentLoaded', function() {
    smartVatCalculator = new SmartVatCalculator();
    window.smartVatCalculator = smartVatCalculator; // Globaler Zugriff
    smartVatCalculator.init();
});

console.log("✅ SmartVat Calculator Module v2.0 Enhanced — Fraubüller Style ready");