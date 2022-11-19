import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
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
import { Person } from "@mui/icons-material";
import Avatar from '@mui/material/Avatar';

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
  const [Terms, setTerms] = useState('');

  const getAllData = () => {
    axios.get(`${url}api/admin/get-admin-by-ID/${idProfile}`)
      .then((response) => {
        console.log('Data User Admin')
        console.log(response)
        setImg(response.data.data[0].img)
        setUsername(response.data.data[0].username)
        setEmailAdmin(response.data.data[0].email)
        setPrivacyPolicy(response.data.data[0].privacy_policy)
        setTerms(response.data.data[0].terms_and_conditions)
       
       
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
