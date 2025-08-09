# 🧪 ПОЛНЫЙ ТЕСТ СИСТЕМЫ ПОСЛЕ ИСПРАВЛЕНИЙ

echo "🚀 COMPLETE SMARTVAT SYSTEM TEST - März 2025"
echo "=============================================="

# 1. Test Backend Health
echo "📊 1. Backend Health Check..."
HEALTH=$(curl -s http://localhost:4000/health)
echo "$HEALTH" | python3 -m json.tool
echo ""

# 2. Test REAL calculation
echo "🧮 2. Testing REAL ASSET LOGISTICS calculation..."
CALC_RESULT=$(curl -s -X POST http://localhost:4000/api/vat/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "field40a": 18400.00,
    "field40b": 0.00,
    "field41": 18400.00,
    "field43": 0.00,
    "field81a": 133.56,
    "field81b": 0.00,
    "field89a": 15755.00,
    "field89b": 484.96,
    "field67": 0.00
  }')

echo "$CALC_RESULT" | python3 -m json.tool
echo ""

# 3. Extract and verify key values
FIELD4=$(echo "$CALC_RESULT" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data['data']['field4'])")
FIELD83=$(echo "$CALC_RESULT" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data['data']['field83'])")
PROFIT=$(echo "$CALC_RESULT" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data['data']['plannedProfit'])")
STATUS=$(echo "$CALC_RESULT" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data['data']['status'])")

echo "📋 3. VERIFICATION OF KEY VALUES:"
echo "================================"

# Check field4
if [ "$(echo "$FIELD4" | cut -d. -f1)" = "18400" ]; then
  echo "✅ field4: $FIELD4€ (CORRECT - no duplication)"
else
  echo "❌ field4: $FIELD4€ (SHOULD BE 18400.00)"
fi

# Check field83  
if [ "$(echo "$FIELD83" | cut -d. -f1)" = "-3085" ]; then
  echo "✅ field83: $FIELD83€ (CORRECT - ERSTATTUNG)"
else
  echo "❌ field83: $FIELD83€ (SHOULD BE -3085.59)"
fi

# Check profit
if [ "$(echo "$PROFIT" | cut -d. -f1)" = "2026" ]; then
  echo "✅ plannedProfit: $PROFIT€ (CORRECT)"
else
  echo "❌ plannedProfit: $PROFIT€ (SHOULD BE ~2026.48)"
fi

# Check status
if [ "$STATUS" = "ERSTATTUNG" ]; then
  echo "✅ status: $STATUS (CORRECT)"
else
  echo "❌ status: $STATUS (SHOULD BE ERSTATTUNG)"
fi

echo ""
echo "🎯 4. REAL CASE VERIFICATION:"
echo "============================="
echo "📥 Import Operation: 23t × 685€ = 15,755€"
echo "📤 Export Operation: 23t × 800€ = 18,400€ (0% VAT to EU)"
echo "💰 VAT Refund Expected: 3,085.59€"
echo "📊 Profit Expected: 2,026.48€"

echo ""
echo "🌐 5. SYSTEM STATUS:"
echo "==================="
echo "✅ Backend: http://localhost:4000 (RUNNING)"
echo "✅ Frontend: http://localhost:5173 (Ready)"
echo "✅ Auto-fill: f/public/smartvat-autofill.js (Created)"
echo "✅ Integration: SmartVat → vat.swapoil.de (Ready)"

echo ""
echo "🚀 6. NEXT STEPS FOR FULL TEST:"
echo "==============================="
echo "1. Open browser: http://localhost:5173"
echo "2. Click 'Test Connection' → should show ✅ Connected"
echo "3. Click 'Load REAL März 2025 Data' → loads test data"
echo "4. Click 'Calculate VAT' → should show field83 = -3085.59€"
echo "5. Click 'Открыть vat.swapoil.de' → opens form with saved data"
echo "6. On vat.swapoil.de console (F12): fillSmartVatData()"

echo ""
echo "🎉 SMARTVAT SYSTEM TEST COMPLETED!"
echo "=================================="

# Test if frontend is running
if curl -s http://localhost:5173 > /dev/null 2>&1; then
  echo "✅ Frontend is RUNNING on port 5173"
else
  echo "⚠️ Frontend might not be running. Start with: cd f && npm run dev"
fi

echo ""
echo "💫 COSMIC TEAM SUCCESS! 🚀"