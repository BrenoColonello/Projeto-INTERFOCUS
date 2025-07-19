/* eslint-disable react/prop-types */

import { Link, useNavigation } from "simple-react-routing";
import { DeletarDivida, mudarSituacao } from "../services/dividaService";

export default function CardDivida({ divida }) {
  const criacao = new Date(divida.dataCriacao);
  const criacaodata = `${criacao.getDate()}/${
    criacao.getMonth() + 1
  }/${criacao.getFullYear()}`;
  const aberto = "Em aberto!";

  const { navigateTo } = useNavigation();
  const deletar = async (id) => {
    DeletarDivida(id).then((response) => {
      if (response.status == 200) {
        response.json().then(() => {
          navigateTo(null, "/");
          window.location.reload();
        });
      }
    });
  };

  let pagamento, pagamentodata;

  if (divida.dataPagamento != null) {
    pagamento = new Date(divida.pagamento);
    pagamentodata = `${pagamento.getDate()}/${
      pagamento.getMonth() + 1
    }/${pagamento.getFullYear()}`;
  } else {
    pagamentodata = aberto;
  }

  return (
    <>
      <div className="card-divida">
        <div className="card-header">
          <h3>Valor: {divida.valor}</h3>
          <p>Id: {divida.id}</p>
        </div>
        <hr />
        <div className="card-divida-main-content">
          <div className="sobre">
            <p>Descrição: {divida.descricao}</p>
          </div>
          <hr />
          <div className="card-divida-datas">
            <p>Criação: {criacaodata}</p>
            <p>
              Pagamento:{" "}
              <span className={pagamentodata == aberto ? "open" : "paid"}>
                {pagamentodata}
              </span>
            </p>
          </div>
        </div>
        <hr />
        <div className="card-footer">
          <button className="card-button" onClick={() => deletar(divida.id)}>
            Excluir
          </button>

          <Link to={"/dividas/" + divida.id}>
            <button className="card-button">Editar</button>
          </Link>

          <button
            className={
              divida.situacao == false
                ? "card-button setPaid"
                : "card-button setOpen"
            }
            onClick={() => {
              mudarSituacao(divida.id, !divida.situacao);
            }}
          >
            {divida.situacao == false
              ? "Marcar como paga"
              : "Marcar como aberta"}
          </button>
        </div>
      </div>
    </>
  );
} 