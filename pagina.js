const referencia = document.querySelector(".index1");
let comparador = [];
let nomesCargos = [];

fetch("detalhamentopessoal.json")
    .then((resposta) => resposta.json())
    .then((informacoes) => {
        // converte um objeto JavaScript (informacoes) para uma string JSON.
        //Se você quiser armazenar um objeto no sessionStorage, precisa primeiro transformá-lo em uma string JSON.
        sessionStorage.setItem("informacoes", JSON.stringify(informacoes));

        // Preenchendo a lista de cargos
        informacoes.data.forEach((listagem) => {
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
                const filtrados = nomesCargos.filter(item => item.toLowerCase().includes(busca));

                // Exibe os cargos filtrados
                filtrados.forEach(element => {
                    const li = document.createElement("li");
                    const a = document.createElement("a");
                    a.href = "http://127.0.0.1:5500/paginaFuncionario.html";  // Navega para a segunda página
                    a.textContent = element;

                    // Salva o cargo no sessionStorage para usar na outra página
                    a.addEventListener("click", () => {
                        sessionStorage.setItem("cargoBusca", element); // Salva o cargo no sessionStorage
                    });

                    li.appendChild(a);
                    resultado.appendChild(li);  // Adiciona o item ao resultado
                });
            }
        }

        // Associa a função de busca ao evento de input
        document.getElementById("searchInput").addEventListener("input", buscarCargos);
    });
