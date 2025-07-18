const URL_API = "http://127.0.0.1:5189"; ////////////////

export  function listarMutuarios(pagina, pesquisa){
    let query = "?p=" + pagina
    let response =  pesquisa ?  fetch(URL_API+"/api/mutuario"+query+"q="+pesquisa) : fetch(URL_API+"/api/mutuario"+query) 

    return response
}


export function idadeAtual(nascimento){
    var today = new Date();
    var birthDate = new Date(nascimento);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export function somarDividas(dividas){
    let soma = 0
    dividas.map(divida => {
        if(divida.situacao == false){
            soma += divida.valor
        }
    })
    soma = parseFloat(soma)
    return soma
}