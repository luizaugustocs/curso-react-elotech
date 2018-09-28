import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Navbar bg="light" style={{ marginBottom: 20 }}>
      <Nav className="mr-auto">
        <NavLink exact className="nav-link" to="/">
          <Navbar.Brand>Elo Twitter</Navbar.Brand>
        </NavLink>
      </Nav>
      <Nav className="justify-content-end">
        <NavLink className="nav-link" to="/configuracao">
          Configuração
        </NavLink>
        <NavLink className="nav-link" to="/login">
          Entrar
        </NavLink>
      </Nav>
    </Navbar>
  );
};

export { NavigationBar };
