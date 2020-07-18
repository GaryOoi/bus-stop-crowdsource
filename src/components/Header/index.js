import React from "react";
import { Navbar, Container } from "react-bootstrap";

import { NavHeader, StyledLink } from "./styles";

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container className="d-flex p-2">
        <StyledLink to="/">
          <NavHeader href="#home">Bus Stop Crowdsource</NavHeader>
        </StyledLink>
      </Container>
    </Navbar>
  );
}

export default Header;
