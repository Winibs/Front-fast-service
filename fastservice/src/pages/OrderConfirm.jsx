import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Calendar, UserCheck, MapPin, CreditCard, Check } from "lucide-react";
import TopBar from "../components/TopBar.jsx";
import Icon from "../components/Icon.jsx";
import { SERVICES, PROFESSIONALS } from "../data/mock.js";
import { useToast } from "../context/ToastContext.jsx";

function InfoRow({ icon: I, label, value }) {
  return (
    <div className="row gap-12" style={{ padding: "12px 0" }}>
      <span className="center" style={{ width: 36, height: 36, borderRadius: 11, background: "var(--primary-tint)", color: "var(--primary)", flex: "0 0 auto" }}>
        <I size={17} />
      </span>
      <div className="grow">
        <div className="t-xs muted">{label}</div>
        <div style={{ font: "600 14px var(--font-display)", marginTop: 1 }}>{value}</div>
      </div>
    </div>
  );
}

export default function OrderConfirm() {
  const { id } = useParams();
  const nav = useNavigate();
  const toast = useToast();
  const svc = SERVICES.find((s) => s.id === id);
  if (!svc) return <Navigate to="/search" replace />;

  const pro = PROFESSIONALS[id] || { name: "Profissional FastService" };
  const orderCode = "#FS-" + Math.floor(20000 + Math.random() * 9999);

  function confirm() {
    toast.success("Pedido confirmado! Acompanhe em Meus chamados.");
    nav("/chamados", { replace: true });
  }

  return (
    <div className="scroll-area page">
      <TopBar title="Detalhes do pedido" to={`/service/${id}`} />

      <div className="pad">
        <div className="card card-pad">
          {/* header */}
          <div className="row gap-12">
            <span className="ic-box" style={{ borderRadius: 14 }}><Icon name={svc.icon} size={22} /></span>
            <div>
              <div style={{ font: "700 17px var(--font-display)" }}>{svc.name}</div>
              <div className="t-xs muted">Pedido {orderCode}</div>
            </div>
          </div>

          <div className="divider" style={{ margin: "14px 0 2px" }} />
          <div className="eyebrow" style={{ margin: "8px 0 2px" }}>Informações</div>

          <InfoRow icon={Calendar} label="Data e hora" value="12 jun 2025 · 14:30" />
          <div className="divider" />
          <InfoRow icon={UserCheck} label="Profissional" value={pro.name} />
          <div className="divider" />
          <InfoRow icon={MapPin} label="Endereço" value="R. Sen. Pinheiro, 304 — Centro" />
          <div className="divider" />
          <InfoRow icon={CreditCard} label="Pagamento" value="Cartão final 4242" />
        </div>

        {/* total */}
        <div className="card card-pad between" style={{ marginTop: 14 }}>
          <span className="muted t-sm">Total</span>
          <span className="price" style={{ fontSize: 22 }}>R$ {svc.price.toFixed(2).replace(".", ",")}</span>
        </div>

        <p className="t-xs muted" style={{ marginTop: 14, lineHeight: 1.5 }}>
          Ao confirmar você concorda com os termos de serviço. O valor só é cobrado após a conclusão.
        </p>
      </div>

      <div className="pad" style={{ marginTop: 12 }}>
        <button className="btn btn-primary" onClick={confirm}>
          <Check size={18} /> Confirmar e solicitar
        </button>
      </div>
    </div>
  );
}
