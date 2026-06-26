import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Plus, RotateCcw, AlertTriangle, ChevronRight } from "lucide-react";
import Icon from "../components/Icon.jsx";
import { HISTORY, REORDER, COMPLAINTS } from "../data/mock.js";
import { useToast } from "../context/ToastContext.jsx";

const STATUS = {
  "Concluído": "badge-success",
  "Em andamento": "badge-warning",
  "Cancelado": "badge-danger",
  "Em análise": "badge-warning",
  "Resolvido": "badge-success",
};

export default function Chamados() {
  const nav = useNavigate();
  const toast = useToast();
  const [params, setParams] = useSearchParams();
  const initial = params.get("tab") || "historico";
  const [tab, setTab] = useState(initial);

  const go = (t) => { setTab(t); setParams({ tab: t }); };

  return (
    <div className="scroll-area page">
      <div className="pad" style={{ paddingTop: 12 }}>
        <h1 className="h-title" style={{ marginBottom: 16 }}>Chamados</h1>
        <div className="tabs">
          <button className={`tab ${tab === "historico" ? "active" : ""}`} onClick={() => go("historico")}>Histórico</button>
          <button className={`tab ${tab === "novo" ? "active" : ""}`} onClick={() => go("novo")}>Peça de novo</button>
          <button className={`tab ${tab === "reclamacoes" ? "active" : ""}`} onClick={() => go("reclamacoes")}>Reclamações</button>
        </div>
      </div>

      <div className="pad" style={{ marginTop: 16 }}>
        {tab === "historico" && (
          <div className="col gap-10 stagger">
            {HISTORY.map((h) => (
              <div key={h.id} className="lrow">
                <span className="ic-box"><Icon name={h.icon} size={20} /></span>
                <div className="grow">
                  <div className="ttl">{h.service}</div>
                  <div className="sub">{h.date} · R$ {h.price}</div>
                </div>
                <span className={`badge ${STATUS[h.status]}`}><span className="dot" /> {h.status}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "novo" && (
          <>
            <p className="t-sm muted" style={{ marginBottom: 12 }}>Serviços que você já contratou</p>
            <div className="col gap-10 stagger">
              {REORDER.map((r) => (
                <div key={r.id} className="lrow">
                  <span className="ic-box"><Icon name={r.icon} size={20} /></span>
                  <div className="grow">
                    <div className="ttl">{r.service}</div>
                    <div className="sub">{r.pro} · R$ {r.price}</div>
                  </div>
                  <button className="btn btn-soft btn-sm" onClick={() => toast.success(`${r.service} solicitado novamente!`)}>
                    <RotateCcw size={15} /> Pedir
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "reclamacoes" && (
          <>
            <div className="col gap-10 stagger">
              {COMPLAINTS.map((c) => (
                <div key={c.id} className="lrow" style={{ alignItems: "flex-start" }}>
                  <div className="grow">
                    <span className={`badge ${STATUS[c.status]}`}><span className="dot" /> {c.status}</span>
                    <div className="ttl" style={{ marginTop: 8 }}>{c.title}</div>
                    <div className="sub">Pedido {c.code}</div>
                  </div>
                  <div className="col" style={{ alignItems: "flex-end" }}>
                    <span className="t-xs muted">{c.date}</span>
                    <ChevronRight size={18} className="muted" style={{ marginTop: 10 }} />
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" style={{ marginTop: 18 }} onClick={() => nav("/reclamacoes/novo")}>
              <AlertTriangle size={17} /> Abrir reclamação
            </button>
          </>
        )}
      </div>

      {tab !== "reclamacoes" && (
        <button className="fab" onClick={() => nav("/chamados/novo")} aria-label="Abrir chamado">
          <Plus size={26} />
        </button>
      )}
    </div>
  );
}
