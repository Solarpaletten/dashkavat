/**
 * SmartVat Export Handler - Fraubüller Style
 * Модуль экспорта данных декларации в различные форматы
 * @author IT AI SOLAR Team - Leanid, Dashka, Jimmy
 * @version 2.0 Enhanced - English Code + Deutsche Kommentare
 */

class ExportHandler {
    constructor() {
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        this.initialized = true;
        console.log('📤 Export Handler initialized - Fraubüller Style');
    }

    // Hauptexport-Funktion mit Menü
    exportDeclaration() {
        const choice = prompt(`📤 SmartVat Export - Wählen Sie das Format:

1 - 📊 Excel/CSV (Tabelle mit allen Daten)
2 - 💾 JSON (Vollständige Datenstruktur)  
3 - 🖨️ Drucken (PDF über Browser)
4 - 📋 Zwischenablage (Für E-Mail/Chat)

Geben Sie die Nummer ein (1-4):`);

        switch(choice) {
            case '1': this.exportToExcel(); break;
            case '2': this.exportToJSON(); break;
            case '3': this.printDeclaration(); break;
            case '4': this.copyToClipboard(); break;
            default: 
                if (choice !== null) {
                    alert('❌ Ungültige Auswahl. Bitte verwenden Sie 1-4');
                }
        }
    }

    // Excel/CSV Export mit deutscher Struktur - ИСПРАВЛЕНО под вашу логику
    exportToExcel() {
        if (!window.smartVatCalculator) {
            alert('❌ Rechner nicht initialisiert');
            return;
        }

        const data = window.smartVatCalculator.exportData();
        
        // CSV-Daten структурированы точно по ВАШИМ полям
        const csvData = [
            ['SmartVat Enhanced - Umsatzsteuervoranmeldung'],
            ['Übertragungsprotokoll'],
            [''],
            [data.company.name],
            [data.company.address],
            ['Steuernummer: ' + data.company.steuernummer],
            ['HRB: ' + data.company.hrb],
            ['Anmeldezeitraum: ' + data.period],
            ['Erstellt am: ' + new Date().toLocaleString('de-DE')],
            [''],
            ['=== LIEFERUNGEN UND LEISTUNGEN ==='],
            ['Feld', 'Beschreibung', 'Betrag (EUR)'],
            ['40a', 'Реализация с НДС внутри Германии', data.data.field40a],
            ['40b', 'Реализация без НДС внутри Германии', data.data.field40b],
            ['41', 'Реализация внутри Евросоюза (Чехия, Польша, Норвегия)', data.data.field41],
            ['43', 'Реализация в третьи страны (Казахстан)', data.data.field43],
            ['4', 'ОБЩАЯ ВЫРУЧКА для расчета прибыли', data.data.field4],
            [''],
            ['=== ПРИОБРЕТЕНИЯ ==='],
            ['81a', 'Приобретения в Германии (нетто без НДС)', data.data.field81a],
            ['81b', 'Приобретения товаров/услуг без НДС в Германии', data.data.field81b],
            ['89a', 'Приобретения внутри ЕС по 0% НДС', data.data.field89a],
            ['89b', 'Импортные пошлины', data.data.field89b],
            ['8', 'ОБЩИЕ ЗАТРАТЫ для расчета прибыли', data.data.field8],
            [''],
            ['=== НДС РАСЧЕТЫ ==='],
            ['66', 'НДС со строки 40a (19%)', data.data.field66],
            ['61', 'Импортный НДС ЕС товара', data.data.field61],
            ['67', 'НДС товара из третьих стран', data.data.field67],
            ['62', 'ОБЩИЙ ЗАЧЕТНЫЙ НДС (66+61+67)', data.data.field62],
            [''],
            ['=== ИТОГОВЫЕ РЕЗУЛЬТАТЫ ==='],
            ['83', 'НДС К ДОПЛАТЕ/ВОЗВРАТУ (66-62)', data.data.field83],
            ['PROFIT', 'ПЛАНОВАЯ ПРИБЫЛЬ (4-8)', data.data.plannedProfit],
            [''],
            ['=== ФОРМУЛЫ РАСЧЕТА ==='],
            ['Поле 4:', '40a + 40b + 41 + 43'],
            ['Поле 8:', '81a + 81b + 89a + 89b'],
            ['Поле 66:', '40a × 19%'],
            ['Поле 61:', '(89a + 89b) × 19%'],
            ['Поле 62:', '66 + 61 + 67'],
            ['Поле 83:', '66 - 62'],
            ['Profit:', '4 - 8'],
            [''],
            ['Software:', data.software],
            ['Export-Zeitstempel:', data.timestamp]
        ];

        // CSV-Datei erstellen und herunterladen
        const filename = `SmartVat_${data.company.name.replace(/[^a-zA-Z0-9]/g, '_')}_${data.period.replace(/\s/g, '_')}.csv`;
        this.downloadCSV(csvData, filename);
        
        alert(`📊 Excel/CSV Export erfolgreich!
        
Datei: ${filename}

✅ Kann in Excel/LibreOffice geöffnet werden
📋 Alle Felder nach IHRER Logik mit Formeln
🇩🇪 Deutsche Formatierung mit EUR-Währung`);
    }

    // JSON Export für Entwickler/API
    exportToJSON() {
        if (!window.smartVatCalculator) {
            alert('❌ Rechner nicht initialisiert');
            return;
        }

        const exportData = window.smartVatCalculator.exportData();
        
        // Zusätzliche Metadaten hinzufügen
        exportData.meta = {
            version: '2.0.1',
            style: 'Fraubüller Enhanced',
            exported_by: 'SmartVat Enhanced',
            team: 'IT AI SOLAR - Leanid, Dashka, Jimmy',
            format: 'JSON',
            compatibility: 'ERIC, ELSTER, SmartVat',
            calculation_logic: 'field83 = field66 - field62; profit = field4 - field8'
        };

        const jsonString = JSON.stringify(exportData, null, 2);
        const filename = `SmartVat_Data_${exportData.company.name.replace(/[^a-zA-Z0-9]/g, '_')}_${exportData.period.replace(/\s/g, '_')}.json`;
        
        this.downloadFile(jsonString, filename, 'application/json');
        
        alert(`💾 JSON Export erfolgreich!

Datei: ${filename}

✅ Vollständige Datenstruktur nach IHRER Logik
🔄 Import-/Export-fähig  
🔗 API-kompatibel
📋 Alle Berechnungen und Metadaten`);
    }

    // Drucken für PDF-Export
    printDeclaration() {
        // Kontrollelemente für Druck ausblenden
        const controls = document.querySelector('.controls');
        const badge = document.querySelector('.smartvat-badge');
        
        const originalControlsDisplay = controls?.style.display || '';
        const originalBadgeDisplay = badge?.style.display || '';
        
        if (controls) controls.style.display = 'none';
        if (badge) badge.style.display = 'none';

        // Druck-spezifische Styles hinzufügen
        const printStyles = document.createElement('style');
        printStyles.id = 'print-styles';
        printStyles.textContent = `
            @media print {
                body { background: white !important; }
                .document { 
                    box-shadow: none !important; 
                    margin: 0 !important;
                    max-width: none !important;
                }
                .watermark { display: none !important; }
                .field-input { 
                    border: 1px solid #000 !important;
                    background: white !important;
                }
                .smartvat-enhanced {
                    border-left: 2px solid #000 !important;
                    background: #f9f9f9 !important;
                }
            }
        `;
        document.head.appendChild(printStyles);

        // Druckdialog öffnen
        window.print();

        // Nach dem Drucken: Originalzustand wiederherstellen
        setTimeout(() => {
            if (controls) controls.style.display = originalControlsDisplay;
            if (badge) badge.style.display = originalBadgeDisplay;
            
            const printStylesEl = document.getElementById('print-styles');
            if (printStylesEl) printStylesEl.remove();
        }, 1000);

        alert(`🖨️ Druckdialog geöffnet!

💡 Tipp: Wählen Sie "Als PDF speichern" für eine PDF-Datei
📄 Alle SmartVat-Erweiterungen sind im Ausdruck enthalten
✅ Bereit für Steuerberater oder Finanzamt`);
    }

    // In Zwischenablage kopieren
    async copyToClipboard() {
        if (!window.smartVatCalculator) {
            alert('❌ Rechner nicht initialisiert');
            return;
        }

        const data = window.smartVatCalculator.exportData();
        
        // Zusammenfassung für Zwischenablage erstellen - исправлено под вашу логику
        const summary = `
🚀 SmartVat Enhanced - Umsatzsteuervoranmeldung
${data.company.name} | ${data.period}

💰 ГЛАВНЫЕ РЕЗУЛЬТАТЫ:
Feld 83 (К доплате/возврату): ${data.data.field83} EUR
Плановая прибыль: ${data.data.plannedProfit} EUR

📊 ВЫРУЧКА (по вашей логике):
40a - Реализация с НДС в Германии: ${data.data.field40a} EUR
40b - Реализация без НДС в Германии: ${data.data.field40b} EUR
41 - Реализация внутри ЕС: ${data.data.field41} EUR  
43 - Реализация в третьи страны: ${data.data.field43} EUR
4 - ОБЩАЯ ВЫРУЧКА: ${data.data.field4} EUR

💸 ЗАТРАТЫ (по вашей логике):
81a - Приобретения в Германии: ${data.data.field81a} EUR
81b - Приобретения без НДС в Германии: ${data.data.field81b} EUR
89a - Приобретения в ЕС: ${data.data.field89a} EUR
89b - Импортные пошлины: ${data.data.field89b} EUR
8 - ОБЩИЕ ЗАТРАТЫ: ${data.data.field8} EUR

🧾 НДС (по вашей логике):
66 - НДС со строки 40a: ${data.data.field66} EUR
61 - Импортный НДС ЕС: ${data.data.field61} EUR
67 - НДС из третьих стран: ${data.data.field67} EUR
62 - ОБЩИЙ ЗАЧЕТНЫЙ НДС: ${data.data.field62} EUR

📐 ФОРМУЛЫ:
field83 = field66 - field62 = ${data.data.field66} - ${data.data.field62}
profit = field4 - field8 = ${data.data.field4} - ${data.data.field8}

📅 Erstellt: ${new Date().toLocaleString('de-DE')}
🔧 Software: ${data.software}
        `.trim();

        try {
            await navigator.clipboard.writeText(summary);
            alert(`📋 Daten in Zwischenablage kopiert!

✅ Bereit zum Einfügen in:
• E-Mail an Steuerberater
• WhatsApp/Telegram
• Notizen-App
• Andere Anwendungen

Der Text enthält alle wichtigen Zahlen nach IHRER Logik.`);
        } catch (err) {
            // Fallback für ältere Browser
            const textArea = document.createElement('textarea');
            textArea.value = summary;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            alert('📋 Daten kopiert (Fallback-Methode)!');
        }
    }

    // Hilfsfunktionen für Datei-Download
    downloadCSV(data, filename) {
        // CSV-Inhalt mit BOM für deutsche Umlaute erstellen
        let csvContent = data.map(row => 
            row.map(cell => {
                const cellStr = String(cell).replace(/"/g, '""');
                return `"${cellStr}"`;
            }).join(',')
        ).join('\n');

        // BOM für korrekte Anzeige deutscher Zeichen hinzufügen
        const BOM = '\uFEFF';
        csvContent = BOM + csvContent;

        this.downloadFile(csvContent, filename, 'text/csv;charset=utf-8;');
    }

    downloadFile(content, filename, mimeType) {
        // Universelle Datei-Download-Funktion
        const blob = new Blob([content], { type: mimeType });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
    }
}

// Globale Instanz
let exportHandler;

// HTML-kompatible Funktionen  
function exportDeclaration() {
    exportHandler?.exportDeclaration();
}

function printDeclaration() {
    exportHandler?.printDeclaration();
}

function exportToExcel() {
    exportHandler?.exportToExcel();
}

function exportToJSON() {
    exportHandler?.exportToJSON();
}

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        exportHandler = new ExportHandler();
        window.exportHandler = exportHandler; // Globaler Zugriff
        exportHandler.init();
    }, 300);
});

console.log("✅ Export Handler Module v2.0 Enhanced — ready");