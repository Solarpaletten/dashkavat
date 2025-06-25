// src/review/displayUpdater.ts
export function updateProfitDisplay(field83: number, plannedProfit: number): void {
  // Gewinn- und USt-Anzeige im Control-Panel aktualisieren
  const display = document.getElementById('profitDisplay')
  if (!display) return

  let statusText = ''
  let statusColor = ''

  // USt-Status bestimmen
  if (field83 > 0) {
    statusText = `💸 Zahllast: ${field83.toFixed(2)}€`
    statusColor = '#d32f2f'
  } else if (field83 < 0) {
    statusText = `💰 Erstattung: ${Math.abs(field83).toFixed(2)}€`
    statusColor = '#4caf50'
  } else {
    statusText = `⚖️ Ausgeglichen: 0.00€`
    statusColor = '#1976d2'
  }

  // Gewinn-Status bestimmen  
  const profitText = plannedProfit >= 0 ? 
    `📈 Gewinn: ${plannedProfit.toFixed(2)}€` : 
    `📉 Verlust: ${Math.abs(plannedProfit).toFixed(2)}€`
  const profitColor = plannedProfit >= 0 ? '#4caf50' : '#d32f2f'

  // HTML für die Anzeige erstellen
  display.innerHTML = `
    <span style="color: ${statusColor}; font-weight: bold;">${statusText}</span> | 
    <span style="color: ${profitColor}; font-weight: bold;">${profitText}</span>
  `
}

export default updateProfitDisplay