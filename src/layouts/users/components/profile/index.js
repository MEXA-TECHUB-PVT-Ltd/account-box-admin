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
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Email';
import './stylesheet.css'
import PropTypes from 'prop-types';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Person } from "@mui/icons-material";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Icon from "@mui/material/Icon";

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
  const [Username, setUsername] = useState('');
  const [EmailAdmin, setEmailAdmin] = useState('');
  const [Img, setImg] = useState('');

  const [PrivacyPolicy, setPrivacyPolicy] = useState('');
  const [styleCar, setStyleCar] = useState('');
  const [CarTypeName, setCarTypeName] = useState('');
  const [Terms, setTerms] = useState('');
  const [Conditiont, setConditiont] = useState('');
  const [AcCar, setAcCar] = useState('');
  const [Price, setPrice] = useState('');
  const [Color, setColor] = useState('');

  const getAllData = () => {
    axios.get(`${url}api/admin/getAdminByID/${idProfile}`)
      .then((response) => {
        console.log('Data User Admin')
        console.log(response)
        setImg(response.data[0].img)

        setUsername(response.data[0].username)
        setEmailAdmin(response.data[0].email)
        setPrivacyPolicy(response.data[0].privacy_policy)
        setTerms(response.data[0].terms_and_conditions)
       
       
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
      {/* <MDBox mb={2} />
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} sx={{ ml: "auto" }}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                    <ProfileInfoCard
                      title="Admin information"
                      info={{
                        Username: Username,
                        Email: EmailAdmin,
                        PrivacyPolicy: PrivacyPolicy,
                        TermsAndConditions: Terms,

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
        </MDBox> */}
          <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>

            <Card sx={{ minWidth: 275 }}>
              <CardContent>

                <Typography sx={{ mb: 3.5 }} color="text.secondary">
                   Admin Profile
                </Typography>
                <Grid container spacing={3} align="center">
                  <Grid item xs={12} md={12}>
                  
                      <Avatar src={`${url}${Img}`} sx={{ width: "200px", height: "200px", border: '1px solid white',marginBottom:'10px' }} />

                  </Grid>
                </Grid>
                <FormControl variant="outlined" style={{ width: '100%', marginBottom: '20px' }}>
                  <InputLabel >Username</InputLabel>
                  <OutlinedInput
                    // type={values.showPassword ? 'text' : 'password'}
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton

                          edge="end"
                        >
                          <Person style={{ color: 'grey' }} />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Username"
                    disabled
                  />
                </FormControl>
                <FormControl variant="outlined" style={{ width: '100%', marginBottom: '20px' }}>
                  <InputLabel >Email</InputLabel>
                  <OutlinedInput
                    // type={values.showPassword ? 'text' : 'password'}
                    value={EmailAdmin}
                    onChange={(e) => setEmailAdmin(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton

                          edge="end"
                        >

                          <EmailIcon style={{ color: 'grey' }} />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Email"
                    disabled
                  />
                </FormControl>
{/* 
                <FormControl variant="outlined" style={{ width: '100%', marginBottom: '20px' }}>
                  <InputLabel >Password</InputLabel>
                  <OutlinedInput
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <VisibilityOff style={{ color: 'grey' }} /> : <Visibility style={{ color: 'grey' }} />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl> */}

                {/* <MDButton style={{ width: '100%' }} variant="gradient" color="error" fullWidth onClick={() => { submitHandlerAdminUpdate() }}>
                  Update
                </MDButton> */}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>

            <Card sx={{ minWidth: 275 }}>
              <CardContent>

                <Typography sx={{ mb: 3.5 }} color="text.secondary">
                  Other Information
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={12}>
                    <Typography color="text.secondary" variant="h6">
                      Terms And Conditions
                    </Typography></Grid>
                  <Grid item xs={12} md={12}>
                    <TextareaAutosize
                      value={Terms}
                      onChange={(e) => setTerms(e.target.value)}
                      aria-label="minimum height"
                      minRows={10}
                      placeholder="Terms And Conditions"
                      style={{ width: '100%' }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography color="text.secondary" variant="h6">
                      Privacy Policy
                    </Typography></Grid>
                  <Grid item xs={12} md={12}>
                    <TextareaAutosize
                      value={PrivacyPolicy}
                      onChange={(e) => setPrivacyPolicy(e.target.value)}
                      aria-label="minimum height"
                      minRows={10}
                      placeholder="Terms And Conditions"
                      style={{ width: '100%' }}
                      disabled
                    />
                  </Grid>

                </Grid>

                {/* <MDButton style={{ width: '100%' }} variant="gradient" color="error" fullWidth onClick={() => { submitHandler3() }}>
                  Update
                </MDButton> */}
              </CardContent>
            </Card>
          </Grid>
          <Grid>
          
          </Grid>
        </Grid>
        <MDBox>

        </MDBox>
        </MDBox>
    </>
  );
}

export default Profile;
