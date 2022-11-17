import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import MDBox from "components/MDBox";
import Avatar from '@mui/material/Avatar';
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import Header from "layouts/tycoons/components/profile/components/Header";
import ProfilesList from "examples/Lists/GuestsList";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tooltip from '@mui/material/Tooltip';
import breakpoints from "assets/theme/base/breakpoints";
import Tab from "@mui/material/Tab";
import { useNavigate } from 'react-router-dom';
import Icon from "@mui/material/Icon";
import url from "url/url";
import axios from "axios";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './stylesheet.css'
import PropTypes from 'prop-types';
import MDBadge from "components/MDBadge";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";


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
  const [HotelType, setHotelType] = useState('');
  const [HotelPrice, setHotelPrice] = useState('');

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
  const headers = {
    'Content-Type': 'application/json'
  }
  const getAllData = () => {
    axios.get(`${url}api/hotel/specificHotel/${idProfile}`)
      .then((response) => {
        console.log('Data User Picddddd')
        console.log(response)
        if (response.data[0].img === undefined) {
          console.log('empty image')
        } else {
          console.log(response.data[0].profileImage)
        }
        setHotelType(response.data[0].hotel_type_id.name)
        setHotelPrice(response.data[0].hotel_type_id.price)
        setCompanyName(response.data[0].hotel_name)
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
    axios.get(`${url}api/hotel/getHotelGuests/${idProfile}`)
      .then((response) => {
        console.log('Data Guests Hotel')
        console.log(response.data)
        setDispacherDriver(response.data)
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const getAllDataOrders = () => {
    axios.get(`${url}api/Order/hotelOrders/${idProfile}`)
      .then((response) => {
        console.log('Data Guests Orders')
        console.log(response.data)
        setDispacherDriverOrders(response.data)
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const [DriverTransaction, setDriverTransaction] = useState([]);

  const getAllDataTransaction = () => {
    axios.get(`${url}api/invoice/getHotelTransactionCompleted/${idProfile}`)
      .then((response) => {
        console.log('Data Hotel Transaction')
        console.log(response.data)
        setDriverTransaction(response.data)
      })
      .catch(error => console.error(`Error:${error}`));
  }
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
  const navigate = useNavigate();
  const [productId, setProductId] = useState('');

  const [successDelete, setSuccessDelete] = useState(false);
  const closeSuccessDelete = () => setSuccessDelete(false);
  const EditData = (idData) => {
    console.log(idData)
    navigate('/shopsProfile',
      {
        state: {
          idDispacher: "idData",
        }
      }
    );

  }
  // Delete 
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
                    label="Shops"
                    icon={
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        store_icon
                      </Icon>
                    }
                  />
                  <Tab
                    label="Managers"
                    icon={
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        person_icon
                      </Icon>
                    }
                  />
                   <Tab
                    label="Cashiers"
                    icon={
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        credit_card_icon
                      </Icon>
                    }
                  />
                  <Tab
                    label="Debts"
                    icon={
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        credit_score_icon
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
                        // Name: CompanyName,
                        // HotelType: HotelType,
                        // HotelPrice: HotelPrice,
                        // phoneNo: phoneNo,
                        // city: city,
                        // state: state,
                        // zipCode: zip_code,
                        // country: Country,
                        // createdAt: createdAt,
                        // status: status,
                        // Address: streetAddress,
                        Username: "Tycoon",
                        Email: "tycoon@gmail.com",
                        noOfShopsCreated: "3",
                        createdAt: "27/10/2022",
                       

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
                      title="Subscription Details"
                      info={{
                        // bankName: bank_name,
                        // accountHolderName: account_holder_name,
                        // accountNumber: account_number,
                        // iban: iban,
                        // swiftCode: swift_code,
                        // expiryDate: expiry_date,
                        name: "Monthly",
                        noOfShops: "10",
                        pricePerMonth: "20$",
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
                    <ProfilesList title="Shops" idProfileUser={idProfile}
                      shadow={true} />
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                {/* <Grid container spacing={6}>
                  {DispacherDriver.map((row) => (
                    <Grid item xs={12} md={6} xl={4}>
                      <DefaultProjectCard
                        image={`${url}${row.img}`}
                        label={row.name}
                        status={row.status}
                        id={row._id}
                      />
                    </Grid>
                  ))}
                </Grid> */}
                <Grid container spacing={6}>
            <Grid item xs={12} md={6} xl={3} style={{cursor:"pointer"}}
              onClick={() => {
                EditData("row._id")
            }}>
              <DefaultProjectCard 
              
                image={homeDecor1}
                label="Shop Name"
                title="modern"
                description="18/11/2022"
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                // authors={[
                //   { image: team1, name: "Elena Morison" },
                //   { image: team2, name: "Ryan Milly" },
                //   { image: team3, name: "Nick Daniel" },
                //   { image: team4, name: "Peterson" },
                // ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
                image={homeDecor2}
                label="Shop Name"
                title="modern"
                description="18/11/2022"
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                // authors={[
                //   { image: team1, name: "Elena Morison" },
                //   { image: team2, name: "Ryan Milly" },
                //   { image: team3, name: "Nick Daniel" },
                //   { image: team4, name: "Peterson" },
                // ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
                image={homeDecor3}
                label="Shop Name"
                title="modern"
                description="18/11/2022"
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                // authors={[
                //   { image: team1, name: "Elena Morison" },
                //   { image: team2, name: "Ryan Milly" },
                //   { image: team3, name: "Nick Daniel" },
                //   { image: team4, name: "Peterson" },
                // ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
                image={homeDecor4}
                label="Shop Name"
                title="modern"
                description="18/11/2022"
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                // authors={[
                //   { image: team1, name: "Elena Morison" },
                //   { image: team2, name: "Ryan Milly" },
                //   { image: team3, name: "Nick Daniel" },
                //   { image: team4, name: "Peterson" },
                // ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
                image={homeDecor4}
                label="Shop Name"
                title="modern"
                description="18/11/2022"
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                // authors={[
                //   { image: team1, name: "Elena Morison" },
                //   { image: team2, name: "Ryan Milly" },
                //   { image: team3, name: "Nick Daniel" },
                //   { image: team4, name: "Peterson" },
                // ]}
              />
            </Grid>
          </Grid>
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <MDBox pt={3}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableRow>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }}>Name</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Email</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Shop Name</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center"> Created_at</TableCell>
                        {/* <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Status</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Actions</TableCell> */}

                      </TableRow>
                      <TableBody>
                      <TableRow>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }}>Pickup Location</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">dropoff location</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">flight Date</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">flight Time</TableCell>
                        {/* <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Status</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Actions</TableCell> */}

                      </TableRow>
                      </TableBody>

                      {/* <TableBody>
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
                      </TableBody> */}
                    </Table>
                  </TableContainer>

                </MDBox>
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
                <MDBox pt={3}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableRow>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }}>Shop Name</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Manager Name</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Manager Email</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Debt Name</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Amount</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Created At</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Threshold Date</TableCell>

                      </TableRow>
                      <TableBody>
                      <TableRow>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }}>Mtechub</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Mtechub</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Mtechub@gmail.com</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Loan</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">12</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">27/10/2022</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">27/11/2022</TableCell>

                      </TableRow>
                      </TableBody>
                      {/* <TableBody>
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
                      </TableBody> */}
                    </Table>
                  </TableContainer>

                </MDBox>


              </TabPanel>
              <TabPanel value={tabValue} index={4}>
                <MDBox pt={3}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableRow>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }}>Shop Name</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Manager Name</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Manager Email</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Debt Name</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Amount</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Created At</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Threshold Date</TableCell>

                      </TableRow>
                      <TableBody>
                      <TableRow>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }}>Mtechub</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Mtechub</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Mtechub@gmail.com</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">Loan</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">12</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">27/10/2022</TableCell>
                        <TableCell style={{ fontWeight: 700, opacity: 0.7, color: 'rgba(0, 0, 0, 0.87)', fontSize: '14px' }} align="center">27/11/2022</TableCell>

                      </TableRow>
                      </TableBody>
                      {/* <TableBody>
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
                      </TableBody> */}
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
