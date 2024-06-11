import React from 'react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis, Legend, ResponsiveContainer, Cell } from 'recharts';
import styles from "../styles/HorizontalBar.module.css"

const data = [
  { name: 'Categoria A', value: 400, fill: 'blue' },
  { name: 'Categoria B', value: 300, fill: 'green' },
  { name: 'Categoria C', value: 500, fill: 'orange' },
];

const HorizontalBarChart: React.FC = () => {
  return (
    <div className={styles.HorizontalBar}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 100, left: 50, bottom: 5 }}
          barSize={25} // Define a largura das barras
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value">
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
