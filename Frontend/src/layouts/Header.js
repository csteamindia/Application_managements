import React from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown
} from "reactstrap";
import logo  from "../assets/images/logos/csteamcp_logo.png";
import user1 from "../assets/images/users/user4.jpg";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);  
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const logout = async () => {
    localStorage.clear();
    const isLogin = localStorage.hasOwnProperty('access-token') && localStorage.getItem('access-token') !== ""
    isLogin ? <Navigate to="/home" /> : window.location.href = '/'
  }

  return (
    <>
      <Navbar color="white" light expand="lg" className="fix-header">
        <div className="d-flex align-items-center">
          <NavbarBrand href="/">
            <img alt="panel logo" src={logo} style={{height: '45px'}} />
          </NavbarBrand>
        </div>

        <Collapse navbar style={{display: 'block', position: 'absolute', right: '0'}}>
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
