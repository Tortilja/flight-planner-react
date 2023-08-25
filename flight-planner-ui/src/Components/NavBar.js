import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import { useLocation } from 'react-router-dom';
function NavbarDarkExample() {
  const [authToken, setAuthToken] = useState('');


  const location = useLocation();

  useEffect(() => {
    const authTokenData = localStorage.getItem('authToken');
    if (authTokenData) {
      const { authToken: token, expirationTime } = JSON.parse(authTokenData);
      if (new Date().getTime() <= expirationTime) {
        setAuthToken(token);
      }
    }
  }, [location]);

  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand>Flight Planner</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">

          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Customer"
              menuVariant="dark"
            >
              <NavDropdown.Item href="/customerAirport">
                Airport
              </NavDropdown.Item>
              <NavDropdown.Item href="/customerFlight">
                Flight
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {authToken && (
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Admin"
                menuVariant="dark"
              >
                <NavDropdown.Item href="/adminAirport">
                  Airport
                </NavDropdown.Item>
                <NavDropdown.Item href="/adminFlight">
                  Flight
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}

          <Nav className="ms-auto">
            <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarDarkExample;
