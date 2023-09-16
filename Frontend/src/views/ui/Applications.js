import React, { useState } from "react";
import {
  Card,
  CardBody
} from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import url from '../../backendURL/backend_urls'
const Applications = () => {
  const [apps, setApps] = useState([])

  React.useEffect(() => {
    fetchApps()
  }, [])
  const token = localStorage.getItem('access-token');

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
          // const logo = !data.logo ? "https://picsum.photos/300/200" : data.logo;
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
      <Link to='/save_application'>
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
            alt="Sample"
            src="https://picsum.photos/300/200"
          />
          <CardBody >
            <i className="bi bi-plus-lg" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '2.2rem',
              color: '#2e86c1',
              fontWeight: '30px'
            }}></i>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default Applications;
