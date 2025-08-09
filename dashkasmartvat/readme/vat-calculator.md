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
        // Простая логика ТОЧНО по вашим полям - никаких лишних добавлений
        
        // field81 = field81a + field81b
        const field81a = this.getFieldValue('field81a');
        const field81b = this.getFieldValue('field81b');
        const field81 = field81a + field81b;
        this.setFieldValue('field81', field81);

        // field41 = field41a + field41b  
        const field41a = this.getFieldValue('field41a');
        const field41b = this.getFieldValue('field41b');
        const field41 = field41a + field41b;
        this.setFieldValue('field41', field41);

        // field81c = field81a * 19%
        const field81c = field81a * this.vatRate19;
        this.setFieldValue('field81c', field81c);

        // field41c = field41b * 19%
        const field41c = field41b * this.vatRate19;
        this.setFieldValue('field41c', field41c);

        // field43 (берем как есть)
        const field43 = this.getFieldValue('field43');

        // field66, field62, field67 (берем как есть)
        const field66 = this.getFieldValue('field66');
        const field62 = this.getFieldValue('field62');
        const field67 = this.getFieldValue('field67');

        // field83 = field41c - (field66 + field62 + field67) 
        const totalInputVat = field66 + field62 + field67;
        const field83 = field41c - totalInputVat;
        this.setFieldValue('field83', field83);

        // plannedProfit = field41 - field81
        const plannedProfit = field41 - field81;
        this.setFieldValue('plannedProfit', plannedProfit);

        // Обновляем дисплей
        this.updateProfitDisplay(field83, plannedProfit);

        console.log('[Расчет по вашей логике]', {
            field81, field41, field81c, field41c, field83, plannedProfit
        });

        return {
            field83,
            field41c,
            totalInputVat,
            plannedProfit
        };
    }a'); // Kasachstan
        const field43b = this.getFieldValue('field43b'); // Andere Drittländer
        const field43 = field43a + field43b; // Gesamte Drittlandsexporte
        this.setFieldValue('field43', field43);

        // SCHRITT 4: Gesamtumsatz berechnen (Feld 4)
        const field40b = this.getFieldValue('field40b'); // Steuerfreie Inlandsumsätze
        const field4 = field40a + field40b + field41 + field43; // Gesamtumsatz für Gewinnberechnung
        this.setFieldValue('field4', field4);

        // SCHRITT 5: Detaillierung Feld 89 (EU-Erwerbe)
        const field89a = this.getFieldValue('field89a'); // EU-Waren zu 0% USt
        const field89b = this.getFieldValue('field89b'); // Einfuhrabgaben/Zölle
        const field89 = field89a + field89b; // Gesamte EU-Erwerbe
        this.setFieldValue('field89', field89);

        // SCHRITT 6: Gesamtkosten berechnen (Feld 8)
        const field81a = this.getFieldValue('field81a'); // Deutsche Einkäufe mit USt
        const field81b = this.getFieldValue('field81b'); // Deutsche Einkäufe ohne USt
        const field8 = field81a + field81b + field89a + field89b; // Gesamtkosten für Gewinnberechnung
        this.setFieldValue('field8', field8);

        // SCHRITT 7: USt-Beträge berechnen
        const field66a = field40a * this.vatRate19; // USt aus Inlandsumsätzen (19%)
        const field66b = this.getFieldValue('field66b'); // Vorsteuer aus deutschen Einkäufen
        const field66 = field66a + field66b; // Gesamtes Feld 66
        this.setFieldValue('field66a', field66a);
        this.setFieldValue('field66', field66);

        // SCHRITT 8: Feld 61 berechnen (Vorsteuer aus EU-Erwerben)
        const field61 = field89 * this.vatRate19; // 19% USt auf EU-Erwerbe
        this.setFieldValue('field61', field61);

        // SCHRITT 9: Gesamten Vorsteuerabzug berechnen (Feld 62)
        const field67 = this.getFieldValue('field67'); // Einfuhrumsatzsteuer Drittländer
        const field62 = field66 + field61 + field67; // Gesamter Vorsteuerabzug
        this.setFieldValue('field62', field62);

        // SCHRITT 10: Feld 83 berechnen (Zahllast/Erstattung)
        // Wichtig: Nur USt aus Inlandsumsätzen (66a) minus gesamten Vorsteuerabzug
        const field83 = field66a - field62; 
        this.setFieldValue('field83', field83);

        // SCHRITT 11: Geplanten Gewinn berechnen
        const plannedProfit = field4 - field8; // Umsatz minus Kosten
        this.setFieldValue('plannedProfit', plannedProfit);

        // SCHRITT 12: Anzeige aktualisieren
        this.updateProfitDisplay(field83, plannedProfit);

        console.log('[SmartVat Berechnung]', {
            gesamtumsatz: field4, 
            gesamtkosten: field8, 
            ustInland: field66a, 
            vorsteuerabzug: field62, 
            zahllast: field83, 
            gewinn: plannedProfit
        });

        return {
            revenue: field4,
            costs: field8,
            vatPayable: field83,
            profit: plannedProfit,
            outputVat: field66a,
            inputVat: field62
        };
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
        // Стандартные данные ТОЧНО по вашей логике
        const defaultData = {
            field10: 0,
            field81a: 0.00,
            field81b: 133.56,
            field41a: 18400.00,
            field41b: 0.00,
            field43: 0.00,
            field66: 25.38,
            field62: 3085.59,
            field67: 0.00
        };

        Object.entries(defaultData).forEach(([fieldId, value]) => {
            this.setFieldValue(fieldId, value);
        });

        this.updateTotal81();
        this.updateTotal41();
        console.log('📊 Standarddaten geladen - exakt nach Vorgabe');
    }

    exportData() {
        // Export ТОЧНО по вашей структуре
        return {
            company: {
                name: 'ASSET LOGISTICS GMBH',
                address: 'Kurze Straße 6, 06366 Köthen',
                hrb: '34481',
                steuernummer: 'DE453202061'
            },
            period: 'März 2025',
            timestamp: new Date().toISOString(),
            software: 'IT AI SOLAR Dashka SmartStb',
            data: {
                field10: this.getFieldValue('field10'),
                field81a: this.getFieldValue('field81a'),
                field81b: this.getFieldValue('field81b'),
                field81: this.getFieldValue('field81'),
                field81c: this.getFieldValue('field81c'),
                field41a: this.getFieldValue('field41a'),
                field41b: this.getFieldValue('field41b'),
                field41: this.getFieldValue('field41'),
                field41c: this.getFieldValue('field41c'),
                field43: this.getFieldValue('field43'),
                field66: this.getFieldValue('field66'),
                field62: this.getFieldValue('field62'),
                field67: this.getFieldValue('field67'),
                field83: this.getFieldValue('field83'),
                plannedProfit: this.getFieldValue('plannedProfit')
            },
            calculations: this.calculateTax()
        };
    }

    // Методы совместимости - ТОЧНО как у вас
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