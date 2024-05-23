import React, { useEffect, useState } from 'react';
import ApexCharts from "apexcharts";

function HomeAdm() {
    const [categorias, setCategorias] = useState<{ categoria: string, totalCategoria: number }[]>([]);
    const [chart, setChart] = useState<ApexCharts | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/visualizar-chamados-por-categoria', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ dbName: 'ocean' })
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar os dados');
                }

                const data = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error('Os dados retornados não são um array');
                }

                const validData = data.every(item => item && typeof item.categoria === 'string' && typeof item.totalCategoria === 'number');
                if (!validData) {
                    throw new Error('Formato de dados inválido');
                }

                setCategorias(data);
            } catch (error) {
                console.error('Erro ao buscar os dados:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (categorias.length > 0) {
            const options = {
                chart: {
                    type: 'bar',
                    height: 350
                },
                plotOptions: {
                    bar: {
                        horizontal: true
                    }
                },
                xaxis: {
                    categories: categorias.map(categoria => categoria.categoria),
                },
                title: {
                    text: 'Chamados por Categoria'
                },
                series: [{
                    name: 'Total de Chamados',
                    data: categorias.map(categoria => categoria.totalCategoria)
                }]
            };

            if (chart === null) {
                const chartElement = document.getElementById('chart');
                if (chartElement) {
                    const newChart = new ApexCharts(chartElement, options);
                    newChart.render().then(() => {
                        setChart(newChart);
                    }).catch(error => {
                        console.error('Erro ao renderizar o gráfico:', error);
                    });
                }
            } else {
                chart.updateOptions(options).catch(error => {
                    console.error('Erro ao atualizar as opções do gráfico:', error);
                });
            }
        }
    }, [categorias, chart]);

    return (
        <div>
            <div id="chart"></div>
        </div>
    );
}

export default HomeAdm;
