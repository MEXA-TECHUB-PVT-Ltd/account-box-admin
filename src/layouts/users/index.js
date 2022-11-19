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
import Avatar from '@mui/material/Avatar';

import DotLoader from "react-spinners/DotLoader";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MDBadge from "components/MDBadge";
import Box from '@mui/material/Box';

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
        navigate('/adminProfile',
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
    const closeSuccessDelete = () => setSuccessDelete(false);
    const [successDelete, setSuccessDelete] = useState(false);
    // Delete 
    const deleteDataProduct = () => {
        axios.delete(`${url}api/admin/delete/${productId}`
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
            title="Admin Deleted Successfully"
            content="This is a notification message"
            open={successDelete}
            onClose={closeSuccessDelete}
            close={closeSuccessDelete}
            color="success"
            bgWhite
        />
    );
  

    const [user, setUser] = useState([]);

    let columns = [
        {
            title: 'Name', field: 'email', width: '20%', render: (row) =>
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Avatar src={`${url}${row.img}`} />
                  </Grid>
                  <Grid item xs={12} md={8} style={{ marginTop: '10px' }}>
                  {row.email===undefined?<span>Null</span>:<span>{row.email}</span>}
                  </Grid>
                </Grid>
              </>
          },
        { title: 'UserName', field: 'username', width: '10%' , render: (row) =>
        <>
            {row.username===undefined?<span>Null</span>:<span>{row.username}</span>}
        </>},
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
      
        axios.get(`${url}api/admin/get-all`)
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
                                                                Are you sure you want to delete<br /> this Admin?
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
