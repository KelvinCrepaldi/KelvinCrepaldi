# Building an API with Express + TypeORM (professional architecture with authentication and error handling)

This article walks through building an API with Express and TypeORM, structured similarly to production applications. The goal is to show how to organize layers, implement JWT authentication, and standardize errors in a scalable architecture.

---

# 1. Project structure

Before coding, it is important to define the project structure. This separation makes maintenance and evolution easier by isolating responsibilities such as controllers, services, middlewares, and entities.

```text
src/
├── controllers/
│   ├── auth.controller.ts
│   └── profile.controller.ts
│
├── services/
│   ├── create-user.service.ts
│   ├── login.service.ts
│   └── profile.service.ts
│
├── middlewares/
│   ├── auth.middleware.ts
│   └── error.middleware.ts
│
├── errors/
│   └── AppError.ts
│
├── entities/
│   └── User.ts
│
├── routes/
│   └── auth.routes.ts
│
├── data-source.ts
└── server.ts
```

---

# 2. Installing dependencies

In this step we install the libraries needed for the API, including Express, TypeORM, JWT authentication, and helpers.

```bash
npm init -y
npm install express typeorm reflect-metadata pg bcrypt jsonwebtoken express-async-errors
npm install -D typescript ts-node-dev @types/express @types/bcrypt @types/jsonwebtoken
```

---

# 3. User entity

The entity represents the table in the database. Here we define the base user structure that will be persisted, including id, email, and password.

```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
```

---

# 4. Error standardization

To avoid inconsistent API responses, we create a custom error class. It is used to throw controlled errors with a standardized code and message.

```ts
export class AppError {
  public readonly message: string;
  public readonly code: string;
  public readonly statusCode: number;

  constructor(message: string, code: string, statusCode = 400) {
    this.message = message;
    this.code = code;
    this.statusCode = statusCode;
  }
}
```

---

# 5. Global error middleware

This middleware centralizes application error handling. Any error thrown in services or controllers is intercepted here and turned into a standardized response.

```ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
    });
  }

  return res.status(500).json({
    code: "INTERNAL_SERVER_ERROR",
    message: "Unexpected error occurred",
  });
}
```

---

# 6. User creation service

The service holds the user-creation business rule. It also validates against duplicate emails and hashes the password before saving to the database.

```ts
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { AppError } from "../errors/AppError";

export async function createUserService(email: string, password: string) {
  const repo = AppDataSource.getRepository(User);

  const userExists = await repo.findOne({ where: { email } });

  if (userExists) {
    throw new AppError("User already exists", "USER_ALREADY_EXISTS", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = repo.create({
    email,
    password: hashedPassword,
  });

  await repo.save(user);

  return {
    id: user.id,
    email: user.email,
  };
}
```

---

# 7. Login service

This service validates the user credentials and, when they are correct, generates a JWT used for authentication on later requests.

```ts
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

export async function loginService(email: string, password: string) {
  const repo = AppDataSource.getRepository(User);

  const user = await repo.findOne({ where: { email } });

  if (!user) {
    throw new AppError("Invalid credentials", "INVALID_CREDENTIALS", 401);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", "INVALID_CREDENTIALS", 401);
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  return { token };
}
```

---

# 8. Profile service

This service fetches the authenticated user's data. It receives the ID from the JWT and returns only public information.

```ts
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export async function profileService(userId: number) {
  const repo = AppDataSource.getRepository(User);

  return await repo.findOne({
    where: { id: userId },
    select: {
      id: true,
      email: true,
    },
  });
}
```

---

# 9. Authentication middleware

The middleware checks whether a JWT was sent with the request. When valid, it extracts the user ID and attaches it to the request for later use.

```ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

interface TokenPayload {
  id: number;
}

declare global {
  namespace Express {
    interface Request {
      userId: number;
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", "TOKEN_MISSING", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;

    req.userId = decoded.id;

    return next();
  } catch {
    throw new AppError("Invalid token", "INVALID_TOKEN", 401);
  }
}
```

---

# 10. Controllers

Controllers only receive the HTTP request and delegate execution to services. They should not contain business rules.

## Auth controller

```ts
import { Request, Response } from "express";
import { createUserService } from "../services/create-user.service";
import { loginService } from "../services/login.service";

export async function createUserController(req: Request, res: Response) {
  const { email, password } = req.body;

  const result = await createUserService(email, password);

  return res.status(201).json(result);
}

export async function loginController(req: Request, res: Response) {
  const { email, password } = req.body;

  const result = await loginService(email, password);

  return res.json(result);
}
```

---

## Profile controller

```ts
import { Request, Response } from "express";
import { profileService } from "../services/profile.service";

export async function meController(req: Request, res: Response) {
  const user = await profileService(req.userId);

  return res.json(user);
}
```

---

# 11. Auth routes

Routes organize authentication endpoints. Protected routes also apply the auth middleware here.

```ts
import { Router } from "express";
import { createUserController, loginController } from "../controllers/auth.controller";
import { meController } from "../controllers/profile.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRoutes = Router();

authRoutes.post("/register", createUserController);
authRoutes.post("/login", loginController);
authRoutes.get("/me", authMiddleware, meController);

export default authRoutes;
```

---

# 12. Main server

The main file boots Express, registers routes, and applies the global error middleware. Importing `express-async-errors` is also required so async errors are captured automatically.

```ts
import express from "express";
import "express-async-errors";

import authRoutes from "./routes/auth.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

# 13. Application flow

The flow below summarizes how a request moves through the app:

* Register: controller → service → TypeORM → database
* Login: validate credentials → generate JWT
* Me: middleware validates token → service fetches user

---

# 14. Error standardization

Examples of standardized API responses:

```json
{
  "code": "USER_ALREADY_EXISTS",
  "message": "User already exists"
}
```

```json
{
  "code": "INVALID_TOKEN",
  "message": "Invalid token"
}
```

---

# Conclusion

This pattern shows how to organize an Express API with a structure similar to more opinionated frameworks. Separating controllers, services, and middlewares enables scalability, testability, and simpler maintenance, bringing the project closer to a production architecture.
