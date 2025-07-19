import { useEffect, useState } from "react";
import { listarMutuarios } from "../services/mutuarioService";
import ListaCliente from "../components/ListaMutuario";

export default function Home() {
  const [pagina, setPagina] = useState(1);
  const [mutuarios, setMutuarios] = useState([]);
  const [pesquisa, setPesquisa] = useState("")

  useEffect(() => {
    listarMutuarios(pagina, pesquisa).then((response) => {
      if (response.status == 200) {
        response.json().then(content => {
          setMutuarios(content)
        })
      }
    })
  }, [pagina, pesquisa]);

  return (
    <>
      <div className="logo">
        <h1>Exibindo informações de mutuarios cadastrados</h1>
      </div>
      <div className="search">
        <input type="search" name="" id="" className="searchbar" onChange={(event) => setPesquisa(event.target.value)} placeholder="Pesquisar cliente"/>
      </div>

      {mutuarios.map((mutuario) => {
        return (<ListaMutuario key={mutuario.id} mutuario={mutuario}></ListaMutuario>)
      })}

      <div className="footer">
        <div
          className={pagina == 1 ? "esconder button-list" : "button-list"}
          onClick={() => {
            setPagina(Math.max(1, pagina - 1));
          }}
        >
          Anterior
        </div>
        {pagina}
        <div className="button-nav" onClick={() => setPagina(pagina + 1)}>
          Proximo
        </div>
      </div>
    </>
  );
}