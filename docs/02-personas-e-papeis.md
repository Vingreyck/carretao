# 02 — Personas e Papéis

## Personas (quem usa)

### 1. Cliente — "Seu Zé, o caminhoneiro"
- Caminhoneiro autônomo, frotista pequeno ou motorista empregado.
- **Quer:** achar a peça certa pro modelo do caminhão dele, rápido, no melhor preço e perto.
- **Dor:** caminhão parado é prejuízo; perde tempo ligando/andando atrás de peça.
- **Contexto de uso:** celular, muitas vezes na beira da estrada, na oficina ou no pátio.
- **Sensível a:** preço, disponibilidade real ("tem em estoque mesmo?"), proximidade.

### 2. Lojista — "Dona Auto Peças Central"
- Dono ou gerente de loja de auto-peças de caminhão em Itabaiana.
- **Quer:** vender mais, atrair os mecânicos pra puxarem venda pra ele, aparecer pra quem busca.
- **Dor:** depende de balcão e boca-a-boca; não tem vitrine digital nem dado de venda.
- **Contexto:** balcão da loja, computador ou celular; pode ter ou não sistema de estoque.
- **Sensível a:** custo da plataforma, esforço de cadastro, quantos clientes/mecânicos a plataforma traz.

### 3. Mecânico — "Bigode, o mecânico" (o canal de vendas)
- Mecânico de oficina que orienta o cliente sobre qual peça comprar e onde.
- **Quer:** ganhar a comissão dele de forma justa, rastreada e sem calote.
- **Dor:** hoje a comissão é informal, depende da boa vontade da loja, sem comprovação.
- **Contexto:** oficina, celular, mão ocupada.
- **Sensível a:** facilidade de indicar (código/link/QR), transparência do quanto vai receber e quando.

> ⚠️ **Regra de ouro do negócio:** o mecânico é o **canal de vendas**, não um detalhe. A formalização da comissão dele é o diferencial competitivo (ver [04 — Comissão do Mecânico](./04-fluxo-de-comissao-mecanico.md)).

### 4. Operador da Plataforma — "Carretão (nós)"
- Equipe Carretão: faz onboarding de lojas e mecânicos, modera, dá suporte, acompanha métricas e repasses.

## Papéis no sistema (RBAC)

Um **usuário** (conta) pode ter um ou mais papéis. Papéis definem o que se pode fazer.

| Papel | Código | Pode | Não pode |
|-------|--------|------|----------|
| **Cliente** | `CLIENTE` | Buscar, ver lojas/peças, fazer pedido, avaliar, aplicar código de mecânico | Gerenciar loja ou estoque |
| **Mecânico** | `MECANICO` | Tudo de cliente + ter código de indicação, ver painel de comissões, sacar | Mexer no catálogo da loja |
| **Lojista (dono)** | `LOJA_ADMIN` | Gerenciar a própria loja, catálogo, estoque, preço, pedidos, comissão oferecida, equipe da loja, ver relatórios | Acessar dados de outra loja |
| **Operador de loja** | `LOJA_OPERADOR` | Operar pedidos e estoque da loja onde trabalha | Mudar plano/financeiro da loja |
| **Admin da Plataforma** | `PLATAFORMA_ADMIN` | Tudo: moderar, configurar taxas, gerenciar repasses, suporte | — |
| **Suporte** | `PLATAFORMA_SUPORTE` | Ver e ajudar contas, sem mexer em financeiro/taxas | Configurar take rate / repasses |

### Regras de papel

- **RP-01:** Uma conta pode acumular `CLIENTE` + `MECANICO` (o mecânico também compra).
- **RP-02:** `MECANICO` exige verificação de identidade antes de habilitar **saque** de comissão (ver [04](./04-fluxo-de-comissao-mecanico.md)).
- **RP-03:** `LOJA_ADMIN` e `LOJA_OPERADOR` são sempre vinculados a **uma loja específica** (multi-tenant: dados isolados por loja).
- **RP-04:** Conflito de interesse — uma conta **não** pode receber comissão de mecânico sobre o próprio pedido como cliente (ver RN de antifraude em [04](./04-fluxo-de-comissao-mecanico.md)).
- **RP-05:** Papéis de plataforma (`PLATAFORMA_*`) são concedidos manualmente, nunca por auto-cadastro.

## Modelo multi-tenant

Cada **loja** é um tenant: seus produtos, estoque, preços, pedidos e equipe são isolados. A plataforma enxerga tudo (para moderar e repassar). Clientes e mecânicos são **globais** (atravessam lojas) — é o que permite o mecânico indicar qualquer loja parceira.
