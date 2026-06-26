import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, Phone, Send, Paperclip } from "lucide-react";
import { CONVERSATIONS, MESSAGES } from "../data/mock.js";

const SUPPORT = { id: "suporte", name: "Suporte FastService", initials: "FS", color: "#ff7a59", online: true };

export default function ChatConversation() {
  const { id } = useParams();
  const nav = useNavigate();
  const contact = CONVERSATIONS.find((c) => c.id === id) || SUPPORT;
  const seed = MESSAGES[id] || [
    { from: "them", text: `Olá! Aqui é ${contact.name}. Como posso ajudar?`, time: "agora" },
  ];
  const [msgs, setMsgs] = useState(seed);
  const [text, setText] = useState("");
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    const now = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    setMsgs((m) => [...m, { from: "me", text: t, time: now }]);
    setText("");
    // resposta automática simulada
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "them", text: "Perfeito, anotado! 👍", time: now }]);
    }, 900);
  };

  return (
    <div className="page" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* header */}
      <header className="topbar" style={{ borderBottom: "1px solid var(--line)" }}>
        <button className="iconbtn ghost" onClick={() => nav(-1)} aria-label="Voltar"><ChevronLeft size={24} /></button>
        <span className="avatar" style={{ background: contact.color, width: 40, height: 40, fontSize: 14 }}>{contact.initials}</span>
        <div className="grow" style={{ marginLeft: 4 }}>
          <div style={{ font: "700 15px var(--font-display)" }}>{contact.name}</div>
          <div className="t-xs" style={{ color: contact.online ? "var(--success)" : "var(--muted)" }}>
            {contact.online ? "online agora" : "visto recentemente"}
          </div>
        </div>
        <button className="iconbtn ghost" aria-label="Ligar"><Phone size={20} /></button>
      </header>

      {/* mensagens */}
      <div className="scroll-area" style={{ flex: 1, padding: "16px 14px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div className="chat-daysep">Hoje</div>
        {msgs.map((m, i) => (
          <div key={i} className={`bubble ${m.from}`}>
            {m.text}
            <div className="bubble-time" style={{ textAlign: m.from === "me" ? "right" : "left", color: m.from === "me" ? "rgba(255,255,255,.8)" : "var(--muted-2)" }}>{m.time}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* barra de envio */}
      <div className="chatbar">
        <button className="iconbtn ghost" aria-label="Anexar"><Paperclip size={20} /></button>
        <div className="input-wrap grow" style={{ height: 46 }}>
          <input
            placeholder="Mensagem…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
        </div>
        <button className="iconbtn" onClick={send} aria-label="Enviar" style={{ background: "var(--primary)", color: "#fff", width: 46, height: 46 }}>
          <Send size={19} />
        </button>
      </div>
    </div>
  );
}
