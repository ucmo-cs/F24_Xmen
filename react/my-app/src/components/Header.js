import React from 'react';
import {Card, Nav, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import "./Header.css"

 
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header(props) {

  return (
      <Navbar xpand="lg" id="bg-color-header">
        <a href="/loan"><img  src="https://www.commercebank.com/-/media/cb/images/about-us/mediakit-logos/2018cbcagreenverticalfdic.png?revision=752b4309-7352-4f8c-8255-5423fc8fb645&modified=20220506163118&h=50px&w=200px&hash=517A478D2E48B0D904DEE7CF91CEC977" width={300}></img></a>
        <Container fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavDropdown title={<img src="https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png" width={50}></img>} id="basic-nav-dropdown">
                <NavDropdown.Item href="/customer">Account</NavDropdown.Item>
                <NavDropdown.Item href="/login">Log Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default Header;