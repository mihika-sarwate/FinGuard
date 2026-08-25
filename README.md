# 🛡️ FinGuard — AI-Powered Secure Financial Platform

**FinGuard** is a next-generation, secure online banking and financial management platform featuring an integrated **AI Financial Assistant** powered by Google Gemini, equipped with proactive **Prompt Injection Defense** mechanisms and an enterprise-grade **Admin Security Operations Center**.

---

## 🚀 Key Features

### 👤 User Portal
- **Dashboard Overview (`/dashboard`)**: Comprehensive summary of total balances, recent transactions, spending metrics, and quick action shortcuts.
- **Account & Card Management (`/dashboard/accounts`)**: Monitor linked savings, checking, and credit accounts, along with virtual card controls.
- **Payments & Transfers (`/dashboard/payments`)**: Transfer funds securely, schedule bill payments, and manage payee lists.
- **Transaction Logs (`/dashboard/transactions`)**: Detailed history with category breakdowns, search filtering, and export capabilities.
- **Security Hub (`/dashboard/security`)**: Account security score, active session management, 2FA settings, and threat notifications.
- **FinGuard AI Assistant (`/dashboard/assistant`)**: 
  - Conversational financial copilot powered by Google Gemini (`gemini-3.5-flash`).
  - Function calling integration for bank actions: `getAccountBalance`, `getRecentTransactions`, `readLatestEmail`, and `transferFunds`.
  - **Live Execution Trace**: Real-time step-by-step transparency into AI decision-making and tool invocations.
- **Indirect Prompt Injection Demo (`/dashboard/attack-demo`)**: Interactive laboratory demonstrating AI security defenses against malicious email payloads trying to force unauthorized financial transactions.

---

### 🔑 Admin & Security Operations Portal (`/admin`)
- **System Dashboard (`/admin/dashboard`)**: High-level telemetry, security incident feed, active user counts, and system metrics.
- **User Management (`/admin/users`)**: Full administrative user roster management with instant role promotion/demotion (User ↔ Admin).
- **Global Financial Operations (`/admin/accounts`, `/admin/transactions`, `/admin/bills`)**: Bank-wide monitoring of user accounts, transaction flows, and billing engines.
- **Security Operations & Attack Lab (`/admin/security`, `/admin/attack-lab`)**: Real-time security event log analysis, attack vector simulation, and injection payload testing.
- **Content Inspector & Session Replay (`/admin/content`, `/admin/sessions`)**: Audit user content and replay sessions for fraud detection.
- **Telemetry & Infrastructure (`/admin/analytics`, `/admin/monitoring`)**: Server health, API latency, and platform error diagnostics.

---

## 🏗️ Architecture & Tech Stack

| Component | Technology | Description |
|---|---|---|
| **Frontend Framework** | **React 19 + TypeScript** | Modern single-page web application with strong typing |
| **Build Tool & HMR** | **Vite** | Fast ES-module development build engine |
| **Routing** | **React Router v7** | Role-protected client-side routing & layouts |
| **Styling & UI** | **Tailwind CSS + Lucide React** | Modern aesthetic with SVG icons & responsive design |
| **Data Visualization** | **Recharts** | Financial trends, security analytics, and transaction charts |
| **Backend & Auth** | **Supabase** | Managed PostgreSQL database, Email/Password Auth, and Row-Level Security (RLS) |
| **AI Engine** | **Google Gemini (`@google/genai`)** | `gemini-3.5-flash` model with tool/function calling & prompt defense layer |
| **Deployment** | **Vercel** | SPA routing rewrite configured via `vercel.json` |

---

## 📁 Repository Structure

```text
FinGuard/
├── admin_rls.sql           # PostgreSQL function & RLS policies for recursive-safe Admin checks
├── setup.sql               # Database setup script (profiles table, triggers for new users)
├── package.json            # Root build and deployment configuration
├── vercel.json             # Vercel SPA routing rewrite rules
├── frontend/
│   ├── index.html          # HTML entry point
│   ├── package.json        # Frontend dependencies & scripts
│   ├── vite.config.ts      # Vite build configuration
│   ├── src/
│   │   ├── App.tsx         # Application routes & provider setup
│   │   ├── components/     # Reusable UI components & ProtectedRoute wrappers
│   │   ├── contexts/       # AuthContext for session & role management
│   │   ├── layouts/        # AuthLayout, DashboardLayout, AdminLayout
│   │   ├── lib/            # Supabase client (`supabase.ts`) & Gemini AI core (`gemini.ts`)
│   │   └── pages/
│   │       ├── admin/      # 11+ Admin & Security Operations pages
│   │       ├── auth/       # Login, SignUp, Password Reset, Email Verification
│   │       └── dashboard/  # User portal screens, AI Assistant, and Security Demo
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or later
- **npm**: v9.0.0 or later
- **Supabase Account**: Project configured with Auth & Database
- **Google Gemini API Key**: For AI Assistant features

---

### Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/mihika-sarwate/FinGuard.git
   cd FinGuard
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file inside the `frontend/` directory based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Add your service credentials to `frontend/.env`:
   ```env
   VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   VITE_GEMINI_API_KEY=your-google-gemini-api-key
   ```

4. **Database Migration & Setup**
   Run the following scripts in your Supabase SQL Editor:
   - Run `setup.sql` to create the `profiles` table, setup RLS, and attach auto-profile generation triggers to `auth.users`.
   - Run `admin_rls.sql` to enable recursion-safe security functions (`is_admin()`) and admin profile access policies.

5. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

---

## 🔒 Security Architecture

- **Row Level Security (RLS)**: Strictly isolates user data on PostgreSQL level so users can only read/update their own profile and financial records.
- **Non-Recursive Admin Evaluation**: Utilizes `SECURITY DEFINER` functions in PostgreSQL (`admin_rls.sql`) to evaluate admin privileges without triggering infinite RLS loops.
- **Prompt Injection Safeguards**: The AI agent (`FinGuardAgent` in `lib/gemini.ts`) employs pre-execution heuristic & model verification checks to intercept unverified function calls attempted by malicious third-party content (e.g., untrusted emails).

---

## 📜 Available Scripts

From the `frontend/` directory:
- `npm run dev`: Launch Vite local development server.
- `npm run build`: Compile TypeScript and build production-ready static assets.
- `npm run preview`: Locally preview the production build output.
- `npm run lint`: Run Oxlint linter for code quality checks.

From the project root directory:
- `npm run build`: Executes full frontend installation and build sequence for automated deployment pipelines.

---

## 🚢 Deployment

The project is pre-configured for one-click deployment on **Vercel**:
- **Build Command**: `npm run build`
- **Output Directory**: `frontend/dist`
- **Rewrites**: Configured via `vercel.json` for single-page application routing.
