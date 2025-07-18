import { useEffect, useState } from "react";
import "./lista_mutuarios.css";
import { listaMutuarios, idadeAtual, somarDividas } from "/src/services/mutuarioService";

export default function ListaMutuarios() {
  const [pagina, setPagina] = useState(1);
  const [pesquisa, setPesquisa] = useState("");
  const [mutuarios, setMutuarios] = useState([]);

  useEffect(() => {
    listaMutuarios(pagina, pesquisa).then((resposta) => {
      if (resposta.status == 200) {
        resposta.json().then((resposta) => {
          console.log(resposta);
          setMutuarios(resposta);
        });
      }
    });
  }, [pagina, pesquisa]);

  return (
    <>
      <div className="listaTitulo">
        <h1>Lista de mutuarios cadastrados</h1>
      </div>
      <div className="lista">
        {mutuarios.map((mutuario) => {
            let datanascimento =  idadeAtual(mutuario.nascimento)
            let somaDasDividas = somarDividas(mutuario.dividasDoMutuario)

          return (
            <>
              <div className="card">
                <div className="nome">
                  <h2>{mutuario.nome}</h2>
                </div>
                <div className="idade">Idade: {datanascimento}</div>
                <div className="email">
                  Email:
                  <a href="mailto:" className="email-link">
                    {" "}
                    {mutuario.email}
                  </a>
                </div>
                <div className="divida">Valor em aberto: R${somaDasDividas}</div>
                <hr />
                <div className="footer">
                  <button className="excluir lista-button">Excluir</button>
                  <button className="editar lista-button">Editar</button>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="page-navigator">
        <button
          className="lista-button anterior"
          onClick={() => setPagina(Math.max(1, pagina - 1))}
        >
          Anterior
        </button>
        <div className="current-page page-info">{pagina}</div>
        <button
          className="lista-button proxima"
          onClick={() => setPagina(pagina + 1)}
        >
          Proxima
        </button>
      </div>
    </>
  );
} 