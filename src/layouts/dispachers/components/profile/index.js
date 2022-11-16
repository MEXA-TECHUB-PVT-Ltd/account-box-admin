import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import MDBox from "components/MDBox";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import Header from "layouts/dispachers/components/profile/components/Header";
import ProfilesList from "examples/Lists/ProfilesList";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import breakpoints from "assets/theme/base/breakpoints";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import url from "url/url";
import axios from "axios";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './stylesheet.css'
import PropTypes from 'prop-types';
import DefaultProjectCard1 from "layouts/dispachers/components/profile/components/DefaultProjectCard1";
import Tooltip from '@mui/material/Tooltip';
import MDButton from "components/MDButton";
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import MDSnackbar from "components/MDSnackbar";
import MDBadge from "components/MDBadge";
import MaterialTable from 'material-table';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function Profile({ idProfile }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const [userEmail, setUserEmail] = useState('');
  const [CompanyName, setCompanyName] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [status, setstatus] = useState('');
  const [DispacherDriver, setDispacherDriver] = useState([]);
  const [DispacherDriverOrders, setDispacherDriverOrders] = useState([]);

  const [Country, setCountry] = useState('');
  const [createdAt, setcreatedAt] = useState('');
  const [zip_code, setzip_code] = useState('');
  const [phoneNo, setphoneNo] = useState('');
  const [streetAddress, setstreetAddress] = useState('');
  const [account_holder_name, setaccount_holder_name] = useState('');
  const [account_number, setaccount_number] = useState('');
  const [bank_name, setbank_name] = useState('');
  const [expiry_date, setexpiry_date] = useState('');
  const [iban, setiban] = useState('');
  const [swift_code, setswift_code] = useState('');

  const getAllData = () => {
    axios.get(`${url}api/dispacher/specificDispacher/${idProfile}`)
      .then((response) => {
        console.log('Data User Picddddd')
        console.log(response)
        if (response.data[0].img === undefined) {
          console.log('empty image')
        } else {
          console.log(response.data[0].profileImage)
        }
        setUserEmail(response.data[0].email)
        setCompanyName(response.data[0].name_of_company)
        setcity(response.data[0].city)
        setCountry(response.data[0].country)
        setstate(response.data[0].state)
        setstatus(response.data[0].status)
        setcreatedAt(response.data[0].created_at)
        setphoneNo(response.data[0].phoneno)
        setstreetAddress(response.data[0].street_address)
        setzip_code(response.data[0].zip_code)
        if (response.data[0].payment_detail_id === undefined) {
          console.log('no payment detail')
        } else {
          setaccount_holder_name(response.data[0].payment_detail_id.account_holder_name)
          setaccount_number(response.data[0].payment_detail_id.account_number)
          setbank_name(response.data[0].payment_detail_id.bank_name)
          setexpiry_date(response.data[0].payment_detail_id.expiry_date)
          setiban(response.data[0].payment_detail_id.iban)
          setswift_code(response.data[0].payment_detail_id.swift_code)

        }
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const getAllDataPosts = () => {
    axios.get(`${url}api/driver/getDispacherDriver/${idProfile}`)
      .then((response) => {
        console.log('Data Drivers Dispachers')
        console.log(response.data)
        setDispacherDriver(response.data)
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const getAllDataOrders = () => {
    axios.get(`${url}api/Order/dispacherOrders/${idProfile}`)
      .then((response) => {
        console.log('Data Drivers Orders')
        console.log(response.data)
        setDispacherDriverOrders(response.data)
      })
      .catch(error => console.error(`Error:${error}`));
  }
  useEffect(() => {
    getAllData();
    getAllDataPosts();
    getAllDataOrders();
    console.log("props.idProfile")
    console.log(idProfile)

  }, []);
  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }
    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);
  const headers = {
    'Content-Type': 'application/json'
  }
  const navigate = useNavigate();
  const [productId, setProductId] = useState('');

  const [successDelete, setSuccessDelete] = useState(false);
  const closeSuccessDelete = () => setSuccessDelete(false);
  const renderSuccessDelete = (
    <MDSnackbar
      icon="notifications"
      title="Order Deleted Successfully"
      content="This is a notification message"
      open={successDelete}
      onClose={closeSuccessDelete}
      close={closeSuccessDelete}
      color="success"
      bgWhite
    />
  );
  const EditData = (idData) => {
    console.log(idData)
    navigate('/ordersProfile',
      {
        state: {
          idDispacher: idData,
        }
      }
    );

  }
  // Delete 
  const [visibleDelete, setVisibleDelete] = useState(false)
  const deleteData = (idData) => {
    setVisibleDelete(true)
    setProductId(idData)
  }
  // Delete 
  const deleteDataProduct = () => {
    // setLoadingLoader(true)
    // setTimeout(() => {
    axios.delete(`${url}api/Order/deleteOrder/${productId}`
      , { headers })
      .then(res => {

        console.log(res.data);
        if (res.data.acknowledged === true) {
          setVisibleDelete(false)
          setSuccessDelete(true)
          getAllData();
          // setLoadingLoader(false)
        } else {

        }

      }).catch(err => {
        console.log(err)
      })
    // }, 3000)

  }
  return (
    <>
      <MDBox mb={2} />
      <Header idProfileUser={idProfile}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} sx={{ ml: "auto" }}>
              <AppBar position="static">
                <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                  <Tab
                    label="Profile"
                    icon={
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        account_box_icon
                      </Icon>
                    }
                  />
                  <Tab
                    label="Drivers"
                    icon={
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        drive_eta_icon
                      </Icon>
                    }
                  />
                  <Tab
                    label="Orders"
                    icon={
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        reorder_icon
                      </Icon>
                    }
                  />
                </Tabs>
              </AppBar>
              <TabPanel value={tabValue} index={0}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={4} sx={{ display: "flex" }}>
                    <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                    <ProfileInfoCard
                      title="profile information"
                      info={{
                        Name: CompanyName,
                        email: userEmail,
                        phoneNo: phoneNo,
                        city: city,
                        state: state,
                        zipCode: zip_code,
                        country: Country,
                        createdAt: createdAt,
                        status: status,
                        Address: streetAddress,

                      }}
                      social={[
                        {
                          link: "https://www.facebook.com/CreativeTim/",
                          icon: <FacebookIcon />,
                          color: "facebook",
                        },
                        {
                          link: "https://twitter.com/creativetim",
                          icon: <TwitterIcon />,
                          color: "twitter",
                        },
                        {
                          link: "https://www.instagram.com/creativetimofficial/",
                          icon: <InstagramIcon />,
                          color: "instagram",
                        },
                      ]}
                      action={{ route: "", tooltip: "Edit Profile" }}
                      shadow={false}
                    />
                    <Divider orientation="vertical" sx={{ mx: 0 }} />
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ display: "flex" }}>
                    <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                    <ProfileInfoCard
                      title="Payment Details"
                      info={{
                        bankName: bank_name,
                        accountHolderName: account_holder_name,
                        accountNumber: account_number,
                        iban: iban,
                        swiftCode: swift_code,
                        expiryDate: expiry_date,
                      }}
                      social={[
                        {
                          link: "https://www.facebook.com/CreativeTim/",
                          icon: <FacebookIcon />,
                          color: "facebook",
                        },
                        {
                          link: "https://twitter.com/creativetim",
                          icon: <TwitterIcon />,
                          color: "twitter",
                        },
                        {
                          link: "https://www.instagram.com/creativetimofficial/",
                          icon: <InstagramIcon />,
                          color: "instagram",
                        },
                      ]}
                      action={{ route: "", tooltip: "Edit Profile" }}
                      shadow={false}
                    />
                    <Divider orientation="vertical" sx={{ mx: 0 }} />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <ProfilesList title="Drivers" idProfileUser={idProfile}
                      shadow={true} />
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Grid container spacing={6}>
                  {DispacherDriver.map((row) => (
                    <Grid item xs={12} md={6} xl={4}>
                      <DefaultProjectCard1
                        image={`${url}${row.img}`}
                        label={row.name}
                        status={row.status}
                        id={row._id}
                      />
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
              <MDBox >
                <MDBox pt={3}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableRow>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }}>Pickup Location</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">dropoff location</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">flight Date</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">flight Time</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Status</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Actions</TableCell>

                      </TableRow>
                      <TableBody>
                        {DispacherDriverOrders.map((row) => (
                          <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >

                            <TableCell style={{ fontSize: '14px' }}>
                              <>
                                {row.pickup_location === undefined ? <span>Null</span> : <span>{row.pickup_location.slice(0, 10)}.....</span>}
                              </>
                            </TableCell>

                            <TableCell align="right" style={{ fontSize: '14px' }}>
                              <>
                                {row.dropoff_location === undefined ? <span>Null</span> : <span>{row.dropoff_location.slice(0, 10)}.....</span>}
                              </>
                            </TableCell>
                            <TableCell align="right" style={{ fontSize: '14px' }}>
                              <>
                                {row.flight_date === undefined ? <span>Null</span> : <span>{row.flight_date}</span>}
                              </>
                            </TableCell>
                            <TableCell align="right" style={{ fontSize: '14px' }}>
                              <>
                                {row.flight_time === undefined ? <span>Null</span> : <span>{row.flight_time}</span>}
                              </>
                            </TableCell>
                            <TableCell align="right" style={{ fontSize: '14px' }}>
                              <div>
                                {row.status === 'ongoing' ?
                                  <Grid container spacing={2}>
                                    <Grid item xs={12} md={1}>
                                      <Icon fontSize="small" color="primary">loop_icon</Icon>

                                    </Grid>
                                    <Grid item xs={12} md={10}>
                                      <MDBadge badgeContent="Ongoing" color="primary" variant="gradient" size="sm" />

                                    </Grid>
                                  </Grid>
                                  :
                                  null
                                }
                                {row.status === 'cancel' ?
                                  <Grid container spacing={2}>
                                    <Grid item xs={12} md={1}>
                                      <Icon fontSize="small" color="error">cancel_icon</Icon>

                                    </Grid>
                                    <Grid item xs={12} md={10}>
                                      <MDBadge badgeContent="Canceled" color="error" variant="gradient" size="sm" />

                                    </Grid>
                                  </Grid>
                                  :
                                  null
                                }
                                {row.status === 'schedule' ?
                                  <Grid container spacing={2}>
                                    <Grid item xs={12} md={1}>
                                      <Icon fontSize="small" color="warning">schedule_icon</Icon>

                                    </Grid>
                                    <Grid item xs={12} md={10}>
                                      <MDBadge badgeContent="Scheduled" color="warning" variant="gradient" size="sm" />

                                    </Grid>
                                  </Grid>
                                  :
                                  null
                                }
                                {row.status === 'completed' ?
                                  <Grid container spacing={2}>
                                    <Grid item xs={12} md={1}>
                                      <Icon fontSize="small" color="success">check_circle_outline_icon</Icon>

                                    </Grid>
                                    <Grid item xs={12} md={10}>
                                      <MDBadge badgeContent="Completed" color="success" variant="gradient" size="sm" />

                                    </Grid>
                                  </Grid>
                                  :
                                  null
                                }

                              </div>
                            </TableCell>

                            <TableCell align="right" style={{ fontSize: '14px' }}>
                              <>
                                <Tooltip title="View">

                                  <Icon fontSize="small" style={{ cursor: 'pointer', color: 'grey', marginRight: '5px' }} onClick={() => {
                                    EditData(row._id)
                                  }}>visibility_icon</Icon>
                                </Tooltip>


                              </>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                </MDBox>
                  <div>
                    <Modal
                      open={visibleDelete}
                      onClose={() => setVisibleDelete(false)}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Grid container spacing={2} align="center">
                          <Grid item xs={12} md={12}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                              Are you sure you want to delete<br /> this Order?
                            </Typography>
                          </Grid>
                          <Grid item xs={6} md={6}>
                            {/* <Button autoFocus onClick={deleteDataProduct} style={{ background: 'linear-gradient(195deg, #5fb663, #3ccf42)', color: 'white', borderRadius: '10px' }}>
                                                                Yes
                                                            </Button> */}
                            <MDButton variant="gradient" color="error" size="small" onClick={deleteDataProduct} style={{ background: '#564cb9', color: 'white', borderRadius: '10px' }}>
                              Yes
                            </MDButton>
                          </Grid>
                          <Grid item xs={6} md={6}>
                            <Button autoFocus style={{ border: '1px solid #564cb9', color: '#564cb9', borderRadius: '10px' }} onClick={() => setVisibleDelete(false)}>
                              No
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Modal>
                  </div>
                  <div>
                    {renderSuccessDelete}
                  </div>
                </MDBox>
              </TabPanel>


            </Grid>

            {/* <Grid item xs={12} md={8} mt={1}>
              <PlatformUserMatches idProfileUser={idProfile} />
            </Grid> */}
            {/* <Grid item xs={12} md={6} >
              <PlatformUserSwipes idProfileUser={idProfile} />
            </Grid> */}
            {/* <Grid item xs={12} md={6} >
              <PlatformUserSwipesLeft idProfileUser={idProfile} />
            </Grid> */}
          </Grid>
        </MDBox>
        {/* <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Posts
          </MDTypography>

        </MDBox> */}
        {/* <MDBox p={2}>
          <PlatformSettings idProfileUser={idProfile} />

        </MDBox> */}
      </Header>
    </>
  );
}

export default Profile;
