import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const push = useCallback(
    (message, type = "default", ttl = 2800) => {
      const id = Date.now() + Math.random();
      setToasts((t) => [...t, { id, message, type }]);
      setTimeout(() => remove(id), ttl);
      return id;
    },
    [remove]
  );

  const toast = {
    show: (m) => push(m, "default"),
    success: (m) => push(m, "success"),
    error: (m) => push(m, "error", 3600),
    info: (m) => push(m, "info"),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="toast-host">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`} onClick={() => remove(t.id)}>
            <span className="t-ic">
              {t.type === "success" && <CheckCircle2 size={18} />}
              {t.type === "error" && <AlertCircle size={18} />}
              {(t.type === "info" || t.type === "default") && <Info size={18} />}
            </span>
            <span className="grow">{t.message}</span>
            <X size={16} style={{ opacity: 0.6 }} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast deve ser usado dentro de <ToastProvider>");
  return ctx;
}
