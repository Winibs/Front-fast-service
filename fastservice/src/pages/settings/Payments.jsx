import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import TopBar from "../../components/TopBar.jsx";
import Icon from "../../components/Icon.jsx";
import { PAYMENTS } from "../../data/mock.js";
import { useToast } from "../../context/ToastContext.jsx";

export default function Payments() {
  const toast = useToast();
  const [methods, setMethods] = useState(PAYMENTS);

  const remove = (id) => { setMethods((m) => m.filter((x) => x.id !== id)); toast.info("Forma de pagamento removida."); };
  const setPrimary = (id) => setMethods((m) => m.map((x) => ({ ...x, primary: x.id === id })));

  return (
    <div className="scroll-area page">
      <TopBar title="Pagamentos" to="/settings" right={
        <button className="iconbtn ghost" onClick={() => toast.info("Em breve: adicionar pagamento.")} aria-label="Adicionar"><Plus size={20} /></button>
      } />

      <div className="pad" style={{ marginTop: 6 }}>
        {/* cartão de saldo */}
        <div className="svc-hero" style={{ minHeight: 0 }}>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 13, opacity: 0.9 }}>Saldo FastService</div>
            <div style={{ font: "800 30px var(--font-display)", letterSpacing: "-0.02em", marginTop: 2 }}>R$ 240,00</div>
            <div className="between" style={{ marginTop: 18, alignItems: "flex-end" }}>
              <span style={{ letterSpacing: 2, fontSize: 14 }}>•••• 4242</span>
              <span style={{ font: "800 16px var(--font-display)" }}>VISA</span>
            </div>
          </div>
        </div>

        <div className="eyebrow" style={{ margin: "20px 0 10px" }}>Formas de pagamento</div>
        <div className="col gap-10 stagger">
          {methods.map((p) => (
            <div key={p.id} className="lrow">
              <span className="ic-box" style={{ background: p.brand === "Pix" ? "var(--success-tint)" : "var(--primary-tint)", color: p.brand === "Pix" ? "var(--success)" : "var(--primary)" }}>
                <Icon name={p.icon} size={20} />
              </span>
              <div className="grow">
                <div className="ttl">{p.brand} {p.last4 && `•••• ${p.last4}`}</div>
                <div className="sub">{p.brand === "Pix" ? p.exp : `Expira ${p.exp}`}</div>
              </div>
              {p.primary ? (
                <span className="badge badge-success">Padrão</span>
              ) : (
                <button className="btn btn-ghost btn-sm" onClick={() => setPrimary(p.id)}>Tornar padrão</button>
              )}
              {!p.primary && (
                <button className="iconbtn ghost" onClick={() => remove(p.id)} aria-label="Remover" style={{ marginLeft: 4 }}>
                  <Trash2 size={17} color="var(--danger)" />
                </button>
              )}
            </div>
          ))}
        </div>

        <button className="btn btn-outline" style={{ marginTop: 16 }} onClick={() => toast.info("Em breve: adicionar pagamento.")}>
          <Plus size={18} /> Adicionar pagamento
        </button>
      </div>
    </div>
  );
}
