import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  FormControl,
  MenuItem,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect, useContext } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { DropzoneArea } from "material-ui-dropzone";
import { Form, Formik } from "formik";
import moment from "moment";
import * as yep from "yup";
import { KeyboardDatePicker } from "@material-ui/pickers";
import axios from "axios";
import apiConfig from "src/connectors/config/ApiConfig";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import Checkbox from "@material-ui/core/Checkbox";
import { FaAsterisk } from "react-icons/fa";
import { getBase64 } from "src/services";
import { Link, useLocation } from "react-router-dom";
import CreatorPrivacy from "../Privacy/CreatorPolicy";
import InputAdornment from "@material-ui/core/InputAdornment";

import Term from "../T&C/Term";
import { User } from "react-feather";
import userEvent from "@testing-library/user-event";
import { UserContext } from "src/context/User";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  heading: {
    "& h1": {
      color: theme.palette.secondary.main,
      fontWeight: "700",
      fontSize: "40px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
  list1: {
    "& h5": {
      color: theme.palette.secondary.white,
      fontSize: "13px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "130%",
      "& span": {
        color: theme.palette.primary.white,
      },
    },
  },
  gridSection: {
    "& label": {
      color: theme.palette.secondary.white,
      fontSize: "14px",
      margin: "6px 0",
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
  information: {
    display: "flex",
    justifyContent: "space-between",
    "@media(max-width:767px)": {
      display: "block",
      marginTop: "10px",
    },
    "& button": {
      marginTop: "1rem",
    },
    "& h5": {
      fontSize: "13px",
      color: theme.palette.secondary.white,
    },
  },
  conditionAccept: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",

    "& h5": {
      fontSize: "13px",
      color: theme.palette.secondary.white,
      "@media(max-width:580px)": {
        fontSize: "10px",
      },
    },
    "& input": {
      color: theme.palette.secondary.white,
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
  textField: {
    "& input": {
      height: "10px",
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
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
      "Only alphabets and whitespaces are allowed for this field number are not. "
    ),
  lastName: yep
    .string()
    .required("Last Name is required")
    // .trim('The last name cannot include leading and trailing spaces')
    .min(2, "Please enter atleast 2 characters")
    .max(35, "You can enter only 35 characters")
    .matches(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
      "Only alphabets and whitespaces are allowed for this field number are not. "
    ),

  dateOfBirth: yep
    .string()
    .required("Date of bith is Required")
    .test(
      "DOB",
      "You must be atleast 18 years old or above",
      (date) => moment().diff(moment(date), "years") >= 18
    ),
  country: yep.string().required("Country is required"),
  state: yep.string().required("state is required"),
  zipcode: yep
    .string()
    .required("pin code is required")
    .min(2, "Please enter atleast 2 digit")
    .max(12, "You can enter max 12 digit"),
  city: yep.string().required("city is required"),
  address1: yep.string().required("address is left").max(120, "Too long"),
  // address2: yep.string().required("address is left").max(120, "Too long"),
  id: yep.string().required("Id type is required").max(20, "Too long"),
  // gender: yep.string().required("Gender is required"),
  checkbox: yep.string().required("Please accept terms and conditions first!"),
  email: yep
    .string()
    .email("You have entered an invalid email address. Please try again")
    .required("Email address is required")
    .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
});

const CreatorForm = (props) => {
  // const kycData = props?.location?.state
  const classes = useStyles();
  const location = useLocation();
  const user = useContext(UserContext);
  const kycData = location?.state?.data;
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [showStates, setShowStates] = useState([]);
  const [idPhotoFront, setIdPhotoFront] = useState();
  const [idPhotoBack, setIdPhotoBack] = useState();
  const [selfieWithId, setSelfieWithId] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isOpenServices, setIsOpenServices] = useState(false);
  const [isOpenCreator, setIsOpenCreator] = useState(false);
  const [genderMsg, setGenderMsg] = useState();

  const handleShow = (e) => {
    var get = document.getElementById("demo1");
    get.style.display = "block";
  };
  const handleHidden = (e) => {
    var get = document.getElementById("demo1");
    get.style.display = "none";
  };

  const handleFormSubmit = async (values) => {
    setIsSubmit(true);
    const ids = location.search.split("?");
    const isEdit = ids[1] ? true : false;

    if (
      isSubmit &&
      ((isEdit && kycData?.idPhotoBack) || idPhotoBack !== "") &&
      ((isEdit && kycData?.idPhotoFront) || idPhotoFront !== "") &&
      ((isEdit && kycData?.selfieWithId) || selfieWithId !== "") &&
      values.firstName !== ""
    ) {
      try {
        let data = {
          firstName: values.firstName,
          lastName: values.lastName,
          country: values.country,
          city: values.city,
          state: values.state,
          zipCode: values.zipcode,
          address1: values.address1,
          address2: values.address2,
          idType: values.id,
          dateOfBirth: values.dateOfBirth,
          gender: values.gender == "others" ? genderMsg : values.gender,
          email: values.email,
        };
        if (idPhotoFront) {
          data.idPhotoFront = idPhotoFront;
        }
        if (idPhotoFront) {
          data.idPhotoBack = idPhotoBack;
        }
        if (idPhotoFront) {
          data.selfieWithId = selfieWithId;
        }
        if (isEdit) {
          data["kycId"] = ids[1];
        }

        setIsLoading(true);
        const res = await axios({
          method: isEdit ? "PUT" : "POST",
          url: apiConfig[isEdit ? "editkyc" : "requestkyc"],
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
          data: data,
        });
        if (res.data.statusCode === 200) {
          toast.success(res.data.responseMessage);
          user.getProfileHandler(sessionStorage.getItem("token"));
          history.push("/");
        } else {
          toast.error(res.data.response_message);
        }
        setIsLoading(false);
      } catch (err) {
        toast.error(err.message);
        console.error(err.res);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    axios.get("/static/json/countries.json").then(function (response) {
      setCountries(response.data.countries);
      axios.get("/static/json/states.json").then(function (response) {
        setStates(response.data.states);
        axios.get("/static/json/cities.json").then(function (response) {
          setCities(response.data.cities);
        });
      });
    });
  }, []);

  const changeStateList = (name) => {
    const selectted = states.filter((cont) => {
      return cont.name === name;
    });
    if (selectted.length !== 0) {
      const contId = selectted[0].id;
      const allCity = cities.filter((city) => {
        return city.state_id === contId;
      });
    }
  };

  const changeState = (e) => {
    const name = e.target.value;
    changeStateList(name);
  };

  const changeCountryList = (name) => {
    const selectted = countries?.filter((cont) => {
      return cont.name == name;
    });
    const contId = selectted[0]?.id;
    const allState = states?.filter((state) => {
      return state.country_id == contId;
    });

    setShowStates(allState);
  };

  const changeCountry = (e) => {
    const name = e.target.value;
    changeCountryList(name);
  };

  useEffect(() => {
    if (kycData?.country) {
      changeCountryList(kycData?.country);
    }
    if (kycData?.state) {
      setShowStates([{ name: kycData?.state }]);
    }
  }, [kycData]);

  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.colorbox}>
          <Box className={classes.heading}>
            <Typography variant='h1'>
              Enter your personal information
            </Typography>
          </Box>
          <Box>
            <List
              component='nav'
              aria-label='contacts'
              className={classes.list1}
            >
              <ListItem>
                <Typography variant='h5'>
                  We require the collection of personal information for the
                  verification Creator identities, to protect against unethical
                  and illegal practices, and to ensure the safety of all
                  Creators and Users, and their content on our Service.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant='h5'>
                  This fights SEX TRAFFICKING, ABUSE OF MINORS, REVENGE PORN.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant='h5'>
                  ALL private data collected is SECURED with industry standard
                  encryption.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant='h5'>
                  Read more about how we use and protect your personal
                  information&nbsp;
                  <span>Privacy Policy</span>
                </Typography>
              </ListItem>
            </List>
          </Box>

          <Formik
            initialValues={{
              firstName: kycData?.firstName ? kycData?.firstName : "",
              lastName: kycData?.lastName ? kycData?.lastName : "",
              country: kycData?.country ? kycData?.country : "",
              state: kycData?.state ? kycData?.state : "",

              city: kycData?.city ? kycData?.city : "",
              zipcode: kycData?.zipCode ? kycData?.zipCode : "",
              address1: kycData?.address1 ? kycData?.address1 : "",
              address2: kycData?.address2 ? kycData?.address2 : "",
              id: kycData?.idType ? kycData?.idType : "",
              dateOfBirth: kycData?.dateOfBirth ? kycData?.dateOfBirth : "",
              gender: kycData?.gender ? kycData?.gender : "",
              checkbox: "",
              email: kycData?.email ? kycData?.email : "",
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
                    <label>
                      First Name <span style={{ color: "red" }}>*</span>{" "}
                    </label>
                    <TextField
                      fullWidth
                      variant='outlined'
                      name='firstName'
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
                    <label>
                      Last Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <TextField
                      fullWidth
                      variant='outlined'
                      name='lastName'
                      value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      {touched.lastName && errors.lastName}
                    </FormHelperText>
                  </Grid>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <FormControl fullWidth>
                      <label>
                        Date of Birth <span style={{ color: "red" }}>*</span>
                      </label>
                      {/* <KeyboardDatePicker
                        className={classes.textField}
                        placeholder="DD/MM/YYYY"
                        value={values.dateOfBirth}
                        onChange={(date) => {
                          setFieldValue("dateOfBirth", new Date(date));
                        }}
                        format="DD/MM/YYYY"
                        inputVariant="outlined"
                        disableFuture
                        margin="dense"
                        name="dateOfBirth"
                        error={Boolean(
                          touched.dateOfBirth && errors.dateOfBirth
                        )}
                        helperText={touched.dateOfBirth && errors.dateOfBirth}
                      /> */}

                      <TextField
                        id='date'
                        variant='outlined'
                        name='dateOfBirth'
                        fullWidth
                        type='date'
                        defaultValue='2017-05-24'
                        value={values.dateOfBirth}
                        className={classes.textField}
                        error={Boolean(
                          touched.dateOfBirth && errors.dateOfBirth
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <FormHelperText error>
                        {touched.dateOfBirth && errors.dateOfBirth}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    lg={4}
                    md={4}
                    sm={12}
                    xs={12}
                    className={classes.gridSection}
                  >
                    <label>
                      Country <span style={{ color: "red" }}>*</span>
                    </label>
                    <FormControl
                      fullWidth
                      variant='outlined'
                      className={classes.formControl}
                    >
                      <Select
                        // labelId="demo-simple-select-outlined-label"
                        // id="demo-simple-select-outlined"
                        // value={age}
                        // onChange={handleChange}
                        fullWidth
                        name='country'
                        value={values.country}
                        error={Boolean(touched.country && errors.country)}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                          changeCountry(e);
                        }}
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        {countries.map((countries) => {
                          return (
                            <MenuItem
                              key={countries.name + countries.id}
                              value={countries.name}
                            >
                              {countries.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText error>
                        {touched.country && errors.country}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    {" "}
                    <label>
                      State/Province <span style={{ color: "red" }}>*</span>
                    </label>
                    <FormControl
                      fullWidth
                      variant='outlined'
                      className={classes.formControl}
                    >
                      <Select
                        // labelId="demo-simple-select-outlined-label2"
                        // id="demo-simple-select-outlined2"
                        // value={age}
                        // onChange={handleChange}
                        fullWidth
                        name='state'
                        value={values.state}
                        error={Boolean(touched.state && errors.state)}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          changeState(e);
                          handleChange(e);
                        }}
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        {showStates.lenght !== 0 &&
                          showStates.map((state) => {
                            return (
                              <MenuItem
                                key={state.name + state.id}
                                value={state.name}
                              >
                                {state.name}
                              </MenuItem>
                            );
                          })}
                      </Select>
                      <FormHelperText error>
                        {touched.state && errors.state}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  {/* <Grid item lg={4} md={4} sm={12} xs={12}>
                    <label>City</label>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <Select
                        labelId="demo-simple-select-outlined-label1"
                        id="demo-simple-select-outlined1"
                        name="city"
                        value={values.city}
                        error={Boolean(touched.city && errors.city)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>

                        {showCities.map((data) => {
                          return (
                            <MenuItem
                              key={data.name + data.id}
                              value={data.name}
                            >
                              {data.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText error>
                        {touched.city && errors.city}
                      </FormHelperText>
                    </FormControl>
                  </Grid> */}
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <label>
                      City <span style={{ color: "red" }}>*</span>
                    </label>
                    <TextField
                      fullWidth
                      variant='outlined'
                      name='city'
                      value={values.city}
                      error={Boolean(touched.city && errors.city)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      {touched.city && errors.city}
                    </FormHelperText>
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <label>
                      Zip Code/Postal Code{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <TextField
                      fullWidth
                      variant='outlined'
                      name='zipcode'
                      value={values.zipcode}
                      error={Boolean(touched.zipcode && errors.zipcode)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      {touched.zipcode && errors.zipcode}
                    </FormHelperText>
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <label>
                      ID Number <span style={{ color: "red" }}>*</span>
                    </label>
                    <TextField
                      fullWidth
                      variant='outlined'
                      placeholder='Enter ID'
                      name='id'
                      value={values.id}
                      error={Boolean(touched.id && errors.id)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      {touched.id && errors.id}
                    </FormHelperText>
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <label>
                      Address 1 <span style={{ color: "red" }}>*</span>
                    </label>
                    <TextField
                      fullWidth
                      variant='outlined'
                      name='address1'
                      value={values.address1}
                      error={Boolean(touched.address1 && errors.address1)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      {touched.address1 && errors.address1}
                    </FormHelperText>
                    <Box mt={3}>
                      <label>Gender</label>
                      <span>
                        <RadioGroup
                          aria-label='gender'
                          name='gender'
                          onChange={handleChange}
                          value={values.gender}
                        >
                          <FormControlLabel
                            value='Male'
                            control={<Radio onClick={handleHidden} />}
                            label='Male'
                            name='gender'
                            onChange={(e) => setGenderMsg(e.target.value)}
                          />
                          <FormControlLabel
                            value='Female'
                            control={<Radio onClick={handleHidden} />}
                            label='Female'
                            name='gender'
                            onChange={(e) => setGenderMsg(e.target.value)}
                          />
                          <FormControlLabel
                            value='others'
                            control={<Radio onClick={handleShow} />}
                            label='Others'
                            name='gender'
                          />
                        </RadioGroup>
                        <Box
                          id='demo1'
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "1rem",
                            marginTop: "1rem",
                            display: "none",
                          }}
                        >
                          <TextField
                            variant='outlined'
                            fullWidth
                            placeholder='Enter your gender'
                            onChange={(e) => setGenderMsg(e.target.value)}
                          />{" "}
                        </Box>
                        <FormHelperText error>
                          {touched.gender && errors.gender}
                        </FormHelperText>
                      </span>
                    </Box>
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <label>Address 2</label>
                    <TextField
                      fullWidth
                      variant='outlined'
                      value={values.address2}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <label>
                      Email address <span style={{ color: "red" }}>*</span>
                    </label>
                    <TextField
                      fullWidth
                      name='email'
                      variant='outlined'
                      value={values.email}
                      onChange={handleChange}
                      error={Boolean(touched.email && errors.address1)}
                      onBlur={handleBlur}
                    />
                    <FormHelperText error>
                      {touched.email && errors.email}
                    </FormHelperText>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <label>
                      Id Photo Frontside <span style={{ color: "red" }}>*</span>
                    </label>
                    <Box>
                      <DropzoneArea
                        className={classes.zonearea}
                        filesLimit={1}
                        name=''
                        initialFiles={[kycData?.idPhotoFront]}
                        onChange={(files) => {
                          if (files[0]) {
                            getBase64(files[0], (result) => {
                              setIdPhotoFront(result);
                            });
                          } else {
                            setIdPhotoFront("");
                          }
                        }}
                        dropzoneText='Drag and drop,or browse your file'
                        error={isSubmit && idPhotoFront === ""}
                        helperText={
                          isSubmit &&
                          idPhotoFront === "" &&
                          "Please select front image"
                        }
                      />
                      <p
                        style={{
                          color: "#f44336",
                          fontSize: "12px",
                          marginTop: "5px",
                          textAlign: "left",
                        }}
                      >
                        {isSubmit &&
                          idPhotoFront === "" &&
                          "Please select front image"}
                      </p>
                      <Box
                        textAlign='center'
                        mt={1}
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                      ></Box>
                      {isSubmit && (!idPhotoFront || idPhotoFront === "") && (
                        <FormHelperText error>
                          Please select file
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <label>
                      Id Photo Backside <span style={{ color: "red" }}>*</span>
                    </label>
                    <Box>
                      <DropzoneArea
                        className={classes.zonearea}
                        filesLimit={1}
                        initialFiles={[kycData?.idPhotoBack]}
                        onChange={(files) => {
                          if (files[0]) {
                            getBase64(files[0], (result) => {
                              setIdPhotoBack(result);
                            });
                          } else {
                            setIdPhotoBack("");
                          }
                        }}
                        dropzoneText='Drag and drop,or browse your file'
                      />
                      <Box
                        textAlign='center'
                        mt={1}
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                      ></Box>
                      {isSubmit && (!idPhotoBack || idPhotoBack === "") && (
                        <FormHelperText error>
                          Please select file
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <label>
                      {" "}
                      Selfie with ID <span style={{ color: "red" }}>*</span>
                    </label>
                    <Box>
                      <DropzoneArea
                        className={classes.zonearea}
                        filesLimit={1}
                        initialFiles={[kycData?.selfieWithId]}
                        onChange={(files) => {
                          if (files[0]) {
                            getBase64(files[0], (result) => {
                              setSelfieWithId(result);
                            });
                          } else {
                            setSelfieWithId("");
                          }
                        }}
                        dropzoneText='Drag and drop,or browse your file'
                      />
                      <Box
                        textAlign='center'
                        mt={1}
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                      ></Box>
                      {isSubmit && (!selfieWithId || selfieWithId === "") && (
                        <FormHelperText error>
                          Please select file
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box className={classes.conditionAccept}>
                      <Checkbox
                        inputProps={{ "aria-label": "uncontrolled-checkbox" }}
                        name='checkbox'
                        value={values.checkbox}
                        error={Boolean(touched.checkbox && errors.checkbox)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />

                      <Typography variant='h5'>
                        I ACCEPT THE &nbsp;{" "}
                        <span
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                          onClick={() => setIsOpenServices(true)}
                        >
                          TERMS OF SERVICES
                        </span>
                        &nbsp; AND &nbsp;THE &nbsp;
                        <span
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                          onClick={() => setIsOpenCreator(true)}
                        >
                          CREATOR POLICY *
                        </span>
                      </Typography>
                    </Box>
                    <FormHelperText error>{errors.checkbox}</FormHelperText>
                    <Box className={classes.information} mt={2}>
                      <Box>
                        <Typography variant='h5'>
                          All information collected is required in compliance
                          with 18 USC 2257 regulations
                        </Typography>
                        <FormHelperText error>
                          {touched.firstName && errors.firstName}
                        </FormHelperText>
                        <FormHelperText error>
                          {touched.lastName && errors.lastName}
                        </FormHelperText>
                        <FormHelperText error>
                          {touched.dateOfBirth && errors.dateOfBirth}
                        </FormHelperText>
                        <FormHelperText error>
                          {touched.state && errors.state}
                        </FormHelperText>
                        <FormHelperText error>
                          {touched.zipcode && errors.zipcode}
                        </FormHelperText>
                        <FormHelperText error>
                          {touched.address1 && errors.address1}
                        </FormHelperText>
                        <FormHelperText error>
                          {touched.city && errors.city}
                        </FormHelperText>
                        <FormHelperText error>
                          {touched.state && errors.state}
                        </FormHelperText>
                        <FormHelperText error>
                          {touched.id && errors.id}
                        </FormHelperText>
                        <FormHelperText error>
                          {touched.email && errors.email}
                        </FormHelperText>
                        {isSubmit && (!idPhotoFront || idPhotoFront === "") && (
                          <FormHelperText error>
                            Please select file Front Side
                          </FormHelperText>
                        )}

                        {isSubmit && (!idPhotoBack || idPhotoBack === "") && (
                          <FormHelperText error>
                            Please select file Back Side
                          </FormHelperText>
                        )}
                        {isSubmit && (!selfieWithId || selfieWithId === "") && (
                          <FormHelperText error>
                            Please select file Selfie
                          </FormHelperText>
                        )}
                      </Box>

                      <Button
                        variant='contained'
                        size='large'
                        color='primary'
                        type='submit'
                        disabled={
                          isLoading ||
                          (kycData
                            ? kycData?.userId != user?.userData?._id
                            : false)
                        }
                      >
                        Submit
                        {isLoading && <ButtonCircularProgress />}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
      <Dialog
        className='modalterm'
        open={isOpenServices}
        maxWidth='md'
        onClose={() => setIsOpenServices(false)}
      >
        <DialogContent>
          <Term />

          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            <Button
              variant='contained'
              size='large'
              color='secondary'
              onClick={() => setIsOpenServices(false)}
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        className='modalterm'
        open={isOpenCreator}
        maxWidth='md'
        onClose={() => setIsOpenCreator(false)}
      >
        <DialogContent>
          <CreatorPrivacy />

          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            <Button
              variant='contained'
              size='large'
              color='secondary'
              onClick={() => setIsOpenCreator(false)}
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CreatorForm;
