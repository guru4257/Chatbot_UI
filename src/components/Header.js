import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Container } from 'react-bootstrap'

const Header = () => {
  return (
    <div>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>
                <i className="fas fa-robot"></i> ChatBot
              </Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </Container>
        </Navbar>
      </header>
    </div>
  )
}

export default Header
