import React, { useState, useEffect } from "react";
import url from "url/url";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Tooltip from '@mui/material/Tooltip';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDSnackbar from "components/MDSnackbar";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import MaterialTable from 'material-table';
import Button from '@mui/material/Button';
import DotLoader from "react-spinners/DotLoader";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MDBadge from "components/MDBadge";
import Box from '@mui/material/Box';
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import PropTypes from 'prop-types';
import breakpoints from "assets/theme/base/breakpoints";
import Tab from "@mui/material/Tab";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'beige',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};
const override = {
    display: ' block',
    margin: '0 auto',
    alignContent: "center"
    //   borderColor: 'red',
}
const color = "#F69920"
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
function Users() {
    const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
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
    const navigate = useNavigate();
    const [productId, setProductId] = useState('');
    // get 
    const EditData = (idData) => {
        console.log(idData)
        navigate('/ordersProfile',
            {
                state: {
                    idDispacher: idData,
                }
            }
        );

    }
    // Delete 
    const [visibleDelete, setVisibleDelete] = useState(false)
    const deleteData = (idData) => {
        setVisibleDelete(true)
        setProductId(idData)
    }
    const headers = {
        'Content-Type': 'application/json'
    }
    // Update 
    const closeSuccessSB = () => setSuccessSB(false);
    const closeSuccessSBV = () => setSuccessSBV(false);

    const closeSuccessDelete = () => setSuccessDelete(false);
    const [successSB, setSuccessSB] = useState(false);
    const [successSBV, setSuccessSBV] = useState(false);

    const [successDelete, setSuccessDelete] = useState(false);

    // Delete 
    const deleteDataProduct = () => {
        // setLoadingLoader(true)
        // setTimeout(() => {
        axios.delete(`${url}api/Order/deleteOrder/${productId}`
            , { headers })
            .then(res => {

                console.log(res.data);
                if (res.data.acknowledged === true) {
                    setVisibleDelete(false)
                    setSuccessDelete(true)
                    getAllData();
                    setLoadingLoader(false)
                } else {

                }

            }).catch(err => {
                console.log(err)
            })
        // }, 3000)

    }

    const renderSuccessDelete = (
        <MDSnackbar
            icon="notifications"
            title="Order Deleted Successfully"
            content="This is a notification message"
            open={successDelete}
            onClose={closeSuccessDelete}
            close={closeSuccessDelete}
            color="success"
            bgWhite
        />
    );

    const [user, setUser] = useState([]);
    const [scheduled, setScheduled] = useState([]);
    const [ongoing, setOngoing] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [canceled, setCanceled] = useState([]);



    let columns = [
        {
            title: 'Pickup Location', field: 'pickup_location', width: '10%', render: (row) =>
                <>
                    {row.pickup_location === undefined ? <span>Null</span> : <span>{row.pickup_location.slice(0,10)}.....</span>}
                </>
        },
        {
            title: 'dropoff location', field: 'dropoff_location', width: '10%', render: (row) =>
                <>
                    {row.dropoff_location === undefined ? <span>Null</span> : <span>{row.dropoff_location.slice(0,10)}.....</span>}
                </>
        },
        {
            title: 'flight Date', field: 'flight_date', width: '10%', render: (row) =>
                <>
                    {row.flight_date === undefined ? <span>Null</span> : <span>{row.flight_date}</span>}
                </>
        },
        {
            title: 'flight Time', field: 'flight_time', width: '10%', render: (row) =>
                <>
                    {row.flight_time === undefined ? <span>Null</span> : <span>{row.flight_time}</span>}
                </>
        },
        {
            title: ' Status', field: 'status', width: '20%', render: (row) => <div>
                {row.status === 'ongoing' ?
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={1}>
                            <Icon fontSize="small" color="primary">loop_icon</Icon>

                        </Grid>
                        <Grid item xs={12} md={10}>
                            <MDBadge badgeContent="Ongoing" color="primary" variant="gradient" size="sm" />

                        </Grid>
                    </Grid>
                    :
                    null
                }
                {row.status === 'cancel' ?
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={1}>
                            <Icon fontSize="small" color="error">cancel_icon</Icon>

                        </Grid>
                        <Grid item xs={12} md={10}>
                            <MDBadge badgeContent="Canceled" color="error" variant="gradient" size="sm" />

                        </Grid>
                    </Grid>
                    :
                    null
                }
                {row.status === 'schedule' ?
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={1}>
                            <Icon fontSize="small" color="warning">schedule_icon</Icon>

                        </Grid>
                        <Grid item xs={12} md={10}>
                            <MDBadge badgeContent="Scheduled" color="warning" variant="gradient" size="sm" />

                        </Grid>
                    </Grid>
                    :
                    null
                }
                  {row.status === 'completed' ?
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={1}>
                            <Icon fontSize="small" color="success">check_circle_outline_icon</Icon>

                        </Grid>
                        <Grid item xs={12} md={10}>
                            <MDBadge badgeContent="Completed" color="success" variant="gradient" size="sm" />

                        </Grid>
                    </Grid>
                    :
                    null
                }

            </div>
        },
        {
            title: 'Actions', width: '10%', field: 'blockStatus',
            render: (row) =>
                <>
                    <Tooltip title="View">

                        <Icon fontSize="small" style={{ cursor: 'pointer', color: 'grey', marginRight: '5px' }} onClick={() => {
                            EditData(row._id)
                        }}>visibility_icon</Icon>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Icon fontSize="small" style={{ cursor: 'pointer', color: 'red' }} onClick={() => {
                            deleteData(row._id)
                        }}>delete</Icon>
                    </Tooltip>

                </>
        },
    ]
    let columnsCanceled = [
        {
            title: 'Pickup Location', field: 'pickup_location', width: '10%', render: (row) =>
                <>
                    {row.pickup_location === undefined ? <span>Null</span> : <span>{row.pickup_location.slice(0,10)}.....</span>}
                </>
        },
        {
            title: 'dropoff location', field: 'dropoff_location', width: '10%', render: (row) =>
                <>
                    {row.dropoff_location === undefined ? <span>Null</span> : <span>{row.dropoff_location.slice(0,10)}.....</span>}
                </>
        },
        {
            title: 'flight Date', field: 'flight_date', width: '10%', render: (row) =>
                <>
                    {row.flight_date === undefined ? <span>Null</span> : <span>{row.flight_date}</span>}
                </>
        },
        {
            title: 'flight Time', field: 'flight_time', width: '10%', render: (row) =>
                <>
                    {row.flight_time === undefined ? <span>Null</span> : <span>{row.flight_time}</span>}
                </>
        },
        {
            title: 'Reason', field: 'cancellation_reason', width: '10%', render: (row) =>
                <>
                    {row.cancellation_reason === undefined ? <span>Null</span> : <span>{row.cancellation_reason}</span>}
                </>
        },
        {
            title: ' Status', field: 'status', width: '20%', render: (row) => <div>
                {row.status === 'ongoing' ?
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={1}>
                            <Icon fontSize="small" color="primary">loop_icon</Icon>

                        </Grid>
                        <Grid item xs={12} md={10}>
                            <MDBadge badgeContent="Ongoing" color="primary" variant="gradient" size="sm" />

                        </Grid>
                    </Grid>
                    :
                    null
                }
                {row.status === 'cancel' ?
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={1}>
                            <Icon fontSize="small" color="error">cancel_icon</Icon>

                        </Grid>
                        <Grid item xs={12} md={10}>
                            <MDBadge badgeContent="Canceled" color="error" variant="gradient" size="sm" />

                        </Grid>
                    </Grid>
                    :
                    null
                }
                {row.status === 'schedule' ?
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={1}>
                            <Icon fontSize="small" color="warning">schedule_icon</Icon>

                        </Grid>
                        <Grid item xs={12} md={10}>
                            <MDBadge badgeContent="Scheduled" color="warning" variant="gradient" size="sm" />

                        </Grid>
                    </Grid>
                    :
                    null
                }
                  {row.status === 'completed' ?
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={1}>
                            <Icon fontSize="small" color="success">check_circle_outline_icon</Icon>

                        </Grid>
                        <Grid item xs={12} md={10}>
                            <MDBadge badgeContent="Completed" color="success" variant="gradient" size="sm" />

                        </Grid>
                    </Grid>
                    :
                    null
                }

            </div>
        },
        {
            title: 'Actions', width: '10%', field: 'blockStatus',
            render: (row) =>
                <>
                    <Tooltip title="View">

                        <Icon fontSize="small" style={{ cursor: 'pointer', color: 'grey', marginRight: '5px' }} onClick={() => {
                            EditData(row._id)
                        }}>visibility_icon</Icon>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Icon fontSize="small" style={{ cursor: 'pointer', color: 'red' }} onClick={() => {
                            deleteData(row._id)
                        }}>delete</Icon>
                    </Tooltip>

                </>
        },
    ]
    // loader 
    const [loadingLoader, setLoadingLoader] = useState(true)

    const getAllData = () => {
        axios.get(`${url}api/Order/allOrders`)
            .then((response) => {
                console.log(response.data)
                const users = response.data;
                setUser(users);
            })
            .catch(error => console.error(`Error:${error}`));
    }
    const getAllDataScheduled = () => {
        axios.get(`${url}api/Order/getOrdersScheduled/schedule`)
            .then((response) => {
                console.log(response.data)
                const users = response.data;
                setScheduled(users);
            })
            .catch(error => console.error(`Error:${error}`));
    }  
     const getAllDataOngoing = () => {
        axios.get(`${url}api/Order/getOrdersScheduled/ongoing`)
            .then((response) => {
                console.log(response.data)
                const users = response.data;
                setOngoing(users);
            })
            .catch(error => console.error(`Error:${error}`));
    }
      const getAllDataCompleted = () => {
        axios.get(`${url}api/Order/getOrdersScheduled/completed`)
            .then((response) => {
                console.log(response.data)
                const users = response.data;
                setCompleted(users);
            })
            .catch(error => console.error(`Error:${error}`));
    }
    const getAllDataCanceled = () => {
        axios.get(`${url}api/Order/getOrdersScheduled/cancel`)
            .then((response) => {
                console.log(response.data)
                const users = response.data;
                setCanceled(users);
            })
            .catch(error => console.error(`Error:${error}`));
    }
    useEffect(() => {
        getAllData();
        getAllDataScheduled();
        getAllDataOngoing();
        getAllDataCompleted();
        getAllDataCanceled();
        setLoadingLoader(true)
        setTimeout(() => {
            setLoadingLoader(false)

        }, 3000)
    }, []);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('items'));
        if (items) {
            setItems(items);
            console.log("items")
            console.log(items)
        }
    }, []);
    return (
        <DashboardLayout>
            <DashboardNavbar data={items} />
            {loadingLoader ?
                <Grid container spacing={6} style={{ padding: '20px' }}>
                    <Grid item xs={12} md={6} >
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <DotLoader color={color} loading={loadingLoader} css={override} size={30} />
                    </Grid>
                </Grid>
                :
                <>
                    <MDBox pt={6} pb={3}>
                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                <Card >
                                    <MDBox
                                        mx={2}
                                        mt={-3}
                                        py={3}
                                        px={2}
                                        variant="gradient"
                                        bgColor="error"
                                        borderRadius="lg"
                                        coloredShadow="error"
                                    >

                                        <MDTypography variant="h6" fontWeight="medium" color="white">
                                            All Data
                                        </MDTypography>
                                    </MDBox>
                                    <MDBox >
                                    <Grid container spacing={1}>
            <Grid item xs={12} md={12} sx={{ ml: "auto" }}>
              <AppBar position="static">
                <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                  <Tab
                    label="All Orders"
                    icon={
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        format_list_bulleted_icon
                      </Icon>
                    }
                  />
                  <Tab
                    label="Scheduled"
                    icon={
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        emoji_transportation_icon
                      </Icon>
                    }
                  />
                  <Tab
                    label="Ongoing"
                    icon={
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        loop_icon
                      </Icon>
                    }
                  />
                   <Tab
                    label="Completed"
                    icon={
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                       done_all_icon
                      </Icon>
                    }
                  />
                  <Tab
                    label="Canceled"
                    icon={
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        do_not_disturb_icon
                      </Icon>
                    }
                  />
                </Tabs>
              </AppBar>
              <TabPanel value={tabValue} index={0}>
              <MDBox >
                                        <MaterialTable
                                            title=""
                                            columns={columns}
                                            data={user}
                                            options={{
                                                headerStyle: { opacity: 0.7, fontWeight: 700 },
                                                rowStyle: {
                                                    fontSize: '12px',
                                                },
                                                filter: true,
                                                exportButton: true,
                                                tableLayout: "auto",
                                                sorting: true,
                                                actionsColumnIndex: -1
                                            }}
                                        />
                                        <div>
                                            <Modal
                                                open={visibleDelete}
                                                onClose={() => setVisibleDelete(false)}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <Grid container spacing={2} align="center">
                                                        <Grid item xs={12} md={12}>
                                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                                Are you sure you want to delete<br /> this Order?
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}>
                                                           
                                                            <MDButton variant="gradient" color="error" size="small" onClick={deleteDataProduct} style={{ background: '#564cb9', color: 'white', borderRadius: '10px' }}>
                                                                Yes
                                                            </MDButton>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}>
                                                            <Button autoFocus style={{ border: '1px solid #564cb9', color: '#564cb9', borderRadius: '10px' }} onClick={() => setVisibleDelete(false)}>
                                                                No
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Modal>
                                        </div>
                                        <div>
                                            {renderSuccessDelete}
                                        </div>
                                    </MDBox>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
              <MDBox >
                                        <MaterialTable
                                            title=""
                                            columns={columns}
                                            data={scheduled}
                                            options={{
                                                headerStyle: { opacity: 0.7, fontWeight: 700 },
                                                rowStyle: {
                                                    fontSize: '12px',
                                                },
                                                filter: true,
                                                exportButton: true,
                                                tableLayout: "auto",
                                                sorting: true,
                                                actionsColumnIndex: -1
                                            }}
                                        />
                                        <div>
                                            <Modal
                                                open={visibleDelete}
                                                onClose={() => setVisibleDelete(false)}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <Grid container spacing={2} align="center">
                                                        <Grid item xs={12} md={12}>
                                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                                Are you sure you want to delete<br /> this Order?
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}>
                                                           
                                                            <MDButton variant="gradient" color="error" size="small" onClick={deleteDataProduct} style={{ background: '#564cb9', color: 'white', borderRadius: '10px' }}>
                                                                Yes
                                                            </MDButton>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}>
                                                            <Button autoFocus style={{ border: '1px solid #564cb9', color: '#564cb9', borderRadius: '10px' }} onClick={() => setVisibleDelete(false)}>
                                                                No
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Modal>
                                        </div>
                                        <div>
                                            {renderSuccessDelete}
                                        </div>
                                    </MDBox>
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
              <MDBox >
                                        <MaterialTable
                                            title=""
                                            columns={columns}
                                            data={ongoing}
                                            options={{
                                                headerStyle: { opacity: 0.7, fontWeight: 700 },
                                                rowStyle: {
                                                    fontSize: '12px',
                                                },
                                                filter: true,
                                                exportButton: true,
                                                tableLayout: "auto",
                                                sorting: true,
                                                actionsColumnIndex: -1
                                            }}
                                        />
                                        <div>
                                            <Modal
                                                open={visibleDelete}
                                                onClose={() => setVisibleDelete(false)}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <Grid container spacing={2} align="center">
                                                        <Grid item xs={12} md={12}>
                                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                                Are you sure you want to delete<br /> this Order?
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}>
                                                           
                                                            <MDButton variant="gradient" color="error" size="small" onClick={deleteDataProduct} style={{ background: '#564cb9', color: 'white', borderRadius: '10px' }}>
                                                                Yes
                                                            </MDButton>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}>
                                                            <Button autoFocus style={{ border: '1px solid #564cb9', color: '#564cb9', borderRadius: '10px' }} onClick={() => setVisibleDelete(false)}>
                                                                No
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Modal>
                                        </div>
                                        <div>
                                            {renderSuccessDelete}
                                        </div>
                                    </MDBox>
                </TabPanel>
                <TabPanel value={tabValue} index={3}>
              <MDBox >
                                        <MaterialTable
                                            title=""
                                            columns={columns}
                                            data={completed}
                                            options={{
                                                headerStyle: { opacity: 0.7, fontWeight: 700 },
                                                rowStyle: {
                                                    fontSize: '12px',
                                                },
                                                filter: true,
                                                exportButton: true,
                                                tableLayout: "auto",
                                                sorting: true,
                                                actionsColumnIndex: -1
                                            }}
                                        />
                                        <div>
                                            <Modal
                                                open={visibleDelete}
                                                onClose={() => setVisibleDelete(false)}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <Grid container spacing={2} align="center">
                                                        <Grid item xs={12} md={12}>
                                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                                Are you sure you want to delete<br /> this Order?
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}>
                                                           
                                                            <MDButton variant="gradient" color="error" size="small" onClick={deleteDataProduct} style={{ background: '#564cb9', color: 'white', borderRadius: '10px' }}>
                                                                Yes
                                                            </MDButton>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}>
                                                            <Button autoFocus style={{ border: '1px solid #564cb9', color: '#564cb9', borderRadius: '10px' }} onClick={() => setVisibleDelete(false)}>
                                                                No
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Modal>
                                        </div>
                                        <div>
                                            {renderSuccessDelete}
                                        </div>
                                    </MDBox>
                </TabPanel>
                <TabPanel value={tabValue} index={4}>
              <MDBox >
                                        <MaterialTable
                                            title=""
                                            columns={columnsCanceled}
                                            data={canceled}
                                            options={{
                                                headerStyle: { opacity: 0.7, fontWeight: 700 },
                                                rowStyle: {
                                                    fontSize: '12px',
                                                },
                                                filter: true,
                                                exportButton: true,
                                                tableLayout: "auto",
                                                sorting: true,
                                                actionsColumnIndex: -1
                                            }}
                                        />
                                        <div>
                                            <Modal
                                                open={visibleDelete}
                                                onClose={() => setVisibleDelete(false)}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <Grid container spacing={2} align="center">
                                                        <Grid item xs={12} md={12}>
                                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                                Are you sure you want to delete<br /> this Order?
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}>
                                                           
                                                            <MDButton variant="gradient" color="error" size="small" onClick={deleteDataProduct} style={{ background: '#564cb9', color: 'white', borderRadius: '10px' }}>
                                                                Yes
                                                            </MDButton>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}>
                                                            <Button autoFocus style={{ border: '1px solid #564cb9', color: '#564cb9', borderRadius: '10px' }} onClick={() => setVisibleDelete(false)}>
                                                                No
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Modal>
                                        </div>
                                        <div>
                                            {renderSuccessDelete}
                                        </div>
                                    </MDBox>
                </TabPanel>
                </Grid>
                </Grid>
                
                                    </MDBox>

                                  
                                </Card>
                            </Grid>
                        </Grid>
                    </MDBox>
                </>
            }
        </DashboardLayout>
    );
}

export default Users;
