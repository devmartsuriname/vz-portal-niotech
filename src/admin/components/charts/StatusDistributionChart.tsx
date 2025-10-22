import { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface Submission {
  status: string;
}

interface Props {
  submissions: Submission[];
}

const STATUS_LABELS: Record<string, string> = {
  draft: 'Concept',
  submitted: 'Ingediend',
  under_review: 'In Behandeling',
  approved: 'Goedgekeurd',
  rejected: 'Afgewezen',
  additional_info_required: 'Info Vereist',
};

const STATUS_COLORS: Record<string, string> = {
  draft: '#6b7280',
  submitted: '#2563eb',
  under_review: '#f59e0b',
  approved: '#10b981',
  rejected: '#ef4444',
  additional_info_required: '#8b5cf6',
};

const StatusDistributionChart = ({ submissions }: Props) => {
  const chartData = useMemo(() => {
    const statusCounts: Record<string, number> = {};
    
    submissions.forEach((sub) => {
      statusCounts[sub.status] = (statusCounts[sub.status] || 0) + 1;
    });

    const labels = Object.keys(statusCounts).map((status) => STATUS_LABELS[status] || status);
    const series = Object.values(statusCounts);
    const colors = Object.keys(statusCounts).map((status) => STATUS_COLORS[status] || '#6b7280');

    return { labels, series, colors };
  }, [submissions]);

  const options: ApexOptions = {
    chart: {
      type: 'donut',
      height: 300,
    },
    labels: chartData.labels,
    colors: chartData.colors,
    legend: {
      position: 'bottom',
      labels: {
        colors: '#8e8da4',
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Totaal',
              formatter: () => {
                return chartData.series.reduce((a, b) => a + b, 0).toString();
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => {
        return val.toFixed(0) + '%';
      },
    },
    tooltip: {
      theme: 'dark',
    },
  };

  return (
    <div>
      <ReactApexChart options={options} series={chartData.series} type="donut" height={300} />
    </div>
  );
};

export default StatusDistributionChart;
