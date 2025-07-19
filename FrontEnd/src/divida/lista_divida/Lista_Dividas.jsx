import { useEffect, useState } from "react";
import "../../mutuarios/lista_mutuarios/lista_mutuarios.css";
import "./lista_dividas.css";
import { Link } from "simple-react-routing";
import { listarDividas } from "../../services/dividaService";

export default function ListaDividas() {
  const [pagina, setPagina] = useState(1);
  const [pesquisa, setPesquisa] = useState("");
  const [dividas, setDividas] = useState([]);

  useEffect(() => {
    listarDividas(pagina, pesquisa).then((resposta) => {
      if (resposta.status == 200) {
        resposta.json().then((resposta) => {
          setDividas(resposta);
        });
      }
    });
  }, [pagina, pesquisa]);

  // TODO Organizar melhor retorno?

  return (
    <>
      <div className="listaTitulo">
        <h1>Lista de dividas cadastradas</h1>
      </div>
      <div className="lista-actions">
        <div className="action-elements">
          <div className="cadastrar">
            <button className="lista-button">Cadastrar divida</button>
          </div>
          <div className="pesquisa">
            <input
              type="search"
              placeholder="Buscar divida"
              value={pesquisa}
              onChange={(event) => {
                setPesquisa(event.target.value);
                setPagina(1);
              }}
            />
          </div>
        </div>
      </div>

      <div className="lista">
        {dividas.map((divida) => {
          let datacriacao = new Date(divida.dataCriacao);
          let diacriacao = datacriacao.getDate();
          let mescriacao = datacriacao.getMonth() + 1;
          let anocriacao = datacriacao.getFullYear();

          let textocriacao = `${diacriacao}/${mescriacao}/${anocriacao}`;

          let textopagamento = "Em aberto!";

          if (divida.dataPagamento != null) {
            let dataPagamento = new Date(divida.dataPagamento);
            let diapagamento = dataPagamento.getDate();
            let mespagamento = dataPagamento.getMonth() + 1;
            let anopagamento = dataPagamento.getFullYear();

            textopagamento = `${diapagamento}/${mespagamento}/${anopagamento}`;
          }

          return (
            <>
              <div className="card">
                <div className="main-info-divida">
                  <h2>Id: {divida.id}</h2>
                  <h2>Valor: {divida.valor}</h2>
                </div>
                <hr />
                <div className="divida-mutuario-info">
                  <h3>Dono: {divida.mutuarioDaDivida.nome}</h3>
                  <p>Cpf: {divida.mutuarioDaDivida.cpf}</p>
                  <p>
                    Email: <a href="mailto:">{divida.mutuarioDaDivida.email}</a>
                  </p>
                </div>
                <hr />
                <p>
                  Situacão:{" "}
                  <span className={divida.situacao ? "paid" : "open"}>
                    {" "}
                    {divida.situacao ? "Pago" : "Não Pago"}
                  </span>
                </p>
                <p>Descricão: {divida.descricao}</p>
                <hr />
                <div className="datas">
                  <p>Data de criacao {textocriacao}</p>
                  <p>Data de pagamento: {textopagamento} </p>
                </div>
                <hr />
                <div className="footer">
                  <button className="excluir lista-button">Excluir</button>
                  <Link to={"/dividas/" + divida.id}>
                    <button className="editar lista-button">Editar</button>
                  </Link>
                  <button className="lista-button make-paid">Marcar como paga</button>
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