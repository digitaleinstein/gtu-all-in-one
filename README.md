# 🎓 GTU All In One

> **A Complete, Responsive, and Modern Full-Stack Web Application Tailored for Gujarat Technological University (GTU) Students.**

---

## 🌟 Overview & Features

**GTU All In One** brings together all essential university tools, documents, grade calculators, and notification systems into a single high-performance dashboard:

### 1. 📚 GTU Previous Question Papers (PYQs) Hub
- **Multi-level Filtering:** Filter across **Courses** (*B.E., Diploma, M.E., MBA, MCA, B.Pharm*), **Departments / Branches** (*Computer, IT, AI&DS, Mech, Civil, EC, Chemical, etc.*), **Semesters** (*Sem 1 to 8*), and **Exam Sessions** (*Summer 2024, Winter 2023, Summer 2023, etc.*).
- **Instant Search:** Search in real-time by GTU Subject Code (e.g. `3150703`, `3130702`) or subject name.
- **Built-in High-Resolution PDF Viewer Modal:** View authentic GTU question paper layout with instructions, 5 question units, marks distribution, print option, and bookmarking.
- **Direct Download & Community Contribution:** Instant PDF downloads with download tracking, plus a student contribution modal to upload missing papers.

---

### 2. 🔔 Targeted Result Notifications & Watcher
- **Live Scraped Results Feed:** Continuously tracking `result.gtu.ac.in` with categorized cards and declared dates.
- **Granular Alert Subscriptions:** Configure custom triggers based on Course, Branch, Semester, Exam Type (*Regular / Remedial*), and specific **Enrollment Number**.
- **Multi-channel Delivery:** In-app notification bell with live counter, Browser Web Push notifications (`Service Worker`), and Email alerts.
- **Interactive Grade Card Simulator:** Enter any GTU enrollment number to render an authentic GTU Grade Statement showing SPI, CPI, CGPA, percentage equivalent, and subject-wise grades.

---

### 3. 📢 Live Circulars & News Feed
- **Live Feed & Cheerio Scraper:** Auto-scraped official GTU notices categorized with distinct color-coded badges:
  - 🔴 **Examinations** (Exam guidelines, re-assessment results)
  - 🟡 **Timetables** (Summer/Winter theory & practical schedules)
  - 🔵 **Academic** (Academic calendars, syllabus changes, PMMS notices)
  - 🟢 **Scholarships** (MYSY, Digital Gujarat scholarships)
  - 🟣 **General** (100 Activity points, tech fests, convocation)
- **Pinned Notices:** Urgent university notifications highlighted on top.
- **Notice Preview Modal:** Embedded circular viewer with direct PDF download and official GTU server reference links.

---

### 4. 🚀 PMMS (Project Monitoring and Mentoring System) Hub
- **Embedded Portal Viewer:** Iframe container for `pmms.gtu.ac.in` with a 1-click fallback external launcher.
- **Phase 1 (Sem 7) & Phase 2 (Sem 8) Milestone Tracker:** Interactive checklist with progress percentage bar and persistent student notes for:
  - Team Formation & Guide Allocation
  - Periodic Progress Reports 1 through 4 (PPR-1 to PPR-4)
  - Design Engineering Canvases: **AEIOU Canvas, Empathy Mapping Canvas, Ideation Canvas, Product Development Canvas (PDC)**
  - Patent Search & Analysis Report (**PSAR**)
  - Anti-Plagiarism Check (Turnitin / Urkund $\le$ 30% rule)
  - Final Bound Report & GTU PMMS Completion Certificate.
- **PSAR Direct Search Hub:** Quick links and guidelines for IPO, Google Patents, and WIPO databases.

---

### 5. 📊 Midsem Marks & Grade Tracker / SPI/CPI Calculator
- **Component Input:** Theory Midsem (out of 30), Internal/Continuous Evaluation (out of 20), and Practical/Viva (out of 50).
- **GTU Formula Implementation:**
  - **Equivalent Percentage:** $\text{Percentage (\%)} = (\text{SPI/CPI} - 0.5) \times 10$
  - **70-Mark External Target Calculator:** Computes the exact score needed in GTU 70-mark external theory exam to achieve target letter grades (**AA, AB, BB, BC, CC, CD, DD**).
  - **Cutoff Warnings:** Alerts student if Midsem score is below 12/30 (remedial risk) or external requirement exceeds 70.
- **Persistent Gradebook:** Save marks and targets to student profile in the database or print printable scorecards.

---

### 6. 👤 Profile & Notification Preferences
- Manage student Enrollment Number, College / Institute, Course, Branch, and Current Semester.
- Web Push Notification permission manager and simulated notification test triggers.
- **1-Click Demo Account Switcher** to test different branches and semesters without typing credentials.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router), React 18, TypeScript |
| **Styling & UI** | Tailwind CSS, Lucide React Icons, next-themes (Dark / Light mode) |
| **Backend** | Next.js Server Actions & API Routes |
| **Database & ORM** | Prisma ORM with SQLite (Local Zero-Config) / PostgreSQL compatible |
| **Authentication** | NextAuth.js (Credentials Provider with enrollment/email login) |
| **Scraper / Worker** | Cheerio HTML Parser, Fetch API with timeout & fallback feeds |
| **Notifications** | Web Push API & Service Worker (`/public/sw.js`), In-App Notification Bell |

---

## 📁 Modular Directory Structure

```text
gtu-all-in-one/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/   # NextAuth authentication endpoints
│   │   ├── auth/register/        # Student signup endpoint
│   │   ├── papers/               # PYQ query, download counter, bookmarking
│   │   ├── circulars/            # Circulars query & live sync
│   │   ├── results/              # Declared results, subscriptions & grade checker
│   │   ├── midsem/               # Internal marks & grade calculation persistence
│   │   ├── pmms/                 # Project milestone checklist & note updates
│   │   ├── notifications/        # In-app notifications & test dispatch
│   │   ├── user/profile/         # Profile management
│   │   └── cron/sync/            # Background scheduled sync endpoint
│   ├── auth/                     # Sign In & Sign Up pages
│   ├── circulars/                # Live Circulars Feed page
│   ├── midsem/                   # Midsem Marks & SPI/CPI Calculator page
│   ├── papers/                   # Previous Question Papers Hub page
│   ├── pmms/                     # PMMS Portal & Guides page
│   ├── profile/                  # Student Profile & Notification settings page
│   ├── results/                  # Result Watcher & Grade Card page
│   ├── globals.css               # Theme variables & custom grade badges
│   ├── layout.tsx                # Root layout with Navbar, Footer & Providers
│   └── page.tsx                  # Dashboard Overview page
├── components/
│   ├── circulars/                # Circular feed cards & preview modal
│   ├── dashboard/                # Main dashboard overview & quick stats
│   ├── layout/                   # Navbar, Footer, ThemeToggle, NotificationDropdown
│   ├── midsem/                   # Marks input table & SPI calculator
│   ├── papers/                   # Paper grid, PDF viewer modal & contribute modal
│   ├── pmms/                     # PMMS checklist, iframe viewer & canvas guide
│   ├── profile/                  # Profile editor & demo account switcher
│   ├── results/                  # Results list, subscription modal & grade modal
│   └── providers.tsx             # NextAuth SessionProvider & ThemeProvider
├── lib/
│   ├── auth.ts                   # NextAuth options & credentials validation
│   ├── gtu-data.ts               # Master GTU courses, branches, subjects & PMMS milestones
│   ├── prisma.ts                 # Prisma Client single instance
│   ├── scraper.ts                # Cheerio scraper for GTU circulars & results
│   └── utils.ts                  # SPI/CPI formulas, percentage calculation, formatting
├── prisma/
│   ├── schema.prisma             # Comprehensive database schema
│   └── seed.js                   # Realistic database seeder
├── public/
│   └── sw.js                     # Web Push Notification Service Worker
├── workers/
│   └── scraper.js                # Standalone background cron worker
└── package.json
```

---

## 🚀 Getting Started & Local Setup

### 1. Prerequisites
- **Node.js**: v18.0 or higher (v20+ recommended)
- **npm** or **yarn** / **pnpm**

### 2. Clone or Navigate to Project Directory
```bash
cd /home/groovy/gtu-all-in-one
```

### 3. Environment Variables
Create or verify `.env` file:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="gtu-all-in-one-super-secret-key-2025"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Initialize Database & Run Migrations
```bash
npx prisma generate
npx prisma db push
```

### 6. Seed Realistic GTU Data
Seed sample GTU student accounts, 28+ question papers, official circulars, declared results, PMMS checklists, and midsem marks:
```bash
npm run prisma:seed
```

### 7. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Pre-Configured Demo Student Accounts

All accounts use the password: `gtu12345`

| Student Name | Email / Identifier | Enrollment No | Course & Branch | Semester |
|---|---|---|---|---|
| **Aarav Mehta** | `student@gtu.ac.in` | `210120111001` | B.E. Computer Engineering | Sem 5 |
| **Priya Patel** | `priya.patel@gtu.ac.in` | `220280116015` | B.E. Information Technology | Sem 3 |
| **Rahul Shah** | `rahul.shah@gtu.ac.in` | `200170119042` | B.E. Mechanical Engineering | Sem 7 |

*(You can also click the 1-click Quick Switcher buttons on the Sign In or Profile pages).*

---

## ⚙️ Background Jobs & Scraper Workers

### Standalone Scraper Execution
To run the Cheerio worker manually from terminal:
```bash
npm run worker:scrape
```

### Scheduled Serverless Cron Sync
Trigger sync via HTTP GET:
```bash
curl http://localhost:3000/api/cron/sync
```

---

## 📄 License
Crafted for Gujarat Technological University students, innovators, and scholars.
