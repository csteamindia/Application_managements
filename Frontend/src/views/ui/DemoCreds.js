import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Form,
  Row,
  Col
} from "reactstrap";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { CREDS_URL } from '../../services/api_endpoints'
import { getCall, deleteCall } from '../../services/api_calls'


const DemoCreds = () => {
  const navigat = useNavigate();
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    fetchApps()
  }, [])

  const fetchApps = async () => {
    try {
      const res = await getCall(CREDS_URL)
      console.log(res)
    //     .then((response) => setUsers(response.data.data.rows))
    //     .catch((error) => toast.error(error.response.data.message));
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
      const res = await deleteCall(`${CREDS_URL}/${id}`)
      console.log(res)
      // .then((response) => {
      //   window.location.href = window.location.href //refresh page
      // }).catch((error) => {
      //   toast.error(error.response.data.message)
      // })
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
