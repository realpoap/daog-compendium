# 📚 DAOG Compendium

A fullstack monorepo project that serves as a digital compendium for the fantasy
world of _DAOG_ RPG, allowing users to browse, manage, and interact with
categorized lore content.

---

## 🌐 Live Demo

- **Frontend (Vite + React):**  
  👉 https://realpoap.github.io/daog-compendium

- **Backend (Express + tRPC):** 👉*(wait some time for server init)*
  https://daog-compendium.onrender.com

---

## 🎯 Project Summary

Developed as part of a FullStack Open curriculum, this project showcases an
advanced, typed application featuring real-world use of authentication, dynamic
filtering, role-based access control, and a fully decoupled deployment.

---

## 🚀 Tech Stack

### 📦 Monorepo

- **Turborepo**
- **ESLint**
- **TypeScript**

### 🔧 Backend (`apps/api`)

- **Node.js** + **Express**
- **tRPC** for type-safe API
- **MongoDB** via **Prisma ORM**
- **Zod** for schema validation
- **JWT**-based authentication

### 💻 Frontend (`apps/web`)

- **React** (with Vite)
- **TanStack Router** for routing
- **TailwindCSS** + **DaisyUI**
- **tRPC** Client
- **React Hook Form** + Zod for validation

---

## ✨ Features

- 📖 Browse, create, edit and search Spells, Monsters and Items
- 🧙‍♂️ Generate your personal character sheet with species abilities, skills and
  attributes
- ⚔️ Assign Items and Components to your character, share entity with link
- 🎲 Create campaigns and add players from your group
- 🧟‍♂️ Add characters and monsters with auto difficulty level calculation

more:

- 🔍 Dynamic filtering and tag-based search, debounced
- ✏️ Edit entities with the `edit` role, browse as `viewer`
- 🔐 JWT-based login and role-specific views
- 🧩 Zod-powered multi-steps forms with schema-safe inputs
- 🌍 Public CI/CD deployment (frontend + backend decoupled)

---

## ⏱ Time Spent

_Tracked with WakaTime_  
**Total coding time:** `~340 hours - coding time`

👉
[View totals on WakaTime](https://wakatime.com/@05ad44a3-a7f6-44ba-8534-0e534c30ce90)
-> Also See Wakatime export file in the repo.

| Area                     | Hours (Est.) |
| ------------------------ | ------------ |
| 🛠️ Config & Boilerplate  | 10h          |
| 🧠 Backend (API + Auth)  | 85h          |
| 🎨 Frontend UI & Logic   | 110h         |
| 🛒 Data import           | 30h          |
| 🔎 Filtering + Forms     | 60h          |
| 🚀 Hosting & Integration | 20h          |
| 🧪 Testing & Fixing      | 25h          |

## Breakdown estimates

_based on time logged on files_

- Monster Details: 45h
- Character View: 20h
- Items: 30h
- Spells: 30h
- Character Creation Form: 60h
- Campaigns & Dashboard: 25h
- Stats Auto-Calculation: 10h
- Data import from Drive to Db : 40h
- Prisma Schemas: 20h
- Auth + Roles: 15h
- Special Components: 15h
- Layout: 20h

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
