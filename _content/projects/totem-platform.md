## Summary

O **Totem_Platform** é um ecossistema completo para totens de autoatendimento. Clientes configuram seus totens via um **Dashboard web** (Next.js) que se comunica com uma **API** (também Next.js) e um banco **Supabase**. Os totens rodam um app **Electron** com um sistema de iframes que carrega múltiplos aplicativos **Vite** — baixados do banco e instalados localmente, com **offline-first** e atualizações automáticas. Periféricos (maquininhas de pagamento, impressoras) são controlados via **IPC do Electron**, expostos aos apps renderer através de APIs e do `window.postMessage`.

| Componente       | Tecnologia | Responsabilidade                          |
| ---------------- | ---------- | ----------------------------------------- |
| Dashboard        | Next.js    | Interface de configuração para clientes    |
| API              | Next.js    | Orquestração, CRUD, sync com Supabase     |
| Banco de dados   | Supabase   | Configs, apps, métricas dos totens         |
| Shell do totem   | Electron   | Host dos apps, IPC, periféricos, updates  |
| Apps do totem    | Vite       | UI de cada fluxo (check-in, pagamento...)  |

---

## Visão geral

O projeto nasceu da necessidade de um sistema unificado onde **clientes** pudessem gerenciar totens remotos sem intervenção técnica no local. O Dashboard centraliza configurações, distribuição de apps e monitoramento. Os totens operam em ambientes onde a conexão pode falhar, daí a prioridade por **offline-first**: apps são baixados e cacheados; a sincronização ocorre quando há internet.

![Diagrama de arquitetura](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop)

---

## Arquitetura

### Camada web (Dashboard + API)

| Camada       | Stack      | Papel                                           |
| ------------ | ---------- | ----------------------------------------------- |
| Frontend     | Next.js    | Dashboard responsivo, autenticação, gestão UI   |
| Backend      | Next.js API Routes | REST/Server Actions, lógica de negócio     |
| Persistência | Supabase   | PostgreSQL, Auth, Storage (builds dos apps)    |

O Dashboard permite:

- Cadastro de totens por cliente
- Atribuição de apps e playlists a cada totem
- Definição de horários, temas e textos
- Visualização de métricas e logs

A API expõe endpoints para:

- Sincronização de configuração (totem → servidor, servidor → totem)
- Download de apps e atualizações
- Recebimento de telemetria e eventos

### Camada dos totens (Electron + apps)

O totem é um **Electron app** que atua como shell:

1. **Sistema de iframes** — carrega múltiplos apps Vite em iframes isolados, alternando entre eles conforme a playlist configurada.
2. **Repositório local** — apps são baixados do Supabase Storage (ou da API), descompactados e guardados no disco.
3. **Offline-first** — apps rodam a partir do cache local; quando online, checa e aplica novas versões.

| Recurso              | Implementação                                                       |
| -------------------- | ------------------------------------------------------------------- |
| Download de apps     | API → ZIP → descompactação em diretório dedicado                    |
| Atualização automática | Polling ou webhook; comparação de versão antes do download     |
| Troca de apps        | Iframes com `src` apontando para os builds locais (file:// ou localhost) |
| Isolamento           | Cada iframe em processo/contexto próprio para estabilidade          |

![Totem em operação](https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=450&fit=crop)

---

## Integração com periféricos

Totens costumam ter **impressoras** (recibos, tickets) e **maquininhas de pagamento**. Como os apps rodam no renderer (contexto web), não têm acesso direto ao hardware. A solução é o **IPC do Electron**:

```
[App Vite no iframe]  ←→  [window.postMessage]  ←→  [Preload/Bridge]  ←→  [Main process]  ←→  [Drivers/nativos]
```

| Módulo      | Canal          | Função                                                  |
| ----------- | -------------- | ------------------------------------------------------- |
| Impressora  | `ipc:printer`  | Enviar buffer, status, configuração de papel            |
| Pagamento  | `ipc:payment`  | Iniciar transação, cancelar, consultar status           |
| Outros     | `ipc:*`        | API genérica para novos periféricos                    |

Criamos **APIs por tipo de módulo** para padronizar a interface:

- `printer.print(data)` — imprime conteúdo
- `payment.startTransaction(amount)` — inicia pagamento
- `payment.onStatus(callback)` — escuta mudanças de status

O preload script expõe essas funções ao `window` e usa `postMessage` para comunicar com o processo principal; o main process fala com os drivers nativos (Node, addons, etc.).

---

## Fluxo de dados resumido

| Fluxo              | Sentido            | Descrição                                  |
| ------------------ | ------------------ | ------------------------------------------ |
| Config → totem      | Dashboard → totem  | Cliente altera config; totem sincroniza     |
| Apps → totem       | API/Storage → totem| Download e instalação de novos apps        |
| Totem → API       | totem → servidor   | Métricas, logs, status de sincronização    |
| Periférico → app   | main → renderer    | IPC → postMessage → callback no app       |

---

## Stack técnica

| Área          | Tecnologias                                   |
| ------------- | --------------------------------------------- |
| Dashboard/API | Next.js 14+, React, Tailwind, Supabase client |
| Banco         | Supabase (PostgreSQL, Auth, Storage)         |
| Shell totem   | Electron, Node.js                             |
| Apps totem    | Vite, React (ou Vue), build estático          |
| Periféricos   | Node addons, libs nativas, IPC                |

---

## Desafios e decisões

| Desafio              | Abordagem                                                   |
| -------------------- | ----------------------------------------------------------- |
| Apps em iframes      | Builds estáticos servidos localmente; sandbox por contexto  |
| Atualização offline  | Cache local + fila de sync; reconciliação ao reconectar     |
| Drivers de hardware  | Camada de abstração por tipo; IPC como único canal de I/O   |
| Multi-app            | Playlist configurável; transição entre iframes sem reload    |

![Código e arquitetura](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop)

---

## Próximos passos

1. Suporte a atualização delta (apenas diffs) para reduzir banda.
2. Modo kiosk mais restrito (lockdown de teclado/mouse em cenários específicos).
3. Dashboard de métricas em tempo real (WebSockets ou polling).
4. SDK público para desenvolvimento de apps por terceiros.
