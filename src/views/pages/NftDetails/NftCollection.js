import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect, useContext } from "react";

import { useLocation } from "react-router-dom";
import apiConfig from "src/connectors/config/ApiConfig";
import axios from "axios";
import { UserContext } from "src/context/User";
import ShareSocialMedia from "src/component/ShareSocialMedia";
import { sortAddress } from "src/utils";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import DataLoading from "src/component/DataLoading";
import NftParticularList from "./NftParticularList";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataNotFound from "src/component/DataNotFound";
import NFTCard from "src/component/NFTCard";
const useStyles = makeStyles((theme) => ({
  root: { padding: "70px 0px" },
  bannerimg: {
    overflow: "hidden",
    background: "rgba(0,0,0,0.7)",
    position: "relative",
    backgroundPosition: "center !important",
    backgroundRepeat: " no-repeat !important",
    backgroundSize: "100% !important",
    height: "260px",
    borderRadius: "45px",
    "@media(max-width:1010px)": {
      height: "140px",
      borderRadius: "25px",
    },

    "& img": {
      minHeight: "100%",
      minWidth: "100%",
      height: "auto",
      width: "auto",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },

  subsection: {
    display: "flex",
    justifyContent: "start",
    "& h4": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "40px",
      lineHeight: "130%",
    },
    "& h5": {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      color: "rgba(0, 0, 0, 0.5)",
    },
  },
  text1: {
    marginLeft: 14,
    "& h4": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "30px",
      lineHeight: "130%",
      "@media(max-width:1010px)": {
        fontSize: "30px",
      },
      "@media(max-width:930px)": {
        fontSize: "25px",
      },
    },
    "& h5": {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      color: "rgba(0, 0, 0, 0.5)",
    },
  },
  idtxt: {
    display: "flex",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px",
    color: "#3B0D60",
    alignItems: "center",
    "@media(max-width:818px)": {
      display: "block",
    },
  },
  btnbox1: {
    "& button": {
      borderRadius: "10px",
      fontWeight: "600",
      fontSize: "14px",
      marginRight: "4px",
      "&.active": {
        color: "#fff",
        boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
        backgroundColor: "#D200A5",
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
  },
  dotimg: {
    background: "#D200A5",
    boxShadow: "0px 4px 7px rgba(210, 0, 165, 0.25)",
  },

  socialMediaIcon: {
    fontSize: "30px",
    color: "#C6BECC",
  },
  btnfollow: {
    borderRadius: "22px",

    "& button": { borderRadius: "14px", marginRight: "0px" },
  },
  btnfollow2: {
    background: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(24px)",
    borderRadius: "16px",
    marginRight: "10px",
    padding: "15px 15px",
    height: "46px",
    "@media(max-width:818px)": {
      padding: "6px 16px",
    },
    "& h2": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "40px",
      lineHeight: "130%",
      textAlign: "center",
      color: "#FFFFFF",
      "@media(max-width:818px)": {
        fontSize: "18px",
      },
    },
    "& h5": {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#FFFFFF",
      textAlign: "center",
      "@media(max-width:818px)": {
        fontSize: "12px",
      },
    },
  },
  btnfollow3: {
    padding: "15px 15px",
    background: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(24px)",
    borderRadius: "16px",
    height: "46px",
    "& h2": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "40px",
      lineHeight: "130%",
      textAlign: "center",
      color: "#FFFFFF",
      "@media(max-width:930px)": {
        fontSize: "25px",
      },
    },
    "& h5": {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#FFFFFF",
    },
  },
  headbox2: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    marginBottom: "15px",
    "@media(max-width:767px)": {
      display: "block",
      padding: "0 10px",
    },
  },
  btnhead: {
    display: "flex",
    marginTop: "-140px",
    alignItems: "center",
    "@media(max-width:800px)": { marginTop: "20px", marginBottom: "20px" },
  },
  profileimg: {
    marginTop: "-140px",
    overflow: "hidden",
    display: "flex",
    backgroundPosition: "center !important",
    backgroundSize: "100% !important",
    backgroundRepeat: " no-repeat !important",
    width: "200px",
    height: "200px",
    background: "rgba(0 , 0, 0, 0.041)",
    borderRadius: "100%",
    "@media(max-width:800px)": {
      marginTop: "-65px",
      width: "110px",
      height: "110px",
      zIndex: 9,
      position: "relative",
    },
    "& img": {
      background: "rgba(0 , 0, 0, 1)",
      minHeight: "100%",
      minWidth: "100%",
      height: "auto",
      width: "auto",
    },
  },

  FollowingBox: {
    overflowx: "scroll",
  },
  file: {
    padding: "10px 10px 10px 10px",
    background: "#FCF2FA",
    borderRadius: "50%",
  },
  address: {
    display: "flex",
    alignItems: "center",
    "& h3": {
      color: theme.palette.secondary.main,
      fontWeight: "bold",
      fontSize: "18px",
      lineHeight: "130%",
    },
  },
}));

export default function Author() {
  const user = useContext(UserContext);

  const [tabview, setTabView] = useState("NftParticularList");

  const classes = useStyles();
  const [isActive, setActive] = useState(false);
  const [isActive1, setActive1] = useState(false);
  const location = useLocation();
  const toggleClass = () => {
    setActive(!isActive);
  };
  const toggleClass1 = () => {
    setActive1(!isActive1);
  };

  const [orderId, setOrderId] = useState();
  const [dataList, setDataList] = useState([]);
  const [dataListParticular, setDataListParticular] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [idddd, setId] = useState();

  const viewCollectionHandler = async (id) => {
    setIsLoading1(true);
    try {
      const res = await axios({
        method: "GET",
        url: apiConfig.viewCollection + id,
      });
      if (res.data.statusCode === 200) {
        setDataList(res.data.result);

        collectionOrderListHandler(res.data.result?._id);
        setId(res.data.result?._id);
        setIsLoading1(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading1(false);
    }
  };
  const collectionOrderListHandler = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: apiConfig.collectionOrderList,
        params: {
          _id: id,
        },
      });
      if (res.data.statusCode === 200) {
        setDataListParticular(res.data.result);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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

  return (
    <Box className={classes.root}>
      <Container>
        <figure className={classes.bannerimg}>
          <img
            src={
              dataList?.bannerImage
                ? dataList?.bannerImage
                : "/images/onlycamimg.png"
            }
          />
        </figure>
        <Box className={classes.headbox2}>
          <Box style={{ display: "flex", flexWrap: "wrap", zIndex: "99" }}>
            <Box>
              <figure className={classes.profileimg}>
                <img
                  src={
                    dataList?.collectionImage
                      ? dataList?.collectionImage
                      : "/images/onlycamimg.png"
                  }
                  alt=""
                />
              </figure>
            </Box>
            <Box className={classes.text1}>
              <Typography
                variant="h4"
                style={{ textTransform: "capitalize", color: "#000" }}
              >
                {dataList?.displayName ? dataList?.displayName : "-"}
              </Typography>

              <Box className={classes.address} mt={1}>
                <Typography variant="h3">
                  {sortAddress(dataList?.contractAddress)}&nbsp;
                </Typography>

                <CopyToClipboard text={dataList?.contractAddress}>
                  <IconButton>
                    <img
                      src="/images/file.png"
                      alt="hghgh"
                      style={{ cursor: "pointer" }}
                      onClick={() => toast.info("Copied")}
                    />
                  </IconButton>
                </CopyToClipboard>
              </Box>
              {dataList?.description && (
                <Box>
                  <Typography variant="body2" style={{ color: "#000" }}>
                    {dataList?.description ? dataList?.description : ""}
                  </Typography>
                </Box>
              )}
            </Box>
            {!isLoading1 && dataList && dataList.length === 0 && (
              <DataNotFound />
            )}
            {isLoading1 && <ButtonCircularProgress />}
          </Box>
        </Box>
        <Box className={classes.btnbox1}>
          <Button
            variant="h6"
            className={tabview === "NftParticularList" ? "active" : ""}
            onClick={() => setTabView("NftParticularList")}
          >
            NFT
          </Button>
        </Box>

        <hr
          style={{
            border: "1px solid rgba(255, 255, 255, 0.16)",
            marginTop: "8px",
          }}
        />
        <Box style={{ marginTop: "1rem" }}>
          {tabview === "NftParticularList" ? (
            <Grid container spacing={2}>
              {dataListParticular &&
                dataListParticular.map((data, i) => {
                  return (
                    <Grid item lg={3} md={4} sm={6} xs={12}>
                      <NFTCard
                        data={data}
                        index={i}
                        callbackFun={() => {
                          viewCollectionHandler(orderId);
                          collectionOrderListHandler(idddd);
                        }}
                      />
                    </Grid>
                  );
                })}
              {!isLoading &&
                dataListParticular &&
                dataListParticular.length === 0 && <DataNotFound />}

              {isLoading && <ButtonCircularProgress />}
            </Grid>
          ) : (
            ""
          )}
        </Box>
      </Container>
    </Box>
  );
}
