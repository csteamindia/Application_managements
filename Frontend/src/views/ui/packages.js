import { React, useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Button, Table } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { PACKAGES_URL } from '../../services/api_endpoints'
import { getCall } from '../../services/api_calls'


const Packages = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        fetchPackages();
    }, []);
    
    const token = localStorage.getItem('access-token')
    
    const navigate = useNavigate();
    async function fetchPackages() {
        const res = await getCall(PACKAGES_URL)
        console.log(res)
            // .then((response) => {
            //     console.log("-------", response.data.data.rows)
            //     setPackages(response.data.data.rows);
            // }).catch((error) => {
            //     console.log(error);
            // })
    }

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">
                        <h4><i className="bi bi-box-arrow-left" style={{ marginRight: '5px', cursor: 'pointer' }} onClick={() => navigate(-1)}></i>Available Package</h4>
                    </CardTitle>

                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                        <thead>
                            <tr>
                                {/* <th>Sr. No</th> */}
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                packages && packages.map((packages) => (
                                    <tr key={packages.id} className="border-top" >
                                        {/* <th scope="row">{index + 1}</th> */}
                                        <td>{packages.package_name}</td>
                                        <td>{packages.price}</td>
                                        <td>{packages.type}</td>
                                        <td>{packages.description}</td>
                                        <td style={{ display: 'flex' }}>
                                            <Button className="btn" color="primary" style={{ marginRight: '5px' }}><i className="bi bi-pencil-square me-1"></i></Button>
                                            <Button className="btn" color="danger"><i className="bi bi-trash"></i></Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}

export default Packages;