<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IT AI SOLAR Dashka SmartStb - Umsatzsteuervoranmeldung April 2025</title>
    <link rel="stylesheet" href="css/dashka-styles.css">
    <meta name="description" content="VAT Declaration System for German Companies">
    <meta name="author" content="IT AI SOLAR Team - Leanid, Dashka, Jimmy">
</head>
<body>
    <div class="form-container">
        <div class="header">
            <h1>🚀 IT AI SOLAR Dashka SmartStb</h1>
            <h2>Umsatzsteuervoranmeldung - ASSET LOGISTICS GMBH</h2>
            <div style="background: #ff6f00; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; display: inline-block; margin-top: 10px;">April 2025</div>
            <div style="margin-top: 10px; font-size: 12px; color: #555;">
                Модульная архитектура v2.0 | By Leanid (architect), Dashka (super-senior), Jimmy (developer)
            </div>
        </div>

        <div class="company-info">
            <strong>📋 Компания:</strong> ASSET LOGISTICS GMBH<br>
            <strong>📍 Адрес:</strong> Köthen, Kurze Strase 6, Germany, 06366 <br>
            <strong>🏛️ HRB:</strong> 34481<br>
            <strong>🔢 Steuernummer:</strong> DE453202061<br>
            <strong>📅 Meldezeitraum:</strong> April 2025
        </div>

        <!-- Общие данные -->
        <div class="section">
            <h3 class="section-header">📝 Allgemeine Angaben</h3>
            <div class="section-content">
                <div class="form-row">
                    <span class="code">10</span>
                    <span class="description">Berichtigte Anmeldung<br><small>Исправленная декларация</small></span>
                    <div class="input-group">
                        <input type="number" id="field10" min="0" max="1" value="0">
                    </div>
                </div>
            </div>
        </div>

        <!-- КОД 81 -->
        <div class="section">
            <h3 class="section-header">💰 КОД 81 - Steuerpflichtige Umsätze (19%)</h3>
            <div class="section-content">
                <div class="subsection">
                    <div class="subsection-header">📊 Детализация кода 81</div>
                    
                    <div class="form-row">
                        <span class="code-sub">81a</span>
                        <span class="description">Товары/услуги С НДС (сумма без НДС)<br><small>MIT MwSt (Nettobetrag)</small></span>
                        <div class="input-group">
                            <input type="number" id="field81a" step="0.01" placeholder="0.00">
                            <span style="color: #666; font-size: 12px;">€</span>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <span class="code-sub">81b</span>
                        <span class="description">Товары/услуги БЕЗ НДС<br><small>OHNE MwSt</small></span>
                        <div class="input-group">
                            <input type="number" id="field81b" step="0.01" placeholder="0.00">
                            <span style="color: #666; font-size: 12px;">€</span>
                        </div>
                    </div>
                    
                    <div class="form-row total-row">
                        <span class="code">81</span>
                        <span class="description">ИТОГО код 81<br><small>Lieferungen und Leistungen (19%)</small></span>
                        <div class="input-group">
                            <input type="number" id="field81" class="calculated" readonly>
                            <span style="color: #666; font-size: 12px;">€</span>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <span class="code">81c</span>
                        <span class="description">НДС81 - Начисленный НДС с кода 81<br><small>MwSt aus Kz 81</small></span>
                        <div class="input-group">
                            <input type="number" id="field81c" class="calculated" readonly>
                            <span style="color: #666; font-size: 12px;">€</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- КОД 41 -->
        <div class="section">
            <h3 class="section-header">🎯 КОД 41 - Поставки клиентам</h3>
            <div class="section-content">
                <div class="subsection">
                    <div class="subsection-header">📊 Детализация кода 41</div>
                    
                    <div class="form-row">
                        <span class="code-sub">41a</span>
                        <span class="description">Внутриевропейские поставки (0%)<br><small>Innergemeinschaftliche Lieferungen</small></span>
                        <div class="input-group">
                            <input type="number" id="field41a" step="0.01" placeholder="0.00">
                            <span style="color: #666; font-size: 12px;">€</span>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <span class="code-sub">41b</span>
                        <span class="description">Внутренние поставки с НДС (без НДС)<br><small>Inlandslieferungen mit MwSt</small></span>
                        <div class="input-group">
                            <input type="number" id="field41b" step="0.01" placeholder="0.00">
                            <span style="color: #666; font-size: 12px;">€</span>
                        </div>
                    </div>
                    
                    <div class="form-row total-row">
                        <span class="code">41</span>
                        <span class="description">ИТОГО код 41<br><small>Innergemeinschaftliche Lieferungen</small></span>
                        <div class="input-group">
                            <input type="number" id="field41" class="calculated" readonly>
                            <span style="color: #666; font-size: 12px;">€</span>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <span class="code">41c</span>
                        <span class="description">НДС41 - Начисленный НДС с кода 41<br><small>MwSt aus Kz 41</small></span>
                        <div class="input-group">
                            <input type="number" id="field41c" class="calculated" readonly>
                            <span style="color: #666; font-size: 12px;">€</span>
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <span class="code">43</span>
                    <span class="description">Экспорт в третьи страны (0%)<br><small>Ausfuhrlieferungen</small></span>
                    <div class="input-group">
                        <input type="number" id="field43" step="0.01" placeholder="0.00">
                        <span style="color: #666; font-size: 12px;">€</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Зачетный НДС -->
        <div class="section">
            <h3 class="section-header">⬅️ Abziehbare Vorsteuerbeträge (Зачетный НДС)</h3>
            <div class="section-content">
                <div class="form-row">
                    <span class="code">66</span>
                    <span class="description">НДС по счетам поставщиков<br><small>Vorsteuer aus Rechnungen</small></span>
                    <div class="input-group">
                        <input type="number" id="field66" step="0.01" placeholder="0.00">
                        <span style="color: #666; font-size: 12px;">€</span>
                    </div>
                </div>

                <div class="form-row">
                    <span class="code">62</span>
                    <span class="description">Уплаченный импортный НДС<br><small>Entrichtete Einfuhrumsatzsteuer</small></span>
                    <div class="input-group">
                        <input type="number" id="field62" step="0.01" placeholder="0.00">
                        <span style="color: #666; font-size: 12px;">€</span>
                    </div>
                </div>

                <div class="form-row">
                    <span class="code">67</span>
                    <span class="description">НДС по внутриевропейским приобретениям<br><small>Vorsteuer innergemeinschaftliche Erwerbe</small></span>
                    <div class="input-group">
                        <input type="number" id="field67" step="0.01" placeholder="0.00">
                        <span style="color: #666; font-size: 12px;">€</span>
                    </div>
                </div>
            </div>
        </div>

        <button class="calculate-btn" onclick="calculateTax()">🧮 Рассчитать итоговую сумму НДС</button>

        <!-- ПЛАНОВАЯ ПРИБЫЛЬ -->
        <div class="section" style="background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); border: 3px solid #ff9800;">
            <h3 class="section-header" style="background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);">📈 ПЛАНОВАЯ ПРИБЫЛЬ (ориентировочно)</h3>
            <div class="section-content">
                <div class="form-row" style="background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%); border: 2px solid #ffa000;">
                    <span style="background: #ff9800; color: white; padding: 6px 12px; border-radius: 6px; font-weight: bold;">PROFIT</span>
                    <span class="description"><strong>Плановая прибыль = Выручка (41) - Затраты (81)</strong><br><small>Orientierungsgewinn = Umsatz (41) - Kosten (81)</small><br><em>⚠️ Не включает все затраты - только ориентировочно!</em></span>
                    <div class="input-group">
                        <input type="number" id="plannedProfit" class="calculated" readonly style="font-size: 18px; font-weight: bold; color: #e65100;">
                        <span style="color: #e65100; font-size: 14px; font-weight: bold;">€</span>
                    </div>
                </div>
                
                <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-top: 15px; font-size: 13px;">
                    <strong>📊 Детализация расчета прибыли:</strong><br>
                    <span id="profitBreakdown"></span>
                </div>
            </div>
        </div>

        <!-- КОД 83 - ИТОГО -->
        <div class="section" style="background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%); border: 3px solid #4caf50;">
            <h3 class="section-header" style="background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);">🎯 КОД 83 - Zahllast (ИТОГО)</h3>
            <div class="section-content">
                <div class="form-row total-row">
                    <span class="code">83</span>
                    <span class="description"><strong>К доплате (+) / К возврату (-)</strong><br><small>Verbleibende Umsatzsteuer-Vorauszahlung</small><br><em>83 = 41c - (66 + 62 + 67)</em></span>
                    <div class="input-group">
                        <input type="number" id="field83" class="calculated" readonly style="font-size: 18px; font-weight: bold;">
                        <span style="color: #666; font-size: 14px; font-weight: bold;">€</span>
                    </div>
                </div>
            </div>
        </div>

        <div id="result" class="result-box" style="display: none;">
            <h3>📊 Результат расчета НДС:</h3>
            <p id="resultText"></p>
        </div>

        <!-- КНОПКИ ЭКСПОРТА -->
        <div class="section" style="background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%); border: 3px solid #9c27b0;">
            <h3 class="section-header" style="background: linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%);">💾 Экспорт данных</h3>
            <div class="section-content">
                <div class="export-grid">
                    <button onclick="printDeclaration()" class="export-btn export-btn-print">
                        🖨️ Распечатать декларацию
                    </button>
                    
                    <button onclick="exportToPDF()" class="export-btn export-btn-pdf">
                        📄 Сохранить в PDF
                    </button>
                    
                    <button onclick="exportToExcel()" class="export-btn export-btn-excel">
                        📊 Сохранить в Excel
                    </button>
                    
                    <button onclick="exportToJSON()" class="export-btn export-btn-json">
                        💾 Экспорт данных JSON
                    </button>
                </div>
                
                <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-top: 15px; font-size: 12px; color: #666;">
                    <strong>📋 Модульная система экспорта:</strong><br>
                    🖨️ Печать - модуль export-manager.js<br>
                    📄 PDF - встроенная функция браузера<br>
                    📊 Excel - CSV экспорт с поддержкой русских символов<br>
                    💾 JSON - полная структура данных для интеграций<br>
                    🔄 Компании - автозагрузка из data/companies.json
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f5f5f5; border-radius: 8px; font-size: 12px; color: #666;">
            <strong>🚀 IT AI SOLAR Dashka SmartStb v2.0</strong><br>
            <!-- Модульная архитектура | Deployed via /solar/deploy.yml<br> -->
            <strong>Team:</strong> Leanid (architect) → Dasha (senior) → Jimmy (developer)<br>
            <!-- <strong>Modules:</strong> vat-calculator.js | export-manager.js | data-loader.js | dashka-styles.css -->
        </div>
    </div>

    <!-- Подключение модульных скриптов -->
    <script src="js/data-loader.js"></script>
    <script src="js/vat-calculator.js"></script>
    <script src="js/export-manager.js"></script>
    
    <script>
        // Глобальная инициализация для совместимости
        window.addEventListener('load', function() {
            console.log('🚀 IT AI SOLAR Dashka SmartStb v2.0 - Fully Loaded');
            console.log('📁 Modular Architecture Active');
            console.log('👥 Team: Leonid → Dasha → Claude → Jimmy');
        });
    </script>
</body>
</html>
