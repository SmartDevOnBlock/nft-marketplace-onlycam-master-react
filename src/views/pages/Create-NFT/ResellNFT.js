import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  InputLabel,
  Input,
  IconButton,
  TextField,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { CgTimelapse } from "react-icons/cg";
import { HiTag } from "react-icons/hi";
import { FaThumbsUp } from "react-icons/fa";
import { UserContext } from "src/context/User";
import { useLocation } from "react-router-dom";
import axios from "axios";
import apiConfig from "src/connectors/config/ApiConfig";
import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";
import { DateTimePicker } from "@material-ui/pickers";
import moment from "moment";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import {
  networkList,
  getNormalMarketplaceContractAddress,
  ACTIVE_NETWORK_BNB,
  ACTIVE_NETWORK_ETH,
  getPayableTokenContractAddress,
} from "src/constants";
import { useWeb3React } from "@web3-react/core";
import { swichNetworkHandler, sortAddress } from "src/utils";
import DeployABI from "src/constants/ABI/DeployABI.json";
import NormalMarketplaceABI from "src/constants/ABI/MarketplaceABINormal.json";
import NftTokenABI from "src/constants/ABI/NftTokenABI.json";
import {
  approveTokenHandler,
  placeNormalOrderBlockchainHandler,
} from "src/services";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  NftBreed: {
    paddingTop: theme.spacing(18),
    paddingBottom: theme.spacing(10),
  },
  PageHeading: {
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "39px",
    color: "#898989",
    paddingBottom: "10px",
    display: "flex",
    alignItems: "center",
    "& span": {
      color: "#000",
      lineHeight: "0",
      cursor: "pointer",
      position: "relative",
      "&:hover div": {
        opacity: "1",
      },
      "& svg": {
        paddingLeft: "5px",
        color: "#898989",
      },
    },
  },
  button: {
    marginBottom: "15px",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "0px",
    boxShadow: "none",
    borderBottom: "0",
    borderRadius: "0",
    height: "50px",
    background: "transparent",
    color: "#898989",
    "&:hover": {
      backgroundColor: "#E6E6E6",
      boxShadow: "none",
      borderRadius: "5px",
    },
  },
  createbox: {
    "& .MuiDialog-paperScrollPaper": {
      width: 450,
      maxWidth: 450,
      minWidth: 450,
      [theme.breakpoints.down("sm")]: {
        width: "95%",
        maxWidth: "95%",
        minWidth: "95%",
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
  price3: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h5": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "18px",
      lineHeight: "130%",
      color: "#D200A5",
    },
  },
  likecount: {
    display: "flex",
    alignItems: "center",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "130%",
    color: "#C6BECC",
    "& button": {
      background: "#FCF2FA",
      borderRadius: "50%",
      padding: "15px",
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
      marginLeft: "8px",
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
  innerCollection: {
    position: "absolute",
    width: "calc(100% - 40px)",
    bottom: "0px",
    left: "50%",
    transform: "translateX(-50%)",
    borderRadius: "20px 20px 0 0",
    padding: "20px",
    background: "#1a1919",
  },
  selectOption: {
    width: "300px",
    display: "flex",
    justifyContent: "space-around",

    flexDirection: "row",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
    margin: "0 10px",
  },
  sectionTitleHead: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    margin: "10px 0 ",
    padding: "0 0",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  title: {
    borderBottom: "1px solid #eaeaea",
  },
  ListItem: {
    "& span": {
      fontSize: "20px",
      lineHeight: "30px",
      color: "#0F8ACA",
      fontWeight: "400",
    },
    "& p": {
      fontSize: "14px",
      lineHeight: "22px",
      color: "#898989",
      fontWeight: "400",
    },
  },

  createIcon: {
    width: 100,
    height: 100,
    color: "#222",
  },
  formControl: {
    padding: 0,
    width: "100%",
  },
  walletSet: {
    padding: "0 15px 0 0",
  },
  resellNft: {
    "& h2": { color: theme.palette.secondary.main },
  },
  price: {
    "& label": { color: theme.palette.secondary.main },
  },
  label1: {
    color: theme.palette.secondary.main,
  },
  NftImg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "210px",
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
  nftTitle: {
    "& h6": { color: "#3B0D60 !important" },
    "& h5": {
      color: "#D200A5 !important",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "21px",
    },
  },
}));

export default function CreateNFT(props) {
  const { account, chainId, library } = useWeb3React();
  const user = useContext(UserContext);
  const location = useLocation();
  const history = useHistory();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState();
  const [orderId, setOrderId] = useState();
  const [price, setPrice] = useState("");
  const classes = useStyles();
  const [isSubmit, setIsSubmit] = useState(false);
  const [endDate, setEndDate] = useState(moment().add(6, "M"));
  const [network, setNetwork] = useState(networkList[0]);
  const [payableToken, setPayableToken] = useState("select");
  const [isNonExpiring, setIsNonExpiring] = useState(false);

  const { data, index } = props;

  useEffect(() => {
    if (orderDetails && networkList) {
      const networkData = networkList.filter(
        (list) => list.chainId == orderDetails.network
      );
      setNetwork(networkData[0]);
      swichNetworkHandler(orderDetails.network);
    }
  }, [networkList, orderDetails]);

  const updateDimensions = () => {
    try {
      var offsetWidth = document.getElementById(
        "imagecard" + index
      ).offsetWidth;
      var newoofsetWidth = offsetWidth - 20;
      document.getElementById("imagecard" + index).style.height =
        newoofsetWidth + "px";
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  useEffect(() => {
    if (orderDetails) {
      updateDimensions();
    }
  }, [data, index]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (location.search && location.search.length > 0) {
      const ids = location.search.split("?");
      if (ids[1]) {
        setOrderId(ids[1]);
      }
    }
  }, [location]);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    if (orderId) {
      getNftDetails(orderId, cancelTokenSource);
    } else {
    }

    return () => {
      cancelTokenSource.cancel();
    };
  }, [orderId, user.userData]);

  const getNftDetails = async (id, cancelTokenSource) => {
    try {
      const res = await axios.get(apiConfig.nft + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setOrderDetails(res.data.result);
      } else {
        setOrderDetails();
      }
      setIsLoadingData(false);
    } catch (error) {
      setIsLoadingData(false);

      console.log("ERROR", error);
    }
  };

  const submitHandler = async () => {
    setIsSubmit(true);
    if (user?.userData?._id == orderDetails?.userId?._id) {
      if (chainId == orderDetails.network) {
        if (
          price !== "" &&
          parseFloat(price) > 0 &&
          payableToken !== "select"
        ) {
          try {
            const OpenMarketplace = getNormalMarketplaceContractAddress(
              orderDetails.network
            );

            setIsLoading(true);

            if (
              await approveTokenHandler(
                orderDetails.tokenId.toString(),
                orderDetails?.collectionId?.contractAddress,
                NftTokenABI,
                library,
                account,
                OpenMarketplace
              )
            ) {
              const payableTokenAddress = getPayableTokenContractAddress(
                network.chainId,
                payableToken,
                "No"
              );

              if (
                await placeNormalOrderBlockchainHandler(
                  OpenMarketplace,
                  NormalMarketplaceABI,
                  library,
                  account,
                  orderDetails?.collectionId?.contractAddress,
                  orderDetails?.tokenId,
                  price.toString(),
                  endDate,
                  orderDetails?.royalties,
                  payableTokenAddress
                )
              ) {
                const token = sessionStorage.getItem("token");

                let body = {
                  nftId: orderDetails?._id,
                  title: orderDetails?.title,
                  details: orderDetails?.description,
                  time: moment().unix().toString(),
                  startingBid: price.toString(),
                  tokenName: orderDetails?.tokenName,
                  description: orderDetails?.description,
                  royalties: orderDetails?.royalties,
                  startPrice: price.toString(),
                  price: price.toString(),
                  coupounAddress: "0x",
                  startTime: moment().unix().toString(),
                  endTime: moment(endDate).unix().toString(),
                  expiryTime: moment(endDate).unix().toString(),
                  currentOwner: account,
                  network: orderDetails?.network,
                  currentOwner: user?.userData?._id,
                  currencyName: payableToken,
                };

                const placeres = await axios({
                  method: "post",
                  url: apiConfig["createOrder"],
                  data: body,
                  headers: {
                    token,
                  },
                });

                if (placeres) {
                  if (placeres && placeres.data.statusCode === 200) {
                    toast.success(placeres.data.responseMessage);
                    history.push("/profile");
                  } else {
                    toast.error(placeres.data.responseMessage);
                  }
                } else {
                  toast.error("Something went to wrong");
                }
              } else {
                toast.error("Something went to wrong");
              }
            } else {
              toast.error("Something went to wrong");
            }
          } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
          }
        } else {
          toast.error("Please enter valid data");
        }
      } else {
        swichNetworkHandler(orderDetails.network);
        toast.warn("Please switch network");
      }
    } else {
      toast.error("Not NFT owner");
    }
    setIsLoading(false);
  };

  return (
    <Box className={classes.NftBreed}>
      {isLoadingData ? (
        <DataLoading />
      ) : (
        <>
          {!orderDetails ? (
            <DataNotFound />
          ) : (
            <>
              <Box>
                <Container maxWidth="md">
                  <Grid container spacing={2} className="sectionHeading">
                    <Grid item xs={12}>
                      <Box className={classes.resellNft}>
                        <Typography variant="h2">Sale NFT</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
              {/* featured */}
              <Container maxWidth="md">
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6} className="order1">
                    <label className={classes.label1}>Preview</label>
                    <Box>
                      <Box className={classes.boxsection}>
                        <Box
                          id={`imagecard${index}`}
                          className={classes.nftImg}
                          style={{
                            background: `url(${
                              orderDetails?.coverImage !== ""
                                ? orderDetails?.coverImage
                                : "/images/nft/img1.jpeg"
                            })`,
                          }}
                        >
                          <Typography variant="h6"></Typography>
                        </Box>
                        <Box className={classes.box3}>
                          <figure>
                            <img
                              src={
                                user?.userData && user?.userData?.profilePic
                                  ? user?.userData?.profilePic
                                  : "images/onlycamimg.png"
                              }
                              alt="nftimg"
                            />
                          </figure>
                          <Typography variant="h6">
                            {" "}
                            {user.userData && user?.userData?.name
                              ? user?.userData?.name
                              : sortAddress(user?.userData?.walletAddress)}
                          </Typography>
                        </Box>
                        <Box className={classes.price3}>
                          <Typography variant="h5">{price}</Typography>
                          <Typography className={classes.likecount}>
                            20&nbsp;&nbsp;
                            <IconButton>
                              <FaThumbsUp />
                            </IconButton>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    {(orderDetails?.mediaType === "audio" ||
                      orderDetails?.mediaType === "video") && (
                      <Box style={{ width: "100%" }}>
                        <video
                          width="100%"
                          loop={false}
                          autoPlay={false}
                          muted={true}
                          controls
                          style={
                            orderDetails?.mediaType === "audio"
                              ? { height: 75 }
                              : {}
                          }
                        >
                          <source src={orderDetails?.uri} type="video/mp4" />
                        </video>
                      </Box>
                    )}
                  </Grid>

                  <Grid item xs={12} md={6} className="order2">
                    <Box mb={2}>
                      <Box>
                        <Grid container spacing={2} className="">
                          <Grid item xs={12} sm={12} md={12}>
                            <Box mt={3}>
                              <Typography variant="subtitle1">
                                {" "}
                                Enter price to allow users instantly purchase
                                your NFT
                              </Typography>
                              <Box mt={4} className={classes.price}>
                                <label>Price</label>
                                <FormControl
                                  fullWidth
                                  className={classes.margin}
                                >
                                  <TextField
                                    disabled={isLoading}
                                    type="number"
                                    placeholder="0.124"
                                    value={price}
                                    onKeyPress={(event) => {
                                      if (
                                        event?.key === "-" ||
                                        event?.key === "+"
                                      ) {
                                        event.preventDefault();
                                      }
                                    }}
                                    onChange={(e) => {
                                      if (
                                        e.target.value &&
                                        e.target.value != "-"
                                      ) {
                                        setPrice(
                                          Math.abs(Number(e.target.value))
                                        );
                                      } else {
                                        setPrice();
                                      }
                                    }}
                                    error={
                                      isSubmit &&
                                      (price === "" || parseFloat(price) <= 0)
                                    }
                                    helperText={
                                      isSubmit &&
                                      (price === "" ||
                                        parseFloat(price) <= 0) &&
                                      "Please enter price"
                                    }
                                  />
                                </FormControl>
                              </Box>
                              <Box mt={4}>
                                <label>Select Payable Token</label>

                                <Box mt={2} mb={2}>
                                  <FormControl
                                    className={`${classes.formControl} createSelect`}
                                  >
                                    <Select
                                      fullWidth
                                      value={payableToken}
                                      onChange={(e) =>
                                        setPayableToken(e.target.value)
                                      }
                                    >
                                      {network.chainId ==
                                        ACTIVE_NETWORK_BNB && (
                                        <MenuItem value={"OnlyCam"}>
                                          $ONLY
                                        </MenuItem>
                                      )}
                                      {network.chainId ==
                                        ACTIVE_NETWORK_BNB && (
                                        <MenuItem value={"BNB"}>BNB</MenuItem>
                                      )}
                                      {network.chainId ==
                                        ACTIVE_NETWORK_BNB && (
                                        <MenuItem value={"BUSD"}>BUSD</MenuItem>
                                      )}

                                      {network.chainId ==
                                        ACTIVE_NETWORK_ETH && (
                                        <MenuItem value={"ETH"}>ETH</MenuItem>
                                      )}
                                    </Select>
                                    {isSubmit && payableToken === "select" && (
                                      <FormHelperText error>
                                        Please select payable token
                                      </FormHelperText>
                                    )}
                                  </FormControl>
                                </Box>
                              </Box>
                              <Box mt={2}>
                                <FormControlLabel
                                  title="NFT will expires in 6 months"
                                  control={
                                    <Checkbox
                                      checked={isNonExpiring}
                                      onChange={(e) => {
                                        setIsNonExpiring(e.target.checked);
                                        if (e.target.checked) {
                                          setEndDate(moment().add(6, "M"));
                                        } else {
                                          setEndDate(moment().add(6, "M"));
                                        }
                                      }}
                                    />
                                  }
                                  label="Non Expiring"
                                />
                              </Box>
                              {!isNonExpiring && (
                                <Box mt={2}>
                                  <label>Expiration Date</label>
                                  <FormControl className={classes.formControl}>
                                    <DateTimePicker
                                      value={endDate}
                                      onChange={(date) => {
                                        setEndDate(date);
                                      }}
                                      disabled={isLoading}
                                      format="DD/MM/yyyy hh:mm A"
                                      minDate={moment()}
                                    />
                                  </FormControl>
                                </Box>
                              )}
                            </Box>
                            <Box mt={4}>
                              <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={submitHandler}
                                disabled={
                                  isLoading || network.chainId != chainId
                                }
                              >
                                LIST FOR SALE
                                {isLoading && <ButtonCircularProgress />}
                              </Button>
                            </Box>
                            <Box mt={2}>
                              {network !== "select" &&
                                network.chainId != chainId && (
                                  <FormHelperText error>
                                    Please switch network to {network.name}
                                  </FormHelperText>
                                )}
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </>
          )}
        </>
      )}
    </Box>
  );
}
