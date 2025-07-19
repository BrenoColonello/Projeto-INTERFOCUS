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
    <>
      <div className="logo">
        <h1>Exibindo informações de mutuarios cadastrados</h1>
      </div>
      <div className="search">
        <input
          type="search"
          name=""
          id=""
          className="searchbar"
          onChange={(event) => {
            setPesquisa(event.target.value);
            setPagina(1);
          }}
          placeholder="Pesquisar mutuario"
        />
        <div className="cadastros">
          <Link to="mutuarios">
            <button className="card-button">Cadastrar mutuario</button>
          </Link>

          <Link to="dividas">
            <button className="card-button">Cadastrar divida</button>
          </Link>
        </div>
      </div>

      <div className="footer">
        <div
          className={pagina == 1 ? "esconder card-button" : "card-button"}
          onClick={() => {
            setPagina(Math.max(1, pagina - 1));
          }}
        >
          Anterior
        </div>
        {pagina}
        <div className="card-button" onClick={() => setPagina(pagina + 1)}>
          Proximo
        </div>
      </div>

      {mutuarios.map((mutuario) => {
        return <ListaMutuario key={mutuario.id} mutuario={mutuario}></ListaMutuario>
      })}

      <div className="footer">
        <div
          className={pagina == 1 ? "esconder card-button" : "card-button"}
          onClick={() => {
            setPagina(Math.max(1, pagina - 1));
          }}
        >
          Anterior
        </div>
        {pagina}
        <div className="card-button" onClick={() => setPagina(pagina + 1)}>
          Proximo
        </div>
      </div>
    </>
  );
}