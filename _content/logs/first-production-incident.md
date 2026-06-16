## Resumo

O primeiro incidente sério em produção não foi um bug de código — foi **pressão de deploy + configuração divergente** entre dois totens piloto. Registro aqui o que aconteceu e o que mudamos no processo.

## Contexto

Release nova de um app de check-in. Testes locais ok; em campo, um totem carregava versão antiga do bundle por cache agressivo no proxy interno do cliente.

## Linha do tempo

| Hora | Evento |
| ---- | ------ |
| 09:12 | Cliente reporta tela em branco |
| 09:28 | Identificado mismatch de versão no iframe |
| 10:05 | Rollback + purge de cache no proxy |
| 11:30 | Post-mortem interno |

## Mudanças depois

- Header de versão obrigatório em todo build servido ao totem.
- Checklist de deploy com validação remota antes de marcar "concluído".
- Canal direto com TI do cliente para purge de cache.

## Lição

Produção começa quando alguém que você não conhece usa o sistema num ambiente que você não controla. Logs e versão visível salvam horas de achismo.
