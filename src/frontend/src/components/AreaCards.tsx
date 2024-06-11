import React from 'react';
import styles from "../styles/AreaCard.module.css"
import AreaCard from './AreaCard';

const AreaCards: React.FC = () => {
  const quantidade = 3;

  return (
    <div className={styles.areaCards}>
      <AreaCard
        colors={["#e4e8ef", "blue"]} 
        percentFillValue={80} 
        cardInfo={{
          title: "Chamados em aberto",
          value: quantidade,
        }}
      />
      <AreaCard 
        colors={["#e4e8ef", "orange"]} 
        percentFillValue={80} 
        cardInfo={{
          title: "Chamados em andamento",
          value: quantidade,
        }}
      />
      <AreaCard 
        colors={["#e4e8ef", "green"]} 
        percentFillValue={80} 
        cardInfo={{
          title: "Chamados concluídos",
          value: quantidade,
        }}
      />
    </div>
  );
};

export default AreaCards;
