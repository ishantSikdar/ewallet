'use client'

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

export interface UserBalanceBriefType {
  timestamp: Date,
  totalBalance: number,
  transactionAmt: number
}

export default function UserPortfolio({ userBalance }: { userBalance: UserBalanceBriefType[] }) {

  const data = {
    labels: userBalance.map((ub) => new Date(ub.timestamp).toLocaleDateString('en-IN', {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: 'Asia/Kolkata'
    })),
    datasets: [
      {
        label: "",
        data: userBalance.map((ub) => ({
          x: new Date(ub.timestamp).toLocaleDateString('en-IN', {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: 'Asia/Kolkata'
          }),
          y: ub.totalBalance / 100,
          transactionAmt: ub.transactionAmt, // Include transactionAmt in each data point
          totalBalance: ub.totalBalance // Include transactionAmt in each data point
        })),
        borderColor: "#202938",
        borderWidth: 1,
        pointBorderColor: "#202938",
        pointBorderWidth: 1,
        tension: 0,
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 160);
          gradient.addColorStop(0, "#202938");
          gradient.addColorStop(1, "white");
          return gradient;
        },
      },
    ],
  };

  const options: any = {
    plugins: {
      legend: false,
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            let label = ''
            const transactionAmt = data.datasets[tooltipItem.datasetIndex]?.data[tooltipItem.dataIndex]?.transactionAmt;
            const totalBalance = data.datasets[tooltipItem.datasetIndex]?.data[tooltipItem.dataIndex]?.totalBalance;
            if (transactionAmt !== undefined && totalBalance !== undefined) {
              label += `Transaction: ₹ ${transactionAmt / 100}, Balance: ₹ ${totalBalance / 100}`;
            }

            return label;
          }
        }
      }

    },
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart takes the full width
    scales: {
      x: {
        ticks: {
          display: false, // Hide x-axis labels
        },
        grid: {
          display: false, // Optionally hide x-axis grid lines
        },
      },
      y: {
        ticks: {
          display: false, // Ensure y-axis labels are displayed
          font: {
            size: 10,
          }
        },
        grid: {
          display: true,
        },
      },
    },
  };

  return <div className="h-[200px]">
    <Line data={data} options={options} />
  </div>
}
