import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import React from "react";
import User from "../service/User";
import { useNavigate  } from "react-router-dom";

function ColorSchemesExample() {
    const currentUser = User()
    let navigate  = useNavigate();

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Chat LAW App</Navbar.Brand>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/admin">Admin Page</Nav.Link>
                        </Nav>
                        {currentUser &&
                            <Form className="d-flex">
                                <Button variant="danger" onClick={() => navigate("/logout")}>Logout</Button>
                            </Form>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default ColorSchemesExample;