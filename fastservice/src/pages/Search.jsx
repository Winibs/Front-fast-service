import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon, Star, X } from "lucide-react";
import Icon from "../components/Icon.jsx";
import { SERVICES } from "../data/mock.js";

const CATS = ["Todos", "Casa", "Reparos", "Externo"];
const CAT_MAP = {
  limpeza: "Casa", montagem: "Casa", manutencao: "Reparos",
  pintura: "Casa", jardinagem: "Externo",
};

export default function Search() {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todos");

  const results = useMemo(() => {
    return SERVICES.filter((s) => {
      const matchesQ = `${s.name} ${s.tagline} ${s.desc}`.toLowerCase().includes(q.toLowerCase());
      const matchesCat = cat === "Todos" || CAT_MAP[s.id] === cat;
      return matchesQ && matchesCat;
    });
  }, [q, cat]);

  return (
    <div className="scroll-area page">
      <div className="pad" style={{ paddingTop: 12 }}>
        <h1 className="h-title" style={{ marginBottom: 14 }}>Buscar serviços</h1>
        <div className="input-wrap">
          <SearchIcon size={18} />
          <input autoFocus placeholder="O que você precisa hoje?" value={q} onChange={(e) => setQ(e.target.value)} />
          {q && <X size={18} className="input-eye" onClick={() => setQ("")} />}
        </div>
      </div>

      <div className="row gap-8" style={{ overflowX: "auto", padding: "16px 20px 4px" }}>
        {CATS.map((c) => (
          <button key={c} className={`chip ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>

      <p className="pad t-xs muted" style={{ marginTop: 10 }}>
        {results.length} {results.length === 1 ? "serviço encontrado" : "serviços encontrados"}
      </p>

      <div className="pad col gap-10 stagger" style={{ marginTop: 8 }}>
        {results.map((s) => (
          <div key={s.id} className="lrow" onClick={() => nav(`/service/${s.id}`)}>
            <span className="ic-box"><Icon name={s.icon} size={22} /></span>
            <div className="grow">
              <div className="ttl">{s.name}</div>
              <div className="sub">{s.tagline} · {s.jobs} serviços</div>
            </div>
            <div className="col" style={{ alignItems: "flex-end", gap: 4 }}>
              <span className="tag-rating"><Star size={13} fill="var(--warning)" color="var(--warning)" /> {s.rating}</span>
              <span className="t-xs muted">R$ {s.price}</span>
            </div>
          </div>
        ))}
        {results.length === 0 && (
          <div className="empty">
            <div className="emoji"><SearchIcon size={30} /></div>
            <h3 className="h-sec">Nada por aqui</h3>
            <p className="muted t-sm" style={{ marginTop: 4 }}>Tente outra busca ou categoria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
