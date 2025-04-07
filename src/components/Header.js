import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl } from 'react-bootstrap';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  // const bookmarks = useSelector((state) => state.bookmarks.items);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    onSearch(query);
  }
  return (
    <Navbar expand="lg" bg='dark' variant='dark' fixed='top'>
      <Container fluid>
        <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }} className="d-flex align-items-center gap-2"> <img
          src="/GameHub.jpg"
          alt="GameHub Logo"
          className="d-inline-block align-top me-2 img-fluid"
          style={{ maxHeight: '55px', width: 'auto' }}
        />
          <span
            className="fw-bold text-primary"
            style={{
              fontSize: '1.6rem',
              fontFamily: 'Segoe UI, sans-serif',
              lineHeight: '1',
              marginTop: '2px',
            }}
          >GameHub</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form
            className='d-flex mx-auto'
            style={{ flex: 1, maxWidth: '500px' }}
            onSubmit={(e) => {
              e.preventDefault();
              onSearch(searchTerm);
            }}
          >
            <FormControl
              type='search'
              placeholder='Search for games...'
              className='me-2'
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form>
          <Nav>
            <SignedIn>
              <Nav.Link onClick={() => navigate('/library')}>
                Library
              </Nav.Link>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Nav.Link className="p-0">
                <SignInButton className="btn btn-primary me-2" />
              </Nav.Link>
            </SignedOut>
            <SignedOut>
              <Nav.Link className="p-0">
                <SignUpButton className="btn btn-primary me-2" />
              </Nav.Link>
            </SignedOut>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default Header