import IconifyIcon from '@/admin/components/wrapper/IconifyIcon';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, Col, Row } from 'react-bootstrap';

interface CardData {
  title: string;
  count: string;
  icon: string;
  series: number[];
}

const cardsData: CardData[] = [
  {
    title: 'Total Income',
    count: '$78.8k',
    icon: 'solar:globus-outline',
    series: [25, 28, 32, 38, 43, 55, 60, 48, 42, 51, 35],
  },
  {
    title: 'New Users',
    count: '2,150',
    icon: 'solar:users-group-two-rounded-broken',
    series: [87, 54, 4, 76, 31, 95, 70, 92, 53, 9, 6],
  },
  {
    title: 'Orders',
    count: '1,784',
    icon: 'solar:cart-5-broken',
    series: [41, 42, 35, 42, 6, 12, 13, 22, 42, 94, 95],
  },
  {
    title: 'Conversion Rate',
    count: '12.3%',
    icon: 'solar:pie-chart-2-broken',
    series: [8, 41, 40, 48, 77, 35, 0, 77, 63, 100, 71],
  },
];

const StatCard = ({ count, icon, series, title }: CardData) => {
  const salesChart: ApexOptions = {
    chart: {
      type: 'area',
      height: 50,
      sparkline: {
        enabled: true,
      },
    },
    series: [
      {
        data: series,
      },
    ],
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    markers: {
      size: 0,
    },
    colors: ['#7e67fe'],
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return '';
          },
        },
      },
      marker: {
        show: false,
      },
    },
    fill: {
      opacity: [1],
      type: ['gradient'],
      gradient: {
        type: 'vertical',
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
  };

  return (
    <Card>
      <CardBody>
        <Row>
          <Col xs={6}>
            <p className="text-muted mb-0 text-truncate">{title}</p>
            <h3 className="text-dark mt-2 mb-0">{count}</h3>
          </Col>
          <Col xs={6}>
            <div className="ms-auto avatar-md bg-soft-primary rounded">
              <IconifyIcon style={{ padding: '12px' }} icon={icon} className="fs-32 avatar-title text-primary" />
            </div>
          </Col>
        </Row>
      </CardBody>
      <ReactApexChart options={salesChart} series={salesChart.series} height={50} type="area" />
    </Card>
  );
};

const Cards = () => {
  return (
    <Row>
      {cardsData.map((item, idx) => (
        <Col md={6} xl={3} key={idx}>
          <StatCard {...item} />
        </Col>
      ))}
    </Row>
  );
};

export default Cards;
