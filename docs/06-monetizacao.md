# 06 — Monetização

> Princípio: **quem paga é quem tem dor que vale dinheiro** — a **loja**. Cliente e mecânico usam de graça (são a demanda e o canal). Comece simples; ative receita quando houver volume.

## Fontes de receita

### 1. Assinatura da loja (SaaS) — receita principal
Plano mensal por loja, em tiers. Receita previsível e fácil de explicar pro lojista.

| Plano | Preço sugerido | Inclui |
|-------|----------------|--------|
| **Grátis / Balcão** | R$ 0 | Vitrine básica, até N produtos, recebe pedidos, sem destaque |
| **Pro** | R$ 79–149/mês | Catálogo ilimitado, relatórios, programa de mecânicos completo, suporte |
| **Destaque** | R$ 199–299/mês | Tudo do Pro + créditos de destaque/patrocínio (`RN-070`) |

> Números são hipóteses a validar batendo na porta das lojas de Itabaiana.

### 2. Destaque / Patrocínio (ads)
Loja paga para aparecer no topo de buscas/categorias, sempre rotulado **"Patrocinado"** (`RN-070`, `RN-071`). Modelo: pacote mensal ou por clique/lead.

### 3. Take rate sobre transação (Fase 2)
Quando houver pagamento in-app com split, a plataforma PODE reter um % por transação. **No MVP = 0%** para reduzir atrito de adesão. Ativar só depois de provar valor.

### 4. Taxa sobre a comissão do mecânico (opcional, Fase 2+)
A plataforma PODE reter uma fração da comissão paga ao mecânico (`taxa_plataforma_sobre_comissao`, `RN-A12`). **MVP = 0%.** É a alavanca mais sensível — mexer só com a rede já fidelizada.

### 5. Lead qualificado
Para lojas fora do modelo de transação, cobrar por **lead** (cliente que pediu orçamento/contato). Útil pra serviços (oficina, guincho, borracharia) que entrarem depois.

## Estratégia de ativação (ordem)

1. **Fase 0–1:** tudo grátis pra loja. Objetivo = densidade de lojas, mecânicos e clientes em Itabaiana. Sem receita, foco em rede.
2. **Fase 2:** introduz **assinatura Pro** e **destaque** quando as lojas já dependem do fluxo.
3. **Fase 3:** pagamento in-app + **split**; avalia **take rate** pequeno e/ou **taxa sobre comissão**.

## Quem paga o quê (resumo)

| Ator | Paga | Recebe |
|------|------|--------|
| Cliente | Nada (só o valor da peça/frete) | Peça, preço, conveniência |
| Mecânico | Nada | Comissão da loja (`04`) |
| Loja | Assinatura + destaque (+ take rate Fase 2) | Vendas, vitrine, mecânicos como canal |
| Plataforma | Custos de operação | Assinatura, destaque, (take rate) |

## Métricas que importam (norte)

- **Lojas ativas** e **% pagantes**.
- **Mecânicos ativos** (com ≥1 indicação convertida no mês) — proxy do diferencial.
- **GMV** (volume transacionado) e **pedidos/mês**.
- **Comissão paga a mecânicos** (saúde do canal).
- **Take rate efetivo** (Fase 2+).
- **Retenção de loja** (churn mensal).
