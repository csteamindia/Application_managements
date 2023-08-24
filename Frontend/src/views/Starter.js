import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import AppUserList from "../components/dashboard/Users/AppUserList";


const Starter = () => {
  return (
    <div>
      <Row>
        <Col sm="9" lg="9" xl="9" xxl="12">
          <SalesChart />
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg="9">
          <AppUserList />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
