import React from "react";
import { Link, Navigate } from "react-router-dom";
import url from '../backendURL/backend_urls'
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import Logo from "./Logo";
import { ReactComponent as LogoWhite } from "../assets/images/logos/adminprowhite.svg";
import user1 from "../assets/images/users/user4.jpg";
import axios from 'axios'

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [apps, setApps] = React.useState([]);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };



  React.useEffect(() => {
    fetchApps()
  }, [])
const token = localStorage.getItem('access-token')
  const fetchApps = async () => {
    try {
      const response = await axios.get(`${url.APP_LIST}`,{ headers: { Authorization: `Bearer ${token}` } });
      setApps(response.data.data.rows);
    } catch (error) {
      console.log('Error fetching Application:', error);
    }
  }

  const logout = async () => {
    localStorage.clear();
    const isLogin = localStorage.hasOwnProperty('access-token') && localStorage.getItem('access-token') != ""
    console.log("isLogin -->", isLogin);
    isLogin ? <Navigate to="/home" /> : window.location.href = '/'
  }

  return (
    <>
      <Navbar color="white" light expand="lg" className="fix-header">
        <div className="d-flex align-items-center">
          <div className="d-lg-block d-none me-5 pe-5">
            <Logo />
          </div>
          <NavbarBrand href="/">
            <LogoWhite className="d-lg-none" />
          </NavbarBrand>
          <Button
            color="primary"
            className=" d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-list"></i>
          </Button>
        </div>
        <div className="hstack gap-2">
          <Button
            color="primary"
            size="sm"
            className="d-sm-block d-md-none"
            onClick={Handletoggle}
          >
            {isOpen ? (
              <i className="bi bi-x"></i>
            ) : (
              <i className="bi bi-three-dots-vertical"></i>
            )}
          </Button>
        </div>

        <Collapse navbar isOpen={isOpen}>
          <Nav className="me-auto" navbar>
          </Nav>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle color="transparent">
              <img
                src={user1}
                alt="profile"
                className="rounded-circle"
                width="30"
              ></img>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Info</DropdownItem>
              <DropdownItem>My Account</DropdownItem>
              <DropdownItem>Edit Profile</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>My Balance</DropdownItem>
              <DropdownItem>Inbox</DropdownItem>
              <DropdownItem>
                <Link onClick={logout} className='nav-link'>
                  Logout
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Collapse>
      </Navbar >
    </>
  );
};

export default Header;
