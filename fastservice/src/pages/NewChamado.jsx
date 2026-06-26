import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ImagePlus, CheckCircle2 } from "lucide-react";
import TopBar from "../components/TopBar.jsx";
import { useToast } from "../context/ToastContext.jsx";

const CATEGORIES = [
  "Manutenção elétrica", "Manutenção hidráulica", "Limpeza residencial",
  "Montagem de móveis", "Pintura", "Jardinagem",
];

export default function NewChamado() {
  const nav = useNavigate();
  const toast = useToast();
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [urgency, setUrgency] = useState("Média");
  const [photo, setPhoto] = useState(false);

  function submit() {
    if (!title.trim()) return toast.error("Dê um título ao chamado.");
    toast.success("Chamado aberto! Um profissional entrará em contato.");
    nav("/chamados?tab=historico", { replace: true });
  }

  return (
    <div className="scroll-area page">
      <TopBar title="Abrir chamado" to="/home" />

      <div className="pad">
        <div className="field">
          <label>Categoria do serviço</label>
          <div className="input-wrap" style={{ position: "relative" }}>
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
            <input placeholder="Ex: Tomada sem energia" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
        </div>

        <div className="field">
          <label>Descrição</label>
          <div className="input-wrap textarea-wrap">
            <textarea placeholder="Descreva o que está acontecendo…" value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>
        </div>

        <div className="field">
          <label>Urgência</label>
          <div className="seg">
            {["Baixa", "Média", "Alta"].map((u) => (
              <button key={u} className={urgency === u ? "on" : ""} onClick={() => setUrgency(u)}>{u}</button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Anexar foto</label>
          <div className="upload" onClick={() => setPhoto((p) => !p)} style={photo ? { borderColor: "var(--success)", color: "var(--success)", background: "var(--success-tint)" } : {}}>
            {photo ? <CheckCircle2 size={22} /> : <ImagePlus size={22} />}
            <span>{photo ? "Foto" : "Foto"}</span>
          </div>
        </div>
      </div>

      <div className="pad" style={{ marginTop: 18 }}>
        <button className="btn btn-primary" onClick={submit}>Abrir chamado</button>
      </div>
    </div>
  );
}
