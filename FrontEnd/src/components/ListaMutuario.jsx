/* eslint-disable react/prop-types */
import { Link } from "simple-react-routing";
import { idadeAtual, DeletarMutuario } from "../services/mutuarioService";
import CardDivida from "./CardDivida";

export default function ListaMutuario({ mutuario }) {
  const deletar = async (id) => {
    const resposta = await DeletarMutuario(id);
    if (resposta.status == 200) {
      window.location.reload();
    }
  };

  const idade = idadeAtual(mutuario.nascimento);
  const totalAberto = Number(mutuario.totalEmAberto || 0);
  const dividasAbertas = mutuario.dividasDoMutuario?.filter(d => !d.situacao).length ?? 0;
  const dividasPagas = mutuario.dividasDoMutuario?.filter(d => d.situacao).length ?? 0;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-personal-info">
          <h2>{mutuario.nome}</h2>
          <p className="cpf-text">CPF: {mutuario.cpf}</p>
          <p style={{ marginTop: 4, fontSize: '0.82rem' }}>Idade: {idade} anos</p>
        </div>
        <div className="card-contact">
          {mutuario.email ? (
            <a href={"mailto:" + mutuario.email}>{mutuario.email}</a>
          ) : (
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Email não informado</span>
          )}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
            {dividasAbertas > 0 && (
              <span className="badge badge-open">{dividasAbertas} em aberto</span>
            )}
            {dividasPagas > 0 && (
              <span className="badge badge-paid">{dividasPagas} paga{dividasPagas > 1 ? 's' : ''}</span>
            )}
          </div>
          {totalAberto > 0 && (
            <p className="total-em-aberto" style={{ marginTop: 6 }}>
              R$ {totalAberto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          )}
        </div>
      </div>

      <hr className="card-divider" />

      <div className="card-main-content">
        {mutuario.dividasDoMutuario?.length === 0 ? (
          <p className="empty-dividas">Nenhuma dívida registrada.</p>
        ) : (
          mutuario.dividasDoMutuario?.map((divida) => (
            <CardDivida key={divida.id} divida={divida} />
          ))
        )}
      </div>

      <div className="card-footer">
        <button className="btn btn-danger btn-sm" onClick={() => deletar(mutuario.id)}>
          Excluir
        </button>
        <Link to={"mutuarios/" + mutuario.id}>
          <button className="btn btn-ghost btn-sm">Editar</button>
        </Link>
      </div>
    </div>
  );
}
