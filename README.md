# 🕒 Time-Tracker

A simple time-tracking web app built with **Next.js 15 (App Router)**, **Prisma**, **PostgreSQL**   
and deployed on **Google Cloud Run**.  
Users log the hours they worked each day; admins can approve entries and
export reports.

Live site → <https://time-tracker-216662824439.us-west1.run.app>

---

## ✨ Features

| Role | What you can do |
|------|-----------------|
| **User** | Sign in with Google (Firebase Auth) • Fill out weekly timesheet • Edit previous entries |
| **Admin** | Approve / reject entries • Dashboard summary |

---

## 🛠 Tech Stack

* **Next.js 15** (`app/` directory) + **React 19**
* **Prisma 6** ORM & migrations
* **PostgreSQL 14** on Cloud SQL
* **Firebase Auth** (Google provider)
* **Google Cloud Run** (Docker container built by Cloud Build)

---

## 📦 Local development

```bash
git clone https://github.com/<you>/time-tracker.git
cd time-tracker
cp env.public .env       # fill in your public Firebase keys
cp .env.example .env.local  # add DATABASE_URL etc.

# spin up a Postgres container (optional)
docker compose up -d db

# run migrations
npx prisma migrate deploy

# dev server
npm install
npm run dev

```bash

# 1. Build container & push (Cloud Build does this automatically):
gcloud run deploy time-tracker \
  --source . \
  --region us-west1 \
  --allow-unauthenticated \
  --add-cloudsql-instances $PROJECT:$REGION:$INSTANCE \
  --env-vars-file env.yaml \
  --memory 512Mi

# create new migration
npx prisma migrate dev --name <change>

# generate client
npx prisma generate
