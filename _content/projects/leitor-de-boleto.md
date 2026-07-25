## Introdução

O **Leitor de Boleto** é uma API que entende a linha digitável dos boletos brasileiros. Você envia o código e, se estiver válido, recebe de volta o código de barras, o valor e — quando fizer sentido — a data de vencimento.

O projeto nasceu de um desafio técnico. A parte difícil não foi montar o servidor em si, e sim traduzir as regras oficiais dos boletos (título bancário e convênio de arrecadação) em um código claro, com testes. Depois foi refatorado para ficar mais legível e fácil de acompanhar.

---

## Links

- [Repositório no GitHub](https://github.com/KelvinCrepaldi/leitor_de_boleto)

---

## Como instalar

Você vai precisar de Node.js 18+ e pnpm.

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Por padrão a API sobe na porta **8080**. Para rodar os testes:

```bash
pnpm test
```

### Como usar

A rota principal é:

```
GET /boleto/:code
```

Exemplo com um boleto de título (47 dígitos):

```bash
curl http://localhost:8080/boleto/21290001192110001210904475617405975870000002000
```

Se o código for válido, a resposta traz o código de barras, o valor e a data de vencimento. Se algo estiver errado (tamanho, dígito verificador, etc.), a API devolve uma mensagem de erro clara.

---

## Rodando localmente

- [API](http://localhost:8080)

Exemplo de consulta: [http://localhost:8080/boleto/21290001192110001210904475617405975870000002000](http://localhost:8080/boleto/21290001192110001210904475617405975870000002000)

---

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| API | Express, TypeScript |
| Testes | Jest, Supertest |
| Ferramentas | pnpm, ts-node-dev |

---

## O que o projeto faz

### Dois tipos de boleto

- **Título** — boleto bancário comum (47 dígitos), com valor e vencimento
- **Convênio** — contas de concessionárias e arrecadação (48 dígitos), com valor

A API reconhece o tipo pelo tamanho e pela estrutura do código, valida os dígitos verificadores e monta a resposta.

### Por que isso importa no portfólio

Mostra cuidado com regras de negócio reais (padrão brasileiro de boletos), validação de entrada, testes automatizados e uma API pequena, mas bem definida: uma rota, um contrato claro, erros previsíveis.

Não há interface gráfica — o foco é o serviço em si. Qualquer cliente (Postman, curl ou outro app) pode consumir o endpoint.
