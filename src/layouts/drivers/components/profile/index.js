import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import MDBox from "components/MDBox";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import Header from "layouts/drivers/components/profile/components/Header";
import MDTypography from "components/MDTypography";
import Avatar from '@mui/material/Avatar';
import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
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
import DefaultProjectCard1 from "layouts/drivers/components/profile/components/DefaultDoc";
import Tooltip from '@mui/material/Tooltip';
import MDButton from "components/MDButton";
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import MDSnackbar from "components/MDSnackbar";
import MDBadge from "components/MDBadge";
import MaterialTable from 'material-table';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const styleCs = {
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
  const [Email, setEmail] = useState('');
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

  const [cnic_back, setcnic_back] = useState('');
  const [cnic_front, setcnic_front] = useState('');
  const [cnic_issue_date, setcnic_issue_date] = useState('');
  const [driving_license_back, setdriving_license_back] = useState('');
  const [driving_license_front, setdriving_license_front] = useState('');
  const [vehicle_ownership, setvehicle_ownership] = useState('');

  const [make, setmake] = useState('');
  const [modal, setmodal] = useState('');
  const [plate_no, setplate_no] = useState('');
  const [style, setstyle] = useState('');
  const [year, setyear] = useState('');
  const [car_type_id_name, setcar_type_id_name] = useState('');
  const [car_type_id_price, setcar_type_id_price] = useState('');
  const [condition_id, setcondition_id] = useState('');
  const [ac, setac] = useState('');
  const [colorVehicle, setcolorVehicle] = useState('');

  const [phonenoCompany, setphonenoCompany] = useState('');
  const [emailCompany, setemailCompany] = useState('');
  const [name_of_company, setname_of_company] = useState('');
  const [DriverTransaction, setDriverTransaction] = useState([]);

  const getAllData = () => {
    axios.get(`${url}api/driver/specificDriver/${idProfile}`)
      .then((response) => {
        console.log('Data User Picddddd')
        console.log(response)
        if (response.data[0].img === undefined) {
          console.log('empty image')
        } else {
          console.log(response.data[0].profileImage)
        }
        setEmail(response.data[0].email)
        setCompanyName(response.data[0].name)
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
        if (response.data[0].doc_id.length === 0) {
          console.log('no Documents detail')
        } else {
          setcnic_back(response.data[0].doc_id[0].cnic_back)
          setcnic_front(response.data[0].doc_id[0].cnic_front)
          setcnic_issue_date(response.data[0].doc_id[0].cnic_issue_date)
          setdriving_license_back(response.data[0].doc_id[0].driving_license_back)
          setdriving_license_front(response.data[0].doc_id[0].driving_license_front)
          setvehicle_ownership(response.data[0].doc_id[0].vehicle_ownership)

        }
        if (response.data[0].dispacher_id.length === 0) {
          console.log('no Dispacher detail')
        } else {
          setname_of_company(response.data[0].dispacher_id[0].name_of_company)
          setphonenoCompany(response.data[0].dispacher_id[0].phoneno)
          setemailCompany(response.data[0].dispacher_id[0].email)
        }
        if (response.data[0].vehicle_detail_id.length === 0) {
          console.log('no Vehicle detail')
        } else {
          setmake(response.data[0].vehicle_detail_id[0].make)
          setmodal(response.data[0].vehicle_detail_id[0].modal)
          setplate_no(response.data[0].vehicle_detail_id[0].plate_no)
          setstyle(response.data[0].vehicle_detail_id[0].style)
          setyear(response.data[0].vehicle_detail_id[0].year)
          setcar_type_id_name(response.data[0].vehicle_detail_id[0].car_type_id.name)
          setcar_type_id_price(response.data[0].vehicle_detail_id[0].car_type_id.price)
          setcondition_id(response.data[0].vehicle_detail_id[0].condition_id.name)
          setac(response.data[0].vehicle_detail_id[0].ac)
          setcolorVehicle(response.data[0].vehicle_detail_id[0].color)

        }
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const getAllDataPosts = () => {
    axios.get(`${url}api/Rating/getDriverRating/${idProfile}`)
      .then((response) => {
        console.log('Data Rating Hotel')
        console.log(response.data)
        setDispacherDriver(response.data)
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const getAllDataOrders = () => {
    axios.get(`${url}api/Order/getDriverOrdersAll/${idProfile}`)
      .then((response) => {
        console.log('Data Driver Orders')
        console.log(response.data)
        setDispacherDriverOrders(response.data)
      })
      .catch(error => console.error(`Error:${error}`));
  }

  const getAllDataTransaction = () => {
    axios.get(`${url}api/invoice/getDriverTransactionCompleted/${idProfile}`)
      .then((response) => {
        console.log('Data Driver Transaction')
        console.log(response.data)
        setDriverTransaction(response.data)
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const [successDeleteTransaction, setSuccessDeleteTransaction] = useState(false);
  const closeSuccessDeleteTransaction = () => setSuccessDeleteTransaction(false);
  const renderSuccessDeleteTransaction = (
    <MDSnackbar
      icon="notifications"
      title="Transaction Deleted Successfully"
      content="This is a notification message"
      open={successDeleteTransaction}
      onClose={closeSuccessDeleteTransaction}
      close={closeSuccessDeleteTransaction}
      color="success"
      bgWhite
    />
  );
 
  useEffect(() => {
    getAllData();
    getAllDataPosts();
    getAllDataOrders();
    getAllDataTransaction();
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
  const EditDataTrans = (idData) => {
    console.log(idData)
    navigate('/transactionsProfile',
      {
        state: {
          idDispacher: idData,
        }
      }
    );

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
                    label="Orders"
                    icon={
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        reorder_icon
                      </Icon>
                    }
                  />
                  <Tab
                    label="Transactions"
                    icon={
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        receipt_icon
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
                        Email: Email,
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
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={12}
                      >

                        <ProfileInfoCard
                          title="Dispacher details"
                          info={{
                            CompanyName: name_of_company,
                            phoneno: phonenoCompany,
                            email: emailCompany,
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
                      </Grid>
                      <Grid item xs={12} md={12} style={{ marginTop: '-20px' }}  >
                        <ProfileInfoCard
                          title="Payment details"
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
                      </Grid>
                    </Grid>

                  </Grid>
                  <Grid item xs={12} md={4} sx={{ display: "flex" }}>
                    <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                    <ProfileInfoCard
                      title="Vehicle details"
                      info={{
                        make: make,
                        modal: modal,
                        plateNumber: plate_no,
                        style: style,
                        year: year,
                        carType: car_type_id_name,
                        Price: car_type_id_price,
                        Condition: condition_id,
                        Ac: ac,
                        color: colorVehicle,

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
                  <Grid item xs={12} md={12} sx={{ display: "flex" }}>
                    <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                    <Card sx={{ height: "100%", boxShadow: true }}>
                      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
                        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                          Document Details
                        </MDTypography>

                      </MDBox>
                      <MDBox p={2}>
                        <MDBox>
                          <Grid container spacing={1}>
                            <Grid item xs={6} md={4} >
                              <DefaultProjectCard1
                                image={`${url}${cnic_back}`}
                                label="Cnic Back"
                              />
                            </Grid>
                            <Grid item xs={6} md={4} >
                              <DefaultProjectCard1
                                image={`${url}${cnic_front}`}
                                label="Cnic Front"
                              />
                            </Grid>
                            <Grid item xs={6} md={4} >
                              <DefaultProjectCard1
                                image={`${url}${driving_license_back}`}
                                label="License Back"
                              />
                            </Grid>
                            <Grid item xs={6} md={4} >
                              <DefaultProjectCard1
                                image={`${url}${driving_license_front}`}
                                label="License front"
                              />
                            </Grid>
                            <Grid item xs={6} md={4} >
                              <DefaultProjectCard1
                                image={`${url}${vehicle_ownership}`}
                                label="Ownership"
                              />
                            </Grid>
                          </Grid>
                        </MDBox>
                      </MDBox>
                    </Card>
                    <Divider orientation="vertical" sx={{ mx: 0 }} />
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
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
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                   <MDBox pt={3}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableRow>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }}>Driver</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Hotel</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Pickup Location</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">DropOff Location</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Created At</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Status</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Actions</TableCell>

                      </TableRow>
                      <TableBody>
                        {DriverTransaction.map((row) => (
                          <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >

                            <TableCell style={{ fontSize: '14px' }}>
                              <>
                                <Grid container spacing={2}>
                                  <Grid item xs={12} md={4}>
                                    {row.driver_id === undefined || row.driver_id === null ? <span>Null</span> : <Avatar src={`${url}${row.driver_id.img}`} />}
                                  </Grid>
                                  <Grid item xs={12} md={8} style={{ marginTop: '10px' }}>
                                    {row.driver_id === undefined || row.driver_id === null ? <span>Null</span> : <span>{row.driver_id.email}</span>}
                                  </Grid>
                                </Grid>
                              </>
                            </TableCell>

                            <TableCell align="right" style={{ fontSize: '14px' }}>
                              <>
                                <Grid container spacing={2}>
                                  <Grid item xs={12} md={4}>
                                    {row.hotel_id === undefined || row.hotel_id === null ? <span>Null</span> : <Avatar src={`${url}${row.hotel_id.img}`} />}
                                  </Grid>
                                  <Grid item xs={12} md={8} style={{ marginTop: '10px' }}>
                                    {row.hotel_id === undefined || row.hotel_id === null ? <span>Null</span> : <span>{row.hotel_id.hotel_name}</span>}
                                  </Grid>
                                </Grid>
                              </>
                            </TableCell>
                            <TableCell align="right" style={{ fontSize: '14px' }}>
                              <>
                                {row.order_id === undefined || row.order_id === null ? <span>Null</span> : <span>{row.order_id.pickup_location}</span>}
                              </>
                            </TableCell>
                            <TableCell align="right" style={{ fontSize: '14px' }}>
                              <>
                                {row.order_id === undefined ? <span>Null</span> : <span>{row.order_id.dropoff_location}</span>}
                              </>
                            </TableCell>
                            <TableCell align="right" style={{ fontSize: '14px' }}>
                              <>
                                {row.created_at === undefined ? <span>Null</span> : <span>{row.created_at}</span>}
                              </>
                            </TableCell>
                            <TableCell align="right" style={{ fontSize: '14px' }}>
                              <div>
                                {row.status === 'paid' ?
                                  <MDBadge badgeContent="Paid" color="success" variant="gradient" size="sm" />
                                  :
                                  <MDBadge badgeContent="Unpaid" color="error" variant="gradient" size="sm" />

                                }

                              </div>
                            </TableCell>
                            <TableCell align="right" style={{ fontSize: '14px' }}>
                              <>
                                <Tooltip title="View">

                                  <Icon fontSize="small" style={{ cursor: 'pointer', color: 'grey', marginRight: '5px' }} onClick={() => {
                                    EditDataTrans(row._id)
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
              </TabPanel>
            </Grid>
          </Grid>
        </MDBox>
      </Header>
    </>
  );
}

export default Profile;
