import React from 'react';
import { Image, Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const token = useSelector((state) => state.token);
  return (
    <Navbar className="px-5 py-3" bg="light" expand="md">
      <Link className="navbar-brand" to="/">
        <Image src="/assets/images/logo.svg" />
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link className="nav-link mr-3" to="/">
            Home
          </Link>
          <Link className="nav-link mr-3" to="/rooms">
            Rooms
          </Link>
          {token && (
            <Link className="nav-link mr-3" to="/booklist">
              Book List
            </Link>
          )}
          <Link className="nav-link" to={token ? '/logout' : '/login'}>
            {token ? 'Logout' : 'Login'}
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
