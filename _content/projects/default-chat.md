## Introdução

O **DefaultChat** é um app de conversa em tempo real. Dá para criar conta, adicionar amigos, conversar em privado e entrar em grupos públicos — tudo atualizando na hora, como um chat de verdade.

Foi feito para rodar na sua máquina. Não é um serviço online 24h: é um projeto de portfólio para mostrar autenticação, amizades e mensagens ao vivo funcionando juntas.

---

## Prints

![Login — DefaultChat](/projects/default-chat/01.png)

![Chat em grupo](/projects/default-chat/02.png)

![Grupos públicos](/projects/default-chat/03.png)

---

## Links

- [Repositório no GitHub](https://github.com/KelvinCrepaldi/DefaultChat)

---

## Como instalar

Fluxo atual: o **Docker sobe só a API e o Postgres**; o **front roda na máquina** com pnpm.

### Requisitos

- Docker Desktop (ou Docker Engine + Compose)
- Node.js 20+ e pnpm
- Portas 3000 (front) e 3001 (API) livres

### 1. API e banco (Docker)

Na pasta do projeto:

```bash
docker compose up --build
```

Isso sobe o Postgres e a API. O front **não** entra no Compose.

### 2. Front (local)

Em outro terminal:

```bash
cd frontend
pnpm install
cp .env.example .env
pnpm run dev
```

No `.env` do front:

| Variável | Exemplo |
| --- | --- |
| NEXT_PUBLIC_API_URL | http://localhost:3001 |
| API_URL | http://localhost:3001 |
| NEXTAUTH_SECRET | outro-segredo-longo |
| NEXTAUTH_URL | http://localhost:3000 |

### Alternativa sem Docker

Com um Postgres local, suba a API na pasta `backend` (`npm install`, configure o `.env`, rode as migrations e `npm run dev`). Depois o front com pnpm, como acima.

No `.env` do back-end, o essencial é:

| Variável | Exemplo |
| --- | --- |
| DB_HOST | localhost |
| DB_USER | defaultchat |
| DB_PASSWORD | defaultchat |
| DB | defaultchat |
| PGPORT | 5432 |
| PORT | 3001 |
| SECRET_KEY | um-segredo-longo |
| CORS_ORIGIN | http://localhost:3000 |

### Como testar rápido

1. Compose (ou API local) no ar + front em http://localhost:3000 → criar conta
2. Em outra janela (ou navegador), crie um segundo usuário
3. Busque o outro perfil, envie pedido de amizade e aceite
4. Abra o chat 1:1 ou entre em um grupo e converse

---

## Rodando localmente

- [Aplicação (front)](http://localhost:3000)
- [API](http://localhost:3001)

---

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Front | Next.js, React, NextAuth, Socket.io, Tailwind CSS, pnpm |
| Back | Express, Socket.io, TypeORM, JWT |
| Banco | PostgreSQL (Docker Compose) |

---

## O que o projeto faz

### Conta e perfil

Você se cadastra, faz login e personaliza um avatar simples (letra com cor de fundo), sem precisar enviar foto.

### Amizades

Dá para buscar pessoas, enviar convite, aceitar, recusar ou remover. A interface mostra estados vazios e avisos claros (por exemplo, quando o convite já foi enviado).

### Conversas

Com um amigo aceito, abre o chat privado em tempo real. Também existem grupos públicos: criar, listar, buscar e entrar. No grupo você vê quem está participando e pode convidar alguém para ser amigo.

### Quem está online

Amigos conectados aparecem como online enquanto a sessão está ativa. Isso serve bem para uma demo local; não foi pensado para várias cópias do servidor ao mesmo tempo.
