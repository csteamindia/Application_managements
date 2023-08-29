import {
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";

import { useEffect, useState } from 'react';
import axios from 'axios';
import url from '../../../backendURL/backend_urls'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify";

const UpdateUser = () => {
    const token = localStorage.getItem('access-token')
    const params = useParams();
    const [packages, setPackages] = useState([]);
    const [formData, setFormData] = useState({
        id: params.id,
        subscribed_date: new Date(),
        expiry_date: new Date(),
        app_id: 0,
        package_id: 0,
        full_name: "",
        username: "",
        password: "",
        email: "",
        mobile: "",
        role: "",
        domain: "",
        privileges: [],
        package: "",
        org_name: "",
        org_type: "",
    });

    const privilegesOptions = ['Read', 'Writer', 'Sharing', 'Delete'];
    const [apps, setApps] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchPackage_app();
        fetchApps();
        fetchSingleUser()
    }, [])



    const fetchPackage_app = async () => {
        await axios.get(url.PACKAGES, { headers: { Authorization: `Bearer ${token}` } }).then((result) => {
            setPackages(result.data.data.rows);
            // setFormData(result.data.data.rows);
        }).catch((error) => {
            alert("Error fetching packages");
        })
    }

    const fetchSingleUser = async () => {
        await axios.get(`${url.SINGLE_USER}${params.id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((result) => {
                setFormData(result.data.data)
            })
            .catch((error) => {
                console.log("error", error)
            })
    }

    const fetchApps = async () => {
        await axios.get(url.APP_LIST, { headers: { Authorization: `Bearer ${token}` } }).then((result) => {
            setApps(result.data.data.rows)
        }).catch((error) => { console.log('Error ====') })
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (checked) {
                setFormData((prevData) => ({
                    ...prevData,
                    privileges: [...prevData.privileges, value],
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    privileges: prevData.privileges.filter((item) => item !== value),
                }));
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                id: params.id,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Make API request
        await axios.post(url.CREATE_USER, formData, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                toast.success('Success');
                window.location.href = `/dashboard/${response.data.data.app_id}`
                // console.log(response.data.data.app_id);
                // navigate(-1)
            })
            .catch(error => {
                toast.error(error.response.data.message)
            });
    }

    return (
        <div>
            <h4><i className="bi bi-box-arrow-left" style={{ marginRight: '5px', cursor: 'pointer' }} onClick={() => navigate(-1)}></i>Update Create</h4>
            <Form onSubmit={handleSubmit} style={{ padding: "10px" }} method="post">
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label >
                                Full name
                            </Label>
                            <Input
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label >
                                Username
                            </Label>
                            <Input
                                type="text"
                                name="username"
                                value={formData.username}
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
                                Email
                            </Label>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label>
                                Mobile
                            </Label>
                            <Input
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Enter your mobile number"
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label>
                                Domain
                            </Label>
                            <Input
                                type="text"
                                name="domain"
                                value={formData.domain}
                                onChange={handleChange}
                                placeholder="Enter your Domain"
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Label check>
                            Privileges
                        </Label>
                        <Row>
                            <Col style={{ marginTop: "12px" }}>
                                {privilegesOptions.map((privileges) => (
                                    <FormGroup
                                        check
                                        inline
                                    >
                                        <Input
                                            type="checkbox"
                                            name="privileges"
                                            checked={formData.privileges.includes(privileges)}
                                            value={privileges}
                                            onChange={handleChange}
                                            key={privileges}
                                        />
                                        <Label check>
                                            {privileges}
                                        </Label>
                                    </FormGroup>

                                ))}
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6} >
                        <Label >
                            Role
                        </Label>
                        <Row>
                            <Col style={{ marginTop: "5px" }}>
                                <FormGroup check>
                                    <Input
                                        type="radio"
                                        name="role"
                                        value='Admin'
                                        checked={formData.role === "ADMIN"}
                                        onChange={handleChange}
                                    />
                                    {/* {' '} */}
                                    <Label check>
                                        Admin
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col style={{ marginTop: "5px" }}>
                                <FormGroup check>
                                    <Input
                                        type="radio"
                                        name="role"
                                        value='Client'
                                        checked={formData.role === "CLIENT"}
                                        onChange={handleChange}
                                    />
                                    {/* {' '} */}
                                    <Label check>
                                        Client
                                    </Label>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label>
                                Subscribed Date
                            </Label>
                            <Input
                                type="date"
                                name="subscribed_date"
                                value={formData.subscribed_date}
                                onChange={handleChange}
                                placeholder="Select subscribe date"
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6} >
                        <FormGroup>
                            <Label>
                                Expire At
                            </Label>
                            <Input
                                type="date"
                                name="expiry_date"
                                value={formData.expiry_date}
                                onChange={handleChange}
                                placeholder="Select expiry date"
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label>
                                Packages
                            </Label>
                            <Input
                                type="select"
                                name="package_id"
                                onChange={handleChange}
                                // value={formData.package_name}
                                required
                            >
                                {packages.map((data, index) => <option key={data.id} value={data.id}>{data.package_name}</option>)}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label>
                                Applications
                            </Label>
                            <Input
                                type="select"
                                name="app_id"
                                onChange={handleChange}
                                // value={formData.app_title}
                                required
                            >
                                {apps.map((data, index) => <option key={data.id} value={data.id}>{data.app_title}</option>)}
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Button type="submit" color="primary" md={6}>
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default UpdateUser;
