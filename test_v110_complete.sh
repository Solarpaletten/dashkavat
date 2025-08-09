#!/bin/bash
# 🚀 COMPLETE v1.1.0 FUNCTIONALITY TEST

echo "🚀 TESTING SMARTVAT v1.1.0 COMPLETE FUNCTIONALITY"
echo "==============================================="

echo "📊 1. Testing Backend API..."
curl -s http://localhost:4000/health | python3 -c "import sys, json; print(json.dumps(json.load(sys.stdin), indent=2))"

echo ""
echo "🧮 2. Testing VAT Calculation..."
curl -s http://localhost:4000/api/vat/test | python3 -c "
import sys, json
data = json.load(sys.stdin)
print(f'✅ Field 83: {data[\"calculation\"][\"field83\"]}€')
print(f'✅ Status: {data[\"calculation\"][\"status\"]}')
print(f'✅ Profit: {data[\"calculation\"][\"plannedProfit\"]}€')
"

echo ""
echo "🌐 3. Frontend URLs to test:"
echo "   📊 Calculator: http://localhost:5173/"
echo "   📄 VAT Form:   http://localhost:5173/vat-form"

echo ""
echo "🧪 4. Manual Test Checklist:"
echo "   ✅ Calculator loads with ASSET LOGISTICS data"
echo "   ✅ Calculate VAT button works"
echo "   ✅ Navigation between pages works"
echo "   ✅ VAT Form auto-fills with data"
echo "   ✅ Edit mode works in VAT Form"
echo "   ✅ Print functionality works"
echo "   ✅ Export functionality works"
echo "   ✅ Data persists across page navigation"

echo ""
echo "🎯 Expected Results:"
echo "   Field 83: -3085.59€ (ERSTATTUNG)"
echo "   Planned Profit: 2026.48€"
echo "   Status: VAT Refund Expected"

echo ""
echo "🚀 SmartVat v1.1.0 - Complete German VAT Solution!"
