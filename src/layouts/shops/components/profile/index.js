import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import MDBox from "components/MDBox";
import breakpoints from "assets/theme/base/breakpoints";
import url from "url/url";
import axios from "axios";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './stylesheet.css'
import PropTypes from 'prop-types';
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import homeDecor2 from "assets/images/Cashiers.png";
import homeDecor3 from "assets/images/Inventories.png";
import homeDecor4 from "assets/images/products.png";
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

function Profile({ idProfile }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [ShopName, setShopName] = useState('');
  const [CreatedAtShop, setCreatedAtShop] = useState('');
  const [TycoonNAme, setTycoonNAme] = useState('');
  const [ManagerName, setManagerName] = useState('');
  const [DispacherDriver, setDispacherDriver] = useState([]);
  const [DispacherDriverOrders, setDispacherDriverOrders] = useState([]);
  const [TycoonEmail, setTycoonEmail] = useState('');
  const [ManagerEmail, setManagerEmail] = useState('');
  const [ShopImage, setShopImage] = useState('');
  const [LengthProduct, setLengthProducts] = useState('');
  const [LengthCashier, setLengthCashier] = useState('');

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
                  label={` Name: ${row.product_id.name}`}
                  title="shop"
                  description={`Price: ${row.product_id.price}`}
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
                  image={homeDecor2}
                  label={`Name: ${row.cashier_id.name}`}
                  title="Cashier"
                  description={`Phone No: ${row.cashier_id.phone_no}`}
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
                  image={homeDecor3}
                  label={`Equipment Name: ${row.equipment_name}`}
                  title="Inventory"
                  description={`Serial #: ${row.serial_no}`}
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
