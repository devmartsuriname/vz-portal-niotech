import { Link } from 'react-router-dom';

const LogoBox = () => {
  return (
    <div className="logo-box">
      <Link to="/admin/dashboard" className="logo-dark">
        <img src="/assets/branding/logo-vz-icon.svg" className="logo-sm" alt="VZ Juspol Admin Portal" loading="eager" decoding="async" />
        <img src="/assets/branding/logo-vz.svg" className="logo-lg" alt="VZ Juspol Admin Portal" loading="eager" decoding="async" />
      </Link>
      <Link to="/admin/dashboard" className="logo-light">
        <img src="/assets/branding/logo-vz-icon.svg" className="logo-sm" alt="VZ Juspol Admin Portal" loading="eager" decoding="async" />
        <img src="/assets/branding/logo-vz-white.svg" className="logo-lg" alt="VZ Juspol Admin Portal" loading="eager" decoding="async" />
      </Link>
    </div>
  );
};

export default LogoBox;
