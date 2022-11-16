import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import MDBox from "components/MDBox";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import Header from "layouts/transactions/components/profile/components/Header";
import breakpoints from "assets/theme/base/breakpoints";
import { useNavigate } from 'react-router-dom';
import url from "url/url";
import axios from "axios";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './stylesheet.css'
import PropTypes from 'prop-types';
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
  const [pickupLoc, setpickupLoc] = useState('');
  const [dropoffLoc, setdropoffLoc] = useState('');

  const [estimated_amount, setestimated_amount] = useState('');
  const [flight_date, setflight_date] = useState('');
  const [state, setstate] = useState('');
  const [status, setstatus] = useState('');
  const [DispacherDriver, setDispacherDriver] = useState([]);
  const [DispacherDriverOrders, setDispacherDriverOrders] = useState([]);

  const [flight_time, setflight_time] = useState('');
  const [createdAt, setcreatedAt] = useState('');
  const [zip_code, setzip_code] = useState('');
  const [phoneNo, setphoneNo] = useState('');
  const [hotel_name, sethotel_name] = useState('');
  const [phoneNohotel, setphoneNohotel] = useState('');
  const [countryHotel, setcountryHotel] = useState('');
  const [cityHotel, setcityHotel] = useState('');
  const [zipCode, setzipCode] = useState('');
  const [streetAddress, setstreetAddress] = useState('');

  const [DriverName, setDriverName] = useState('');
  const [DriverPhone, setDriverPhone] = useState('');
  const [DriverEmail, setDriverEmail] = useState('');
  const [DriverGender, setDriverGender] = useState('');
  const [DriverLocation, setDriverLocation] = useState('');


  const headers = {
    'Content-Type': 'application/json'
  }
  const getAllData = () => {
    axios.get(`${url}api/invoice/specificInvoice/${idProfile}`)
      .then((response) => {
        console.log('Data User Invoice')
        console.log(response)
       
        setpickupLoc(response.data[0].order_id.pickup_location)
        setdropoffLoc(response.data[0].order_id.dropoff_location)
        setestimated_amount(response.data[0].order_id.estimated_amount)

        setflight_date(response.data[0].order_id.flight_date)
        setflight_time(response.data[0].order_id.flight_time)
        setstatus(response.data[0].status)
        setcreatedAt(response.data[0].created_at)
        if (response.data[0].hotel_id === undefined) {
          console.log('no payment detail')
        } else {
          sethotel_name(response.data[0].hotel_id.hotel_name)
          setphoneNohotel(response.data[0].hotel_id.phoneno)
          setcountryHotel(response.data[0].hotel_id.country)
          setcityHotel(response.data[0].hotel_id.city)
          setzipCode(response.data[0].hotel_id.zip_code)
          setstreetAddress(response.data[0].hotel_id.street_address)

        }
        if (response.data[0].driver_id === undefined) {
          console.log('no Driver detail')
        } else {
          setDriverName(response.data[0].driver_id.name)
          setDriverPhone(response.data[0].driver_id.phoneno)
          setDriverEmail(response.data[0].driver_id.email)
          setDriverGender(response.data[0].driver_id.gender)
          setDriverLocation(response.data[0].driver_id.driver_location)

        }
      })
      .catch(error => console.error(`Error:${error}`));
  }
  useEffect(() => {
    getAllData();
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
  // Delete 
  return (
    <>
      <MDBox mb={2} />
      <Header idProfileUser={idProfile}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} sx={{ ml: "auto" }}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={4} sx={{ display: "flex" }}>
                    <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                    <ProfileInfoCard
                      title="Order Information"
                      info={{
                        pickupLoc: pickupLoc,
                        dropoffLoc: dropoffLoc,
                        estimatedAmount: estimated_amount,
                        flight_date: flight_date,
                        status: status,
                        flight_time: flight_time,
                        createdAt: createdAt,

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
                      title="Hotel Details"
                      info={{
                        HotelName: hotel_name,
                        phoneNo: phoneNohotel,
                        zipCode: zipCode,
                        streetAddress: streetAddress,
                        City: cityHotel,
                        Country: countryHotel,

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
                    <ProfileInfoCard
                      title="Driver Details"
                      info={{
                        Name: DriverName,
                        phoneNo: DriverPhone,
                        email: DriverEmail,
                        gender: DriverGender,
                        driverLocation: DriverLocation,
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
                </Grid>
            </Grid>
          </Grid>
        </MDBox>
      </Header>
    </>
  );
}

export default Profile;
