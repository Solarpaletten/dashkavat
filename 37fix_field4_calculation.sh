# 🔧 ИСПРАВЛЯЕМ РАСЧЕТ field4 - УБИРАЕМ ДУБЛИРОВАНИЕ

cd b

# Создаем исправленную версию server.js
sed -i '' 's/const field4 = field40a + field40b + field41 + field43/const field4 = field40a + field40b + 0 + field43  \/\/ field41 не включаем в field4/' server.js

# ИЛИ полная замена logic секции
cat > temp_fix.js << 'EOF'
  // 1. field4 = Общая выручка (БЕЗ дублирования field41!)
  const field4 = field40a + field40b + field43  // НЕ включаем field41!
  
  // 2. field8 = Общие затраты  
  const field8 = field81a + field81b + field89a + field89b
  
  // 3. field66 = НДС с реализации (КРИТИЧНО: 0% для экспорта!)
  const field66 = 0.00  // НЕ field40a * 0.19! Экспорт = 0%
  
  // 4. field61 = Импортный НДС ЕС
  const field61 = (field89a + field89b) * 0.19
  
  // 5. field62 = Общий зачетный НДС
  const field62 = field66 + field61 + field67
  
  // 6. field83 = К доплате/возврату
  const field83 = field66 - field62
  
  // 7. Плановая прибыль
  const plannedProfit = field4 - field8
EOF

# Заменяем правильную логику в server.js
perl -i -pe 'BEGIN{undef $/;} s/\/\/ 1\. field4.*?\/\/ 7\. Плановая прибыль.*?const plannedProfit = field4 - field8/`cat temp_fix.js`/smg' server.js

rm temp_fix.js

echo "✅ Field4 calculation fixed!"
echo "🔄 Expected results:"
echo "  field4: 18400.00€ (not 36800!)"
echo "  plannedProfit: 2026.48€ (not 20426.48!)"

# Не нужно перезапускать - nodemon автоматически перезагрузится
echo "⚡ Nodemon will auto-reload the server..."
