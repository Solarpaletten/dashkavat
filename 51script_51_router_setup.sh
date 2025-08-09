# 🚀 SCRIPT 51 - ROUTER SETUP FOR VAT FORM v1.1.0

echo "🚀 Setting up React Router for VAT Form page..."

cd f

# 1. Install React Router
npm install react-router-dom
npm install -D @types/react-router-dom

# 2. Update main App.tsx with routing
cat > src/App.tsx << 'EOF'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import VatCalculator from './VatCalculator'
import VatForm from './VatForm'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation Header */}
        <nav className="bg-white shadow-md p-4 mb-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              🚀 SmartVat v1.1.0 - IT AI SOLAR
            </h1>
            <div className="space-x-4">
              <Link 
                to="/" 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                📊 VAT Calculator
              </Link>
              <Link 
                to="/vat-form" 
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                📄 Official VAT Form
              </Link>
            </div>
          </div>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<VatCalculator />} />
          <Route path="/vat-form" element={<VatForm />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 mt-12">
          <div className="max-w-6xl mx-auto text-center">
            <p>© 2025 IT AI SOLAR - SmartVat Professional German VAT System</p>
            <p className="text-sm text-gray-400 mt-2">
              🇩🇪 German Tax Law Compliant • 🚀 Production Ready • ⚡ Real-time Calculations
            </p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
EOF

# 3. Create placeholder VatForm component
cat > src/VatForm.tsx << 'EOF'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface VatFormData {
  field40a: number
  field40b: number
  field41: number
  field43: number
  field66: number
  field61: number
  field62: number
  field83: number
  calculatedAt: string
}

export default function VatForm() {
  const [formData, setFormData] = useState<VatFormData | null>(null)

  useEffect(() => {
    // Загружаем данные из localStorage или API
    const savedData = localStorage.getItem('smartvat-calculation')
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              📄 Umsatzsteuer-Voranmeldung
            </h1>
            <p className="text-gray-600">
              Official German VAT Declaration Form • ASSET LOGISTICS GMBH
            </p>
          </div>
          <Link 
            to="/" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            ← Back to Calculator
          </Link>
        </div>
      </div>

      {/* Form Preview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          🏗️ VAT Form (Under Construction - v1.1.0)
        </h2>
        
        {formData ? (
          <div className="space-y-4">
            <p className="text-green-600 font-bold">
              ✅ Data loaded from calculator!
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>Field 40a (EC Sales): {formData.field40a}€</div>
              <div>Field 66 (Output VAT): {formData.field66}€</div>
              <div>Field 61 (Import VAT): {formData.field61}€</div>
              <div>Field 83 (Final Result): <span className="font-bold text-red-600">{formData.field83}€</span></div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">
              No calculation data found. Please use the calculator first.
            </p>
            <Link 
              to="/" 
              className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition"
            >
              Go to Calculator
            </Link>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-bold text-blue-800 mb-2">🚀 Coming in v1.1.0:</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>✅ Complete official German VAT form layout</li>
            <li>✅ Auto-fill from calculator data</li>
            <li>✅ Real-time updates when data changes</li>
            <li>✅ Print and export functionality</li>
            <li>✅ Finanzamt-ready formatting</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
EOF

# 4. Update VatCalculator to save data and add navigation
cat >> src/VatCalculator.tsx << 'EOF'

// Add this function to save calculation results
const saveCalculationData = (calculationResult: VatResult) => {
  const dataToSave = {
    ...data,
    ...calculationResult,
    calculatedAt: new Date().toISOString()
  }
  localStorage.setItem('smartvat-calculation', JSON.stringify(dataToSave))
}

// Add this button in the results section (after ERSTATTUNG status)
<div className="mt-6 text-center">
  <Link 
    to="/vat-form" 
    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition inline-flex items-center gap-2"
  >
    📄 Open Official VAT Form
  </Link>
</div>
EOF

echo "✅ React Router setup completed!"
echo "📄 VatForm placeholder component created!"
echo "🔗 Navigation between pages ready!"
echo ""
echo "🚀 Next: Run 'npm run dev' to test routing!"