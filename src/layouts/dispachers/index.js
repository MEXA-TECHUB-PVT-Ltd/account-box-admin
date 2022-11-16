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
        navigate('/dispachersProfile' ,
        {
            state: {
                idDispacher: idData,
            }
        }
        );
        // setLoadingLoader(true)

        // setAddData(true)
        // setTableData(false)
        // setEditData(false)

        // setTimeout(() => {
        //     axios.get(`${url}api/user/specificUser/${idData}`)
        //         .then((response) => {
        //             console.log('History')
        //             console.log(response.data[0])
        //             // setUserEmail(response.data[0].userEmailAddress)
        //             // setUserName(response.data[0].userName)
        //             // setDateOfBirth(response.data[0].dateOfBirth)
        //             // setGender(response.data[0].gender)
        //             setLoadingLoader(false)
        //             setAddData(true)
        //             setTableData(false)
        //             setEditData(false)


        //         })
        //         .catch(error => console.error(`Error:${error}`));
        // }, 3000)


    }
    // Delete 
    const [visibleDelete, setVisibleDelete] = useState(false)
    const deleteData = (idData) => {
        setVisibleDelete(true)
        setProductId(idData)
    }
    const BlockUser = (idData) => {
        console.log(idData)
        axios.put(`${url}api/dispacher/updateDispacher`, {
            _id: idData,
            status: 'block',
        }, { headers }).then(response => {
            console.log(response);
            setSuccessSB(true)
            getAllData();


        })
            .catch(err => {
                console.log(err)
            })
    }
    const CheckUser = (idData) => {
        console.log(idData)
        axios.put(`${url}api/dispacher/updateDispacher`, {
            _id: idData,
            status: 'unblock',
        }, { headers }).then(response => {
            console.log(response);
            setSuccessSBV(true)
            getAllData();

        })
            .catch(err => {
                console.log(err)
            })
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
        axios.delete(`${url}api/dispacher/deleteDispacher/${productId}`
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
            title="Dispacher Deleted Successfully"
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
            title="Dispacher Blocked Successfully"
            content="This is a notification message"
            open={successSB}
            onClose={closeSuccessSB}
            close={closeSuccessSB}
            color="error"
            bgWhite
        />
    );
    const renderSuccessSbVerify = (
        <MDSnackbar
            icon="notifications"
            title="Dispacher Verified Successfully"
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
            title: 'Name', field: 'email', width: '20%', render: (row) =>
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Avatar src={`${url}${row.img}`} />
                  </Grid>
                  <Grid item xs={12} md={8} style={{ marginTop: '10px' }}>
                  {row.name_of_company===undefined?<span>Null</span>:<span>{row.name_of_company}</span>}
                  </Grid>
                </Grid>
              </>
          },
        { title: 'Email', field: 'email', width: '10%', render: (row) =>
        <>
          {row.email===undefined?<span>Null</span>:<span>{row.email}</span>}
        </> },

        { title: 'phone No', field: 'phoneno', width: '10%' , render: (row) =>
        <>
          {row.phoneno===undefined?<span>Null</span>:<span>{row.phoneno}</span>}
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
                        <Tooltip title="Block User">

                            <Icon fontSize="small" style={{ cursor: 'pointer', color: '#fea21e', marginRight: '5px' }} onClick={() => {
                                BlockUser(row._id)
                            }}>remove_circle_outline_icon</Icon>
                        </Tooltip>

                        :
                        <Tooltip title="Verify User">

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
        axios.get(`${url}api/dispacher/allDispachers`)
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
                                                                    Are you sure you want to delete<br/> this dispacher?
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6} md={6}>
                                                                {/* <Button autoFocus onClick={deleteDataProduct} style={{ background: 'linear-gradient(195deg, #5fb663, #3ccf42)', color: 'white', borderRadius: '10px' }}>
                                                                Yes
                                                            </Button> */}
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
