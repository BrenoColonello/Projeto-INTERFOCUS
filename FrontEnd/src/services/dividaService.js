const URL_API = "http://127.0.0.1:5189";

export function listarDividas(pagina, pesquisa) {
  let query = "q=" + pesquisa;
  let response = pesquisa
    ? fetch(URL_API + "/api/divida?page=" + pagina + "&" + query)
    : fetch(URL_API + "/api/divida?page=" + pagina);

    return response
}


export function postDivida(divida) {
  let request = {
    method: divida.id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(divida),
  };

  let response = fetch(URL_API + "/api/divida", request);

  return response;
}

export function getDivida(id) {
  let response = fetch(URL_API + "/api/divida/" + id);
  return response;
}

export function DeletarDivida(id) {
  let request = {
    method: "DELETE",
  };

  let response = fetch(URL_API + "/api/divida/" + id, request);

  return response;
}

export function mudarSituacao(id, sit) {
  getDivida(id).then((resposta) => {
    if (resposta.status == 200) {
      resposta.json().then((resposta) => {
        let divida = {
          id: id,
          valor: resposta.valor,
          dataCriacao: resposta.dataCriacao,
          situacao: sit,
          descricao: resposta.descricao,
          mutuarioDaDivida: {
            id: resposta.mutuarioDaDivida.id,
          },
        };

        if (resposta.dataPagamento) {
          divida.dataPagamento = resposta.dataPagamento;
        }
        postDivida(divida).then(() => window.location.reload());
      });
    }
  });
}