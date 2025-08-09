# 🚀 BACKEND IMMEDIATE SETUP

cd b

# 1. Update package.json for proper backend
npm pkg set name="vat-backend"
npm pkg set description="VAT Backend API - JavaScript"
npm pkg set main="server.js"
npm pkg set scripts.dev="nodemon server.js"
npm pkg set scripts.start="node server.js"

# 2. Create simple working server.js
cat > server.js << 'EOF'
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4000

console.log('🚀 Starting VAT Backend...')

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}))
app.use(express.json())

// VAT Calculator
class VatCalculator {
  constructor() {
    this.VAT_RATE_19 = 0.19
  }

  calculate(data) {
    console.log('🧮 Calculating VAT:', data)
    
    // Convert to numbers safely
    const field40a = this.num(data.field40a)
    const field40b = this.num(data.field40b)
    const field41 = this.num(data.field41)
    const field43 = this.num(data.field43)
    const field81a = this.num(data.field81a)
    const field81b = this.num(data.field81b)
    const field89a = this.num(data.field89a)
    const field89b = this.num(data.field89b)
    const field67 = this.num(data.field67)
    
    // EXACT LOGIC from our corrected frontend
    const field4 = field40a + field40b + field41 + field43
    const field8 = field81a + field81b + field89a + field89b
    const field61 = (field89a + field89b) * this.VAT_RATE_19
    const field66 = field40a * this.VAT_RATE_19
    const field62 = field66 + field61 + field67
    const field83 = field66 - field62
    const plannedProfit = field4 - field8
    
    let status = 'AUSGEGLICHEN'
    if (field83 > 0.01) status = 'ZAHLLAST'
    else if (field83 < -0.01) status = 'ERSTATTUNG'
    
    return {
      field4: this.round(field4),
      field8: this.round(field8),
      field61: this.round(field61),
      field66: this.round(field66),
      field62: this.round(field62),
      field83: this.round(field83),
      plannedProfit: this.round(plannedProfit),
      status,
      calculatedAt: new Date().toISOString()
    }
  }
  
  num(val) {
    return isNaN(val) ? 0 : Number(val)
  }
  
  round(val) {
    return Math.round(val * 100) / 100
  }
}

const calculator = new VatCalculator()

// Routes
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'VAT Backend',
    port: PORT,
    timestamp: new Date().toISOString()
  })
})

app.post('/api/vat/calculate', (req, res) => {
  try {
    const result = calculator.calculate(req.body)
    console.log('✅ VAT calculated:', result)
    
    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ VAT error:', error)
    res.status(400).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

app.get('/api/vat/test', (req, res) => {
  // ASSET LOGISTICS test data
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
  
  const result = calculator.calculate(testData)
  
  res.json({
    success: true,
    company: 'ASSET LOGISTICS GMBH',
    testData,
    calculation: result,
    timestamp: new Date().toISOString()
  })
})

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  })
})

app.listen(PORT, () => {
  console.log(`🚀 VAT Backend running on http://localhost:${PORT}`)
  console.log(`📊 Health: http://localhost:${PORT}/health`)
  console.log(`🧮 Test: http://localhost:${PORT}/api/vat/test`)
  console.log(`📡 Calculate: POST http://localhost:${PORT}/api/vat/calculate`)
})
EOF

# 3. Create .env
cat > .env << 'EOF'
NODE_ENV=development
PORT=4000
EOF

# 4. Start backend
echo "✅ Backend setup complete!"
echo "🚀 Starting backend server..."
npm run dev