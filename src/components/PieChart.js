import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import PropTypes from 'prop-types';
Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ likelycount, notlikelycount }) => {
  const data = {
    labels: ['Likely', 'Not Likely'],
    datasets: [
      {
        data: [likelycount, notlikelycount], // Use the correct props here
        backgroundColor: ['#007BFF', '#0056B3'], // Light and Dark Blue
        hoverBackgroundColor: ['#0056B3', '#003580'], // Darker shades on hover
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

  return <Doughnut data={data} options={options} />;
};

PieChart.propTypes = {
  likelycount: PropTypes.number.isRequired,
  notlikelycount: PropTypes.number.isRequired,
};

export default PieChart;