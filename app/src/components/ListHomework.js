import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

export const ListHomework = () => {
    const [homeworks, setHomeworks] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedHomework, setSelectedHomework] = useState({ title: "", description: "", date: "", _id: "" });

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/homeworks/get-all");
            setHomeworks(data.homeworks);
        } catch (error) {
            console.log(error);
            alert("Error al mostrar las tareas");
        }
    };

    const deleteHomework = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/homeworks/delete/${id}`);
            alert("Tarea eliminada con éxito");
            setHomeworks(homeworks.filter((hw) => hw._id !== id));
        } catch (error) {
            console.log(error);
            alert("Error al eliminar la tarea");
        }
    };

    const handleEditClick = (homework) => {
        setSelectedHomework(homework);
        setShowEditModal(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviar datos actualizados al backend
            await axios.put(`http://localhost:4000/homeworks/update`, selectedHomework);
            alert("Tarea actualizada con éxito");
            setShowEditModal(false);
            getData(); // Refresca la lista de tareas
        } catch (error) {
            console.log(error);
            alert("Error al actualizar la tarea");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedHomework({ ...selectedHomework, [name]: value });
    };

    return (
        <Container>
            <Row>
                {homeworks.map(({ title, description, date, _id }) => (
                    <Col key={_id}>
                        <Card style={{ width: "15rem" }} className='mb-3'>
                            <Card.Body>
                                <Card.Title>{title}</Card.Title>
                                <Card.Text>{description}</Card.Text>
                                <Card.Text>{date}</Card.Text>
                                <Row>
                                    <Col>
                                        <Button variant='outline-success' onClick={() => handleEditClick({ title, description, date, _id })}>
                                            Editar
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button variant="outline-danger" onClick={() => deleteHomework(_id)}>
                                            Eliminar
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Modal para editar tarea */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={selectedHomework.title}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={selectedHomework.description}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={selectedHomework.date}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Guardar Cambios
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};



/* import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';

export const ListHomework = () => {

    const [homeworks, setHomeworks] = useState([]);

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/homeworks/get-all");
            setHomeworks(data.homeworks);
        } catch (error) {
            console.log(error)
            alert("Error al mostrar las tareas")
        }
    }

    const deleteHomework = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/homeworks/delete/${id}`);
            alert("Tarea eliminada con éxito");
            setHomeworks(homeworks.filter((hw) => hw._id !== id));
        } catch (error) {
            console.log(error);
            alert("Error al eliminar la tarea")
        }
    };


    return (
        <Container>
            <Row>
                {
                    homeworks.map(({ title, description, date, _id }, i) => (
                        <Col>
                            <Card style={{ width: "15rem" }} className='mb-3'>
                                <Card.Body>
                                    <Row>
                                        <Col xs={8}>
                                            <Card.Title>
                                                {title}
                                            </Card.Title>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Card.Text>
                                            {description}
                                        </Card.Text>
                                    </Row>
                                    <Row>
                                        <Card.Text>
                                            {date}
                                        </Card.Text>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button variant='outline-success'>Editar</Button>
                                        </Col>
                                        <Col>
                                            <Button variant="outline-danger" onClick={() => deleteHomework(_id)}>Eliminar</Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}
 */