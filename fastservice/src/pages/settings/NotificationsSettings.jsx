import { Truck, MessageSquare, Tag, Mail, Receipt, Volume2 } from "lucide-react";
import TopBar from "../../components/TopBar.jsx";
import { usePrefsStore } from "../../store/prefsStore.js";

const GROUPS = [
  {
    title: "Push", items: [
      { key: "orderStatus", icon: Truck, label: "Status dos pedidos", sub: "Atualizações em tempo real" },
      { key: "newMessages", icon: MessageSquare, label: "Novas mensagens", sub: "Profissionais e suporte" },
      { key: "promos", icon: Tag, label: "Promoções e ofertas", sub: "Descontos e novidades" },
    ],
  },
  {
    title: "E-mail", items: [
      { key: "weeklyDigest", icon: Mail, label: "Resumo semanal", sub: "Seus serviços da semana" },
      { key: "receipts", icon: Receipt, label: "Recibos e faturas", sub: "Comprovantes por e-mail" },
    ],
  },
  {
    title: "Som", items: [
      { key: "sound", icon: Volume2, label: "Som de notificação", sub: "Tocar ao receber alertas" },
    ],
  },
];

export default function NotificationsSettings() {
  const notifications = usePrefsStore((s) => s.notifications);
  const toggle = usePrefsStore((s) => s.toggle);

  return (
    <div className="scroll-area page">
      <TopBar title="Notificações" to="/settings" />
      <div className="pad" style={{ marginTop: 6 }}>
        {GROUPS.map((g) => (
          <div key={g.title} style={{ marginBottom: 18 }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>{g.title}</div>
            <div className="card" style={{ overflow: "hidden", padding: 0 }}>
              {g.items.map((it, i) => (
                <div key={it.key}>
                  <div className="setrow" style={{ cursor: "default" }}>
                    <span className="ic-box" style={{ width: 38, height: 38 }}><it.icon size={18} /></span>
                    <div className="grow">
                      <div style={{ font: "600 14px var(--font-display)" }}>{it.label}</div>
                      <div className="t-xs muted">{it.sub}</div>
                    </div>
                    <button className={`toggle ${notifications[it.key] ? "on" : ""}`} onClick={() => toggle("notifications", it.key)} aria-label={it.label} />
                  </div>
                  {i < g.items.length - 1 && <div style={{ height: 1, background: "var(--line)", marginLeft: 66 }} />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
