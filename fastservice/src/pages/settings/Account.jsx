import { useState } from "react";
import { User, Mail, Phone, MapPin, Pencil, Check } from "lucide-react";
import TopBar from "../../components/TopBar.jsx";
import { useAuthStore } from "../../store/authStore.js";
import { useToast } from "../../context/ToastContext.jsx";

export default function Account() {
  const toast = useToast();
  const user = useAuthStore((s) => s.user);
  const updateUser = useAuthStore((s) => s.updateUser);

  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "Gabriel Almeida",
    email: user?.email || "gabriel@email.com",
    phone: user?.phone || "(54) 99999-1234",
    address: user?.address || "R. Sen. Pinheiro, 304 — Centro",
  });

  const initials = form.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

  const fields = [
    { key: "name", icon: User, label: "Nome completo" },
    { key: "email", icon: Mail, label: "E-mail" },
    { key: "phone", icon: Phone, label: "Telefone" },
    { key: "address", icon: MapPin, label: "Endereço" },
  ];

  const save = () => { updateUser(form); setEdit(false); toast.success("Dados atualizados!"); };

  return (
    <div className="scroll-area page">
      <TopBar title="Conta" to="/settings" right={
        <button className="iconbtn ghost" onClick={() => (edit ? save() : setEdit(true))} aria-label="Editar">
          {edit ? <Check size={20} color="var(--success)" /> : <Pencil size={18} />}
        </button>
      } />

      <div className="pad center" style={{ flexDirection: "column", gap: 8, marginTop: 6 }}>
        <span className="avatar" style={{ width: 84, height: 84, fontSize: 30, background: "linear-gradient(135deg,var(--grad-a),var(--grad-b))" }}>{initials}</span>
        <div style={{ font: "800 19px var(--font-display)", marginTop: 6 }}>{form.name}</div>
        <div className="t-sm muted">Cliente desde 2024</div>
      </div>

      <div className="pad" style={{ marginTop: 10 }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Dados pessoais</div>
        <div className="col gap-10">
          {fields.map((f) => (
            <div key={f.key} className="card card-pad row gap-12">
              <span className="ic-box" style={{ width: 40, height: 40 }}><f.icon size={18} /></span>
              <div className="grow">
                <div className="t-xs muted">{f.label}</div>
                {edit ? (
                  <input
                    className="field-inline"
                    value={form[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    style={{ border: "none", outline: "none", font: "600 14.5px var(--font-display)", width: "100%", background: "transparent", color: "var(--ink)" }}
                  />
                ) : (
                  <div style={{ font: "600 14.5px var(--font-display)" }}>{form[f.key]}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => (edit ? save() : setEdit(true))}>
          {edit ? <><Check size={18} /> Salvar dados</> : <><Pencil size={17} /> Editar dados</>}
        </button>
      </div>
    </div>
  );
}
