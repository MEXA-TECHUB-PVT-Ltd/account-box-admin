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
import Box from '@mui/material/Box';
import DummyImg from "assets/images/dummy.jpg"
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
        navigate('/subscriptionsProfile' ,
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
            // setVisibleDelete(false)

            // setSuccessDelete(true)
        axios.delete(`${url}api/subscription_history/delete/${productId}`
            , { headers })
            .then(res => {

                console.log(res.data);
                if (res.data.message === "Deleted Successfully") {
                    setVisibleDelete(false)
                    setSuccessDelete(true)
                    getAllData();
                    setLoadingLoader(false)
                } else {

                }

            }).catch(err => {
                console.log(err)
            })

    }

    const renderSuccessDelete = (
        <MDSnackbar
            icon="notifications"
            title="Subscription History Deleted Successfully"
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
            title="Subscription History Blocked Successfully"
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
            title="Subscription History Verified Successfully"
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
                  <Grid item xs={12} md={6}>
                   {(row.tycoon_id===null)||(row.tycoon_id===undefined)?<Avatar src={DummyImg}/>: <Avatar src={`${url}${row.tycoon_id.profile_image}`} />}
                   
                  </Grid>
                  <Grid item xs={12} md={6} style={{ marginTop: '10px' }}>
                  {(row.tycoon_id===null)||(row.tycoon_id===undefined)?<span>Null</span>:<span>{row.tycoon_id.username}</span>}
                  </Grid>
                </Grid>
              </>
          },
        

        { title: 'Email', field: 'email', width: '10%' , render: (row) =>
        <>
           {(row.tycoon_id===null)||(row.tycoon_id===undefined)?<span>Null</span>:<span>{row.tycoon_id.email}</span>}
        </> },
         { title: 'Subscription Plan', field: 'subscription_plans_id', width: '10%' , render: (row) =>
         <>
           {row.subscription_plans_id===undefined?<span>Null</span>:<span>{row.subscription_plans_id.name}</span>}
         </> },
        { title: 'Price per Month', field: 'created_at', width: '10%', render: (row) =>
        <>
          {row.subscription_plans_id===undefined?<span>Null</span>:<span>{row.subscription_plans_id.price_per_month}</span>}
        </> },
         { title: 'Start Date', field: 'start_date', width: '10%', render: (row) =>
         <>
           {row.start_date===undefined?<span>Null</span>:<span>{row.start_date}</span>}
         </> },
          { title: 'End Date', field: 'end_date', width: '10%', render: (row) =>
          <>
            {row.end_date===undefined?<span>Null</span>:<span>{row.end_date}</span>}
          </> },
       
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
        // const users= [
        //     {
        //         "_id": "636dfbbed1cb96d86e305177",
        //         "email": "tycoon@gmail.com",
        //         "password": "$2b$12$5VZiYFlS7GaA.A19tu9rK.tmP7nf2G5/J0UVTGEVy9l7ix5TXLxja",
        //         "username": "Tycoon",
        //         "profile_image": "/upload/image-16681465013762.PNG",
        //         "status": "block",
        //         "no_of_shops_created": "0",
        //         "created_at": "27/10/2022",
        //         "__v": 0,
        //         "isLogin": true
        //     }
        // ]
        // setUser(users);
        axios.get(`${url}api/subscription_history/get-all`)
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
                                                                    Are you sure you want to delete<br/> this Subscription History?
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6} md={6}>
                                                                {/* <Button autoFocus onClick={deleteDataProduct} style={{ background: 'linear-gradient(195deg, #5fb663, #3ccf42)', color: 'white', borderRadius: '10px' }}>
                                                                Yes
                                                            </Button> */}
                                                                <MDButton variant="gradient" color="error" size="small" onClick={deleteDataProduct} style={{ background: '#F2C75B', color: 'white', borderRadius: '10px' }}>
                                                                    Yes
                                                                </MDButton>
                                                            </Grid>
                                                            <Grid item xs={6} md={6}>
                                                                <Button size="small" autoFocus style={{ border: '1px solid #F2C75B', color: '#F2C75B', borderRadius: '10px' }} onClick={() => setVisibleDelete(false)}>
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
