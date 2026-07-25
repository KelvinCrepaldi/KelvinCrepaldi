## Introdução

O **Pirate's Punch** é uma loja online completa, com visual inspirado em piratas. A ideia foi construir um e-commerce de ponta a ponta: o visitante navega pelo catálogo, cria conta, monta o carrinho e finaliza um pedido — tudo rodando de verdade no seu computador.

Comecei pelo back-end (regras de negócio e banco de dados) e só depois montei a loja em cima da API. O tema pirata veio por último: era uma escolha de identidade visual, não o ponto de partida do projeto. Hoje o foco é simples — alguém clona, sobe o ambiente e consegue percorrer o fluxo inteiro, da home até a compra.

---

## Prints

![Destaques do Capitão — promoções na home](/projects/pirates-punch/01.png)

![Loja — catálogo](/projects/pirates-punch/02.png)

![Detalhe do produto](/projects/pirates-punch/03.png)

---

## Links

- [Repositório no GitHub](https://github.com/KelvinCrepaldi/piratespunchdrinks-api)

---

## Como instalar

Você vai precisar de Node.js 20+, Docker e npm. A ordem é: banco → API → dados de exemplo → loja.

### 1. Banco de dados

Na pasta do projeto:

```bash
docker compose up -d
```

Isso sobe um PostgreSQL local. Usuário e senha padrão estão no arquivo de exemplo da API.

### 2. API

```bash
cd api
cp .env.example .env
npm install
npm run migration:run
npm run dev
```

Ajuste o arquivo `.env` se precisar (porta, conexão com o banco e chave de autenticação).

### 3. Dados de demonstração

Com a API no ar, popule o catálogo:

```bash
curl -X POST http://localhost:3001/product/seedDatabase
```

Ou, na pasta `api`:

```bash
npm run seed
```

Isso cria dezenas de produtos e categorias para a loja não ficar vazia.

### 4. Loja (front-end)

```bash
cd web
cp .env.example .env.local
npm install
npm run dev
```

No `.env.local`, aponte a loja para a API:

| Variável | Valor |
| --- | --- |
| NEXT_PUBLIC_API_URL | http://localhost:3001 |

---

## Rodando localmente

- [Loja](http://localhost:3000)
- [API](http://localhost:3001)
- [Documentação (Swagger)](http://localhost:3001/docs)

---

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Loja | Next.js, React, TypeScript, Tailwind CSS |
| API | Express, TypeORM, Zod, JWT |
| Banco | PostgreSQL (Docker) |

---

## O que o projeto faz

### Navegar e comprar

A home mostra promoções. Na loja você busca produtos, filtra por categoria e abre a página de detalhe. Carrinho e lista de desejos ficam salvos no navegador enquanto você navega.

### Conta e sessão

Cadastro e login passam pela API. Depois de autenticado, a sessão fica em cookie seguro no Next.js — o token não fica exposto no JavaScript da página. Rotas como perfil e carrinho pedem login.

### Checkout e perfil

No checkout, o pedido é criado de verdade na API. No perfil dá para gerenciar endereços, cartões, ver o histórico de compras e apagar a conta.

### Limitações honestas

Formulários de newsletter e contato são só interface, sem back-end. Carrinho e wishlist não ficam no servidor. Há um campo de administrador no usuário, mas as rotas de criação de produto ainda não estão protegidas por permissão — é um projeto de portfólio, não um sistema de produção.
