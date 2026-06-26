import { useNavigate } from "react-router-dom";
import { ClipboardList, CreditCard, Settings, MessageSquare, ChevronRight, LogOut, Star, Pencil } from "lucide-react";
import { useAuthStore } from "../store/authStore.js";
import { useToast } from "../context/ToastContext.jsx";

export default function Profile() {
  const nav = useNavigate();
  const toast = useToast();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const name = user?.name || "Gabriel Almeida";
  const email = user?.email || "gabriel@email.com";
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

  const links = [
    { icon: ClipboardList, label: "Meus chamados", sub: "Histórico e andamento", to: "/chamados" },
    { icon: MessageSquare, label: "Conversas", sub: "Mensagens com profissionais", to: "/chat" },
    { icon: CreditCard, label: "Pagamentos", sub: "Cartões e Pix", to: "/settings/pagamentos" },
    { icon: Settings, label: "Configurações", sub: "Privacidade, conta e mais", to: "/settings" },
  ];

  const doLogout = () => { logout(); toast.info("Você saiu da conta."); nav("/login", { replace: true }); };

  return (
    <div className="scroll-area page">
      <div className="pad" style={{ paddingTop: 12 }}>
        <h1 className="h-title" style={{ marginBottom: 14 }}>Perfil</h1>

        {/* cartão do usuário */}
        <div className="card card-pad">
          <div className="row gap-12">
            <span className="avatar" style={{ width: 60, height: 60, fontSize: 22, background: "linear-gradient(135deg,var(--grad-a),var(--grad-b))" }}>{initials}</span>
            <div className="grow">
              <div style={{ font: "800 18px var(--font-display)" }}>{name}</div>
              <div className="t-sm muted">{email}</div>
            </div>
            <button className="iconbtn ghost" onClick={() => nav("/settings/conta")} aria-label="Editar"><Pencil size={18} /></button>
          </div>
          <div className="row gap-8" style={{ marginTop: 16 }}>
            <div className="statpill"><b>12</b><span>Chamados</span></div>
            <div className="statpill"><b><span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}><Star size={14} fill="var(--warning)" color="var(--warning)" /> 4.9</span></b><span>Avaliação</span></div>
            <div className="statpill"><b>2024</b><span>Cliente desde</span></div>
          </div>
        </div>
      </div>

      <div className="pad col gap-10 stagger" style={{ marginTop: 8 }}>
        {links.map((l) => (
          <div key={l.to} className="lrow" onClick={() => nav(l.to)}>
            <span className="ic-box"><l.icon size={20} /></span>
            <div className="grow">
              <div className="ttl">{l.label}</div>
              <div className="sub">{l.sub}</div>
            </div>
            <ChevronRight size={20} className="muted" />
          </div>
        ))}
      </div>

      <div className="pad" style={{ marginTop: 14, marginBottom: 8 }}>
        <button className="btn btn-danger" onClick={doLogout}><LogOut size={18} /> Sair da conta</button>
      </div>
    </div>
  );
}
