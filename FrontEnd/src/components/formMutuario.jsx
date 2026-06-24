import { useEffect, useState, useReducer } from "react";
import { useRouter, useNavigation } from "simple-react-routing";
import { DeletarMutuario, getMutuario, postMutuario } from "../services/mutuarioService";
import CardDivida from "./CardDivida";

export default function FormMutuario() {
  const { pathParams } = useRouter();
  const codigo = pathParams["codigo"];
  const [mutuario, setMutuario] = useState({});
  const [erro, setErro] = useState("");
  const { navigateTo } = useNavigation();

  const [cpf, setCpf] = useReducer((old, value) => {
    const digitos = value.replace(/[^0-9]+/g, "").substring(0, 11);
    if (digitos.length <= 3) return digitos;
    if (digitos.length <= 6) return digitos.replace(/(\d{3})(\d+)/, "$1.$2");
    if (digitos.length <= 9) return digitos.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
    return digitos.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3-$4");
  }, "");

  const [email, setEmail] = useReducer((old, value) =>
    value?.trim().replace(" ", "").toLowerCase()
  );

  useEffect(() => {
    if (codigo) {
      getMutuario(codigo).then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            setMutuario(data);
            setCpf(data.cpf);
            setEmail(data.email);
          });
        }
      });
    }
  }, []);

  const salvarMutuario = async (evento) => {
    evento.preventDefault();
    const dados = new FormData(evento.target);
    const strippedCpf = dados.get("cpf").replace(/\D/g, "");

    const payload = {
      nome: dados.get("nome"),
      cpf: strippedCpf,
      nascimento: dados.get("nascimento"),
      email: dados.get("email"),
      dividasDoMutuario: [],
    };

    if (codigo) payload.id = codigo;

    const resposta = await postMutuario(payload);
    if (resposta.status == 200) {
      navigateTo(null, "/");
    } else {
      const mensagem = await resposta.json();
      setErro("Erro: " + JSON.stringify(mensagem, null, "\t"));
    }
  };

  const deletar = async (id) => {
    const resposta = await DeletarMutuario(id);
    if (resposta.status == 200) navigateTo(null, "/");
  };

  return (
    <div className="form-page">
      <div className="form-section">
        <h1>{codigo ? "Editar" : "Cadastrar"} Mutuário</h1>
        <p className="form-subtitle">
          {codigo ? "Atualize os dados do mutuário abaixo." : "Preencha os dados para cadastrar um novo mutuário."}
        </p>

        <div className="form-card">
          <form onSubmit={salvarMutuario}>
            <div className="form-item">
              <label htmlFor="nome">Nome completo</label>
              <input
                className="form-input"
                type="text"
                name="nome"
                id="nome"
                placeholder="Ex: João da Silva"
                defaultValue={mutuario.nome}
              />
            </div>

            <div className="form-item">
              <label htmlFor="cpf">CPF</label>
              <input
                className="form-input"
                name="cpf"
                id="cpf"
                type="text"
                maxLength={14}
                placeholder="000.000.000-00"
                onChange={(e) => setCpf(e.target.value)}
                value={cpf}
              />
            </div>

            <div className="form-item">
              <label htmlFor="email">E-mail</label>
              <input
                className="form-input"
                type="email"
                name="email"
                id="email"
                placeholder="email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-item">
              <label htmlFor="nascimento">Data de nascimento</label>
              <input
                className="form-input"
                type="date"
                name="nascimento"
                id="nascimento"
                defaultValue={mutuario.nascimento?.substring(0, 10)}
              />
            </div>

            <div className="form-actions">
              {codigo && (
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => deletar(mutuario.id)}
                >
                  Excluir mutuário
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

      <div className="sidebar-divider" />

      <div className="sidebar-dividas">
        <h3>Dívidas do mutuário</h3>
        {mutuario.id ? (
          <>
            <p className="sidebar-subtitle">
              {mutuario.dividasDoMutuario?.length ?? 0} dívida(s) registrada(s)
            </p>
            <div className="sidebar-scroll">
              {mutuario.dividasDoMutuario?.length === 0 ? (
                <div className="no-mutuario-msg">Nenhuma dívida registrada.</div>
              ) : (
                mutuario.dividasDoMutuario?.map((divida) => (
                  <CardDivida key={divida.id} divida={divida} />
                ))
              )}
            </div>
          </>
        ) : (
          <div className="no-mutuario-msg">
            Dívidas disponíveis após o cadastro.
          </div>
        )}
      </div>
    </div>
  );
}
