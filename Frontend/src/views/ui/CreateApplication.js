import {
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";

import { useState } from 'react';
import axios from 'axios';
import url from '../../backendURL/backend_urls'
import { useNavigate, useParams } from 'react-router-dom'

const CreateApplication = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const [formData, setFormData] = useState({
        id: "",
        app_title: "",
        logo: "",
        url: "",
        admin_url: "",
        domain_expiry_date: new Date(),
        database: "",
        database_host: "",
        database_username: "",
        database_password: "",
        last_backup: "",
        app_status: "",
    });
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access-token')
        // Make API request
        await axios.post(url.APP_SAVE, formData,{headers: { Authorization: `Bearer ${token}` }})
            .then(response => {
                console.log('------', response)
                navigate(-1)
            })
            .catch(error => {
                setErrorMessage(error)
            });
    }

    return (
        <div>
            <h4><i className="bi bi-box-arrow-left" style={{ marginRight: '5px', cursor:'pointer' }} onClick={()=>navigate(-1)}></i>Create Application</h4>
            <Form onSubmit={handleSubmit} style={{ padding: "10px" }} method="post">
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label >
                                Application name
                            </Label>
                            <Input
                                type="text"
                                name="app_title"
                                value={formData.app_title}
                                onChange={handleChange}
                                placeholder="Enter application name"
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label >
                                Logo
                            </Label>
                            <Input
                                type="text"
                                name="logo"
                                value={formData.logo}
                                onChange={handleChange}
                                placeholder="Enter username"
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label>
                                URL
                            </Label>
                            <Input
                                type="text"
                                name="url"
                                value={formData.url}
                                onChange={handleChange}
                                placeholder="Enter application url"
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label>
                                Admin URL
                            </Label>
                            <Input
                                type="text"
                                name="admin_url"
                                value={formData.admin_url}
                                onChange={handleChange}
                                placeholder="Enter admin url"
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label>
                                Database
                            </Label>
                            <Input
                                type="text"
                                name="database"
                                value={formData.database}
                                onChange={handleChange}
                                placeholder="Enter database name "
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label>
                                Database Host
                            </Label>
                            <Input
                                type="text"
                                name="database_host"
                                value={formData.database_host}
                                onChange={handleChange}
                                placeholder="Enter database host"
                            />
                        </FormGroup>
                    </Col>

                </Row>
                <Row>
                    <Col md={6}>
                        <Label check>
                            Database Username
                        </Label>
                        <Input
                            type="text"
                            name="database_username"
                            value={formData.database_username}
                            onChange={handleChange}
                            required
                        />
                    </Col>
                    <Col md={6}>
                        <Label check>
                            Database Password
                        </Label>
                        <Input
                            type="password"
                            name="database_password"
                            value={formData.database_password}
                            onChange={handleChange}
                            required
                        />
                    </Col>

                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label>
                                Domain Expired At
                            </Label>
                            <Input
                                type="date"
                                name="domain_expiry_date"
                                value={formData.domain_expiry_date}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6} >
                        <FormGroup>
                            <Label>
                                Last Backup
                            </Label>
                            <Input
                                type="date"
                                name="last_backup"
                                value={formData.last_backup}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6} >
                        <Label >
                            Status
                        </Label>
                        <Row>
                            <Col style={{ marginTop: "5px" }}>
                                <FormGroup check>
                                    <Input
                                        type="radio"
                                        name="app_status"
                                        value='Active'
                                        onChange={handleChange}
                                    />
                                    {/* {' '} */}
                                    <Label check>
                                        Active
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col style={{ marginTop: "5px" }}>
                                <FormGroup check>
                                    <Input
                                        type="radio"
                                        name="app_status"
                                        value='deactive'
                                        onChange={handleChange}
                                    />
                                    {/* {' '} */}
                                    <Label check>
                                        In-Active
                                    </Label>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Button type="submit" color="primary" md={7}>
                    Submit
                </Button>
            </Form>

        </div>

    );
};

export default CreateApplication;