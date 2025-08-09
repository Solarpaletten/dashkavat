/**
 * SmartVat - Fraubüller Declaration Styles
 * Стили в стиле оригинальной немецкой декларации
 * @author IT AI SOLAR Team - Leanid, Dashka, Jimmy
 * @version 2.0 Enhanced
 */

/* === GLOBAL RESET === */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* === BODY === */
body {
    font-family: Arial, sans-serif;
    font-size: 12px;
    line-height: 1.4;
    background: #f5f5f5;
    color: #000;
}

/* === DOCUMENT CONTAINER === */
.document {
    max-width: 850px;
    margin: 20px auto;
    background: white;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
    min-height: 900px;
    position: relative;
}

/* === HEADER === */
.header {
    border-bottom: 2px solid #000;
    padding: 20px;
    background: #fff;
}

.header-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;
}

.company-name {
    font-weight: bold;
    font-size: 14px;
}

.tax-number {
    font-weight: bold;
    text-align: center;
    font-size: 14px;
}

.page-info {
    font-weight: bold;
    text-align: right;
    font-size: 14px;
}

.title {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    margin: 20px 0;
    text-decoration: underline;
}

/* === INFO BOXES === */
.info-boxes {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
}

.info-box {
    border: 2px solid #000;
    padding: 8px;
    font-size: 11px;
}

.send-date {
    width: 280px;
}

.declaration-type {
    width: 220px;
    text-align: center;
}

.period-box {
    width: 220px;
    text-align: center;
    margin-top: 20px;
}

/* === CONTENT === */
.content {
    padding: 20px;
}

/* === SECTIONS === */
.section {
    margin-bottom: 25px;
}

.section-title {
    font-weight: bold;
    font-size: 13px;
    margin-bottom: 10px;
    color: #000;
}

.subsection-title {
    font-weight: bold;
    font-size: 12px;
    margin: 15px 0 8px 0;
    color: #333;
}

/* === FIELD ROWS === */
.field-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    padding: 4px 0;
    transition: background-color 0.2s ease;
}

.field-row:hover {
    background: #f8f9fa;
}

.field-label {
    flex: 1;
    font-size: 11px;
    line-height: 1.3;
}

.field-number {
    font-weight: bold;
    margin-right: 10px;
    min-width: 30px;
    text-align: center;
    background: #f0f0f0;
    padding: 2px 4px;
    border-radius: 3px;
}

/* === INPUT FIELDS === */
.field-input {
    width: 80px;
    text-align: right;
    border: 1px solid #ccc;
    padding: 4px;
    font-size: 11px;
    background: white;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.field-input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 3px rgba(102, 126, 234, 0.3);
}

.field-input[readonly] {
    background: #f8f9fa;
    color: #666;
    font-weight: bold;
    cursor: not-allowed;
}

/* === CALCULATED FIELDS === */
.calculated {
    background: #e3f2fd !important;
    border-color: #2196f3 !important;
}

/* === SMARTVAT ENHANCEMENTS === */
.smartvat-enhanced {
    background: #fff3e0;
    border-left: 3px solid #ff9800;
    padding-left: 8px;
    margin: 5px 0;
    border-radius: 0 4px 4px 0;
}

.smartvat-label {
    color: #e65100;
    font-size: 10px;
    font-style: italic;
    margin-bottom: 5px;
    font-weight: bold;
}

/* === SPECIAL FIELD TYPES === */
.total-field {
    background: #f3e5f5;
    border-left: 3px solid #9c27b0;
    padding: 5px;
    margin: 8px 0;
    border-radius: 4px;
}

.result-field {
    background: #ffebee;
    border: 2px solid #d32f2f;
    padding: 8px;
    margin: 10px 0;
    font-weight: bold;
    border-radius: 4px;
}

.profit-field {
    background: #e8f5e8;
    border: 2px solid #4caf50;
    padding: 8px;
    margin: 10px 0;
    font-weight: bold;
    border-radius: 4px;
}

/* === CONTROLS === */
.controls {
    background: #667eea;
    color: white;
    padding: 15px;
    margin: 20px 0;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.btn {
    background: white;
    color: #667eea;
    border: none;
    padding: 8px 16px;
    margin: 5px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 11px;
    font-weight: bold;
    transition: all 0.2s ease;
}

.btn:hover {
    background: #f0f0f0;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.btn:active {
    transform: translateY(0);
}

/* === WATERMARK === */
.watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: rotate(-45deg) translate(-50%, -50%);
    font-size: 60px;
    color: rgba(102, 126, 234, 0.1);
    font-weight: bold;
    pointer-events: none;
    z-index: 1;
    user-select: none;
}

/* === SMARTVAT BADGE === */
.smartvat-badge {
    position: fixed;
    top: 10px;
    right: 10px;
    background: #667eea;
    color: white;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 10px;
    font-weight: bold;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    animation: pulse 3s infinite;
}

@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
}

/* === FOOTER === */
.footer-text {
    font-size: 10px;
    text-align: center;
    margin-top: 30px;
    padding: 15px;
    border-top: 1px solid #ccc;
    background: #f9f9f9;
    color: #666;
}

.footer-text p {
    margin-bottom: 5px;
}

.footer-text strong {
    color: #333;
}

/* === RESPONSIVE DESIGN === */
@media print {
    body {
        background: white;
    }
    
    .document {
        box-shadow: none;
        margin: 0;
    }
    
    .smartvat-badge {
        display: none;
    }
    
    .controls {
        display: none;
    }
    
    .watermark {
        color: rgba(102, 126, 234, 0.05);
    }
}

@media (max-width: 900px) {
    .document {
        margin: 10px;
        max-width: none;
    }
    
    .header-row {
        flex-direction: column;
        gap: 10px;
        text-align: center;
    }
    
    .info-boxes {
        flex-direction: column;
        gap: 10px;
    }
    
    .send-date,
    .declaration-type,
    .period-box {
        width: 100%;
        margin: 0;
    }
    
    .field-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
    
    .field-input {
        align-self: flex-end;
    }
}

@media (max-width: 600px) {
    .content {
        padding: 10px;
    }
    
    .header {
        padding: 15px;
    }
    
    .title {
        font-size: 16px;
    }
    
    .section-title {
        font-size: 12px;
    }
    
    .field-label {
        font-size: 10px;
    }
    
    .field-input {
        width: 70px;
        font-size: 10px;
    }
    
    .smartvat-badge {
        position: relative;
        top: auto;
        right: auto;
        margin-bottom: 10px;
        display: block;
        text-align: center;
    }
}

/* === ACCESSIBILITY === */
@media (prefers-reduced-motion: reduce) {
    .btn {
        transition: none;
    }
    
    .smartvat-badge {
        animation: none;
    }
    
    .field-input {
        transition: none;
    }
}

/* === HIGH CONTRAST MODE === */
@media (prefers-contrast: high) {
    .field-input {
        border-width: 2px;
    }
    
    .calculated {
        border-width: 2px;
    }
    
    .smartvat-enhanced {
        border-left-width: 4px;
    }
}

/* === DARK MODE === */
@media (prefers-color-scheme: dark) {
    /* Оставляем светлую тему для официального документа */
    /* но можно добавить темную тему для разработки */
    .controls {
        background: #333;
    }
    
    .smartvat-badge {
        background: #333;
    }
}