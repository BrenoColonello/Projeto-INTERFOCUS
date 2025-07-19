import {Link} from "simple-react-routing"
import { idadeAtual, somarDividas } from "../services/mutuarioService";
import CardDivida from "./cardDivida"; // so identifica se o card for minusculo

/* eslint-disable react/prop-types */
export default function ListaMutuario({ mutuario }) {
  let idade = idadeAtual(mutuario.nascimento)
  let total = somarDividas(mutuario.dividasDoMutuario)
    return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="card-personal-info">
            <h2>{mutuario.nome}</h2>
            <p>Cpf: {mutuario.cpf}</p>
          </div>
          <div className="card-contact">
            <a href={mutuario.email ? "mailto:" + mutuario.email : ""}  >{mutuario.email ? mutuario.email : "Não informado"}</a>
            <p>Idade: {idade}</p>
            <p>Valor total em aberto: {total}</p>
          </div>
        </div>
        <hr />
        <div className="card-main-content">
            {mutuario.dividasDoMutuario.map(divida => {
                return <CardDivida key={divida.id} divida={divida}></CardDivida>
            })}
        </div>
        <div className="card-footer card-mutuario-footer">
            <button className="card-button">Excluir</button>
            <Link to={"mutuario/" + mutuario.id}>
            <button className="card-button">Editar</button>
            </Link>
        </div>
      </div>
    </>
  );
}