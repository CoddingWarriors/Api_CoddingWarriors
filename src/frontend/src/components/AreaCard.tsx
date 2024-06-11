import React from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import styles from  '../styles/AreaCard.module.css'; // Importando o arquivo CSS

type AreaCardProps = {
  colors: string[];
  percentFillValue: number;
  cardInfo: {
    title: string;
    value: number;
  };
};

const AreaCard: React.FC<AreaCardProps> = ({ colors, percentFillValue, cardInfo }) => {
  const filledValue = (percentFillValue / 100) * 360;
  const remainedValue = 360 - filledValue;
  const data = [
    { name: 'Filled', value: filledValue },
    { name: 'Remained', value: remainedValue },
  ];

  return (
    <div className={styles.areaCard}>
      <div className={styles.areaCardContent}>
        <div className={styles.textContent}>
          <h3>{cardInfo.title}</h3>
          <p>{cardInfo.value}</p>
        </div>
        <div className={styles.pieChart}>
          <PieChart width={100} height={100}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={50}
              startAngle={90}
              endAngle={450}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? colors[1] : '#d3d3d3'} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AreaCard;
