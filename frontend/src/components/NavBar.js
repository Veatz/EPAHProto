import { Link } from 'react-router-dom';
import logo from '../images/logo.png'; // Adjust this path based on where your image is stored

const NavBar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo" className="logo-img" />
        </Link>
        <h1>EPAHP Digital Mapping System</h1>
      </div>
    </header>
  );
};

export default NavBar;
