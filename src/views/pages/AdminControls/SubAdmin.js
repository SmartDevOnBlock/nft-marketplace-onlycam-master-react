import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  FormHelperText,
  FormControl,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Form, Formik } from "formik";
import { getBase64, getWeb3Obj } from "src/utils";
import axios from "axios";
import ApiConfig from "src/connectors/config/ApiConfig";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import * as yep from "yup";
import moment from "moment";
import { UserContext } from "src/context/User";
import React, { useState, useEffect, useContext } from "react";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  textField: {
    "& input": {
      height: "20px",
    },
  },
  inputFile: {
    border: "1px solid #806490",
    borderRadius: "4px",
    padding: "10px",
    width: "100%",
    color: theme.palette.text.black,
    [theme.breakpoints.down("xs")]: {
      width: "92%",
    },
    marginTop: "10px",
  },
  heading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "20px",
    "& h4": {
      fontSize: "40px",
      fontWeight: "700",
      color: theme.palette.secondary.main,
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
  colorbox: {
    alignItems: "center",
    marginTop: "16px",
    width: "100%",
    height: "auto",
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "15px",
    padding: "20px",
  },
  gridSection: {
    "& label": {
      color: theme.palette.secondary.white,
      fontSize: "14px",
      "& span": {
        display: "inline-block",
        marginTop: "-9px",
      },
      "& .MuiFormGroup-root": {
        flexDirection: "revert",
        marginLeft: 13,
        "& .MuiSvgIcon-root": {
          width: "13px",
          height: "13px",
        },
      },
    },
    "& .MuiInputBase-input": {
      color: theme.palette.secondary.white,
    },
  },
}));
const formValidationSchema = yep.object().shape({
  firstName: yep
    .string()
    .required("First name is required")
    .min(2, "Please enter atleast 2 characters")
    .max(35, "You can enter only 35 characters")
    .matches(
      /^([A-Z][a-z]+)$/,
      "Only alphabets are allowed for this field whitespaces are not. "
    ),
  lastName: yep
    .string()
    .required("Last Name is required")
    .min(2, "Please enter atleast 2 characters")
    .max(35, "You can enter only 35 characters")
    .matches(
      /^([A-Z][a-z]+)$/,
      "Only alphabets are allowed for this field whitespaces are not. "
    ),
  email: yep
    .string()
    .email("You have entered an invalid email address. Please try again")
    .required("Email address is required")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "You have entered an invalid email address. Please enter valid email"
    ),
  mobileNumber: yep
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]*$/, "Must be a valid mobilie")
    .max(13, "Should not exceeds 13 digits")
    .min(10, "Must be only 10 digits"),
  gender: yep.string().required("Gender is required"),
  dob: yep
    .string()
    .required("Date of bith is Required")
    .test(
      "DOB",
      "You must be atleast 13 years old or above",
      (date) => moment().diff(moment(date), "years") >= 18
    ),
});
export default function SubAdmin() {
  const history = useHistory();
  const classes = useStyles();
  const user = useContext(UserContext);

  const [profileImageBlob, setprofileImageBlob] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onBannerImageChange = (e) => {
    const value = URL.createObjectURL(e.target.files[0]);
    setprofileImageBlob(value);
    getBase64(e.target.files[0], (result) => {
      setProfileImage(result);
    });
  };

  const handleFormSubmit = async (values) => {
    const web3 = await getWeb3Obj();
    const isValidWalletAddress = web3.utils.isAddress(values.walletAddress);
    if (isValidWalletAddress) {
      try {
        setIsLoading(true);
        const res = await axios({
          method: "POST",
          url: ApiConfig.addSubAdmin,
          data: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            walletAddress: values.walletAddress,
            mobileNumber: values?.mobileNumber?.toString(),
            gender: values.gender,
            profilePic: profileImage,
          },
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          history.goBack();
          setIsLoading(false);
          toast.success(res.data.responseMessage);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.log("error");
        setIsLoading(false);
        toast.error(error.response.data.responseMessage);
      }
    } else {
      toast.error("Please enter valid wallet address");
    }
  };

  useEffect(() => {
    if (!user.isAdmin) {
      history.push("/");
    }
  }, [user.isAdmin]);
  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.colorbox}>
          <Box className={classes.heading}>
            <Typography variant="h4">Sub Admin Add</Typography>
          </Box>
          <Box>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                mobileNumber: "",
                gender: "",
                dob: "",
                walletAddress: "",
                profilePic: profileImage,
              }}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
              validationSchema={formValidationSchema}
              onSubmit={(values) => handleFormSubmit(values)}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values,
                setFieldValue,
              }) => (
                <Form>
                  <Grid container spacing={2} className={classes.gridSection}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <label>First Name</label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        name="firstName"
                        value={values.firstName}
                        error={Boolean(touched.firstName && errors.firstName)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText error>
                        {touched.firstName && errors.firstName}
                      </FormHelperText>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <label>Last Name</label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        name="lastName"
                        value={values.lastName}
                        error={Boolean(touched.lastName && errors.lastName)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText error>
                        {touched.lastName && errors.lastName}
                      </FormHelperText>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <label>Wallet Address</label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        name="walletAddress"
                        value={values.walletAddress}
                        error={Boolean(
                          touched.walletAddress && errors.walletAddress
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText error>
                        {touched.walletAddress && errors.walletAddress}
                      </FormHelperText>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <label>Email</label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        name="email"
                        value={values.email}
                        error={Boolean(touched.email && errors.email)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText error>
                        {touched.email && errors.email}
                      </FormHelperText>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <label>Mobile No.</label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        name="mobileNumber"
                        type="number"
                        value={values.mobileNumber}
                        error={Boolean(
                          touched.mobileNumber && errors.mobileNumber
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText error>
                        {touched.mobileNumber && errors.mobileNumber}
                      </FormHelperText>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <label>Gender</label>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <Select
                          labelId="demo-simple-select-outlined-label2"
                          id="demo-simple-select-outlined2"
                          name="gender"
                          value={values.gender}
                          error={Boolean(touched.gender && errors.gender)}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={"male"}>Male</MenuItem>
                          <MenuItem value={"female"}>Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <label>Profile Image</label>
                      <input
                        accept="image/*"
                        style={{ display: "block" }}
                        id="raised-button-file-img"
                        className={classes.inputFile}
                        multiple
                        type="file"
                        name="profilePic"
                        fullWidth
                        onChange={onBannerImageChange}
                        variant="outlined"
                      />

                      <label htmlFor="raised-button-file-img">
                        <Box
                          style={{
                            position: "absolute",
                            top: "10px",
                            left: "97px",
                          }}
                        ></Box>
                      </label>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <label>Date of Birth</label>
                      <FormControl fullWidth>
                        <KeyboardDatePicker
                          className={classes.textField}
                          placeholder="DD/MM/YYYY"
                          format="DD/MM/YYYY"
                          inputVariant="outlined"
                          disableFuture
                          margin="dense"
                          name="dob"
                          onChange={(date) => {
                            setFieldValue("dob", new Date(date));
                          }}
                          error={Boolean(touched.dob && errors.dob)}
                          helperText={touched.dob && errors.dob}
                        />
                      </FormControl>
                    </Grid>
                    <Grid
                      item
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      style={{ display: "flex", justifyContent: "end" }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        type="submit"
                        disabled={isLoading}
                      >
                        Submit {isLoading && <ButtonCircularProgress />}
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
