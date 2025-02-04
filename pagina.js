const referencia = document.querySelector(".index1");

fetch("detalhamentopessoal.json").then((resposta) => {
    return resposta.json();
}).then((informacoes) => {
    let comparador = [];
    let nomesCargos = [];

    // Preenchendo a lista de cargos
    informacoes.data.map((listagem) => {
        if (!comparador.includes(listagem.Cargo)) {
            comparador.push(listagem.Cargo);
            nomesCargos.push(listagem.Cargo);
        }
    });

    // Função para buscar os cargos filtrados
    function buscarCargos() {
        const busca = document.getElementById("searchInput").value.toLowerCase();
        const resultado = document.getElementById("resultados");
        resultado.innerHTML = "";  // Limpa os resultados anteriores

        if (busca.length > 0) {
            // Filtra os cargos de acordo com a busca
            const filtrados = informacoes.data.filter(item => item.Cargo.toLowerCase().includes(busca));

            // Exibe os cargos filtrados
            filtrados.forEach(element => {
                const li = document.createElement("li");
                li.textContent = element.Cargo;
                resultado.appendChild(li);  // Adiciona o item ao resultado
            });
        }
    }

    // Associa a função de busca ao evento de input
    document.getElementById("searchInput").addEventListener("input", buscarCargos);

});




