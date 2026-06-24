import { useState, useEffect } from "react";
import { useNavigation, useRouter } from "simple-react-routing";
import { DeletarDivida, getDivida, postDivida } from "../services/dividaService";
import { listarMutuarios } from "../services/mutuarioService";

export function FormDivida() {
  const { pathParams } = useRouter();
  const codigo = pathParams["codigo"];
  const [listaMutuarios, setListaMutuarios] = useState([]);
  const [divida, setDivida] = useState({});
  const [erro, setErro] = useState("");
  const [idMutuario, setIdMutuario] = useState("");
  const { navigateTo } = useNavigation();

  const deletar = async (id) => {
    const response = await DeletarDivida(id);
    if (response.status == 200) {
      navigateTo(null, "/");
    } else {
      const data = await response.json();
      setErro("Erro: " + JSON.stringify(data, null, "\t"));
    }
  };

  useEffect(() => {
    listarMutuarios(-1).then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          setListaMutuarios(data);
          if (!codigo && data.length > 0) {
            setIdMutuario(String(data[0].id));
          }
        });
      }
    });

    if (codigo) {
      getDivida(codigo).then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            setDivida(data);
            setIdMutuario(String(data.mutuarioDaDivida.id));
          });
        }
      });
    }
  }, []);

  const salvarDivida = async (evento) => {
    evento.preventDefault();
    const dados = new FormData(evento.target);
    const payload = {
      valor: Number(dados.get("valor")),
      dataCriacao: dados.get("dataCriacao"),
      situacao: dados.get("situacao") === "pago",
      descricao: dados.get("descricao"),
      mutuarioDaDivida: { id: Number(idMutuario) },
    };

    if (dados.get("dataPagamento")) {
      payload.dataPagamento = dados.get("dataPagamento");
    }
    if (codigo) payload.id = Number(codigo);

    const resposta = await postDivida(payload);
    if (resposta.status == 200) {
      navigateTo(null, "/");
    } else {
      const mensagem = await resposta.json();
      setErro("Erro: " + JSON.stringify(mensagem, null, "\t"));
    }
  };

  return (
    <div className="form-page">
      <div className="form-section">
        <h1>{codigo ? "Editar" : "Cadastrar"} Dívida</h1>
        <p className="form-subtitle">
          {codigo ? "Atualize os dados da dívida abaixo." : "Preencha os dados para registrar uma nova dívida."}
        </p>

        <div className="form-card">
          <form onSubmit={salvarDivida}>
            <div className="form-item">
              <label htmlFor="valor">Valor (R$)</label>
              <input
                className="form-input"
                type="number"
                name="valor"
                id="valor"
                step="0.01"
                min="0.01"
                placeholder="0,00"
                defaultValue={divida.valor}
              />
            </div>

            <div className="form-item">
              <label htmlFor="mutuarioDaDivida">Mutuário responsável</label>
              <select
                className="form-input"
                value={idMutuario}
                name="mutuarioDaDivida"
                id="mutuarioDaDivida"
                onChange={(e) => setIdMutuario(e.target.value)}
              >
                {listaMutuarios.map((m) => (
                  <option value={String(m.id)} key={m.id}>
                    {m.nome} — Em aberto: R$ {Number(m.totalEmAberto || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </option>
                ))}
              </select>
            </div>

            <div className="dates-row">
              <div className="form-item">
                <label htmlFor="dataCriacao">Data de criação</label>
                <input
                  className="form-input"
                  type="date"
                  name="dataCriacao"
                  id="dataCriacao"
                  defaultValue={divida.dataCriacao?.substring(0, 10)}
                />
              </div>
              <div className="form-item">
                <label htmlFor="dataPagamento">Data de pagamento</label>
                <input
                  className="form-input"
                  type="date"
                  name="dataPagamento"
                  id="dataPagamento"
                  defaultValue={divida.dataPagamento?.substring(0, 10)}
                />
              </div>
            </div>

            <div className="form-item">
              <label htmlFor="descricao">Descrição</label>
              <textarea
                className="form-input"
                name="descricao"
                id="descricao"
                placeholder="Descreva a dívida..."
                defaultValue={divida.descricao}
              />
            </div>

            <div className="form-checkbox-row">
              <input
                type="checkbox"
                name="situacao"
                id="situacao"
                value="pago"
                defaultChecked={divida.situacao}
              />
              <label htmlFor="situacao">Marcar como paga</label>
            </div>

            <div className="form-actions">
              {codigo && (
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => deletar(divida.id)}
                >
                  Excluir dívida
                </button>
              )}
              <button className="btn btn-primary" type="submit">
                {codigo ? "Salvar alterações" : "Cadastrar"}
              </button>
              <button className="btn btn-ghost" type="button" onClick={() => navigateTo(null, "/")}>
                Cancelar
              </button>
            </div>
          </form>

          {erro && <div className="form-error">{erro}</div>}
        </div>
      </div>
    </div>
  );
}
