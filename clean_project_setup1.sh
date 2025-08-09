# 2. Create clean backend (b/) - Pure JavaScript
mkdir -p b
cd b

# Initialize Node.js project
npm init -y

# Install backend dependencies
npm install express cors helmet express-rate-limit prisma @prisma/client bcryptjs jsonwebtoken dotenv

# Install dev dependencies
npm install -D nodemon

# Update package.json
npm pkg set name="vat-backend"
npm pkg set description="VAT Backend API - Pure JavaScript"
npm pkg set main="server.js"
npm pkg set scripts.dev="nodemon server.js"
npm pkg set scripts.start="node server.js"
npm pkg set scripts.db:migrate="prisma migrate dev"
npm pkg set scripts.db:generate="prisma generate"
npm pkg set scripts.db:studio="prisma studio"

# Initialize Prisma
npx prisma init

# Go back to root
cd ..

# 3. Create clean frontend (f/) - React + TypeScript + Tailwind
npx create-react-app f --template typescript
cd f

# Install additional frontend dependencies
npm install react-router-dom
npm install -D @types/react-router-dom

# Install and setup Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Go back to root
cd ..

# 4. Create root monorepo management
cat > package.json << 'EOF'
{
  "name": "smartvat-monorepo",
  "version": "1.0.0",
  "private": true,
  "description": "SmartVat - VAT Declaration System",
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd b && npm run dev",
    "dev:frontend": "cd f && npm start",
    "build": "npm run build:backend && npm run build:frontend",
    "build:backend": "cd b && npm run build",
    "build:frontend": "cd f && npm run build",
    "install:all": "cd b && npm install && cd ../f && npm install",
    "db:migrate": "cd b && npm run db:migrate",
    "db:studio": "cd b && npm run db:studio",
    "test": "cd f && npm test"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  },
  "workspaces": ["b", "f"],
  "author": "IT AI SOLAR - Dashka Team",
  "license": "MIT"
}
EOF

# Install concurrently for parallel development
npm install

echo "✅ Clean project structure created!"
echo "📁 Structure:"
echo "  ├── b/ (backend - Pure JavaScript + Express + Prisma)"
echo "  ├── f/ (frontend - React + TypeScript + Tailwind)"
echo "  ├── dashkasmartvat/ (demo - working prototype)"
echo "  └── package.json (monorepo management)"