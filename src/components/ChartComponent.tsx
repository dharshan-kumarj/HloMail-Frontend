// src/components/ChartComponent.tsx
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface ChartComponentProps {
  interactionData: Record<string, number>;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ interactionData }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (Object.keys(interactionData).length === 0) return;

    const chart = new Chart(chartRef.current!, {
      type: 'bar',
      data: {
        labels: Object.keys(interactionData),
        datasets: [
          {
            label: '# of Interactions',
            data: Object.values(interactionData),
            backgroundColor: 'purple',
            borderColor: 'purple',
            borderWidth: 1,
            borderRadius: 10,
            borderSkipped: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [interactionData]);

  return <canvas ref={chartRef}></canvas>;
};

export default ChartComponent;
