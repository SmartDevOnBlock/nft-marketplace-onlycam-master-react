import {
  Box,
  Container,
  Typography,
  TextField,
  Grid,
  Button,
  FormHelperText,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Form, Formik } from "formik";
import * as yep from "yup";
import axios from "axios";
import apiConfig from "src/connectors/config/ApiConfig";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0",
    },
  },
  headsection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "15px",
    "& h1": {
      color: "#3B0D60",
      fontWeight: "700",
      fontSize: "40px",
      "@media(max-width:767px)": {
        fontSize: "20px",
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
  information: {
    display: "flex",
    justifyContent: "end",
    "& h5": {
      fontSize: "13px",
      color: theme.palette.secondary.white,
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
}));
const formValidationSchema = yep.object().shape({
  firstName: yep
    .string()
    .required("First name is required")
    .min(2, "Please enter atleast 2 characters")
    .max(35, "You can enter only 35 characters")
    .matches(/^[^\W_]+$/, "Enter your first name  without whitespace"),

  email: yep
    .string()
    .email("You have entered an invalid email address. Please try again")
    .required("Email address is required")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "You have entered an invalid email address. Please enter valid email"
    ),
  subject: yep.string().required("Subject is left").max(120, "Too long"),
  help: yep.string().required("Please enter your query").max(600, "Too long"),
});
const formInitialSchema = {
  firstName: "",
  lastName: "",
  email: "",
  mobileNo: "",
  subject: "",
  help: "",
};
export default function SupportForm() {
  const classes = useStyles();
  const history = useHistory();
  const [countryCode, setCountryCode] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (values) => {
    setIsSubmit(true);

    try {
      setIsLoading(true);
      const res = await axios({
        method: "Post",
        url: apiConfig.contactUs,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          name: values.firstName,
          email: values.email,
          subject: values.subject,
          message: values.help,
        },
      });
      if (res.data.statusCode === 200) {
        toast.success(res.data.responseMessage);
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
  };
  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.colorbox}>
          <Box className={classes.headsection} mt={2}>
            <Box>
              <Typography variant="h1">Support</Typography>
            </Box>
          </Box>
          <Formik
            initialValues={formInitialSchema}
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
                <Box>
                  <Grid container spacing={2} className={classes.gridSection}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <label>Name</label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        name="firstName"
                        type="text"
                        error={Boolean(touched.firstName && errors.firstName)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText error>
                        {touched.firstName && errors.firstName}
                      </FormHelperText>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <label>Email</label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        name="email"
                        type="text"
                        error={Boolean(touched.email && errors.email)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText error>
                        {touched.email && errors.email}
                      </FormHelperText>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <label>Subject</label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        name="subject"
                        type="text"
                        error={Boolean(touched.subject && errors.subject)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText error>
                        {touched.subject && errors.subject}
                      </FormHelperText>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <label>How can we help you?</label>
                      <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        type="text"
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="help"
                        error={Boolean(touched.help && errors.help)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText error>
                        {touched.help && errors.help}
                      </FormHelperText>
                    </Grid>
                    <Grid item lg={12}>
                      <Box className={classes.information} mt={2}>
                        <Button
                          variant="contained"
                          size="large"
                          color="primary"
                          type="submit"
                        >
                          Submit
                          {/* {isLoading && <ButtonCircularProgress />} */}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </Box>
  );
}
