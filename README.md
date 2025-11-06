# Research Buddy — Frontend (MVP)

**Research Buddy Frontend** is a modular **React + MUI** application designed to interact with the Research Buddy FastAPI backend.  
It enables researchers to upload papers, classify abstracts, extract keywords, generate summaries, and visualize AI model results — all through an elegant, responsive interface.

---

## 🚀 Overview

This MVP frontend focuses on seamless research-workflow integration:

- 📄 **PDF Upload & Text Extraction** — Send papers directly to the backend for classification or summarization.  
- 🤖 **Model Selection UI** — Choose from classical ML, neural, or transformer models and compare results.  
- 🗝️ **Keyword Extraction Interface** — View keywords from both KeyBERT and Gemini side-by-side.  
- 🧾 **Summarization Section** — Generate summaries via extractive (BART) or generative (Gemini) engines.  
- 🧩 **Dashboard View** — Manage uploaded papers, favorites, and downloads securely.  
- 🔐 **User Authentication** — Supports login, signup, and session handling using secure HTTP-only cookies.  

---

## 🏗️ Project Structure
```
research_buddy_frontend/
│
├── src/
│   ├── api/                # Axios instance and backend service utilities
│   ├── components/         # Reusable UI modules (Navbar, PredictionResult, etc.)
│   ├── pages/              # Main pages (Home, Upload, Dashboard, Login, Signup)
│   ├── context/            # Auth and global state providers
│   ├── utils/              # Helper functions, data formatting, etc.
│   ├── theme/              # Custom MUI theme (typography, palette, etc.)
│   ├── assets/             # Icons, logos, images
│   └── App.jsx             # Root React component
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── package.json
├── .env.example
└── README.md
```

---

## ⚙️ Installation

```bash
git clone https://github.com/Tj-jm/research-buddy-frontend.git
cd research-buddy-frontend
npm install
```

Create an `.env` file:
```bash
REACT_APP_API_BASE=http://localhost:8000/api
REACT_APP_BACKEND_ORIGIN=http://localhost:8000
```

Run the development server:
```bash
npm start
```
Default URL: [http://localhost:3000](http://localhost:3000)

---

## 🔗 Core Integrations

| Feature | Backend Route | Description |
|----------|---------------|-------------|
| Abstract Classification | `/api/predict`, `/api/predict-pdf` | Send abstracts or PDFs for classification |
| Keyword Extraction | `/api/extract_keywords_*` | Fetch keywords using KeyBERT or Gemini |
| Summarization | `/api/summarize` | Generate text summaries |
| Auth | `/api/auth/*` | Handles signup, login, logout, and session persistence |
| Dashboard | `/api/dashboard/*` | Upload, view, edit, and favorite papers |
| Faculty Scraper | `/api/faculty/*` | Trigger or view scraping results |

---

## 🧠 Key Components

- **`PredictionResult.jsx`** – Displays prediction outcomes with confidence charts.  
- **`KeywordCompare.jsx`** – Side-by-side view for KeyBERT vs Gemini keywords.  
- **`SummaryPanel.jsx`** – Text summarization and copy/export interface.  
- **`PDFUpload.jsx`** – Upload handler with validation and progress bar.  
- **`Dashboard.jsx`** – User’s library of uploaded research papers.  
- **`LoginForm.jsx` / `SignupForm.jsx`** – Secure authentication with JWT cookies.

---

## 🧩 UI/UX Design

- Built with **Material-UI v5** and a custom theme matching Research Buddy’s backend aesthetic.  
- Fully responsive (desktop, tablet, and mobile).  
- Dark-mode ready via MUI theme toggler.  
- Integrated with `chartjs-plugin-datalabels` for annotated confidence bar charts.

---

## 🔒 Security and Auth

- All routes use `AuthContext` for token validation.  
- Backend authentication is handled by secure HttpOnly cookies.  
- CORS policy is enforced via backend `FRONTEND_ORIGIN` variable.

---

## 🧰 Tech Stack

| Layer | Technologies |
|-------|---------------|
| Frontend Framework | React 18, React Router DOM v6 |
| UI Library | Material-UI v5 |
| State Management | Context API + Reducer |
| Data Fetch | Axios |
| Charting | Chart.js + chartjs-plugin-datalabels |
| Deployment | Netlify / Vercel / AWS Amplify |

---

## 🧭 API Backend

Connects to:  
🔗 [Research Buddy Backend (MVP)](https://github.com/Tj-jm/research-buddy-backend)  
API Docs: `http://localhost:8000/docs`

---

## 🧾 License

This project is **proprietary** and intended for portfolio and educational demonstration only.  
Commercial use or redistribution without permission is prohibited.

---

## 🧩 Reference White Paper

Read the full white paper for conceptual background:  
🔗 [https://turjo-ml-dl.turjo-jaman.com/research_buddy.html](https://turjo-ml-dl.turjo-jaman.com/research_buddy.html)

---

## 👨‍💻 Author

**Nur A. Jaman (Turjo)**  
AI & EdTech Innovator  |  Full-Stack Engineer  
🌐 [https://turjo-jaman.com](https://turjo-jaman.com)
