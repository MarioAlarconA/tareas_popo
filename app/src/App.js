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
    
    <Container className="mt-3" style={{}}>
<center>
      <Card style={{ background: 'linear-gradient(to right, #cca9dd, #B2B5E0)', textAlign:'left', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', width: '400px' }}>

        <Card.Body>
          <Card.Title className="text-center">ToDo List</Card.Title>
          <hr></hr>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Correo electronico</Form.Label>
              <Form.Control placeholder="Ingresa tu correo electronico" type="email" name="email" onChange={onChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control placeholder="Ingresa tu contraseña" type="password" name="password" onChange={onChange}/>
            </Form.Group>

            <Button className="mt-2" variant="success" onClick={onSubmit}>Ingresar</Button>
            <Button href="/RegisterUser">Registrate</Button>

          </Form>
        </Card.Body>
      </Card>
      </center>
    </Container>
  )
}

export default App;
