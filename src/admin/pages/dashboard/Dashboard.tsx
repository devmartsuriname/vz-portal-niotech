import Footer from '@/admin/components/layout/Footer';
import Cards from './components/Cards';
import Chart from './components/Chart';
import User from './components/User';
import PageTitle from '@/admin/components/PageTitle';

const Dashboard = () => {
  return (
    <>
      <PageTitle subName="VZ Juspol Admin Portal" title="Dashboard" />
      <Cards />
      <Chart />
      <User />
    </>
  );
};

export default Dashboard;
