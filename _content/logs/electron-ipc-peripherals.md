## Resumo

Apps web dentro do Electron não tocam impressora nem maquininha diretamente. A ponte é **IPC + preload + postMessage**. Este post descreve como padronizamos essa camada sem virar um emaranhado de canais ad hoc.

## Contexto

Cada totem pode ter hardware diferente. Os apps renderer (Vite/React) precisam de uma API estável: `printer.print()`, `payment.start()`, etc.

## Arquitetura

```text
iframe (app Vite) → postMessage → preload bridge → ipcMain → driver nativo
```

| Módulo | Canal | Responsabilidade |
| ------ | ----- | ---------------- |
| Impressora | `ipc:printer` | Buffer, status, papel |
| Pagamento | `ipc:payment` | Transação, cancelamento |
| Genérico | `ipc:*` | Extensões futuras |

## Decisão importante

Um **contrato por tipo de periférico**, não por fabricante. Drivers específicos ficam no main process; o renderer nunca importa addon nativo.

## Lição

IPC bem nomeado e documentado vale mais que abstração prematura. A equipe inteira precisa saber qual canal usar sem ler 400 linhas do main.
