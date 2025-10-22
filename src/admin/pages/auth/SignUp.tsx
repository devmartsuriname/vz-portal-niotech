import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
import { useAuth } from '@/integrations/supabase/auth';
import { useToast } from '@/hooks/use-toast';
import logoDark from '@/admin/assets/images/logo-dark.png';
import logoLight from '@/admin/assets/images/logo-light.png';
import '@/admin/assets/scss/style.scss';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    document.body.classList.add('authentication-bg');
    return () => {
      document.body.classList.remove('authentication-bg');
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptTerms) {
      toast({
        title: 'Error',
        description: 'You must accept the terms and conditions',
        variant: 'destructive',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Account created successfully! You can now sign in.',
      });
      navigate('/admin/auth/sign-in');
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
                      <img src={logoDark} alt="dark logo" height="28" loading="eager" decoding="async" />
                    </Link>
                    <Link to="/admin/dashboard" className="logo-light">
                      <img src={logoLight} alt="light logo" height="28" loading="eager" decoding="async" />
                    </Link>
                  </div>
                </div>

                <h4 className="text-center mb-1">Create your account</h4>
                <p className="text-muted text-center mb-4">
                  Don't have an account? Create your account, it takes less than a minute
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
                      minLength={6}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      required
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      minLength={6}
                    />
                  </div>

                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="checkbox-signup"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="checkbox-signup">
                        I accept <a href="#" className="text-muted">Terms and Conditions</a>
                      </label>
                    </div>
                  </div>

                  <div className="mb-0 text-center">
                    <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                      {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                  </div>
                </form>
              </CardBody>
            </Card>

            <Row className="mt-3">
              <Col className="text-center">
                <p className="text-white-50">
                  Already have account?{' '}
                  <Link to="/admin/auth/sign-in" className="text-white ms-1">
                    <b>Sign In</b>
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

export default SignUp;
