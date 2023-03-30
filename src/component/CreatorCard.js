import { Box, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { sortAddress, calculateTimeLeft, firstAddress } from "src/utils";
import CopyToClipboard from "react-copy-to-clipboard";
import Avatar from "@material-ui/core/Avatar";

import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: "70px" },
  root2: { paddingTop: "30px" },
  headsection: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "15px",
    "& h1": {
      color: "#3B0D60",
      fontWeight: "700",
      fontSize: "40px",
    },
  },
  boxsection: {
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "40px",
    "& h6": {
      color: " #3B0D60",
      fontWeight: "bold",
      fontSize: "14px",
      paddingTop: "7px",
      "@media(max-width:1009px)": {
        fontSize: "11px",
      },
    },
    [theme.breakpoints.down("xs")]: {
      borderRadius: "20px",
    },
  },

  text3: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
    "& h5": {
      color: "#E4C3DE",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
    },
  },
  text4: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
    "& h4": {
      color: "#D200A5",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "130%",
    },
  },
  price: {
    paddingBottom: "11px",
    "& h6": {
      fontWeight: "bold",
      fontSize: "10px",
      lineHeight: "130%",
      color: "#E4C3DE",
    },
  },
  box4: {
    backgroundColor: "#FCF2FA",
    borderRadius: "16px",
  },
  dotimg: {
    background: "#D200A5",
    boxShadow: "0px 4px 7px rgba(210, 0, 165, 0.25)",
  },
  mainimg: {
    cursor: "pointer",
    width: "100%",
    height: "165px",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "40px 40px 10px 10px",
    backgroundColor: "#ccc !important",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "20px 20px 10px 10px",
    },
  },
  imgsec: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "-35px",
  },
  follower: {
    marginTop: "40px",
    background: "#FCF2FA",
    borderRadius: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "10px",
    paddingRight: "6px",
    "@media(max-width:1200px)": {
      paddingLeft: "6px",
      paddingRight: "6px",
    },
    "& h4": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "15px",
      lineHeight: "130%",
      color: "#D200A5",
      "@media(max-width:1342px)": {
        fontSize: "12px",
      },
    },
    "& h5": {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "12px",
      lineHeight: "130%",
      color: "#E4C3DE",
    },
  },
  namesection: {
    "& h6": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "130%",
      "@media(max-width:960px)": {
        fontSize: "0px",
      },
    },
    "& h5": {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#C6BECC",
      paddingTop: "10px",
    },
  },
  bio: {
    padding: "15px 0",
    "& h6": {
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#7E6196",
      maxHeight: "80px",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
  },
  nftimg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "60px",
      overflow: "hidden",
      background: "aliceblue",
      height: "60px",
      width: "60px",
      borderRadius: "100%",
      "& img": {
        borderRadius: "90px",

        maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
      },
    },
  },
}));

export default function CreatorCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { data, type, index } = props;
  const updateDimensions = () => {
    var offsetWidth = document.getElementById(
      "imagecardss" + index
    ).offsetWidth;
    var newoofsetWidth = offsetWidth - 30;
    document.getElementById("imagecardss" + index).style.height =
      newoofsetWidth + "px";
  };
  useEffect(() => {
    updateDimensions();
  }, [data, index]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <Box className={classes.boxsection}>
      <Box
        id={`imagecardss${index}`}
        className={classes.mainimg}
        style={{
          // background: "url(" + data?.coverPic + " )",
          background:
            "url(" +
            `${data?.coverPic ? data?.coverPic : "images/onlycamimg.png"}` +
            ")",
        }}
        onClick={() => {
          history.push({
            pathname: "/author",
            search: data._id,
          });
        }}
      ></Box>
      <Box className={classes.imgsec}>
        <Box style={{ marginLeft: "10px" }}>
          <Box className={classes.nftimg}>
            <figure>
              <img
                src={
                  data?.profilePic ? data?.profilePic : "images/onlycamimg.png"
                }
                alt=""
              />
            </figure>
          </Box>

          <Typography variant="h6">
            {sortAddress(data?.walletAddress)}
            &nbsp;&nbsp;
            <CopyToClipboard text={data?.walletAddress}>
              <FaRegCopy
                size={14}
                style={{ cursor: "pointer" }}
                onClick={() => toast.info("Copied")}
              />
            </CopyToClipboard>
          </Typography>
        </Box>
        <Box className={classes.follower}>
          <Typography variant="h4">Followers</Typography>
          <Typography
            variant="h4"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {data?.followingCount}
          </Typography>
        </Box>
      </Box>
      <Box px={1}>
        <Box className={classes.namesection}>
          <Typography
            variant="h6"
            onClick={() => {
              history.push({
                pathname: "/author",
                search: data._id,
              });
            }}
            style={{ cursor: "pointer" }}
          >
            {data?.name
              ? data?.name
              : `Creators ${firstAddress(data?.walletAddress)}`}
          </Typography>
          <Typography variant="h5">{data?.avatarName}</Typography>
        </Box>
        {/* <Box className={classes.bio}>
          <Typography variant='h6'>{data?.bio ? data?.bio : "N/A"}</Typography>
        </Box> */}
      </Box>
    </Box>
  );
}
