import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import styles from "../styles/HorizontalBar.module.css";

const HorizontalBarChart: React.FC = () => {
    const [data, setData] = useState<{ name: string, value: number, fill: string }[]>([]);
    const colors = ['blue', 'green', 'orange', 'red', 'purple', 'brown', 'cyan', 'magenta']; // Customize as cores conforme necessário

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

                const formattedData = data.map((item, index) => ({
                    name: item.categoria,
                    value: item.totalCategoria,
                    fill: colors[index % colors.length]
                }));

                setData(formattedData);
            } catch (error) {
                console.error('Erro ao buscar os dados:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.HorizontalBar}>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    layout="vertical"
                    data={data}
                    margin={{ top: 20, right: 100, left: 50, bottom: 5 }}
                    barSize={25}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Bar dataKey="value" isAnimationActive={false}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HorizontalBarChart;
