import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Likely', 'Not Likely'],
  datasets: [
    {
      data: [60, 40],
      backgroundColor: ['#007bff', '#0056b3'], // Light and Dark Blue
      hoverBackgroundColor: ['#0056b3', '#003580'], // Darker shades on hover
    }
  ]
};

const options = {
  maintainAspectRatio: false,
  cutoutPercentage: 50,
  plugins: {
    legend: {
      labels: {
        usePointStyle: true, // Ensures use of square legends if desired
      }
    }
  }
};

const PieChart = () => (
  <Doughnut data={data} options={options} />
);

export default PieChart;
