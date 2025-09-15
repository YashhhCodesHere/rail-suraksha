# 🚂 RailSuraksha - AI-Powered Railway Analytics Platform

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14.2.25-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.9-06b6d4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Advanced Railway Track Fitting Management with AI-Driven Analytics**

[🚀 Live Demo](https://rail-suraksha.netlify.app/) • [🐛 Report Bug](../../issues) • [✨ Request Feature](../../issues)

![RailSuraksha Dashboard](https://via.placeholder.com/800x400/0f172a/60a5fa?text=RailSuraksha+Dashboard)

</div>

---

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [📱 Screenshots](#-screenshots)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🔧 Usage](#-usage)
- [📊 API Reference](#-api-reference)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 Overview

**RailSuraksha** is a comprehensive, AI-powered railway analytics platform designed to revolutionize track fitting management and maintenance operations. Built for Indian Railways and modern transit systems, it provides real-time monitoring, predictive analytics, and intelligent inventory management for railway infrastructure components.

### 🌟 Key Highlights

- 🔍 **Real-time Monitoring**: Live tracking of railway track fittings across all zones
- 🤖 **AI-Powered Analytics**: Predictive maintenance and risk assessment algorithms
- 📊 **Comprehensive Dashboard**: Interactive visualizations with advanced filtering
- 🏷️ **QR Code Management**: Generate and track QR codes for physical assets
- 📦 **Smart Inventory**: Complete CRUD operations with warranty tracking
- 🔗 **System Integration**: Seamless connectivity with existing railway systems
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🌙 **Dark Mode**: Professional dark theme for extended usage

---

## ✨ Features

### 🎛️ **Dashboard & Analytics**
- **Interactive Metrics**: Real-time KPIs with trend analysis
- **Risk Assessment**: Zone-wise risk mapping with severity indicators
- **Vendor Performance**: Quality scoring and performance tracking
- **Predictive Maintenance**: AI-driven maintenance scheduling
- **Custom Reports**: Export analytics in multiple formats (CSV, Excel, JSON, PDF)

### 📦 **Inventory Management**
- **Asset Tracking**: Complete lifecycle management of railway components
- **CRUD Operations**: Add, edit, delete inventory items with validation
- **Advanced Filtering**: Multi-parameter search and filtering system
- **Warranty Management**: Automated warranty tracking and notifications
- **Batch Processing**: Bulk operations and data export capabilities

### 🏷️ **QR Code Generation**
- **Dynamic QR Codes**: Generate QR codes for physical asset tracking
- **Batch Creation**: Bulk QR code generation for multiple items
- **Multiple Formats**: Export as PNG, SVG, and PDF formats
- **Custom Styling**: Configurable QR code appearance and branding

### 🔗 **System Integration**
- **API Connectivity**: RESTful APIs for external system integration
- **Real-time Sync**: Live data synchronization with railway databases
- **Health Monitoring**: System status dashboard with uptime tracking
- **Error Handling**: Comprehensive logging and error recovery

### 🔔 **Notifications & Alerts**
- **Smart Alerts**: Priority-based notification system
- **Risk Warnings**: Automated alerts for high-risk components
- **Maintenance Reminders**: Scheduled maintenance notifications
- **System Updates**: Real-time status updates and announcements

---

## 🏗️ Architecture

### **Frontend Architecture**
```
├── 🎨 Presentation Layer (React + Next.js)
│   ├── Components (Modular UI Components)
│   ├── Pages (Route-based Navigation)
│   └── Hooks (Custom React Hooks)
├── 🔄 State Management (React State + Context)
├── 🎯 Business Logic Layer
├── 📡 API Integration Layer
└── 🎨 Styling (Tailwind CSS + shadcn/ui)
```

### **Component Structure**
```
components/
├── 📊 dashboard/          # Analytics and metrics
├── 📦 inventory/          # Asset management
├── 🏷️ qr-generation/     # QR code utilities
├── 🔗 integration/       # System connectivity
├── 🔔 notifications/     # Alert system
├── 🚨 alerts/            # Priority notifications
├── 🎨 ui/                # Reusable UI components
└── 📱 analytics/         # Advanced analytics
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0+ 
- **pnpm** 8.0+ (recommended) or npm
- **Git** for version control

### 1️⃣ Clone Repository
```bash
git clone https://github.com/YashhhCodesHere/rail-suraksha.git
cd rail-suraksha
```

### 2️⃣ Install Dependencies
```bash
pnpm install
```

### 3️⃣ Start Development Server
```bash
pnpm dev
```

### 4️⃣ Open Application
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 Screenshots

### 🎯 **Dashboard Overview**
![Dashboard](https://via.placeholder.com/600x300/1e293b/60a5fa?text=Analytics+Dashboard)

### 📦 **Inventory Management**
![Inventory](https://via.placeholder.com/600x300/1e293b/10b981?text=Inventory+Table)

### 🏷️ **QR Code Generation**
![QR Generation](https://via.placeholder.com/600x300/1e293b/f59e0b?text=QR+Code+Generator)

### 🔗 **System Integration**
![Integration](https://via.placeholder.com/600x300/1e293b/8b5cf6?text=System+Health+Timeline)

---

## 🛠️ Tech Stack

### **Frontend Technologies**
| Technology | Version | Purpose |
|------------|---------|---------|
| ⚛️ **React** | 19.0 | UI Library |
| 🔗 **Next.js** | 14.2.25 | React Framework |
| 📘 **TypeScript** | 5.0 | Type Safety |
| 🎨 **Tailwind CSS** | 4.1.9 | Styling Framework |
| 🧩 **shadcn/ui** | Latest | Component Library |
| 📊 **Recharts** | 2.15.4 | Data Visualization |

### **UI Components & Libraries**
| Library | Purpose |
|---------|---------|
| 🎛️ **Radix UI** | Headless UI Components |
| 📅 **date-fns** | Date Manipulation |
| 🏷️ **qrcode** | QR Code Generation |
| 🎭 **Lucide React** | Icon Library |
| 🎨 **class-variance-authority** | Component Variants |
| 📊 **Recharts** | Charts & Graphs |

### **Development Tools**
| Tool | Purpose |
|------|---------|
| 📦 **pnpm** | Package Manager |
| 🔍 **ESLint** | Code Linting |
| 🎯 **TypeScript** | Static Type Checking |
| 🎨 **PostCSS** | CSS Processing |
| ⚡ **Vercel Analytics** | Performance Monitoring |

---

## 📦 Installation

### **Development Setup**

1. **Clone and Navigate**
   ```bash
   git clone https://github.com/YashhhCodesHere/rail-suraksha.git
   cd rail-suraksha
   ```

2. **Install Dependencies**
   ```bash
   # Using pnpm (recommended)
   pnpm install
   
   # Or using npm
   npm install
   
   # Or using yarn
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start Development**
   ```bash
   pnpm dev
   ```

### **Production Build**
```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Export static files
pnpm export
```

---

## ⚙️ Configuration

### **Environment Variables**
Create a `.env.local` file in the root directory:

```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=RailSuraksha

# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api.railsuraksha.com
API_SECRET_KEY=your_secret_key_here

# Database (if applicable)
DATABASE_URL=postgresql://username:password@localhost:5432/railsuraksha

# Analytics
VERCEL_ANALYTICS_ID=your_analytics_id

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
```

### **Next.js Configuration**
The application uses the following Next.js configuration (`next.config.mjs`):

```javascript
const nextConfig = {
  output: 'export',           // Static site generation
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: true,  // Skip TypeScript errors during builds
  },
  images: {
    unoptimized: true,        // Disable image optimization for static export
  },
}
```

---

## 🔧 Usage

### **Dashboard Navigation**
1. **Dashboard**: View analytics and key metrics
2. **QR Generation**: Create QR codes for assets
3. **Inventory**: Manage railway components
4. **Analytics**: Advanced reporting and insights
5. **Integration**: System health and connectivity

### **Inventory Management**
```typescript
// Add new inventory item
const newItem = {
  batchId: "24-01-1234",
  vendor: "Tata Steel Limited",
  itemType: "Rail Joint",
  zone: "Northern Railway",
  location: "Section A, Track 1",
  // ... other properties
};
```

### **QR Code Generation**
```typescript
// Generate QR code
const qrData = {
  batchId: "24-01-1234",
  type: "Rail Joint",
  location: "Track Section A",
};

const qrCode = await generateQRCode(qrData);
```

### **Export Data**
```typescript
// Export inventory as CSV
handleExport('csv');

// Export as Excel
handleExport('excel');

// Export as JSON with metadata
handleExport('json');

// Print report
handleExport('print');
```

---

## 📊 API Reference

### **Inventory Endpoints**
```http
GET    /api/inventory           # Get all inventory items
POST   /api/inventory           # Create new item
PUT    /api/inventory/:id       # Update item
DELETE /api/inventory/:id       # Delete item
```

### **Analytics Endpoints**
```http
GET    /api/analytics/dashboard # Dashboard metrics
GET    /api/analytics/trends    # Trend data
GET    /api/analytics/zones     # Zone-wise analysis
```

### **QR Code Endpoints**
```http
POST   /api/qr/generate         # Generate QR code
GET    /api/qr/:id              # Get QR code data
```

### **Integration Endpoints**
```http
GET    /api/integration/status  # System health
POST   /api/integration/sync    # Sync data
GET    /api/integration/logs    # System logs
```

---

## 🧪 Testing

### **Run Tests**
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### **Test Structure**
```
tests/
├── __tests__/
│   ├── components/     # Component tests
│   ├── pages/         # Page tests
│   └── utils/         # Utility tests
├── __mocks__/         # Mock data
└── setup.ts           # Test setup
```

---

## 🚀 Deployment

### **Vercel Deployment** (Recommended)
1. **Connect Repository**
   ```bash
   npx vercel
   ```

2. **Configure Environment**
   - Add environment variables in Vercel dashboard
   - Set build command: `pnpm build`
   - Set output directory: `out`

3. **Deploy**
   ```bash
   npx vercel --prod
   ```

### **Static Export**
```bash
# Generate static files
pnpm export

# Deploy to any static hosting
# Files will be in the 'out' directory
```

### **Docker Deployment**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🤝 Contributing

We welcome contributions! Please follow our guidelines:

### **Development Workflow**
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Code Standards**
- Use **TypeScript** for type safety
- Follow **ESLint** rules
- Write **meaningful commit messages**
- Add **tests** for new features
- Update **documentation** as needed

### **Pull Request Process**
1. Ensure your code builds successfully
2. Update README.md with new features
3. Add tests for your changes
4. Request review from maintainers

---

## 📈 Roadmap

### **Q1 2025**
- [ ] 🔐 **Authentication System** - User management and role-based access
- [ ] 📱 **Mobile App** - React Native companion app
- [ ] 🤖 **Advanced AI** - Machine learning models for predictive analytics

### **Q2 2025**
- [ ] 🌐 **Multi-language Support** - Internationalization (i18n)
- [ ] 📊 **Advanced Reporting** - Custom report builder
- [ ] 🔗 **API Gateway** - Standardized API management

### **Q3 2025**
- [ ] 🛰️ **IoT Integration** - Sensor data integration
- [ ] 📡 **Real-time Updates** - WebSocket implementation
- [ ] 🔒 **Enhanced Security** - Advanced security features

---

## 📞 Support

### **Get Help**
- 📖 **Documentation**: Check our comprehensive docs
- 🐛 **Bug Reports**: [Create an issue](../../issues/new?template=bug_report.md)
- 💡 **Feature Requests**: [Request a feature](../../issues/new?template=feature_request.md)
- 💬 **Discussions**: [Join discussions](../../discussions)

### **Contact**
- 🧑‍💻 **Developer**: [YashhhCodesHere](https://github.com/YashhhCodesHere)
- 📧 **Email**: support@railsuraksha.com
- 🌐 **Website**: [railsuraksha.com](https://railsuraksha.com)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 RailSuraksha

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

### **Built With**
- ⚛️ **React Team** - For the amazing React framework
- 🔗 **Vercel** - For Next.js and hosting platform
- 🎨 **Tailwind Labs** - For the utility-first CSS framework
- 🧩 **shadcn** - For the beautiful component library
- 📊 **Recharts Team** - For the visualization library

### **Special Thanks**
- 🚂 **Indian Railways** - For inspiration and domain knowledge
- 👥 **Open Source Community** - For countless contributions
- 🧑‍💻 **Contributors** - For making this project better

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

[![GitHub Stars](https://img.shields.io/github/stars/YashhhCodesHere/rail-suraksha?style=social)](https://github.com/YashhhCodesHere/rail-suraksha/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/YashhhCodesHere/rail-suraksha?style=social)](https://github.com/YashhhCodesHere/rail-suraksha/network/members)
[![GitHub Issues](https://img.shields.io/github/issues/YashhhCodesHere/rail-suraksha)](https://github.com/YashhhCodesHere/rail-suraksha/issues)

**Made with ❤️ for the Railway Industry**

[🚀 Live Demo](https://railsuraksha.vercel.app) • [📚 Documentation](#) • [🤝 Contribute](#-contributing)

</div>