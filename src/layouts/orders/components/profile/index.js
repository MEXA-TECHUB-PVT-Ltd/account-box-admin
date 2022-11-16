import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import MDBox from "components/MDBox";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import Header from "layouts/orders/components/profile/components/Header";
import ProfilesList from "examples/Lists/GuestsList";
import MDTypography from "components/MDTypography";

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
import DefaultProjectCard1 from "layouts/orders/components/profile/components/DefaultDoc";
import DefaultProjectCard from "layouts/orders/components/profile/components/DefaultProjectCard";

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


  const getAllData = () => {
    axios.get(`${url}api/Order/specificOrder/${idProfile}`)
      .then((response) => {
        console.log('Data User Order')
        console.log(response)
       
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
    axios.get(`${url}api/Order/dispacherOrders/${idProfile}`)
      .then((response) => {
        console.log('Data Guests Orders')
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
  return (
    <>
      <MDBox mb={2} />
      <Header idProfileUser={idProfile} />
      {/* <Grid container spacing={2} alignItems="center">
        <Grid item md={3} xs={3} style={{backgroundColor:'red'}}>
     
            sfsdjh
        </Grid>
        </Grid> */}
        {/* <MDBox mt={5} mb={3}>
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
                    label="Guests"
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
                      <Grid item xs={12} md={12} style={{marginTop:'-20px'}}  >
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
                              // status={row.status}
                              />
                            </Grid>
                            <Grid item xs={6} md={4} >
                              <DefaultProjectCard1
                                image={`${url}${cnic_front}`}
                                label="Cnic Front"
                              // status={row.status}
                              />
                            </Grid>
                            <Grid item xs={6} md={4} >
                              <DefaultProjectCard1
                                image={`${url}${driving_license_back}`}
                                label="License Back"
                              // status={row.status}
                              />
                            </Grid>
                            <Grid item xs={6} md={4} >
                              <DefaultProjectCard1
                                image={`${url}${driving_license_front}`}
                                label="License front"
                              // status={row.status}
                              />
                            </Grid>
                            <Grid item xs={6} md={4} >
                              <DefaultProjectCard1
                                image={`${url}${vehicle_ownership}`}
                                label="Ownership"
                              // status={row.status}
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
                <Grid container spacing={6}>
                  {DispacherDriver.map((row) => (
                    <Grid item xs={12} md={6} xl={4}>
                     
                     
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                {DispacherDriverOrders.map((row) => (
                  <Grid item xs={12} md={6} xl={4}>
                    <DefaultProjectCard
                      image={`${url}${row.img}`}
                      label={row.name}
                      status={row.status}
                    />
                  </Grid>
                ))}
              </TabPanel>


            </Grid>

           
          </Grid>
        </MDBox> */}
        {/* <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Posts
          </MDTypography>

        </MDBox> */}
        {/* <MDBox p={2}>
          <PlatformSettings idProfileUser={idProfile} />

        </MDBox> */}
      {/* </Header> */}
    </>
  );
}

export default Profile;
