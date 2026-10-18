# Ledger AI Frontend

## Overview

This repository contains the **frontend** of the Ledger AI application. It is a modern React single‑page application built with Vite, Tailwind CSS, and React 19. The backend is out of scope for this project; the frontend focuses on user onboarding, dashboard visualizations, and interaction with the upcoming API services.

## Tech Stack

- **React 19** – Component‑based UI library.
- **Vite** – Fast development server and bundler.
- **Tailwind CSS** – Utility‑first CSS framework.
- **@vitejs/plugin-react** – Enables fast refresh and JSX support.
- **Oxlint** – Linting tool for JavaScript/TypeScript.

## Prerequisites

- **Node.js** (version 20 or later recommended).
- **npm** (comes with Node) or **yarn**/**pnpm** if you prefer an alternative package manager.

## Getting Started

```bash
# Clone the repository (if you haven't already)
git clone <repository‑url>
cd ledger-AI/frontend

# Install dependencies
npm install
```

## Development

To start the development server with hot‑module reloading:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port). Open this URL in your browser to see the UI.

## Building for Production

Create an optimized production build:

```bash
npm run build
```

The compiled assets are placed in the `dist/` directory. This folder can be served by any static‑file web server (e.g., Vercel, Netlify, Cloudflare Pages).

## Deploying to Vercel

Vercel provides first‑class support for Vite projects. Follow these steps:

1. **Push the code** to a Git repository (GitHub, GitLab, or Bitbucket).
2. **Log in** to the Vercel dashboard and click **"New Project"**.
3. **Import** the repository and select the `frontend` directory as the project root.
4. Vercel automatically detects the Vite build command (`npm run build`) and the output directory (`dist`).
5. Click **"Deploy"**. Vercel will run the install and build steps, then serve the static site.

### Optional Vercel Configuration

If you need to customize the build, add a `vercel.json` file at the repository root:

```json
{
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "frontend/dist"
      }
    }
  ]
}
```

## Linting

Run the linter with:

```bash
npm run lint
```

Fix any issues before committing to keep the codebase clean.

## Project Structure

```
frontend/
├─ public/                 # Static assets (favicon, icons, etc.)
├─ src/                    # Application source code
│   ├─ assets/            # Images and other media
│   ├─ components/        # Reusable UI components
│   ├─ pages/             # Top‑level pages (Landing, Dashboard, etc.)
│   ├─ App.jsx            # Root React component
│   └─ main.jsx           # Entry point for Vite
├─ tailwind.config.cjs    # Tailwind CSS configuration
├─ postcss.config.cjs      # PostCSS configuration
├─ vite.config.js          # Vite configuration
└─ package.json           # Project metadata and scripts
```

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your‑feature`).
3. Make your changes and ensure the linter passes.
4. Open a pull request describing your changes.

## License

[MIT License](LICENSE) – see the `LICENSE` file for details.
