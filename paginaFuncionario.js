function inforPessoal() {
    const ref = document.querySelector(".index2");

    if (!ref) {
        return console.log("Erro ao carregar os dados:");  // Se não encontrar o elemento, interrompe a execução
    }

    // Acessa o valor de busca do sessionStorage
    const informacoes = JSON.parse(sessionStorage.getItem("informacoes"));
    const busca = sessionStorage.getItem("opcaoBusca").toUpperCase(); // Acessa de forma segura
    const tipoDeBusca = sessionStorage.getItem("tipoDeBusca");
    const titulo1 = document.getElementById("titulo1");

    if (busca && informacoes) {
        informacoes.data.forEach(element => {
            if (element[tipoDeBusca].toUpperCase() === busca) {

                const div = document.createElement("div");
                div.className = "funcionarioDados";

                const nome = document.createElement("p");
                nome.textContent = `Nome: ${element["Nome do funcionário"]}`

                const competencia = document.createElement("p");
                competencia.textContent = `Competência: ${element["Competência"]}`;

                const folha = document.createElement("p");
                folha.textContent = `Folha: ${element["Folha"]}`;

                const vinculo = document.createElement("p");
                vinculo.textContent = `Vínculo: ${element["Vínculo"]}`;

                const cargo = document.createElement("p");
                cargo.textContent = `Cargo: ${element["Cargo"]}`;

                const setor = document.createElement("p");
                setor.textContent = `Setor: ${element["Setor"]}`;

                const matricula = document.createElement("p");
                matricula.textContent = `Matrícula: ${element["Matricula"]}`;

                const proventos = document.createElement("p");
                proventos.textContent = `Proventos: ${element["Proventos"]}`;

                const descontos = document.createElement("p");
                descontos.textContent = `Descontos: ${element["Descontos"]}`;

                const liquido = document.createElement("p");
                liquido.textContent = `Salário Líquido: R$ ${element["Líquido"]}`;

                div.appendChild(nome);
                div.appendChild(competencia);
                div.appendChild(folha);
                div.appendChild(vinculo);
                div.appendChild(cargo);
                div.appendChild(setor);
                div.appendChild(matricula);
                div.appendChild(proventos);
                div.appendChild(descontos);
                div.appendChild(liquido);

                ref.appendChild(div);
            }
        });
    }
    if (tipoDeBusca === "Cargo") {
        titulo1.textContent += ` ${["Funcionários que ocupam o Cargo: "] + busca}`;
    }
    else if (tipoDeBusca === "Nome do funcionário") {
        titulo1.textContent += ` ${["Funcionário: "] + busca}`;
    }
    else if (tipoDeBusca === "Setor") {
        titulo1.textContent += ` ${["Funcionários que trabalham no Setor: "] + busca}`;
    }
}

// Chama a função apenas quando a página está totalmente carregada
document.addEventListener("DOMContentLoaded", inforPessoal);

