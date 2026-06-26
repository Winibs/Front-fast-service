import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function TopBar({ title, back = true, to = -1, right = null, brand = false }) {
  const nav = useNavigate();
  return (
    <header className="topbar">
      {back && (
        <button className="iconbtn ghost" onClick={() => nav(to)} aria-label="Voltar">
          <ChevronLeft size={24} />
        </button>
      )}
      {brand ? (
        <div className="brand grow">
          <span className="brand-name">
            Fast<b>Service</b>
          </span>
        </div>
      ) : (
        <h1 className="grow" style={{ textAlign: back ? "center" : "left" }}>
          {title}
        </h1>
      )}
      {back && !right && <div style={{ width: 40 }} />}
      {right}
    </header>
  );
}
