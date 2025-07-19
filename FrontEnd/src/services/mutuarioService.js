const URL_API = "http://127.0.0.1:5189"; ////////////////

export function listarMutuarios(pagina, pesquisa) {
  let query = "?page=" + pagina;
  let response = pesquisa
    ? fetch(URL_API + "/api/mutuario" + query + "&q=" + pesquisa)
    : fetch(URL_API + "/api/mutuario" + query);

    return response;
}

export function getMutuario(id) {
  let response = fetch(URL_API + "/api/mutuario/" + id);
  return response;
}


export function postMutuario(mutuario) {
  let request = {
    method: mutuario.id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mutuario),
  };

  let response = fetch(URL_API + "/api/mutuario", request);

    return response;
}

export function DeletarMutuario(id) {
  let request = {
    method: "DELETE"
  };
  let response = fetch(URL_API + "/api/mutuario/" + id, request);
  return response;
}


export function idadeAtual(nascimento) {
  var today = new Date();
  var birthDate = new Date(nascimento);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m == 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
