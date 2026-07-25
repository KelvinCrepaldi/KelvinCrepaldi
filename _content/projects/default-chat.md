## Introdução

O **DefaultChat** é um app de conversa em tempo real. Dá para criar conta, adicionar amigos, conversar em privado e entrar em grupos públicos — tudo atualizando na hora, como um chat de verdade.

Foi feito para rodar na sua máquina (com Docker ou com Node e Postgres). Não é um serviço online 24h: é um projeto de portfólio para mostrar autenticação, amizades e mensagens ao vivo funcionando juntas.

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

A forma mais simples é com Docker. Também dá para subir front e back separados, se preferir.

### Opção rápida — Docker

Na pasta do projeto, com as portas 3000 e 3001 livres:

```bash
docker compose up --build
```

Isso sobe o banco, a API e o front. Na primeira vez o build pode demorar alguns minutos.

Para ver os logs ou encerrar:

```bash
docker compose logs -f
docker compose down
```

### Opção manual — Node + Postgres

Com Node 20+ e um PostgreSQL local, crie o banco, configure o back-end e o front-end.

**Banco** (exemplo):

```sql
CREATE USER defaultchat WITH PASSWORD 'defaultchat';
CREATE DATABASE defaultchat OWNER defaultchat;
```

**API:**

```bash
cd backend
npm install
cp .env.example .env
npm run typeorm migration:run
npm run dev
```

No `.env` do back-end, preencha pelo menos:

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

**Front-end** (outro terminal):

```bash
cd frontend
npm install --legacy-peer-deps
cp .env.example .env
npm run dev
```

No `.env` do front:

| Variável | Exemplo |
| --- | --- |
| NEXT_PUBLIC_API_URL | http://localhost:3001 |
| API_URL | http://localhost:3001 |
| NEXTAUTH_SECRET | outro-segredo-longo |
| NEXTAUTH_URL | http://localhost:3000 |

### Como testar rápido

1. Abra o app no navegador e crie uma conta
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
| Front | Next.js, React, NextAuth, Socket.io, Tailwind CSS |
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
