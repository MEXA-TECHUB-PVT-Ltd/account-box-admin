// @mui material components
import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import EmailIcon from '@mui/icons-material/Email';
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
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Icon from "@mui/material/Icon";
import ClipLoader from "react-spinners/ClipLoader";

const color = "black"
const override = {
  display: ' block',
  margin: '0 auto',
}
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
  const [successDelete, setSuccessDelete] = useState(false);
  const closeSuccessDelete = () => setSuccessDelete(false);
  const [email, setEmail] = useState('')
  const [Username, setUsername] = useState('')
  const [TermsAndConditionsA, setTermsAndConditionsA] = useState('')
  const [PrivacyPolicy, setPrivacyPolicy] = useState('')
  const [loading2, setLoading2] = useState(false)
  const [loading3, setLoading3] = useState(false)



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
  const headers = {
    'Content-Type': 'application/json'
  }
  const getAdminLogin = (items) => {
    axios.get(`${url}api/admin/get-admin-by-ID/${items}`)
      .then((response) => {
        console.log("response.data.data[0]")

        console.log(response.data.data[0])
        setEmail(response.data.data[0].email)
        setUsername(response.data.data[0].username)
        setTermsAndConditionsA(response.data.data[0].terms_and_conditions)
        setPrivacyPolicy(response.data.data[0].privacy_policy)
        setcompanyLogo(response.data.data[0].img)
        console.log(response.data.data[0].img)
        setPassword(response.data.data[0].password)

      })
      .catch(error => console.error(`Error:${error}`));
  }
  useEffect(() => {

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
      setLoading2(true)
      setTimeout(() => {
      setErrorSB(true)
      setLoading2(false)
    }, 1000)
    } else if (password.length < 6) {
      setLoading2(true)
      setTimeout(() => {
      console.log('error')
      setErrorlengthSBPass(true)
      setLoading2(false)
    }, 1000)
    } else {
      setLoading2(true)
      setTimeout(() => {
      axios.put(`${url}api/admin/update-credentials`, {
        _id: items,
        img: companyLogo,
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
        setLoading2(false)
    }, 1000)
    }
  }
  const submitHandler3 = () => {
    if (TermsAndConditionsA === "" || PrivacyPolicy === "") {
      setLoading3(true)
      setTimeout(() => {
      setErrorSB(true)
      setLoading3(false)
    }, 1000)
    } else {
      setLoading3(true)
      setTimeout(() => {
      console.log(password)
      axios.put(`${url}api/admin/update-credentials`, {
        _id: items,
        terms_and_conditions: TermsAndConditionsA,
        privacy_policy: PrivacyPolicy,
        // password: password,
      }, { headers }).then(response => {
        console.log(response);
        setSuccessDelete(true)
      })
        .catch(err => {
          console.log(err)
          setErrorSBPass(true)
        })
        setLoading3(false)
      }, 1000)
    }
  }
  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error Message"
      content="Please Fill All Fields to continue"
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
                        <input type="file" name="image" placeholder="image" style={{ display: 'none' }}
                          ref={inputRef}
                          onChange={(e) => onFileChange1(e.target.files[0])} />
                      </>} >
                      <Avatar src={`${url}${companyLogo}`} sx={{ width: "200px", height: "200px", border: '1px solid white', marginBottom: '10px' }} />

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
                {loading2 ?

                  <MDButton style={{ width: '100%' }} variant="gradient" color="error" fullWidth >
                    <ClipLoader color={color} loading={loading2}
                      css={override}
                      size={10}
                    />
                  </MDButton>



                  :
                  <MDButton style={{ width: '100%' }} variant="gradient" color="error" fullWidth onClick={() => { submitHandlerAdminUpdate() }}>
                    Update
                  </MDButton>
                }
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
                {loading3 ?

                  <MDButton style={{ width: '100%' }} variant="gradient" color="error" fullWidth >
                    <ClipLoader color={color} loading={loading3}
                      css={override}
                      size={10}
                    />
                  </MDButton>



                  :
                  <MDButton style={{ width: '100%' }} variant="gradient" color="error" fullWidth onClick={() => { submitHandler3() }}>
                    Update
                  </MDButton>
                }
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
            </div>
            <div>
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
