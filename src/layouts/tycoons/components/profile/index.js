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
  const [UserName, setUserName] = useState('');
  const [EmailTycoon, setEmailTycoon] = useState('');

  const [TotalShops, setTotalShops] = useState('');
  const [SubscriptionName, setSubscriptionName] = useState('');
  const [PricePerMonth, setPricePerMonth] = useState('');
  const [status, setstatus] = useState('');
  const [DispacherDriver, setDispacherDriver] = useState([]);
  const [DispacherDriverOrders, setDispacherDriverOrders] = useState([]);

  const [noOfShops, setnoOfShops] = useState('');
  const [createdAt, setcreatedAt] = useState('');
  const [zip_code, setzip_code] = useState('');
  const [phoneNo, setphoneNo] = useState('');
  const [streetAddress, setstreetAddress] = useState('');
  const [account_holder_name, setaccount_holder_name] = useState('');
  const [account_number, setaccount_number] = useState('');
  const [bank_name, setbank_name] = useState('');
  const [expiry_date, setexpiry_date] = useState('');
  const [iban, setiban] = useState('');
  const [start_date, setstart_date] = useState('');
  const headers = {
    'Content-Type': 'application/json'
  }
  const getAllDataSubscription = () => {
    axios.get(`${url}api/subscription_history/get-subscription-history-by-TycoonId/${idProfile}`)
      .then((response) => {
        console.log('Data User Picdddddsaasdd')
        console.log(response.data.data[0])
        setSubscriptionName(response.data.data[0].subscription_plans_id.name)
        setnoOfShops(response.data.data[0].subscription_plans_id.no_of_shops)
        setPricePerMonth(response.data.data[0].subscription_plans_id.price_per_month)
        setexpiry_date(response.data.data[0].end_date)
        setstart_date(response.data.data[0].start_date)
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const getAllData = () => {
    axios.get(`${url}api/tycoon/get-tycoon-by-ID/${idProfile}`)
      .then((response) => {
        console.log('Data User Picddddd')
        console.log(response)
        if (response.data.data[0].img === undefined) {
          console.log('empty image')
        } else {
          console.log(response.data.data[0].profileImage)
        }
        setUserName(response.data.data[0].username)
        setEmailTycoon(response.data.data[0].email)
        setTotalShops(response.data.data[0].no_of_shops_created)
        setcreatedAt(response.data.data[0].created_at)
        setstatus(response.data.data[0].status)
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const getAllDataPosts = () => {
    axios.get(`${url}api/shop/get-all-tycoon-shops/${idProfile}`)
      .then((response) => {
        console.log('Data Guests Hotel')
        console.log(response.data)
        if(response.data.data.length===0){
          const users= [
            {
              "created_at" : "00/00/00",
              "img": "uploads\\\\1668840773857.jpg",
               "name":"Shop Name Here"
            }
        ]
          setDispacherDriver(users)
        }else{
          setDispacherDriver(response.data.data)

        }
       
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
    getAllDataSubscription();
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
                  {/* <Tab
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
                  /> */}
                </Tabs>
              </AppBar>
              <TabPanel value={tabValue} index={0}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={4} sx={{ display: "flex" }}>
                    <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                    <ProfileInfoCard
                      title="profile information"
                      info={{
                        UserName: UserName,
                        EmailTycoon: EmailTycoon,
                        TotalShops: TotalShops,
                        status: status,
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
                      title="Subscription Details"
                      info={{
                        SubscriptionName: SubscriptionName,
                        startDate: start_date,
                        expiryDate: expiry_date,
                        noOfShops: noOfShops,
                        pricePerMonth: PricePerMonth,
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
                  {/* Shops  */}
                  {DispacherDriver.map((row) => (
                    <>
                      <Grid item xs={12} md={6} xl={3} style={{ cursor: "pointer" }}
                        onClick={() => {
                          EditData(row._id)
                        }}>
                        <DefaultProjectCard
                          image={`${url}${row.img}`}
                          label={`Name: ${row.name}`}
                          title="shop"
                          description={`created at: ${row.created_at}`}
                          action={{
                            type: "internal",
                            route: "/pages/profile/profile-overview",
                            color: "info",
                            label: "view project",
                          }}
                        />
                      </Grid>
                    </>
                  ))}

                </Grid>
              </TabPanel>
             


            </Grid>
          </Grid>
        </MDBox>
      </Header>
    </>
  );
}

export default Profile;
