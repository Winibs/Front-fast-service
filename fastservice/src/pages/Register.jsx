import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Loader2, ChevronLeft, Check } from "lucide-react";
import StatusBar from "../components/StatusBar.jsx";
import { useAuthStore } from "../store/authStore.js";
import { useToast } from "../context/ToastContext.jsx";

export default function Register() {
  const nav = useNavigate();
  const toast = useToast();
  const { register, loading } = useAuthStore();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [show, setShow] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const strength = (() => {
    const p = form.password;
    let s = 0;
    if (p.length >= 6) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();
  const strengthLabel = ["", "fraca", "ok", "boa", "forte"][strength];

  async function handleRegister() {
    if (!form.name || !form.email || !form.password) return toast.error("Preencha todos os campos.");
    if (form.password !== form.confirm) return toast.error("As senhas não conferem.");
    const ok = await register({ name: form.name, email: form.email, password: form.password });
    if (ok) {
      toast.success("Conta criada com sucesso!");
      nav("/home", { replace: true });
    } else {
      toast.error(useAuthStore.getState().error || "Não foi possível cadastrar.");
    }
  }

  return (
    <>
      <StatusBar />
      <div className="screen">
        <div className="pad page" style={{ paddingTop: 8, paddingBottom: 32 }}>
          <button className="iconbtn ghost" onClick={() => nav("/login")} style={{ marginBottom: 8 }}>
            <ChevronLeft size={24} />
          </button>

          <h2 className="h-title" style={{ marginBottom: 4 }}>Criar conta</h2>
          <p className="muted t-sm" style={{ marginBottom: 22 }}>É rápido — leva menos de um minuto</p>

          <div className="field">
            <label>Nome completo</label>
            <div className="input-wrap">
              <User size={18} />
              <input placeholder="Gabriel Almeida" value={form.name} onChange={set("name")} />
            </div>
          </div>

          <div className="field">
            <label>E-mail</label>
            <div className="input-wrap">
              <Mail size={18} />
              <input type="email" placeholder="seu@email.com" value={form.email} onChange={set("email")} />
            </div>
          </div>

          <div className="field">
            <label>Senha</label>
            <div className="input-wrap">
              <Lock size={18} />
              <input
                type={show ? "text" : "password"} placeholder="Crie uma senha"
                value={form.password} onChange={set("password")}
              />
              <span className="input-eye" onClick={() => setShow((s) => !s)}>
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            {form.password && (
              <div className="row gap-8" style={{ marginTop: 2 }}>
                <div className="bar grow" style={{ height: 5 }}>
                  <i style={{ width: `${(strength / 4) * 100}%`, background: strength >= 3 ? "var(--success)" : "var(--warning)" }} />
                </div>
                <span className="t-xs muted">{strengthLabel}</span>
              </div>
            )}
          </div>

          <div className="field">
            <label>Confirmar senha</label>
            <div className="input-wrap">
              <Lock size={18} />
              <input
                type={show ? "text" : "password"} placeholder="Repita a senha"
                value={form.confirm} onChange={set("confirm")}
                onKeyDown={(e) => e.key === "Enter" && handleRegister()}
              />
              {form.confirm && form.confirm === form.password && (
                <Check size={18} style={{ color: "var(--success)" }} />
              )}
            </div>
          </div>

          <button className="btn btn-primary" disabled={loading} onClick={handleRegister} style={{ marginTop: 6 }}>
            {loading ? <Loader2 size={18} className="spin" /> : "Criar conta"}
          </button>

          <p className="center t-sm muted" style={{ marginTop: 22 }}>
            Já tem conta?{" "}
            <Link to="/login" className="link" style={{ marginLeft: 4 }}>Entrar</Link>
          </p>
        </div>
      </div>
    </>
  );
}
