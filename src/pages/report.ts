// src/pages/report.js
// 📄 Страница отчётов (Report Page) — заглушка
// В будущем сюда будут выводиться месячные отчёты, архив деклараций и выгрузка

export default function renderReportPage() {
  const root = document.getElementById('app');
  if (!root) return;

  root.innerHTML = `
    <section style="padding: 2rem">
      <h1>📁 Отчёты по декларациям</h1>
      <p>Здесь будет отображаться список сгенерированных отчётов SmartVAT по месяцам.</p>
      <ul>
        <li>📅 Апрель 2025</li>
        <li>📅 Март 2025</li>
        <li>📅 Февраль 2025</li>
        <li>📅 Январь 2025</li>
      </ul>
    </section>
  `;
}