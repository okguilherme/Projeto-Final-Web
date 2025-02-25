// Função para contar funcionários por cargo
function contarFuncionariosPorCargo(dados) {
    const funcionarios = dados.data;
    const contagemPorCargo = {};

    funcionarios.forEach(funcionario => {
        const cargo = funcionario.Cargo.replace(/^\d+\s*-\s*/, '');
        contagemPorCargo[cargo] = (contagemPorCargo[cargo] || 0) + 1;
    });

    // Criar um array, ordenar e pegar apenas os 10 primeiros
    return Object.entries(contagemPorCargo)
        .map(([cargo, quantidade]) => ({ Cargo: cargo, Quantidade: quantidade }))
        .sort((a, b) => b.Quantidade - a.Quantidade)
        .slice(0, 10);
}

// Função para criar o gráfico 
function criarGrafico(dados) {
    const ctx = document.getElementById('graficoCargos').getContext('2d');



    // Extrai os cargos e quantidades
    const cargos = dados.map(item => item.Cargo);
    const quantidades = dados.map(item => item.Quantidade);

    window.meuGrafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Professor', 'Auxiliar', 'Guarda', 'Serviços Gerais', 'Ag. de saúde', 'Agente ADM', 'Professor EI', 'AG. Endemias', 'Professor EF', 'Ag. Trânsito'],
            datasets: [{
                label: 'quantidade de Servidores',
                data: quantidades,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return `${dados[tooltipItem.dataIndex].Cargo}: ${tooltipItem.raw} funcionários`;
                        }
                    }
                },

            },

        }

    });
}

// Função para carregar os dados ao iniciar a página
function carregarDados() {
    fetch("https://raw.githubusercontent.com/okguilherme/detalhamentopessoal/refs/heads/main/detalhamentopessoal.json")
        .then(response => {
            return response.json();
        })
        .then(dados => {
            const resultado = contarFuncionariosPorCargo(dados);
            criarGrafico(resultado);


        })

}

// Carregar os dados automaticamente quando a página for carregada
window.addEventListener('DOMContentLoaded', carregarDados);
