import { INITIAL_POINTS } from "../data/mock.js";

const DEFAULT_API_URL = "https://fastservice.up.railway.app";
const rawApiUrl = import.meta.env.VITE_API_URL?.trim();
const BASE = (rawApiUrl || DEFAULT_API_URL).replace(/\/+$/, "");
export const DEMO_MODE = BASE.toLowerCase() === "demo";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function authHeaders() {
  const token = localStorage.getItem("fs_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  if (DEMO_MODE) {
    throw new Error("API desativada em modo demonstração.");
  }

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
    try {
      const text = await res.text();
      if (text) {
        try {
          const data = JSON.parse(text);
          msg = data.message || data.error || text;
        } catch {
          msg = text;
        }
      }
    } catch {}
    throw new Error(msg);
  }

  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}

const demoPointsKey = (email) => `fs_points_${email || "guest"}`;

function readDemoPoints(email) {
  try {
    const raw = localStorage.getItem(demoPointsKey(email));
    if (raw) return JSON.parse(raw);
  } catch {}
  return [...INITIAL_POINTS];
}

function writeDemoPoints(email, pts) {
  localStorage.setItem(demoPointsKey(email), JSON.stringify(pts));
}

function normalizeCategory(type) {
  const value = String(type || "").toUpperCase();

  if (value === "HOME" || value === "CASA") return "OUTROS";
  if (value === "WORK" || value === "TRABALHO") return "OUTROS";
  if (value.includes("ELETR")) return "ELETRICA";
  if (value.includes("HIDRA")) return "HIDRAULICA";
  if (value.includes("LIMP")) return "LIMPEZA";
  if (value.includes("MARC")) return "MARCENARIA";
  if (value.includes("PINT")) return "PINTURA";
  if (value.includes("MONT")) return "MONTAGEM";

  return "OUTROS";
}

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

    const token = await request("/auth/signin", {
      method: "POST",
      body: { email, password },
    });

    const user = {
      email,
      name: email.split("@")[0].replace(/^\w/, (c) => c.toUpperCase()),
    };

    return { token, user };
  },

  async register({ name, email, password }) {
    if (DEMO_MODE) {
      await wait(750);
      if (!name || !email || !password) {
        throw new Error("Preencha todos os campos.");
      }
      return { token: "demo-token-" + Date.now(), user: { name, email } };
    }

    await request("/auth/signup", {
      method: "POST",
      body: { name, email, password },
    });

    return this.login({ email, password });
  },

  async listPoints(email) {
    if (DEMO_MODE) {
      await wait(400);
      return readDemoPoints(email);
    }

    const data = await request("/ws/point", { auth: true });

    return (data || []).map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      lat: Number(p.latitude),
      lng: Number(p.longitude),
      type: p.category || "OUTROS",
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

    const data = await request("/ws/point", {
      method: "POST",
      auth: true,
      body: {
        name: point.name,
        description: point.description || "Ponto criado pelo frontend",
        category: normalizeCategory(point.type || point.category),
        latitude: point.lat,
        longitude: point.lng,
      },
    });

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      lat: Number(data.latitude),
      lng: Number(data.longitude),
      type: data.category,
    };
  },

  async updatePoint(id, point) {
    const data = await request(`/ws/point/${id}`, {
      method: "PUT",
      auth: true,
      body: {
        name: point.name,
        description: point.description || "Ponto atualizado pelo frontend",
        category: normalizeCategory(point.type || point.category),
        latitude: point.lat,
        longitude: point.lng,
      },
    });

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      lat: Number(data.latitude),
      lng: Number(data.longitude),
      type: data.category,
    };
  },

  async deletePoint(email, id) {
    if (DEMO_MODE) {
      await wait(250);
      const pts = readDemoPoints(email).filter((p) => p.id !== id);
      writeDemoPoints(email, pts);
      return true;
    }

    throw new Error("O backend atual não possui endpoint DELETE /ws/point/{id}.");
  },
};
