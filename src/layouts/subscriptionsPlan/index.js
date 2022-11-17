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
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Billing page components
import PaymentMethod from "layouts/subscriptionsPlan/components/components/PaymentMethod";
import Invoices from "layouts/subscriptionsPlan/components/components/Invoices";
import BillingInformation from "layouts/subscriptionsPlan/components/components/BillingInformation";
import Transactions from "layouts/subscriptionsPlan/components/components/Transactions";
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
function Users() {
    const navigate = useNavigate();
    const [productId, setProductId] = useState('');
    // get 
    const EditData = (idData) => {
        console.log(idData)
        navigate('/hotelsProfile' ,
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
    const BlockUser = (idData) => {
        setSuccessSB(true)

        console.log(idData)
        // axios.put(`${url}api/hotel/updateHotel`, {
        //     _id: idData,
        //     status: 'block',
        // }, { headers }).then(response => {
        //     console.log(response);
        //     setSuccessSB(true)
        //     getAllData();


        // })
        //     .catch(err => {
        //         console.log(err)
        //     })
    }
    const CheckUser = (idData) => {
        console.log(idData)
        setSuccessSBV(true)

        // axios.put(`${url}api/hotel/updateHotel`, {
        //     _id: idData,
        //     status: 'unblock',
        // }, { headers }).then(response => {
        //     console.log(response);
        //     setSuccessSBV(true)
        //     getAllData();

        // })
        //     .catch(err => {
        //         console.log(err)
        //     })
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
            setVisibleDelete(false)

            setSuccessDelete(true)
        // axios.delete(`${url}api/hotel/deleteHotel/${productId}`
        //     , { headers })
        //     .then(res => {

        //         console.log(res.data);
        //         if (res.data.message === "Deleted Successfully") {
        //             setVisibleDelete(false)
        //             setSuccessDelete(true)
        //             getAllData();
        //             setLoadingLoader(false)
        //         } else {

        //         }

        //     }).catch(err => {
        //         console.log(err)
        //     })

    }

    const renderSuccessDelete = (
        <MDSnackbar
            icon="notifications"
            title="Tycoon Deleted Successfully"
            content="This is a notification message"
            open={successDelete}
            onClose={closeSuccessDelete}
            close={closeSuccessDelete}
            color="success"
            bgWhite
        />
    );
    const renderSuccessSb = (
        <MDSnackbar
            icon="notifications"
            title="Tycoon Blocked Successfully"
            content="This is a notification message"
            open={successSB}
            onClose={closeSuccessSB}
            close={closeSuccessSB}
            color="success"
            bgWhite
        />
    );
    const renderSuccessSbVerify = (
        <MDSnackbar
            icon="notifications"
            title="Tycoon Verified Successfully"
            content="This is a notification message"
            open={successSBV}
            onClose={closeSuccessSBV}
            close={closeSuccessSBV}
            color="success"
            bgWhite
        />
    );

    const [user, setUser] = useState([]);

    let columns = [
        {
            title: 'Name', field: 'username', width: '20%', render: (row) =>
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Avatar src={`${url}${row.profile_image}`} />
                  </Grid>
                  <Grid item xs={12} md={8} style={{ marginTop: '10px' }}>
                  {row.username===undefined?<span>Null</span>:<span>{row.username}</span>}
                  </Grid>
                </Grid>
              </>
          },
        

        { title: 'Email', field: 'email', width: '10%' , render: (row) =>
        <>
          {row.email===undefined?<span>Null</span>:<span>{row.email}</span>}
        </> },
         { title: 'Shops', field: 'no_of_shops_created', width: '10%' , render: (row) =>
         <>
           {row.no_of_shops_created===undefined?<span>Null</span>:<span>{row.no_of_shops_created}</span>}
         </> },
        { title: 'Created At', field: 'created_at', width: '10%', render: (row) =>
        <>
          {row.created_at===undefined?<span>Null</span>:<span>{row.created_at}</span>}
        </> },
        {
            title: 'Profile Status', field: 'status', width: '20%', render: (row) => <div>
                {row.status==='unblock' ?
                    <MDBadge badgeContent="Verified" color="success" variant="gradient" size="sm" />
                    :
                    <MDBadge badgeContent="Blocked" color="error" variant="gradient" size="sm" />

                }

            </div>
        },
        {
            title: 'Actions', width: '10%', field: 'blockStatus',
            render: (row) =>
                <>

                    {row.status==='unblock' ?
                        <Tooltip title="Block Hotel">

                            <Icon fontSize="small" style={{ cursor: 'pointer', color: '#fea21e', marginRight: '5px' }} onClick={() => {
                                BlockUser(row._id)
                            }}>remove_circle_outline_icon</Icon>
                        </Tooltip>

                        :
                        <Tooltip title="Verify Hotel">

                            <Icon fontSize="small" style={{ cursor: 'pointer', color: '#5db461', marginRight: '5px' }} onClick={() => {
                                CheckUser(row._id)
                            }}>check_circle_outline_icon</Icon>
                        </Tooltip>


                    }
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
        axios.get(`${url}api/tycoon/get-all`)
            .then((response) => {
                console.log(response.data)
                const users = response.data;
                setUser(users);
            })
            .catch(error => console.error(`Error:${error}`));
    }
    useEffect(() => {
        getAllData();
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
                                    {/* <Card > */}
                                    <Grid container spacing={3}>
                {/* <Grid item xs={12} md={3}>
                  <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" />
                </Grid> */}
                <Grid item xs={12} md={3} >
                  <DefaultInfoCard
                    icon="account_balance"
                    title="Free Trial"
                    description="No of shops:1"
                    value="$0"
                  />
                </Grid>
                <Grid item xs={12} md={3} >
                  <DefaultInfoCard
                    icon="paypal"
                    title="Monthly"
                    description="No of shops:10"
                    value="$455.00"
                  />
                </Grid>
                <Grid item xs={12} md={3} >
                  <DefaultInfoCard
                    icon="paypal"
                    title="Yealy"
                    description="No of shops:100"
                    value="$1455.00"
                  />
                </Grid>
                <Grid item xs={12} md={3} >
                  <DefaultInfoCard
                    icon="add"
                    title="Add Plan"
                    description="Add shops"
                    value="$0"
                  />
                </Grid>
                <Grid item xs={12}>
                  <PaymentMethod />
                </Grid>
              </Grid>
                                        {/* <MDBox
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
                                        </MDBox> */}

                                        {/* <MDBox >
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
                                                                    Are you sure you want to delete<br/> this Tycoon?
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6} md={6}>
                                                                
                                                                <MDButton variant="gradient" color="error" size="small" onClick={deleteDataProduct} style={{ background: '#F2C75B', color: 'white', borderRadius: '10px' }}>
                                                                    Yes
                                                                </MDButton>
                                                            </Grid>
                                                            <Grid item xs={6} md={6}>
                                                                <Button autoFocus style={{ border: '1px solid #F2C75B', color: '#F2C75B', borderRadius: '10px' }} onClick={() => setVisibleDelete(false)}>
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
                                            <div>
                                                {renderSuccessSb}
                                            </div>
                                            <div>
                                                {renderSuccessSbVerify}
                                            </div>
                                        </MDBox> */}
                                    {/* </Card> */}
                                </Grid>
                            </Grid>
                        </MDBox>
                </>
            }
        </DashboardLayout>
    );
}

export default Users;
