import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const NavbarPage = () => {
  return (
    <div className="mb-4">
      <Container>
      <div className="welcome-text">Welcome, Aditya</div>
        <Navbar expand="lg">
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* <Nav.Link href="/riwayat-status-brankas">Status Brankas</Nav.Link>
              <Nav.Link href="/riwayat-pin">Riwayat PIN</Nav.Link>
              <Nav.Link href="/data-enkripsi">Data Enkripsi</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
};

export default NavbarPage;
