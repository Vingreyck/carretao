# 03 — Regras de Negócio

> Cada regra tem um **ID estável** (`RN-XXX`). Cite o ID em código, PRs e testes. Não renumere regras existentes — apenas adicione novas ou marque como `(revogada)`.

Convenções:
- **DEVE / NÃO DEVE** = obrigatório.
- **PODE** = opcional / configurável.
- Valores entre `« »` são **parâmetros de plataforma** (configuráveis pelo `PLATAFORMA_ADMIN`), com um padrão sugerido.

---

## 1. Conta e Cadastro

- **RN-001** — Toda conta DEVE ser identificada por **telefone (WhatsApp) verificado por OTP**. E-mail é opcional. (Público caminhoneiro usa muito WhatsApp, pouco e-mail.)
- **RN-002** — O auto-cadastro PODE criar contas com papel `CLIENTE` e/ou `MECANICO`. Papéis de loja e de plataforma NÃO DEVEM ser auto-concedidos.
- **RN-003** — Cadastro de **loja** DEVE informar CNPJ, razão/nome fantasia, endereço e responsável; entra como `PENDENTE` até aprovação da plataforma (ver RN-050).
- **RN-004** — Um `MECANICO` só DEVE poder **sacar** comissão após verificação de identidade (CPF + selfie/documento) e cadastro de **chave Pix**. Antes disso ele pode indicar e **acumular**, mas não sacar.
- **RN-005** — A conta DEVE aceitar os Termos de Uso e a Política de Privacidade (LGPD) no cadastro, com registro de data/versão aceita.

## 2. Loja

- **RN-010** — Uma loja DEVE ter ao menos um `LOJA_ADMIN`. PODE ter vários operadores.
- **RN-011** — A loja DEVE definir **horário de funcionamento** e **raio/área de atendimento**. Fora do horário, a loja aparece como **Fechada** (aceita pedido como "agendado", ver RN-031).
- **RN-012** — A loja define se oferece **retirada na loja**, **entrega**, ou ambos (RN-040+).
- **RN-013** — A loja DEVE definir a **comissão oferecida ao mecânico** (`%` sobre o valor dos itens), respeitando o mínimo e o máximo da plataforma «mín 0% / máx 20% / padrão 5%» (ver [04](./04-fluxo-de-comissao-mecanico.md)).
- **RN-014** — Loja `SUSPENSA` ou `PENDENTE` NÃO DEVE aparecer em buscas nem receber pedidos.

## 3. Catálogo e Produtos

- **RN-020** — Um **produto** DEVE ter: título, categoria, marca/fabricante, e PODE ter **código da peça** (part number) e **aplicação** (modelos de caminhão compatíveis).
- **RN-021** — A **disponibilidade** é por loja: cada loja tem seu próprio **preço** e **quantidade em estoque** para um produto (relação Produto × Loja = "oferta").
- **RN-022** — Produto com estoque `0` PODE continuar listado como **"Sob consulta"** se a loja permitir; senão fica oculto da busca.
- **RN-023** — O catálogo PODE usar um **produto canônico** compartilhado (mesma peça vendida por várias lojas) para permitir **comparação de preço** entre lojas. Onde não houver canônico, vale o item livre cadastrado pela loja.
- **RN-024** — Preço DEVE ser em BRL, com 2 casas. Promoção PODE ter preço "de/por" e validade.
- **RN-025** — É **proibido** cadastrar item ilícito, recall/peça de procedência duvidosa sinalizada, ou conteúdo que não seja auto-peça/insumo de caminhão (moderação — RN-051).

## 4. Busca e Descoberta

- **RN-030** — A busca DEVE permitir filtrar por: **modelo de caminhão / aplicação**, **categoria**, **código da peça**, **proximidade** e **disponibilidade em estoque**.
- **RN-031** — A ordenação padrão PODE combinar proximidade + disponibilidade + relevância. Lojas patrocinadas (destaque pago) DEVEM ser claramente marcadas como **"Patrocinado"** (RN-070).
- **RN-032** — A busca DEVE sempre mostrar **preço** e **se tem em estoque** antes do cliente entrar no item.

## 5. Pedido (Carrinho → Checkout)

- **RN-033** — Um **pedido** é sempre de **uma única loja** (carrinho não mistura lojas). Comprar de duas lojas = dois pedidos.
- **RN-034** — No checkout o cliente DEVE escolher **retirada** ou **entrega** (entre as opções habilitadas pela loja).
- **RN-035** — O cliente PODE informar um **código de mecânico** no checkout (ou ter chegado por link/QR do mecânico). A atribuição segue as regras de [04 — Comissão do Mecânico](./04-fluxo-de-comissao-mecanico.md).
- **RN-036** — O pedido DEVE registrar um **snapshot** de preços e da comissão vigente no momento da compra (mudança futura de preço/comissão não altera pedido já feito).
- **RN-037** — Ciclo de vida do pedido (máquina de estados):

  ```
  CRIADO → CONFIRMADO → EM_PREPARO → PRONTO/ENVIADO → CONCLUIDO
                     ↘ CANCELADO        ↘ DEVOLVIDO (pós-conclusão, dentro do prazo)
  ```
  - `CRIADO`: cliente finalizou; aguarda a loja aceitar.
  - `CONFIRMADO`: loja aceitou e reservou estoque.
  - `EM_PREPARO`: separando.
  - `PRONTO` (retirada) / `ENVIADO` (entrega).
  - `CONCLUIDO`: entregue/retirado. **Dispara o relógio do prazo de devolução** (RN-061).
  - `CANCELADO`: por loja (sem estoque, etc.) ou cliente (antes de `EM_PREPARO`), com motivo.
  - `DEVOLVIDO`: devolução aceita dentro do prazo.

- **RN-038** — Cancelamento DEVE devolver o estoque reservado e **estornar** qualquer comissão associada (ver RN-061).
- **RN-039** — A loja DEVE aceitar/recusar o pedido em até «30 min» no horário de funcionamento; estourado o prazo, o pedido PODE ser auto-cancelado e o cliente avisado.

## 6. Entrega e Retirada

- **RN-040** — **Retirada:** o pedido `PRONTO` gera um **código de retirada** que a loja confirma na entrega ao cliente.
- **RN-041** — **Entrega:** no MVP a entrega é **responsabilidade da loja** (frota própria/motoboy da loja). Integração com logística de terceiros é fase futura.
- **RN-042** — Taxa de entrega, prazo e área DEVEM ser definidos pela loja e exibidos **antes** do cliente confirmar.

## 7. Pagamento

> No **MVP (Fase 1)** o pagamento PODE ser **fora do app** ("pague na loja / na retirada") para reduzir atrito e dependência de gateway. O **split automático de comissão** (Fase 2) exige pagamento in-app.

- **RN-045** — Todo pedido DEVE ter um **método de pagamento** declarado: `NA_LOJA` (offline) ou `ONLINE` (Pix/cartão via gateway, Fase 2).
- **RN-046** — Em `NA_LOJA`, a loja DEVE **confirmar o recebimento** para o pedido poder ir a `CONCLUIDO`. A comissão do mecânico só vira **a pagar** após essa confirmação (ver RN-060).
- **RN-047** — Em `ONLINE`, o pagamento DEVE usar gateway com **split** (plataforma, loja e — quando houver — comissão do mecânico), conforme [04](./04-fluxo-de-comissao-mecanico.md) e [06 — Monetização](./06-monetizacao.md).
- **RN-048** — Reembolso/estorno DEVE seguir a regra de cancelamento/devolução e **reverter** repasses de comissão proporcionalmente (RN-061).

## 8. Moderação e Confiança

- **RN-050** — Toda **loja** e todo **mecânico** que vai sacar passam por **aprovação manual** da plataforma antes de operar/sacar.
- **RN-051** — A plataforma PODE **suspender** loja, produto ou mecânico por fraude, item proibido, abuso de comissão ou nota baixa recorrente, com registro de motivo.
- **RN-052** — **Avaliações:** só PODE avaliar quem **concluiu** um pedido (loja e/ou mecânico). Nota de 1 a 5 + comentário opcional. (Evita avaliação fake.)
- **RN-053** — Loja PODE responder publicamente a avaliações; não PODE editar ou apagar a avaliação do cliente.
- **RN-054** — Denúncias (preço abusivo, peça errada, calote de comissão) entram numa fila de moderação com SLA «48h».

## 9. Destaque / Patrocínio

- **RN-070** — Loja PODE pagar para ter **destaque** em buscas/categorias. Resultado patrocinado DEVE ser rotulado **"Patrocinado"** e nunca se passar por orgânico.
- **RN-071** — Destaque NÃO DEVE alterar preço nem disponibilidade reais mostrados ao cliente.

## 10. LGPD e Dados

- **RN-080** — Dados pessoais DEVEM ser tratados conforme a LGPD: finalidade declarada, consentimento no cadastro, e direito de exclusão de conta.
- **RN-081** — Documentos de verificação (CPF, selfie) DEVEM ser armazenados de forma cifrada e com acesso restrito a `PLATAFORMA_ADMIN`/`SUPORTE` em auditoria.
- **RN-082** — Toda ação financeira (comissão, repasse, estorno, saque) DEVE gerar **registro de auditoria** imutável (append-only).

---

### Parâmetros de plataforma (defaults)

| Parâmetro | Padrão | Onde se aplica |
|-----------|--------|----------------|
| Comissão do mecânico (mín/máx/padrão) | 0% / 20% / 5% | RN-013 |
| Take rate da plataforma | a definir (ex.: 0% no MVP) | [06](./06-monetizacao.md) |
| Prazo da loja aceitar pedido | 30 min | RN-039 |
| Janela de devolução | 7 dias | RN-061 |
| Janela de atribuição do mecânico | 7 dias (last-touch) | [04](./04-fluxo-de-comissao-mecanico.md) |
| SLA de moderação | 48h | RN-054 |
