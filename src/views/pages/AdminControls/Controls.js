import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  FormHelperText,
} from "@material-ui/core";
import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { Field, Form, Formik } from "formik";
import * as yep from "yup";
import CreatorList from "./CreatorList";
import { UserContext } from "src/context/User";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  heading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h4": {
      fontSize: "40px",
      fontWeight: "700",
      color: theme.palette.secondary.main,
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
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
  btnbox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  colorbox: {
    // marginTop: "16px",
    width: "100%",
    height: "auto",
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "15px",
    padding: "20px",
  },
}));
const formValidationSchema = yep.object().shape({
  royalty: yep.string().required("Royalty is required"),
  commission: yep.string().required("Commission is required"),
});
const formInitialSchema = {
  royalty: "",
  commission: "",
};
export default function Controls() {
  const classes = useStyles();

  const user = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!user.isAdmin) {
      history.push("/");
    }
  }, [user.isAdmin]);

  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.heading}>
          <Typography variant="h4">Admin Controls</Typography>
        </Box>

        <Box mt={2}>
          <CreatorList />
        </Box>
      </Container>
    </Box>
  );
}
