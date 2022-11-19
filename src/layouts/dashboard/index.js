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
  const [ManagersData, setManagersData] = useState('');
  const [ProductsData, setProductsData] = useState('');
  const [CashiersData, setCashiersData] = useState('');


  const [TycoonAll, setTycoonAll] = useState('');
  const [SubscriptionsData, setSubscriptionsData] = useState('');
  const [ShopsData, setShopsData] = useState('');
  const getAllData = () => {
    axios.get(`${url}api/tycoon/get-all`)
      .then((response) => {
        console.log(response.data.length)
        const TycoonAll = response.data.length;
        // console.log(TycoonAll)
        setTycoonAll(TycoonAll);
      })
      .catch(error => console.error(`Error:${error}`));
  }
  
  const getAllSubscriptionsData = () => {
    axios.get(`${url}api/subscription_history/get-all`)
      .then((response) => {
        const TycoonAll = response.data.length;
        console.log(TycoonAll)
        setSubscriptionsData(TycoonAll);
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const getAllShopsData = () => {
    axios.get(`${url}api/shop/get-all`)
      .then((response) => {
        const TycoonAll = response.data.length;
        console.log(TycoonAll)
        setShopsData(TycoonAll);
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const getAllGuest = () => {
    axios.get(`${url}api/managers/get-all`)
      .then((response) => {
        const TycoonAll = response.data.length;
        console.log(TycoonAll)
        setManagersData(TycoonAll);
      })
      .catch(error => console.error(`Error:${error}`));
  }

  const getAllProducts = () => {
    axios.get(`${url}api/shopProducts/get-all`)
      .then((response) => {
        const TycoonAll = response.data.length;
        console.log(TycoonAll)
        setProductsData(TycoonAll);
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const getAllCashiers = () => {
    axios.get(`${url}api/shopCashiers/get-all`)
      .then((response) => {
        const TycoonAll = response.data.length;
        console.log(TycoonAll)
        setCashiersData(TycoonAll);
      })
      .catch(error => console.error(`Error:${error}`));
  }

  useEffect(() => {
    getAllData();
    getAllSubscriptionsData();
    getAllShopsData();
    getAllProducts();
    getAllGuest();
    getAllCashiers();
 
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
                count={TycoonAll}
               
              />
            </MDBox>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="hotel_icon"
                title="Total Subscriptions"
                count={SubscriptionsData}
               
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="business_icon"
                title="Total Shops"
                count={ShopsData}
               
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="secondary"
                icon="person_icon"
                title="Total Managers"
                count={ManagersData}
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
                    labels: ["Subscriptions", "Shops", "Tycoons","Managers","Products","Cashiers"],
                    datasets: { label: "Progress", data: [SubscriptionsData, ShopsData, TycoonAll,ManagersData,ProductsData,CashiersData] },
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
                    labels: ["Subscriptions", "Shops", "Tycoons","Managers","Products","Cashiers"],
                    datasets: { label: "Progress", data: [SubscriptionsData, ShopsData, TycoonAll,ManagersData,ProductsData,CashiersData] },
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
