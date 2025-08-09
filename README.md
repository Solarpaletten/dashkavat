# 🚀 SmartVat - German VAT Calculator

**Professional VAT calculation system for German businesses with EU import/export operations.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18%2B-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-blue.svg)](https://www.typescriptlang.org/)

## 🎯 Features

- ✅ **Accurate VAT Calculations** - German tax compliance (Umsatzsteuer-Voranmeldung)
- ✅ **Real-time API** - Node.js backend with Express
- ✅ **Modern Frontend** - React + TypeScript + Tailwind CSS
- ✅ **Auto-fill Integration** - Direct integration with vat.swapoil.de
- ✅ **Import/Export Support** - EU trade VAT handling
- ✅ **Professional UI** - Clean, intuitive interface
- ✅ **Real Data Validation** - Tested with actual business cases

## 🏗️ Architecture

```
smartvat/
├── b/                    # 🚀 Backend (Node.js + Express)
│   ├── server.js         # Main API server
│   ├── package.json      # Backend dependencies
│   └── .env             # Configuration
├── f/                    # ⚡ Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/       # Page components
│   │   └── core/        # Business logic
│   ├── package.json     # Frontend dependencies
│   └── vite.config.ts   # Vite configuration
└── dashkasmartvat/       # 💡 Demo (Vanilla JS prototype)
    ├── index.html       # Working demo
    └── js/             # Original logic
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/smartvat.git
cd smartvat
```

2. **Setup Backend:**
```bash
cd b
npm install
npm run dev
# Backend runs on: http://localhost:4000
```

3. **Setup Frontend:**
```bash
cd f
npm install
npm run dev
# Frontend runs on: http://localhost:5173
```

4. **Test the system:**
```bash
# Test backend API:
curl http://localhost:4000/health

# Open frontend:
# http://localhost:5173
```

## 💼 Business Case

**Real Example: ASSET LOGISTICS GMBH (März 2025)**

```
📥 Import: 23t Technical Rapeseed Oil × 685€ = 15,755€
   + Import VAT: 3,085.59€ (19%)
   + Customs: 484.96€
   + Services: 133.56€

📤 Export: 23t × 800€ = 18,400€ (0% VAT to EU)

📊 Result: VAT Refund = 3,085.59€ (ERSTATTUNG)
💰 Profit: 2,026.48€
```

## 🧮 VAT Calculation Logic

```javascript
// Core calculation (German tax law compliant):
field66 = 0.00€          // 0% VAT for EU exports
field61 = 3085.59€       // Import VAT (deductible)
field62 = field66 + field61 + field67
field83 = field66 - field62  // Final result
// Result: -3085.59€ (ERSTATTUNG/Refund)
```

## 🔌 API Endpoints

### Backend API (`http://localhost:4000`)

- `GET /health` - Health check
- `GET /api/vat/test` - Test with demo data
- `POST /api/vat/calculate` - Calculate VAT

**Example Request:**
```bash
curl -X POST http://localhost:4000/api/vat/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "field40a": 18400,
    "field89a": 15755,
    "field89b": 484.96,
    "field81a": 133.56,
    "field67": 0
  }'
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "field83": -3085.59,
    "status": "ERSTATTUNG",
    "plannedProfit": 2026.48
  }
}
```

## 🌐 Integration

### Auto-fill German Tax Forms

1. Calculate VAT in SmartVat
2. Click "Открыть vat.swapoil.de"
3. On the tax form site, execute: `fillSmartVatData()`
4. All fields auto-filled with calculated values

### Supported Forms
- Umsatzsteuer-Voranmeldung (VAT advance return)
- German Finanzamt compatible formats

## 🧪 Testing

```bash
# Backend tests:
cd b
npm test

# Frontend tests:
cd f
npm test

# Integration test:
curl -s http://localhost:4000/api/vat/test | python3 -m json.tool
```

## 📱 Tech Stack

**Backend:**
- Node.js + Express
- JavaScript (ES6+)
- Prisma ORM (ready)
- PostgreSQL (planned)

**Frontend:**
- React 18
- TypeScript 5
- Vite build tool
- Tailwind CSS
- Modern ES modules

**Integration:**
- RESTful API
- LocalStorage sync
- Auto-fill scripts
- CORS enabled

## 📈 Roadmap

- [ ] Database integration (PostgreSQL)
- [ ] User authentication
- [ ] Multi-company support
- [ ] PDF export
- [ ] Email notifications
- [ ] Mobile app
- [ ] German Finanzamt API integration

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏢 Business Use

**Perfect for:**
- Import/Export companies
- EU trade businesses
- German tax consultants
- Accounting firms
- Multi-national corporations

## 📞 Support

- **Documentation**: [Wiki](https://github.com/your-username/smartvat/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/smartvat/issues)
- **Business inquiries**: contact@smartvat.de

## 🌟 Acknowledgments

- German tax law compliance
- ASSET LOGISTICS GMBH (test case provider)
- IT AI SOLAR development team

---

**Made with ❤️ by IT AI SOLAR Team**

🚀 **SmartVat** - Making German VAT calculations simple and accurate.
