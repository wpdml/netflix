import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AppLayout = () => {
  const[keyword,setKeyword]= useState("")
  const navigate = useNavigate()

  const searchByKeyword=(event)=>{
    event.preventDefault()
    navigate(`/movies?q=${keyword}`)
    setKeyword("")
  }

  return (
    <div>
            <style type="text/css">
        {`
          .navbar {
            background-color: black !important;
          }

          .home-link, .movies-link{
            color: white !important;
          }

          .home-link:hover, .movies-link:hover {
            color: #ccc !important;
          }
        `}
      </style>
      <Navbar expand="lg" className="navbar">
        <Container fluid>
          <Navbar.Brand href="#"> <img
              src="https://1000logos.net/wp-content/uploads/2017/05/Netflix-symbol.jpg" // Use the logo URL directly
              alt="Logo"
              height="50"
              className="d-inline-block align-top"
            /></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"/>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/" className="home-link">Home</Nav.Link>
              <Nav.Link href="/movies" className="movies-link">Movies</Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={(event)=> setKeyword(event.target.value)}
              />
              <Button variant="outline-danger">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppLayout;
