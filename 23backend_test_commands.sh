# 🧪 BACKEND API TESTING - Open NEW terminal window

# 1. Test Health Check
echo "🏥 Testing Health Check..."
curl http://localhost:4000/health

echo -e "\n\n"

# 2. Test VAT Calculation with ASSET LOGISTICS data
echo "🧮 Testing VAT Calculation..."
curl -X POST http://localhost:4000/api/vat/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "field40a": 18400.00,
    "field40b": 0.00,
    "field41": 0.00,
    "field43": 0.00,
    "field81a": 133.56,
    "field81b": 0.00,
    "field89a": 15755.00,
    "field89b": 484.96,
    "field67": 0.00
  }'

echo -e "\n\n"

# 3. Test Built-in Test Endpoint
echo "🔬 Testing Built-in Test Data..."
curl http://localhost:4000/api/vat/test

echo -e "\n\n✅ All backend tests completed!"