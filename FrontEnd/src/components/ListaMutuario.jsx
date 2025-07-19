import { Link } from "simple-react-routing";
import { idadeAtual } from "../services/mutuarioService";
import CardDivida from "./cardDivida"; // so identifica se o card for minusculo
import { DeletarMutuario } from "../services/mutuarioService";

/* eslint-disable react/prop-types */
export default function ListaMutuario({ mutuario }) {


  const deletar = async (id) => {
    let resposta = await DeletarMutuario(id)
    if(resposta.status == 200){
      console.log("Deletado")
      window.location.reload()
    }
  }

  let idade = idadeAtual(mutuario.nascimento);
  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="card-personal-info">
            <h2>{mutuario.nome}</h2>
            <p>Cpf: {mutuario.cpf}</p>
          </div>
          <div className="card-contact">
            <a href={mutuario.email ? "mailto:" + mutuario.email : ""}>
              {mutuario.email ? mutuario.email : "Não informado"}
            </a>
            <p>Idade: {idade}</p>
            <p>Valor total em aberto: {mutuario.totalEmAberto}</p>
          </div>
        </div>
        <hr />
        <div className="card-main-content">
          {mutuario.dividasDoMutuario.map((divida) => {
            return <CardDivida key={divida.id} divida={divida}></CardDivida>;
          })}
        </div>
        <div className="card-footer card-mutuario-footer">
          <button className="card-button" onClick={() => deletar(mutuario.id)}>Excluir</button>
          <Link to={"nutuarios/" + mutuario.id}>
            <button className="card-button">Editar</button>
            </Link>
        </div>
      </div>
    </>
  );
}