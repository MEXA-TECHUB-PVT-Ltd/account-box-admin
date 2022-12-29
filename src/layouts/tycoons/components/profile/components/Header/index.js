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
  const [TypeId, setTypeId] = useState('');
  const [userName, setUserName] = useState('');
  const [imageUser, setImageUser] = useState('');

  const getAllData = () => {
    axios.get(`${url}api/tycoon/get-tycoon-by-ID/${idProfileUser}`)
      .then((response) => {
        console.log('Data User Header')
        console.log(response.data.data[0])
        setTypeId(response.data.data[0].username)
        setUserName(response.data.data[0].email)
        if (response.data.data[0].profile_image === undefined) {
          setImageUser(backgroundImage)
        } else {
          const urlImage = response.data.data[0].profile_image
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
            // src={`${backgroundImage}`}
            alt="profile-image" size="xl" shadow="sm" />
        </Grid>
        <Grid item>
          <MDBox height="100%" mt={0.5} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              {userName}
            </MDTypography>
            <MDTypography variant="button" color="text" fontWeight="regular">
              {TypeId}
            </MDTypography>
          </MDBox>
        </Grid>

      </Grid>
      {children}
    </Card>
  );
}

Header.defaultProps = {
  children: "",
};
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
