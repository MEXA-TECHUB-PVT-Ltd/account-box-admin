import React, { useState, useEffect } from "react";
import url from "url/url";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDSnackbar from "components/MDSnackbar";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import DotLoader from "react-spinners/DotLoader";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

const override = {
    display: ' block',
    margin: '0 auto',
    alignContent: "center"
    //   borderColor: 'red',
}
const color = "#F69920"
function Users() {
    const navigate = useNavigate();
    // get 
    const EditData = (idData) => {
        console.log(idData)
        navigate('/shopsProfile',
            {
                state: {
                    idDispacher: idData,
                }
            }
        );
    }
    // Delete 
    // Update 
    const closeSuccessSB = () => setSuccessSB(false);
    const closeSuccessSBV = () => setSuccessSBV(false);

    const closeSuccessDelete = () => setSuccessDelete(false);
    const [successSB, setSuccessSB] = useState(false);
    const [successSBV, setSuccessSBV] = useState(false);

    const [successDelete, setSuccessDelete] = useState(false);

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
    // loader 
    const [loadingLoader, setLoadingLoader] = useState(true)

    const getAllData = () => {
        axios.get(`${url}api/shop/get-all`)
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
                                            All Shops
                                        </MDTypography>
                                    </MDBox>

                                    <MDBox >
                                        <MDBox p={2}>
                                            <Grid container spacing={6}>
                                                {user.map((row) => (
                                                    <>
                                                        <Grid item xs={12} md={6} xl={3} style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                EditData(row._id)
                                                            }}>
                                                            <DefaultProjectCard

                                                                image={`${url}${row.img}`}
                                                                label={`Name: ${row.name}`}
                                                                title="shop"
                                                                description={`created at: ${row.created_at}`}
                                                                action={{
                                                                    type: "internal",
                                                                    route: "/pages/profile/profile-overview",
                                                                    color: "info",
                                                                    label: "view project",
                                                                }}
                                                            />
                                                        </Grid>
                                                    </>
                                                ))}

                                            </Grid>
                                        </MDBox>
                                        
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
