import {
  Box,
  Container,
  DialogActions,
  TextField,
  Dialog,
  DialogContent,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  img: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& img": {},
    },
  },
  yesNobtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& button": {
      marginRight: "7px",
    },
  },
  warning: {
    "& h1": {
      background:
        "linear-gradient(86.27deg, #7000E9 -14.11%, #FF00C5 14.54%, #FF0076 50.13%, #005CE3 112.46%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
  },
}));
const Warning = () => {
  const classes = useStyles();
  const [updateMinSatkeOpen, setUpdateMinSatkeOpen] = useState(true);
  return (
    <Box>
      {updateMinSatkeOpen && (
        <Dialog
          open={updateMinSatkeOpen}
          onClose={() => {
            setUpdateMinSatkeOpen(false);
          }}
          maxWidth="xl"
          className={classes.dialogSection}
        >
          <DialogContent>
            <Box className={classes.img}>
              <figure>
                <img src="/images/logo.png" alt="" />
              </figure>
            </Box>
            <Box className={classes.warning}>
              <Typography variant="h1">
                ARE YOU OVER THE AGE OF 18, AND THE LEGAL AGE OF MAJORITY FOR
                YOUR JURISDICTION?
              </Typography>
            </Box>
            <Box className={classes.yesNobtn}>
              <Button variant="contained" size="large" color="secondary">
                No
              </Button>
              <Button variant="contained" size="large" color="primary">
                Yes
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default Warning;
