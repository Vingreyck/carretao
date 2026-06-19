# 06 — Monetização

> Princípio: **quem paga é quem tem dor que vale dinheiro** — a **loja**. Cliente e mecânico usam de graça (são a demanda e o canal). Comece simples; ative receita quando houver volume.
>
> Este documento foi calibrado por um **benchmark de mercado** (iFood, Quero Delivery e marketplaces de autopeças) — ver seção final.

## A pergunta central: comissão por venda OU mensalidade?

A resposta curta, baseada nos marketplaces que deram certo de forma regional: **comece pela MENSALIDADE FIXA da loja (assinatura)**, e deixe a **comissão por venda** como uma alavanca pequena e opcional para a Fase 2 (quando o pagamento passar dentro do app).

**Por quê, no caso específico do Carretão:** a loja **já paga a comissão do mecânico** (é o coração do produto — ver [04](./04-fluxo-de-comissao-mecanico.md)). Se o Carretão **também** cobrar uma comissão alta por venda em cima disso, a margem da loja é espremida duas vezes e ela não adota. A mensalidade fixa:

- é **previsível** (a loja sabe quanto paga, você sabe quanto recebe);
- é **fácil de vender** batendo na porta em Itabaiana ("R$ X por mês e você vende à vontade, sem o app comer sua margem");
- **não empilha** em cima da comissão do mecânico;
- **funciona sem precisar processar pagamento dentro do app** (não trava o MVP — ver [03 RN-045](./03-regras-de-negocio.md)).

É exatamente o modelo que o **Quero Delivery** usa como diferencial regional contra o iFood.

## Fontes de receita (em ordem de prioridade)

### 1. Assinatura da loja (SaaS) — receita principal ⭐
Plano mensal por loja, em tiers. Previsível e fácil de explicar.

| Plano | Preço sugerido | Inclui |
|-------|----------------|--------|
| **Balcão (Grátis)** | R$ 0 | Vitrine básica, até ~20 produtos, recebe pedidos, **sem destaque**. Serve de isca para encher o app de lojas. |
| **Pro** | **R$ 99–149/mês** | Catálogo ilimitado, programa de mecânicos completo, relatórios, suporte. |
| **Destaque** | **R$ 249–349/mês** | Tudo do Pro + créditos de destaque/patrocínio (`RN-070`). |

> Faixa calibrada pelo mercado: marketplaces de autopeças cobram **R$ 200–600/mês** de assinatura de catálogo. Começamos mais barato porque é hiperlocal e estamos validando.

### 2. Comissão por venda (take rate) — Fase 2, BAIXA e opcional
Só quando o pagamento for **dentro do app** com split (`RN-047`). Sugestão: **3% a 5%** por pedido — bem abaixo dos **12–23% do iFood** e dos **6–10% dos marketplaces de autopeças** — justamente porque a loja já banca a comissão do mecânico.

Alternativa a "%": **taxa fixa por pedido** (ex.: R$ 1–2/pedido). Mais simples de entender e não pune ticket alto (peça de caminhão é cara).

> **No MVP, take rate = 0%.** Receita só pela assinatura. Ativar comissão só depois de provar valor e com pagamento in-app.

### 3. Destaque / Patrocínio (publicidade)
Loja (ou fabricante de peça) paga para aparecer no topo de buscas/categorias, sempre rotulado **"Patrocinado"** (`RN-070`, `RN-071`). Pacote mensal ou por clique/lead. É a 3ª fonte de receita dos marketplaces de autopeças.

### 4. Lead qualificado (para serviços, fase futura)
Para quem não vende produto mas serviço (oficina, guincho, borracharia): cobrar por **lead** (cliente que pediu orçamento/contato).

## Como o dinheiro circula (resumo)

| Ator | Paga | Recebe |
|------|------|--------|
| **Cliente** | Só o valor da peça (+ frete, se houver) | A peça, preço, conveniência |
| **Mecânico** | Nada | Comissão **da loja** (ver [04](./04-fluxo-de-comissao-mecanico.md)) |
| **Loja** | **Assinatura** (+ destaque) (+ take rate na Fase 2) | Vendas, vitrine, mecânicos como canal |
| **Plataforma (você)** | Custos de operação | Assinatura + destaque (+ take rate) |

> ⚠️ **Não confundir as duas porcentagens:** a **comissão do mecânico** (a loja paga ao mecânico, 0–20%) é uma coisa; o **take rate da plataforma** (a loja paga ao Carretão, 0% no MVP) é outra. São independentes.

## Estratégia de ativação (ordem no tempo)

1. **Fase 0–1:** tudo **grátis** pra loja. Objetivo = densidade de lojas, mecânicos e clientes em Itabaiana. Sem receita, foco em rede (é o playbook do Quero Delivery em cidade nova).
2. **Fase 2:** introduz **assinatura Pro** e **destaque** quando as lojas já dependem do fluxo. Esta vira a receita principal.
3. **Fase 3:** pagamento in-app + **split**; aí sim avalia um **take rate pequeno (3–5%)** e/ou **taxa fixa por pedido**.

## Simulação rápida (ordem de grandeza)

Suponha 40 lojas pagantes no plano Pro (R$ 129/mês) em ~1 ano:

```
40 lojas × R$ 129/mês            = R$ 5.160/mês  (assinatura)
+ 8 lojas no Destaque (+R$ 150)  = R$ 1.200/mês  (publicidade)
                                  ───────────────
Receita recorrente (MRR)         ≈ R$ 6.360/mês  sem nenhum take rate
```

Com take rate de 4% na Fase 2 sobre, digamos, R$ 200 mil de GMV/mês = **+R$ 8.000/mês**. A assinatura paga a operação; o take rate é o crescimento.

### Simulação com 10 lojas (preços reais de peças de caminhão)

**Âncoras de preço pesquisadas** (peças de caminhão/linha pesada):

| Peça | Faixa de preço |
|------|----------------|
| Filtro (óleo/ar/combustível) | R$ 50 – 120 |
| Jogo de pastilha de freio (caminhão) | R$ 150 – 400 |
| Disco de freio (unidade) | R$ 100 – 600 |
| Bomba d'água | R$ 150 – 400 |
| Kit de embreagem (ex.: Iveco Stralis) | R$ 2.000 – 4.500 |

> O **ticket médio** do setor de autopeças fica entre **R$ 150** (online) e **R$ 621** (geral). Caminhão puxa pra cima por causa de itens caros. Para a conta, uso um ticket médio **conservador de R$ 300** por pedido.

**Cenários — 10 lojas associadas, ticket médio R$ 300:**

| Cenário | Pedidos/loja/mês | Pedidos totais/mês | GMV total/mês |
|---------|------------------|--------------------|---------------|
| Devagar | 25 | 250 | R$ 75.000 |
| Realista | 60 | 600 | R$ 180.000 |
| Aquecido | 120 | 1.200 | R$ 360.000 |

**Quanto VOCÊ tira, por modelo de cobrança:**

| Modelo | Devagar | Realista | Aquecido |
|--------|---------|----------|----------|
| **Take rate 4%** (sobre GMV) | R$ 3.000 | R$ 7.200 | R$ 14.400 |
| **Take rate 5%** | R$ 3.750 | R$ 9.000 | R$ 18.000 |
| **Taxa fixa R$ 1,50/pedido** | R$ 375 | R$ 900 | R$ 1.800 |
| **Assinatura** (10× Pro R$ 129) | R$ 1.290 | R$ 1.290 | R$ 1.290 |

**Leituras:**

1. Para peça de caminhão (ticket alto), a **comissão percentual rende muito mais** que a taxa fixa por pedido — R$ 7.200 vs R$ 900 no cenário realista. Se um dia cobrar comissão, vá de **%**.
2. **No início, com pouco volume, a assinatura (R$ 1.290/mês fixos) é o que te sustenta** — a comissão só fica gorda quando o volume cresce. Por isso ela é a receita principal do MVP.
3. Combinando (Fase 2): assinatura **R$ 1.290** + take rate 4% no realista **R$ 7.200** ≈ **R$ 8.490/mês** com só 10 lojas.

**Quem ganha o quê num pedido de R$ 300 (Fase 2, take 4%, comissão do mecânico 5%):**

```
Cliente paga ............. R$ 300,00
  → Mecânico (5%, pago pela loja) .... R$ 15,00
  → Carretão (take 4%, pago pela loja) R$ 12,00   ← você
  → Loja fica com .................... R$ 273,00   (antes do custo da peça)
```

> No **MVP**, o take rate é **0%**: nesse mesmo pedido você ganha **R$ 0** por venda e fatura só na **mensalidade**. O take rate entra na Fase 2, com pagamento dentro do app.

---

## Benchmark de mercado (pesquisa)

| Plataforma | Modelo | Números |
|-----------|--------|---------|
| **iFood** (Plano Básico) | Comissão + mensalidade | 12% por pedido (entregador próprio) + 3,2% pagamento online + R$ 110–150/mês acima de R$ 1.800 de venda. Plano Entrega ~23%. |
| **iFood** | — | Take rate efetivo ~15% no básico. |
| **Quero Delivery** | **Híbrido regional** | Dois modelos por cidade: (a) **só comissão** (paga quando vende, sem mensalidade — bom para começar) ou (b) **mensalidade fixa SEM comissão** (melhor para alto volume). Entrega própria = sem custo; entrega da plataforma repassada ao cliente. Operação descentralizada por "central local". |
| **Marketplaces de autopeças (especializados)** | Comissão | **6% a 10%** por venda. |
| **Mercado Livre / Amazon / Magalu (autopeças)** | Comissão | **11% a 20%** (ML 11–16%, Amazon 12%, Magalu 10–20%). |
| Marketplaces de autopeças (geral) | Assinatura + comissão + ads | Assinatura de catálogo **R$ 200–600/mês** + comissão + destaque pago. |

**Leituras-chave para o Carretão:**

1. O **Quero Delivery** prova que dá pra vencer regionalmente oferecendo **mensalidade fixa sem comissão** — é o anti-iFood, e o lojista adora porque não perde margem por pedido. É o modelo que melhor encaixa com a nossa comissão-do-mecânico.
2. **Comissão alta (estilo iFood, 12–23%) não cabe aqui**, porque a loja já paga o mecânico. Se um dia cobrarmos comissão, tem que ser baixa (3–5%) ou taxa fixa por pedido.
3. **Operação regional descentralizada** (Quero Delivery) sugere um caminho de expansão: cada cidade nova com uma "central local", mas isso é Fase 3+.

### Fontes

- [Taxas do iFood — Blog Parceiros iFood](https://blog-parceiros.ifood.com.br/taxas-ifood/)
- [Taxa de comissão do iFood: guia 2026 — Brendi](https://brendi.com.br/blog/ifood-taxa-comissao-2026/)
- [Quanto cobra o Quero Delivery? — Casa de Viver](https://casadeviver.com.br/quanto-cobra-o-quero-delivery/)
- [Delivery sem comissão — SAIPOS](https://saipos.com/sistema/delivery/delivery-sem-comissao)
- [Como criar marketplace de autopeças — Mind Group](https://mindconsulting.com.br/2026/03/marketplace-autopecas/)
- [Tabela de taxas de comissão de marketplace — Anymarket](https://marketplace.anymarket.com.br/comissao-marketplace/)
