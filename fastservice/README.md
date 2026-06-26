# FastService 🛠️⚡

Marketplace de serviços (limpeza, montagem, manutenção, pintura, jardinagem) — app mobile-first feito em **React + Vite**.
Projeto da disciplina (Atitus Educação). Todas as telas dos mockups foram implementadas com visual próprio, rotas e funcionalidades completas.

## ✨ O que foi usado (requisitos da atividade)

- **React** + **Vite** (React 19)
- **Hooks** — `useState`, `useEffect`, `useRef`, `useCallback`
- **React Router** — rotas públicas, protegidas e tela cheia (`src/App.jsx`)
- **Context API** — sistema de *toasts* (`src/context/ToastContext.jsx`)
- **Zustand** — 3 stores: autenticação (`authStore`), mapa/pontos (`mapStore`) e preferências (`prefsStore`), com `persist`
- **Google Maps** — `@react-google-maps/api` na tela de Mapa (marcadores, clique para adicionar ponto, recentralizar)

## 🗺️ Telas implementadas (21+)

Login · Cadastro · Home · Busca · Detalhe do serviço · Confirmação do pedido ·
Chamados (Histórico / Peça de novo / Reclamações) · Abrir chamado · Abrir reclamação ·
Mapa · Lista de conversas · Conversa (chat) · Notificações · Perfil ·
Configurações + subtelas (Privacidade · Conta · Pagamentos · Notificações · Ajuda · Sobre)

### Personalizações além do mockup
Tela de cadastro com medidor de força de senha, card de "pedido em andamento" na Home, busca com filtros por categoria, FAB animado, *toasts*, *skeletons*/spinners, animações de transição, tela de Perfil com estatísticas, respostas automáticas no chat, e serviços extras (pintura, jardinagem).

## 🚀 Rodando localmente

```bash
npm install
cp .env.example .env   # edite as variáveis (veja abaixo)
npm run dev
```

## 🔑 Variáveis de ambiente (`.env`)

```env
VITE_GOOGLE_MAPS_API_KEY=sua_chave_do_google_maps
VITE_API_URL=                      # vazio = MODO DEMO (dados mock + localStorage)
```

> ⚠️ **NUNCA** suba o arquivo `.env` para o Git. Ele já está no `.gitignore`.
> A chave do Google Maps **não pode** ir para o repositório — configure-a apenas no `.env` local e nas variáveis de ambiente do Netlify.

### Modo demonstração
Com `VITE_API_URL` vazio, o app roda 100% sem backend (login aceita qualquer e-mail/senha, pontos salvos no `localStorage`). Assim dá para testar tudo antes de plugar a API.

## 🔌 Integrando a SUA API

Toda a comunicação fica em **`src/lib/api.js`**. Para usar sua API:

1. Defina `VITE_API_URL` (ex.: `https://sua-api.onrender.com`) no `.env` / Netlify.
2. Ajuste os *paths* conforme o seu Swagger. Os pontos a conferir são:
   - `POST /login` → retorna `{ token }`
   - `POST /pessoas` → cadastro
   - `GET /pontos` → lista pontos do usuário (header `Authorization: Bearer <token>`)
   - `POST /pontos` → cadastra ponto · `DELETE /pontos/:id` → remove
3. A função `request()` já envia o token automaticamente quando `auth: true`. O `listPoints` já normaliza campos `nome/latitude/longitude` → `name/lat/lng`.

## ☁️ Deploy no Netlify

1. Suba o repositório no GitHub (**sem o `.env`**).
2. No Netlify: *Add new site → Import from GitHub*.
3. Build command: `npm run build` · Publish directory: `dist`
4. Em **Site settings → Environment variables**, adicione:
   - `VITE_GOOGLE_MAPS_API_KEY`
   - `VITE_API_URL`
5. O arquivo `netlify.toml` e o `public/_redirects` já tratam o *fallback* de SPA (rotas do React Router).

## 📁 Estrutura

```
src/
├─ components/   # AppLayout, BottomNav, TopBar, Icon, StatusBar, ProtectedRoute
├─ context/      # ToastContext (Context API)
├─ store/        # authStore, mapStore, prefsStore (Zustand)
├─ lib/          # api.js (camada de API + modo demo)
├─ data/         # mock.js (dados de demonstração)
├─ pages/        # todas as telas (+ pages/settings)
├─ App.jsx       # rotas
├─ main.jsx      # phone shell + providers
└─ index.css     # design system completo
```

Feito com 💜 em Passo Fundo, RS.
