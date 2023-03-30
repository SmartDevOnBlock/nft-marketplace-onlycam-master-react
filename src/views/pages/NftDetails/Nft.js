import { Box, Button, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import History from "./History";
import Sale from "./Sale";
import Bids from "./Bids";
import { Details } from "./Details";
import { useLocation } from "react-router-dom";
import DataLoading from "src/component/DataLoading";
import { GiFlexibleLamp } from "react-icons/gi";
import axios from "axios";
import apiConfig from "src/connectors/config/ApiConfig";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  headbox: {
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "30px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  nftcard: {
    background: "#FFFFFF",
    backdropFilter: "blur(44px)",
    borderRadius: "40px",
    padding: "10px",
  },
  nftImg: {
    width: "100%",
    heigth: "auto",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "40px 40px 10px 10px",
    backgroundColor: "#ccc !important",
  },
  tabBtn: {
    margin: "20px 0px 10px 0px",
    backgroundColor: "#FCF2FA",
    borderRadius: "22px",
    padding: "14px",

    "& button": {
      borderRadius: "15px",
      fontWeight: "400",
      fontSize: "14px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "13px",
      },
      "&.active": {
        color: "#fff",
        height: "40px",
        padding: "10px 20px",
        fontSize: "15px",
        boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
        lineHeight: "21px",
        borderRadius: "15px",
        backgroundColor: "#D200A5",
        [theme.breakpoints.down("sm")]: {
          padding: "6px 10px",
        },
      },
    },
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
    padding: "10px",
    padding: "5px",
  },
  profileimg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      width: "75px",
      marginRight: "20px",
    },
    "& img": {
      maxHeight: "100%",
      maxWidth: "100%",
      height: "auto",
      width: "auto",
    },
  },
  price1: {
    "& h5": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "28px",
      lineHeight: "130%",
      color: "#3B0D60",
    },
    "& h6": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#3B0D60",
      marginTop: "5px",
      "& span": {
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "130%",
        color: "#D200A5",
      },
    },
  },
  time: {
    paddingRight: "25px",
    "& h6": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#C6BECC",
    },
  },
  imgSection: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    background: "#FFFFFF",
    borderRadius: "40px",
    backdropFilter: "blur(44px)",
    "& figure": {
      width: "auto",
      height: "230px",
      overflow: "hidden",
      borderRadius: "40px 40px 40px 40px",
      backgroundSize: "cover !important",
      backgroundColor: "#ccc !important",
      backgroundRepeat: "no-repeat !important",
      backgroundPosition: "center !important",
      "@media(max-width:767px)": {
        height: "auto",
      },
    },
    "& img": {
      width: "auto",
      height: "auto",
      maxWidth: "100%",
    },
  },
}));

export default function Nft() {
  const [tabview, setTabView] = useState("bids");
  const classes = useStyles();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState();
  const [bidList, setBidList] = useState([]);
  const [orderId, setOrderId] = useState();
  const [dataList, setDataList] = useState([]);
  const [properties, setProperties] = useState("");

  const viewCollectionHandler = async (id) => {
    try {
      const res = await axios({
        method: "GET",
        url: apiConfig.viewCollection + id,
      });
      if (res.data.statusCode === 200) {
        setDataList(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location.search && location.search.length > 0) {
      const ids = location.search.split("?");

      if (ids[1]) {
        setOrderId(ids[1]);
        viewCollectionHandler(ids[1]);
      }
    }
  }, [location]);

  const fileExtention = orderDetails?.nftId[0]?.mediaFile.split(".").pop();

  const nftFileType =
    fileExtention == "mp4" || fileExtention == "webp"
      ? "video"
      : fileExtention == "mp3"
      ? "audio"
      : "image";
  console.log("nftFileType", nftFileType);

  return (
    <Box className={classes.root}>
      <Container>
        <Grid container spacing={2}>
          {isLoading ? (
            <DataLoading />
          ) : (
            <Grid item lg={7} md={7} sm={12} xs={12}>
              <Box className={classes.nftcard}>
                {nftFileType !== "video" &&
                  orderDetails?.nftId[0]?.mediaType !== "video" && (
                    <Box className={classes.nftImg}>
                      <img
                        style={{ width: "100%" }}
                        src={
                          orderDetails?.nftId[0]?.coverImage
                            ? orderDetails?.nftId[0]?.coverImage
                            : "/images/onlycamimg.png"
                        }
                        alt=''
                      />
                    </Box>
                  )}
                {(orderDetails?.nftId[0]?.mediaType === "audio" ||
                  nftFileType === "video" ||
                  nftFileType === "audio" ||
                  orderDetails?.nftId[0]?.mediaType === "video") && (
                  <Box style={{ width: "100%" }}>
                    <video
                      width='100%'
                      controls='false'
                      autoplay='true'
                      loop
                      muted
                      playsinline='true'
                      style={
                        orderDetails?.nftId[0]?.mediaType === "audio"
                          ? { height: 75, borderRadius: "35px" }
                          : { borderRadius: "35px" }
                      }
                    >
                      <source
                        src={
                          (orderDetails?.nftId[0]?.mediaType === "audio" ||
                            orderDetails?.nftId[0]?.mediaType === "video") &&
                          nftFileType === "image"
                            ? orderDetails?.nftId[0]?.uri
                            : orderDetails?.nftId[0]?.mediaFile
                        }
                        type='video/mp4'
                      />
                    </video>
                  </Box>
                )}
                <Box className={classes.tabBtn}>
                  <Button
                    className={tabview === "bids" ? "active" : ""}
                    onClick={() => setTabView("bids")}
                  >
                    Bids
                  </Button>
                  <Button
                    className={tabview === "details" ? "active" : " "}
                    onClick={() => setTabView("details")}
                  >
                    Details
                  </Button>
                  <Button
                    className={tabview === "history" ? "active" : " "}
                    onClick={() => setTabView("history")}
                  >
                    History
                  </Button>
                </Box>

                <Box>
                  {tabview === "bids" ? <Bids bidList={bidList} /> : ""}
                  {tabview === "details" ? (
                    <Details
                      orderDetails={orderDetails}
                      properties={properties}
                    />
                  ) : (
                    ""
                  )}
                  {tabview === "history" ? (
                    <History orderDetails={orderDetails} />
                  ) : (
                    ""
                  )}
                </Box>
              </Box>

              <Box className={classes.headbox} mt={3}>
                {orderDetails?.collectionId[0]?.contractAddress && (
                  <iframe
                    width='400'
                    height='625'
                    src={`https://www.flooz.trade/embedded/${orderDetails?.collectionId[0]?.contractAddress}/?backgroundColor=transparent&chainId=56`}
                    title='Flooz Trade'
                    frameborder='0'
                    allow='clipboard-read; clipboard-write; web-share; accelerometer ; autoplay ; camera ; gyroscope ; payment '
                  ></iframe>
                )}
              </Box>
            </Grid>
          )}
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <Box>
              <Sale
                orderId={orderId}
                setOrderDetailsParent={(data) => setOrderDetails(data)}
                setBidListParent={(list) => setBidList(list)}
                setIsLoadingParent={(status) => setIsLoading(status)}
                setPropertiesParent={(p_properties) =>
                  setProperties(p_properties)
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
