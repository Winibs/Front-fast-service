import { FileText, Shield, ScrollText, Star, Globe, ChevronRight, Clock } from "lucide-react";
import TopBar from "../../components/TopBar.jsx";
import { useToast } from "../../context/ToastContext.jsx";

const LINKS = [
  { icon: FileText, label: "Termos de uso" },
  { icon: Shield, label: "Política de privacidade" },
  { icon: ScrollText, label: "Licenças" },
  { icon: Star, label: "Avaliar o app" },
  { icon: Globe, label: "Site oficial" },
];

export default function About() {
  const toast = useToast();
  return (
    <div className="scroll-area page">
      <TopBar title="Sobre" to="/settings" />
      <div className="pad center" style={{ flexDirection: "column", marginTop: 14, marginBottom: 8 }}>
        <span className="center" style={{ width: 74, height: 74, borderRadius: 22, background: "linear-gradient(135deg,var(--grad-a),var(--grad-b))", color: "#fff", boxShadow: "var(--sh-primary)" }}>
          <Clock size={34} />
        </span>
        <div style={{ font: "800 22px var(--font-display)", marginTop: 14 }}>Fast<span style={{ color: "var(--primary)" }}>Service</span></div>
        <div className="t-sm muted" style={{ marginTop: 2 }}>Versão 1.0.0 (build 24)</div>
      </div>

      <div className="pad" style={{ marginTop: 8 }}>
        <div className="card" style={{ overflow: "hidden", padding: 0 }}>
          {LINKS.map((l, i) => (
            <div key={l.label}>
              <div className="setrow" onClick={() => toast.info(`${l.label} — em breve.`)}>
                <span className="ic-box" style={{ width: 38, height: 38 }}><l.icon size={18} /></span>
                <div className="grow" style={{ font: "600 14px var(--font-display)" }}>{l.label}</div>
                <ChevronRight size={19} className="muted" />
              </div>
              {i < LINKS.length - 1 && <div style={{ height: 1, background: "var(--line)", marginLeft: 66 }} />}
            </div>
          ))}
        </div>

        <div className="center" style={{ flexDirection: "column", gap: 4, marginTop: 28, opacity: 0.7 }}>
          <span className="t-xs muted">Feito com 💜 em Passo Fundo, RS</span>
          <span className="t-xs muted">© 2025 FastService</span>
        </div>
      </div>
    </div>
  );
}
