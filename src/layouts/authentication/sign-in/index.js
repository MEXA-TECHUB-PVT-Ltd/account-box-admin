import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import url from "url/url";
import "./style.css"
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import BasicLayout from "layouts/authentication/components/BasicLayout";
import MDSnackbar from "components/MDSnackbar";
// Images
import bgImage from "assets/images/curve.png";

function Basic() {
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

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorSB, setErrorSB] = useState(false);
  const [errorSBPass, setErrorSBPass] = useState(false);
  const [errorlengthSBPass, setErrorlengthSBPass] = useState(false);

  const closeErrorSB = () => setErrorSB(false);
  const closeErrorSBPass = () => setErrorSBPass(false);
  const closeErrorlengthSBPass = () => setErrorlengthSBPass(false);
  const navigate = useNavigate();
  const headers = {
    'Content-Type': 'application/json'
  }
  const submitHandler = () => {
    if (email === "" || password === "") {
      setErrorSB(true)
    } else if (password.length < 6) {
      console.log('error')
      setErrorlengthSBPass(true)
    } else {
      axios.put(`${url}api/admin/login`, {
        email: email,
        password: password,
      }, { headers }).then(response => {
        console.log(response)
        if (response.data.message === "Login Successfully") {
          localStorage.setItem('items', JSON.stringify(response.data.data._id));
          navigate('/dashboard');
        } else {
          setErrorSBPass(true)
        }
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
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    console.log(items)
    if (items == null) {
      setItems(items);
      console.log("items")
      console.log(items)

    } else {
      navigate('/dashboard')
    }
  }, []);
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="error"
          borderRadius="lg"
          coloredShadow="error"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Admin Sign In
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <FormControl variant="outlined" style={{ width: '100%' }}>
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
                />
              </FormControl>
            </MDBox>
            <MDBox mb={2}>
              <FormControl variant="outlined" style={{ width: '100%' }}>
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
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton style={{ width: '100%' }} variant="gradient" color="error" fullWidth onClick={() => { submitHandler() }}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={1} mb={0} textAlign="right">
              <MDTypography
                component={Link}
                to="/authentication/reset-password"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Forget Password
              </MDTypography>
            </MDBox>
            {/* <MDBox mt={1} mb={1} textAlign="center">

              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
        <div>
          {renderErrorSB}
        </div>
        <div>
          {renderErrorSBPass}
        </div>
        <div>
          {renderErrorLengthSBPass}
        </div>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
