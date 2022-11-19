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
import homeDecor4 from "assets/images/abc.png";
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
  const [ShopName, setShopName] = useState('');
  const [CreatedAtShop, setCreatedAtShop] = useState('');

  const [TycoonNAme, setTycoonNAme] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [ManagerName, setManagerName] = useState('');
  const [DispacherDriver, setDispacherDriver] = useState([]);
  const [DispacherDriverOrders, setDispacherDriverOrders] = useState([]);

  const [TycoonEmail, setTycoonEmail] = useState('');
  const [createdAt, setcreatedAt] = useState('');
  const [zip_code, setzip_code] = useState('');
  const [ManagerEmail, setManagerEmail] = useState('');
  const [streetAddress, setstreetAddress] = useState('');
  const [account_holder_name, setaccount_holder_name] = useState('');
  const [account_number, setaccount_number] = useState('');
  const [bank_name, setbank_name] = useState('');
  const [expiry_date, setexpiry_date] = useState('');
  const [iban, setiban] = useState('');
  const [swift_code, setswift_code] = useState('');
  const [ShopImage, setShopImage] = useState('');
  const [LengthProduct, setLengthProducts] = useState('');
  const [LengthCashier, setLengthCashier] = useState('');



  const headers = {
    'Content-Type': 'application/json'
  }
  const getAllData = () => {
    axios.get(`${url}api/shop/get-Shop-by-ID/${idProfile}`)
      .then((response) => {
        console.log('Data SHop SIngle')
        console.log(response.data.data[0])
        if (response.data.data[0].img === undefined) {
          console.log('empty image')
        } else {
          console.log(response.data.data[0].img)
          setShopImage(response.data.data[0].img)
        }
        setShopName(response.data.data[0].name)
        setCreatedAtShop(response.data.data[0].created_at)
        setTycoonNAme(response.data.data[0].tycoon_id.username)
        setTycoonEmail(response.data.data[0].tycoon_id.email)
        setManagerName(response.data.data[0].manager_id.name)
        setManagerEmail(response.data.data[0].manager_id.email)
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const getAllDataPosts = () => {
    axios.get(`${url}api/shopProducts/get-all-shop-products/${idProfile}`)
      .then((response) => {
        console.log('Data Guests Products ')
        console.log(response.data)
        setDispacherDriver(response.data.data)
        setLengthProducts(response.data.data.length)
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const getAllDataOrders = () => {
    axios.get(`${url}api/shopCashiers/get-all-shop-cashiers/${idProfile}`)
      .then((response) => {
        console.log('Data SHOP CASHIErs')
        console.log(response.data)
        setDispacherDriverOrders(response.data.data)
        setLengthCashier(response.data.data.length)
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const [DriverTransaction, setDriverTransaction] = useState([]);

  const getAllDataTransaction = () => {
    axios.get(`${url}api/inventory/get-single-shop-inventorys/${idProfile}`)
      .then((response) => {
        console.log('Data Hotel Transaction')
        console.log(response.data)
        setDriverTransaction(response.data.data)
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
                image={`${url}${ShopImage}`}
                label={ShopName}
                title="Shop Image"
                description={CreatedAtShop}
              />
            </Grid>
            <Grid item xs={12} md={6} >
            {/* <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} /> */}
                    <ProfileInfoCard
                      title="Details"
                      info={{
                        shopName: ShopName,
                        tycoonName: TycoonNAme,
                        tycoonEmail: TycoonEmail,
                        managerName: ManagerName,
                        managerEmail: ManagerEmail,
                        totalProducts: LengthProduct,
                        totalCashiers: LengthCashier,
                      
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
            {DispacherDriver.map((row) => (
                    <>
                      <Grid item xs={12} md={6} xl={3} style={{ cursor: "pointer" }}
                        >
                        <DefaultProjectCard
                          image={homeDecor4}
                          label={row.product_id.name}
                          title="shop"
                          description={row.product_id.price}
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
            {DispacherDriverOrders.map((row) => (
                    <>
                      <Grid item xs={12} md={6} xl={3} style={{ cursor: "pointer" }}
                        >
                        <DefaultProjectCard
                          image="https://www.flaticon.com/free-icon/product-image_1440523"
                          label={row.cashier_id.name}
                          title="Cashier"
                          description={row.cashier_id.phone_no}
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
            {DriverTransaction.map((row) => (
                    <>
                      <Grid item xs={12} md={6} xl={3} style={{ cursor: "pointer" }}
                        >
                        <DefaultProjectCard
                          image="https://www.flaticon.com/free-icon/product-image_1440523"
                          label={row.equipment_name}
                          title="Inventory"
                          description={row.serial_no}
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
        </MDBox>
      {/* </Header> */}
    </>
  );
}

export default Profile;
