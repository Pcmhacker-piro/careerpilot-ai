# ⚡ CareerPilot AI

> **Navigate Your Career with AI Precision.**

A production-grade, AI-powered Resume Analyzer & Career Platform built by **Prakash Meena** (CSE Student, IIIT Dharwad). CareerPilot AI uses Claude AI to deliver instant ATS scores, skill gap analysis, and actionable resume improvement tips — completely free.

[![GitHub](https://img.shields.io/badge/GitHub-Pcmhacker--piro-181717?style=flat&logo=github)](https://github.com/Pcmhacker-piro/careerpilot-ai)
[![License](https://img.shields.io/badge/License-MIT-6366f1?style=flat)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://react.dev/)
---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Resume Analysis** | Deep analysis across tone, content, structure, and skills |
| 🎯 **ATS Compatibility Score** | How well your resume performs in Applicant Tracking Systems |
| 📊 **Resume Strength Meter** | Overall score with animated gauge visualization |
| 💡 **AI Suggestions** | Prioritized, actionable improvement tips from Claude AI |
| 🧠 **Skill Gap Analysis** | Compares your resume against the target job description |
| 📁 **Resume History** | All past analyses saved to your personal dashboard |
| 🔐 **User Authentication** | Free sign-in via Puter — no password needed |
| 🌗 **Dark/Light Ready** | Clean design with CSS variables for easy theming |
| 🏗️ **Analytics Dashboard** | Stats row showing total analyses, average score, best score |
| 📱 **Fully Responsive** | Works seamlessly on mobile, tablet, and desktop |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React Router v7 (SSR) |
| **Bundler** | Vite 6 |
| **Language** | TypeScript 5 |
| **Styling** | TailwindCSS v4 + Custom CSS Design System |
| **AI Engine** | Claude 3.7 Sonnet (via Puter.js) |
| **Storage** | Puter.js Cloud FS + KV Store |
| **Auth** | Puter.js OAuth |
| **PDF Processing** | pdfjs-dist |
| **Drag & Drop** | react-dropzone |
| **State Management** | Zustand |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Pcmhacker-piro/careerpilot-ai.git
cd careerpilot-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Type Check

```bash
npm run typecheck
```

---

## 📂 Project Structure

```
careerpilot-ai/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx          # Top navigation with auth state
│   │   ├── ResumeCard.tsx      # Dashboard resume card with score ring
│   │   ├── Summary.tsx         # Score summary with gauge + progress bars
│   │   ├── ATS.tsx             # ATS score panel with suggestions
│   │   ├── Details.tsx         # Accordion feedback by category
│   │   ├── FileUploader.tsx    # Drag-and-drop PDF uploader
│   │   ├── ScoreGauge.tsx      # Animated half-circle gauge
│   │   ├── ScoreCircle.tsx     # Circular score ring
│   │   ├── LoadingSkeleton.tsx # Shimmer skeleton cards
│   │   └── StatsRow.tsx        # Dashboard statistics row
│   ├── routes/
│   │   ├── home.tsx            # Landing page (marketing)
│   │   ├── auth.tsx            # Authentication page
│   │   ├── dashboard.tsx       # Authenticated resume dashboard
│   │   ├── analyze.tsx         # Resume upload & analysis
│   │   ├── report.tsx          # Detailed resume report
│   │   └── settings.tsx        # Account settings & data management
│   ├── lib/
│   │   ├── puter.ts            # Puter.js store (auth, fs, ai, kv)
│   │   ├── pdf2img.ts          # PDF to image conversion
│   │   └── utils.ts            # Helper utilities
│   ├── app.css                 # Design system (tokens, animations, components)
│   └── root.tsx                # App shell with meta, fonts
├── constants/
│   └── index.ts                # SITE_CONFIG + AI prompts
├── types/
│   └── index.d.ts              # TypeScript type definitions
└── public/
    └── icons/                  # SVG icons
```

---

## 🎨 Design System

CareerPilot AI uses a custom CSS design system built on TailwindCSS v4:

- **Primary color:** Indigo `#6366f1` → `#4f46e5`
- **Accent color:** Cyan `#06b6d4`
- **Typography:** Inter (body) + Space Grotesk (headings)
- **Animations:** `fadeInUp`, `floatY`, `shimmer`, `pulseGlow`
- **Components:** `.btn-primary`, `.card`, `.glass-card`, `.chip`, `.skeleton`, `.drop-zone`

---

## 🔑 How It Works

CareerPilot AI uses **[Puter.js](https://puter.com)** — a free, serverless cloud platform that provides:

1. **Authentication** — Users sign in with a free Puter account
2. **File Storage** — Resumes and images stored in the user's private Puter cloud
3. **AI** — Claude 3.7 Sonnet accessed free via Puter's AI API
4. **KV Store** — Resume metadata stored in Puter's key-value store

No backend server, no API keys, no cost. Everything runs in the browser.

---

## 📸 Screenshots

> *Coming soon — deploy and capture screenshots*

| Landing Page | Dashboard | Resume Report |
|---|---|---|
| ![Landing](./public/readme/landing.png) | ![Dashboard](./public/readme/dashboard.png) | ![Report](./public/readme/report.png) |

---

## 🚢 Deployment

### Docker

```bash
docker build -t careerpilot-ai .
docker run -p 3000:3000 careerpilot-ai
```

### Vercel / Netlify

The app uses React Router v7 in SSR mode. Deploy with:

```bash
npm run build
# Deploy the ./build directory
```

---

## 🔮 Future Improvements

- [ ] Interview question generator (AI-powered)
- [ ] Mock interview dashboard
- [ ] Resume comparison (v1 vs v2)
- [ ] Dark mode toggle
- [ ] Export report as PDF
- [ ] LinkedIn profile analyzer
- [ ] Cover letter generator
- [ ] Email alerts for job matches

---

## 👨‍💻 Author

**Prakash Meena**
- 🎓 CSE Student · IIIT Dharwad
- 💻 AI · Full Stack Development · DSA · Competitive Programming
- 🐙 [GitHub](https://github.com/Pcmhacker-piro) · 💼 [LinkedIn](https://linkedin.com/in/prakash-meena)

---

## 📄 License

MIT License — feel free to use this project for learning and portfolio purposes.

---

*Built with ❤️ by Prakash Meena · IIIT Dharwad · 2025*
