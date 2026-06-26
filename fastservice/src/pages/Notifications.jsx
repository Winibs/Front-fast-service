import { useState } from "react";
import { Truck, CheckCircle2, Star, Tag, Bell, CheckCheck } from "lucide-react";
import { NOTIFICATIONS } from "../data/mock.js";
import { useToast } from "../context/ToastContext.jsx";

const ICONS = { Truck, CheckCircle2, Star, Tag };
const TONE = {
  primary: { bg: "var(--primary-tint)", fg: "var(--primary)" },
  success: { bg: "var(--success-tint)", fg: "var(--success)" },
  warning: { bg: "#fdf0d8", fg: "var(--warning)" },
  spark: { bg: "var(--spark-tint)", fg: "var(--spark)" },
};

export default function Notifications() {
  const toast = useToast();
  const [items, setItems] = useState(NOTIFICATIONS);
  const unreadCount = items.filter((n) => n.unread).length;

  const markAll = () => {
    setItems((arr) => arr.map((n) => ({ ...n, unread: false })));
    toast.success("Tudo marcado como lido!");
  };

  return (
    <div className="scroll-area page">
      <div className="pad" style={{ paddingTop: 12 }}>
        <div className="between">
          <h1 className="h-title">Notificações</h1>
          {unreadCount > 0 && (
            <button className="btn btn-soft btn-sm" onClick={markAll}><CheckCheck size={15} /> Ler tudo</button>
          )}
        </div>
        <p className="t-sm muted" style={{ marginTop: 2 }}>
          {unreadCount > 0 ? `${unreadCount} não lida${unreadCount > 1 ? "s" : ""}` : "Você está em dia ✨"}
        </p>
      </div>

      <div className="pad col gap-10 stagger" style={{ marginTop: 8 }}>
        {items.map((n) => {
          const I = ICONS[n.icon] || Bell;
          const tone = TONE[n.tone] || TONE.primary;
          return (
            <div
              key={n.id}
              className="lrow"
              style={{ alignItems: "flex-start", background: n.unread ? "var(--primary-tint)" : "var(--surface)", borderColor: n.unread ? "transparent" : "var(--line)" }}
              onClick={() => setItems((arr) => arr.map((x) => x.id === n.id ? { ...x, unread: false } : x))}
            >
              <span className="ic-box" style={{ background: tone.bg, color: tone.fg }}><I size={20} /></span>
              <div className="grow">
                <div className="ttl">{n.title}</div>
                <div className="sub">{n.body}</div>
              </div>
              <div className="col" style={{ alignItems: "flex-end", gap: 6 }}>
                <span className="t-xs muted">{n.time}</span>
                {n.unread && <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--primary)" }} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
