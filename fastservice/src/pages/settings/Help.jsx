import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, Headphones } from "lucide-react";
import TopBar from "../../components/TopBar.jsx";

const FAQ = [
  { q: "Como abrir um chamado?", a: "Vá em Início › Abrir chamado, escolha a categoria, descreva o problema e envie. Você acompanha tudo na aba Chamados." },
  { q: "Como cancelar um pedido?", a: "Abra o pedido em Chamados, toque nele e selecione Cancelar. Cancelamentos com mais de 1h de antecedência não têm custo." },
  { q: "Quais formas de pagamento?", a: "Aceitamos cartões de crédito (Visa, Master) e Pix. Você gerencia tudo em Configurações › Pagamentos." },
  { q: "Como avaliar um profissional?", a: "Após a conclusão do serviço você recebe uma notificação para avaliar de 1 a 5 estrelas e deixar um comentário." },
];

export default function Help() {
  const nav = useNavigate();
  const [open, setOpen] = useState(null);
  const [q, setQ] = useState("");
  const list = FAQ.filter((f) => f.q.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="scroll-area page">
      <TopBar title="Ajuda" to="/settings" />
      <div className="pad" style={{ marginTop: 6 }}>
        <div className="input-wrap" style={{ marginBottom: 18 }}>
          <Search size={18} />
          <input placeholder="Buscar na ajuda…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>

        <div className="eyebrow" style={{ marginBottom: 10 }}>Perguntas frequentes</div>
        <div className="col gap-10">
          {list.map((f, i) => (
            <div key={i} className="card" style={{ overflow: "hidden" }}>
              <button
                className="between"
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", padding: 16, background: "none", border: "none", cursor: "pointer", textAlign: "left", font: "600 14px var(--font-display)", color: "var(--ink)" }}
              >
                <span>{f.q}</span>
                <ChevronDown size={18} className="muted" style={{ transition: "transform .2s", transform: open === i ? "rotate(180deg)" : "none", flex: "0 0 auto" }} />
              </button>
              {open === i && <div className="t-sm muted" style={{ padding: "0 16px 16px", lineHeight: 1.5 }}>{f.a}</div>}
            </div>
          ))}
          {list.length === 0 && <p className="muted t-sm" style={{ textAlign: "center", padding: 20 }}>Nada encontrado para “{q}”.</p>}
        </div>

        <button className="btn btn-primary" style={{ marginTop: 18, height: 58 }} onClick={() => nav("/chat/suporte")}>
          <Headphones size={20} />
          <span className="col" style={{ alignItems: "flex-start", lineHeight: 1.2 }}>
            <span>Falar com suporte</span>
            <span style={{ fontSize: 11, fontWeight: 500, opacity: 0.85 }}>Resposta em até 5 minutos</span>
          </span>
        </button>
      </div>
    </div>
  );
}
