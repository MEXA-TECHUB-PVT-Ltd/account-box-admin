// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import { useNavigate } from 'react-router-dom';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";
import Icon from "@mui/material/Icon";

function DefaultProjectCard({ image, label, status, id }) {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <MDBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
        <CardMedia
          src={image}
          component="img"
          sx={{
            maxWidth: "100%",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </MDBox>
      <MDBox mt={1} mx={0.5}>
        <Grid container spacing={6} >
          <Grid item xs={12} md={1} >
            {status === "block" ?
              <Icon fontSize="small" color="success" style={{ marginTop: '10px' }}>do_not_disturb_alt_icon</Icon>
              :
              <Icon fontSize="small" color="success" style={{ marginTop: '10px' }}>verified_user_icon</Icon>

            }
          </Grid>
          <Grid item xs={12} md={6} >
            <MDTypography variant="button" fontWeight="regular" color="text" textTransform="capitalize">
              {label}
            </MDTypography>
          </Grid>
          <Grid item xs={12} md={4} >
            <MDButton
              // to={action.route}
              onClick={() => {
                navigate('/driversProfile',
                  {
                    state: {
                      idDispacher: id,
                    }
                  }
                );
              }}
              variant="text" color="info">
              View
            </MDButton>
          </Grid>
        </Grid>

      </MDBox>
    </Card>
  );
}

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,

};

export default DefaultProjectCard;
