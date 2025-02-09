function inforPessoal() {
    const ref = document.querySelector(".index2");

    if (!ref) {
        return;  // Se não encontrar o elemento, interrompe a execução
    }

    // Acessa o valor de busca do sessionStorage
    const informacoes = JSON.parse(sessionStorage.getItem("informacoes"));
    const busca = sessionStorage.getItem("cargoBusca").toLowerCase(); // Acessa de forma segura
    const titulo1 = document.getElementById("titulo1");

    // Verifica se o valor foi encontrado no sessionStorage
    if (busca && informacoes) {
        informacoes.data.forEach(element => {
            if (element.Cargo.toLowerCase() === busca) {
                const p = document.createElement("p");
                p.textContent = `Nome: ${element["Nome do funcionário"]} - Competência: ${element["Competência"]} - 
                Folha: ${element["Folha"]} - Vínculo: ${element["Vínculo"]} - Cargo: ${element["Cargo"]} - Setor: ${element["Setor"]} -  
                Matricula: ${element["Matricula"]} - Proventos: ${element["Proventos"]} - Descontos: ${element["Descontos"]} - Líquido: ${element["Líquido"]}`;

                ref.appendChild(p);
            }
        });
    }
    titulo1.textContent += ` ${[" "] + busca}`;
}

// Chama a função apenas quando a página está totalmente carregada
document.addEventListener("DOMContentLoaded", inforPessoal);

