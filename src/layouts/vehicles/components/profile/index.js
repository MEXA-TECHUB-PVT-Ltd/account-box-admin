import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import MDBox from "components/MDBox";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import url from "url/url";
import axios from "axios";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './stylesheet.css'
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import MDButton from "components/MDButton";
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
  const [Make, setMake] = useState('');
  const [Modal, setModal] = useState('');
  const [PlateNo, setPlateNo] = useState('');
  const [styleCar, setStyleCar] = useState('');
  const [CarTypeName, setCarTypeName] = useState('');
  const [Year, setYear] = useState('');
  const [Conditiont, setConditiont] = useState('');
  const [AcCar, setAcCar] = useState('');
  const [Price, setPrice] = useState('');
  const [Color, setColor] = useState('');

  const getAllData = () => {
    axios.get(`${url}api/vehicle/specificVehicle/${idProfile}`)
      .then((response) => {
        console.log('Data User vehicle')
        console.log(response)
        setMake(response.data[0].make)
        setModal(response.data[0].modal)
        setPlateNo(response.data[0].plate_no)
        setYear(response.data[0].year)
        setStyleCar(response.data[0].style)
        setCarTypeName(response.data[0].car_type_id.name)
        setConditiont(response.data[0].condition_id.name)
        setPrice(response.data[0].car_type_id.price)
        setColor(response.data[0].color)
        setAcCar(response.data[0].ac)

      })
      .catch(error => console.error(`Error:${error}`));
  }
  useEffect(() => {
    getAllData();
    console.log("props.idProfile")
    console.log(idProfile)

  }, []);
  return (
    <>
      <MDBox mb={2} />
      <MDBox mt={5} mb={3}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} sx={{ ml: "auto" }}>
            {/* <Grid container spacing={1}> */}
            {/* <Grid item xs={12} md={12} sx={{ display: "flex" }}> */}
            {/* <ProfileInfoCard
                      title="Vehicle information"
                      info={{
                        Make: Make,
                        Modal: Modal,
                        PlateNo: PlateNo,
                        Style: styleCar,
                        Year: Year,
                        Color: Color,
                        Ac:AcCar ,
                        carType: CarTypeName,
                        Condition: Conditiont,
                        Price:Price

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
                    /> */}
            <Card sx={{ minWidth: 275 }}>
              <CardContent>

                <Typography sx={{ mb: 3.5 }} color="text.secondary">
                  Vehicle Information
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={1} mt={1}>
                    <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                      Make
                    </MDTypography>
                    </Grid>
                  <Grid item xs={12} md={3} >
                    <FormControl variant="outlined" style={{ width: '100%', marginBottom: '20px' }}>
                      <OutlinedInput
                        value={Make}
                        onChange={(e) => setMake(e.target.value)}

                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={1} mt={1}>
                    <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                      Modal
                    </MDTypography>
                    </Grid>
                  <Grid item xs={12} md={3} >
                    <FormControl variant="outlined" style={{ width: '100%', marginBottom: '20px' }}>
                      <OutlinedInput
                        value={Modal}
                        onChange={(e) => setModal(e.target.value)}

                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={1} mt={1}>
                    <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                    PlateNo
                    </MDTypography>
                    </Grid>
                  <Grid item xs={12} md={3} >
                    <FormControl variant="outlined" style={{ width: '100%', marginBottom: '20px' }}>
                      <OutlinedInput
                        value={PlateNo}
                        onChange={(e) => setPlateNo(e.target.value)}

                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={1} mt={1}>
                    <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                    Style Car
                    </MDTypography>
                    </Grid>
                  <Grid item xs={12} md={3} >
                    <FormControl variant="outlined" style={{ width: '100%', marginBottom: '20px' }}>
                      <OutlinedInput
                        value={styleCar}
                        onChange={(e) => setStyleCar(e.target.value)}

                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={1} mt={1}>
                    <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                    Year
                    </MDTypography>
                    </Grid>
                  <Grid item xs={12} md={3} >
                    <FormControl variant="outlined" style={{ width: '100%', marginBottom: '20px' }}>
                      <OutlinedInput
                        value={Year}
                        onChange={(e) => setYear(e.target.value)}

                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={1} mt={1}>
                    <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                    Color
                    </MDTypography>
                    </Grid>
                  <Grid item xs={12} md={3} >
                    <FormControl variant="outlined" style={{ width: '100%', marginBottom: '20px' }}>
                      <OutlinedInput
                        value={Color}
                        onChange={(e) => setColor(e.target.value)}

                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={1} mt={1}>
                    <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                    Ac Car
                    </MDTypography>
                    </Grid>
                  <Grid item xs={12} md={3} >
                    <FormControl variant="outlined" style={{ width: '100%', marginBottom: '20px' }}>
                      <OutlinedInput
                        value={AcCar}

                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={1} mt={1}>
                    <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                    Type
                    </MDTypography>
                    </Grid>
                  <Grid item xs={12} md={3} >
                    <FormControl variant="outlined" style={{ width: '100%', marginBottom: '20px' }}>
                      <OutlinedInput
                        value={CarTypeName}

                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={1} mt={1}>
                    <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                    Condition
                    </MDTypography>
                    </Grid>
                  <Grid item xs={12} md={3} >
                    <FormControl variant="outlined" style={{ width: '100%', marginBottom: '20px' }}>
                      <OutlinedInput
                        value={Conditiont}

                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={1} mt={1}>
                    <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                    Price
                    </MDTypography>
                    </Grid>
                  <Grid item xs={12} md={3} >
                    <FormControl variant="outlined" style={{ width: '100%', marginBottom: '20px' }}>
                      <OutlinedInput
                        value={Price}

                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </>
  );
}

export default Profile;
