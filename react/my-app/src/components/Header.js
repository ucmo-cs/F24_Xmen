import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import "./Header.css"

 
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header(props) {

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:8081/user/logout", {
                method: "POST",
                credentials: "include",  // Include credentials to ensure the session is cleared
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                window.location.href = "/login";  // Redirect to login page after successful logout
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("An error occurred during logout:", error);
        }
    };

  return (
      <Navbar xpand="lg" id="bg-color-header">
        <a href="/loan"><img src="/HeaderLogo.png" width={300} alt="Commerce Bank Logo"/></a>
        <Container fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavDropdown title={<img src="/profileLogo.png" width={50} alt="Profile Icon"></img>} id="basic-nav-dropdown">
                <NavDropdown.Item href="/customer">Account</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default Header;