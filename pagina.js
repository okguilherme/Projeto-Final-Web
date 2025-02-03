const referencia = document.querySelector(".index1");

fetch("detalhamentopessoal.json").then((resposta) => {
    return resposta.json();
}).then((informacoes) => {
    let comparador = [];
    informacoes.data.map((listagem, index) => {
        if (!comparador.includes(listagem.Cargo)) {
            comparador.push(listagem.Cargo);
            referencia.innerHTML += `<li> ${listagem.Cargo} </li>`
        }

    })

})