import { sortAddress, calculateTimeLeft } from "src/utils";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useContext, useState, useEffect } from "react";
import { BiLike } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "src/context/User";
import { toast } from "react-toastify";
import apiConfig from "src/connectors/config/ApiConfig";
import moment from "moment";
import CopyToClipboard from "react-copy-to-clipboard";

import { FaRegCopy } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: "70px" },
  root2: { paddingTop: "30px" },
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
    justifyContent: "space-between",
    paddingTop: "13px",
    "& svg": {
      color: theme.palette.primary.main,
      background: "#FCF2FA",
      padding: "15px",
      width: "50px",
      height: "50px",
      borderRadius: "50%",
    },
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
    "& img": {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    "& h5": {
      color: "#C6BECC",
      marginRight: "10px",
      [theme.breakpoints.up("sm")]: {
        fontSize: "29px",
      },
      [theme.breakpoints.up("xs")]: {
        fontSize: "16px",
      },
    },
  },

  nftImg: {
    position: "relative",
    width: "100%",
    height: "210px",
    overflow: "hidden",
    cursor: "pointer",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "40px 40px 10px 10px",
    backgroundColor: "#9572b4 !important",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "20px 20px 10px 10px",
    },
    "& img": {
      objectPosition: "center bottom",
      height: "100%",
      position: "absolute",
      top: "0",
      left: "50%",
      transform: "translateX(-50%)",
      maxWidth: "fit-content",
    },
  },
}));
export default function NormalNFTCard(props) {
  const history = useHistory();
  const user = useContext(UserContext);
  const { data, index } = props;

  const classes = useStyles();
  const updateDimensions = () => {
    var offsetWidth = document.getElementById("imagecard" + index).offsetWidth;
    var newoofsetWidth = offsetWidth - 20;
    document.getElementById("imagecard" + index).style.height =
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
        id={`imagecard${index}`}
        className={classes.nftImg}
        onClick={() => {
          history.push({
            pathname: "/resell-nft",
            search: data._id,
          });
        }}
      >
        <img src={data.coverImage} />
      </Box>
      <Box>
        <Typography variant="h6">{data?.tokenName}</Typography>
      </Box>
      <Box className={classes.box3}>
        <Box display="flex" alignItems="center">
          <img
            src={
              data?.userId[0]?.profilePic
                ? data?.userId[0]?.profilePic
                : "/images/onlycamimg.png"
            }
            alt=""
          />
          <Typography variant="h6">
            {data?.userId[0]?.userName
              ? data?.userId[0]?.userName
              : sortAddress(data?.userId[0]?.walletAddress)}
          </Typography>
          &nbsp;&nbsp;
          <CopyToClipboard text={data?.userId[0]?.walletAddress}>
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
    </Box>
  );
}
