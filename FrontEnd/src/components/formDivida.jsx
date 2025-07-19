import { useState, useEffect } from "react";
import { useNavigation, useRouter } from "simple-react-routing";
import {
  DeletarDivida,
  getDivida,
  postDivida,
} from "../services/dividaService";
import { listarMutuarios } from "../services/mutuarioService";

export function FormDivida() {
  const { pathParams } = useRouter();
  const codigo = pathParams["codigo"];
  const [ListaMutuarios, setListaMutuarios] = useState([]);
  const [divida, setDivida] = useState({});
  const [erro, setErro] = useState("");
  const [idMutuario, setIdMutuario] = useState(null);

  const { navigateTo } = useNavigation();

  const deletar = async (id) => {
    DeletarDivida(id).then((response) => {
      if (response.status == 200) {
        response.json().then(() => {
          navigateTo(null, "/");
        });
      } else {
        response.json().then((response) => {
          setErro("Erro: " + JSON.stringify(response, null, "\t"));
        });
      }
    });
  };

  useEffect(() => {
    listarMutuarios(-1).then((response) => {
      if (response.status == 200) {
        response.json().then((response) => {
          setListaMutuarios(response);
        });
      }
    });

    if (codigo) {
      getDivida(codigo).then((response) => {
        if (response.status == 200) {
          response.json().then((response) => {
            // setMutuario(response);
            setDivida(response);
            setIdMutuario(response.mutuarioDaDivida.id);
            console.log(response);
          });
        }
      });
    }
  }, []);

  const salvarDivida = async (evento) => {
    evento.preventDefault();
    let dados = new FormData(evento.target);
    let divida = {
      valor: dados.get("valor"),
      dataCriacao: dados.get("dataCriacao"),
      situacao: dados.get("situacao") == "pago" ? true : false,
      descricao: dados.get("descricao"),
      mutuarioDaDivida: {
        id: dados.get("mutuarioDaDivida"),
      },
    };

    if (dados.get("dataPagamento")) {
      divida.dataPagamento = dados.get("dataPagamento")
    }

    if (codigo) {
      divida.id = codigo;
    }


    let resposta = await postDivida(divida);
    if (resposta.status == 200) {
      navigateTo(null, "/");
    } else {
      let mensagem = await resposta.json();
      setErro("Erro: " + JSON.stringify(mensagem, null, "\t"));
    }
  };

  return (
    <>
      <div className="form-mutuario">
        <h1>{codigo ? "Editar" : "Cadastrar"} divida</h1>
        <form onSubmit={salvarDivida}>
          <div className="nome form-item">
            <label htmlFor="valor">Valor divida:</label>
            <input
              type="number"
              name="valor"
              id="valor"
              defaultValue={divida.valor}
            />
          </div>
          <div className="situacao ">
            <label htmlFor="situacao">Paga?</label>
            <input
              type="checkbox"
              name="situacao"
              id="situacao"
              value="pago"
              defaultChecked={divida.situacao}
            />
          </div>
          <div className="dates">
            <div className="form-item data">
              <label htmlFor="dataCriacao">Data de criação</label>
              <input
                type="date"
                name="dataCriacao"
                id="dataCriacao"
                defaultValue={divida.dataCriacao?.substring(0, 10)}
              />
            </div>
            <div className="form-item data">
              <label htmlFor="dataPagamento">Data de pagamento</label>
              <input
                name="dataPagamento"
                id="dataPagamento"
                type="date"
                defaultValue={divida.dataPagamento?.substring(0, 10)}
              />
            </div>
          </div>
          <div className="descricao form-item">
            <label htmlFor="descricao">Descrição da divida</label>
            <textarea
              name="descricao"
              id="descricao"
              defaultValue={divida.descricao}
            ></textarea>
          </div>

          <div className="form-item divida-dono">
            <label htmlFor="mutuarioDaDivida">Dono da divida</label>
            <select
              defaultValue={idMutuario}
              name="mutuarioDaDivida"
              id="mutuarioDaDivida"
            >
              {ListaMutuarios.map((mutuario) => {
                return (
                  <option value={mutuario.id} key={mutuario.id}>
                    {mutuario.nome} | Em aberto: {mutuario.totalEmAberto}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-buttons">
            <button
              className="card-button"
              type="button"
              onClick={() =>
                deletar(divida.id) == 200
                  ? console.log("oi")
                  : console.log("falha ao deletar")
              }
            >
              Excluir
            </button>
            <button className="card-button" type="submit">
              Salvar mudanças
            </button>
            {/* <button className="card-button"></button> */}
          </div>
        </form>
        {erro ? <p>{erro}</p> : <></>}
      </div>
    </>
  );
} 