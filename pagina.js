const referencia = document.querySelector(".index1");
let comparador = [];
let valores = [];
const limite = 5;
let resultadosLimitados = [];
let informacoesJSON = null;
let tipoDeBusca = document.querySelector('input[name="tipoBusca"]:checked').value || "Cargo";

// utilizada para armazenar dados no armazenamento de sessão do navegador
sessionStorage.setItem("tipoDeBusca", tipoDeBusca);

//isso irá mudar o valor da variável tipoDeBusca Sempre que a opção selecionada for modificada
document.querySelectorAll('input[name="tipoBusca"]').forEach(radio => {
    radio.addEventListener("change", () => {
        tipoDeBusca = document.querySelector('input[name="tipoBusca"]:checked').value;
        sessionStorage.setItem("tipoDeBusca", tipoDeBusca);
        if (informacoesJSON) {
            atualizandoValores();
        }

    });
});

//garantindo que apenas valores únicos sejam armazenados 
// e pegando os valores de tipoDeBusca
function atualizandoValores() {
    if (!informacoesJSON)
        return;

    comparador = []
    valores = []
    informacoesJSON.data.forEach((listagem) => {
        if (!comparador.includes(listagem[tipoDeBusca])) {
            comparador.push(listagem[tipoDeBusca]);
            valores.push(listagem[tipoDeBusca]);
        }
    });
}



fetch("https://raw.githubusercontent.com/okguilherme/detalhamentopessoal/refs/heads/main/detalhamentopessoal.json")
    .then((resposta) => resposta.json())
    .then((informacoes) => {
        informacoesJSON = informacoes;
        sessionStorage.setItem("informacoes", JSON.stringify(informacoes));
        atualizandoValores();



        // Função para buscar os cargos filtrados
        function buscarDados() {
            const busca = document.getElementById("searchInput").value.toLowerCase();
            const resultado = document.getElementById("resultados");
            resultado.innerHTML = "";  // Limpa os resultados anteriores

            // se o usuário digitou algo
            if (busca.length > 0) {
                if (tipoDeBusca === "Nome do funcionário") {
                    // startsWith(busca): Verifica se o item começa com a string contida em busca
                    filtrados = valores.filter(item => item.toLowerCase().startsWith(busca));
                }
                else {
                    filtrados = valores.filter(item => item.toLowerCase().includes(busca));
                }


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
                        sessionStorage.setItem("opcaoBusca", element);
                    });

                    li.appendChild(a);
                    resultado.appendChild(li);
                });
            } else {
                document.querySelector(".resul").style.display = "none";
            }
        }

        document.getElementById("searchInput").addEventListener("input", buscarDados);
    });

// Esconde a lista se o usuário clicar fora do input ou dos resultados
document.addEventListener("click", (e) => {
    if (!document.querySelector(".index1").contains(e.target)) {
        document.querySelector(".resul").style.display = "none";
    }
});