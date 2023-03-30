import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { sortAddress } from "src/utils";
// import DataNotFound from "./DataNotFound";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { FaRegCopy } from "react-icons/fa";
import axios from "axios";
import apiConfig from "src/connectors/config/ApiConfig";

const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: "115px" },
  root2: { paddingTop: "30px" },
  headsection: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "15px",
    "& h1": {
      color: "#fff",
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
      fontSize: "18px",
      paddingTop: "7px",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
    [theme.breakpoints.down("xs")]: {
      borderRadius: "20px",
    },
  },
  box3: {
    display: "flex",
    alignItems: "center",
    paddingTop: "13px",
    "& h6": {
      color: "#C6BECC",
      marginLeft: "10px",
      paddingBottom: "10px",
      [theme.breakpoints.up("sm")]: {
        fontSize: "15px",
      },
      [theme.breakpoints.up("xs")]: {
        fontSize: "12px",
      },
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
  nftImg: {
    width: "100%",
    height: "265px",
    overflow: "hidden",
    cursor: "pointer",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "40px 40px 10px 10px",
    backgroundColor: "#ccc !important",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "20px 20px 10px 10px",
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
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
      },
    },
  },
}));

export default function CreatorCard(props) {
  const { type, index, data } = props;
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     updateDimensions();
  //   }, [index]);
  //   useEffect(() => {
  //     window.addEventListener("resize", updateDimensions);
  //     return () => window.removeEventListener("resize", updateDimensions);
  //   }, []);

  return (
    <Box className={classes.boxsection}>
      <Box
        // id={`imagecard${index}`}
        className={classes.nftImg}
        onClick={() => {
          history.push({
            pathname: "/nft",
            search: data._id,
          });
        }}
        style={{
          background:
            "url(" +
            `${
              data?.nftId?.coverImage
                ? data?.nftId?.coverImage
                : "/images/onlycamimg.png"
            }` +
            ")",
        }}
      ></Box>
      <Box className="nameChianImage">
        <Typography
          variant="h6"
          onClick={() => {
            history.push({
              pathname: "/nft",
              search: data._id,
            });
          }}
        >
          {data?.nftId?.tokenName}
        </Typography>
        <img src={data?.uri} alt="" />
      </Box>
      <Box className={classes.box3}>
        <Box className={classes.nftimg}>
          <figure>
            <img
              // src={
              //   data?.nftId?.uri ? data?.nftId?.uri : "/images/onlycamimg.png"
              // }
              src={
                data?.userId?.profilePic
                  ? data?.userId?.profilePic
                  : "/images/onlycamimg.png"
              }
              alt=""
            />
          </figure>
        </Box>
        <Typography variant="h6">
          {data?.userId?.name
            ? data?.userId?.name
            : sortAddress(
                data?.userId?.walletAddress ? data?.userId?.walletAddress : ""
              )}
        </Typography>
        &nbsp;&nbsp;
        <CopyToClipboard
          text={data?.userId?.walletAddress ? data?.userId?.walletAddress : ""}
        >
          <FaRegCopy
            size={14}
            style={{
              cursor: "pointer",
              width: "15px",
              height: "15px",
              padding: "0",
            }}
            onClick={() => toast.info("Copied")}
          />
        </CopyToClipboard>
      </Box>
    </Box>
  );
}
