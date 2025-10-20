import { Card, CardBody, CardHeader, Col, Row, Table } from 'react-bootstrap';
import avatar1 from '@/admin/assets/images/users/avatar-1.jpg';
import avatar2 from '@/admin/assets/images/users/avatar-2.jpg';
import avatar3 from '@/admin/assets/images/users/avatar-3.jpg';
import avatar4 from '@/admin/assets/images/users/avatar-4.jpg';
import avatar5 from '@/admin/assets/images/users/avatar-5.jpg';

const userData = [
  { name: 'Paul J. Friend', email: 'pauljfrnd@jourrapide.com', avatar: avatar1, status: 'Active' },
  { name: 'Bryan J. Luellen', email: 'bryuellen@dayrep.com', avatar: avatar2, status: 'Active' },
  { name: 'Kathryn S. Collier', email: 'collier@jourrapide.com', avatar: avatar3, status: 'Active' },
  { name: 'Timothy Kauper', email: 'thykauper@rhyta.com', avatar: avatar4, status: 'Inactive' },
  { name: 'Zara Raws', email: 'austin@dayrep.com', avatar: avatar5, status: 'Active' },
];

const User = () => {
  return (
    <Row>
      <Col lg={12}>
        <Card>
          <CardHeader>
            <h4 className="header-title">Latest Users</h4>
          </CardHeader>
          <CardBody>
            <Table responsive className="table-hover table-centered mb-0">
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, idx) => (
                  <tr key={idx}>
                    <td>
                      <img src={user.avatar} alt="table" className="avatar-sm rounded-circle" />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge bg-${user.status === 'Active' ? 'success' : 'danger'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <a href="#" className="btn btn-sm btn-light">
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default User;
