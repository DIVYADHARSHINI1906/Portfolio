import Portfolio from "./Divyadharshini_portfolio";
import AdminPage from "./AdminPage";

export default function App() {
  // Visit /admin in browser to open admin page
  const isAdmin = window.location.pathname === "/admin";
  return isAdmin ? <AdminPage /> : <Portfolio />;
}