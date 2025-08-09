# 🧪 ФИНАЛЬНОЕ ТЕСТИРОВАНИЕ ОБНОВЛЕННОЙ СИСТЕМЫ

echo "🚀 Starting comprehensive test of updated SmartVat system..."

# 1. Test Backend Health
echo "📊 Testing Backend Health..."
curl -s http://localhost:4000/health | python3 -m json.tool

echo -e "\n🧮 Testing REAL ASSET LOGISTICS calculation..."
curl -s -X POST http://localhost:4000/api/vat/calculate \
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
  }' | python3 -m json.tool

echo -e "\n🔬 Testing built-in ASSET LOGISTICS test data..."
curl -s http://localhost:4000/api/vat/test | python3 -m json.tool

echo -e "\n📋 Expected Results Verification:"
echo "✅ field66 should be: 0.00€ (0% VAT for EU export)"
echo "✅ field61 should be: 3085.59€ (Import VAT EU)"
echo "✅ field62 should be: 3085.59€ (Total input VAT)"
echo "✅ field83 should be: -3085.59€ (ERSTATTUNG)"
echo "✅ plannedProfit should be: 2026.48€"
echo "✅ status should be: ERSTATTUNG"

echo -e "\n🎯 Operation Summary:"
echo "📥 Import: 23t × 685€ = 15,755€ (+ 3,085.59€ Import VAT)"
echo "📤 Export: 23t × 800€ = 18,400€ (0% VAT to EU)"
echo "📊 Profit: 18,400€ - 16,373.52€ = 2,026.48€"
echo "💰 VAT Refund: 3,085.59€"

echo -e "\n✅ Backend testing completed!"
echo "🌐 Frontend should be running on: http://localhost:5173"
echo "📄 Auto-fill script ready for: https://vat.swapoil.de"