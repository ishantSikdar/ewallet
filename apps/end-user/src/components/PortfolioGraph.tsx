'use client'
import dynamic from 'next/dynamic';

// Dynamically import Line with SSR disabled
const LineGraph = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), {
  ssr: false,
});

interface UserData {
  balance: number;
  date: Date;
}

export default function PortfolioGraph({ portfolioData }: { portfolioData: UserData[] }) {
  // Convert dates to YYYY-MM-DD format
  const formattedDates = portfolioData.map(data => data.date.toISOString().split('T')[0]);

  const balances = portfolioData.map(data => data.balance);

  const data = {
    labels: formattedDates,
    datasets: [
      {
        label: 'Portfolio Balance Over Time',
        data: balances,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: 'auto', maxWidth: '800px', margin: 'auto' }}>
      <LineGraph data={data} options={{ maintainAspectRatio: false }} />
    </div>
  );
}
