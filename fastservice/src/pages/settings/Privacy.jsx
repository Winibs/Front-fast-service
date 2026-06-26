
import { MapPin, Eye, MessageSquare, BarChart3, KeyRound, Trash2, ChevronRight } from "lucide-react";
import TopBar from "../../components/TopBar.jsx";
import { usePrefsStore } from "../../store/prefsStore.js";
import { useToast } from "../../context/ToastContext.jsx";

const TOGGLES = [
  { key: "shareLocation", icon: MapPin, label: "Compartilhar localização", sub: "Para encontrar profissionais" },
  { key: "visibleProfile", icon: Eye, label: "Perfil visível", sub: "Profissionais veem seu nome" },
  { key: "readReceipts", icon: MessageSquare, label: "Confirmação de leitura", sub: "Mostrar quando você leu" },
  { key: "anonymousData", icon: BarChart3, label: "Uso de dados anônimos", sub: "Ajuda a melhorar o app" },
];

export default function Privacy() {
  const toast = useToast();
  const privacy = usePrefsStore((s) => s.privacy);
  const toggle = usePrefsStore((s) => s.toggle);

  return (
    <div className="scroll-area page">
      <TopBar title="Privacidade" to="/settings" />
      <div className="pad" style={{ marginTop: 6 }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Permissões</div>
        <div className="card" style={{ overflow: "hidden", padding: 0 }}>
          {TOGGLES.map((t, i) => (
            <div key={t.key}>
              <div className="setrow" style={{ cursor: "default" }}>
                <span className="ic-box" style={{ width: 38, height: 38 }}><t.icon size={18} /></span>
                <div className="grow">
                  <div style={{ font: "600 14px var(--font-display)" }}>{t.label}</div>
                  <div className="t-xs muted">{t.sub}</div>
                </div>
                <button className={`toggle ${privacy[t.key] ? "on" : ""}`} onClick={() => toggle("privacy", t.key)} aria-label={t.label} />
              </div>
              {i < TOGGLES.length - 1 && <div style={{ height: 1, background: "var(--line)", marginLeft: 66 }} />}
            </div>
          ))}
        </div>

        <div className="eyebrow" style={{ margin: "20px 0 10px" }}>Segurança</div>
        <div className="card" style={{ overflow: "hidden", padding: 0 }}>
          <div className="setrow" onClick={() => toast.info("Em breve: alteração de senha.")}>
            <span className="ic-box" style={{ width: 38, height: 38 }}><KeyRound size={18} /></span>
            <div className="grow"><div style={{ font: "600 14px var(--font-display)" }}>Alterar senha</div></div>
            <ChevronRight size={19} className="muted" />
          </div>
          <div style={{ height: 1, background: "var(--line)", marginLeft: 66 }} />
          <div className="setrow" onClick={() => toast.error("Esta ação é irreversível.")}>
            <span className="ic-box" style={{ width: 38, height: 38, background: "#fdeaea", color: "var(--danger)" }}><Trash2 size={18} /></span>
            <div className="grow"><div style={{ font: "600 14px var(--font-display)", color: "var(--danger)" }}>Excluir minha conta</div></div>
            <ChevronRight size={19} className="muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
