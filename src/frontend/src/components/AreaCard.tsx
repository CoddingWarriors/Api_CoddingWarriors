import React, { useEffect, useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import styles from '../styles/AreaCard.module.css';

type AreaCardProps = {
  colors: string[];
  title: string;
  dbName: string;
};

type Data = {
  abertos: number;
  emAndamento: number;
  concluidos: number;
  total: number;
};

const AreaCard: React.FC<AreaCardProps> = ({ colors, title, dbName }) => {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/visualizar-chamados-por-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ dbName })
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar os dados');
        }

        const result: Data = await response.json();
        setData(result);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchData();
  }, [dbName]);

  if (!data) {
    return <div>Carregando...</div>;
  }

  const cardData = [
    { name: 'Chamados em aberto', value: data.abertos, color: colors[0] },
    { name: 'Chamados em andamento', value: data.emAndamento, color: colors[1] },
    { name: 'Chamados concluídos', value: data.concluidos, color: colors[2] },
  ];

  return (
    <div className={styles.dashboard}>
      {cardData.map((card, index) => (
        <div key={index} className={styles.areaCard}>
          <div className={styles.areaCardContent}>
            <div className={styles.textContent}>
              <h3>{card.name}</h3>
              <p>{card.value}</p>
            </div>
            <div className={styles.pieChart}>
              <PieChart width={100} height={100}>
                <Pie
                  data={[
                    { name: 'Filled', value: card.value },
                    { name: 'Remained', value: data.total - card.value },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  startAngle={90}
                  endAngle={450}
                  paddingAngle={0}
                  dataKey="value"
                  isAnimationActive={true} // Ativa a animação
                >
                  <Cell key="cell-0" fill={card.color} />
                  <Cell key="cell-1" fill="#d3d3d3" />
                </Pie>
              </PieChart>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AreaCard;
