import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';

const MainMenu = () => {

  const user = useSelector(getUser);

  return(
    <Navbar bg="primary" data-bs-theme="primary" className="rounded my-3 px-3">
      <Navbar.Brand as={Link} to="/" className="text-white text-decoration-none">
        Home
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          {!user && (
            <Nav.Link as={Link} to="/login" className="text-white text-decoration-none">
              Sign In
            </Nav.Link>
          )}
          {!user && (
            <Nav.Link as={Link} to="/register" className="text-white text-decoration-none">
              Sign Up
            </Nav.Link>
          )}
          {user && (
            <Nav.Link as={Link} to="/logout" className="text-white text-decoration-none">
              Sign Out
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainMenu;