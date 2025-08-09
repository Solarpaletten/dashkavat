# 🚀 BACKEND FILES SETUP - Execute after clean project setup

cd b

# 1. Create folder structure
mkdir -p services controllers routes

# 2. Create server.js
cat > server.js << 'EOF'
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4000

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})
app.use(limiter)

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Import routes
const vatRoutes = require('./routes/vat.routes')

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'VAT Backend API',
    port: PORT,
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  })
})

// API routes
app.use('/api/vat', vatRoutes)

// Error handling
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack)
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
    timestamp: new Date().toISOString()
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    timestamp: new Date().toISOString()
  })
})

process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down gracefully...')
  process.exit(0)
})

app.listen(PORT, () => {
  console.log(`🚀 VAT Backend API running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`🧮 VAT API: http://localhost:${PORT}/api/vat/`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
})

module.exports = app
EOF

# 3. Create VAT Calculator Service
cat > services/vatCalculator.js << 'EOF'
class VatCalculatorService {
  constructor() {
    this.VAT_RATE_19 = 0.19
    this.VAT_RATE_7 = 0.07
    console.log('🧮 VAT Calculator Service initialized')
  }

  calculateDeclaration(input) {
    console.log('📊 Calculating VAT declaration...', input)
    
    try {
      // ТОЧНО ТА ЖЕ ЛОГИКА как в исправленном React frontend
      
      // 1. field4 = 40a + 40b + 41 + 43 (общая выручка)
      const field4 = this.safeNumber(input.field40a) + this.safeNumber(input.field40b) + 
                     this.safeNumber(input.field41) + this.safeNumber(input.field43)

      // 2. field8 = 81a + 81b + 89a + 89b (общие затраты)
      const field8 = this.safeNumber(input.field81a) + this.safeNumber(input.field81b) + 
                     this.safeNumber(input.field89a) + this.safeNumber(input.field89b)

      // 3. field61 = (89a + 89b) * 19% - импортный НДС ЕС
      const field61 = (this.safeNumber(input.field89a) + this.safeNumber(input.field89b)) * this.VAT_RATE_19

      // 4. field66 = НДС со строки 40a (19%)
      const field66 = this.safeNumber(input.field40a) * this.VAT_RATE_19

      // 5. field62 = 66 + 61 + 67 (общий зачетный НДС)
      const field62 = field66 + field61 + this.safeNumber(input.field67)

      // 6. field83 = НДС от 40a МИНУС зачетный НДС 62
      const field83 = field66 - field62

      // 7. plannedProfit = field4 - field8 (выручка - затраты)
      const plannedProfit = field4 - field8

      // Determine status
      let status
      if (field83 > 0.01) status = 'ZAHLLAST'
      else if (field83 < -0.01) status = 'ERSTATTUNG'
      else status = 'AUSGEGLICHEN'

      const result = {
        field4: this.roundTo2(field4),
        field8: this.roundTo2(field8),
        field61: this.roundTo2(field61),
        field66: this.roundTo2(field66),
        field62: this.roundTo2(field62),
        field83: this.roundTo2(field83),
        plannedProfit: this.roundTo2(plannedProfit),
        status,
        calculatedAt: new Date().toISOString()
      }

      console.log('✅ VAT calculation completed:', result)
      return result

    } catch (error) {
      console.error('❌ VAT calculation error:', error)
      throw new Error(`Calculation failed: ${error.message}`)
    }
  }

  getDefaultData() {
    return {
      field40a: 18400.00,  // Umsätze 19%
      field40b: 0.00,      // Umsätze 7%  
      field41: 0.00,       // Steuerfreie Umsätze
      field43: 0.00,       // Innergemeinschaftliche Lieferungen
      field81a: 133.56,    // Vorsteuer Deutschland
      field81b: 0.00,      // Vorsteuer sonstige
      field89a: 15755.00,  // EU Erwerb
      field89b: 484.96,    // Drittland Import
      field67: 0.00        // Import-USt Drittland
    }
  }

  safeNumber(value) {
    const num = typeof value === 'string' ? parseFloat(value) : Number(value)
    return isNaN(num) ? 0 : num
  }

  roundTo2(value) {
    return Math.round(value * 100) / 100
  }
}

module.exports = VatCalculatorService
EOF

# 4. Create Controller
cat > controllers/vatController.js << 'EOF'
const VatCalculatorService = require('../services/vatCalculator')

class VatController {
  constructor() {
    this.vatService = new VatCalculatorService()
  }

  // POST /api/vat/calculate
  calculateDeclaration = async (req, res) => {
    try {
      console.log('📊 VAT calculation request:', req.body)
      
      // Validate input
      const requiredFields = ['field40a', 'field40b', 'field41', 'field43', 'field81a', 'field81b', 'field89a', 'field89b', 'field67']
      const missingFields = requiredFields.filter(field => req.body[field] === undefined)
      
      if (missingFields.length > 0) {
        return res.status(400).json({
          success: false,
          error: `Missing required fields: ${missingFields.join(', ')}`,
          timestamp: new Date().toISOString()
        })
      }

      const calculation = this.vatService.calculateDeclaration(req.body)
      
      res.json({
        success: true,
        data: calculation,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.error('Calculate declaration error:', error)
      res.status(400).json({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      })
    }
  }

  // GET /api/vat/test
  testCalculation = async (req, res) => {
    try {
      const testData = this.vatService.getDefaultData()
      const result = this.vatService.calculateDeclaration(testData)
      
      res.json({
        success: true,
        message: 'Test calculation for ASSET LOGISTICS GMBH',
        testData,
        calculation: result,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.error('Test calculation error:', error)
      res.status(500).json({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      })
    }
  }

  // GET /api/vat/default-data
  getDefaultData = async (req, res) => {
    try {
      const defaultData = this.vatService.getDefaultData()
      res.json({
        success: true,
        data: defaultData,
        company: 'ASSET LOGISTICS GMBH',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      })
    }
  }
}

module.exports = VatController
EOF

# 5. Create Routes
cat > routes/vat.routes.js << 'EOF'
const express = require('express')
const VatController = require('../controllers/vatController')

const router = express.Router()
const vatController = new VatController()

// VAT calculation routes
router.post('/calculate', vatController.calculateDeclaration)
router.get('/test', vatController.testCalculation)
router.get('/default-data', vatController.getDefaultData)

// Info route
router.get('/info', (req, res) => {
  res.json({
    service: 'VAT API',
    version: '1.0.0',
    endpoints: {
      'POST /calculate': 'Calculate VAT declaration',
      'GET /test': 'Test calculation with default data',
      'GET /default-data': 'Get default ASSET LOGISTICS data'
    },
    timestamp: new Date().toISOString()
  })
})

module.exports = router
EOF

# 6. Create .env file
cat > .env << 'EOF'
DATABASE_URL="postgresql://user:password@localhost:5432/vatdb"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
NODE_ENV="development"
PORT=4000
EOF

# 7. Test backend
echo "✅ Backend files created!"
echo "🚀 Starting backend server..."
npm run dev
EOF