function somarSalariosPorCargo(dados) {
    const funcionarios = dados.data;
    const salarioPorCargo = {};

    funcionarios.forEach(funcionario => {
        const cargo = funcionario.Cargo.replace(/^\d+\s*-\s*/, '');
        const líquido = Math.floor(funcionario.Líquido || 0);
        if (!salarioPorCargo[cargo]) {
            salarioPorCargo[cargo] = 0;
        }
        salarioPorCargo[cargo] += líquido;
    });

    return Object.entries(salarioPorCargo)
        .map(([cargo, total]) => ({ Cargo: cargo, Total: total }))
        .sort((a, b) => b.Total - a.Total)
        .slice(0, 10);
}

function criarGraficoSalarios(dados) {
    const ctx = document.getElementById('graficoSalarios').getContext('2d');


    const cargos = dados.map(item => item.Cargo);
    const totais = dados.map(item => item.Total);

    window.graficoSalarios = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Professor', 'Guarda', 'Auxiliar', 'Aux.Saúde', 'professor EI', 'Ag. Endemias', 'Ag. transito', 'Guarda Cívil', 'Médico'],
            datasets: [{
                label: 'Total de Gastos em Salário Líquido (R$)',
                data: totais,
                backgroundColor: 'rgba(17, 17, 192, 0.5)',
                borderColor: 'rgb(16, 11, 121)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${dados[context.dataIndex].Cargo}: R$ ${context.raw.toLocaleString('pt-BR')}`;
                        }
                    }
                }
            },
        }


    });
}

function carregarDados() {
    fetch("https://raw.githubusercontent.com/okguilherme/detalhamentopessoal/refs/heads/main/detalhamentopessoal.json")
        .then(response => response.json())
        .then(dados => {
            const resultado = somarSalariosPorCargo(dados);
            criarGraficoSalarios(resultado);
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
}

window.addEventListener('DOMContentLoaded', carregarDados);

