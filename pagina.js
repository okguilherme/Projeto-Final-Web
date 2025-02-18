const referencia = document.querySelector(".index1");
let comparador = [];
let nomesCargos = [];
const limite = 10;
let resultadosLimitados = [];

fetch("https://raw.githubusercontent.com/okguilherme/detalhamentopessoal/refs/heads/main/detalhamentopessoal.json")
    .then((resposta) => resposta.json())
    .then((informacoes) => {
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
                const filtrados = nomesCargos.filter(item => item.toLowerCase().includes(busca));
                resultadosLimitados = filtrados.slice(0, limite);

                if (resultadosLimitados.length > 0) {
                    document.querySelector(".resul").style.display = "block";
                } else {
                    document.querySelector(".resul").style.display = "none";
                }

                resultadosLimitados.forEach(element => {
                    const li = document.createElement("li");
                    const a = document.createElement("a");
                    a.href = "paginaFuncionario.html";  // Navega para a segunda página
                    a.textContent = element;

                    a.addEventListener("click", () => {
                        sessionStorage.setItem("cargoBusca", element);
                    });

                    li.appendChild(a);
                    resultado.appendChild(li);
                });
            } else {
                document.querySelector(".resul").style.display = "none";
            }
        }

        document.getElementById("searchInput").addEventListener("input", buscarCargos);
    });

// Esconde a lista se o usuário clicar fora do input ou dos resultados
document.addEventListener("click", (e) => {
    if (!document.querySelector(".index1").contains(e.target)) {
        document.querySelector(".resul").style.display = "none";
    }
});
