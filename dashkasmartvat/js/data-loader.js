/**
 * SmartVat Data Manager - Fraubüller Style
 * Модуль управления данными и периодами
 * @author IT AI SOLAR Team - Leanid, Dashka, Jimmy  
 * @version 2.0 Enhanced - English Code + Deutsche Kommentare
 */

class DataManager {
    constructor() {
        this.initialized = false;
        this.currentPeriod = 'März 2025';
    }

    init() {
        if (this.initialized) return;
        
        this.updateCurrentDate(); // Aktuelles Datum setzen
        this.setupPeriodSelector(); // Period-Selector einrichten
        this.initialized = true;
        console.log('📅 Data Manager initialized - Fraubüller Style');
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

    setupPeriodSelector() {
        // Event-Listener für Periode-Selector
        const periodSelect = document.getElementById('periodSelect');
        if (periodSelect) {
            periodSelect.addEventListener('change', (e) => {
                this.currentPeriod = e.target.options[e.target.selectedIndex].text;
                console.log('📅 Zeitraum geändert:', this.currentPeriod);
            });
        }
    }

    getCurrentPeriod() {
        // Aktuell ausgewählten Zeitraum zurückgeben
        return this.currentPeriod;
    }

    validateFields() {
        // Grundlegende Feldvalidierung
        const requiredFields = ['field40a', 'field81a', 'field89a', 'field89b'];
        const errors = [];

        requiredFields.forEach(fieldId => {
            const element = document.getElementById(fieldId);
            if (element && (isNaN(parseFloat(element.value)) || parseFloat(element.value) < 0)) {
                errors.push(`Feld ${fieldId} hat einen ungültigen Wert`);
            }
        });

        return errors;
    }

    resetForm() {
        // Formular zurücksetzen
        if (window.smartVatCalculator) {
            window.smartVatCalculator.loadDefaultData();
            console.log('🔄 Formular zurückgesetzt');
        }
    }

    saveToLocalStorage() {
        // Daten lokal speichern (für Entwicklung)
        if (window.smartVatCalculator) {
            const data = window.smartVatCalculator.exportData();
            localStorage.setItem('smartvat_backup', JSON.stringify(data));
            console.log('💾 Daten lokal gespeichert');
        }
    }

    loadFromLocalStorage() {
        // Daten aus lokalem Speicher laden
        try {
            const backup = localStorage.getItem('smartvat_backup');
            if (backup) {
                const data = JSON.parse(backup);
                console.log('📥 Backup gefunden:', data.timestamp);
                return data;
            }
        } catch (error) {
            console.warn('⚠️ Fehler beim Laden des Backups:', error);
        }
        return null;
    }
}

// Globale Instanz
let dataManager;

// HTML-kompatible Funktionen
function resetForm() {
    dataManager?.resetForm();
}

function saveBackup() {
    dataManager?.saveToLocalStorage();
    alert('💾 Backup erstellt!');
}

function loadBackup() {
    const backup = dataManager?.loadFromLocalStorage();
    if (backup) {
        const choice = confirm(`📥 Backup gefunden vom ${new Date(backup.timestamp).toLocaleString('de-DE')}
        
Möchten Sie diese Daten laden?`);
        if (choice && window.smartVatCalculator) {
            // Backup-Daten in Felder laden
            Object.entries(backup.data).forEach(([fieldId, value]) => {
                window.smartVatCalculator.setFieldValue(fieldId, value);
            });
            window.smartVatCalculator.calculateAllFields();
            alert('✅ Backup wiederhergestellt!');
        }
    } else {
        alert('❌ Kein Backup gefunden');
    }
}

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    dataManager = new DataManager();
    window.dataManager = dataManager; // Globaler Zugriff
    dataManager.init();
});

console.log("✅ Data Manager Module v2.0 Enhanced — ready");