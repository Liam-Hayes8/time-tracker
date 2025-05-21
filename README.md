# 🕒 Time-Tracker

A simple time-tracking web app built with **Next.js 15**, **Prisma**, and **PostgreSQL**, deployed on **Google Cloud Run**.

> Live demo → <https://time-tracker-216662824439.us-west1.run.app>

---

## ✨ Features

| Role  | Capabilities |
|-------|--------------|
| **User**  | Google sign-in (Firebase Auth) · Fill out weekly timesheet · Edit previous entries |
| **Admin** | Approve / reject entries · Dashboard summary & export |

---

## 🛠 Tech Stack

* Next.js 15 (App Router) + React 19  
* Prisma 6 ORM & migrations  
* PostgreSQL 14 (Cloud SQL)  
* Firebase Auth (Google provider)  
* Google Cloud Run (container built by Cloud Build)  

---

## 📦 Local Development

```bash
git clone https://github.com/<your-github-user>/time-tracker.git
cd time-tracker

# 1) Copy env stubs and fill in values
cp env.public .env                 # public Firebase keys
cp .env.example .env.local         # DATABASE_URL etc.

# 2) (Optional) start Postgres locally
docker compose up -d db

# 3) Run migrations & generate Prisma client
npx prisma migrate deploy
npx prisma generate

# 4) Start dev server
npm install
npm run dev           # http://localhost:3000
