import "./navbar.css";
import { Link } from "simple-react-routing";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <div className="navbar-brand-icon">IF</div>
        <span className="navbar-brand-text">Inter<span>focus</span></span>
      </Link>

      <div className="navbar-links">
        <Link to="/mutuarios">Novo Mutuário</Link>
        <Link to="/dividas" className="navbar-btn">+ Nova Dívida</Link>
      </div>
    </nav>
  );
}
