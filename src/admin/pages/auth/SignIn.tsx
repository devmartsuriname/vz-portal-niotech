import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
import { useAuth } from '@/integrations/supabase/auth';
import { useToast } from '@/hooks/use-toast';
import logoDark from '@/admin/assets/images/logo-dark.png';
import logoLight from '@/admin/assets/images/logo-light.png';
import '@/admin/assets/scss/style.scss';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    document.body.classList.add('authentication-bg');
    return () => {
      document.body.classList.remove('authentication-bg');
    };
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Logged in successfully',
      });
      navigate('/admin/dashboard');
    }

    setLoading(false);
  };

  return (
    <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
      <div className="container">
        <Row className="justify-content-center">
          <Col xxl={4} lg={5}>
            <Card>
              <CardBody className="p-4">
                <div className="text-center mb-4">
                  <div className="auth-logo">
                    <Link to="/admin/dashboard" className="logo-dark">
                      <img src={logoDark} alt="dark logo" height="28" />
                    </Link>
                    <Link to="/admin/dashboard" className="logo-light">
                      <img src={logoLight} alt="light logo" height="28" />
                    </Link>
                  </div>
                </div>

                <h4 className="text-center mb-1">Sign In</h4>
                <p className="text-muted text-center mb-4">
                  Enter your email address and password to access admin panel.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="emailaddress" className="form-label">
                      Email address
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      id="emailaddress"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      required
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="checkbox-signin"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="checkbox-signin">
                        Remember me
                      </label>
                    </div>
                  </div>

                  <div className="mb-0 text-center">
                    <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                      {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                  </div>
                </form>
              </CardBody>
            </Card>

            <Row className="mt-3">
              <Col className="text-center">
                <p className="text-white-50">
                  Don't have an account?{' '}
                  <Link to="/admin/auth/sign-up" className="text-white ms-1">
                    <b>Sign Up</b>
                  </Link>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SignIn;
