import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Star, Check, Clock, ShieldCheck } from "lucide-react";
import TopBar from "../components/TopBar.jsx";
import Icon from "../components/Icon.jsx";
import { SERVICES } from "../data/mock.js";

export default function ServiceDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const svc = SERVICES.find((s) => s.id === id);
  if (!svc) return <Navigate to="/search" replace />;

  return (
    <div className="scroll-area page">
      <TopBar title={svc.name} to="/home" />

      <div className="pad">
        {/* hero */}
        <div className="svc-hero">
          <div className="row gap-12" style={{ position: "relative", zIndex: 1 }}>
            <span className="svc-ic"><Icon name={svc.icon} size={26} /></span>
            <div>
              <div style={{ font: "800 22px var(--font-display)", letterSpacing: "-0.02em" }}>{svc.name}</div>
              <div className="row gap-8" style={{ marginTop: 4, fontSize: 13, opacity: 0.92 }}>
                <span className="row gap-4"><Star size={13} fill="#fff" color="#fff" /> {svc.rating}</span>
                <span>·</span>
                <span>{svc.jobs} serviços</span>
              </div>
              <div style={{ fontSize: 13, opacity: 0.9, marginTop: 2 }}>{svc.tagline}</div>
            </div>
          </div>
        </div>

        {/* about */}
        <h3 className="h-sec" style={{ marginTop: 22, marginBottom: 8 }}>Sobre o serviço</h3>
        <p className="t-sm" style={{ color: "var(--ink-2)", lineHeight: 1.55 }}>{svc.desc}</p>

        {/* quick facts */}
        <div className="row gap-10" style={{ marginTop: 16 }}>
          <div className="card card-pad row gap-8 grow" style={{ padding: 12 }}>
            <Clock size={18} style={{ color: "var(--primary)" }} />
            <span className="t-xs" style={{ color: "var(--ink-2)" }}>{svc.eta}</span>
          </div>
          <div className="card card-pad row gap-8 grow" style={{ padding: 12 }}>
            <ShieldCheck size={18} style={{ color: "var(--success)" }} />
            <span className="t-xs" style={{ color: "var(--ink-2)" }}>Garantia inclusa</span>
          </div>
        </div>

        {/* includes */}
        <h3 className="h-sec" style={{ marginTop: 22, marginBottom: 14 }}>O que está incluso</h3>
        <ul className="checklist">
          {svc.includes.map((item) => (
            <li key={item}>
              <span className="ck"><Check size={14} strokeWidth={3} /></span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* footer price + CTA */}
      <div className="pad between" style={{ marginTop: 26 }}>
        <div className="price">
          <small>a partir de</small>
          R$ {svc.price}
        </div>
        <button className="btn btn-primary" style={{ width: "auto", padding: "15px 38px" }} onClick={() => nav(`/service/${svc.id}/confirmar`)}>
          Solicitar
        </button>
      </div>
    </div>
  );
}
