import React, { useEffect, useState } from "react";
import AreaCard from "../components/AreaCard";
import HorizontalBarChart from "../components/HorizontalBar";
import styles from "../styles/Dashboard.module.css";

function Dashboard() {
    const [chamados, setChamados] = useState<{ total: number } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/visualizar-chamados-por-status', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ dbName: 'ocean' })
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar os dados');
                }

                const result = await response.json();
                setChamados(result);
            } catch (error) {
                console.error('Erro ao buscar os dados:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (!chamados || chamados.total === 0) {
        return (
            <div className={styles.dashboardContainer}>
                <div className={styles.noChamadosMessage}>
                    <h2>Ainda não há chamados registrados.</h2>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.dashboardContent}>
                <AreaCard
                    colors={["blue", "orange", "green"]}
                    title="Chamados por Status"
                    dbName="ocean"
                />
                <HorizontalBarChart />
            </div>
        </div>
    );
}

export default Dashboard;
