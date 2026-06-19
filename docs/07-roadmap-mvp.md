# 07 — Roadmap / MVP por partes

> Filosofia: **hiperlocal antes de nacional**, **dor real antes de feature bonita**, **entregar em fatias usáveis**. Cada parte fecha um valor testável em Itabaiana.

## Visão das partes

| Parte | Entrega | Valor | Depende de |
|-------|---------|-------|-----------|
| **0** | 📄 Documentação de negócio + identidade | Base comum, regras cravadas | — |
| **1** | 🌐 Landing institucional (estilo querodelivery) | Apresenta o app, capta lojas/leads, "baixe o app" | 0 |
| **2** | ⚙️ Backend + modelo de dados + auth | Fundação técnica (API multi-tenant) | 0 |
| **3** | 🛒 Web app marketplace (cliente) | Buscar peça, ver loja, fazer pedido | 2 |
| **4** | 🏪 Painel do lojista | Loja cadastra catálogo/estoque, recebe pedido | 2 |
| **5** | 🔧 Painel/app do mecânico (afiliado) | Código/link, dashboard de comissão | 2,3,4 |
| **6** | 📱 App mobile (Expo) | Canal principal do cliente e do mecânico | 3,5 |
| **7** | 💳 Pagamento in-app + split de comissão | Automatiza repasse, abre take rate | 5,6 |

## Detalhe do MVP (o que é "mínimo" de verdade)

O **MVP funcional** = Partes **2 + 3 + 4 + 5** (núcleo): cliente busca e pede, loja recebe e atende, mecânico indica e vê comissão. A Parte 1 (landing) pode ir em paralelo como vitrine/captação. Pagamento (7) começa **fora do app** (`RN-045`/`RN-046`), então **não bloqueia** o MVP.

### Parte 1 — Landing institucional
- Hero com mascote (Carretinho), bordão e CTA "Baixe o app" / "Sou loja, quero vender".
- Seções: como funciona (cliente / loja / mecânico), prints do app, depoimentos, FAQ, captação de e-mail/WhatsApp de loja.
- SEO local ("auto peças caminhão Itabaiana").
- **Pronto quando:** no ar, responsivo, formulário de lojista capturando leads.

### Parte 2 — Backend + dados
- Modelagem do [05](./05-modelo-de-dados.md) em PostgreSQL (migrations).
- Auth por telefone/OTP (`RN-001`), RBAC (`02`), multi-tenant por loja.
- APIs: contas, lojas, produtos/ofertas, busca, pedidos, atribuição, comissão.
- **Pronto quando:** API documentada cobre o fluxo cliente→pedido→comissão, com testes das regras `RN-037`, `RN-A20+`.

### Parte 3 — Web app cliente
- Busca/filtros (`RN-030`), página da loja, página do produto/oferta, carrinho (uma loja — `RN-033`), checkout com código de mecânico (`RN-035`), acompanhamento do pedido.
- **Pronto quando:** dá pra fazer um pedido real ponta a ponta no navegador.

### Parte 4 — Painel do lojista
- Onboarding da loja (`RN-003`), catálogo/ofertas (preço/estoque), fila de pedidos com a máquina de estados (`RN-037`), config de comissão (`RN-013`), relatórios básicos.
- **Pronto quando:** uma loja real de Itabaiana consegue se cadastrar e atender um pedido.

### Parte 5 — Mecânico (afiliado)
- Geração de código/link/QR, painel de indicações e comissões (`04`), verificação + Pix (`RN-004`), solicitação de saque.
- **Pronto quando:** um mecânico real indica, o pedido é atribuído e a comissão aparece com status correto.

### Parte 6 — App mobile
- Expo/React Native reaproveitando a lógica do web. Foco em cliente + mecânico. Push de status de pedido/comissão.
- **Pronto quando:** publicável em TestFlight/Play interno com o fluxo do MVP.

### Parte 7 — Pagamento + split
- Gateway com split (Pix/cartão), estados de `Pagamento`, split automático loja/mecânico/plataforma (`RN-047`), conciliação.
- **Pronto quando:** um pedido online paga e divide a comissão sem conciliação manual.

## Estratégia de validação (paralela ao código)

- **Antes da Parte 1:** validar **nome/marca** (busca INPI, domínio, Instagram, Play Store) — pendência aberta após o conflito com "Peça Aí".
- **Durante Parte 4/5:** recrutar **5–10 lojas** e **10–20 mecânicos** piloto em Itabaiana. O produto só vale com os dois lados presentes.
- **Métrica de sucesso do MVP:** primeiros pedidos reais com comissão de mecânico paga e transparente.

## Pendências em aberto (decisões do Vin)

- [ ] **Nome definitivo da marca** (Carretão é o favorito; confirmar disponibilidade). → ver [01](./01-visao-geral.md) e histórico do chat.
- [ ] Paleta oficial (Estrada/laranja é a aposta).
- [ ] Confirmar **stack** proposta em [08](./08-stack-tecnica.md).
- [ ] Definir se o MVP de pagamento começa 100% `NA_LOJA` (recomendado) ou já tenta Pix.
