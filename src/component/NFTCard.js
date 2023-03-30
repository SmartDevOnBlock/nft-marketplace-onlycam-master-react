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

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";

import { FaRegCopy } from "react-icons/fa";
import CopyToClipboard from "react-copy-to-clipboard";

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
      "@media(max-width:280px)": {
        width: "40px",
        height: "40px",
      },
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
      "@media(max-width:767px)": {
        fontSize: "11px",
      },
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
    padding: "0px 5px 10px",
    marginTop: "8px",
  },
  dotimg: {
    background: "#D200A5",
    boxShadow: "0px 4px 7px rgba(210, 0, 165, 0.25)",
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
export default function NFTCard(props) {
  const history = useHistory();
  const user = useContext(UserContext);

  const { data, type, index, callbackFun, orderList } = props;
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

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

  const likeDislikeNftHandler = async (id) => {
    if (user.isLogin && id) {
      try {
        const res = await axios.get(apiConfig.likeDislikeOrder + id, {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          toast.success(res.data.responseMessage);
          if (callbackFun) {
            callbackFun();
          }
        } else {
          toast.warn(res.data.responseMessage);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.warn("Please login");
    }
  };

  if (user.userData && data?.likesUsers) {
    var likesUsers = data?.likesUsers?.filter(
      (order) => order === user.userData._id
    );
    var isLike = likesUsers?.length > 0;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(new Date(parseInt(data?.endTime) * 1000)));
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <Box className={classes.boxsection}>
      <Box
        id={`imagecard${index}`}
        className={classes.nftImg}
        // style={{ background: "url(" + data?.nftId?.coverImage + ")" }}
        onClick={() => {
          history.push({
            pathname: "/nft",
            search: data._id,
          });
        }}
      >
        <img src={data?.nftId?.coverImage} alt="" />
        {data?.nftId?.mediaType === "video" && (
          <Box style={{ position: "absolute", right: "20px", top: "10px" }}>
            <PlayCircleOutlineIcon
              onClick={() => {
                history.push({
                  pathname: "/nft",
                  search: data._id,
                });
              }}
              style={{ cursor: "pointer", color: "white" }}
            />
          </Box>
        )}
        {data?.nftId?.mediaType === "audio" && (
          <Box style={{ position: "absolute", right: "20px", top: "10px" }}>
            <AudiotrackIcon
              onClick={() => {
                history.push({
                  pathname: "/nft",
                  search: data._id,
                });
              }}
              style={{ cursor: "pointer", color: "white" }}
            />
          </Box>
        )}
      </Box>
      <Box className="nameChianImage">
        <Typography
          variant="h6"
          onClick={() => {
            history.push({
              pathname: "/nft",
              search: data._id,
            });
          }}
          style={{ cursor: "pointer" }}
        >
          {data?.nftId?.tokenName}{" "}
        </Typography>
        <img src={`/images/chainImages/${data?.nftId?.network}.png`} alt="" />
      </Box>
      <Box className={classes.box3}>
        <Box display="flex" alignItems="center">
          <img
            src={
              data?.userId?.profilePic
                ? data?.userId?.profilePic
                : "/images/onlycamimg.png"
            }
            onClick={() => {
              history.push({
                pathname: "/author",
                search: data?.userId?._id,
              });
            }}
            style={{ cursor: "pointer" }}
            alt=""
          />
          <Typography
            variant="h6"
            title={
              data?.userId?.userName
                ? data?.userId?.userName
                : data?.userId?.walletAddress
            }
          >
            {data?.userId?.userName
              ? data?.userId?.userName.slice(0, 7) + ".."
              : sortAddress(data?.userId?.walletAddress)}
          </Typography>
          &nbsp;&nbsp;
          <CopyToClipboard text={data?.userId?.walletAddress}>
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
        <Box display="flex" alignItems="center">
          <Typography variant="h5">{data?.likesUsers?.length}</Typography>
          <BiLike
            style={
              isLike
                ? { cursor: "pointer", color: "#D200A5" }
                : { cursor: "pointer", color: "#E4C3DE" }
            }
            onClick={() => likeDislikeNftHandler(data._id)}
          />
        </Box>
      </Box>
      {/* {type == "auction" && ( */}
      <Box className={classes.box4}>
        <Box className={classes.text3}>
          <Typography variant="h5">Price</Typography>
          <Typography variant="h5">Ending in:</Typography>
        </Box>
        <Box className={classes.text4}>
          <Typography variant="h4" style={{ fontSize: "12px" }}>
            {data?.price}&nbsp;
            {data?.currencyName === "OnlyCam"
              ? "$ONLY"
              : data?.currencyName === ""
              ? ""
              : data?.currencyName}
          </Typography>
          {parseFloat(data?.endTime) < moment().unix() || !data?.endTime ? (
            <Typography variant="h4">Expired</Typography>
          ) : (
            <Typography variant="h4" style={{ fontSize: "12px" }}>
              {" "}
              {timeLeft.days ? timeLeft.days && timeLeft.days : "0"}d :
              {timeLeft.hours ? timeLeft.hours && timeLeft.hours : "0"}h :
              {timeLeft.minutes ? timeLeft.minutes && timeLeft.minutes : "0"}m :{" "}
              {timeLeft.seconds ? timeLeft.seconds && timeLeft.seconds : "0"}s
            </Typography>
          )}
        </Box>
      </Box>
      {/* // )} */}
    </Box>
  );
}
