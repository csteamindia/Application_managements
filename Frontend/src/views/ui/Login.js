import React, { useEffect } from 'react'
import { useNavigate, useRoutes } from 'react-router-dom';
import {
    Card,
    Row,
    Col,
    CardTitle,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
import './login.css'
import { LOGIN_URL } from '../../services/api_endpoints'
import { postCall } from '../../services/api_calls' 

const Login = () => {
    const [loginCred, setLoginCred] = React.useState({
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = React.useState("");
    const navigate = useNavigate();
    const clearState = () => {
        setLoginCred({
            email: "",
            password: ""
        });

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginCred((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await postCall(`${LOGIN_URL}`, loginCred)
        
        console.log({res})

            // .then((res) => {
            //     localStorage.setItem('accessToken', res.data.data.token)
            //     clearState();
            //     window.location.href = '/home'
            //     // navigate('/home');
            // })
            // .catch((error) => {
            //     console.log(error)
            //     setErrorMessage("Invalid username or password");
            // });
    };
    return (
        <div>
            <Row className='container'>
                <Col>
                    {/* --------------------------------------------------------------------------------*/}
                    {/* Card-1*/}
                    {/* --------------------------------------------------------------------------------*/}
                    <Card>
                        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                            <i className="bi bi-box-arrow-in-right me-2"> </i>
                            Login
                        </CardTitle>
                        <CardBody>
                            <Form onSubmit={handleSubmit} >
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                                <FormGroup>
                                    <Label for="exampleEmail">Email</Label>
                                    <Input
                                        type="email"
                                        id="exampleEmail"
                                        name="email"
                                        onChange={handleChange}
                                        value={loginCred.email}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">Password</Label>
                                    <Input
                                        id="examplePassword"
                                        name="password"
                                        onChange={handleChange}
                                        value={loginCred.password}
                                        placeholder="Enter your password "
                                        type="password"
                                        required
                                    />
                                </FormGroup>
                                <Button type='submit' color='success' >Submit</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
