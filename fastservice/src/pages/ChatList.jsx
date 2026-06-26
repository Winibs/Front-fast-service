import { useNavigate } from "react-router-dom";
import { PenSquare, Search } from "lucide-react";
import { useState } from "react";
import { CONVERSATIONS } from "../data/mock.js";

export default function ChatList() {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const list = CONVERSATIONS.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="scroll-area page">
      <div className="pad" style={{ paddingTop: 12 }}>
        <div className="between">
          <h1 className="h-title">Conversas</h1>
          <button className="iconbtn ghost" aria-label="Nova conversa"><PenSquare size={20} /></button>
        </div>
        <p className="t-sm muted" style={{ marginTop: 2, marginBottom: 14 }}>Mensagens recentes</p>
        <div className="input-wrap" style={{ marginBottom: 6 }}>
          <Search size={18} />
          <input placeholder="Buscar conversa…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>

      <div className="pad col gap-8 stagger">
        {list.map((c) => (
          <div key={c.id} className="lrow" onClick={() => nav(`/chat/${c.id}`)}>
            <span className="avatar" style={{ background: c.color, position: "relative" }}>
              {c.initials}
              {c.online && <span style={{ position: "absolute", right: 0, bottom: 0, width: 12, height: 12, borderRadius: "50%", background: "var(--success)", border: "2px solid #fff" }} />}
            </span>
            <div className="grow" style={{ minWidth: 0 }}>
              <div className="ttl">{c.name}</div>
              <div className="sub" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 200 }}>{c.last}</div>
            </div>
            <div className="col" style={{ alignItems: "flex-end", gap: 6 }}>
              <span className="conv-time">{c.time}</span>
              {c.unread > 0 && <span className="unread-pill">{c.unread}</span>}
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <div className="empty">
            <div className="emoji"><Search size={28} /></div>
            <p className="muted">Nenhuma conversa encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
}
