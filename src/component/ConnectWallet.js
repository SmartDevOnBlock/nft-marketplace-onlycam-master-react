import {
  Box,
  Typography,
  Grid,
  Button,
  Hidden,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useContext, useEffect, useState } from "react";
import { SUPPORTED_WALLETS } from "src/connectors";
import { UserContext } from "src/context/User";
import { useWeb3React } from "@web3-react/core";
import { Link } from "react-router-dom";
import Warning from "src/component/Warning";

const useStyles = makeStyles((theme) => ({
  imgbox: {
    "& figure": {
      // overflow: "hidden",
      overflowY: "hidden",
      overflowX: "hidden",
      "& img": {
        // maxHeight: "100%",
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
    overflowY: "hidden !important",
    overflowX: "hidden !important",
  },
  logintext: {
    marginTop: "60px",
    "@media(max-width:767px)": {
      marginTop: "30px",
    },
    "& h5": {
      color: theme.palette.secondary.main,
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "24px",
      lineHeight: "32px",
    },
  },
  metamaskhead: {
    display: "flex",
    alignItems: "center",
    background: "#F4F4F4",
    borderRadius: "14px",
    padding: "10px",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "24px",
    "& h5": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "20px",
      textTransform: "capitalize",
      color: "#E78B3A",
    },
  },
  walletconnect: {
    display: "flex",
    alignItems: "center",
    background: "#F4F4F4",
    borderRadius: "14px",
    marginLeft: "0 !important",
    justifyContent: "space-between",
    marginTop: "10px !important",
    padding: "10px",
    width: "100%",
    "& h5": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "20px",
      textTransform: "capitalize",
      color: "#5697F5",
    },
  },
  signup: {
    "& h5": {
      color: theme.palette.secondary.main,
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      "& button": {
        color: theme.palette.primary.main,
        fontWeight: "600",
        fontSize: "14px",
        lineHeight: "130%",
      },
    },
  },
}));
const ConnectWallet = ({ onClose }) => {
  const classes = useStyles();
  const user = useContext(UserContext);
  const { account } = useWeb3React();
  const [openwarning, setWarning] = useState(false);

  useEffect(() => {
    if (account) {
      onClose();
    }
  }, [account]);

  return (
    <Grid container spacing={3} className={classes.grid}>
      {openwarning && (
        <Dialog open={openwarning} maxWidth="sm">
          <DialogContent style={{ overflow: "hidden" }}>
            <Warning
              onClose={() => {
                setWarning(false);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
      <Hidden xsDown>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Box
            className={classes.imgbox}
            style={{ maxHeight: "100%", minHeight: "100%" }}
          >
            <figure>
              <img src="/images/modalImg.png" alt="" />
            </figure>
          </Box>
        </Grid>
      </Hidden>
      <Grid item lg={6} md={6} sm={6} xs={12}>
        <Box className={classes.logintext} textAlign="center">
          <Typography variant="h5">Login with wallet.</Typography>
        </Box>
        {SUPPORTED_WALLETS.map((item, i) => {
          return (
            <Button
              key={i}
              className={classes.metamaskhead}
              onClick={() => {
                if (localStorage.getItem("isAdult") == "true") {
                  localStorage.removeItem("walletName");
                  localStorage.setItem("walletName", item.name);
                  user.connectWallet(item.data);
                } else {
                  setWarning(true);
                }
              }}
            >
              <Box>
                <Typography variant="h5"> {item.data.name}</Typography>
              </Box>
              <Box width="50px">
                <img src={item.data.iconName} alt="" width="70%" />
              </Box>
            </Button>
          );
        })}
        <Box className={classes.metamaskhead}>
          <Typography>
            "By Connecting to OnlyCam.art, you agree to Our{" "}
            <Link to={"/term"}>
              <span style={{ color: "#D200A5" }}>Terms of Service</span>
            </Link>
            &nbsp; and&nbsp;
            <Link to={"/privacy"}>
              <span style={{ color: "#D200A5" }}>Privacy Policy</span>
            </Link>
            "
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ConnectWallet;
