import { Card, CardBody, CardTitle, Button, Table } from "reactstrap";
import { useState, useEffect } from 'react'
import axios from 'axios'
import url from '../../../backendURL/backend_urls'
import { useParams } from "react-router-dom";

const AppUserList = () => {
  const params = useParams();
  const [usersData, setUsers] = useState([]);
  useEffect(() => {
    fetchUser()
  }, [params?.id])
  const token = localStorage.getItem('access-token')
  const fetchUser = async () => {
    await axios.get(`${url.APP_USER}/${params?.id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => { setUsers(response.data.data.rows) })
      .catch((error) => {
        console.log('Error', error)
      })
  }

  const removeUser = async (id) => {
    await axios.delete(`${url.DE_ACTIVE_USER}${id}`, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
      window.location.href = window.location.href //refresh page
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Application users</CardTitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Role</th>
                <th>Domain</th>
                <th>Privileges</th>
                <th>Package</th>
                <th>Organization Name</th>
                <th>Organization Type</th>
                <th>Subscribed At</th>
                <th>Expire At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((data, index) => (
                <tr key={data.id} className="border-top" >
                  <th scope="row">{index + 1}</th>
                  <td>{data.full_name}</td>
                  <td>{data.email}</td>
                  <td>{data.mobile}</td>
                  <td>{data.role}</td>
                  <td>{data.domain}</td>
                  <td>{(data.privileges).join(',')}</td>
                  <td>{data.package_name}</td>
                  <td>{data.org_name}</td>
                  <td>{data.org_type}</td>
                  <td>{data.subscribed_date}</td>
                  <td>{data.expiry_date}</td>
                  <td style={{ display: 'flex' }}>
                    <Button className="btn" color="primary" style={{ marginRight: '5px' }} onClick={() => window.location.href = `/update_user/${data.id}`}>
                      <i className="bi bi-pencil-square me-1"></i>
                    </Button>
                    <Button className="btn" color="danger" onClick={() => removeUser(data.id)}><i className="bi bi-trash"></i></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>

  );
};

export default AppUserList;
