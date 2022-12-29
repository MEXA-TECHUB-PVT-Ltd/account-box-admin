import React, { useState, useEffect, useRef } from "react";
import url from "url/url";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Tooltip from '@mui/material/Tooltip';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDSnackbar from "components/MDSnackbar";
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Badge from '@mui/material/Badge';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
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
import Backdrop from '@mui/material/Backdrop';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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
function Users() {
    const navigate = useNavigate();
    const [productId, setProductId] = useState('');
    // get 
    const EditData = (idData) => {
        console.log(idData)
        navigate('/tycoonProfile',
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
        // setSuccessSB(true)

        // console.log(idData)
        axios.put(`${url}api/tycoon/update-credentials`, {
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
        // console.log(idData)
        // setSuccessSBV(true)

        axios.put(`${url}api/tycoon/update-credentials`, {
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
    const closeSuccessSBVV = () => setSuccessSBVV(false);
    const closeSuccessSBVVADD = () => setSuccessSBVVADD(false);
    const closeSuccessEmailExist = () => setSuccessEmailExist(false);
    const closeSuccessSBVVEdit = () => setSuccessSBVVEdit(false);

    const closeSuccessDelete = () => setSuccessDelete(false);
    const [successSB, setSuccessSB] = useState(false);
    const [successSBV, setSuccessSBV] = useState(false);

    const [successDelete, setSuccessDelete] = useState(false);
    const [successSBVV, setSuccessSBVV] = useState(false);

    const [successSBVVADD, setSuccessSBVVADD] = useState(false);
    const [successEmailExist, setSuccessEmailExist] = useState(false);
    const [SuccessSBVVEdit, setSuccessSBVVEdit] = useState(false);


    // Delete 
    const deleteDataProduct = () => {
        // setVisibleDelete(false)

        // setSuccessDelete(true)
        axios.delete(`${url}api/tycoon/delete/${productId}`
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
            title="Tycoon Deleted Successfully"
            content="This is a notification message"
            open={successDelete}
            onClose={closeSuccessDelete}
            close={closeSuccessDelete}
            color="success"
            bgWhite
        />
    );
    const renderSuccessSbADD = (
        <MDSnackbar
            icon="notifications"
            title="Tycoon Created Successfully"
            content="This is a notification message"
            open={successSBVVADD}
            onClose={closeSuccessSBVVADD}
            close={closeSuccessSBVVADD}
            color="success"
            bgWhite
        />
    );
    const renderSuccessSbEdit = (
        <MDSnackbar
            icon="notifications"
            title="Tycoon Updated Successfully"
            content="This is a notification message"
            open={SuccessSBVVEdit}
            onClose={closeSuccessSBVVEdit}
            close={closeSuccessSBVVEdit}
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
    const renderSuccessSbVV = (
        <MDSnackbar
            icon="notifications"
            title="Please fill all fields to continue!"
            content="This is a notification message"
            open={successSBVV}
            onClose={closeSuccessSBVV}
            close={closeSuccessSBVV}
            color="error"
            bgWhite
        />
    );
    const renderSuccessEmailExist = (
        <MDSnackbar
            icon="notifications"
            title="Email Already Exist!"
            content="This is a notification message"
            open={successEmailExist}
            onClose={closeSuccessEmailExist}
            close={closeSuccessEmailExist}
            color="error"
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
                            {row.username === undefined ? <span>Null</span> : <span>{row.username}</span>}
                        </Grid>
                    </Grid>
                </>
        },


        {
            title: 'Email', field: 'email', width: '10%', render: (row) =>
                <>
                    {row.email === undefined ? <span>Null</span> : <span>{row.email}</span>}
                </>
        },
        {
            title: 'Shops', field: 'no_of_shops_created', width: '10%', render: (row) =>
                <>
                    {row.no_of_shops_created === undefined ? <span>Null</span> : <span>{row.no_of_shops_created}</span>}
                </>
        },
        {
            title: 'Created At', field: 'created_at', width: '10%', render: (row) =>
                <>
                    {row.created_at === undefined ? <span>Null</span> : <span>{row.created_at}</span>}
                </>
        },
        {
            title: 'Profile Status', field: 'status', width: '20%', render: (row) => <div>
                {row.status === 'unblock' ?
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

                    {row.status === 'unblock' ?
                        <Tooltip title="Block Tycoon">

                            <Icon fontSize="small" style={{ cursor: 'pointer', color: '#fea21e', marginRight: '5px' }} onClick={() => {
                                BlockUser(row._id)
                            }}>remove_circle_outline_icon</Icon>
                        </Tooltip>

                        :
                        <Tooltip title="Verify Tycoon">

                            <Icon fontSize="small" style={{ cursor: 'pointer', color: '#5db461', marginRight: '5px' }} onClick={() => {
                                CheckUser(row._id)
                            }}>check_circle_outline_icon</Icon>
                        </Tooltip>
                    }
                    <Tooltip title="Edit">

                        <Icon fontSize="small" style={{ cursor: 'pointer', color: '#fea21e', marginRight: '5px' }} onClick={() => {
                            handleOpenEdit(row._id)
                        }}>edit_icon</Icon>
                    </Tooltip>
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
    // Add tycoon 
    // choose image
    const inputRef = useRef(null);

    const handleClick = () => {
        // 👇️ open file input box on click of other element
        inputRef.current.click();
    };
    const [companyLogo, setcompanyLogo] = useState('');
    const [companyLogoEdit, setcompanyLogoEdit] = useState('');

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
    const [userNameTycoon, setUserNameTycoon] = useState('');
    const [emailTycoon, setEmailTycoon] = useState('');
    const [passwordTycoon, setPasswordTycoon] = useState('');
    const [statusTycoon, setStatusTycoon] = useState('');
    const [no_of_shops_createdTycoon, setno_of_shops_createdTycoon] = useState('');


    const [openAdd, setOpenAdd] = React.useState(false);
    const handleOpenAdd = () => {
        setOpenAdd(true);
    }
    const handleCloseAdd = () => setOpenAdd(false);
    const [userNameTycoonEdit, setUserNameTycoonEdit] = useState('');
    const [IdDataEdit, setIdDataEdit] = useState('');

    const [statusTycoonEdit, setStatusTycoonEdit] = useState('');
    const [no_of_shops_createdTycoonEdit, setno_of_shops_createdTycoonEdit] = useState('');
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = (idData) => {
        console.log(idData)
        console.log(idData)
        navigate('/editTycoon',
            {
                state: {
                    idDispacher: idData,
                }
            }
        );
        // axios.get(`${url}api/tycoon/get-tycoon-by-ID/${idData}`)
        //     .then((response) => {
        //         console.log('Data User Picddddd')
        //         console.log(response)
        //         if (response.data.data[0].profile_image === undefined) {
        //             console.log('empty image')
        //         } else {
        //             setcompanyLogoEdit(response.data.data[0].profile_image)
        //         }
        //         setIdDataEdit(response.data.data[0]._id)
        //         setUserNameTycoonEdit(response.data.data[0].username)
        //         setno_of_shops_createdTycoonEdit(response.data.data[0].no_of_shops_created)
        //         setStatusTycoonEdit(response.data.data[0].status)
        //         setOpenEdit(true);

        //     })
        //     .catch(error => console.error(`Error:${error}`));
    }
    const handleCloseEdit = () => setOpenEdit(false);
    const submitHandlerUpdate = () => {
        if (userNameTycoonEdit === '' || statusTycoonEdit === '' || no_of_shops_createdTycoonEdit === '') {
            setOpenEdit(false)
            setSuccessSBVV(true)
        } else {

            axios.put(`${url}api/tycoon/update-credentials`, {
                _id:IdDataEdit,
                profile_image: companyLogoEdit,
                username: userNameTycoonEdit,
                status: statusTycoonEdit,
                no_of_shops_created: no_of_shops_createdTycoonEdit,


            }, { headers }).then(response => {
                console.log(response)
                if (response.data.message === "Updated Successfully") {
                    setOpenEdit(false)
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
    const submitHandler1 = () => {
        if (userNameTycoon === '' || emailTycoon === '' || passwordTycoon === '' || statusTycoon === '' || no_of_shops_createdTycoon === '') {
            setOpenAdd(false)
            setSuccessSBVV(true)
        } else {
            const date = new Date()
            console.log(date)
            axios.post(`${url}api/tycoon/create`, {
                profile_image: companyLogo,
                username: userNameTycoon,
                email: emailTycoon,
                password: passwordTycoon,
                status: statusTycoon,
                no_of_shops_created: no_of_shops_createdTycoon,
                created_at: date,


            }, { headers }).then(response => {
                console.log(response)
                if (response.data.message === "Created Successfully") {
                    setOpenAdd(false)
                    setSuccessSBVVADD(true)
                    getAllData();
                    setcompanyLogo('');
                    setUserNameTycoon('');
                    setEmailTycoon('');
                    setPasswordTycoon('');
                    setStatusTycoon('');
                    setno_of_shops_createdTycoon('');

                } else if (response.data.message === "Email Already Exist") {
                    // setOpenAdd(false)
                    setSuccessEmailExist(true)
                    getAllData();
                    setcompanyLogo('');
                    setUserNameTycoon('');
                    setEmailTycoon('');
                    setPasswordTycoon('');
                    setStatusTycoon('');
                    setno_of_shops_createdTycoon('');
                }

            })
                .catch(err => {
                    console.log(err)
                })
        }


    }
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
                                            actions={[
                                                {
                                                    icon: 'add',
                                                    iconProps: { style: { color: "#757575" } },
                                                    tooltip: 'Add Tycoon',
                                                    isFreeAction: true,
                                                    onClick: (event) => handleOpenAdd()
                                                }
                                            ]}
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
                                        {/* Edit  */}
                                        <div>
                                            <Modal
                                                aria-labelledby="transition-modal-title"
                                                aria-describedby="transition-modal-description"
                                                open={openEdit}
                                                onClose={handleCloseEdit}
                                                closeAfterTransition
                                                BackdropComponent={Backdrop}
                                                BackdropProps={{
                                                    timeout: 500,
                                                }}
                                            >
                                                <Fade in={openEdit}>
                                                    <Box sx={style}>

                                                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                                        </Typography>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={10} md={10}>
                                                                <Typography id="transition-modal-title" variant="h5" component="h2" style={{fontWeight:'bolder',fontSize:'18px'}}>
                                                                    Edit Tycoon
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={1} md={1}>
                                                                {/* <MDButton  variant="gradient" color="error"  > */}
                                                                <CloseIcon onClick={handleCloseEdit} style={{ cursor: 'pointer' }} />

                                                                {/* </MDButton> */}
                                                            </Grid>
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
                                                                <Typography id="transition-modal-title" variant="h6" component="h2" style={{fontSize:'16px'}}>
                                                                    Name :
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6} md={6}>
                                                            {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
                                                                <TextField
                                                                    value={userNameTycoonEdit}
                                                                    onChange={(e) => setUserNameTycoonEdit(e.target.value)}
                                                                    style={{ width: '100%'}}  variant="outlined" />

                                                            </Grid>
                                                            <Grid item xs={6} md={6}>
                                                                <Typography id="transition-modal-title" variant="h6" component="h2" style={{fontSize:'16px'}}>
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
                                                                <Typography id="transition-modal-title" variant="h6" component="h2" style={{fontSize:'16px'}}>
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

                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MDButton style={{ width: '100%',color:'white',borderRadius:'10px' }} variant="gradient" color="error" fullWidth onClick={() => { submitHandlerUpdate() }}>
                                                                    Update
                                                                </MDButton>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>

                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Fade>
                                            </Modal>
                                        </div>
                                        <div>
                                            <Modal
                                                aria-labelledby="transition-modal-title"
                                                aria-describedby="transition-modal-description"
                                                open={openAdd}
                                                onClose={handleCloseAdd}
                                                closeAfterTransition
                                                BackdropComponent={Backdrop}
                                                BackdropProps={{
                                                    timeout: 500,
                                                }}
                                            >
                                                <Fade in={openAdd}>
                                                    <Box sx={style}>

                                                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                                        </Typography>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={10} md={10}>
                                                                <Typography id="transition-modal-title" variant="h5" component="h2" style={{fontWeight:'bolder',fontSize:'18px'}}>
                                                                    Add Tycoon
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={1} md={1}>
                                                                {/* <MDButton  variant="gradient" color="error"  > */}
                                                                <CloseIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />

                                                                {/* </MDButton> */}
                                                            </Grid>
                                                            <Grid align="center" item xs={12} md={12}>
                                                                <Badge color="secondary" sx={{ cursor: "pointer" }} onClick={handleClick} overlap="circular" badgeContent={
                                                                    <>
                                                                        <Icon fontSize="small" >
                                                                            add
                                                                        </Icon>
                                                                        <input type="file" name="image" placeholder="image" style={{ display: 'none' }}
                                                                            ref={inputRef}
                                                                            onChange={(e) => onFileChange1(e.target.files[0])} />
                                                                    </>} >
                                                                    <Avatar src={`${url}${companyLogo}`} sx={{ width: "200px", height: "200px", border: '1px solid white', marginBottom: '10px' }} />

                                                                </Badge>
                                                            </Grid>
                                                            <Grid item xs={6} md={6}>
                                                                <Typography id="transition-modal-title" variant="h6" component="h2" style={{fontSize:'16px'}}>
                                                                    Name :
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6} md={6}>
                                                                <TextField
                                                                    value={userNameTycoon}
                                                                    onChange={(e) => setUserNameTycoon(e.target.value)}
                                                                    style={{ width: '100%' }} variant="outlined" />

                                                            </Grid>
                                                            <Grid item xs={6} md={6}>
                                                                <Typography id="transition-modal-title" variant="h6" component="h2" style={{fontSize:'16px'}}>
                                                                    Email :
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6} md={6}>
                                                                <TextField

                                                                    value={emailTycoon}
                                                                    onChange={(e) => setEmailTycoon(e.target.value)}
                                                                    style={{ width: '100%' }} variant="outlined" />

                                                            </Grid>
                                                            <Grid item xs={6} md={6}>
                                                                <Typography id="transition-modal-title" variant="h6" component="h2" style={{fontSize:'16px'}}>
                                                                    Password :
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6} md={6}>
                                                                <TextField value={passwordTycoon}
                                                                    onChange={(e) => setPasswordTycoon(e.target.value)} style={{ width: '100%' }} variant="outlined" />

                                                            </Grid>
                                                            <Grid item xs={6} md={6}>
                                                                <Typography id="transition-modal-title" variant="h6" component="h2" style={{fontSize:'16px'}}>
                                                                    Status :
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6} md={6}>

                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    style={{ width: '100%', height: '30px' }}
                                                                    value={statusTycoon}
                                                                    onChange={(e) => setStatusTycoon(e.target.value)}
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
                                                                <Typography id="transition-modal-title" variant="h6" component="h2" style={{fontSize:'16px'}}>
                                                                    No of shops :
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6} md={6}>
                                                                <TextField type="number" value={no_of_shops_createdTycoon}
                                                                    onChange={(e) => setno_of_shops_createdTycoon(e.target.value)} style={{ width: '100%' }} variant="outlined" />

                                                            </Grid>
                                                            <Grid item xs={12} md={4}>

                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MDButton style={{ width: '100%',color:'white',borderRadius:'10px' }} variant="gradient" color="error" fullWidth onClick={() => { submitHandler1() }}>
                                                                    Submit
                                                                </MDButton>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>

                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Fade>
                                            </Modal>
                                        </div>
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
                                                                Are you sure you want to delete<br /> this Tycoon?
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
                                        <div>
                                            {renderSuccessSbVV}
                                        </div>
                                        <div>
                                            {renderSuccessSbADD}
                                        </div>
                                        <div>
                                            {renderSuccessEmailExist}
                                        </div>
                                        <div>
                                            {renderSuccessSbEdit}
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
