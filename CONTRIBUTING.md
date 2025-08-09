# Contributing to SmartVat

First off, thank you for considering contributing to SmartVat! It's people like you that make SmartVat such a great tool for German VAT calculations.

## 🚀 Quick Start

1. Fork the repo
2. Clone your fork
3. Create a feature branch
4. Make your changes
5. Test thoroughly
6. Submit a pull request

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)

## 🤝 Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code.

### Our Standards

- Be respectful and inclusive
- Focus on what's best for the community
- Show empathy towards other community members
- Give constructive feedback
- Accept constructive criticism gracefully

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Basic understanding of German VAT law (helpful)

### Setup Steps

1. **Fork and Clone**
```bash
git clone https://github.com/your-username/smartvat.git
cd smartvat
```

2. **Backend Setup**
```bash
cd b
npm install
cp .env.example .env  # Configure your environment
npm run dev           # Starts on port 4000
```

3. **Frontend Setup**
```bash
cd f
npm install
npm run dev           # Starts on port 5173
```

4. **Verify Setup**
```bash
curl http://localhost:4000/health
# Open: http://localhost:5173
```

## 🏗️ Project Structure

```
smartvat/
├── b/                          # 🚀 Backend (Node.js)
│   ├── server.js              # Main API server
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment configuration
├── f/                          # ⚡ Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── core/             # Business logic
│   │   └── utils/            # Utility functions
│   ├── package.json          # Frontend dependencies
│   └── vite.config.ts        # Vite configuration
├── dashkasmartvat/            # 💡 Demo (Reference)
│   ├── index.html            # Working prototype
│   └── js/                   # Original logic
└── docs/                      # 📚 Documentation
    ├── API.md                # API documentation
    ├── DEPLOYMENT.md         # Deployment guide
    └── GERMAN_VAT.md         # German VAT law reference
```

## 📝 Coding Standards

### Backend (JavaScript)

```javascript
// Use modern ES6+ syntax
const calculateVAT = (data) => {
  const num = (val) => isNaN(val) ? 0 : Number(val)
  return {
    field83: num(data.field66) - num(data.field62)
  }
}

// Clear function names and comments
// Handle errors gracefully
// Use consistent indentation (2 spaces)
```

### Frontend (TypeScript)

```typescript
// Use strict TypeScript types
interface VATData {
  field40a: number
  field83: number
  status: 'ERSTATTUNG' | 'ZAHLLAST'
}

// React functional components with hooks
const VATCalculator: React.FC = () => {
  const [data, setData] = useState<VATData>()
  return <div>...</div>
}

// Use Tailwind CSS classes
// Follow React best practices
```

### General Rules

- **Naming**: Use descriptive names (`calculateField83` not `calc`)
- **Comments**: Explain WHY, not WHAT
- **German VAT**: Use correct German terminology
- **Formatting**: Use Prettier configuration
- **Linting**: Follow ESLint rules

## 🧪 Testing

### Backend Tests

```bash
cd b
npm test
```

### Frontend Tests

```bash
cd f
npm test
```

### Integration Tests

```bash
# Test full workflow
curl -s http://localhost:4000/api/vat/test | python3 -m json.tool
```

### VAT Calculation Tests

Always test with real business cases:

```javascript
// Test ASSET LOGISTICS case
const testData = {
  field40a: 18400,    // Export sales
  field89a: 15755,    // Import purchases
  field89b: 484.96,   // Import customs
  field81a: 133.56    // Services
}

// Expected result
const expected = {
  field83: -3085.59,  // VAT refund
  status: 'ERSTATTUNG'
}
```

## 🔄 Pull Request Process

### Before Submitting

1. **Update documentation** if needed
2. **Test thoroughly** with real data
3. **Follow coding standards**
4. **Write clear commit messages**

### Commit Message Format

```
🚀 Add feature: Brief description

- Detailed explanation of changes
- Why this change was needed
- Any breaking changes

Fixes #123
```

### PR Checklist

- [ ] Tests pass
- [ ] Documentation updated
- [ ] German VAT compliance verified
- [ ] No breaking changes (or clearly marked)
- [ ] Code follows style guidelines
- [ ] Self-review completed

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **VAT calculation** verification
4. **Manual testing** if needed
5. **Merge** when approved

## 🐛 Reporting Issues

### Bug Reports

Please include:

- **Clear title** and description
- **Steps to reproduce** the issue
- **Expected** vs **actual** behavior
- **Environment** details (OS, Node.js version)
- **German VAT context** if applicable

### Feature Requests

Please include:

- **Business justification** for the feature
- **German VAT law** relevance
- **Proposed implementation** (if any)
- **Potential impact** on existing functionality

### Templates

Use our issue templates:

- **Bug Report**: For reporting bugs
- **Feature Request**: For suggesting enhancements
- **VAT Question**: For German tax law clarification

## 🎯 Focus Areas

We especially welcome contributions in:

### High Priority
- German VAT law compliance
- Calculation accuracy
- User experience improvements
- Documentation enhancements
- Test coverage

### Medium Priority
- Performance optimization
- New integrations
- Additional features
- Mobile responsiveness
- Accessibility

### Future
- Multi-language support
- Advanced reporting
- API integrations
- Mobile app

## 📚 Resources

### German VAT Resources
- [Bundesfinanzministerium](https://www.bundesfinanzministerium.de/)
- [Umsatzsteuergesetz (UStG)](https://www.gesetze-im-internet.de/ustg_1980/)
- [VAT Directive 2006/112/EC](https://eur-lex.europa.eu/eli/dir/2006/112/oj)

### Technical Resources
- [React Documentation](https://reactjs.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express Guide](https://expressjs.com/guide/)

### Project Resources
- [Project Wiki](https://github.com/your-username/smartvat/wiki)
- [API Documentation](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## 🙋 Questions?

Don't hesitate to ask questions:

- **GitHub Discussions**: For general questions
- **GitHub Issues**: For bug reports and feature requests
- **Email**: contact@smartvat.de for business inquiries

## 🎉 Recognition

Contributors will be:

- Listed in our README
- Mentioned in release notes
- Invited to our contributor channel
- Eligible for swag (future)

---

**Thank you for contributing to SmartVat!** 

Your contributions help German businesses handle VAT calculations more efficiently and accurately. 🇩🇪💼
