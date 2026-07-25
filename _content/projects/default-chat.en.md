## Introduction

**DefaultChat** is a real-time messaging app. You can create an account, add friends, chat privately, and join public groups — everything updating live, like a real chat.

It is meant to run on your machine. It is not a 24/7 online service: it is a portfolio project to show authentication, friendships, and live messaging working together.

---

## Screenshots

![Login — DefaultChat](/projects/default-chat/01.png)

![Group chat](/projects/default-chat/02.png)

![Public groups](/projects/default-chat/03.png)

---

## Links

- [GitHub repository](https://github.com/KelvinCrepaldi/DefaultChat)

---

## How to install

Current flow: **Docker only starts the API and Postgres**; the **front runs on your machine** with pnpm.

### Requirements

- Docker Desktop (or Docker Engine + Compose)
- Node.js 20+ and pnpm
- Ports 3000 (front) and 3001 (API) free

### 1. API and database (Docker)

In the project folder:

```bash
docker compose up --build
```

That starts Postgres and the API. The front **does not** join Compose.

### 2. Front (local)

In another terminal:

```bash
cd frontend
pnpm install
cp .env.example .env
pnpm run dev
```

In the front `.env`:

| Variable | Example |
| --- | --- |
| NEXT_PUBLIC_API_URL | http://localhost:3001 |
| API_URL | http://localhost:3001 |
| NEXTAUTH_SECRET | another-long-secret |
| NEXTAUTH_URL | http://localhost:3000 |

### Alternative without Docker

With a local Postgres, start the API in the `backend` folder (`npm install`, configure `.env`, run migrations and `npm run dev`). Then run the front with pnpm as above.

In the back-end `.env`, the essentials are:

| Variable | Example |
| --- | --- |
| DB_HOST | localhost |
| DB_USER | defaultchat |
| DB_PASSWORD | defaultchat |
| DB | defaultchat |
| PGPORT | 5432 |
| PORT | 3001 |
| SECRET_KEY | a-long-secret |
| CORS_ORIGIN | http://localhost:3000 |

### Quick test

1. Compose (or local API) up + front at http://localhost:3000 → create an account
2. In another window (or browser), create a second user
3. Search the other profile, send a friend request and accept it
4. Open the 1:1 chat or join a group and talk

---

## Running locally

- [App (front)](http://localhost:3000)
- [API](http://localhost:3001)

---

## Technologies

| Layer | Technologies |
| --- | --- |
| Front | Next.js, React, NextAuth, Socket.io, Tailwind CSS, pnpm |
| Back | Express, Socket.io, TypeORM, JWT |
| Database | PostgreSQL (Docker Compose) |

---

## What the project does

### Account and profile

You sign up, log in, and customize a simple avatar (letter on a colored background) without uploading a photo.

### Friendships

You can search people, send invites, accept, decline, or remove. The UI shows empty states and clear notices (for example, when an invite was already sent).

### Conversations

With an accepted friend, the private chat opens in real time. There are also public groups: create, list, search, and join. In a group you see who is participating and can invite someone to be a friend.

### Who is online

Connected friends show as online while the session is active. That works well for a local demo; it was not designed for multiple server instances at once.
