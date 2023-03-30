import { sortAddress } from "src/utils";
import { Box, makeStyles, Typography } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router-dom";
import DataNotFound from "src/component/DataNotFound";
import DataNotFound2 from "src/component/DatanotFound2";
const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: "120px" },
  nftcard: {
    background: "#FFFFFF",
    backdropFilter: "blur(44px)",
    borderRadius: "40px",
    padding: "10px",
  },
  nftImg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "40px 40px 10px 10px",
      overflow: "hidden",
      background: "rgba(0 , 0, 0, 0.041)",
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
      },
    },
  },
  tabBtn: {
    margin: "20px 0px 10px 0px",
    backgroundColor: "#FCF2FA",
    borderRadius: "22px",
    padding: "14px",
    "& button": { borderRadius: "15px" },
  },
  bidsDetails: {
    background: "#FFFFFF",
    backdropFilter: "blur(44px)",
    border: "0.5px solid #D3D3D3",
    boxSizing: "border-box",
    borderRadius: "22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0px 0px 10px 0px",
    padding: "5px",
  },
  profileimg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "40px 40px 10px 10px",
      overflow: "hidden",
      width: "75px",
    },
    "& img": {
      maxHeight: "100%",
      maxWidth: "100%",
      height: "auto",
      width: "auto",
      display: "block",
    },
  },
  price1: {
    "& h5": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "18px",
      lineHeight: "130%",
      color: "#3B0D60",
      [theme.breakpoints.down("sm")]: {
        fontSize: "16px",
      },
    },
    "& h6": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#3B0D60",
      [theme.breakpoints.down("sm")]: {
        fontSize: "13px",
      },
      "& span": {
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "130%",
        color: "#D200A5",
        [theme.breakpoints.down("sm")]: {
          fontSize: "13px",
        },
      },
    },
  },
  time: {
    paddingRight: "25px",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "7px",
    },
    "& h6": {
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#C6BECC",
      [theme.breakpoints.down("sm")]: {
        fontSize: "11px",
      },
    },
  },
}));

export default function Bids({ bidList }) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box>
      {bidList && bidList.length === 0 && <DataNotFound2 />}
      {bidList &&
        bidList.map((data, index) => {
          return (
            <Box className={classes.bidsDetails} key={index}>
              <Box style={{ alignItems: "center", display: "flex" }}>
                <Box className={classes.profileimg}>
                  <figure>
                    <img
                      src={
                        data.userId[0].profilePic
                          ? data.userId[0].profilePic
                          : "/images/onlycamimg.png"
                      }
                      alt=""
                      onClick={() => {
                        history.push({
                          pathname: "/author",
                          search: data.userId[0]._id,
                        });
                      }}
                    />
                  </figure>
                </Box>
                <Box className={classes.price1}>
                  <Typography variant="h5">{data.price}</Typography>
                  <Typography variant="h6">
                    by{" "}
                    <span>
                      {data.userId[0].name
                        ? data.userId[0].name
                        : sortAddress(data.userId[0].walletAddress)}
                    </span>
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.time}>
                <Typography variant="h6">
                  {moment(data.createdAt).format("DD/MM/YYYY")}
                </Typography>
                <Typography variant="h6">
                  {moment(data.createdAt).format("hh:mm A")}
                </Typography>
              </Box>
            </Box>
          );
        })}
      {bidList && bidList.length === 0 && <DataNotFound />}
    </Box>
  );
}
