import url from "url/url";
import axios from "axios";
import Card from "@mui/material/Card";
import React, { useState } from "react"
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useNavigate } from 'react-router-dom';
import MDSnackbar from "components/MDSnackbar";
import BasicLayout from "layouts/authentication/components/BasicLayout";
// Images
import bgImage from "assets/images/curve.png";

function Cover() {
  const navigate = useNavigate();
  const headers = {
    'Content-Type': 'application/json'
  }
  // States
  const [loading, setLoading] = useState(false)
  const [loadingPassword, setLoadingpassword] = useState(false)
  const [loading1, setLoading1] = useState(true)
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorSB, setErrorSB] = useState(false);
  const [errorSBEmpty, setErrorSBEmpty] = useState(false);
  const [errorSBOTP, setErrorSBOTP] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [infoUpdate, setInfoUpdate] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(false);
  const [otpCodeAdmin, setOtpCodeAdmin] = useState('');
  const [AdminEmail, setAdminEmail] = useState('');
  const [AdminIDLogin, setAdminIDLogin] = useState('');
  const [errorlengthSBPass, setErrorlengthSBPass] = useState(false);

  const closeErrorlengthSBPass = () => setErrorlengthSBPass(false);
  const closeInfoSB = () => setInfoSB(false);
  const closeInfoUpdate = () => setInfoUpdate(false);
  const closeErrorSB = () => setErrorSB(false);
  const closeErrorSBEmpty = () => setErrorSBEmpty(false);
  const closeErrorUpdate = () => setErrorUpdate(false);
  const closeErrorSBOTP = () => setErrorSBOTP(false);
// Send Email Otp 
  const sendEmailOtp = () => {
    axios.post(`${url}api/admin/forget-password`, {
      email: email,
    }, { headers }).then(response => {
      console.log(response)
      if (response.data.message === "Email Id not Exist") {
        setErrorSB(true)
      } else {
        setLoading(true)
        setLoading1(false)
        setLoadingpassword(false)
        setOtpCodeAdmin(response.data.otp)
        setAdminEmail(response.data.data.email)
        setAdminIDLogin(response.data.data._id)
      }

    })
      .catch(err => {
        console.log(err)
      })
  }

// Update Password 
  const UpdatePassword = () => {
    if (email === "" || newPassword === "") {
      setErrorSBEmpty(true)
    } else if (newPassword.length < 6) {
      setErrorlengthSBPass(true)
    } else {
      // navigate('/authentication/sign-in');
      axios.put(`${url}api/admin/update-credentials`, {
        email: AdminEmail,
        password: newPassword,
        _id: AdminIDLogin,
      }, { headers }).then(response => {
        console.log(response);
        if (response.data === '') {
          setErrorUpdate(true)
        } else {
          setInfoUpdate(true)
          setTimeout(() => {
            navigate('/authentication/sign-in');
          }, 3000)
        }
      })
        .catch(err => {
          console.log(err)
        })
    }

  }
  // Notifications 
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
  const sendVerifyOtp = () => {
    console.log(otpCodeAdmin)
    console.log(otpCode)
    if (otpCodeAdmin == otpCode) {
      console.log('verified')
      setLoading(false)
      setInfoSB(true)
      setLoading1(false)
      setLoadingpassword(true)

    } else {
      console.log('notr sdfb')
      setErrorSBOTP(true)
    }

  }
  const renderErrorSBEmpty = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error Message"
      content="Please Fill All Fields"
      open={errorSBEmpty}
      onClose={closeErrorSBEmpty}
      close={closeErrorSBEmpty}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error Message"
      content="Please Enter Valid Email Address"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );
  const renderErrorUpdate = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error Message"
      content="There is some error in updating password"
      open={errorUpdate}
      onClose={closeErrorUpdate}
      close={closeErrorUpdate}
      bgWhite
    />
  );
  const renderErrorSBOTP = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error Message"
      content="Invalid OTP, OTP doesnot matched"
      open={errorSBOTP}
      onClose={closeErrorSBOTP}
      close={closeErrorSBOTP}
      bgWhite
    />
  );
  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      color="error"
      title="Matched Successfully"
      content="OTP Matched Successfully, Enter New Password"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
      bgWhite
    />
  );
  const renderInfoUpdate = (
    <MDSnackbar
      icon="notifications"
      color="error"
      title="Updated Successfully"
      content="Password Updated Successfully, Sign In to continue"
      open={infoUpdate}
      onClose={closeInfoUpdate}
      close={closeInfoUpdate}
      bgWhite
    />
  );

  return (
    <BasicLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="error"
          borderRadius="lg"
          coloredShadow="error"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Reset Password
          </MDTypography>
          {loading ? <MDTypography display="block" variant="button" color="white" my={1}>
            You will receive an Otp in maximum 60 seconds
          </MDTypography> : null}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={4}>
              <MDTypography display="block" variant="button" color="dark" my={1}>
                Enter Valid Email to verify
              </MDTypography>
              <MDInput style={{ marginBottom: '10px' }} value={email}
                onChange={(e) => setEmail(e.target.value)
                } type="email" label="Email" variant="standard" fullWidth />
              {loading ?
                <MDInput value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)
                  } type="text" label="Enter Otp" variant="standard" fullWidth /> : null}
              {loadingPassword ?
                <MDInput value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)
                  } type="text" label="Enter New Password" variant="standard" fullWidth /> : null}
            </MDBox>
            <MDBox mt={6} mb={1}>

              {loading1 ? <MDButton variant="gradient" color="error" onClick={sendEmailOtp} fullWidth>
                send Otp
              </MDButton> : null}

              {loading ? <MDButton variant="gradient" color="error" onClick={sendVerifyOtp} fullWidth>
                verify
              </MDButton> : null}
              {loadingPassword ?
                <MDButton variant="gradient"
                  color="error"
                  onClick={UpdatePassword}
                  fullWidth>
                  update
                </MDButton> : null}
            </MDBox>
          </MDBox>
        </MDBox>
        <div>
          {renderErrorSB}
        </div>
        <div>
          {renderErrorSBOTP}
        </div>
        <div>
          {renderErrorSBEmpty}
        </div>
        <div>
          {renderInfoSB}
        </div>
        <div>
          {renderInfoUpdate}
        </div>
        <div>
          {renderErrorUpdate}
        </div>
        <div>
          {renderErrorLengthSBPass}
        </div>
      </Card>
    </BasicLayout>
  );
}

export default Cover;
