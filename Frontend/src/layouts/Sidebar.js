import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation, useParams } from "react-router-dom";


const Sidebar = () => {
  const param = useParams();

  const navigation = [
    {
      title: "Dashboard",
      href: `/dashboard/${param.id}`,
      icon: "bi bi-speedometer2",
    },
    {
      title: "Apps",
      href: "/home",
      icon: "bi bi-gear",
    },
    {
      title: "Packages",
      href: `/packages`,
      icon: "bi bi-box-seam-fill",
    },
    {
      title: "Report",
      href: "#",
      icon: "bi bi-list-check",
    },
    {
      title: "Create user",
      href: `/create_user/${param.id}`,
      icon: "bi bi-people",
    }

  ];

  let location = useLocation();

  return (
    <div className="bg-dark">
      <div className="p-3">
        <h6 style={{ color: 'white' }}><i className="bi bi-box-arrow-left" style={{ marginRight: '5px', cursor: 'pointer', margin: '14px' }} onClick={() => window.location.href = '/home'}></i>Back to Application</h6>
        {/* <Link to={'/home'} className="ps-3  text-white"> {`< Back to Apps`}</Link> */}
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
