import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// @material-ui core components
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// Material Dashboard 2 React components
import axios from "axios";
import url from "url/url";
// Material Dashboard 2 React example components
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";
import TextField from '@mui/material/TextField';
// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'beige',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};
function DashboardNavbar({ absolute, light, isMini }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
      setItems(items);
      console.log("items")
      console.log(items)

    }
  }, []);
  const closeSuccessSB = () => setSuccessSB(false);
  const [successSB, setSuccessSB] = useState(false);

  const navigate = useNavigate();
  // const { state } = useLocation();
  const [openPass, setOpenPass] = useState(false);

  const handleClosePass = () => setOpenPass(false);
  const [email, setEmail] = useState('');
  const [AdminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [openAlert, setOpenAlert] = React.useState(false);

  const PasswordUpdate = () => {
    axios.get(`${url}api/admin/specificAdmin/${items}`)
      .then((response) => {
        console.log('History')
        const allData = response.data.result;
        console.log(response.data[0]);
        setEmail(response.data[0].email)
        setAdminId(response.data[0]._id)
        // setUserName(response.data.foundResult[0].username)
        setPassword(response.data[0].password)
        // setOpen(true)
        setOpenPass(true)
        setOpenMenu(false)

      })
      .catch(error => console.error(`Error:${error}`));

  }
  const headers = {
    'Content-Type': 'application/json'
  }
  const UpdatePass = () => {
    axios.put(`${url}api/admin/updateAdminPassword/`, {
      adminId: AdminId,
      email: email,
      newPassword: password
    }, { headers }).then(response => {
      console.log(response);
      setOpenAlert(true)
    })
      .catch(err => {
        console.log(err)
      })
  }

  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  // const { miniSidenav, transparentNavbar, fixedNavbar, darkMode } = controller;

  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);
  const handleCloseMenu = () => setOpenMenu(false);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2, display: 'flex', width: '200px' }}
    >
      <NotificationItem onClick={() =>  {
       navigate('/settings')
       
      }} icon={<Icon>settings_icon</Icon>} title="Settings" />
      <NotificationItem onClick={() => {
        localStorage.removeItem('items');
       navigate('/authentication/sign-in')
       
      }} icon={<Icon>logout</Icon>} title="Logout" />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox color={light ? "white" : "inherit"}>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleOpenMenu}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>

              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>

      <Modal
        open={openPass}
        onClose={handleClosePass}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={6}>

            <Grid item xs={11} md={11}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Admin Password
              </Typography>
            </Grid>
            <Grid item xs={1} md={1}>
            <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenPass(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
            </Grid>
            <Grid item xs={12} md={12} mt={-10}>
              <Collapse in={openAlert}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenAlert(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  Admin Updated Successfully!
                </Alert>
              </Collapse>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDTypography display="inline" variant="h6" textTransform="capitalize" fontWeight="bold">
                Email
              </MDTypography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField value={email}
                onChange={(e) => setEmail(e.target.value)
                } id="textFieldStyle" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>

              <MDTypography display="inline" variant="h6" textTransform="capitalize" fontWeight="bold">
                Password
              </MDTypography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField type="password"
                onChange={(e) => setPassword(e.target.value)
                } id="textFieldStyle" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={12} align="center" mt={-2}>
              <MDButton variant="gradient" color="error" size="small" onClick={UpdatePass}>
                Save
              </MDButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;


