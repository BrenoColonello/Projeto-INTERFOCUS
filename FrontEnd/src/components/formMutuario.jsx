import { useEffect, useState, useReducer } from "react";
import { useRouter } from "simple-react-routing";
import { getMutuario, postMutuario } from "../services/mutuarioService";
import CardDivida from "./cardDivida";


export default function FormMutuario() {
  const { pathParams } = useRouter();
  const codigo = pathParams["codigo"];
  const [mutuario, setMutuario] = useState({});

  const [cpf, setCpf] = useReducer((old, value) => {
    var digitos = value.replace(/[^0-9]+/g, "").substring(0, 11);

    if (digitos.length <= 3) return digitos;
    else if (digitos.length <= 6) {
        return digitos.replace(/(\d{3})(\d+)/, "$1.$2");
    }
    else if (digitos.length <= 9) {
        return digitos.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
    }
    else {
        return digitos.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3-$4");
    }

}, "");

  const [email, setEmail] = useReducer((old, value) => {
    let email = value.trim().replace(" ", "").toLowerCase()
    
    return email
    
  })

  useEffect(() => {
    if (codigo) {
      getMutuario(codigo).then((response) => {
        if (response.status == 200) {
          response.json().then((response) => {
            setMutuario(response);
            setCpf(response.cpf)
            setEmail(response.email)
            console.log(response);
          });
        }
      });
    }
  }, []);

 const salvarMutuario = async (evento) => {
  evento.preventDefault()
  let dados = new FormData(evento.target)
  let strippedCpf = dados.get("cpf")
  strippedCpf = strippedCpf.replace(/\D/g, "")
  
  let mutuario = {
    nome: dados.get("nome"),
    cpf: strippedCpf,
    nascimento: dados.get("nascimento"),
    email: dados.get("email"),
    dividasDoMutuario: []  
  }

  if(codigo){
    mutuario.id = codigo
  }

  console.log(mutuario)

  let resposta = await postMutuario(mutuario)
  console.log(resposta)

 }


  return (
    <>
      <div className="mutuario-page">
        <div className="form-mutuario">
          <h1>{codigo ? "Editar" : "Cadastrar"} mutuario</h1>
          <form onSubmit={salvarMutuario}>
            <div className="nome form-item">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                name="nome"
                id="nome"
                defaultValue={mutuario.nome}
              />
            </div>
            <div className="cpf form-item">
              <label htmlFor="cpf">Cpf:</label>
              <input name="cpf" id="cpf" type="text" maxLength={14} onChange={(e) => {setCpf(e.target.value)}}  value={cpf}/>
            </div>
            <div className="email form-item">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="nascimento form-item">
              <label htmlFor="nascimento">Data de nascimento</label>
              <input
                type="date"
                name="nascimento"
                id="nascimento"
                defaultValue={mutuario.nascimento?.substring(0, 10)}
              />
            </div>

            <div className="form-buttons">
              <button className="card-button" type="button">
                Excluir
              </button>
              <button className="card-button" type="submit">
                Salvar mudanças
              </button>
              {/* <button className="card-button"></button> */}
            </div>
          </form>
        </div>
        <hr />

        {mutuario.id ? (
          <div className="lista-dividas">
            <div className="titulo">
              <h3>Dividas do mutuario</h3>
              <hr />
            </div>
            {mutuario.dividasDoMutuario.map((divida) => {
              return <CardDivida key={divida.id} divida={divida}></CardDivida>;
            })}
          </div>
        ) : (
          <p>Não é possivel listar dividas de um mutuario não cadastrado</p>
        )}
      </div>
    </>
  );
}