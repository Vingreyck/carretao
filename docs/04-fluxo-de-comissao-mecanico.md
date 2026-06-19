# 04 — Comissão do Mecânico (o coração do produto)

> Este é o **diferencial competitivo** do Carretão. Hoje o mecânico ganha comissão informal por mandar o cliente comprar na loja parceira. O Carretão **formaliza, rastreia e paga de forma transparente.** Leia junto com as regras `RN-035`, `RN-046`, `RN-047`, `RN-060+` em [03](./03-regras-de-negocio.md).

## Por que isso muda o jogo

- **Loja ganha** mais mecânicos puxando venda pra ela (canal de aquisição barato e mensurável).
- **Mecânico ganha** sem depender de "boa vontade" do balcão; vê quanto e quando recebe.
- **Plataforma ganha** um efeito de rede local difícil de copiar: cada mecânico ativo traz clientes e prende lojas.

## Conceitos

- **Código do mecânico:** identificador único e curto (ex.: `BIGODE12`). Cada mecânico tem **um link** (`carretao.app/m/BIGODE12`) e um **QR code** que abrem o app já atribuídos a ele.
- **Atribuição:** o vínculo entre um pedido e o mecânico que o originou.
- **Comissão:** valor que a **loja paga ao mecânico**, calculado sobre o valor dos itens do pedido. **A loja define o %** (dentro dos limites da plataforma — `RN-013`).
- **Take rate:** quanto a **plataforma** retém. Por padrão a comissão do mecânico **não sai do bolso da plataforma** — ela é um custo da loja (o mesmo que a loja já pagava informalmente).

## Como a atribuição acontece (RN-A)

Três formas, todas resultando em atribuição ao mecânico:

1. **Link/QR:** cliente abre `carretao.app/m/BIGODE12` → o app marca o mecânico como **last-touch** por uma janela de «7 dias».
2. **Código no checkout:** cliente digita `BIGODE12` no checkout (`RN-035`).
3. **Pedido criado pelo mecânico:** o mecânico monta o carrinho no painel dele e envia pro cliente confirmar.

### Regras de atribuição

- **RN-A01** — Modelo de atribuição: **last-touch** (vale o último mecânico tocado) dentro da **janela de «7 dias»**. Código digitado no checkout **sobrepõe** o link.
- **RN-A02** — A atribuição é **congelada (snapshot)** no momento em que o pedido é `CRIADO`: mecânico, % de comissão e valor-base ficam gravados no pedido (`RN-036`).
- **RN-A03** — Um pedido tem **no máximo um** mecânico atribuído.
- **RN-A04** — Se nenhum mecânico foi tocado, o pedido simplesmente **não gera comissão** (venda orgânica). Tudo bem.

## Cálculo

```
valor_itens        = soma dos itens (sem frete, sem taxas)
comissao_percentual= % definido pela loja no momento do pedido (snapshot)
comissao_bruta     = valor_itens * comissao_percentual
taxa_plataforma_sobre_comissao = comissao_bruta * « 0% no MVP »
comissao_liquida_mecanico      = comissao_bruta - taxa_plataforma_sobre_comissao
```

- **RN-A10** — A comissão incide sobre **valor dos itens**, nunca sobre frete ou taxas.
- **RN-A11** — Itens devolvidos/cancelados **saem da base** e geram estorno proporcional (`RN-061`).
- **RN-A12** — A plataforma PODE, no futuro, reter um % da comissão como receita (`taxa_plataforma_sobre_comissao`). No MVP = 0% para incentivar adoção.

## Ciclo de vida da comissão (máquina de estados)

```
PENDENTE → CONFIRMADA → A_PAGAR → PAGA
   │            │
   └────────────┴──► ESTORNADA  (cancelamento/devolução)
```

- **RN-A20 — `PENDENTE`**: criada junto com o pedido (`CRIADO`/`CONFIRMADO`). Ainda pode cair.
- **RN-A21 — `CONFIRMADA`**: quando o pedido vira `CONCLUIDO` **e** o pagamento é confirmado (`RN-046`). Começa a contar a **janela de devolução** «7 dias».
- **RN-A22 — `A_PAGAR`**: passada a janela de devolução sem estorno, a comissão fica disponível para saque.
- **RN-A23 — `PAGA`**: repassada ao mecânico (saque ou split). Gera registro de auditoria (`RN-082`).
- **RN-A24 — `ESTORNADA`**: pedido cancelado/devolvido (`RN-038`, `RN-061`). Se já estava `PAGA`, vira **saldo negativo/compensação** no próximo ciclo.

## Pagamento da comissão

- **Fase 1 (MVP, pagamento `NA_LOJA`):** a plataforma **registra** a comissão devida; o repasse é **conciliado periodicamente** (ex.: a loja deposita o lote de comissões via Pix para a plataforma repassar, ou modelo de carteira). O valor fica visível no painel do mecânico como **"a receber"**.
- **Fase 2 (pagamento `ONLINE` com split):** no momento do pagamento, o gateway **divide automaticamente**: loja recebe o líquido, mecânico recebe a comissão, plataforma retém sua taxa. Sem conciliação manual.

- **RN-A30** — Saque exige mecânico **verificado** com **chave Pix** (`RN-004`).
- **RN-A31** — Saque mínimo «R$ 20» e processado em até «D+1 útil» (parâmetros).
- **RN-A32** — Todo saque/split gera comprovante e registro de auditoria imutável (`RN-082`).

## Antifraude (essencial)

O modelo de comissão é o que mais convida a fraude. Regras mínimas:

- **RN-A40** — **Autocompra:** uma conta NÃO DEVE receber comissão sobre pedido em que ela é a cliente (`RP-04`). Bloqueio por mesma conta, e sinal de alerta por mesmo dispositivo/Pix.
- **RN-A41** — **Conluio loja-mecânico:** picos anormais (mesmo par loja+mecânico, muitos pedidos sem entrega real, devoluções altas) entram em revisão e PODEM ter comissão retida.
- **RN-A42** — Comissão só **confirma** após pedido `CONCLUIDO` com pagamento confirmado — pedido fantasma não paga.
- **RN-A43** — Limite configurável de comissão acumulada por mecânico antes de exigir reverificação «ex.: R$ 2.000/mês».
- **RN-A44** — Toda comissão `ESTORNADA` por fraude é registrada e PODE suspender o mecânico (`RN-051`).

## Transparência (o que cada um vê)

- **Mecânico:** painel com indicações, pedidos atribuídos, status de cada comissão (pendente/confirmada/a pagar/paga), saldo e histórico de saque.
- **Loja:** quanto deve/pagou de comissão, por mecânico, por período; ranking de mecânicos que mais trazem venda.
- **Cliente:** vê que está vinculado a um mecânico ("Indicado por Bigode"); **não** vê valores de comissão.
- **Plataforma:** visão completa para conciliar, auditar e moderar.

## Parâmetros (resumo)

| Parâmetro | Padrão |
|-----------|--------|
| Janela de atribuição (last-touch) | 7 dias |
| Comissão da loja (mín/máx/padrão) | 0% / 20% / 5% |
| Taxa da plataforma sobre a comissão | 0% (MVP) |
| Janela de devolução até confirmar | 7 dias |
| Saque mínimo | R$ 20 |
| Prazo de saque | D+1 útil |
