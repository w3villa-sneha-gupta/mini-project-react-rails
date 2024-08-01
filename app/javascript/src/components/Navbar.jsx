import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar as BootstrapNavbar } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';


function NavbarForLogin() {
  return (
    <BootstrapNavbar collapseOnSelect expand="lg" className="bg-secondary">
      <Container>
        <BootstrapNavbar.Brand href="#home" className="text-white">Logo</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
        <BootstrapNavbar.Collapse id="responsive-navbar-nav">
         
          <Nav>
            <Nav.Link href="/" className="text-white">Login</Nav.Link>
            <Nav.Link href="#deets" className="text-white">Sign Up</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default NavbarForLogin;
