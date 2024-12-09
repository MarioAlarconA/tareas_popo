import { CardBody, Container, Card, FormGroup, FormControl, CardTitle, Button, CloseButton, Row, Col, CardText, Nav, NavItem, NavLink, Navbar } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateHomework = () => {
    const navigate = useNavigate()
    const [createHomework, setCreateHomework] = useState({
        homeworks: [
            {
                title: "Nombre de tarea",
                description: "Descripción de la tarea",
                date: "Fecha de expiración"
            }
        ],
        userId: JSON.parse(localStorage.user)._id
    })


    const onChangeText = (e, index) => {
        const data = createHomework
        data.homeworks[index][e.target.name] = e.target.value
        setCreateHomework({ ...data })
    }
    const addHomework = () => {
        const data = createHomework
        data.homeworks.push({ title: "Nombre de la tarea", description: "Descripción de la tarea", date: "Fecha de expiración" })
        setCreateHomework({ ...data })
    }
    const deleteHomework = (iq) => {
        const data = createHomework
        const filteredHomeworks = data.homeworks.filter((_, i) => i !== iq)
        data.homeworks = filteredHomeworks
        setCreateHomework({ ...data })
    }
    const sendData = async () => {
        try {
            await axios.post("http://localhost:4000/homework/create", createHomework)
            alert("Tarea guardada alv")
            navigate("/ShowHomework")
        } catch (error) {
            alert("Error al guardar")
        }
    };
    const onChangeDescription = (e, index) => {
        const data = createHomework
        data.homeworks[index][e.target.name] = e.target.value
        setCreateHomework({ ...data })
    }
    const onChangeDate = (e, index) => {
        const data = createHomework
        data.homeworks[index][e.target.name] = e.target.value
        setCreateHomework({ ...data })
    }

    const logout = () => {
        localStorage.clear()
        window.location.href = "/"
    }

    return (
        <Container style={{ width: "100%", height: "100%" }}>
            <Navbar>
                <Nav >
                    <NavItem>
                        <NavLink href="/ShowHomework">Ver Tareas</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() => logout()}>Cerrar sesión</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
            <Card className="text-center" border="light">
                <CardBody>
                    <hr style={{ height: "5px", backgroundColor: "blueviolet" }} />
                    <CardTitle style={{ fontWeight: "bold", fontSize: "30px" }} className="mt-3 mb-3">Crear Tareas</CardTitle>
                    <hr style={{ height: "5px", backgroundColor: "blueviolet" }} />
                    <Row>
                        <Col className="text-center">
                            <Button variant="success" onClick={addHomework}>Agregar tarea</Button>
                        </Col>
                        <Col className="text-center">
                            <Button variant="success" onClick={sendData}>Guardar tarea</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            {createHomework.homeworks.map((q, i) => (
                <Card className="mb-3" style={{ background: "linear-gradient(to right, #c59fcb, #A770b2)", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)" }}>
                    <CardBody>
                        <CardText className="text-end">
                            {createHomework.homeworks.length !== 1 && (
                                <CloseButton onClick={() => deleteHomework(i)}></CloseButton>
                            )}
                        </CardText>
                        <FormGroup>
                            <FormControl className="mb-3" value={q.title} name="title" onChange={(e) => onChangeText(e, i)}></FormControl>
                            <FormControl className="mb-3" value={q.date} name="date" type="date" onChange={(e) => onChangeDate(e, i)}></FormControl>
                            <FormControl value={q.description} name="description" onChange={(e) => onChangeDescription(e, i)} as="textarea" rows={4}></FormControl>


                        </FormGroup>
                    </CardBody>
                </Card>
            ))}
        </Container>
    )
}
