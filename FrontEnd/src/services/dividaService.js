const URL_API = "http://127.0.0.1:5189";

export function listarDividas(pagina, pesquisa){
    let query = "q="+pesquisa
    let response = pesquisa ?  fetch(URL_API+"/api/divida?page="+pagina+"&"+query) : fetch(URL_API+"/api/divida?page="+pagina)

    return response
}