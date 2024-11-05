import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { theme } from 'tailwind.config';
import NoData from './noDate';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type LineChartType<T> = {
  data: T[];
  keys: { labelKey: string; dataKeys: { key: string; label: string }[] };
  title?: string;
};

const LineChart = <T extends Record<string, any>>({
  data,
  keys,
  title,
}: LineChartType<T>): JSX.Element => {
  if (!data.length) return <NoData className="py-12" />;
  const { labelKey, dataKeys } = keys;

  const { chart1, chart2, chart3, chart4, chart5, chart6, chart7 } = theme.colors;
  const colors = [chart1, chart2, chart3, chart4, chart5, chart6, chart7];

  const labels = data?.map((item) => item[labelKey]);

  const datasets = dataKeys.map((key, index) => ({
    label: key.label,
    data: data.map((item) => item[key.key]),
    borderColor: colors[index % colors.length],
    backgroundColor: colors[index % colors.length],
  }));

  const chartData = { labels, datasets };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const, labels: { font: { family: 'IRANSans_Medium' } } },
      title: { display: !!title, text: title || '', font: { family: 'IRANSans_Bold' } },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
