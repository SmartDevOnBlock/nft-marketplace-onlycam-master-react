import {
  Box,
  TextField,
  Typography,
  Grid,
  Button,
  Hidden,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import apiConfig from "src/connectors/config/ApiConfig";
import { toast } from "react-toastify";
import ButtonCircularProgress from "./ButtonCircularProgress";
const useStyles = makeStyles((theme) => ({
  imgbox: {
    "& figure": {
      overflow: "hidden",
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
        borderRadius: "25px",
      },
    },
  },
  grid: {
    padding: "10px",
  },
  logintext: {
    "& h5": {
      color: theme.palette.secondary.main,
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "24px",
      lineHeight: "130%",
    },
    "& h6": {
      color: theme.palette.secondary.main,
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "17px",
    },
  },
  namefiled: {
    display: "flex",

    "& button": {
      marginLeft: "10px",
      padding: "20px",
      borderRadius: "14px",
      height: "52px",
    },
  },
  textfield: {
    background: "#F4F4F4",
    background: "#F4F4F4",
    borderRadius: "14px",
    padding: "20px",
  },
}));
const EnterName = ({ user, onClose }) => {
  const classes = useStyles();
  const [name, setName] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateName = async () => {
    setIsSubmit(true);
    if (name != "" && name.length >= 2 && name.length < 30) {
      setIsLoading(true);
      try {
        const response = await axios({
          method: "PUT",
          url: apiConfig.updateProfile,
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
          data: {
            name: name,
          },
        });

        if (response.data.statusCode === 200) {
          toast.success(response.data.responseMessage);
          user.getProfileHandler(window.sessionStorage.getItem("token"));
          onClose();
        } else {
          toast.error(response.data.responseMessage);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error(error.message);
      }
    }
  };

  return (
    <Grid container spacing={2} className={classes.grid}>
      <Hidden xsDown>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box
            className={classes.imgbox}
            style={{ maxHeight: "100%", minHeight: "100%" }}
          >
            <figure>
              <img src='/images/modalImg.png' alt='' />
            </figure>
          </Box>
        </Grid>
      </Hidden>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <Box mt={6}>
          <figure>
            <img src='/images/settingicon.png' alt='' />
          </figure>
        </Box>
        <Box className={classes.logintext} mt={4}>
          <Typography variant='h5'>
            First time using <br /> this wallet?
          </Typography>
          <Typography variant='h6'>
            Choose your desired name <br /> below and click “Ok” to connect
          </Typography>
        </Box>
        <Box className={classes.namefiled} mt={4}>
          <TextField
            fullWidth
            type='text'
            placeholder='Enter here'
            className={classes.textfield}
            onChange={(e) => setName(e.target.value)}
            inputProps={{
              readOnly: isLoading,
            }}
            error={isSubmit && name === ""}
            error={
              isSubmit &&
              name === "" &&
              "Please enter valid name, Your username should be atleast 5 characters long, max length should 30"
            }
          />
          <Button
            variant='contained'
            size='large'
            color='primary'
            onClick={updateName}
            disabled={isLoading}
          >
            Ok {isLoading && <ButtonCircularProgress />}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EnterName;
