import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useLocation } from 'react-router-dom';
import DotLoader from "react-spinners/DotLoader";
import Card from "@mui/material/Card";
import Profile from "layouts/tycoons/components/profile";
import axios from "axios";
import url from "url/url";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MDBadge from "components/MDBadge";
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import Badge from '@mui/material/Badge';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import MDSnackbar from "components/MDSnackbar";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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
function DispachersProfile() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [successSBVV, setSuccessSBVV] = useState(false);
    const [SuccessSBVVEdit, setSuccessSBVVEdit] = useState(false);
    const headers = {
        'Content-Type': 'application/json'
    }
    const [IdDataEdit, setIdDataEdit] = useState('');
    const [userNameTycoonEdit, setUserNameTycoonEdit] = useState('');
    const [no_of_shops_createdTycoonEdit, setno_of_shops_createdTycoonEdit] = useState('');
    const [companyLogoEdit, setcompanyLogoEdit] = useState('');
    const [statusTycoonEdit, setStatusTycoonEdit] = useState('');

    // loader 
    const [loadingLoader, setLoadingLoader] = useState(true)
    const getAllData = () => {
        axios.get(`${url}api/tycoon/get-tycoon-by-ID/${state.idDispacher}`)
            .then((response) => {
                console.log('Data User Picddddd')
                console.log(response)
                if (response.data.data[0].profile_image === undefined) {
                    console.log('empty image')
                } else {
                    setcompanyLogoEdit(response.data.data[0].profile_image)
                }
                setIdDataEdit(response.data.data[0]._id)
                setUserNameTycoonEdit(response.data.data[0].username)
                setno_of_shops_createdTycoonEdit(response.data.data[0].no_of_shops_created)
                setStatusTycoonEdit(response.data.data[0].status)
                // setOpenEdit(true);

            })
            .catch(error => console.error(`Error:${error}`));
    }
    // choose image
    const inputRef = useRef(null);

    const handleClick = () => {
        // 👇️ open file input box on click of other element
        inputRef.current.click();
    };
    const [companyLogo, setcompanyLogo] = useState('');

    const onFileChange1 = (e) => {
        const formData = new FormData()
        formData.append('image', e)
        axios.post(`${url}upload-image`,
            formData).then(response => {
                console.log(response.data)
                setcompanyLogo(response.data);
                console.log('resdbb');
                console.log(companyLogo);
                setcompanyLogoEdit(response.data)
            })
    }
    // const handleCloseEdit = () => setOpenEdit(false);
    const closeSuccessSBV = () => setSuccessSBVVEdit(false);
    const closeSuccessSBVV = () => setSuccessSBVV(false);


    const renderSuccessSbVerify = (
        <MDSnackbar
            icon="notifications"
            title="Tycoon Updated Successfully"
            content="This is a notification message"
            open={SuccessSBVVEdit}
            onClose={closeSuccessSBV}
            close={closeSuccessSBV}
            color="success"
            bgWhite
        />
    );
    const renderSuccessSbEmpty = (
        <MDSnackbar
            icon="notifications"
            title="Please Fill All fields"
            content="This is a notification message"
            open={successSBVV}
            onClose={closeSuccessSBVV}
            close={closeSuccessSBVV}
            color="error"
            bgWhite
        />
    );
    const submitHandlerUpdate = () => {
        if (userNameTycoonEdit === '' || statusTycoonEdit === '' || no_of_shops_createdTycoonEdit === '') {
            // setOpenEdit(false)
            setSuccessSBVV(true)
        } else {

            axios.put(`${url}api/tycoon/update-credentials`, {
                _id: IdDataEdit,
                profile_image: companyLogoEdit,
                username: userNameTycoonEdit,
                status: statusTycoonEdit,
                no_of_shops_created: no_of_shops_createdTycoonEdit,


            }, { headers }).then(response => {
                console.log(response)
                if (response.data.message === "Updated Successfully") {
                    // setOpenEdit(false)
                    setSuccessSBVVEdit(true)
                    getAllData();
                    setcompanyLogo('')



                }

            })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    const backTotycoon = () => {
        navigate('/tycoons')

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
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={3} sx={{ display: "flex" }}>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                            <Card sx={{ padding: "30px" }}>
                                <Box >


                                    <Grid container spacing={2}>

                                        <Grid align="center" item xs={12} md={12}>
                                            <Badge color="secondary" sx={{ cursor: "pointer" }} onClick={handleClick} overlap="circular" badgeContent={
                                                <>
                                                    <Icon fontSize="small" >
                                                        edit
                                                    </Icon>
                                                    <input type="file" name="image" placeholder="image" style={{ display: 'none' }}
                                                        ref={inputRef}
                                                        onChange={(e) => onFileChange1(e.target.files[0])} />
                                                </>} >
                                                <Avatar src={`${url}${companyLogoEdit}`} sx={{ width: "200px", height: "200px", border: '1px solid white', marginBottom: '10px' }} />

                                            </Badge>
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <Typography id="transition-modal-title" variant="h6" component="h2" style={{ fontSize: '16px' }}>
                                                Name :
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
                                            <TextField
                                                value={userNameTycoonEdit}
                                                onChange={(e) => setUserNameTycoonEdit(e.target.value)}
                                                style={{ width: '100%' }} variant="outlined" />

                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <Typography id="transition-modal-title" variant="h6" component="h2" style={{ fontSize: '16px' }}>
                                                Status :
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} md={6}>

                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                style={{ width: '100%', height: '30px' }}
                                                value={statusTycoonEdit}
                                                onChange={(e) => setStatusTycoonEdit(e.target.value)}
                                            >
                                                <MenuItem
                                                    style={{ display: 'flex', flexDirection: 'column' }}
                                                    value="block">Block</MenuItem>
                                                <MenuItem
                                                    style={{ display: 'flex', flexDirection: 'column' }}
                                                    value="unblock">Unblock</MenuItem>
                                            </Select>
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <Typography id="transition-modal-title" variant="h6" component="h2" style={{ fontSize: '16px' }}>
                                                No of shops :
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <TextField type="number" value={no_of_shops_createdTycoonEdit}
                                                onChange={(e) => setno_of_shops_createdTycoonEdit(e.target.value)} style={{ width: '100%' }} variant="outlined" />
                                            {/* <input type="text" id="fname" value={no_of_shops_createdTycoonEdit}
                                            onChange={(e) => setno_of_shops_createdTycoonEdit(e.target.value)} 
                                            style={{padding:'6px 10 7px',backgroundColor:'#f5f5dc',borderRadius:'5px',border:'1px solid grey'}}/> */}

                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <MDButton style={{ width: '100%', color: 'white', borderRadius: '10px' }} variant="gradient" color="error" fullWidth onClick={() => { backTotycoon() }}>
                                                Back
                                            </MDButton>
                                        </Grid>
                                        <Grid item xs={12} md={4}>

                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <MDButton style={{ width: '100%', color: 'white', borderRadius: '10px' }} variant="gradient" color="error" fullWidth onClick={() => { submitHandlerUpdate() }}>
                                                Update
                                            </MDButton>
                                        </Grid>

                                    </Grid>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={3} sx={{ display: "flex" }}>
                        </Grid>
                    </Grid>
                    <div>
                        {renderSuccessSbVerify}

                    </div>
                    <div>
                        {renderSuccessSbEmpty}
                    </div>
                    {/* <Profile idProfile={state.idDispacher} /> */}
                    {/* <Profile idProfile={state.idDispacher}/> */}
                    {/* <h1>hello {state.idDispacher}</h1> */}


                </>
            }
        </DashboardLayout>
    );
}

export default DispachersProfile;
