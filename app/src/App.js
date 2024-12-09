import { Container, Form, Card, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const App = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const onChange = (e) => {
    e.preventDefault();
    const loginData = data;
    loginData[e.target.name] = e.target.value;
    setData(loginData)
  }


  const onSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:4000/users/sign-in", data);
      const user = res.data.user;
      user.logined = true;
      localStorage.user = JSON.stringify(user)
      if(user.rol == "administrator"){
        navigate("/Dashboard")
      }
      else{
        navigate("/ShowHomework")
      }
    }catch(error){
        alert("mal")
      }
  }
  return (
    
    <Container className="mt-3" >
      <Card style={{width:"60%"}}>

        <Card.Body>
          <Card.Title className="text-center">ToDo List</Card.Title>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Correo electronico</Form.Label>
              <Form.Control placeholder="Ingresa tu correo electronico" type="email" name="email" onChange={onChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control placeholder="Ingresa tu contraseña" type="password" name="password" onChange={onChange}/>
            </Form.Group>

            <Button className="mt-2" onClick={onSubmit}>Ingresar</Button>
            <Button href="/RegisterUser">Registrate</Button>

          </Form>
        </Card.Body>
      </Card>
     
    </Container>
  )
}

export default App;
