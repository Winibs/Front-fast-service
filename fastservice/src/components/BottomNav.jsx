import { useNavigate, useLocation } from "react-router-dom";
import { Home, Search, MapPin, Bell, User } from "lucide-react";

const TABS = [
  { to: "/home", icon: Home },
  { to: "/search", icon: Search },
  { to: "/map", icon: MapPin },
  { to: "/notifications", icon: Bell },
  { to: "/profile", icon: User },
];

export default function BottomNav() {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const isActive = (to) => {
    if (to === "/profile") return pathname.startsWith("/profile") || pathname.startsWith("/settings");
    if (to === "/home") return pathname === "/home";
    return pathname.startsWith(to);
  };

  return (
    <nav className="bottomnav">
      {TABS.map(({ to, icon: I }) => (
        <button
          key={to}
          className={`navbtn ${isActive(to) ? "active" : ""}`}
          onClick={() => nav(to)}
          aria-label={to.slice(1)}
        >
          <I size={23} strokeWidth={isActive(to) ? 2.4 : 2} />
        </button>
      ))}
    </nav>
  );
}
