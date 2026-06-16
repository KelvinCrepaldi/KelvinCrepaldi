## Resumo

Trabalhar com totens offline-first ensina que **sincronização não é um detalhe de implementação** — é o produto. Este log registra o que aprendi depois de meses equilibrando filas locais, reconciliação e expectativas de clientes que assumem conexão estável.

## Contexto

Os totens operam em shoppings, hospitais e pontos com Wi-Fi instável. Configurações e apps precisam estar disponíveis localmente; a nuvem entra quando há rede, não antes.

## O que funcionou

1. **Fila de operações idempotentes** — cada ação tem um ID; reenvio não duplica efeito.
2. **Checkpoint por módulo** — sync parcial em vez de "tudo ou nada".
3. **Telemetria visível no dashboard** — o cliente vê "última sync" sem abrir chamado.

## O que doeu

Assumir que o relógio do totem estava correto. Em três instalações, drift de timezone quebrou ordenação de eventos. Agora validamos NTP na inicialização.

## Lição

Offline-first não significa "funciona sem internet para sempre". Significa **degradar com dignidade** e recuperar sem intervenção manual no local.
