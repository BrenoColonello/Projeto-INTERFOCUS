import { useEffect, useState } from "react";
import { listarMutuarios } from "../services/mutuarioService";
import ListaMutuario from "../components/ListaMutuario";
import { Link } from "simple-react-routing";

export default function Home() {
  const [pagina, setPagina] = useState(1);
  const [mutuarios, setMutuarios] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    listarMutuarios(pagina, pesquisa).then((response) => {
      if (response.status == 200) {
        response.json().then((content) => {
          setMutuarios(content);
        });
      }
    });
  }, [pagina, pesquisa]);

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Mutuários</h1>
        <p>Gerencie mutuários e suas dívidas cadastradas no sistema.</p>
      </div>

      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="search"
            className="search-input"
            onChange={(event) => {
              setPesquisa(event.target.value);
              setPagina(1);
            }}
            placeholder="Buscar por nome ou CPF..."
          />
        </div>
        <div className="action-buttons">
          <Link to="mutuarios">
            <button className="btn btn-ghost">+ Mutuário</button>
          </Link>
          <Link to="dividas">
            <button className="btn btn-primary">+ Dívida</button>
          </Link>
        </div>
      </div>

      <Pagination pagina={pagina} setPagina={setPagina} />

      {mutuarios.length === 0 ? (
        <div className="no-mutuario-msg" style={{ marginTop: 40, padding: 40 }}>
          <p style={{ fontSize: '1rem' }}>Nenhum mutuário encontrado.</p>
        </div>
      ) : (
        mutuarios.map((mutuario) => (
          <ListaMutuario key={mutuario.id} mutuario={mutuario} />
        ))
      )}

      {mutuarios.length > 0 && (
        <Pagination pagina={pagina} setPagina={setPagina} />
      )}
    </div>
  );
}

function Pagination({ pagina, setPagina }) {
  return (
    <div className="pagination">
      <button
        className={`btn btn-ghost btn-sm ${pagina === 1 ? 'esconder' : ''}`}
        onClick={() => setPagina(Math.max(1, pagina - 1))}
      >
        ← Anterior
      </button>
      <span className="pagination-info">Página {pagina}</span>
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => setPagina(pagina + 1)}
      >
        Próximo →
      </button>
    </div>
  );
}
