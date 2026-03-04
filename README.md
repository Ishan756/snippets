# 🚀 CodeSnippets: Student Assignment & Snippet Sharing Hub

**CodeSnippets** is a high-performance, full-stack web application designed for developers and students to share, store, and collaborate on code logic. Built with Next.js 14, Prisma, and Redis, it features a premium "blank canvas" UI and AI-powered enhancements.

---

## ✨ New Features & Updates

- 🎨 **Premium UI**: Redesigned home page with a clean, centered aesthetic, featuring animated ambient background glows and a minimal grid pattern.
- 🧪 **Cypress E2E Testing**: Comprehensive test suite covering user authentication (Sign Up/Sign In) and all core API endpoints.
- 🔄 **CI/CD Pipeline**: Integrated GitHub Actions workflow that automatically lints, type-checks, and runs E2E tests on every push.
- 🤖 **AI Generation**: Powered by Google Gemini AI to generate optimized code blocks instantly.
- 🔐 **Secure Auth**: NextAuth integration with custom session handling for robust testing and user security.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL (Prisma ORM)
- **Caching**: Redis
- **Testing**: Cypress (End-to-End)
- **CI/CD**: GitHub Actions
- **AI Engine**: Google Gemini API
- **Styling**: Tailwind CSS & Framer Motion

---

## 🧪 Testing

We use Cypress for end-to-end testing to ensure a stable user experience.

### Running Tests Locally

Ensure your development server is running (`npm run dev`), then:

```bash
# Open interactive Cypress runner
npm run cypress:open

# Run tests in headless mode
npm run cypress:run
```

### CI/CD Pipeline

The included GitHub Action (`.github/workflows/pipeline.yml`) automatically:

1. Spinst up ephemeral Postgres & Redis containers.
2. Performs linting and TypeScript type checks.
3. Builds the production bundle.
4. Executes the full Cypress test suite.

---

## 🚀 Getting Started

### 1. Setup Environment

Create a `.env` file based on the project requirements:

```env
DATABASE_URL="postgresql://..."
REDIS_URL="redis://..."
NEXTAUTH_SECRET="your_secret"
GOOGLE_GEMINI_API_KEY="your_key"
```

### 2. Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

### 3. Docker (Alternative)

```bash
docker-compose up --build
```

---

## 🤝 Contributing

Contributions are welcome! Please ensure all tests pass (`npm run cypress:run`) before submitting a Pull Request.

**Happy Coding!** 💻🔥
