import React, { useEffect, useState } from 'react';
import ApexCharts from "apexcharts"


function HomeAdm() {
    const [categorias, setCategorias] = useState<{ categoria: string, totalCategoria: number }[]>([]);

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
                    convertedCatToNumeric: false
                },
                title: {
                    text: 'Chamados por Categoria'
                }
            };

            const series = [{
                name: 'Total de Chamados',
                data: categorias.map(categoria => categoria.totalCategoria)
            }];

            const renderChart = () => {
                const chart = new ApexCharts(document.getElementById('chart')!, options);
                chart.render();
                chart.updateSeries(series);
            };

            renderChart();
        }
    }, [categorias]);

    return (
        <div>
            <div id="chart"></div>
        </div>
    );
}

export default HomeAdm;