/**
 * IT AI SOLAR Dashka SmartStb - Data Loader Module
 * Модуль загрузки данных компаний и управления ими
 * @author Jimmy & Dasha's Team
 * @version 2.0.1
 */

class DataLoader {
    constructor() {
        this.companies = {};
        this.currentCompany = null;
        this.initialized = false;
    }

    async init() {
        if (this.initialized) return;
        
        try {
            await this.loadCompaniesData();
            this.createCompanySelector();
            this.initialized = true;
            console.log('📊 Data Loader initialized');
        } catch (error) {
            console.warn('⚠️ Companies data not found, using default mode');
            this.initialized = true;
        }
    }

    /**
     * Загрузка данных компаний из JSON файла
     */
    async loadCompaniesData() {
        try {
            const response = await fetch('data/companies.json');
            if (!response.ok) {
                throw new Error('Companies data not found');
            }
            this.companies = await response.json();
            console.log('✅ Companies data loaded:', Object.keys(this.companies));
        } catch (error) {
            console.warn('⚠️ Could not load companies data:', error.message);
            // Используем fallback данные
            this.companies = {
                "ASSET_LOGISTICS": {
                    "name": "ASSET LOGISTICS GMBH",
                    "address": "Kurze Straße 6, 06366 Köthen",
                    "hrb": "34481",
                    "steuernummer": "DE453202061",
                    "period": "März 2025",
                    "vatData": {
                        "field10": 0,
                        "field40a": 18400.00,
                        "field40b": 0.00,
                        "field41a": 0.00,
                        "field41b": 0.00,
                        "field43": 0.00,
                        "field81a": 133.56,
                        "field81b": 0.00,
                        "field89a": 15755.00,
                        "field89b": 484.96,
                        "field66": 25.38,
                        "field67": 0.00
                    }
                }
            };
        }
    }

    /**
     * Создание селектора компаний в интерфейсе
     */
    createCompanySelector() {
        const companyInfo = document.querySelector('.company-info');
        if (!companyInfo || Object.keys(this.companies).length <= 1) return;

        const selectorHTML = `
            <div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 5px solid #2196f3;">
                <strong>🏢 Выбор компании:</strong>
                <select id="companySelector" style="margin-left: 10px; padding: 8px 12px; border-radius: 6px; border: 2px solid #2196f3; background: white; font-weight: bold;">
                    ${Object.entries(this.companies).map(([key, company]) => 
                        `<option value="${key}">${company.name}</option>`
                    ).join('')}
                </select>
                <button onclick="dataLoader.loadSelectedCompany()" style="margin-left: 10px; padding: 8px 16px; background: #2196f3; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
                    📊 Загрузить данные
                </button>
            </div>
        `;

        companyInfo.insertAdjacentHTML('beforebegin', selectorHTML);
        
        // Автозагрузка первой компании
        this.currentCompany = Object.keys(this.companies)[0];
        this.updateCompanyInfo();
    }

    /**
     * Загрузка выбранной компании
     */
    loadSelectedCompany() {
        const selector = document.getElementById('companySelector');
        if (!selector) return;

        const selectedKey = selector.value;
        this.currentCompany = selectedKey;
        
        this.updateCompanyInfo();
        this.loadCompanyVATData(selectedKey);
        
        console.log('🔄 Loaded company:', this.companies[selectedKey].name);
    }

    /**
     * Обновление информации о компании в интерфейсе
     */
    updateCompanyInfo() {
        if (!this.currentCompany) return;

        const company = this.companies[this.currentCompany];
        const companyInfo = document.querySelector('.company-info');
        
        if (companyInfo) {
            companyInfo.innerHTML = `
                <strong>📋 Компания:</strong> ${company.name}<br>
                <strong>📍 Адрес:</strong> ${company.address}<br>
                <strong>🏛️ HRB:</strong> ${company.hrb}<br>
                <strong>🔢 Steuernummer:</strong> ${company.steuernummer}<br>
                <strong>📅 Meldezeitraum:</strong> ${company.period}
            `;
        }

        // Обновляем заголовок
        const header = document.querySelector('.header h2');
        if (header) {
            header.textContent = `Umsatzsteuervoranmeldung - ${company.name}`;
        }
    }

    /**
     * Загрузка НДС данных компании
     */
    loadCompanyVATData(companyKey) {
        const company = this.companies[companyKey];
        if (!company || !company.vatData) return;

        // Ждем инициализации VAT Calculator
        const loadData = () => {
            if (window.vatCalculator && window.vatCalculator.initialized) {
                Object.entries(company.vatData).forEach(([fieldId, value]) => {
                    window.vatCalculator.setFieldValue(fieldId, value);
                });
                window.vatCalculator.calculateAllFields();
                console.log('✅ VAT data loaded for', company.name);
            } else {
                setTimeout(loadData, 100);
            }
        };

        loadData();
    }

    /**
     * Сохранение текущих данных
     */
    saveCurrentData() {
        if (!window.vatCalculator) return null;

        return {
            company: this.currentCompany,
            timestamp: new Date().toISOString(),
            data: window.vatCalculator.exportData()
        };
    }

    /**
     * Экспорт шаблона для добавления новой компании
     */
    exportCompanyTemplate() {
        const template = {
            "NEW_COMPANY_KEY": {
                "name": "NEW COMPANY NAME GMBH",
                "address": "Address, PLZ City",
                "hrb": "HRB Number",
                "steuernummer": "DE000000000",
                "period": "März 2025",
                "vatData": {
                    "field10": 0,
                    "field40a": 0.00,
                    "field40b": 0.00,
                    "field41a": 0.00,
                    "field41b": 0.00,
                    "field43": 0.00,
                    "field81a": 0.00,
                    "field81b": 0.00,
                    "field89a": 0.00,
                    "field89b": 0.00,
                    "field66": 0.00,
                    "field67": 0.00
                }
            }
        };

        const jsonString = JSON.stringify(template, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', 'company_template.json');
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
        
        alert('📄 Шаблон компании сохранен!\n\nОтредактируйте файл и добавьте в data/companies.json');
    }

    /**
     * Получение текущей компании
     */
    getCurrentCompany() {
        return this.currentCompany ? this.companies[this.currentCompany] : null;
    }

    /**
     * Получение всех компаний
     */
    getAllCompanies() {
        return this.companies;
    }
}

// Глобальный экземпляр
let dataLoader;

// Глобальные функции для совместимости
function loadSelectedCompany() {
    dataLoader?.loadSelectedCompany();
}

function exportCompanyTemplate() {
    dataLoader?.exportCompanyTemplate();
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    dataLoader = new DataLoader();
    window.dataLoader = dataLoader; // Глобальный доступ
    
    // Даем время на инициализацию других модулей
    setTimeout(() => {
        dataLoader.init();
    }, 200);
});

console.log("✅ Data Loader Module v2.0.1 — ready");