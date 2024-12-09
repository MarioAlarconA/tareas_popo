import React, { useEffect, useState } from 'react'
import { Card, Container, Row, Col, Nav, Navbar, NavItem, NavLink } from 'react-bootstrap'
import axios from 'axios';

export const Dashboard = () => {

    const [user, setUser] = useState({});

    const [metrics, setMetrics] = useState({
        NumUsers: 0,
        NumHomeworks: 0
    })

    useEffect(() => {
        getUser()
        getMetrics()
    }, []);

    const getUser = () => {
        const user = JSON.parse(localStorage.user);
        setUser(user);
    }

    const getMetrics = async () => {
        try {
            const res = await axios.get("http://localhost:4000/homework/get-metrics");
            const data = {
                NumHomeworks: res.data.NumHomeworks,
                NumUsers: res.data.NumUsers
            }
            setMetrics(data)
        } catch (error) {
            alert("Hubo un error al obtener las metricas")
        }
    }

    const logout = () =>{
        localStorage.clear()
        window.location.href="/"
    }


    return (
        <Container className='mt-3'>
            <Navbar>
                <Nav >
                    <NavItem>
                        <NavLink>Home</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink onClick={() => logout()}>Cerrar sesión</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>

            <Card style={{ background: "linear-gradient(to right, #c59fcb, #A770b2)", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)" }}>

                <Card.Body>
                    <Card.Title>Bienvenido {user.name} </Card.Title>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Numero de usuarios: </Card.Title>
                                    {metrics.NumUsers}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Tareas creadas: </Card.Title>
                                    {metrics.NumHomeworks}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}
