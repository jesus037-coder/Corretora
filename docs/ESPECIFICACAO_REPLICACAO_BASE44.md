# Documento de Orientação para Replicação — "Corretora do Zé"

> **Objetivo:** Este documento orienta o Base44 a reconstruir, em um novo aplicativo, a mesma estrutura, funcionalidades e fluxos do aplicativo "Corretora do Zé" — um dashboard de investimentos brasileiro para gestão de carteira, proventos, metas, calculadora de juros compostos, DIRPF (declaração de imposto de renda), compras e vendas, e conta de usuário.

---

## 1. Visão Geral do Produto

O "Corretora do Zé" é um **dashboard de investimentos** voltado ao mercado brasileiro (B3). Ele permite que um administrador/corretor gerencie múltiplos clientes e que cada usuário acompanhe sua própria carteira. O sistema consolida posições por cliente, calcula KPIs de desempenho, projeta proventos (dividendos/JCP/rendimentos), gera dados para a declaração de IR (DIRPF), permite definir metas financeiras e simular juros compostos.

### Papéis de usuário (roles)
| Role | Descrição |
|------|-----------|
| `admin` | Acesso total. Vê a consolidação da corretora ("Zé") + todos os clientes individualmente. Pode lançar/editar movimentações, gerenciar usuários, definir limites por segmento. |
| `demo` | Mesmos privilégios de visualização do admin (vê todos os clientes). |
| `user` | Usuário comum. Vê apenas sua própria carteira (filtrada pelo seu `nome`). |

### Tipo de usuário (independente do role)
| tipo_usuario | Descrição |
|--------------|-----------|
| `autonomo` | Usa a plataforma de forma independente. Tem acesso ao Glossário Financeiro e ícones de ajuda no painel. |
| `assessorado` | Quer acompanhamento com assessor. Marca `interesse_assessoria = true`. |

---

## 2. Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 18 + Vite 6 (dev server na porta 5173 → exposta na porta 3000) |
| Gráficos | Chart.js 4 + react-chartjs-2 5 (Line, Bar, Doughnut) |
| Backend | Node.js + Express 4 (ESM, porta 8000 interna) |
| Auth | JWT (jsonwebtoke) + bcryptjs (hash de senha) |
| Banco de dados | PostgreSQL 16 |
| Cotações de mercado | Brapi API (brapi.dev) para ações/ETFs/BDRs; Binance API (fallback CoinGecko) para cripto |
| Origem única | Apenas a porta 3000 é pública; o frontend faz proxy de `/api` para o backend via `vite.config.js` |

### Dependências do frontend (`package.json`)
```
react, react-dom, chart.js, react-chartjs-2
dev: @vitejs/plugin-react, vite
```

### Dependências do backend (`package.json`)
```
express, cors, jsonwebtoken, bcryptjs, pg
dev: nodemon
```

---

## 3. Arquitetura

```
┌─────────────────────────────────────────────────┐
│  Browser (porta 3000)                            │
│  ┌───────────────────────────────────────────┐   │
│  │  React + Vite (dev server :5173)          │   │
│  │  proxy /api → http://api:8000             │   │
│  └──────────────────┬────────────────────────┘   │
└─────────────────────┼───────────────────────────┘
                      │
┌─────────────────────┼───────────────────────────┐
│  Express API (:8000, interno)                    │
│  /api/auth/*    — login, register, forgot/reset  │
│  /api/dashboard — consolidação + KPIs + gráficos │
│  /api/metas     — CRUD de metas                  │
│  /api/dirpf     — declaração de IR                │
│  /api/compras-vendas — lançamentos                │
│  /api/movimentacoes — CRUD de movimentações       │
│  /api/proventos-detalhe — detalhe de proventos    │
│  /api/profile   — dados do usuário                │
│  /api/admin/users — gestão de usuários (admin)    │
│  /api/limites   — limites por segmento            │
│  /api/clientes  — lista de clientes (sidebar)     │
│  /api/anos      — anos disponíveis                │
│  /api/sync      — sincronização manual            │
└─────────────────────┬───────────────────────────┘
                      │
┌─────────────────────┼───────────────────────────┐
│  PostgreSQL 16 (:5432)                            │
│  Tabelas: users, ativos, movimentacoes,          │
│           proventos, metas, limites_segmento,     │
│           reset_tokens                             │
└─────────────────────────────────────────────────┘
```

### Sync automático em background
- **`syncData()`** — a cada 30 min. Cria registros de `ativos` para tickers em `movimentacoes` que ainda não existem na tabela `ativos`.
- **`syncMarketData()`** — a cada 30 min. Atualiza o campo `valor` (preço atual) da tabela `ativos`:
  - Ações/ETFs/BDRs: Brapi API (apenas durante horário de mercado B3: seg–sex 10h–17h BRT).
  - Cripto: Binance API (preço em BRL); fallback CoinGecko se Binance falhar.
- Ambos rodam em `setInterval` após o startup do servidor.

---

## 4. Schema do Banco de Dados (PostgreSQL)

### `users`
| Coluna | Tipo | Notas |
|--------|------|-------|
| id | SERIAL PK | |
| email | TEXT UNIQUE NOT NULL | sempre lowercase |
| senha | TEXT NOT NULL | hash bcrypt |
| nome | TEXT NOT NULL | identifica a carteira do usuário (não editável) |
| role | TEXT NOT NULL DEFAULT 'user' | `admin`, `demo`, `user` |
| telefone | TEXT | |
| autorizacao_whatsapp | BOOLEAN DEFAULT false | |
| tipo_usuario | TEXT DEFAULT 'autonomo' | `autonomo`, `assessorado` |
| interesse_assessoria | BOOLEAN DEFAULT false | true se `assessorado` |

### `ativos`
| Coluna | Tipo | Notas |
|--------|------|-------|
| id | SERIAL PK | |
| ticker | TEXT NOT NULL | ex: PETR4, HGLG11 |
| segmento | TEXT NOT NULL | ex: Ações, FII, ETF, Cripto, BDR |
| area | TEXT | |
| valor | NUMERIC | preço atual de mercado (atualizado pelo marketSync) |
| preco_justo | NUMERIC | |
| variacao | TEXT | string formatada ex: "+5.23%" |
| cnpj | TEXT | usado na DIRPF |

### `movimentacoes`
| Coluna | Tipo | Notas |
|--------|------|-------|
| id | SERIAL PK | |
| cliente | TEXT NOT NULL | nome do cliente (relaciona com `users.nome`) |
| ticker | TEXT NOT NULL | sempre uppercase |
| segmento | TEXT NOT NULL | |
| cv | TEXT NOT NULL | `Compra` ou `Venda` (também aceita `C`/`COMPRA`) |
| quantidade | NUMERIC NOT NULL | |
| preco | NUMERIC NOT NULL | preço unitário |
| total | NUMERIC NOT NULL | qtd × preco (ou valor informado) |
| data | DATE NOT NULL | |

### `proventos`
| Coluna | Tipo | Notas |
|--------|------|-------|
| id | SERIAL PK | |
| ticker | TEXT NOT NULL | |
| segmento | TEXT NOT NULL | |
| data_com | DATE | data "ex-dividend" (corte) |
| data_pag | DATE | data de pagamento |
| tipo | TEXT | Dividendo, JCP, JSCP, etc. |
| valor_unit | NUMERIC NOT NULL | valor por cota/ação |

### `metas`
| Coluna | Tipo | Notas |
|--------|------|-------|
| id | SERIAL PK | |
| cliente | TEXT NOT NULL | |
| tipo | TEXT NOT NULL | `Patrimônio` ou `Renda` |
| valor | NUMERIC NOT NULL | valor alvo |
| aporte | NUMERIC DEFAULT 0 | aporte mensal |
| juros | NUMERIC DEFAULT 1 | rentabilidade mensal esperada (%) |
| ref_id | TEXT | |
| data | TIMESTAMPTZ DEFAULT now() | |

### `limites_segmento`
| Coluna | Tipo | Notas |
|--------|------|-------|
| id | SERIAL PK | |
| segmento | TEXT UNIQUE NOT NULL | |
| pct | NUMERIC NOT NULL DEFAULT 0 | percentual alvo |

### `reset_tokens`
| Coluna | Tipo | Notas |
|--------|------|-------|
| id | SERIAL PK | |
| user_id | INTEGER NOT NULL FK → users(id) ON DELETE CASCADE | |
| code | TEXT NOT NULL | código de 6 dígitos |
| expires_at | TIMESTAMPTZ NOT NULL | 15 min de validade |
| created_at | TIMESTAMPTZ DEFAULT now() | |

---

## 5. Backend — Endpoints da API

Todos os endpoints (exceto `/api/auth/*`) exigem header `Authorization: Bearer <token>`.

### 5.1 Autenticação

#### `POST /api/auth/register`
Body: `{ email, senha, nome, telefone, autorizacao_whatsapp, tipo_usuario }`
- Valida: email, senha, nome, telefone obrigatórios; `autorizacao_whatsapp` deve ser true; `tipo_usuario` deve ser `assessorado` ou `autonomo`.
- Hash bcrypt da senha. Cria usuário com `role = 'user'`.
- Retorna `{ token, user: { id, email, nome, role, tipo_usuario } }`.

#### `POST /api/auth/login`
Body: `{ email, senha }`
- Busca por email (lowercase). Compara bcrypt.
- Retorna `{ token, user: { id, email, nome, role, tipo_usuario } }`. Token expira em 7 dias.

#### `POST /api/auth/forgot-password`
Body: `{ email }`
- Gera código de 6 dígitos, armazena em `reset_tokens` (validade 15 min).
- Não revela se o email existe. (Em dev, retorna o código no JSON para o frontend.)

#### `POST /api/auth/reset-password`
Body: `{ email, code, novaSenha }`
- Valida código e expiração. Atualiza senha (hash). Deleta token.

### 5.2 Dashboard

#### `GET /api/dashboard?ano=&cliente=`
O endpoint central. Consolida a carteira e retorna tudo que a aba "Carteira" e "Proventos" precisam.

**Lógica de permissão:**
- `admin`/`demo`: se `cliente = '__ZE__'` ou omitido → consolidação de todos; senão filtra por cliente.
- `user`: sempre filtra pelo próprio `nome`.

**Retorno:**
```json
{
  "ano": 2026,
  "cliente": "__ZE__",
  "kpis": {
    "valorAplicado": 0,
    "valorMercado": 0,
    "lp": 0,
    "proventos": 0,
    "lpT": 0,
    "rentabilidade": 0
  },
  "evolucao": { "labels": [...], "data": [...] },
  "proventosMensais": { "labels": [...], "data": [...] },
  "proventosPorSegmento": { "labels": [...], "data": [...] },
  "segmentos": [
    {
      "nome": "Ações",
      "ativos": [
        { "ticker": "PETR4", "qtd": 100, "pm": 28.5, "aplicado": 2850,
          "mercado": 3200, "preco": 32.0, "lp": 350, "lpPct": 12.28,
          "ideal": 0, "variacao": "+12.28%" }
      ],
      "aplicado": 0, "mercado": 0, "lp": 0, "limite": 0
    }
  ],
  "nAtivos": 0,
  "nSegmentos": 0,
  "proventosDetalhe": { "Ações": [ { "tk": "PETR4", "m": [{ "q": 0, "u": "0.00", "s": 0 }] } ] },
  "evolucaoPorSegmento": { "labels": [...], "data": { "Ações": [...] } },
  "limites": { "Ações": 40 }
}
```

**Algoritmos-chave do dashboard:**

1. **Consolidação de carteira (`consolidar`)**: Agrupa movimentações por cliente, calcula PM (preço médio) por ticker dentro de cada cliente separadamente, depois soma apenas posições positivas no consolidado. Isso evita que vendas de um cliente cancelem compras de outro na visão consolidada da corretora.
   - Compra: `apl += total; q += quantidade`
   - Venda: `pm = apl/q; q -= quantidade; apl = q > 0 ? q * pm : 0`

2. **Lista de meses (`buildMonthList`)**: Para ano específico → 12 meses (Jan–Dez). Para "Todos os anos" (ano=0) → todos os meses do primeiro ao último com movimentação/provento, no formato `Mês/AA`.

3. **Proventos (`buildProv`)**: Para cada provento, calcula fator de ajuste fiscal:
   - ETF → fator 0.85
   - BDR ou tipo EXTERIOR → fator 0.70
   - JCP/JSCP → fator 0.85
   - Demais → fator 1.0
   - `valor_ajustado = valor_unit × fator`
   - Quantidade na data com (`data_com`): soma posições positivas por cliente até a data com.
   - `valor_total = cotas × valor_ajustado`

4. **Evolução mensal**: Soma cumulativa de aportes líquidos (compras somam, vendas subtraem) por mês.

5. **Evolução por segmento**: Mesma lógica, agrupada por segmento.

6. **Ideal por ativo**: `(valor_mercado_total × limite%_do_segmento) / n_ativos_no_segmento`.

7. **KPIs**:
   - `valorAplicado` = soma de `apl` de todas posições
   - `valorMercado` = soma de `q × preco_atual`
   - `lp` = mercado − aplicado
   - `proventos` = soma de todos proventos do período
   - `lpT` = lp + proventos
   - `rentabilidade` = (lpT / valorAplicado) × 100

### 5.3 Proventos Detalhe

#### `GET /api/proventos-detalhe?ano=&cliente=`
Retorna lista de proventos com: ticker, segmento, tipo, data_com, data_pag, mes, anoRef, cotas, valor_cota, valor_receber (com fator fiscal), valor_total. Inclui `mesesDisponiveis` e `tickersDisponiveis` para filtros.

### 5.4 Metas

#### `GET /api/metas?cliente=`
Retorna metas do cliente.

#### `POST /api/metas`
Body: `{ cliente, tipo, valor, aporte, juros }`. Cria meta.

### 5.5 DIRPF

#### `GET /api/dirpf?ano=&cliente=`
Gera dados para a declaração de Imposto de Renda:
- **Bens e Direitos**: Posição em 31/12/ano, agrupada por código da Receita:
  - BDR → grupo 04, código 04
  - FII → grupo 07, código 03
  - Fiagro → grupo 07, código 02
  - ETF → grupo 07, código 06
  - Ações (sufixo 3/4/5/11) → grupo 03, código 01
  - Outros → grupo 99, código 99
  - Cada item gera um texto descritivo: "Em 31/12/{ano}, possuía {qtd} ativo(s) de {ticker} (CNPJ: {cnpj}), adquirido(s) a custo médio de R$ {pm}, totalizando R$ {custo}."

- **Rendimentos**: Classificados em:
  - **Isentos**: FII/Fiagro → código 99; Dividendos → código 09
  - **Tributação exclusiva**: ETF → código 11; JSCP → código 10; Outros → código 99
  - Cada item gera texto descritivo para colar na declaração.

- **Totais**: `bens`, `isentos`, `exclusiva`.

### 5.6 Compras e Vendas

#### `GET /api/compras-vendas?ano=&cliente=`
- KPIs: totalInvestido, totalVendido, saldo.
- Gráfico: por mês (ano específico) ou por ano (todos).
- Lista de lançamentos (data, cliente, ticker, segmento, cv, quantidade, preco, total).

### 5.7 Movimentações

#### `POST /api/movimentacoes`
Body: `{ cliente, ticker, segmento, cv, quantidade, preco, total, data }`. Cria.

#### `PUT /api/movimentacoes/:id`
Edita movimentação existente.

### 5.8 Limites por Segmento

#### `GET /api/limites`
Retorna `{ limites: { segmento: pct } }`.

#### `PUT /api/limites`
Body: `{ segmento, pct }`. Upsert (INSERT ... ON CONFLICT DO UPDATE).

### 5.9 Perfil

#### `GET /api/profile`
Dados do usuário logado (sem senha).

#### `PUT /api/profile`
Atualiza email, telefone, autorizacao_whatsapp, tipo_usuario.

#### `PUT /api/profile/password`
Body: `{ senhaAtual, novaSenha }`. Troca senha (valida senha atual se fornecida).

### 5.10 Admin

#### `GET /api/admin/users` (admin/demo)
Lista todos os usuários.

#### `PUT /api/admin/users/:id` (admin/demo)
Altera `tipo_usuario` de um usuário.

### 5.11 Utilitários

#### `GET /api/clientes`
Lista clientes distintos (para sidebar do admin).

#### `GET /api/anos`
Lista anos com movimentações.

#### `POST /api/sync` (admin/demo)
Sincronização manual.

---

## 6. Frontend — Estrutura de Componentes

### 6.1 Fluxo de autenticação (`App.jsx`)
- Estado: `user` (do localStorage), `showRegister`, `showForgot`.
- Se `!user`: mostra `Login`, `Register`, ou `ForgotPassword`.
- `handleLogin(token, user)`: salva token e user no localStorage, seta user.
- `handleLogout()`: limpa localStorage, reseta estado.

### 6.2 Login (`Login.jsx`)
- Campos: email, senha.
- Botões: "Entrar", "Esqueci minha senha", "Não tem conta? Cadastre-se".
- Logo: "Corretora do Zé" + "Investment Dashboard".

### 6.3 Cadastro (`Register.jsx`)
- Campos: nome, sobrenome, email, senha, telefone (com máscara `(11) 98888-7777`), tipo de usuário (assessorado/autonomo), checkbox de autorização WhatsApp.
- Validação: telefone 10–11 dígitos, autorização obrigatória, tipo obrigatório.
- Envia `nome = "Nome Sobrenome"`.

### 6.4 Recuperação de Senha (`ForgotPassword.jsx`)
- Step 1: email → gera código (mostrado em dev).
- Step 2: código + nova senha + confirmação → redefinir.

### 6.5 Dashboard (`Dashboard.jsx`) — Componente Principal

**Layout:**
- **Sidebar** (esquerda): logo "Corretora do Zé", role do usuário, tag de tipo (Assessorado/Autônomo), seletor de ano (inclui "Todos os anos"), lista de clientes (admin/demo) ou nome do usuário (user), botão "Sair".
- **Topbar**: hamburger (toggle sidebar no mobile), título do cliente selecionado, meta (ano), botão "+ Lançamento", botão de tema (claro/escuro).
- **Tabs bar**: 7 abas.
- **Content**: renderiza a aba ativa.

**Estado global:**
- `ano` (ano selecionado, 0 = todos), `anos` (lista), `clientes` (lista), `clienteSel` (cliente selecionado, `__ZE__` = consolidação), `data` (dados do dashboard), `loading`, `error`, `theme` (dark/light), `sidebarOff` (mobile), `aba` (tab ativa), `movModal` (modal de movimentação), `refreshKey`.

**Comportamento:**
- Ao montar: busca anos e (se admin) clientes.
- Ao mudar ano/cliente/refreshKey: busca `/api/dashboard`.
- `isAdmin` = role admin ou demo.
- `isAutonomo` = tipo_usuario === 'autonomo'.
- `latest` (useMemo): calcula mercado, rendimento último mês/ano, dividend yield para alimentar Metas e Calculadora.
- Se `isAutonomo`: renderiza o Glossário (FAB).

### 6.6 Abas (Tabs)

#### Aba 1: Carteira (`CarteiraTab.jsx`)
- **KPIs**: Valor Aplicado, Valor de Mercado, L/P Total, Proventos, Rentabilidade.
- **Gráfico de evolução** (Line): patrimônio total ou por segmento selecionado. Em "Todos os anos" tem 3 modos de visualização: Meses, Anos (último valor de cada ano), Por ano (múltiplas linhas uma por ano).
- **Cards de segmento** (acordeão): cada card mostra KPIs do segmento (aplicado, mercado, L/P, nº ativos, limite atual vs. alvo com botão de editar inline). Ao expandir, tabela de ativos com colunas: Ativo, QTD, PM, Vl Aplicado, Preço, VAR%, L/P, Vl Atual, % Cart., Ideal. Tabela ordenável por coluna.
- **Limite por segmento**: popup inline para editar o % alvo. Salva via `PUT /api/limites`.

#### Aba 2: Proventos (`ProventosTab.jsx`)
- **KPIs**: Proventos último mês, Proventos do período, DY mês, DY período, ROI.
- **Gráfico de barras** (Bar): distribuição mensal, com cores distinguindo "Recebido" (sólido) vs "A Receber" (claro) com base na data de pagamento vs. hoje. Em "Todos os anos": modos Meses/Anos/Por ano.
- **Doughnut**: por segmento; ao expandir um segmento na tabela, mostra por ativo.
- **Tabela de proventos**: por segmento (acordeão) → por ativo → por mês. Em "Todos os anos": tabela ano × ativo com totais.
- **Proventos a Receber** (`ProventosDetalhe.jsx`): tabela detalhada com filtros (mês, ano, ticker). Colunas: Ativo, Segmento, Tipo, Data Com, Data Pag, Cotas, Valor/Cota, Receber/Cota, Total. Default: mês atual.

#### Aba 3: Metas (`MetasTab.jsx`)
- **Formulário**: tipo (Patrimônio/Renda), valor alvo, aporte mensal, rentabilidade mensal (%) — só para Patrimônio. Pré-visualização ao digitar.
- **Cards de meta**: barra de progresso (% atingido), valores (atual, meta, faltam), badge "Meta atingida!" se 100%.
  - Patrimônio: calcula tempo estimado (meses) para atingir via simulação de juros compostos (`calcTempoMeses`).
  - Renda: compara rendimento do último mês com a meta de renda mensal.

#### Aba 4: Calculadora (`CalculadoraTab.jsx`)
- **Inputs**: capital inicial (pré-preenchido com valor de mercado da carteira), aporte mensal, taxa de juros (pré-preenchida com DY real), período em meses, tipo de taxa (mensal/anual com equivalência automática).
- **KPIs**: Montante Final, Total Investido, Juros Acumulados, Renda Mensal Final, Taxa Anual Equivalente, Multiplicador.
- **Gráfico** (Line): Montante, Total Investido, Juros Acumulados ao longo do tempo.
- **Tabela ano a ano**: ano, mês, aportes no ano, juros no ano, total investido, montante, renda mensal.

#### Aba 5: DIRPF (`DirpfTab.jsx`)
- Gera declaração de IR para o ano selecionado (não funciona em "Todos os anos").
- **3 seções retráteis**:
  1. Bens e Direitos (verde) — grupos por código da Receita, cada item com texto descritivo e botão "Copiar".
  2. Rendimentos Isentos (verde) — dividendos, FII/Fiagro.
  3. Tributação Exclusiva (laranja) — JSCP, ETF, outros.
- Cada item tem pill com ticker, CNPJ, valor, e texto descritivo copiável.

#### Aba 6: Compras e Vendas (`ComprasVendasTab.jsx`)
- **KPIs**: Total Investido, Total Vendido, Saldo.
- **Gráfico de barras**: investido (verde) × vendido (vermelho) por mês ou por ano.
- **Filtros**: ativo, operação (compra/venda), mês, ano (se todos), data de, data até, botão limpar.
- **Tabela de lançamentos**: data, cliente, ativo, segmento, operação, quantidade, preço, total, botão editar (abre MovimentacaoModal em modo edit).

#### Aba 7: Minha Conta (`ContaTab.jsx`)
- **Meus Dados**: tabela com nome (não editável), email, tipo de conta, telefone, autorização WhatsApp. Botão editar (email + telefone).
- **Autorização WhatsApp**: toggle ativar/desativar.
- **Trocar Senha**: senha atual (opcional), nova senha, confirmação.
- **Usuários** (admin/demo): tabela de todos os usuários com nome, email, tipo, WhatsApp, telefone, e select para alterar tipo (autônomo/assessorado).

### 6.7 Componentes Auxiliares

#### `MovimentacaoModal.jsx`
Modal para criar/editar lançamento. Campos: cliente (só admin, desabilitado em edit), ticker, segmento, operação (compra/venda), data, quantidade, preço, total (auto = qtd × preço se vazio).

#### `ProventosDetalhe.jsx`
Tabela de proventos a receber com filtros (mês, ano, ticker). Default: mês atual.

#### `Glossario.jsx` (só autônomos)
FAB (botão flutuante 📖) que abre modal com glossário de 16 termos financeiros, com busca.

#### `HelpIcon.jsx`
Ícone de ajuda contextual.

### 6.8 Utilitários compartilhados (`shared.jsx`)
- `MES`: array de abreviações de meses ['Jan', 'Fev', ...].
- `PAL`: paleta de cores para gráficos.
- `M(v)`: formata número como moeda BRL (`R$ 1.234,56`).
- `KpiCard`: componente de card de KPI com label, value, hint, estado bad/valCls.

### 6.9 Camada de API (`api.js`)
- `request(path, opts)`: wrapper de fetch com token JWT do localStorage, Content-Type JSON, tratamento de erro.
- Todas as funções de API (login, register, fetchDashboard, etc.) usam este wrapper.

---

## 7. Tema (Dark/Light)

- Toggle no topbar (☀ / ☾).
- Aplica `data-theme="dark"` ou `data-theme="light"` no `<html>`.
- Variáveis CSS (`--surface`, `--panel`, `--border`, `--accent`, `--muted`, `--orange`, `--red`, etc.) definidas em `styles.css` para cada tema.
- Cores dos gráficos adaptam-se via `chartColors` (grid color e tick color).

---

## 8. Integrações Externas

### Brapi API (cotações de ações/ETFs/BDRs)
- URL base: `https://brapi.dev/api/quote/{tickers}`
- Token: variável de ambiente `BRAPI_API_KEY` (obter em https://brapi.dev/dashboard)
- Atualiza o campo `valor` da tabela `ativos`.
- Só executa durante horário de mercado B3 (seg–sex, 10h–17h BRT).
- Free plan: 1 ticker por requisição (`BATCH_SIZE = 1`).

### Binance API (cotações de cripto)
- URL: `https://data-api.binance.vision/api/v3/ticker/price?symbols=["BTCBRL","ETHBRL",...]`
- Preços já em BRL.
- Fallback: CoinGecko (`https://api.coingecko.com/api/v3/simple/price`) se Binance falhar.
- Mapeamento ticker → CoinGecko ID: BTC→bitcoin, ETH→ethereum, SOL→solana, etc.

### Google Sheets (apenas seed inicial)
- Na primeira inicialização (banco vazio), `seed.js` busca dados de Google Sheets públicos (CSV) para popular users, ativos, movimentacoes, proventos, metas.
- Em boots subsequentes, os dados são 100% locais (PostgreSQL) — nenhuma dependência de Sheets.

---

## 9. Credenciais de Acesso (seed inicial)

| Tipo | Email/Login | Senha |
|------|-------------|-------|
| Admin | gabriel.321jesus@gmail.com | 123126 |
| Demo | Teste | t@2026 |
| Usuário | Kaue.rogerio@outlook.com | 7259034 |

---

## 10. Secrets / Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `DATABASE_URL` | Sim (inline em compose) | `postgresql://ze:zecorretora2026@db:5432/corretora` |
| `JWT_SECRET` | Sim (inline em compose) | Secret para assinar tokens JWT |
| `BRAPI_API_KEY` | Opcional | Chave da Brapi para cotações automáticas. Sem ela, o marketSync pula a atualização de ações (cripto ainda funciona via Binance). |

---

## 11. Checklist de Replicação

Ao reconstruir este app, garanta que cada item abaixo está implementado:

### Autenticação
- [ ] Login com email/senha + JWT
- [ ] Cadastro com nome, sobrenome, email, senha, telefone (máscara), tipo de usuário, autorização WhatsApp
- [ ] Recuperação de senha por código de 6 dígitos (validade 15 min)
- [ ] 3 roles: admin, demo, user
- [ ] 2 tipos de usuário: autonomo, assessorado

### Dashboard
- [ ] Sidebar com seletor de ano (inclui "Todos os anos") e lista de clientes (admin)
- [ ] Topbar com botão de lançamento e toggle de tema
- [ ] 7 abas navegáveis
- [ ] Consolidacão de carteira por cliente (PM correto, posições positivas somadas)
- [ ] KPIs: valor aplicado, mercado, L/P, proventos, rentabilidade
- [ ] Gráfico de evolução do patrimônio (Line) com modos Meses/Anos/Por ano
- [ ] Cards de segmento acordeão com tabela ordenável e limite editável

### Proventos
- [ ] Gráfico de barras mensal com distinção Recebido/A Receber
- [ ] Doughnut por segmento → por ativo
- [ ] Tabela por segmento → ativo → mês (ou ano × ativo em "Todos")
- [ ] Tabela de proventos a receber com filtros (mês, ano, ticker)
- [ ] Fatores fiscais: ETF 0.85, BDR/Exterior 0.70, JCP 0.85

### Metas
- [ ] Formulário com tipo (Patrimônio/Renda), valor, aporte, rentabilidade
- [ ] Pré-visualização ao digitar
- [ ] Cards com barra de progresso, tempo estimado (juros compostos)

### Calculadora
- [ ] Inputs: capital, aporte, taxa, período, tipo (mensal/anual)
- [ ] KPIs: montante, investido, juros, renda mensal, taxa anual equiv, multiplicador
- [ ] Gráfico de evolução projetada
- [ ] Tabela ano a ano

### DIRPF
- [ ] Bens e Direitos agrupados por código da Receita
- [ ] Rendimentos Isentos e Tributação Exclusiva
- [ ] Textos descritivos copiáveis por item
- [ ] Só funciona com ano específico

### Compras e Vendas
- [ ] KPIs: investido, vendido, saldo
- [ ] Gráfico de barras investido × vendido
- [ ] Filtros: ativo, operação, mês, ano, data de/até
- [ ] Tabela de lançamentos com botão editar

### Conta
- [ ] Meus dados (edição de email/telefone, nome bloqueado)
- [ ] Toggle de autorização WhatsApp
- [ ] Troca de senha
- [ ] Lista de usuários (admin) com alteração de tipo

### Movimentações
- [ ] Modal de criar/editar lançamento
- [ ] CRUD: POST e PUT

### Glossário (autônomos)
- [ ] FAB com modal de 16 termos financeiros e busca

### Infra
- [ ] PostgreSQL com 7 tabelas
- [ ] Sync automático de cotações (Brapi + Binance/CoinGecko) a cada 30 min
- [ ] Seed inicial opcional (Google Sheets na primeira boot)
- [ ] Tema dark/light
- [ ] Responsivo (sidebar colapsa no mobile)

---

## 12. Observações Importantes

1. **Origem única**: O frontend faz proxy de `/api` para o backend via Vite. Não há CORS entre origens no fluxo normal (CORS está habilitado com `origin: true` mas não é necessário no setup single-origin).

2. **Nome do usuário = identificador de carteira**: O campo `nome` em `users` é usado como filtro de cliente em `movimentacoes`. Por isso não é editável. O nome no cadastro é "Nome Sobrenome" (concatenado).

3. **`__ZE__`**: Valor especial que representa a consolidação de todos os clientes na visão do admin.

4. **Fatores fiscais de proventos**: São aplicados tanto no cálculo de proventos do dashboard quanto no DIRPF. Devem ser consistentes.

5. **Consolidação por cliente**: O algoritmo `consolidar` processa cada cliente separadamente e depois soma posições positivas. Replicar exatamente este comportamento para evitar resultados incorretos na visão consolidada.

6. **Horário de mercado B3**: A sincronização de cotações de ações só ocorre seg–sex 10h–17h (America/Sao_Paulo). Cripto sincroniza a qualquer hora.

7. **Persistência de dados**: Após o seed inicial, todos os dados são locais no PostgreSQL. O app é 100% self-hosted sem dependência de Google Sheets.

8. **Seed idempotente**: `seed.js` verifica se cada tabela já tem dados antes de buscar do Sheets. Se já tem dados, pula o fetch daquela tabela.

---

*Documento gerado a partir da análise completa do código-fonte do aplicativo "Corretora do Zé".*
