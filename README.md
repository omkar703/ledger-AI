# Ledger AI Frontend

## Overview

Ledger AI is an intelligent financial operations and automated invoice processing interface. This repository hosts the frontend application, built as a responsive single-page application using React 19, Vite, and Tailwind CSS. It features full user onboarding workflows, document pipeline visualizers, and interactive dashboard analytics for invoices, folders, exports, and financial reporting.

## Key Features

- **Document Pipeline Visualizer**: Interactive stages illustrating invoice parsing, OCR extraction, validation, and ledger synchronization.
- **Guided Multi-Step Onboarding**: Workspace setup, company profile configuration, accounting workflow choices, and readiness review.
- **Analytics & Operations Dashboard**: Dedicated modules for invoice management, folder grouping, export controls, and accounting reports.
- **Fast Build & Optimized Delivery**: Bundled with Vite and styled with Tailwind CSS for high performance and low bundle overhead.

## Tech Stack

- **React 19** - Component UI architecture
- **Vite** - Bundler and local development environment
- **Tailwind CSS** - Utility-first styling framework
- **@tailwindcss/forms & @tailwindcss/container-queries** - Form and layout utilities
- **Oxlint** - High-speed code quality and linting

## Prerequisites

- **Node.js**: version 20.x or higher
- **npm**: version 10.x or higher

## Getting Started

```bash
# Clone the repository
git clone https://github.com/omkar703/ledger-AI.git
cd ledger-AI

# Install project dependencies
npm install

# Start the local development server
npm run dev
```

The application runs locally at `http://localhost:5173`.

## Available Scripts

- `npm run dev`: Starts the Vite development server with hot-reload enabled.
- `npm run build`: Generates the production bundle in the `dist` directory.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Runs Oxlint checks across the source tree.

## Deployment on Vercel

The repository root is directly structured for seamless zero-configuration deployment on Vercel:

1. Import the repository `omkar703/ledger-AI` in the Vercel dashboard.
2. Vercel automatically detects **Vite** as the framework preset:
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
3. Click **Deploy**.

For single-page application routing rewrites on Vercel, a `vercel.json` file is included in the project root:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Project Structure

```
ledger-AI/
├── public/                 # Static public assets (icons, favicons)
├── src/                    # Source code
│   ├── assets/             # Brand illustrations and static images
│   ├── components/         # Shared UI components (Navbar, Footer, Hero, VisualPipeline)
│   ├── pages/              # Primary application views
│   │   ├── dashboard/      # Dashboard sub-views (Invoices, Folders, Reports, Exports, Settings)
│   │   ├── onboarding/     # Onboarding step views (Step01 to Step04)
│   │   ├── DashboardPage.jsx
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── OnboardingPage.jsx
│   │   └── SignUpPage.jsx
│   ├── App.css             # Base application layout styles
│   ├── App.jsx             # Main router and view orchestrator
│   ├── index.css           # Tailwind CSS directives
│   └── main.jsx            # Application mount point
├── index.html              # HTML template entry point
├── package.json            # Project dependencies and script declarations
├── postcss.config.js       # PostCSS plugins configuration
├── tailwind.config.js      # Tailwind design system tokens and plugins
├── vercel.json             # Vercel SPA routing configuration
└── vite.config.js          # Vite build and plugin configuration
```

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`.
3. Verify changes and lint status: `npm run lint` and `npm run build`.
4. Commit changes: `git commit -m "Add feature description"`.
5. Push to the branch: `git push origin feature/your-feature-name`.
6. Open a pull request against `main`.

## License

This project is licensed under the MIT License.
