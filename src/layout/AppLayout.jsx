import React, { useState } from "react";
import { Container, Form, Nav, Navbar } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AppLayout.style.css";

const AppLayout = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchByKeyword = (event) => {
    event.preventDefault();
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  };

  return (
    <div>
      <Navbar expand="lg" className="navbar">
        <Container fluid className="">
          <Navbar.Brand href="#">
          <img
  src="https://i.pinimg.com/originals/17/7f/3e/177f3e88ecf6187c52e51afeee413c9e.jpg"
  alt="Logo"
  height="50"
  className="d-inline-block align-top"
  style={{ borderRadius: "10px" }}
/>

          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav navbarScroll>
              <Nav.Link href="/" className="home-link">
                Home
              </Nav.Link>
              <Nav.Link href="/movies" className="movies-link">
                Movies
              </Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="Enter..."
                className="me-2"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
              <button className="button">⋆Search⋆</button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppLayout;
