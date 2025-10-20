import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap';

const Chart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('ALL');

  const salesChart: ApexOptions = {
    chart: {
      height: 364,
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    series: [
      {
        name: 'Page Views',
        type: 'bar',
        data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67],
      },
      {
        name: 'Clicks',
        type: 'area',
        data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35],
      },
      {
        name: 'Revenue',
        type: 'line',
        data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14, 12],
      },
    ],
    stroke: {
      width: [0, 2, 3],
      curve: 'smooth',
    },
    fill: {
      opacity: [1, 0.08, 1],
      type: ['solid', 'gradient', 'solid'],
      gradient: {
        type: 'vertical',
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    markers: {
      size: [0, 0, 0],
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: {
        show: false,
      },
    },
    grid: {
      borderColor: '#f1f3fa',
      padding: {
        bottom: 5,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '40%',
      },
    },
    colors: ['#7e67fe', '#47ad77', '#fa5c7c'],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== 'undefined') {
            return y.toFixed(0);
          }
          return y;
        },
      },
    },
  };

  return (
    <Row>
      <Col lg={12}>
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center">
            <h4 className="header-title">Revenue</h4>
            <div className="d-flex gap-1">
              {['ALL', '1M', '6M', '1Y'].map((period) => (
                <Button
                  key={period}
                  size="sm"
                  variant={selectedPeriod === period ? 'primary' : 'light'}
                  onClick={() => setSelectedPeriod(period)}
                >
                  {period}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardBody>
            <ReactApexChart options={salesChart} series={salesChart.series} height={364} type="line" />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Chart;
