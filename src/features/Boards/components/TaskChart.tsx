import { Box } from '@mui/system';
import { ITask } from 'models/task';
import { useSelector } from 'react-redux';
import { tasksSelector } from '../boardSlice';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TaskChart = () => {
  const tasks: ITask[] = useSelector(tasksSelector.selectAll);
  const data = {
    labels: ['Total Task', 'Task Complete', 'Task Expired'],
    datasets: [
      {
        data: [
          tasks.length,
          tasks.filter((task) => task.status === 'FINISHED').length,
          tasks.filter((task) => task.status === 'DEADLINE_EXPIRED').length,
        ],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <Box
      padding="48px"
      borderRadius="12px"
      bgcolor="#fff"
      boxSizing="border-box"
      marginTop="24px"
      boxShadow="0 8px 30px rgba(0,0,0,0.12)"
      marginBottom="24px"
    >
      <Bar options={options} data={data} />
    </Box>
  );
};

export default TaskChart;
