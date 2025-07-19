# 📚 DAOG Compendium

A fullstack monorepo project that serves as a digital compendium for the fantasy
world of _DAOG_ RPG, allowing users to browse, manage, and interact with
categorized lore content.

---

## 🌐 Live Demo

- **Frontend (Vite + React):**  
  👉 https://realpoap.github.io/daog-compendium

- **Backend (Express + tRPC):**  
  👉 https://daog-compendium.onrender.com

---

## 🎯 Project Summary

Developed as part of a FullStack Open curriculum, this project showcases an
advanced, typed application featuring real-world use of authentication, dynamic
filtering, role-based access control, and a fully decoupled deployment.

---

## 🚀 Tech Stack

### 📦 Monorepo

- Turborepo
- Shared config packages: ESLint, Tailwind, TypeScript

### 🔧 Backend (`apps/api`)

- Node.js + Express
- [tRPC](https://trpc.io/) for type-safe API
- [MongoDB](https://www.mongodb.com/) via Prisma
- Zod for schema validation
- JWT-based authentication
- Role-based permissions (`viewer`, `edit`, `admin`)
- Deployed to Render

### 💻 Frontend (`apps/web`)

- React (with Vite)
- TanStack Router for routing
- TailwindCSS + DaisyUI
- tRPC Client
- React Hook Form + Zod for validation
- Deployed to GitHub Pages

---

## ✨ Features

- 📖 Read-only browsing of categorized entries (abilities, spells, bestiary,
  items)
- 🔍 Dynamic filtering and tag-based search
- ✏️ Edit access granted to users with the `edit` role
- 🔐 JWT-based login and role-specific views
- 🧩 Zod-powered multi-steps forms with schema-safe inputs
- 🌍 Public CI/CD deployment (frontend + backend decoupled)

---

## ⏱ Time Spent

Tracked with WakaTime  
**Total coding time:** `~340 hours`

| Area                     | Hours (Est.) |
| ------------------------ | ------------ |
| 🛠️ Config & Boilerplate  | 40h          |
| 🧠 Backend (API + Auth)  | 90h          |
| 🎨 Frontend UI & Logic   | 110h         |
| 🔎 Filtering + Forms     | 40h          |
| 🚀 Hosting & Integration | 30h          |
| 🧪 Testing & Fixing      | 30h          |

---

## 🛡️ Permissions & Roles

- `viewer`: can browse all public content
- `edit`: can add or modify entries via form UI
- `admin`: can view deletion controls (actual deletion not implemented yet)

---

## ✅ Submission Checklist

- [x] Fullstack project in monorepo
- [x] MongoDB database via Prisma
- [x] Role-based access logic
- [x] Fully typed with tRPC and Zod
- [x] Tracked time (340h) via WakaTime

---

## 🙈 Author

GitHub: [`@realpoap`](https://github.com/realpoap)
