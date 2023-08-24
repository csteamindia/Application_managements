import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import Starter from "../views/Starter";

const FullLayout = ({children, isHome}) => {
  console.log({children, isHome})
  return (
    <main>
      {/********header**********/}
      <Header />
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        {
          !isHome && 
          <aside className="sidebarArea shadow" id="sidebarArea">
            <Sidebar />
          </aside>
        }
        {/********Content Area**********/}
        <div className="contentArea">
          {/********Middle Content**********/}
          <Container className="p-4" fluid>
            {children}
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
