// @mui material components
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import url from "url/url";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import axios from "axios";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    console.log(items)
    if (items==null) {
    
    navigate('/authentication/sign-in')


    }else{
      setItems(items);
      console.log("items")
      console.log(items)
      // navigate('/dashboard')
    }
  }, []);
  const [Guests, setGuests] = useState('');
  const [Dispachers, setDispachers] = useState('');
  const [HotelData, setHotelData] = useState('');
  const [Drivers, setDrivers] = useState('');
  const getAllData = () => {
    axios.get(`${url}api/dispacher/allDispachers`)
      .then((response) => {
        console.log(response.data.length)
        const Dispachers = response.data.length;
        // console.log(Dispachers)
        setDispachers(Dispachers);
      })
      .catch(error => console.error(`Error:${error}`));
  }
  
  const getAllHotelData = () => {
    axios.get(`${url}api/hotel/allHotels`)
      .then((response) => {
        const Dispachers = response.data.length;
        console.log(Dispachers)
        setHotelData(Dispachers);
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const getAllDrivers = () => {
    axios.get(`${url}api/driver/allDrivers`)
      .then((response) => {
        const Dispachers = response.data.length;
        console.log(Dispachers)
        setDrivers(Dispachers);
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const getAllGuest = () => {
    axios.get(`${url}api/driver/allDrivers`)
      .then((response) => {
        const Dispachers = response.data.length;
        console.log(Dispachers)
        setGuests(Dispachers);
      })
      .catch(error => console.error(`Error:${error}`));
  }

  useEffect(() => {
    getAllData();
    getAllHotelData();
    getAllDrivers();
    getAllGuest();
 
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="business_icon"
                title="Total Tycoon"
                count={Dispachers}
               
              />
            </MDBox>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="hotel_icon"
                title="Total Subscriptions"
                count={HotelData}
               
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="business_icon"
                title="Total Shops"
                count={Drivers}
               
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="secondary"
                icon="person_icon"
                title="Total Managers"
                count={Guests}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} >
              <MDBox mb={3}>
                <ReportsBarChart
                  color="error"
                  title=" Details"
                  description="Data Representation"
                  date="just updated"
                  chart={{
                    labels: ["Shops", "Managers", "Products","Cashiers"],
                    datasets: { label: "Progress", data: [HotelData, Drivers, Dispachers,Guests] },
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} >
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Details"
                  description="Data Representation"
                  date="just updated"
                  chart={{
                    labels: ["Shops", "Managers", "Products","Cashiers"],
                    datasets: { label: "Progress", data: [HotelData, Drivers, Dispachers,Guests] },
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
