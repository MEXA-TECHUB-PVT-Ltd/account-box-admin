import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import MDBox from "components/MDBox";
import Avatar from '@mui/material/Avatar';
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import Header from "layouts/subscriptions/components/profile/components/Header";
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
import DefaultProjectCard from "layouts/subscriptions/components/profile/components/DefaultProjectCard";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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
  const [TycoonName, setTycoonName] = useState('');
  const [TycoonEmail, setTycoonEmail] = useState('');
  const [TycoonCreated, setTycoonCreated] = useState('');
  const [TycoonShopS, setTycoonShopS] = useState('');
  const [PricePerMonth, setPricePerMonth] = useState('');
  const [SubscriptionPlanName, setSubscriptionPlanName] = useState('');
  const [NoofShops, setNoofShops] = useState('');
  const [startDate, setstartDate] = useState('');
  const [EndDate, setEndDate] = useState('');
  const getAllData = () => {
    axios.get(`${url}api/subscription_history/get-subscription-history-by-ID/${idProfile}`)
      .then((response) => {
        console.log('Data User Subscription History')
        console.log(response)
      
        setTycoonName(response.data.data[0].tycoon_id.username)
        setTycoonEmail(response.data.data[0].tycoon_id.email)
        setTycoonShopS(response.data.data[0].tycoon_id.no_of_shops_created)
        setTycoonCreated(response.data.data[0].tycoon_id.created_at)
        setSubscriptionPlanName(response.data.data[0].subscription_plans_id.name)
        setNoofShops(response.data.data[0].subscription_plans_id.no_of_shops)
        setPricePerMonth(response.data.data[0].subscription_plans_id.price_per_month)
          setstartDate(response.data.data[0].start_date)
          setEndDate(response.data.data[0].end_date)

        // }
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
      <Header idProfileUser={idProfile}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} sx={{ ml: "auto" }}>
              {/* <AppBar position="static">
                <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                  <Tab
                    label="Details"
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
              </AppBar> */}
              {/* <TabPanel value={tabValue} index={0}> */}
                <Grid container spacing={1}>
                  <Grid item xs={12} md={4} sx={{ display: "flex" }}>
                    <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                    <ProfileInfoCard
                      title="profile information"
                      info={{
                        Username: TycoonName,
                        Email: TycoonEmail,
                        noOfShopsCreated: TycoonShopS,
                        createdAt: TycoonCreated,
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
                        name: SubscriptionPlanName,
                        noOfShops: NoofShops,
                        pricePerMonth: PricePerMonth,
                        EndDate: EndDate,
                        startDate: startDate,
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
              {/* </TabPanel> */}
          


            </Grid>
          </Grid>
        </MDBox>
      </Header>
    </>
  );
}

export default Profile;
