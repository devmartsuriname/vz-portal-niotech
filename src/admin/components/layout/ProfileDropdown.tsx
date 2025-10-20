import { Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/integrations/supabase/auth';
import IconifyIcon from '@/admin/components/wrapper/IconifyIcon';

const ProfileDropdown = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/auth/sign-in');
  };

  return (
    <div className="topbar-item">
      <Dropdown>
        <Dropdown.Toggle as="button" className="topbar-button">
          <IconifyIcon icon="solar:user-circle-bold" className="fs-24" />
        </Dropdown.Toggle>

        <Dropdown.Menu align="end" className="dropdown-menu-animated profile-dropdown">
          <div className="dropdown-header">
            <h6 className="m-0">{user?.email}</h6>
          </div>
          <Dropdown.Item as={Link} to="/admin/dashboard">
            <IconifyIcon icon="solar:home-2-linear" className="me-2" />
            Dashboard
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>
            <IconifyIcon icon="solar:logout-2-linear" className="me-2" />
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ProfileDropdown;
