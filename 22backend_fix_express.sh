# 🔧 EXPRESS VERSION FIX

cd b

# Stop current server (Ctrl+C if running)

# 1. Fix Express dependency versions
npm install express@4.18.2 --save
npm install path-to-regexp@0.1.10 --save

# 2. Create SIMPLE server without complex routing
cat > server.js << 'EOF'
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 4000

console.log('🚀 Starting VAT Backend...')

// Simple CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.use(express.json())

// VAT Calculator
const calculateVAT = (data) => {
  console.log('🧮 Calculating VAT:', data)
  
  const num = (val) => isNaN(val) ? 0 : Number(val)
  const round = (val) => Math.round(val * 100) / 100
  
  const field40a = num(data.field40a)
  const field40b = num(data.field40b)
  const field41 = num(data.field41)
  const field43 = num(data.field43)
  const field81a = num(data.field81a)
  const field81b = num(data.field81b)
  const field89a = num(data.field89a)
  const field89b = num(data.field89b)
  const field67 = num(data.field67)
  
  // EXACT LOGIC from frontend
  const field4 = field40a + field40b + field41 + field43
  const field8 = field81a + field81b + field89a + field89b
  const field61 = (field89a + field89b) * 0.19
  const field66 = field40a * 0.19
  const field62 = field66 + field61 + field67
  const field83 = field66 - field62
  const plannedProfit = field4 - field8
  
  let status = 'AUSGEGLICHEN'
  if (field83 > 0.01) status = 'ZAHLLAST'
  else if (field83 < -0.01) status = 'ERSTATTUNG'
  
  return {
    field4: round(field4),
    field8: round(field8),
    field61: round(field61),
    field66: round(field66),
    field62: round(field62),
    field83: round(field83),
    plannedProfit: round(plannedProfit),
    status,
    calculatedAt: new Date().toISOString()
  }
}

// Routes
app.get('/health', (req, res) => {
  console.log('📊 Health check requested')
  res.json({
    status: 'OK',
    service: 'VAT Backend',
    port: PORT,
    timestamp: new Date().toISOString()
  })
})

app.post('/api/vat/calculate', (req, res) => {
  try {
    console.log('📊 VAT calculation requested')
    const result = calculateVAT(req.body)
    console.log('✅ VAT calculated successfully')
    
    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ VAT calculation error:', error)
    res.status(400).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

app.get('/api/vat/test', (req, res) => {
  console.log('🧪 Test calculation requested')
  
  const testData = {
    field40a: 18400.00,
    field40b: 0.00,
    field41: 0.00,
    field43: 0.00,
    field81a: 133.56,
    field81b: 0.00,
    field89a: 15755.00,
    field89b: 484.96,
    field67: 0.00
  }
  
  const result = calculateVAT(testData)
  
  res.json({
    success: true,
    company: 'ASSET LOGISTICS GMBH',
    testData,
    calculation: result,
    timestamp: new Date().toISOString()
  })
})

// 404 handler
app.use('*', (req, res) => {
  console.log('❌ 404 - Route not found:', req.originalUrl)
  res.status(404).json({
    success: false,
    error: 'Route not found: ' + req.originalUrl,
    timestamp: new Date().toISOString()
  })
})

app.listen(PORT, () => {
  console.log('🚀 VAT Backend RUNNING!')
  console.log(`📍 Server: http://localhost:${PORT}`)
  console.log(`📊 Health: http://localhost:${PORT}/health`)
  console.log(`🧮 Test: http://localhost:${PORT}/api/vat/test`)
  console.log(`📡 Calculate: POST http://localhost:${PORT}/api/vat/calculate`)
  console.log('✅ Ready for connections!')
})
EOF

# 3. Restart server
echo "✅ Fixed server.js created!"
echo "🚀 Restarting server..."
npm run dev