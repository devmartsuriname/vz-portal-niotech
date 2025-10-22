import { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface Submission {
  submitted_at: string | null;
  created_at: string;
  status: string;
}

interface Props {
  submissions: Submission[];
}

const SubmissionTrendsChart = ({ submissions }: Props) => {
  const chartData = useMemo(() => {
    // Group submissions by date
    const dateCounts: Record<string, number> = {};
    
    submissions.forEach((sub) => {
      const date = sub.submitted_at 
        ? new Date(sub.submitted_at).toLocaleDateString('nl-NL')
        : new Date(sub.created_at).toLocaleDateString('nl-NL');
      
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });

    // Sort dates and create series
    const sortedDates = Object.keys(dateCounts).sort((a, b) => {
      const dateA = new Date(a.split('-').reverse().join('-'));
      const dateB = new Date(b.split('-').reverse().join('-'));
      return dateA.getTime() - dateB.getTime();
    });

    return {
      categories: sortedDates,
      data: sortedDates.map((date) => dateCounts[date]),
    };
  }, [submissions]);

  const options: ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    colors: ['#2563eb'],
    xaxis: {
      categories: chartData.categories,
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
    },
  };

  const series = [
    {
      name: 'Aanvragen',
      data: chartData.data,
    },
  ];

  return (
    <div>
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default SubmissionTrendsChart;
