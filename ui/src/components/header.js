import {Navbar, Container, Nav} from 'react-bootstrap'
import * as React from 'react'
import {SearchForm} from './search-form'
import {AiOutlineDropbox} from 'react-icons/ai'

function Header() {

  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand >
          <AiOutlineDropbox aria-label="BoxTracker" />{" "}
          BoxTracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar">
          <Nav className="me-auto" /> {/*Filler to right-align search*/}
          <Nav>
            <SearchForm />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export {Header}
