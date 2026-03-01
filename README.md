# 🚀 CodeLabs: Student Assignment & Snippet Sharing Hub

**CodeLabs** is a modern, full-stack web application designed for college students to share, store, and collaborate on code snippets and assignments. Built with Next.js 14, Prisma, and Redis, it offers a high-performance experience with AI-powered enhancements.

---

## 🎓 Project Purpose

In a collaborative college environment, students often need a centralized hub to:

- **Share Assignments**: Quickly post and share boilerplate or completed assignments with peers.
- **Collaborative Learning**: Browse snippets by language, framework, or category (e.g., Data Structures, Web Dev).
- **AI-Assistance**: Use Google Gemini AI to help explain or optimize shared code.
- **Personal Library**: Keep a private or public collection of frequently used code blocks.

---

## ✨ Features

- 🔐 **Secure Authentication**: Integration with GitHub and Google OAuth via NextAuth.
- 📝 **Rich Snippets**: Code highlighting for multiple languages and frameworks.
- 🔍 **Advanced Filtering**: Search by title, language, or category with instant feedback.
- ⚡ **Redis Caching**: High-performance data retrieval using a Redis caching layer.
- 🤖 **AI Integration**: Powered by Google Gemini for intelligent code interactions.
- 🐳 **Dockerized**: Fully containerized environment for seamless local development.
- 📱 **Modern UI**: Built with Tailwind CSS and Framer Motion for a premium, responsive feel.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL (Prisma ORM)
- **Caching**: Redis (Upstash supported for Production)
- **Authentication**: NextAuth.js
- **AI Engine**: Google Gemini AI
- **Styling**: Tailwind CSS & Lucide Icons
- **Deployment**: Optimized for Vercel & Docker

---

## 🚀 Getting Started (Local Development)

### Prerequisites

- Docker & Docker Desktop
- Node.js 18+ (if running without Docker)

### 1. Clone the repository

```bash
git clone https://github.com/Ishan756/snippets.git
cd snippets
```

### 2. Setup Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/snippets?sslmode=disable"
REDIS_URL="redis://localhost:6379"
NEXTAUTH_SECRET="your_secret"
NEXTAUTH_URL="http://localhost:3000"
GITHUB_ID="your_id"
GITHUB_SECRET="your_secret"
GOOGLE_CLIENT_ID="your_id"
GOOGLE_CLIENT_SECRET="your_secret"
GOOGLE_GEMINI_API_KEY="your_api_key"
```

### 3. Run with Docker (Recommended)

This starts the App, Database, and Redis all at once:

```bash
docker-compose up --build
```

### 4. Initialize the Database

While Docker is running, open a new terminal and run:

```bash
npx prisma db push
```

Your app will be live at **[http://localhost:3000](http://localhost:3000)**.

---

## 🌐 Deploying to Production (Vercel)

1. **Database**: Use a managed Postgres instance (e.g., Supabase).
2. **Redis**: Use [Upstash Redis](https://upstash.com/) for cloud caching.
3. **Environment**: Add all variables from your `.env` to the Vercel Dashboard.

---

## 🤝 Contributing

Contributions from fellow students are welcome! Please fork the repo and submit a PR for any new features or UI improvements.

**Happy Coding!** 💻🔥
