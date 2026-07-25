## Introduction

**Pirate's Punch** is a full online store with a pirate-inspired look. The goal was to build e-commerce end to end: visitors browse the catalog, create an account, fill the cart, and place an order — all running for real on your machine.

I started with the back-end (business rules and database) and only then built the store on top of the API. The pirate theme came last: it was a visual identity choice, not the project's starting point. Today the focus is simple — someone clones the repo, brings the environment up, and can walk the full flow from home page to purchase.

---

## Screenshots

![Captain's Highlights — home promotions](/projects/pirates-punch/01.png)

![Store — catalog](/projects/pirates-punch/02.png)

![Product detail](/projects/pirates-punch/03.png)

---

## Links

- [GitHub repository](https://github.com/KelvinCrepaldi/pirates-punch-ecommerce)

---

## How to install

You will need Node.js 20+, Docker, and npm. The order is: database → API → sample data → store.

### 1. Database

In the project folder:

```bash
docker compose up -d
```

That starts a local PostgreSQL. Default username and password are in the API example env file.

### 2. API

```bash
cd api
cp .env.example .env
npm install
npm run migration:run
npm run dev
```

Adjust the `.env` file if needed (port, database connection, and auth key).

### 3. Demo data

With the API running, seed the catalog:

```bash
curl -X POST http://localhost:3001/product/seedDatabase
```

Or, in the `api` folder:

```bash
npm run seed
```

That creates dozens of products and categories so the store is not empty.

### 4. Store (front-end)

```bash
cd web
cp .env.example .env.local
npm install
npm run dev
```

In `.env.local`, point the store at the API:

| Variable | Value |
| --- | --- |
| NEXT_PUBLIC_API_URL | http://localhost:3001 |

---

## Running locally

- [Store](http://localhost:3000)
- [API](http://localhost:3001)
- [Docs (Swagger)](http://localhost:3001/docs)

---

## Technologies

| Layer | Technologies |
| --- | --- |
| Store | Next.js, React, TypeScript, Tailwind CSS |
| API | Express, TypeORM, Zod, JWT |
| Database | PostgreSQL (Docker) |

---

## What the project does

### Browse and buy

The home page shows promotions. In the store you search products, filter by category, and open the detail page. Cart and wishlist stay in the browser while you browse.

### Account and session

Sign-up and login go through the API. After authentication, the session lives in a secure Next.js cookie — the token is not exposed in page JavaScript. Routes such as profile and cart require login.

### Checkout and profile

At checkout, the order is created for real in the API. In the profile you can manage addresses, cards, view purchase history, and delete the account.

### Honest limitations

Newsletter and contact forms are UI-only, with no back-end. Cart and wishlist are not stored on the server. There is an admin field on the user, but product-creation routes are not yet permission-protected — this is a portfolio project, not a production system.
