import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ImagePlus, CheckCircle2, ShieldAlert } from "lucide-react";
import TopBar from "../components/TopBar.jsx";
import { useToast } from "../context/ToastContext.jsx";

const CATEGORIES = [
  "Manutenção elétrica", "Manutenção hidráulica", "Limpeza residencial",
  "Montagem de móveis", "Pintura", "Jardinagem",
];

export default function NewReclamacao() {
  const nav = useNavigate();
  const toast = useToast();
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState(false);

  function submit() {
    if (!title.trim()) return toast.error("Informe um título para a reclamação.");
    toast.success("Reclamação registrada. Vamos analisar e responder em breve.");
    nav("/chamados?tab=reclamacoes", { replace: true });
  }

  return (
    <div className="scroll-area page">
      <TopBar title="Abrir reclamação" to="/chamados?tab=reclamacoes" />

      <div className="pad">
        <div className="lrow" style={{ background: "var(--danger-tint)", border: "none", marginBottom: 16, cursor: "default" }}>
          <span className="center" style={{ width: 40, height: 40, borderRadius: 11, background: "#fff", color: "var(--danger)" }}>
            <ShieldAlert size={20} />
          </span>
          <div className="sub" style={{ color: "#9a3030" }}>
            Conte o que aconteceu. Sua reclamação é confidencial e analisada pela nossa equipe.
          </div>
        </div>

        <div className="field">
          <label>Categoria do serviço</label>
          <div className="input-wrap">
            <select
              value={category} onChange={(e) => setCategory(e.target.value)}
              style={{ border: "none", outline: "none", background: "transparent", width: "100%", fontSize: 15, color: "var(--ink)", appearance: "none", cursor: "pointer" }}
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown size={18} />
          </div>
        </div>

        <div className="field">
          <label>Título</label>
          <div className="input-wrap">
            <input placeholder="Ex: Atraso no atendimento" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
        </div>

        <div className="field">
          <label>Descrição</label>
          <div className="input-wrap textarea-wrap">
            <textarea placeholder="Descreva o que aconteceu…" value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>
        </div>

        <div className="field">
          <label>Anexar foto</label>
          <div className="upload" onClick={() => setPhoto((p) => !p)} style={photo ? { borderColor: "var(--success)", color: "var(--success)", background: "var(--success-tint)" } : {}}>
            {photo ? <CheckCircle2 size={22} /> : <ImagePlus size={22} />}
            <span>Foto</span>
          </div>
        </div>
      </div>

      <div className="pad" style={{ marginTop: 18 }}>
        <button className="btn btn-primary" onClick={submit}>Registrar reclamação</button>
      </div>
    </div>
  );
}
