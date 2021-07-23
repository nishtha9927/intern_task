import React,{useState,useEffect} from "react";
import { Navbar, Nav, Container, Row, NavDropdown,Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import Message from './Message'


function Header() {
  let history = useHistory();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  

  useEffect(() => {
        
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    
}, [userInfo])
  

  
  const logoutHandler  = () => {
    const userInfo = localStorage.removeItem("userInfo")
    history.push('/')
    
  }
  
  
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
        
          <LinkContainer to="/">
          
            <Navbar.Brand>TheDoctorsClinic</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
            
              
                
                  

           
             <Navbar.Collapse id="basic-navbar-nav">
            
             <Nav className="ml-auto" style={{"margin-left":"auto"}}>
            <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
           
               
              
                
              

              
                
              
            
        </Container>
      </Navbar>
      
    </header>
  );
}

export default Header;
