import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import MDBox from "components/MDBox";
import Avatar from '@mui/material/Avatar';
import Header from "layouts/shops/components/profile/components/Header";
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
// import DefaultProjectCard from "layouts/shops/components/profile/components/DefaultProjectCard";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
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
import MDTypography from "components/MDTypography";


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
    navigate('/ordersProfile',
      {
        state: {
          idDispacher: idData,
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
      {/* <Header idProfileUser={idProfile}> */}
        <MDBox mt={5} mb={3}>
        <Grid container spacing={6}>
            <Grid item xs={12} md={6} >
              <DefaultProjectCard
                image={homeDecor1}
                label="Shop Name"
                // title="modern"
                description="18/11/2022"
                // action={{
                //   type: "internal",
                //   route: "/pages/profile/profile-overview",
                //   color: "info",
                //   label: "view project",
                // }}
                // authors={[
                //   { image: team1, name: "Elena Morison" },
                //   { image: team2, name: "Ryan Milly" },
                //   { image: team3, name: "Nick Daniel" },
                //   { image: team4, name: "Peterson" },
                // ]}
              />
            </Grid>
            <Grid item xs={12} md={6} >
            {/* <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} /> */}
                    <ProfileInfoCard
                      title="Details"
                      info={{
                        shopName: "shop Name",
                        TycoonName: "Tycoon",
                        tycoonEmail: "tycoon@gmail.com",
                        managerName: "Manager",
                        managerEmail: "manager@gmail.com",
                        totalProducts: "10",
                        totalCashiers: "10",
                        // name: "Monthly",
                        // noOfShops: "10",
                        // pricePerMonth: "20$",
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
                    {/* <Divider orientation="vertical" sx={{ mx: 0 }} /> */}
            </Grid>
            <Grid item xs={12} md={12}>
            <MDBox
                                            // mx={2}
                                            mt={-3}
                                            py={3}
                                            px={2}
                                            variant="gradient"
                                            bgColor="error"
                                            borderRadius="lg"
                                            coloredShadow="error"
                                        >

                                            <MDTypography variant="h6" fontWeight="medium" color="white">
                                                All Products
                                            </MDTypography>
                                        </MDBox>
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
                image={homeDecor3}
                label="Product Name"
                title="modern"
                description="Price"
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
                label="Product Name"
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
                image={homeDecor1}
                label="Product Name"
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
                label="Product Name"
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
            <Grid item xs={12} md={12}>
            <MDBox
                                            // mx={2}
                                            mt={-3}
                                            py={3}
                                            px={2}
                                            variant="gradient"
                                            bgColor="error"
                                            borderRadius="lg"
                                            coloredShadow="error"
                                        >

                                            <MDTypography variant="h6" fontWeight="medium" color="white">
                                                All Cashiers
                                            </MDTypography>
                                        </MDBox>
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
                image={homeDecor3}
                label="Cashier name"
                title="modern"
                description="Phone No"
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
                label="Cashier Name"
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
                label="Cashier Name"
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
                image={homeDecor1}
                label="Cashier Name"
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
            <Grid item xs={12} md={12}>
            <MDBox
                                            // mx={2}
                                            mt={-3}
                                            py={3}
                                            px={2}
                                            variant="gradient"
                                            bgColor="error"
                                            borderRadius="lg"
                                            coloredShadow="error"
                                        >

                                            <MDTypography variant="h6" fontWeight="medium" color="white">
                                                All Inventory
                                            </MDTypography>
                                        </MDBox>
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
                image={homeDecor3}
                label="Serial No:2349"
                title="modern"
                description="Equipment Name"
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
                label="Serial No:2349"
                title="modern"
                description="Equipment Name"
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
                label="Serial No:2349"
                title="modern"
                description="Equipment Name"
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
                image={homeDecor1}
                label="Serial No:2349"
                title="modern"
                description="Equipment Name"
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
        </MDBox>
      {/* </Header> */}
    </>
  );
}

export default Profile;
