import DropDown from './DropDown';
import { Link } from 'react-router-dom';

export default function Nav({ setMobileToggle }) {
  return (
    <ul className="cs_nav_list fw-medium">
      <li>
        <Link to="/" onClick={() => setMobileToggle(false)}>
          Home
        </Link>
      </li>
      <li className="menu-item-has-children">
        <Link to="#">Diensten</Link>
        <DropDown>
          <ul>
            <li>
              <Link to="/instructies" onClick={() => setMobileToggle(false)}>
                Instructies
              </Link>
            </li>
            <li>
              <Link to="/documenten-lijsten" onClick={() => setMobileToggle(false)}>
                Documentenlijsten
              </Link>
            </li>
            <li>
              <Link to="/aanvraag-indienen" onClick={() => setMobileToggle(false)}>
                Aanvraag Indienen
              </Link>
            </li>
            <li>
              <Link to="/vergunningen" onClick={() => setMobileToggle(false)}>
                Vergunningen
              </Link>
            </li>
            <li>
              <Link to="/overzicht" onClick={() => setMobileToggle(false)}>
                Overzicht
              </Link>
            </li>
          </ul>
        </DropDown>
      </li>
      
      <li>
        <Link to="/about" onClick={() => setMobileToggle(false)}>
          Over Ons
        </Link>
      </li>
      <li>
        <Link to="/faq" onClick={() => setMobileToggle(false)}>
          FAQ
        </Link>
      </li>
      <li>
        <Link to="/blog" onClick={() => setMobileToggle(false)}>
          Nieuws
        </Link>
      </li>
      <li>
        <Link to="/contact" onClick={() => setMobileToggle(false)}>
          Contact
        </Link>
      </li>
      <li>
        <Link to="/feedback" onClick={() => setMobileToggle(false)}>
          Feedback
        </Link>
      </li>
    </ul>
  );
}
