import AppContext from "appState/context";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import { Typography } from "@mui/material";
import './index.css'
import basePath from "basePath";
import useNavbar from "hooks/useNavbar";
import ChangePassword from 'components/Navbars/changePassword'
import ChangeEmail from 'components/Navbars/changeEmail'
const AdminNavbar = (props) => {
  const appState = useContext(AppContext);
  const { setShowSideNavbar, changePassword, setChangePassword, changeEmail, setChangeEmail } = appState;
  const {
    location,
  } = useNavbar();
  return (
    <>
      {changePassword && <ChangePassword />}
      {changeEmail && <ChangeEmail />}
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid >
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            <Typography color={`${location.pathname == `/${basePath}/admin/index` ? 'white' : 'black'}`}>
              {props.brandText}
            </Typography>
          </Link>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      <Typography color={`${location.pathname == `/${basePath}/admin/index` ? 'white' : 'black'}`}>{localStorage.getItem('name')}</Typography>
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" onClick={() => { setChangePassword(true); setShowSideNavbar(false) }}>
                  <i className="ni ni-single-02" />
                  <span>Change Password</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" onClick={() => { setChangeEmail(true); setShowSideNavbar(false) }}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Change email</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={(e) => {
                  e.preventDefault();
                  localStorage.clear();

                  window.location.reload();
                }}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
