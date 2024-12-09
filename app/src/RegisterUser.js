import { Container, Card, Form, Button } from "react-bootstrap"
import './RegisterUser.css';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const RegisterUser = ()=>{
  const [data, setData] = useState({});

    const navigate = useNavigate();

    const onChangeRegister = (e) => {
        e.preventDefault();
        const nData = data;
        nData[e.target.name] = e.target.value;
        setData(nData);
        console.log(nData)
    };

    const onSubmit = async () => {
        try {
            data.rol="client"
            await axios.post("http://localhost:4000/users/create", data)
            navigate("/")
        } catch (error) {
            alert ("Hubo un error")
        } 
    }
  return(
    <Container>
      <center>
      <Card className="mt-3" style={{background: 'linear-gradient(to right, #c59fcb, #A770b2)', textAlign:'left', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', width:'400px'}}>
        <Card.Body>
          <Card.Title className="text-center">Registrate</Card.Title> <hr/>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control placeholder="Ingresa tu nombre" name="name" onChange={onChangeRegister}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellidos</Form.Label>
              <Form.Control placeholder="Ingresa tus apellidos" name="lastname" onChange={onChangeRegister}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Correro</Form.Label>
              <Form.Control placeholder="Ingresa tu correro electronico" name="email" type="email" onChange={onChangeRegister}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control placeholder="Ingresa una contraseña" name="password" type="password" onChange={onChangeRegister}/>
            </Form.Group>
            <Button className="mt-3" variant="success" onClick={onSubmit}>Registrate</Button>
          </Form>
        </Card.Body>
      </Card>
      </center>
      </Container>
      )
}

