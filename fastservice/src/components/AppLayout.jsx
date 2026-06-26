import { Outlet } from "react-router-dom";
import StatusBar from "./StatusBar.jsx";
import BottomNav from "./BottomNav.jsx";

export default function AppLayout({ nav = true }) {
  return (
    <>
      <StatusBar />
      <div className="screen">
        <Outlet />
      </div>
      {nav && <BottomNav />}
    </>
  );
}
