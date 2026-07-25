## Introduction

**Leitor de Boleto** (Boleto Reader) is an API that understands the typed line of Brazilian boletos. You send the code and, if it is valid, you get back the barcode, amount, and — when it applies — the due date.

The project started as a technical challenge. The hard part was not standing up the server itself, but translating the official boleto rules (bank slip and collection agreement) into clear code with tests. It was later refactored to be more readable and easier to follow.

---

## Links

- [GitHub repository](https://github.com/KelvinCrepaldi/leitor_de_boleto)

---

## How to install

You will need Node.js 18+ and pnpm.

```bash
pnpm install
cp .env.example .env
pnpm dev
```

By default the API starts on port **8080**. To run the tests:

```bash
pnpm test
```

### How to use

The main route is:

```
GET /boleto/:code
```

Example with a bank-slip boleto (47 digits):

```bash
curl http://localhost:8080/boleto/21290001192110001210904475617405975870000002000
```

If the code is valid, the response includes the barcode, amount, and due date. If something is wrong (length, check digit, etc.), the API returns a clear error message.

---

## Running locally

- [API](http://localhost:8080)

Example request: [http://localhost:8080/boleto/21290001192110001210904475617405975870000002000](http://localhost:8080/boleto/21290001192110001210904475617405975870000002000)

---

## Technologies

| Layer | Technologies |
| --- | --- |
| API | Express, TypeScript |
| Tests | Jest, Supertest |
| Tooling | pnpm, ts-node-dev |

---

## What the project does

### Two boleto types

- **Título** — common bank boleto (47 digits), with amount and due date
- **Convênio** — utility and collection bills (48 digits), with amount

The API detects the type from length and structure, validates check digits, and builds the response.

### Why it matters in a portfolio

It shows care with real business rules (Brazilian boleto standards), input validation, automated tests, and a small but well-defined API: one route, a clear contract, predictable errors.

There is no graphical UI — the focus is the service itself. Any client (Postman, curl, or another app) can consume the endpoint.
