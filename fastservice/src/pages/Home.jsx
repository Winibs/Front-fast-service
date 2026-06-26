import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, FilePlus2, ClipboardList, Headphones, ChevronRight, Truck, ArrowRight, Star } from "lucide-react";
import Icon from "../components/Icon.jsx";
import { useAuthStore } from "../store/authStore.js";
import { SERVICES } from "../data/mock.js";

export default function Home() {
  const nav = useNavigate();
  const user = useAuthStore((s) => s.user);
  const firstName = (user?.name || "Visitante").split(" ")[0];
  const popular = SERVICES.slice(0, 3);

  return (
    <div className="scroll-area page">
      {/* search */}
      <div className="pad" style={{ paddingTop: 8 }}>
        <div className="row gap-10">
          <div className="input-wrap grow" onClick={() => nav("/search")} style={{ cursor: "pointer" }}>
            <Search size={18} />
            <input placeholder="Buscar serviços…" readOnly style={{ cursor: "pointer" }} />
          </div>
          <button className="iconbtn" style={{ height: 52, width: 52, borderRadius: "var(--r-sm)" }} onClick={() => nav("/search")}>
            <SlidersHorizontal size={19} />
          </button>
        </div>
      </div>

      {/* greeting */}
      <div className="pad" style={{ marginTop: 18 }}>
        <h1 style={{ font: "800 26px var(--font-display)", letterSpacing: "-0.03em" }}>
          Olá, {firstName}! 👋
        </h1>
        <p className="muted t-sm" style={{ marginTop: 2 }}>Como podemos te ajudar hoje?</p>
      </div>

      {/* shortcuts */}
      <div className="pad row gap-12" style={{ marginTop: 16 }}>
        <button className="card card-pad col gap-10 grow" onClick={() => nav("/chamados/novo")} style={{ alignItems: "flex-start", border: "none" }}>
          <span className="ic-box"><FilePlus2 size={22} /></span>
          <span style={{ font: "700 14px var(--font-display)" }}>Abrir chamado</span>
        </button>
        <button className="card card-pad col gap-10 grow" onClick={() => nav("/chamados")} style={{ alignItems: "flex-start", border: "none" }}>
          <span className="ic-box" style={{ background: "var(--spark-tint)", color: "var(--spark)" }}><ClipboardList size={22} /></span>
          <span style={{ font: "700 14px var(--font-display)" }}>Meus chamados</span>
        </button>
      </div>

      {/* active order tracker (personalização) */}
      <div className="pad" style={{ marginTop: 14 }}>
        <div className="svc-hero" style={{ position: "relative" }} onClick={() => nav("/map")}>
          <div className="between" style={{ position: "relative", zIndex: 1 }}>
            <div className="col gap-4">
              <span className="badge" style={{ background: "rgba(255,255,255,.22)", color: "#fff", alignSelf: "flex-start" }}>
                <span className="dot" /> Em andamento
              </span>
              <span style={{ font: "700 17px var(--font-display)", marginTop: 6 }}>Carlos está a caminho</span>
              <span style={{ fontSize: 13, opacity: 0.9 }}>Manutenção elétrica · chega em ~8 min</span>
            </div>
            <span className="center" style={{ width: 46, height: 46, borderRadius: 14, background: "rgba(255,255,255,.2)" }}>
              <Truck size={22} />
            </span>
          </div>
          <button className="btn" style={{ marginTop: 14, background: "#fff", color: "var(--primary)", position: "relative", zIndex: 1 }}>
            Acompanhar no mapa <ArrowRight size={17} />
          </button>
        </div>
      </div>

      {/* help banner */}
      <div className="pad" style={{ marginTop: 14 }}>
        <div className="lrow" onClick={() => nav("/chat/suporte")} style={{ background: "var(--primary-tint)", border: "none" }}>
          <span className="ic-box" style={{ background: "#fff" }}><Headphones size={20} /></span>
          <div className="grow">
            <div className="ttl">Precisando de ajuda?</div>
            <div className="sub">Fale com nossa equipe, estamos aqui.</div>
          </div>
          <ChevronRight size={20} className="muted" />
        </div>
      </div>

      {/* popular services */}
      <div className="pad between" style={{ marginTop: 22, marginBottom: 12 }}>
        <h2 className="h-sec">Serviços populares</h2>
        <span className="link t-sm" onClick={() => nav("/search")}>Ver todos</span>
      </div>
      <div className="pad col gap-10 stagger">
        {popular.map((s) => (
          <div key={s.id} className="lrow" onClick={() => nav(`/service/${s.id}`)}>
            <span className="ic-box"><Icon name={s.icon} size={22} /></span>
            <div className="grow">
              <div className="ttl">{s.name}</div>
              <div className="sub">{s.tagline}</div>
            </div>
            <div className="col" style={{ alignItems: "flex-end", gap: 4 }}>
              <span className="tag-rating"><Star size={13} fill="var(--warning)" color="var(--warning)" /> {s.rating}</span>
              <span className="t-xs muted">a partir de R$ {s.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
