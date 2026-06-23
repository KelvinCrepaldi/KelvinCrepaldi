# Criando uma API com Express + TypeORM (arquitetura profissional com autenticação e tratamento de erros)

Este artigo apresenta a construção de uma API utilizando Express com TypeORM, estruturada de forma semelhante a aplicações de produção. O objetivo é demonstrar como organizar camadas, implementar autenticação JWT e padronizar erros em uma arquitetura escalável.

---

# 1. Estrutura do projeto

Antes de começar a codificação, é importante definir a estrutura do projeto. Essa separação facilita a manutenção e evolução da aplicação, isolando responsabilidades como controllers, services, middlewares e entidades.

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

# 2. Instalação de dependências

Nesta etapa são instaladas as bibliotecas necessárias para o funcionamento da API, incluindo Express, TypeORM, autenticação JWT e bibliotecas auxiliares.

```bash
npm init -y
npm install express typeorm reflect-metadata pg bcrypt jsonwebtoken express-async-errors
npm install -D typescript ts-node-dev @types/express @types/bcrypt @types/jsonwebtoken
```

---

# 3. Entidade de usuário

A entidade representa a tabela no banco de dados. Aqui definimos a estrutura base do usuário que será persistido, incluindo id, email e senha.

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

# 4. Padronização de erros

Para evitar respostas inconsistentes na API, criamos uma classe de erro customizada. Ela será utilizada para lançar erros controlados com código e mensagem padronizados.

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

# 5. Middleware global de erro

Este middleware centraliza o tratamento de erros da aplicação. Qualquer erro lançado em services ou controllers será interceptado aqui e convertido em uma resposta padronizada.

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

# 6. Service de criação de usuário

O service contém a regra de negócio de criação de usuário. Aqui também ocorre a validação para impedir emails duplicados e o hash da senha antes de salvar no banco.

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

# 7. Service de login

Este service valida as credenciais do usuário e, caso estejam corretas, gera um token JWT que será utilizado para autenticação nas próximas requisições.

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

# 8. Service de perfil

Este service busca os dados do usuário autenticado. Ele recebe o ID vindo do token JWT e retorna apenas informações públicas.

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

# 9. Middleware de autenticação

O middleware verifica se o token JWT foi enviado na requisição. Caso válido, ele extrai o ID do usuário e adiciona ao request para uso posterior.

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

Os controllers são responsáveis apenas por receber a requisição HTTP e delegar a execução para os services. Eles não devem conter regras de negócio.

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

# 11. Rotas de autenticação

As rotas organizam os endpoints relacionados à autenticação. Aqui também aplicamos o middleware de autenticação nas rotas protegidas.

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

# 12. Server principal

O arquivo principal inicializa o Express, registra as rotas e aplica o middleware global de erro. Também é necessário importar express-async-errors para capturar erros assíncronos automaticamente.

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

# 13. Fluxo da aplicação

O fluxo abaixo resume como uma requisição percorre a aplicação:

* Registro: controller → service → TypeORM → banco
* Login: valida credenciais → gera token JWT
* Me: middleware valida token → service busca usuário

---

# 14. Padronização de erros

Exemplos de respostas padronizadas da API:

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

# Conclusão

Este padrão mostra como organizar uma API em Express com estrutura semelhante a frameworks mais opinativos. A separação entre controllers, services e middlewares permite escalabilidade, testabilidade e manutenção mais simples, aproximando o projeto de uma arquitetura de produção.
