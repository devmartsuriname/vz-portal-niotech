import { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface Submission {
  application_types?: {
    name: string;
  };
  submitted_at: string | null;
  reviewed_at: string | null;
}

interface Props {
  submissions: Submission[];
}

const ProcessingTimeChart = ({ submissions }: Props) => {
  const chartData = useMemo(() => {
    // Calculate average processing time per application type
    const typeProcessing: Record<string, { total: number; count: number }> = {};

    submissions.forEach((sub) => {
      if (!sub.submitted_at || !sub.reviewed_at) return;

      const typeName = (sub.application_types as any)?.name || 'Onbekend';
      const submittedDate = new Date(sub.submitted_at);
      const reviewedDate = new Date(sub.reviewed_at);
      const daysDiff = Math.round(
        (reviewedDate.getTime() - submittedDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (!typeProcessing[typeName]) {
        typeProcessing[typeName] = { total: 0, count: 0 };
      }
      typeProcessing[typeName].total += daysDiff;
      typeProcessing[typeName].count += 1;
    });

    // Calculate averages
    const categories: string[] = [];
    const data: number[] = [];

    Object.entries(typeProcessing).forEach(([type, stats]) => {
      categories.push(type);
      data.push(Math.round(stats.total / stats.count));
    });

    return { categories, data };
  }, [submissions]);

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 8,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => val + ' dagen',
      offsetX: 30,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },
    colors: ['#10b981'],
    xaxis: {
      categories: chartData.categories,
      title: {
        text: 'Gemiddelde Verwerkingstijd (dagen)',
        style: {
          color: '#8e8da4',
        },
      },
      labels: {
        style: {
          colors: '#8e8da4',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#8e8da4',
        },
      },
    },
    grid: {
      borderColor: '#e7e7e7',
      strokeDashArray: 5,
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) => val + ' dagen',
      },
    },
  };

  const series = [
    {
      name: 'Verwerkingstijd',
      data: chartData.data,
    },
  ];

  return (
    <div>
      {chartData.categories.length > 0 ? (
        <ReactApexChart options={options} series={series} type="bar" height={350} />
      ) : (
        <div className="text-center py-5 text-muted">
          Geen verwerkingsgegevens beschikbaar
        </div>
      )}
    </div>
  );
};

export default ProcessingTimeChart;
