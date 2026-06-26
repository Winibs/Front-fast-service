import { useNavigate } from "react-router-dom";
import { ShieldCheck, User, CreditCard, Bell, HelpCircle, Info, ChevronRight, LogOut } from "lucide-react";
import TopBar from "../components/TopBar.jsx";
import { useAuthStore } from "../store/authStore.js";
import { useToast } from "../context/ToastContext.jsx";

const ROWS = [
  { icon: ShieldCheck, label: "Privacidade", sub: "Permissões e segurança", to: "/settings/privacidade", tint: "var(--primary-tint)", fg: "var(--primary)" },
  { icon: User, label: "Conta", sub: "Dados pessoais e senha", to: "/settings/conta", tint: "var(--success-tint)", fg: "var(--success)" },
  { icon: CreditCard, label: "Pagamentos", sub: "Cartões e Pix", to: "/settings/pagamentos", tint: "var(--spark-tint)", fg: "var(--spark)" },
  { icon: Bell, label: "Notificações", sub: "Alertas e e-mails", to: "/settings/notificacoes", tint: "#fdf0d8", fg: "var(--warning)" },
  { icon: HelpCircle, label: "Ajuda", sub: "Dúvidas e suporte", to: "/settings/ajuda", tint: "var(--primary-tint)", fg: "var(--primary)" },
  { icon: Info, label: "Sobre", sub: "Versão e termos", to: "/settings/sobre", tint: "var(--success-tint)", fg: "var(--success)" },
];

export default function Settings() {
  const nav = useNavigate();
  const toast = useToast();
  const logout = useAuthStore((s) => s.logout);

  const doLogout = () => { logout(); toast.info("Você saiu da conta."); nav("/login", { replace: true }); };

  return (
    <div className="scroll-area page">
      <TopBar title="Configurações" to="/profile" />
      <div className="pad col" style={{ gap: 10, marginTop: 6 }}>
        <div className="card" style={{ overflow: "hidden", padding: 0 }}>
          {ROWS.map((r, i) => (
            <div key={r.to}>
              <div className="setrow" onClick={() => nav(r.to)}>
                <span className="ic-box" style={{ background: r.tint, color: r.fg }}><r.icon size={20} /></span>
                <div className="grow">
                  <div style={{ font: "600 14.5px var(--font-display)" }}>{r.label}</div>
                  <div className="t-xs muted">{r.sub}</div>
                </div>
                <ChevronRight size={19} className="muted" />
              </div>
              {i < ROWS.length - 1 && <div style={{ height: 1, background: "var(--line)", marginLeft: 70 }} />}
            </div>
          ))}
        </div>

        <button className="btn btn-danger" style={{ marginTop: 6 }} onClick={doLogout}><LogOut size={18} /> Sair da conta</button>
      </div>
    </div>
  );
}
