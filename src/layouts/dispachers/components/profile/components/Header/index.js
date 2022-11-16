import React,{ useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import url from "url/url";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import breakpoints from "assets/theme/base/breakpoints";
import backgroundImage from "assets/images/bg-profile.jpeg";
// Images
function Header({ children, idProfileUser }) {
  const [tabValue, setTabValue] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [imageUser, setImageUser] = useState('');
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const getAllData = () => {
    axios.get(`${url}api/dispacher/specificDispacher/${idProfileUser}`)
      .then((response) => {
        console.log('Data User Header')
        console.log(response.data[0])
        setUserEmail(response.data[0].email)
        setUserName(response.data[0].name_of_company)
        if (response.data[0].profileImage === undefined) {
          setImageUser(backgroundImage)
        } else {
          const urlImage = response.data[0].img
          console.log(urlImage)
          setImageUser(urlImage)
        }

      })
      .catch(error => console.error(`Error:${error}`));
  }

  useEffect(() => {
    getAllData();
    console.log("props.idProfile")
    console.log(idProfileUser)
  }, []);
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");

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
    <Card
      sx={{
        position: "relative",
        mt: 3,
        mx: 3,
        py: 2,
        px: 2,
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <MDAvatar
            src={`${url}${imageUser}`}
            alt="profile-image" size="xl" shadow="sm" />
        </Grid>
        <Grid item>
          <MDBox height="100%" mt={0.5} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              {userName}
            </MDTypography>
            <MDTypography variant="button" color="text" fontWeight="regular">
              {userEmail}
            </MDTypography>
          </MDBox>
        </Grid>

      </Grid>
      {children}
    </Card>
    // <Card
    // sx={{
    //       position: "relative",
    //       mt: 3,
    //       mx: 3,
    //       py: 2,
    //       px: 2,
    //   }}
    // >
    //   <Grid container spacing={3} alignItems="center">
    //     <Grid item>
    //       <MDAvatar src={burceMars} alt="profile-image" size="xl" shadow="sm" />
    //     </Grid>
    //     <Grid item>
    //       <MDBox height="100%" mt={0.5} lineHeight={1}>
    //         <MDTypography variant="h5" fontWeight="medium">
    //           Richard Davis
    //         </MDTypography>
    //         <MDTypography variant="button" color="text" fontWeight="regular">
    //           CEO / Co-Founder
    //         </MDTypography>
    //       </MDBox>
    //     </Grid>
    //     {/* <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
    //       <AppBar position="static">
    //         <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
    //           <Tab
    //             label="App"
    //             icon={
    //               <Icon fontSize="small" sx={{ mt: -0.25 }}>
    //                 home
    //               </Icon>
    //             }
    //           />
    //           <Tab
    //             label="Message"
    //             icon={
    //               <Icon fontSize="small" sx={{ mt: -0.25 }}>
    //                 email
    //               </Icon>
    //             }
    //           />
    //           <Tab
    //             label="Settings"
    //             icon={
    //               <Icon fontSize="small" sx={{ mt: -0.25 }}>
    //                 settings
    //               </Icon>
    //             }
    //           />
    //         </Tabs>
    //       </AppBar>
    //     </Grid> */}
    //   </Grid>
    //   {children}
    // </Card>
  );
}

Header.defaultProps = {
  children: "",
};
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
