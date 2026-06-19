# 05 — Modelo de Dados

> Modelo conceitual. Os nomes finais de tabela/coluna serão definidos na Parte 2 (backend). Banco-alvo: **PostgreSQL** (ver [08](./08-stack-tecnica.md)).

## Visão geral (entidades)

```
Usuario ──< PapelUsuario
Usuario ──1:1── PerfilMecanico ──< CodigoIndicacao
Usuario ──< Endereco
Loja ──< MembroLoja >── Usuario
Loja ──< Oferta >── Produto        (Oferta = preço/estoque do Produto naquela Loja)
Produto ──< Aplicacao              (modelos de caminhão compatíveis)
Pedido ──< ItemPedido >── Oferta
Pedido ──> Loja, Cliente(Usuario), Mecanico(Usuario, opcional)
Pedido ──1:1── Comissao
Pedido ──1:1── Pagamento
Comissao ──< MovimentoComissao     (auditoria append-only)
Saque ──< MovimentoComissao
Avaliacao ──> Pedido, Loja, Mecanico(opcional)
Atribuicao ──> Usuario(cliente), Mecanico, (origem: link/checkout)
```

## Entidades principais

### Usuario
| Campo | Tipo | Notas |
|-------|------|-------|
| id | uuid | PK |
| telefone | string | único, verificado por OTP (`RN-001`) |
| email | string? | opcional |
| nome | string | |
| cpf | string? | obrigatório p/ mecânico sacar (`RN-004`), cifrado (`RN-081`) |
| status | enum | `ATIVO`, `SUSPENSO`, `EXCLUIDO` |
| criado_em / atualizado_em | timestamp | |

### PapelUsuario
`usuario_id`, `papel` (`CLIENTE`,`MECANICO`,`LOJA_ADMIN`,`LOJA_OPERADOR`,`PLATAFORMA_ADMIN`,`PLATAFORMA_SUPORTE`), `loja_id?` (quando papel de loja). Ver [02](./02-personas-e-papeis.md).

### PerfilMecanico
`usuario_id` (PK/FK), `verificado` (bool), `chave_pix?`, `status_verificacao` (`PENDENTE`/`APROVADO`/`REPROVADO`), `saldo_a_receber` (derivado), `limite_mensal`.

### CodigoIndicacao
`id`, `mecanico_id`, `codigo` (único, ex.: `BIGODE12`), `ativo` (bool). Um mecânico pode ter mais de um código (ex.: campanha), mas um principal.

### Loja (tenant)
| Campo | Tipo | Notas |
|-------|------|-------|
| id | uuid | PK / tenant key |
| cnpj | string | único |
| nome_fantasia | string | |
| status | enum | `PENDENTE`,`ATIVA`,`SUSPENSA` (`RN-014`) |
| endereco / geo | ponto | p/ busca por proximidade |
| horario_funcionamento | json | |
| oferece_retirada / oferece_entrega | bool | `RN-012` |
| taxa_entrega / area_entrega | — | `RN-042` |
| comissao_percentual_padrao | decimal | `RN-013`, limites de plataforma |
| plano_id | fk | assinatura (ver [06](./06-monetizacao.md)) |

### MembroLoja
`loja_id`, `usuario_id`, `papel` (`LOJA_ADMIN`/`LOJA_OPERADOR`).

### Produto (canônico) e Oferta
- **Produto:** `id`, `titulo`, `categoria`, `marca`, `part_number?`, `descricao`. Canônico e compartilhável (`RN-023`).
- **Aplicacao:** `produto_id`, `modelo_caminhao`, `ano_de`, `ano_ate` (compatibilidade — `RN-020`).
- **Oferta:** `id`, `loja_id`, `produto_id`, `preco`, `preco_promocional?`, `promo_validade?`, `estoque_qtd`, `permite_sob_consulta` (bool), `ativo`. **(Oferta = a peça naquela loja, com preço/estoque próprios — `RN-021`.)**

### Pedido
| Campo | Tipo | Notas |
|-------|------|-------|
| id | uuid | |
| loja_id | fk | um pedido = uma loja (`RN-033`) |
| cliente_id | fk(Usuario) | |
| mecanico_id | fk(Usuario)? | atribuição (`RN-A02`) |
| comissao_percentual_snapshot | decimal | congelado (`RN-036`) |
| tipo_entrega | enum | `RETIRADA`/`ENTREGA` |
| status | enum | `CRIADO`,`CONFIRMADO`,`EM_PREPARO`,`PRONTO`,`ENVIADO`,`CONCLUIDO`,`CANCELADO`,`DEVOLVIDO` (`RN-037`) |
| metodo_pagamento | enum | `NA_LOJA`/`ONLINE` (`RN-045`) |
| valor_itens / valor_frete / valor_total | decimal | |
| codigo_retirada? | string | `RN-040` |
| criado_em / concluido_em | timestamp | concluído dispara janela de devolução |

### ItemPedido
`pedido_id`, `oferta_id`, `titulo_snapshot`, `preco_snapshot`, `qtd`, `subtotal`. Snapshots garantem que mudança futura de preço não altera o pedido (`RN-036`).

### Comissao
`id`, `pedido_id` (1:1), `mecanico_id`, `valor_base`, `percentual`, `valor_bruto`, `taxa_plataforma`, `valor_liquido`, `status` (`PENDENTE`,`CONFIRMADA`,`A_PAGAR`,`PAGA`,`ESTORNADA` — `RN-A20+`), `confirmada_em`, `liberada_em`.

### MovimentoComissao (auditoria append-only — `RN-082`)
`id`, `comissao_id?`, `saque_id?`, `tipo` (`CREDITO`,`DEBITO`,`ESTORNO`,`SAQUE`), `valor`, `descricao`, `criado_em`. **Nunca se edita/apaga; só insere.**

### Saque
`id`, `mecanico_id`, `valor`, `chave_pix`, `status` (`SOLICITADO`,`PROCESSANDO`,`PAGO`,`FALHOU`), `comprovante`, `criado_em`.

### Pagamento
`id`, `pedido_id` (1:1), `metodo` (`NA_LOJA`/`PIX`/`CARTAO`), `status` (`PENDENTE`,`PAGO`,`ESTORNADO`), `gateway_ref?`, `split_json?` (Fase 2).

### Avaliacao
`id`, `pedido_id`, `loja_id`, `mecanico_id?`, `nota` (1–5), `comentario?`, `resposta_loja?`. Só quem concluiu pedido (`RN-052`).

### Atribuicao
`id`, `cliente_id`, `mecanico_id`, `origem` (`LINK`,`QR`,`CHECKOUT`,`PEDIDO_MECANICO`), `expira_em` (last-touch 7d — `RN-A01`).

## Estados — referência rápida

- **Pedido:** `RN-037`.
- **Comissão:** `RN-A20`–`RN-A24`.
- **Loja:** `PENDENTE`→`ATIVA`→`SUSPENSA`.
- **Verificação mecânico:** `PENDENTE`→`APROVADO`/`REPROVADO`.

## Decisões de modelagem

1. **Oferta separada de Produto** para permitir comparação de preço entre lojas (`RN-023`) e isolamento multi-tenant de preço/estoque.
2. **Snapshots no Pedido/Item/Comissão** para imutabilidade financeira (`RN-036`).
3. **Auditoria append-only** (`MovimentoComissao`) — exigência financeira/antifraude (`RN-082`, `RN-A44`).
4. **Atribuição como entidade própria** (não um campo solto) para suportar last-touch com expiração e auditoria.
