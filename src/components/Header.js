import React, {useEffect, useState} from 'react';
import {Navbar, Nav, Container, Button,Form, FormControl,Badge} from 'react-bootstrap';
import { SignInButton,SignUpButton , SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Header = ({onSearch}) => {
    const navigate = useNavigate();
    const bookmarks = useSelector((state)=> state.bookmarks.items);
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange =(e) =>{
        const query = e.target.value;
        setSearchTerm(query);
        onSearch(query);
    }
  return (
    <Navbar expand="lg" bg='dark' variant='dark' sticky='top'>
      <Container fluid>
        <Navbar.Brand onClick={()=> navigate('/')} style={{cursor:'pointer'}}>Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
            <Form className='d-flex mx-auto' style={{flex:1,maxWidth:'500px'}}>
                <FormControl type='search' placeholder='Search for games..' className='me-2' value={searchTerm} onChange={handleSearchChange}/>
            </Form>
          <Nav>
            <SignedIn>
                <Nav.Link onClick={()=> navigate('/library')}>
                    Library
                    {/* Library <Badge bg='light' text='dark'>{bookmarks.length}</Badge> */}
                </Nav.Link>
                <UserButton/>
            </SignedIn>
            <SignedOut>
                <Nav.Link ><SignInButton/></Nav.Link>
            </SignedOut>
            <SignedOut>
                <Nav.Link ><SignUpButton/></Nav.Link>
            </SignedOut>
           </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default Header