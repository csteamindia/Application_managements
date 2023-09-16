import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { useNavigate, Link } from "react-router-dom"
import { toast } from 'react-toastify'
import axios from "axios";
import url from '../../backendURL/backend_urls'
import addImgae from '../../assets/images/add-icon.png'

const Applications = () => {
  const navigate = useNavigate()
  const [apps, setApps] = useState([])
  const [modal, setModal] = useState(false)

  // const [errorMessage, setErrorMessage] = useState("")
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
      await axios.post(url.APP_SAVE, formData, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
          toast.success("Success");
          navigate(-1)
      })
      .catch(error => {
          toast.error(error.data.data.message);
      });
  }

  useEffect(() => {
    fetchApps()
  }, [])

  const fetchApps = async () => {
    try {
      const token = localStorage.getItem('access-token');
      const response = await axios.get(url.APP_LIST, { headers: { Authorization: `Bearer ${token}` } });
      setApps(response.data.data.rows);
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  }

  return (
    <div>
      {
        apps && apps.map((data, index) => {
          return (
            <Link to={`/dashboard/${data.id}`} key={data.id}>
              <Card
                style={{
                  display: 'inline-flex',
                  width: '18.9rem',
                  marginLeft: '5px',
                  borderRadius: "4px",
                  marginTop: "10px"
                }}>
                <img 
                  style={{width: '250px', margin: '0 auto'}}
                  alt="Sample"
                  src="https://picsum.photos/300/200"
                />
                <CardBody style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h4 key={data.id}>
                    {data.app_title}
                  </h4>
                </CardBody>
              </Card>
            </Link>
          )
        })
      }
      <Link to='#' onClick={() => setModal(true)}>
        <Card
          style={{
            display: 'inline-flex',
            width: '18.9rem',
            marginLeft: '5px',
            borderRadius: "5px",
            // backgroundColor: '#F2F4F4',
            marginTop: '10px'
          }}
        >
          <img
            title="add aplication"
            alt="Sample"
            src={addImgae}
          />
          <CardBody title="add aplication">
            <span style={{display: 'flex', alignItems: 'center'}}>
              <i className="bi bi-plus" style={{
                alignItems: 'center',
                fontSize: '1.5rem',
                color: '#000',
                fontWeight: '30px'
              }}></i> Add Application
            </span>
          </CardBody>
        </Card>
      </Link>

      <Modal
        isOpen={modal}
        size="lg"
        toggle={() => {
          setModal(!modal)
        }}
        modalTransition={{ timeout: 200 }}>
        <ModalHeader>
          Add Application
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit} style={{ padding: "10px" }} method="post">
              {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
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
                              placeholder="Enter logo url"
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
              <br />
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
                      <label>Status</label>
                      <Row style={{marginLeft: '-5px'}}>
                          <Col style={{ margin: '5px', padding: '5px', background: '#9b9898', textAlign: '-webkit-match-parent', maxWidth: '98px', borderRadius:'4px' }}>
                              <FormGroup check>
                                  <Input
                                      type="radio"
                                      name="app_status"
                                      value='Active'
                                      id="deactiveRadio1"
                                      onChange={handleChange}
                                  />
                                  {/* {' '} */}
                                  <Label check htmlFor="deactiveRadio1">
                                      Active
                                  </Label>
                              </FormGroup>
                          </Col>
                          <Col style={{ margin: '5px', padding: '5px', background: '#9b9898', textAlign: '-webkit-match-parent', maxWidth: '98px', borderRadius:'4px' }}>
                              <FormGroup check>
                                  <Input
                                      type="radio"
                                      name="app_status"
                                      id="deactiveRadio2"
                                      value='deactive'
                                      onChange={handleChange}
                                  />
                                  {/* {' '} */}
                                  <Label check htmlFor="deactiveRadio2">
                                      In-Active
                                  </Label>
                              </FormGroup>
                          </Col>
                      </Row>
                  </Col>
              </Row>
              <br />
              <Button type="submit" color="primary" md={7}>
                  Submit
              </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Applications;
