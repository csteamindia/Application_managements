import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Form,
  Row,
  Col,
  FormGroup
} from "reactstrap";
import axios from "axios";
import url from '../../backendURL/backend_urls'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const DemoCreds = () => {
  const [users, setUsers] = useState([])
  const token = localStorage.getItem('access-token');
  const navigat = useNavigate();
  React.useEffect(() => {
    fetchApps()
  }, [])

  const fetchApps = async () => {
    try {
      await axios.get(url.CREDS, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => setUsers(response.data.data.rows))
        .catch((error) => toast.error(error.response.data.message));
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  }

  const handleCopyClick = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('copied')
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy text to clipboard.');
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure want to Delete this item ?");

    if (confirm) {
      await axios.delete(`${url.REMOVE_CRED}${id}`, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
        window.location.href = window.location.href //refresh page
      }).catch((error) => {
        toast.error(error.response.data.message)
      })
    }
  }
  return (
    <div>
      <h4 className="bi bi-box-arrow-left" onClick={() => navigat(-1)} style={{ cursor: 'pointer' }}></h4>
      {
        users && users.map((data, index) => {
          return (
            <Card
              style={{
                display: 'inline-flex',
                width: '18.9rem',
                marginLeft: '5px',
                borderRadius: "4px",
                marginTop: "10px"
              }}>
              <CardBody style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
              }}><h4 className="bi bi-trash3" style={{ flexDirection: 'revert-layer', cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(data.id)}></h4>
                <Form>
                  <Row>
                    <Col key={index}>Type: {data.type} </Col>
                  </Row>
                  <Row >
                    <Col>Email: {data.email} <span className="bi bi-clipboard-check" style={{ position: 'absolute' }} onClick={() => handleCopyClick(data.email)}></span></Col>
                  </Row>
                  <Row>
                    <Col>Password: {data.password} <span className="bi bi-clipboard-check" style={{ position: 'absolute' }} onClick={() => handleCopyClick(data.password)}></span></Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          )
        })
      }
    </div>
  );
};

export default DemoCreds;
