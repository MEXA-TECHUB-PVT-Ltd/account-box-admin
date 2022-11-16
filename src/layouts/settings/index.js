// @mui material components
import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import EmailIcon from '@mui/icons-material/Email';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import url from "url/url";
import axios from "axios";
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

function Dashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
      setItems(items);
      console.log("items")
      console.log(items)

    }
  }, []);
  const [Rate, setRate] = useState('');
  const [successDelete, setSuccessDelete] = useState(false);
  const closeSuccessDelete = () => setSuccessDelete(false);
  const [email, setEmail] = useState('')
  const [Username, setUsername] = useState('')
  const [TermsAndConditionsA, setTermsAndConditionsA] = useState('')
  const [PrivacyPolicy, setPrivacyPolicy] = useState('')

  const [password, setPassword] = useState('')
  const renderSuccessDelete = (
    <MDSnackbar
      icon="notifications"
      title=" Updated Successfully"
      content="This is a notification message"
      open={successDelete}
      onClose={closeSuccessDelete}
      close={closeSuccessDelete}
      color="error"
      bgWhite
    />
  );
  const [Orderradius, setOrderradius] = useState('');
  const [Commision, setCommision] = useState('');
  const getAllData = () => {
    axios.get(`${url}api/rate_per_km/allrate_per_kms`)
      .then((response) => {
        console.log(response.data)
        const Rate = response.data.rate;
        setRate(Rate);
      })
      .catch(error => console.error(`Error:${error}`));
  }

  const getAllOrderradius = () => {
    axios.get(`${url}api/driver_search_radius/alldriver_search_radius`)
      .then((response) => {
        const Rate = response.data.radius;
        console.log(Rate)
        setOrderradius(Rate);
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const getAllCommision = () => {
    axios.get(`${url}api/comission/allComissions`)
      .then((response) => {
        const Rate = response.data.rate;
        console.log(Rate)
        setCommision(Rate);
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const headers = {
    'Content-Type': 'application/json'
  }
  const submitHandler = () => {
    axios.put(`${url}api/rate_per_km/updaterate_per_km`, {
      rate: Rate,
    }, { headers }).then(response => {
      console.log(response);
      setSuccessDelete(true)


    })
      .catch(err => {
        console.log(err)
      })
  }
  const submitHandler1 = () => {
    axios.put(`${url}api/driver_search_radius/updatedriver_search_radius`, {
      radius: Orderradius,
    }, { headers }).then(response => {
      console.log(response);
      setSuccessDelete(true)


    })
      .catch(err => {
        console.log(err)
      })
  }
  const submitHandler2 = () => {
    axios.put(`${url}api/comission/updateComission`, {
      rate: Commision,
    }, { headers }).then(response => {
      console.log(response);
      setSuccessDelete(true)


    })
      .catch(err => {
        console.log(err)
      })
  }
  const getAdminLogin = (items) => {
    axios.get(`${url}api/admin/getAdminByID/${items}`)
      .then((response) => {
        console.log(response.data[0])
        setEmail(response.data[0].email)
        setUsername(response.data[0].username)
        setTermsAndConditionsA(response.data[0].terms_and_conditions)
        setPrivacyPolicy(response.data[0].privacy_policy)
        setcompanyLogo(response.data[0].img)
        // setPassword(response.data[0].password)
        // const Rate = response.data.radius;
        // console.log(Rate)
        // setOrderradius(Rate);
      })
      .catch(error => console.error(`Error:${error}`));
  }
  useEffect(() => {
    getAllData();
    getAllOrderradius();
    getAllCommision();
    const items = JSON.parse(localStorage.getItem('items'));
    console.log(items)
    setItems(items)
    getAdminLogin(items);

  }, []);
  const [values, setValues] = React.useState({
    password: '',

  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setPassword(event.target.value)
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [errorSB, setErrorSB] = useState(false);
  const [errorSBPass, setErrorSBPass] = useState(false);
  const [errorlengthSBPass, setErrorlengthSBPass] = useState(false);
  const closeErrorSB = () => setErrorSB(false);
  const closeErrorSBPass = () => setErrorSBPass(false);
  const closeErrorlengthSBPass = () => setErrorlengthSBPass(false);
  const submitHandlerAdminUpdate = () => {
    if (email === "" || password === "" || Username === "") {
      setErrorSB(true)
    } else if (password.length < 6) {
      console.log('error')
      setErrorlengthSBPass(true)
    } else {
      axios.put(`${url}api/admin/updateadmin`, {
        _id: items,
        img:companyLogo,
        username: Username,
        email: email,
        password: password,
      }, { headers }).then(response => {
        console.log(response);
        setSuccessDelete(true)
      })
        .catch(err => {
          console.log(err)
          setErrorSBPass(true)
        })
    }
  }
  const submitHandler3 = () => {
    if (TermsAndConditionsA === "" || PrivacyPolicy === "") {
      setErrorSB(true)
    } else {
      axios.put(`${url}api/admin/updateadmin`, {
        _id: items,
        terms_and_conditions: TermsAndConditionsA,
        privacy_policy: PrivacyPolicy,
        password: password,
      }, { headers }).then(response => {
        console.log(response);
        setSuccessDelete(true)
      })
        .catch(err => {
          console.log(err)
          setErrorSBPass(true)
        })
    }
  }
  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error Message"
      content="Please Fill All Fields to continue"
      // dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );
  const renderErrorSBPass = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error Message"
      content="Invalid Credentials"
      dateTime="now"
      open={errorSBPass}
      onClose={closeErrorSBPass}
      close={closeErrorSBPass}
      bgWhite
    />
  );
  const renderErrorLengthSBPass = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error Message"
      content="Password should be atleast 6 characters long"
      // dateTime="11 mins ago"
      open={errorlengthSBPass}
      onClose={closeErrorlengthSBPass}
      close={closeErrorlengthSBPass}
      bgWhite
    />
  );
  // Img 
  // choose image
  const inputRef = useRef(null);

  const handleClick = () => {
    // 👇️ open file input box on click of other element
    inputRef.current.click();
  };
  const [companyLogo, setcompanyLogo] = useState('');
  const onFileChange1 = (e) => {
    const formData = new FormData()
    formData.append('image', e)
    axios.post(`${url}upload-image`,
        formData).then(response => {
            console.log(response.data)
            setcompanyLogo(response.data);
            console.log('resdbb');
            console.log(companyLogo);
        })

  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={4}>

            <Card sx={{ minWidth: 275 }}>
              <CardContent>

                <Typography sx={{ mb: 3.5 }} color="text.secondary">
                  Rate per Km
                </Typography>
                <FormControl variant="outlined" style={{ width: '100%', marginBottom: '20px' }}>
                  <InputLabel >Rate Per Km</InputLabel>
                  <OutlinedInput
                    value={Rate}
                    onChange={(e) => setRate(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                        >
                          <DirectionsCarFilledIcon style={{ color: 'grey' }} />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Rate Per Km"
                  />
                </FormControl>
                <MDButton style={{ width: '100%' }} variant="gradient" color="error" fullWidth onClick={() => { submitHandler() }}>
                  Update
                </MDButton>
              </CardContent>

            </Card>
          </Grid>
          <Grid item xs={12} md={4}>

            <Card sx={{ minWidth: 275 }}>
              <CardContent>

                <Typography sx={{ mb: 3.5 }} color="text.secondary">
                  Driver Search Radius
                </Typography>
                <FormControl variant="outlined" style={{ width: '100%', marginBottom: '20px' }}>
                  <InputLabel >Radius</InputLabel>
                  <OutlinedInput
                    value={Orderradius}
                    onChange={(e) => setOrderradius(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                        >
                          <TravelExploreIcon style={{ color: 'grey' }} />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Radius"
                  />
                </FormControl>
                <MDButton style={{ width: '100%' }} variant="gradient" color="error" fullWidth onClick={() => { submitHandler1() }}>
                  Update
                </MDButton>
              </CardContent>

            </Card>
          </Grid>
          <Grid item xs={12} md={4}>

            <Card sx={{ minWidth: 275 }}>
              <CardContent>

                <Typography sx={{ mb: 3.5 }} color="text.secondary">
                  Commision
                </Typography>
                <FormControl variant="outlined" style={{ width: '100%', marginBottom: '20px' }}>
                  <InputLabel >Commision</InputLabel>
                  <OutlinedInput
                    value={Commision}
                    onChange={(e) => setCommision(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                        >
                          <AttachMoneyIcon style={{ color: 'grey' }} />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Commision"
                  />
                </FormControl>
                <MDButton style={{ width: '100%' }} variant="gradient" color="error" fullWidth onClick={() => { submitHandler2() }}>
                  Update
                </MDButton>
              </CardContent>
            </Card>
          </Grid> */}
          <Grid item xs={12} md={6}>

            <Card sx={{ minWidth: 275 }}>
              <CardContent>

                <Typography sx={{ mb: 3.5 }} color="text.secondary">
                  Update Admin
                </Typography>
                <Grid container spacing={3} align="center">
                  <Grid item xs={12} md={12}>
                    <Badge color="secondary" sx={{ cursor: "pointer" }} onClick={handleClick} overlap="circular" badgeContent={
                      <>
                        <Icon fontSize="small" >
                          add
                        </Icon>
                        {/* <input type="file" ref={inputRef} style={{ display: 'none' }}
                          onChange={(e) => onFileChange1(e.target.files[0])} /> */}
                          <input type="file" name="image" placeholder="image" style={{ display: 'none' }} ref={inputRef}
                                                            onChange={(e) => onFileChange1(e.target.files[0])} />
                      </>} >
                      <Avatar src={`${url}${companyLogo}`} sx={{ width: "200px", height: "200px", border: '1px solid white',marginBottom:'10px' }} />

                    </Badge>
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
                  />
                </FormControl>
                <FormControl variant="outlined" style={{ width: '100%', marginBottom: '20px' }}>
                  <InputLabel >Email</InputLabel>
                  <OutlinedInput
                    // type={values.showPassword ? 'text' : 'password'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                </FormControl>

                <MDButton style={{ width: '100%' }} variant="gradient" color="error" fullWidth onClick={() => { submitHandlerAdminUpdate() }}>
                  Update
                </MDButton>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>

            <Card sx={{ minWidth: 275 }}>
              <CardContent>

                <Typography sx={{ mb: 3.5 }} color="text.secondary">
                  Update Information
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={12}>
                    <Typography color="text.secondary" variant="h6">
                      Terms And Conditions
                    </Typography></Grid>
                  <Grid item xs={12} md={12}>
                    <TextareaAutosize
                      value={TermsAndConditionsA}
                      onChange={(e) => setTermsAndConditionsA(e.target.value)}
                      aria-label="minimum height"
                      minRows={10}
                      placeholder="Terms And Conditions"
                      style={{ width: '100%' }}
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
                    />
                  </Grid>

                </Grid>

                <MDButton style={{ width: '100%' }} variant="gradient" color="error" fullWidth onClick={() => { submitHandler3() }}>
                  Update
                </MDButton>
              </CardContent>
            </Card>
          </Grid>
          <Grid>
            <div>
              {renderSuccessDelete}
            </div>
            <div>
              {renderErrorSBPass}
            </div>
            <div>
              {renderErrorSB}
            </div><div>
              {renderErrorLengthSBPass}
            </div>
          </Grid>
        </Grid>
        <MDBox>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
