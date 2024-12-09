import { Button, Card, Container,Nav, NavItem, NavLink, Navbar  } from 'react-bootstrap'
import { ListHomework } from './components/ListHomework';
import { useNavigate } from 'react-router-dom';

export const ShowHomework = () => {
    const user = JSON.parse(localStorage.user)
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        window.location.href="/"
    }

    return (
        <Container>
            <Navbar className='mb-3'>
                <Nav >
                    <NavItem>
                        <NavLink href="/CreateHomework">Crear Tareas</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() => logout()}>Cerrar sesión</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
            <Card style={{ background: "linear-gradient(to right, #c59fcb, #A770b2)", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)" }}>
                <Card.Body>
                    <h3>Bienvenido {user.name}</h3>
                    <Card.Title>{user.rol == "administrator" ? "Tareas Creadas" : "Tus tareas:"}</Card.Title>

                    {
                        user.rol == "client" && (
                            <Button className='mb-2' onClick={() => navigate("/CreateHomework")}>Crear Tarea</Button>
                        )
                    }
                    <ListHomework rol={user.rol} />
                </Card.Body>
            </Card>
        </Container>
    )
}
