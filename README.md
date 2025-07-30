# Premier Loom

A modern starter template built with **React 19**, **Next.js 15 (App Router)**, **Tailwind CSS**, and **shadcn/ui**. It ships with an opinionated set-up for rapidly building production-ready SaaS dashboards, marketing sites, or internal tools.

---

## 📋 Table of Contents

1. [Features](#-features)
2. [Prerequisites](#-prerequisites)
3. [Getting Started](#-getting-started)
4. [Available Scripts](#-available-scripts)
5. [Project Structure](#-project-structure)
6. [Git Workflow](#-git-workflow)
7. [Contributing](#-contributing)
8. [License](#-license)

---

## ✨ Features

- **Next.js 15 / React 19** with the App Router and Server Components
- **shadcn/ui + Radix UI** accessible component library
- **Tailwind CSS v3** with dark-mode and design-token customisation
- **TypeScript** across the stack
- **Framer Motion** for smooth animations
- **ESLint & Prettier** for consistent style

---

## 🛠️ Prerequisites

| Tool | Version (recommended) |
|------|-----------------------|
| Node | ≥ 18.18 |
| npm / pnpm / yarn | Latest |

> Tip — use [Volta](https://volta.sh/) or [nvm-windows](https://github.com/coreybutler/nvm-windows) to easily manage Node versions.

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-org>/premier-loom.git
   cd premier-loom
   ```
2. **Install dependencies**
   ```bash
   # pick one package manager
   npm install          # or: pnpm install | yarn install
   ```
3. **Run the dev server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to view the site. HMR reloads the page when files change.

### Environment Variables

If your project requires API keys or secrets, copy `.env.example` to `.env.local` and add the values.

---

## 🏗️ Available Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Create an optimised production build |
| `npm start` | Start Next.js in production mode |
| `npm run lint` | Run ESLint static analysis |

---

## 📂 Project Structure

```
├── app/                 # Route segments (App Router)
├── src/
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Helper utilities / API clients
│   └── styles/          # Global & layer styles
├── public/              # Static assets served at root
├── tailwind.config.ts   # Tailwind theme configuration
└── next.config.ts       # Next.js configuration
```

---

## 🌳 Git Workflow

### Clone Your Fork (first time only)
```bash
git clone https://github.com/<your-username>/premier-loom.git
cd premier-loom
```

### Create a Branch for a Feature/Fix
```bash
git checkout -b feat/awesome-feature   # or fix/important-bug
```

### Commit Your Work
```bash
git add .
git commit -m "feat: awesome feature"
```

### Pull Latest Changes From `main`
```bash
git pull origin main --rebase   # keep your branch up-to-date
```

### Push to GitHub
```bash
git push origin feat/awesome-feature
```

### Open a Pull Request
Go to your fork on GitHub and click **Compare & pull request**.

> Remember to run `npm run lint` before pushing to keep the codebase clean.

---

## 🤝 Contributing

All contributions are welcome! Please open an issue to discuss any large changes before submitting a PR.

1. Fork the repo & create your branch.
2. Make changes & write tests if relevant.
3. Ensure `npm run lint` passes.
4. Open a descriptive PR.

---

## 📄 License

MIT © 2025 Your Company
