import React from "react";
import { Link } from "@reach/router";
import { Nav, Container } from "react-bootstrap";

export default function NavBbar() {
  return (
    <Nav className="navbar bg-dark navbar-dark fixed-top">
      <Container>
        <Link to="/" className="navbar-brand">
          SUPERMICRO ME
        </Link>
      </Container>
    </Nav>
  );
}
