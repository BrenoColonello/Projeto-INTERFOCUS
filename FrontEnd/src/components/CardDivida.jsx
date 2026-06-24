/* eslint-disable react/prop-types */
import { Link, useNavigation } from "simple-react-routing";
import { DeletarDivida, mudarSituacao } from "../services/dividaService";

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
}

function formatCurrency(value) {
  return Number(value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function CardDivida({ divida }) {
  const { navigateTo } = useNavigation();

  const deletar = async (id) => {
    const response = await DeletarDivida(id);
    if (response.status == 200) {
      navigateTo(null, "/");
      window.location.reload();
    }
  };

  const criacaoStr = formatDate(divida.dataCriacao);
  const pagamentoStr = divida.dataPagamento ? formatDate(divida.dataPagamento) : null;
  const pago = !!divida.situacao;

  return (
    <div className="card-divida">
      <div className="card-divida-header">
        <span className="card-divida-value">{formatCurrency(divida.valor)}</span>
        <span className={pago ? "badge badge-paid" : "badge badge-open"}>
          {pago ? "Pago" : "Em aberto"}
        </span>
      </div>

      {divida.descricao && (
        <p className="card-divida-descricao">{divida.descricao}</p>
      )}

      <div className="card-divida-datas">
        <p>Criação: {criacaoStr}</p>
        <p>Pagamento: {pagamentoStr ?? "—"}</p>
      </div>

      <div className="card-divida-footer">
        <button className="btn btn-danger btn-sm" onClick={() => deletar(divida.id)}>
          Excluir
        </button>
        <Link to={"/dividas/" + divida.id}>
          <button className="btn btn-ghost btn-sm">Editar</button>
        </Link>
        <button
          className={pago ? "btn btn-outline-open btn-sm" : "btn btn-success btn-sm"}
          onClick={() => mudarSituacao(divida.id, !divida.situacao)}
        >
          {pago ? "Reabrir" : "Marcar pago"}
        </button>
      </div>
    </div>
  );
}
