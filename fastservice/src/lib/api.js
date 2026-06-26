// ============================================================
// Camada de API do FastService
// ------------------------------------------------------------
// Pronta para a SUA API (a do trabalho de Banco de Dados / Swagger).
// Endpoints esperados (ajuste os paths conforme seu Swagger):
//   POST /login            -> { token }              (autenticação)
//   POST /pessoas          -> cadastro de usuário
//   GET  /pontos           -> lista pontos do usuário (Bearer token)
//   POST /pontos           -> cadastra um novo ponto
//
// Enquanto VITE_API_URL estiver vazio, tudo funciona em MODO DEMO
// (dados mock + localStorage), então o app já roda 100% sem backend.
// Quando você publicar sua API, basta definir VITE_API_URL no .env / Netlify.
// ============================================================

import { INITIAL_POINTS } from "../data/mock.js";

const BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
export const DEMO_MODE = !BASE;

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function authHeaders() {
  const token = localStorage.getItem("fs_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(auth ? authHeaders() : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    let msg = `Erro ${res.status}`;
    try { const j = await res.json(); msg = j.message || j.error || msg; } catch { /* */ }
    throw new Error(msg);
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}

// ---------- Demo storage helpers ----------
const demoPointsKey = (email) => `fs_points_${email || "guest"}`;
function readDemoPoints(email) {
  try {
    const raw = localStorage.getItem(demoPointsKey(email));
    if (raw) return JSON.parse(raw);
  } catch { /* */ }
  return [...INITIAL_POINTS];
}
function writeDemoPoints(email, pts) {
  localStorage.setItem(demoPointsKey(email), JSON.stringify(pts));
}

// ============================================================
// AUTH
// ============================================================
export const api = {
  demo: DEMO_MODE,

  async login({ email, password }) {
    if (DEMO_MODE) {
      await wait(650);
      if (!email || !password) throw new Error("Informe e-mail e senha.");
      const user = {
        name: email.split("@")[0].replace(/^\w/, (c) => c.toUpperCase()),
        email,
      };
      return { token: "demo-token-" + Date.now(), user };
    }
    // Ajuste o path conforme seu Swagger (ex.: /login):
    const data = await request("/login", { method: "POST", body: { email, password } });
    return { token: data.token, user: data.user || { email, name: email.split("@")[0] } };
  },

  async register({ name, email, password }) {
    if (DEMO_MODE) {
      await wait(750);
      if (!name || !email || !password) throw new Error("Preencha todos os campos.");
      return { token: "demo-token-" + Date.now(), user: { name, email } };
    }
    // Ajuste para o seu endpoint de cadastro (ex.: /pessoas):
    await request("/pessoas", { method: "POST", body: { nome: name, email, senha: password } });
    // Após cadastrar, faz login para obter o token:
    return this.login({ email, password });
  },

  // ============================================================
  // PONTOS (mapa)
  // ============================================================
  async listPoints(email) {
    if (DEMO_MODE) {
      await wait(400);
      return readDemoPoints(email);
    }
    const data = await request("/pontos", { auth: true });
    // Normaliza para { id, name, lat, lng }
    return (data || []).map((p) => ({
      id: p.id,
      name: p.nome ?? p.name,
      lat: Number(p.latitude ?? p.lat),
      lng: Number(p.longitude ?? p.lng),
      type: p.tipo ?? p.type ?? "home",
    }));
  },

  async createPoint(email, point) {
    if (DEMO_MODE) {
      await wait(400);
      const pts = readDemoPoints(email);
      const next = { ...point, id: Date.now() };
      const updated = [...pts, next];
      writeDemoPoints(email, updated);
      return next;
    }
    const data = await request("/pontos", {
      method: "POST",
      auth: true,
      body: { nome: point.name, latitude: point.lat, longitude: point.lng, tipo: point.type },
    });
    return { id: data.id, name: point.name, lat: point.lat, lng: point.lng, type: point.type };
  },

  async deletePoint(email, id) {
    if (DEMO_MODE) {
      await wait(250);
      const pts = readDemoPoints(email).filter((p) => p.id !== id);
      writeDemoPoints(email, pts);
      return true;
    }
    await request(`/pontos/${id}`, { method: "DELETE", auth: true });
    return true;
  },
};
