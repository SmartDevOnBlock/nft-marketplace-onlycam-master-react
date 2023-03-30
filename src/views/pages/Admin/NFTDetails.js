import {
  Box,
  Button,
  Grid,
  makeStyles,
  Typography,
  IconButton,
  Container,
} from "@material-ui/core";
import React, { useState, useRef, useEffect, useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { FiMoreHorizontal } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import apiConfig from "src/connectors/config/ApiConfig";
import axios from "axios";
import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";

import {
  getWeb3ContractObject,
  sortAddress,
  calculateTimeLeft,
} from "src/utils";

import {
  deadAddress,
  getMarketplaceContractAddress,
  getNetworkDetails,
  NetworkContextName,
  getNormalMarketplaceContractAddress,
} from "src/constants";
import { UserContext } from "src/context/User";
import moment from "moment";
import DeployABI from "src/constants/ABI/DeployABI.json";
import LazyMarketPlaceABI from "src/constants/ABI/MarketPlaceABI.json";
import NormalMarketplaceABI from "src/constants/ABI/MarketplaceABINormal.json";
import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  nftcard: {
    background: "#FFFFFF",
    backdropFilter: "blur(44px)",
    borderRadius: "40px",
    padding: "10px",
  },
  nftImg: {
    width: "100%",
    height: "330px",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "40px 40px 10px 10px",
    backgroundColor: "#ccc !important",
  },
  headbox: {
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "30px",
    padding: "30px",
  },
  subBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h4": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "28px",
      lineHeight: "130%",
      color: "#FFFFFF",
    },
  },
  creatorbox: {
    alignItems: "center",
    marginTop: "12px",
    "& figure": {
      "& img": { width: "70px", borderRadius: "50%" },
    },
    "& h4": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
    },
  },
  heading: { display: "flex" },
  creColl: {
    display: "flex",
    alignItems: "center",
    "& h4": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "130%",
    },
  },
  highBids: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "130%",
    marginTop: "32px",
  },
  notifi: {
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "30px",
    padding: "15px 30px 15px 30px",
    marginTop: "18px",
    "& h4": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
    },
  },
  profilebox: {
    display: "flex",

    "& figure": {
      "& img": { width: "70px", borderRadius: "50%" },
    },
  },
  auctionend: {
    "& h4": {
      paddingTop: "10px",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "130%",
    },
    "& h6": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "rgba(255, 255, 255, 0.5)",
    },
  },
  bestbid: {
    "& h4": {
      paddingTop: "10px",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "130%",
    },
    "& h6": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "rgba(255, 255, 255, 0.5)",
    },
  },
  name1: {
    paddingLeft: "15px",
    "& h4": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "130%",
    },
    "& h6": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "130%",
      color: "#FFFFFF",
      paddingTop: "10px",
    },
  },
  bidauction: { display: "flex", marginTop: "5px" },
  chain: {
    "& h4": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "130%",
    },
  },
  contract: {
    "& h4": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
    },
    "& h6": {
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "rgba(255, 255, 255, 0.5)",
    },
  },
  token: {
    "& h4": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
    },
    "& h6": {
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "rgba(255, 255, 255, 0.5)",
    },
  },
  blockchain: {
    "& h4": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
    },
    "& h6": {
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "rgba(255, 255, 255, 0.5)",
    },
  },
  more: {
    "& h4": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "21px",
      lineHeight: "27px",
      [theme.breakpoints.down("md")]: {
        fontSize: "17px",
        lineHeight: "22px",
      },
    },
  },
  boxsection: {
    backgroundColor: "#fff",
    borderRadius: "40px",
    padding: "10px",
  },
  nftImg: {
    width: "100%",
    height: "165px",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "100% !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "40px 40px 10px 10px",
    backgroundColor: "#ccc !important",
  },
  likecount: {
    display: "flex",
    fontStyle: "normal",
    alignItems: "center",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "130%",
    color: "#C6BECC",
    "& button": {
      background: "#FCF2FA",
      borderRadius: "50%",
      padding: "11px",
      color: "#D200A5",
      fontSize: "18px",
    },
  },
  box3: {
    display: "flex",
    alignItems: "center",
    paddingTop: "13px",
    "& h6": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#3B0D60",
    },
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "60px",
      overflow: "hidden",
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
      },
    },
  },
  price3: {
    padding: "3px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h5": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#D200A5",
    },
  },
  threedot: {
    fontSize: "20px",
    color: "#fff",
    fontWeight: "600",
    height: "100%",
    width: "100%",
    borderRadius: "50%",
    "& button": {},
  },
  headDialog: {
    padding: "30px",
  },
  dialogContent1: {
    padding: "10px 20px 20px 20px",
    "& h2": {
      color: theme.palette.secondary.main,
    },
    "& label": {
      padding: "4px 0px 1px",
    },
  },
  customizedButton: {
    position: "absolute",
    top: "-42px",
    right: "-9px",
    color: "#fff",
  },
}));
export function NFTDetails({
  orderId,
  setOrderDetailsParent,
  setIsLoadingParent,
  reportId,
  reportDetails,
  getReportDetailsHandler,
}) {
  const history = useHistory();
  const { account, chainId, library } = useWeb3React();
  const classes = useStyles();

  const user = useContext(UserContext);
  const [orderDetails, setOrderDetails] = useState();
  const [orderExtraDeails, setOderExtraDeails] = useState();
  const [bidList, setBidList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentOwner, setCurrentOwner] = useState("");
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [properties, setProperties] = useState("");
  const [openBuy, setOpenBuy] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isOrderExpired, setIsOrderExpired] = useState(false);
  const [bidExtraDetails, setBidExtraDetails] = useState();
  const [networkDetails, setNetworkDetails] = useState();

  //   const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    setIsLoadingParent(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (orderDetails) {
      setOrderDetailsParent(orderDetails);
    }
  }, [orderDetails]);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    if (orderId) {
      getNftDetails(orderId, cancelTokenSource);
    } else {
      // setIsLoading(false);
    }

    return () => {
      cancelTokenSource.cancel();
    };
  }, [orderId, user.userData]);

  const getNftDetails = async (id, cancelTokenSource) => {
    try {
      const res = await axios.get(apiConfig.viewOrder + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setOrderDetails(res.data.result[0]);

        setBidList(res.data.result[0].bidId.reverse());
        if (res.data.result[0]?.nftId[0]?.properties) {
          setProperties(JSON.parse(res.data.result[0].nftId[0].properties));
        }
        if (user.userData && res.data.result[0]) {
          let likesUsers = res.data.result[0].likesUsers.filter(
            (order) => order === user.userData._id
          );
          //   setIsLike(likesUsers.length > 0);
        }
        setIsOrderExpired(
          parseFloat(res.data.result[0].endTime) < parseFloat(moment().unix())
        );

        if (
          res.data.result[0].collectionId[0].contractAddress &&
          res.data.result[0].network
        ) {
          getOrderExtraDetails(
            res.data.result[0].collectionId[0].contractAddress,
            res.data.result[0].nftId[0].tokenId,
            res.data.result[0].network,
            res.data.result[0].collectionId[0]?.isLazyMinting,
            res.data.result[0].nftId[0]?.isResale
          );
        }
      } else {
        setOrderDetails();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log("ERROR", error);
    }
  };

  const getOrderExtraDetails = async (
    contractAddress,
    tokenID,
    chianId,
    isLazyMinting,
    isResale
  ) => {
    const OpenMarketplace =
      isLazyMinting && !isResale
        ? getMarketplaceContractAddress(chianId)
        : getNormalMarketplaceContractAddress(chianId);
    const networkDetails = getNetworkDetails(chianId);
    setNetworkDetails(networkDetails[0]);

    const contractObj = await getWeb3ContractObject(
      isLazyMinting && !isResale ? LazyMarketPlaceABI : DeployABI,
      contractAddress,
      networkDetails[0].rpcUrls[0]
    );

    const contractObjNormal = await getWeb3ContractObject(
      isLazyMinting && !isResale ? LazyMarketPlaceABI : NormalMarketplaceABI,
      OpenMarketplace,
      networkDetails[0].rpcUrls[0]
    );

    try {
      const ownerOf = await contractObj.methods.ownerOf(tokenID).call();
      setCurrentOwner(ownerOf);
      console.log("ownerOf", ownerOf);
    } catch (error) {
      console.log("ERROR", error);
    }

    try {
      if (isLazyMinting && !isResale) {
        const ordersData = await contractObjNormal.methods
          .orderByAssetId(tokenID)
          .call();

        setOderExtraDeails(ordersData);
        if (ordersData?.seller == deadAddress) {
          setIsCancelled(true);
        }
      } else {
        const ordersData = await contractObjNormal.methods
          .orderByAssetId(contractAddress, tokenID)
          .call();

        setOderExtraDeails(ordersData);
        if (ordersData?.seller == deadAddress) {
          setIsCancelled(true);
        }
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsCancelled(true);
    }
    try {
      if (isLazyMinting && !isResale) {
        const bidByOrderId = await contractObjNormal.methods
          .bidByOrderId(tokenID)
          .call();
        setBidExtraDetails(bidByOrderId);
      } else {
        const bidByOrderId = await contractObjNormal.methods
          .bidByOrderId(contractAddress, tokenID)
          .call();
        setBidExtraDetails(bidByOrderId);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const blockReportHandler = async () => {
    try {
      const res = await axios.get(apiConfig.blockReport + reportId, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode == 200) {
        toast.success(res.data.responseMessage);
        if (getReportDetailsHandler) {
          getReportDetailsHandler();
        }
      } else {
        toast.error(res.data.responseMessage);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <DataLoading />
      ) : (
        <>
          {!orderDetails ? (
            <DataNotFound />
          ) : (
            <>
              <Box className={classes.headbox}>
                <Box className={classes.subBox}>
                  <Typography variant='h4'>
                    {orderDetails?.nftId[0]?.title}
                  </Typography>
                </Box>
                <Box mt={2}>
                  {!account && (
                    <Typography variant='h4'>Please Login</Typography>
                  )}
                  {account &&
                    isCancelled &&
                    currentOwner &&
                    currentOwner.toLowerCase() != account.toLowerCase() && (
                      <Typography variant='h4' style={{ color: "red" }}>
                        Expired
                      </Typography>
                    )}
                  <Grid container spacing={1}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Button
                        variant='contained'
                        size='small'
                        color='primary'
                        fullWidth
                        onClick={() => blockReportHandler()}
                      >
                        {reportDetails?.actionApply ? "Unblock" : "Block"}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
                {bidList.length > 0 && (
                  <Box className={classes.highBids}>
                    <Typography variant='h4'>
                      From{" "}
                      {bidList.length > 0
                        ? bidList[bidList.length - 1].price
                        : orderDetails.price}{" "}
                      Highest bid{" "}
                      {bidList.length > 0
                        ? bidList[0].price
                        : orderDetails.price}
                    </Typography>
                  </Box>
                )}
                <Box className={classes.heading}></Box>
                <Grid container spacing={0}>
                  <Grid
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                    className={classes.creatorbox}
                  >
                    <Typography variant='h4'>Creator</Typography>
                    <Box
                      className={classes.creColl}
                      onClick={() => {
                        history.push({
                          pathname: "/author",
                          search: orderDetails.userId[0]._id,
                        });
                      }}
                    >
                      <figure>
                        <img
                          src={
                            orderDetails.userId[0]?.profilePic
                              ? orderDetails.userId[0]?.profilePic
                              : "/images/onlycamimg.png"
                          }
                          alt=''
                        />
                      </figure>
                      <Typography variant='h4'>
                        {" "}
                        {orderDetails.userId[0].name
                          ? orderDetails.userId[0].name
                          : sortAddress(orderDetails.userId[0].walletAddress)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                    className={classes.creatorbox}
                  >
                    <Typography variant='h4'>Collection</Typography>
                    <Box className={classes.creColl}>
                      <figure>
                        <img
                          src={
                            orderDetails.collectionId[0] &&
                            orderDetails.collectionId[0].collectionImage
                              ? orderDetails.collectionId[0].collectionImage
                              : "/images/onlycamimg.png"
                          }
                          alt=''
                        />
                      </figure>
                      <Typography
                        variant='h4'
                        style={{ textTransform: "capitalize" }}
                      >
                        {" "}
                        {orderDetails.collectionId[0]?.displayName}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              {bidList.length > 0 && (
                <Box className={classes.headbox} mt={3}>
                  <Box className={classes.profilebox}>
                    <figure
                      onClick={() => {
                        history.push({
                          pathname: "/author",
                          search: bidList[0].userId[0]?._id,
                        });
                      }}
                    >
                      <img src='/images/onlycamimg.png' alt='' />
                    </figure>
                    <Box className={classes.name1}>
                      <Typography variant='h4'>
                        {bidList[0].userId[0]?.name
                          ? bidList[0].userId[0]?.name
                          : sortAddress(bidList[0].userId[0]?.walletAddress)}
                      </Typography>
                      {/* <Typography variant='h6'></Typography> */}
                      <Box className={classes.bidauction}>
                        <Box className={classes.bestbid}>
                          <Typography variant='h6'>
                            Best bid &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </Typography>
                          <Typography variant='h4'>
                            {bidList[0].price}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </Typography>
                        </Box>
                        {orderDetails &&
                        ((orderExtraDeails &&
                          orderExtraDeails.seller.toLowerCase() ===
                            deadAddress.toLowerCase()) ||
                          parseFloat(orderDetails.endTime) <
                            parseFloat(moment().unix())) ? (
                          <Box className={classes.auctionend}>
                            <Typography variant='h6'>Status</Typography>
                            <Typography variant='h4'>Order Expired</Typography>
                          </Box>
                        ) : (
                          <Box className={classes.auctionend}>
                            <Typography variant='h6'>Acution End</Typography>
                            <Typography variant='h4'>
                              {timeLeft.days && timeLeft.days}d :
                              {timeLeft.hours && timeLeft.hours}h :
                              {timeLeft.minutes && timeLeft.minutes}m :
                              {timeLeft.seconds && timeLeft.seconds}s :
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
              <Box className={classes.headbox} mt={3}>
                <Box className={classes.chain}>
                  <Typography variant='h4'>Chain info</Typography>
                </Box>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow className={classes.contract}>
                        <TableCell>
                          <Typography variant='h6'>
                            Contract Address:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='h4'>
                            {sortAddress(
                              orderDetails?.collectionId[0].contractAddress
                            )}
                          </Typography>
                        </TableCell>
                      </TableRow>

                      <TableRow className={classes.blockchain}>
                        <TableCell>
                          <Typography variant='h6'>Blockchain:</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='h4'>
                            {NetworkContextName}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
}

export default function NFTDetailsData() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [orderId, setOrderId] = useState();
  const location = useLocation();
  const [reportDetails, setReportDetails] = useState();
  const [orderDetails, setOrderDetails] = useState();
  const [reportId, setReportId] = useState();

  useEffect(() => {
    if (location.search && location.search.length > 0) {
      const ids = location.search.split("?");
      if (ids[1]) {
        setReportId(ids[1]);
      }
    }
  }, [location]);

  useEffect(() => {
    if (!user.isAdmin) {
      history.goBack();
    }
  }, [user.isAdmin]);

  const getReportDetailsHandler = async () => {
    try {
      const res = await axios.get(apiConfig.viewReport + reportId, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });

      if (res.data.statusCode === 200) {
        setReportDetails(res.data.result);
        setOrderId(res.data.result?.orderId?._id);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    if (reportId) {
      getReportDetailsHandler(reportId, cancelTokenSource);
    } else {
      // setIsLoading(false);
    }

    return () => {
      cancelTokenSource.cancel();
    };
  }, [reportId, user.userData]);

  return (
    <Box className={classes.root}>
      <Container>
        <Grid container spacing={2}>
          {isLoading ? (
            <DataLoading />
          ) : (
            <Grid item lg={7} md={7} sm={12} xs={12}>
              <Box className={classes.nftcard}>
                <Box
                  className={classes.nftImg}
                  style={{
                    background: `url(${
                      orderDetails?.nftId[0]?.coverImage
                        ? orderDetails?.nftId[0]?.coverImage
                        : "/images/cat.png"
                    })`,
                  }}
                ></Box>
              </Box>
              <Box className={classes.headbox} mt={3}>
                <Box className={classes.chain}>
                  <Typography variant='h4'>Report Details</Typography>
                </Box>
                <Box mt={2}>
                  <Typography variant='h4'>{reportDetails?.message}</Typography>
                </Box>
              </Box>
            </Grid>
          )}
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <Box>
              <NFTDetails
                orderId={orderId}
                setOrderDetailsParent={(data) => setOrderDetails(data)}
                setIsLoadingParent={(status) => setIsLoading(status)}
                reportId={reportId}
                reportDetails={reportDetails}
                getReportDetailsHandler={getReportDetailsHandler}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
