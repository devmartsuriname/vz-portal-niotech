import { Link } from 'react-router-dom';
import logoDark from '@/admin/assets/images/logo-dark.png';
import logoLight from '@/admin/assets/images/logo-light.png';
import logoSm from '@/admin/assets/images/logo-sm.png';

const LogoBox = () => {
  return (
    <div className="logo-box">
      <Link to="/admin/dashboard" className="logo-dark">
        <img width={24} height={24} src={logoSm} className="logo-sm" alt="logo sm" loading="eager" decoding="async" />
        <img width={114} height={28} src={logoDark} className="logo-lg" alt="logo dark" loading="eager" decoding="async" />
      </Link>
      <Link to="/admin/dashboard" className="logo-light">
        <img width={24} height={24} src={logoSm} className="logo-sm" alt="logo sm" loading="eager" decoding="async" />
        <img width={114} height={28} src={logoLight} className="logo-lg" alt="logo light" loading="eager" decoding="async" />
      </Link>
    </div>
  );
};

export default LogoBox;
