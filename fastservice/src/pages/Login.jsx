import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Phone, Clock, Loader2, Zap } from "lucide-react";
import StatusBar from "../components/StatusBar.jsx";
import { useAuthStore } from "../store/authStore.js";
import { useToast } from "../context/ToastContext.jsx";
import { api } from "../lib/api.js";

export default function Login() {
  const nav = useNavigate();
  const toast = useToast();
  const { login, loading } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  async function handleLogin() {
    const ok = await login({ email, password });
    if (ok) {
      toast.success("Bem-vindo de volta!");
      nav("/home", { replace: true });
    } else {
      toast.error(useAuthStore.getState().error || "Não foi possível entrar.");
    }
  }

  return (
    <>
      <StatusBar />
      <div className="screen">
        <div className="pad page" style={{ paddingTop: 28, paddingBottom: 32 }}>
          {/* brand hero */}
          <div className="center col gap-12" style={{ marginBottom: 28 }}>
            <div
              className="center"
              style={{
                width: 74, height: 74, borderRadius: 22,
                background: "linear-gradient(135deg,var(--grad-a),var(--primary-600))",
                color: "#fff", boxShadow: "var(--sh-primary)",
              }}
            >
              <Clock size={36} />
            </div>
            <div className="center col gap-4">
              <h1 style={{ font: "800 30px var(--font-display)", letterSpacing: "-0.03em" }}>
                Fast<span style={{ color: "var(--primary)" }}>Service</span>
              </h1>
              <p className="muted t-sm">Serviços para sua casa em minutos</p>
            </div>
          </div>

          <h2 className="h-title" style={{ marginBottom: 4 }}>Bem-vindo de volta</h2>
          <p className="muted t-sm" style={{ marginBottom: 22 }}>Faça login para continuar</p>

          <div className="field">
            <label>E-mail</label>
            <div className="input-wrap">
              <Mail size={18} />
              <input
                type="email" placeholder="seu@email.com" value={email}
                onChange={(e) => setEmail(e.target.value)} autoComplete="email"
              />
            </div>
          </div>

          <div className="field">
            <label>Senha</label>
            <div className="input-wrap">
              <Lock size={18} />
              <input
                type={show ? "text" : "password"} placeholder="••••••••" value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                autoComplete="current-password"
              />
              <span className="input-eye" onClick={() => setShow((s) => !s)}>
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          <div className="between" style={{ marginBottom: 20 }}>
            <span />
            <span className="link t-sm" onClick={() => toast.info("Enviamos um link de recuperação.")}>
              Esqueceu sua senha?
            </span>
          </div>

          <button className="btn btn-primary" disabled={loading} onClick={handleLogin}>
            {loading ? <Loader2 size={18} className="spin" /> : "Entrar"}
          </button>

          <div className="row gap-12" style={{ margin: "18px 0" }}>
            <div className="divider grow" />
            <span className="muted t-xs">ou</span>
            <div className="divider grow" />
          </div>

          <button className="btn btn-outline" onClick={() => toast.info("Login por telefone em breve.")}>
            <Phone size={18} /> Entrar com telefone
          </button>

          <p className="center t-sm muted" style={{ marginTop: 22 }}>
            Ainda não tem conta?{" "}
            <Link to="/register" className="link" style={{ marginLeft: 4 }}>Cadastre-se</Link>
          </p>

          {api.demo && (
            <div
              className="row gap-8"
              style={{
                marginTop: 22, padding: "11px 13px", borderRadius: "var(--r-sm)",
                background: "var(--spark-tint)", color: "#b34a2e", fontSize: 12.5,
              }}
            >
              <Zap size={15} />
              <span>Modo demonstração — entre com qualquer e-mail e senha.</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
