# 09 — Glossário

Termos do negócio e da estrada usados na documentação e no código.

| Termo | Significado |
|-------|-------------|
| **Carretão** | Nome do produto/marca. Marketplace hiperlocal de auto-peças para caminhões. |
| **Carretinho** | Mascote (caminhãozinho animado, boné de aba reta estilo piseiro). |
| **Cliente** | Quem compra a peça: caminhoneiro autônomo, frotista ou motorista. |
| **Lojista / Loja** | Loja de auto-peças vendedora. É um **tenant** (dados isolados). |
| **Mecânico (Afiliado)** | Profissional que indica a peça/loja e ganha **comissão** rastreada. É o **canal de vendas**. |
| **Plataforma** | O Carretão (nós): opera, modera, concilia, repassa. |
| **Produto (canônico)** | A peça em si, compartilhável entre lojas (permite comparar preço). |
| **Oferta** | A peça **em uma loja específica**, com preço e estoque próprios. (Produto × Loja) |
| **Aplicação** | Modelos de caminhão compatíveis com a peça. |
| **Part number / Código da peça** | Código do fabricante que identifica a peça. |
| **Pedido** | Compra de uma loja só, com seu ciclo de estados (`RN-037`). |
| **Atribuição** | Vínculo entre um pedido e o mecânico que o originou (`RN-A`). |
| **Last-touch** | Modelo de atribuição: vale o **último** mecânico tocado dentro da janela. |
| **Janela de atribuição** | Prazo (7d) em que o toque do mecânico ainda atribui a venda. |
| **Comissão** | Valor que a **loja** paga ao mecânico sobre os itens (a loja define o %). |
| **Take rate** | Fração que a **plataforma** retém (de transação e/ou comissão). MVP = 0%. |
| **Split** | Divisão automática do pagamento (loja/mecânico/plataforma) no gateway (Fase 2). |
| **Snapshot** | Cópia congelada de preço/comissão no momento do pedido (imutabilidade). |
| **Janela de devolução** | Prazo (7d) após conclusão em que o pedido pode ser devolvido e a comissão estornada. |
| **GMV** | _Gross Merchandise Value_ — volume total transacionado. |
| **Multi-tenant** | Arquitetura em que cada loja tem seus dados isolados, num mesmo sistema. |
| **RBAC** | _Role-Based Access Control_ — permissões por papel. |
| **OTP** | _One-Time Password_ — código de verificação (login por WhatsApp/SMS). |
| **MEI** | _Microempreendedor Individual_ — formato comum de formalização do autônomo. |
| **RN-XXX** | Identificador estável de uma regra de negócio (ver [03](./03-regras-de-negocio.md)). |
| **ADR** | _Architecture Decision Record_ — registro curto de decisão técnica (ver [08](./08-stack-tecnica.md)). |
