---
title: Nexus_API
subtitle: Backend distribuído para ingestão assíncrona
---

## Resumo

**Nexus_API** orquestra ingestão assíncrona a partir de múltiplos sensores remotos, com foco em **durabilidade de mensagens** e **idempotência** nos handlers.

## Arquitetura (alto nível)

```text
Sensores → Gateway → Filas → Workers → Armazenamento + índices
```

## Pilares

1. **Contratos versionados** entre produtores e consumidores.
2. **Backpressure** explícito quando o storage está degradado.
3. **Observabilidade** como requisito, não opcional.

## Stack

- **Express** para superfície HTTP administrativa e health checks.
- **Redis** para filas e rate limiting coordenado.

## Métricas que importam

- Latência p95 de ack após ingestão.
- Taxa de duplicatas detectadas e descartadas com segurança.
- Tempo médio de recuperação após restart de um worker.
