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
      
      <Card className="mt-3">
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
            <Button className="mt-3" onClick={onSubmit}>Registrate</Button>
          </Form>
        </Card.Body>
      </Card>
      
      </Container>
      )
}

