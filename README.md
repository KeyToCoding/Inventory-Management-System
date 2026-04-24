# 📦 QR Inventory Mate

Streamline your inventory management with our QR code-based system

[Demo](https://qr-inventory-mate.vercel.app) · [Report Bug](https://github.com/KeyToCoding/Inventory-Management-System/issues) · [Request Feature](https://github.com/KeyToCoding/Inventory-Management-System/issues)

### 🏠 Landing Page

![Landing Page](https://private-user-images.githubusercontent.com/145832147/424487992-7a6e6d64-72fa-4094-a45f-ba94dfb7638a.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjM1Mjg3MzIsIm5iZiI6MTc2MzUyODQzMiwicGF0aCI6Ii8xNDU4MzIxNDcvNDI0NDg3OTkyLTdhNmU2ZGE2LTcyZmEtNDA5NC1hNDVmLWJhOTRkZmI3NjM4YS5wbmcifQ.EXAMPLE)

The application offers two main entry points:

• 🔍 Scan Product: Quickly scan QR codes to manage product inventory and process sales
• 🔐 Admin Portal: Access the admin dashboard to manage inventory and view reports

## ✨ Features

• 🏃‍♂️ Lightning Fast - Built with Vite for optimal performance
• 📱 Responsive Design - Works seamlessly on desktop and mobile
• 🎨 Beautiful UI - Crafted with shadcn-ui and Tailwind CSS
• 🔒 Type Safe - Written in TypeScript for better reliability
• 🔄 Real-time Updates - Instant QR code generation and scanning
• 📊 Inventory Analytics - Track and manage your inventory efficiently

## 🚀 Quick Start

### Prerequisites

• Node.js (v14 or higher)
• npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/KeyToCoding/Inventory-Management-System.git
```

2. Navigate to project directory

```bash
cd qr-inventory-mate
```

3. Install dependencies

```bash
npm install
# or
yarn install
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:8080` to view your application 🎉

## 🛠️ Tech Stack

[React](https://reactjs.org/) [TypeScript](https://www.typescriptlang.org/) [Vite](https://vitejs.dev/) [Tailwind CSS](https://tailwindcss.com/)

• Framework: [React](https://reactjs.org/) - A JavaScript library for building user interfaces
• Language: [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
• Styling: [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
• UI Components: [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI
• Build Tool: [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
• QR Code: [qrcode](https://www.npmjs.com/package/qrcode) - QR Code generation

## 📱 Application Preview

### Admin Dashboard

![Admin Dashboard](https://private-user-images.githubusercontent.com/145832147/424488441-57ba23e4-12c4-48e1-b16b-6d8dd321375f.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjM1Mjg3MzIsIm5iZiI6MTc2MzUyODQzMiwicGF0aCI6Ii8xNDU4MzIxNDcvNDI0NDg4NDQxLTU3Y2EyM2U0LTEyYzQtNDhlMS1iMTZiLTZkOGRkMzIxMzc1Zi5wbmcifQ.EXAMPLE)

The admin dashboard provides a comprehensive overview of your inventory:

• 📦 Total Products Counter
• 💰 Sales Analytics
• 📊 Products Added Today
• 🏪 Active Shops Tracking
• 🔄 Real-time QR Code Generation
• 📝 Detailed Product Management

Features highlighted in the dashboard:

• Inventory Management: Track all your products in one place
• Sales Report: Monitor your business performance
• QR Code Integration: Automatically generate and manage QR codes
• Multi-store Support: Manage multiple shops from a single dashboard

## 🚀 Deployment

The frontend is ready for Netlify as a static Vite build. Use these settings in Netlify:

- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect: `/*` → `/index.html` with status `200`

The production API URL is already set in `.env.production` and points to the Render backend used by this project.

You can also deploy directly from GitHub using Netlify's import flow:

| Platform | Best For | Action |
|----------|----------|--------|
| Netlify | Static React/Vite frontend | [Deploy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/KeyToCoding/Inventory-Management-System) |
| Vercel | Alternative static frontend hosting | [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/KeyToCoding/Inventory-Management-System) |
| GitHub Pages | Free static hosting | [Deploy to GitHub Pages](https://pages.github.com/) |

## 🌐 Custom Domain Setup

Set up your custom domain with any of these platforms:

• 🔗 [Vercel Custom Domains](https://vercel.com/docs/concepts/projects/domains)
• 🔗 [Netlify Custom Domains](https://docs.netlify.com/domains-https/custom-domains/)
• 🔗 [GitHub Pages Custom Domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

### Kartikey

[GitHub](https://github.com/KeyToCoding) [LinkedIn](https://www.linkedin.com/in/kartikey28/)

Made with ❤️ by Kartikey

If you found this project helpful, please consider giving it a ⭐
