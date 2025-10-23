import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import "../assets/pages/error404.css";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="error-page" role="main">
      <div className="error-content">
        {/* Illustration/Icon */}
        <div className="error-illustration" aria-hidden="true">
          😔
        </div>

        {/* Title */}
        <h1 className="error-title">
          Oeps! Pagina Niet Gevonden
        </h1>

        {/* Description */}
        <p className="error-description">
          Het lijkt erop dat de pagina die u zoekt niet bestaat of is verplaatst.
          Laten we u terug naar veilige grond brengen.
        </p>

        {/* Action Buttons */}
        <div className="error-buttons">
          <Link to="/" className="theme-btn error-btn" aria-label="Terug naar de homepage">
            <i className="bx bx-home-alt"></i>
            Terug naar Home
          </Link>
          <Link to="/contact" className="btn-outline error-btn-outline" aria-label="Contacteer ons voor hulp">
            <i className="bx bx-envelope"></i>
            Contacteer Ons
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
