import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import url from "url/url";
import axios from "axios";
import MDBox from "components/MDBox";
import Rating from '@mui/material/Rating';
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import breakpoints from "assets/theme/base/breakpoints";
import backgroundImage from "assets/images/bg-profile.jpeg";
import googleMapsApiKey from 'layouts/mapKey'
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
// Material Dashboard 2 React components
import OutlinedInput from '@mui/material/OutlinedInput';
import MDInput from "components/MDInput";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MDButton from "components/MDButton";
import DotLoader from "react-spinners/DotLoader";
import { CalendarViewDay, HomeOutlined, LocationOnOutlined, LockClock } from "@mui/icons-material";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer
} from '@react-google-maps/api'

const center = { lat: 56.002716, lng: -4.580081 }
// Images
const override = {
  display: ' block',
  margin: '0 auto',
  alignContent: "center"
  //   borderColor: 'red',
}
const color = "#F69920"
const libraries = ['places'];
function Header({ children, idProfileUser }) {
  const [loadingLoader, setLoadingLoader] = useState(true)
  const [valueRate, setValueRate] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [TypeId, setTypeId] = useState('');
  const [userName, setUserName] = useState('');
  const [imageUser, setImageUser] = useState('');
  const [centerA, setCenterA] = useState({lat: 56.002716,lng: -4.580081});

  const [pickup_location, setpickup_location] = useState('');
  const [dropoff_location, setdropoff_location] = useState('');
  const [flight_date, setflight_date] = useState('');
  const [flight_time, setflight_time] = useState('');
  const [car_type_id, setcar_type_id] = useState('');
  const [condition_id, setcondition_id] = useState('');
  const [ac, setac] = useState('');





  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const getAllData = () => {
    axios.get(`${url}api/Order/specificOrder/${idProfileUser}`)
      .then((response) => {
        console.log('Data User Order specific')
        console.log(response.data[0])
        setpickup_location(response.data[0].pickup_location)
        setdropoff_location(response.data[0].dropoff_location)
        setflight_date(response.data[0].flight_date)
        setflight_time(response.data[0].flight_time)
        setcar_type_id(response.data[0].car_type_id.name)
        setcondition_id(response.data[0].condition_id.name)
        setac(response.data[0].ac)
        if(response.data[0].driver_id===undefined){
          center = { lat: 56.002716, lng: -4.580081 }

        }else{
          console.log('xccxhcc')
          const latdriver=response.data[0].driver_id.driver_lat
          const lngdriver=response.data[0].driver_id.driver_log
          setCenterA( { lat:parseInt(latdriver) , lng: parseInt(lngdriver) })
          // center = { lat:parseInt(latdriver) , lng: parseInt(lngdriver) }

        }

      })
      .catch(error => console.error(`Error:${error}`));
  }
  const getAllDataRating = () => {
    axios.get(`${url}api/Rating/getTotalRatingDriver/${idProfileUser}`)
      .then((response) => {
        console.log('Data User Rating')
        console.log(response.data)
        setValueRate(response.data)

      })
      .catch(error => console.error(`Error:${error}`));
  }

  useEffect(() => {
    getAllData();
    getAllDataRating();
    setLoadingLoader(true)
    calculateRoute();
    setTimeout(() => {
      calculateRoute();
      setLoadingLoader(false)

    }, 3000)
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
  // map 

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
    libraries,
  })

  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */

  const destinationRef = useRef()

  async function calculateRoute() {
    if (pickup_location === '' || dropoff_location === '') {
      return
    }
    //eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()

    const results = await directionsService.route({
      origin: pickup_location,
      destination: dropoff_location,
      //eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING
    })
    setDirectionsResponse(results)
  }
  if (!isLoaded) return "Loading...";

  return (
    <Card
      sx={{
        position: "relative",
        mt: 3,
        mx: 3,
        py: 2,
        px: 2,
        backgroundColor: '#564cb9'
      }}
    >
      <Grid container spacing={2} >
        <Grid item md={4} xs={4}  >
          <MDTypography mb={4} variant="h5" fontWeight="medium" color="white">
            Order Detail
          </MDTypography>
          <Autocomplete>
            <MDInput style={{ marginBottom: '10px' }} value={pickup_location}
              onChange={(e) => setpickup_location(e.target.value)
              }
              ref={originRef}
              type="text" label="Pickup" variant="standard" fullWidth />
          </Autocomplete>
          <Autocomplete>
            <MDInput style={{ marginBottom: '10px' }} value={dropoff_location}
              onChange={(e) => setdropoff_location(e.target.value)
              }
              ref={destinationRef}
              type="text" label="dropoff" variant="standard" fullWidth />
          </Autocomplete>

          <MDInput style={{ marginBottom: '10px' }} value={flight_date}
            onChange={(e) => setflight_date(e.target.value)
            }
            type="text" label="Flight Date" variant="standard" fullWidth />
          <MDInput style={{ marginBottom: '10px' }} value={flight_time}
            onChange={(e) => setflight_time(e.target.value)
            }
            type="text" label="Flight Time" variant="standard" fullWidth />
          <MDTypography mb={1} variant="h5" fontWeight="medium" color="white">
            Vehicle Details
          </MDTypography>
          <MDTypography mb={1} variant="h6" fontWeight="light" color="white">
            Car Type : {car_type_id}
          </MDTypography>
          <MDTypography mb={1} variant="h6" fontWeight="light" color="white">
            Car Condition : {condition_id}
          </MDTypography>
          <MDTypography mb={1} variant="h6" fontWeight="light" color="white">
            Ac : {ac}
          </MDTypography>
        </Grid>
        <Grid item md={8} xs={8}>
          {directionsResponse ?
           null
              :
              <MDTypography mb={1} variant="h6" color="white">
              Tracking Trip ....
            </MDTypography>
          }
          {isLoaded ? 
          <GoogleMap center={center} zoom={15} mapContainerStyle={{ width: '100%', height: '100%' }}
              options={{
                zoomControl: true,
                streetViewControl: true,
                mapTypeControl: true,
                fullscreenControl: true
              }}
              onLoad={(map) => { setMap(map) }}
            >
              {/* Displaying Markers or directions */}
              <Marker position={centerA} />
              {directionsResponse && (<DirectionsRenderer directions={directionsResponse} />)}
  
            </GoogleMap> : <></>}
        {/* <GoogleMap center={center} zoom={15} mapContainerStyle={{ width: '100%', height: '100%' }}
              options={{
                zoomControl: true,
                streetViewControl: true,
                mapTypeControl: true,
                fullscreenControl: true
              }}
              onLoad={(map) => { setMap(map) }}
            >
              <Marker position={center} />
              {directionsResponse && (<DirectionsRenderer directions={directionsResponse} />)}
  
            </GoogleMap> */}
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
