import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import VatCalculator from './VatCalculator'
import VatForm from './VatForm'
import './App.css'

function Navigation() {
  const location = useLocation()
  
  return (
    <nav className="bg-white shadow-md p-4 mb-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            🚀 SmartVat v1.1.0 - IT AI SOLAR
          </h1>
          <p className="text-sm text-gray-600">
            Professional German VAT System • Production Ready
          </p>
        </div>
        <div className="space-x-4">
          <Link 
            to="/" 
            className={`px-4 py-2 rounded transition ${
              location.pathname === '/' 
                ? 'bg-blue-600 text-white' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            📊 VAT Calculator
          </Link>
          <Link 
            to="/vat-form" 
            className={`px-4 py-2 rounded transition ${
              location.pathname === '/vat-form' 
                ? 'bg-green-600 text-white' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            📄 Official VAT Form
          </Link>
        </div>
      </div>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<VatCalculator />} />
          <Route path="/vat-form" element={<VatForm />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-6 mt-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-lg mb-2">🚀 SmartVat v1.1.0</h3>
                <p className="text-gray-400 text-sm">
                  Professional German VAT System with integrated official form generation.
                  Real case validation with ASSET LOGISTICS GMBH data.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">🇩🇪 Features</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>✅ German Tax Law Compliant</li>
                  <li>✅ Real-time VAT Calculations</li>
                  <li>✅ Official Form Auto-fill</li>
                  <li>✅ Import/Export VAT Handling</li>
                  <li>✅ Production Ready</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">💼 Business Ready</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Import/Export Companies</li>
                  <li>• German Tax Consultants</li>
                  <li>• EU Trade Businesses</li>
                  <li>• Accounting Firms</li>
                  <li>• Multi-national Corporations</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-6 pt-6 text-center">
              <p className="text-gray-400 text-sm">
                © 2025 IT AI SOLAR - SmartVat Professional German VAT System
              </p>
              <div className="flex justify-center items-center gap-4 mt-2 text-xs text-gray-500">
                <span>🇩🇪 German Tax Law Compliant</span>
                <span>•</span>
                <span>🚀 Production Ready</span>
                <span>•</span>
                <span>⚡ Real-time Calculations</span>
                <span>•</span>
                <span>📄 Official Form Integration</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
