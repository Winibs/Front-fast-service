import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AppLayout from "./components/AppLayout.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import ServiceDetail from "./pages/ServiceDetail.jsx";
import OrderConfirm from "./pages/OrderConfirm.jsx";
import Chamados from "./pages/Chamados.jsx";
import NewChamado from "./pages/NewChamado.jsx";
import NewReclamacao from "./pages/NewReclamacao.jsx";
import MapPage from "./pages/MapPage.jsx";
import ChatList from "./pages/ChatList.jsx";
import ChatConversation from "./pages/ChatConversation.jsx";
import Notifications from "./pages/Notifications.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import Privacy from "./pages/settings/Privacy.jsx";
import Account from "./pages/settings/Account.jsx";
import Payments from "./pages/settings/Payments.jsx";
import NotificationsSettings from "./pages/settings/NotificationsSettings.jsx";
import Help from "./pages/settings/Help.jsx";
import About from "./pages/settings/About.jsx";

export default function App() {
  const loc = useLocation();
  return (
    <Routes location={loc} key={loc.pathname}>
      {/* públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* protegidas com bottom nav */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/service/:id/confirmar" element={<OrderConfirm />} />
        <Route path="/chamados" element={<Chamados />} />
        <Route path="/chamados/novo" element={<NewChamado />} />
        <Route path="/reclamacoes/novo" element={<NewReclamacao />} />
        <Route path="/chat" element={<ChatList />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/privacidade" element={<Privacy />} />
        <Route path="/settings/conta" element={<Account />} />
        <Route path="/settings/pagamentos" element={<Payments />} />
        <Route path="/settings/notificacoes" element={<NotificationsSettings />} />
        <Route path="/settings/ajuda" element={<Help />} />
        <Route path="/settings/sobre" element={<About />} />
      </Route>

      {/* protegidas sem bottom nav (tela cheia) */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout nav={false} />
          </ProtectedRoute>
        }
      >
        <Route path="/chat/:id" element={<ChatConversation />} />
      </Route>

      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
