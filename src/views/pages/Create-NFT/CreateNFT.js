import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  TextField,
  IconButton,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  Tooltip,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import CollectionCreate from "./CollectionCreate";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { MdAddCircle, MdOutlineTextRotateVertical } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import DialogActions from "@material-ui/core/DialogActions";
import { FaThumbsUp } from "react-icons/fa";
import { UserContext } from "src/context/User";
import { useHistory } from "react-router";
import { useWeb3React } from "@web3-react/core";
import moment from "moment";
import {
  addImageHandler,
  // approveTokenHandler,
  createNFTBlockchainHanlder,
  createNFTHandler,
  getBase64,
  getTokenId,
  placeOrderAPIHandler,
  placeOrderBlockchainHandler,
  uploadNFTHandler,
} from "src/services";
// import { HiOutlineBan } from "react-icons/hi";
// import { RiMoneyDollarCircleFill } from "react-icons/ri";
import {
  getMarketplaceContractAddress,
  getNetworkDetails,
  getNormalMarketplaceContractAddress,
  networkList,
  ACTIVE_NETWORK_BNB,
  ACTIVE_NETWORK_ETH,
  getPayableTokenContractAddress,
} from "src/constants";
import { DateTimePicker } from "@material-ui/pickers";
import CollectionCard from "./CollectionCard";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DeployABI from "src/constants/ABI/DeployABI.json";

import NftTokenABI from "src/constants/ABI/NftTokenABI.json";

import MarketPlaceABI from "src/constants/ABI/MarketPlaceABI.json";
import axios from "axios";
import apiConfig from "src/connectors/config/ApiConfig";
import { toast } from "react-toastify";
import { sortAddress, getContract, getWeb3Obj } from "src/utils";
import LazyMinterETH from "src/constants/LazyMinterETH";
import LazyMinterBNB from "src/constants/LazyMinterBNB";

import { ethers } from "ethers";
import NormalMarketplaceABI from "src/constants/ABI/MarketplaceABINormal.json";
import CollectionCreateLazy from "./CollectionCreateLazy";
import { Help } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  customizedButton: {
    // position: "absolute",
    // top: "-42px",
    // right: "-9px",
    color: "#3B0D60",
  },
  paper: {
    overflowY: "unset",
  },
  NftBreed: {
    padding: "70px 0",
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
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "0px",
    boxShadow: "none",
    borderBottom: "0",
    borderRadius: "0",
    height: "40px",
    background: "transparent",
    color: "#7E6196 ",
    "& svg": {
      width: "34px",
      height: "35px",
      background: "#FCF2FA",
      borderRadius: "10px",
      padding: "5px 6px",
      color: "rgba(152, 126, 171, 0.5)",
    },
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

      overflow: "hidden",
      "& img": {
        // maxHeight: "100%",
        // maxWidth: "100%",
        // height: "auto",
        // width: "auto",
        height: "80px",
        width: "80px",
        display: "block",
        borderRadius: "100%",
      },
    },
  },
  price3: {
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
  likecount: {
    display: "flex",
    alignItems: "center",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
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
  ListItem: {
    "& span": {
      fontSize: "20px",
      lineHeight: "30px",
      color: theme.palette.secondary.main,
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
  creatcollection: {
    color: "#3B0D60",
    fontSize: "40px",
    fontWeight: "700",
    fontFamily: "'Montserrat', sans-serif",
  },
  spacebtn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& span": {
      "& div": {
        paddingTop: "0px",
      },
    },
  },
}));

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 41,
    height: 20,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    // backgroundColor: "#fff",
    color: theme.palette.grey[500],
    "& + $track": {
      opacity: 1,
      backgroundColor: "#b7b7b7",
      borderColor: "#b7b7b7",
    },
    "&$checked": {
      transform: "translateX(19px)",
      color: "#039BE3",

      "& + $track": {
        opacity: 1,
        backgroundColor: "#039BE3",
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 17,
    height: 17,
    backgroundColor: "#fff",
    boxShadow: "none",
  },
  track: {
    borderRadius: 25,
    opacity: 1,
    backgroundColor: "#039BE3",
  },
  checked: {},
}))(Switch);
const CategoryButtons = [
  {
    name: "Erotic",
    startIcon: <i className='icon-palette'></i>,
  },
  // {
  //   name: "Music",
  //   startIcon: <i className='icon-music'></i>,
  // },
  // {
  //   name: "Games",
  //   startIcon: <i className='icon-games'></i>,
  // },
];

export default function ResellNFT() {
  const history = useHistory();
  const { account, chainId, library } = useWeb3React();
  const user = useContext(UserContext);
  const classes = useStyles();
  const [collectionList, setCollectionList] = useState([]);
  const [allCollectionList, setAllCollectionList] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("create");
  const [open, setOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Erotic");
  const [imgBlob, setImgBlob] = useState("");
  const [coverBlob, setCoverBlob] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [coverFile, setCoverFile] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(moment().add(6, "M"));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAdvance, setIsAdvance] = useState(false);
  const [propertyFirst, setpropertyFirst] = useState("");
  const [properySecond, setProperySecond] = useState("");
  const [alternateText, setAlternateText] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState("Create Item");
  const [isLoading, setIsLoading] = useState(false);
  const [imgFileBase, setImgFileBase] = useState("");
  const [coverFileBase, setCoverFileBase] = useState("");
  // const [network] = useState(networkList[0]);
  const [royalties, setRoyalties] = useState(0);
  const [isCreateOrder, setIsCreateOrder] = useState(true);
  const [unloackData, setUnloackData] = useState("");
  const [isUnlock, setIsUnlock] = useState(false);
  const [newCollectionId, setNewCollectionId] = useState("");
  const [payableToken, setPayableToken] = useState("select");
  const [network, setNetwork] = useState({
    name: "select",
  });
  const [fileTypeCheck, setFileTypeCheck] = useState("");
  const [isNonExpiring, setIsNonExpiring] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const min = 0;
  const max = 100;
  const submitHanlder = async () => {
    if (chainId == network.chainId) {
      setIsSubmit(true);
      const checkPrice = price;

      // const checkCover =
      //   selectedCategory && selectedCategory === "Music" && coverFile === ""
      //     ? false
      //     : true;
      if (
        network.name !== "select" &&
        network.chainId &&
        title !== "" &&
        checkPrice !== "" &&
        parseFloat(checkPrice) > 0 &&
        // royalties !== "" &&
        // parseFloat(royalties) > 0 &&
        // parseFloat(royalties) <= 100 &&
        selectedCollection &&
        selectedCollection._id &&
        selectedCollection !== "create" &&
        // selectedCategory !== "" &&
        imgFile !== "" &&
        payableToken !== "select"
        // checkCover &&
        // coverFile !== ''
      ) {
        setIsLoading(true);
        setTransactionStatus("Loading...");
        toast.warn("Please do not refresh the page");

        await addImageHandler(imgFile)
          .then(async (res) => {
            const body = new FormData();
            body.append("tokenName", title);
            body.append("description", description);
            body.append("image", res);
            setTransactionStatus("Uploading...");
            const receipt = await uploadNFTHandler(body, res, "uploadNFT");
            let advanceSettings = {
              propertyFirst: propertyFirst,
              properySecond: properySecond,
            };
            let fileExtention = imgFile.name.split(".").pop();
            let fileType =
              fileExtention == "mp4" || fileExtention == "webp"
                ? "video"
                : fileExtention == "mp3"
                ? "audio"
                : "image";
            let createBody = {
              coverFile: coverFileBase ? coverFileBase : imgFileBase,
              imgFile: imgFileBase,
              // fileType == "video" || fileType == "audio"
              //   ? coverFileBase
              //   : imgFileBase, // ? coverFileBase : imgFileBase,
              uri: res,
              title: title,
              categoryType: selectedCategory,
              unlockOncePurchased: "NA",
              collectionId: selectedCollection._id,
              contractAddress: selectedCollection.contractAddress,
              description: description ? description : "NA",
              royalties: royalties.toString(),
              currentOwner: account,
              price: price !== "" ? price.toString() : "0",
              startPrice: price !== "" ? price.toString() : " 0",
              couponAddress: "0x",
              isDirectSale: true,
              isAuction: false,
              endTime: moment(endDate).unix(),
              startDate: moment(startDate).unix(),
              saleType: "ONSALE",
              orderType: "NONE",
              network: network.chainId,
              alternativeTextForNFT: alternateText,
              currentOwnerId: user?.userData?._id,
              mediaType: fileType,
              unlockableContent: unloackData ? unloackData : "NA",
              currencyName: payableToken,
            };

            if (receipt) {
              try {
                const MarketplaceContractAddress =
                  getMarketplaceContractAddress(network.chainId);

                const contract = getContract(
                  MarketplaceContractAddress,
                  DeployABI,
                  library,
                  account
                );

                let LazyMinterObj = undefined;
                if (network.chainId == ACTIVE_NETWORK_ETH) {
                  LazyMinterObj = new LazyMinterETH(contract, contract.signer);
                }
                if (network.chainId == ACTIVE_NETWORK_BNB) {
                  LazyMinterObj = new LazyMinterBNB(contract, contract.signer);
                }

                const payableTokenAddress = getPayableTokenContractAddress(
                  network.chainId,
                  payableToken
                );

                if (LazyMinterObj) {
                  const createVoucherRes = await LazyMinterObj.createVoucher(
                    account,
                    moment(endDate).unix().toString(),
                    res,
                    ethers.utils.parseEther(price.toString()).toString(),
                    royalties.toString(),
                    newCollectionId == selectedCollection?._id,
                    payableTokenAddress,
                    createBody.unlockableContent
                  );
                  console.log("createVoucherRes", createVoucherRes);
                  if (createVoucherRes?.signature) {
                    let tokenIdN = createVoucherRes.signature;

                    const creRes = await createNFTHandler(
                      createBody,
                      tokenIdN,
                      advanceSettings
                    );
                    if (creRes && creRes.data.statusCode === 200) {
                      setTransactionStatus("Place Order");

                      // if (
                      //   await placeOrderBlockchainHandler(
                      //     MarketplaceContractAddress,
                      //     MarketPlaceABI,
                      //     library,
                      //     account,
                      //     tokenIdN,
                      //     price.toString(),
                      //     endDate,
                      //     res,
                      //     tokenIdN,
                      //     royalties.toString(),
                      //     newCollectionId == selectedCollection?._id, // check is new collection
                      //     selectedCollection?.displayName,
                      //     selectedCollection?.symbol,
                      //     selectedCollection?.shortURL,
                      //     unloackData ? unloackData : "NA",
                      //     payableTokenAddress
                      //   )
                      // ) {
                      const placeres = await placeOrderAPIHandler(
                        createBody,
                        creRes.data.result._id,
                        account,
                        advanceSettings
                      );
                      setIsLoading(false);
                      setTransactionStatus("Create Item");
                      if (placeres) {
                        if (placeres && placeres.data.statusCode === 200) {
                          toast.success(placeres.data.responseMessage);
                          setTimeout(() => {
                            history.push({
                              pathname: "/profile",
                              search: user.userData._id,
                            });
                          }, 1000);
                        } else {
                          toast.error(placeres.data.responseMessage);
                        }
                      } else {
                        toast.error("Something went to wrong");
                      }
                      // } else {
                      //   toast.error("Something went to wrong");

                      //   setIsLoading(false);
                      //   setTransactionStatus("Create Item");
                      // }
                    } else {
                      if (creRes) {
                        toast.error(creRes.data.responseMessage);
                      } else {
                        toast.error("Something went to wrong");
                      }

                      setIsLoading(false);
                      setTransactionStatus("Create Item");
                    }
                  } else {
                    toast.error("Something went wrong");

                    setIsLoading(false);
                    setTransactionStatus("Create Item");
                  }
                } else {
                  toast.error("Something went wrong");

                  setIsLoading(false);
                  setTransactionStatus("Create Item");
                }
              } catch (error) {
                if (error?.data?.message) {
                  toast.error(error?.data?.message);
                } else {
                  toast.error(error.message);
                }
                setIsLoading(false);
                setTransactionStatus("Create Item");
                console.log("ERROR", error);
              }
            } else {
              toast.error("Unable to upload image on IPFS");

              setIsLoading(false);
              setTransactionStatus("Create Item");
            }

            // };
          })
          .catch((error) => {
            toast.error("Unable to upload image");
            console.log("ERROR", error);
            setIsLoading(false);
            setTransactionStatus("Create Item");
            console.log("ERROR", error);
          });
      } else {
        toast.warn("Please enter valid data ");
      }
    } else {
      swichNetworkHandler();
      toast.warn("Please swich network to " + network.name);
    }
  };

  const swichNetworkHandler = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            { chainId: "0x" + parseFloat(network.chainId).toString(16) },
          ],
        });
      } catch (error) {
        console.log("ERROR", error);
        // toast.warn(error.message);
        if (error.code === 4902) {
          addNetworkHandler();
        }
      }
    }
  };

  const addNetworkHandler = async () => {
    const NetworkDetails = getNetworkDetails(network.chainId);
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: NetworkDetails,
      });
    } catch (error) {
      console.log("ERROR", error);
      toast.warn(error.message);
    }
  };

  const submitCreateNFTHanlder = async () => {
    if (chainId == network.chainId) {
      setIsSubmit(true);
      if (
        network.name !== "select" &&
        network.chainId &&
        title !== "" &&
        // royalties !== "" &&
        // parseFloat(royalties) > 0 &&
        // parseFloat(royalties) <= 100 &&
        selectedCollection &&
        selectedCollection._id &&
        selectedCollection !== "create" &&
        // selectedCategory !== "" &&
        imgFile !== ""
      ) {
        setIsLoading(true);
        setTransactionStatus("Loading...");
        toast.warn("Please do not refresh the page");
        await addImageHandler(imgFile)
          .then(async (res) => {
            const body = new FormData();
            body.append("tokenName", title);
            body.append("description", description);
            body.append("image", res);
            setTransactionStatus("Uploading...");
            const MarketplaceContractAddress =
              getNormalMarketplaceContractAddress(network.chainId);
            const receipt = await uploadNFTHandler(body, res, "uploadNFT");
            let advanceSettings = {
              propertyFirst: propertyFirst,
              properySecond: properySecond,
            };
            let fileExtention = imgFile.name.split(".").pop();
            let fileType =
              fileExtention == "mp4" || fileExtention == "webp"
                ? "video"
                : fileExtention == "mp3"
                ? "audio"
                : "image";
            let createBody = {
              coverFile: coverFileBase ? coverFileBase : imgFileBase,
              imgFile: imgFileBase,
              // fileType == "video" || fileType == "audio"
              //   ? coverFileBase
              //   : imgFileBase, // ? coverFileBase : imgFileBase,
              uri: res,
              title: title,
              categoryType: selectedCategory,
              collectionId: selectedCollection._id,
              contractAddress: selectedCollection.contractAddress,
              description: description,
              currentOwner: account,
              isDirectSale: false,
              isAuction: false,
              saleType: "ONSALE",
              orderType: "NONE",
              network: network.chainId,
              royalties: royalties.toString(),
              unlockableContent: unloackData ? unloackData : "NA",
              currentOwnerId: user?.userData?._id,
              mediaType: fileType,
              currencyName: payableToken,
              alternativeTextForNFT: alternateText,
            };

            if (receipt) {
              try {
                if (
                  await createNFTBlockchainHanlder(
                    selectedCollection?.contractAddress,
                    NftTokenABI,
                    library,
                    account,
                    receipt,
                    title,
                    royalties,
                    unloackData,
                    payableToken
                  )
                ) {
                  const tokenId = await getTokenId(
                    selectedCollection?.contractAddress,
                    NftTokenABI,
                    library,
                    account
                  );

                  let tokenIdN = parseInt(tokenId);

                  const creRes = await createNFTHandler(
                    createBody,
                    tokenIdN.toString(),
                    advanceSettings
                  );
                  if (creRes && creRes.data.statusCode === 200) {
                    setIsLoading(false);
                    setTransactionStatus("Create Item");
                    toast.success(creRes.data.responseMessage);
                    setTimeout(() => {
                      history.push({
                        pathname: "/profile",
                        search: user.userData._id,
                      });
                    }, 1000);
                  } else {
                    if (creRes) {
                      toast.error(creRes.data.responseMessage);
                    } else {
                      toast.error("Something went to wrong");
                    }

                    setIsLoading(false);
                    setTransactionStatus("Create Item");
                  }
                } else {
                  toast.error("Something went to wrong");
                  setIsLoading(false);
                  setTransactionStatus("Create Item");
                }
              } catch (error) {
                toast.error(error.message);
              }
            } else {
              toast.error("Unable to upload image on IPFS");

              setIsLoading(false);
              setTransactionStatus("Create Item");
            }
          })
          .catch((error) => {
            toast.error("Unable to upload image");
            console.log("ERROR", error);
            setIsLoading(false);
            setTransactionStatus("Create Item");
          });
      } else {
        toast.warn("Please enter valid data ");
      }
    } else {
      swichNetworkHandler();
      toast.warn("Please swich network to " + network.name);
    }
  };
  useEffect(() => {
    setAllCollectionList(user?.collectionList);
  }, [user?.collectionList]);

  useEffect(() => {
    if (network !== "select") {
      const filterCollection = allCollectionList.filter(
        (data) =>
          data.network &&
          data.network == network.chainId &&
          data.contractAddress.length > 10 &&
          data.isLazyMinting === isCreateOrder
      );

      if (isCreateOrder) {
        setCollectionList(filterCollection);
      } else {
        setCollectionList(filterCollection);
      }
      setSelectedCollection("create");

      if (chainId != network.chainId) {
        swichNetworkHandler();
      }
    }
  }, [network, isCreateOrder, allCollectionList]);

  return (
    <Box className={classes.NftBreed}>
      <Container maxWidth='lg'>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} className='order1'>
            <Box className={classes.boxsection}>
              <label style={{ color: "#3B0D60" }}>Preview</label>
              <Box
                className={classes.nftImg}
                style={
                  fileTypeCheck == "image"
                    ? {
                        background: `url(${
                          imgBlob !== "" ? imgBlob : "images/card/2.png"
                        })`,
                      }
                    : {
                        background: `url(${
                          coverBlob !== "" ? coverBlob : "images/card/2.png"
                        })`,
                      }
                }
              >
                <Typography variant='h6'></Typography>
              </Box>
              <Box className={classes.box3}>
                <figure>
                  <img
                    src={
                      user?.userData && user?.userData?.profilePic
                        ? user?.userData?.profilePic
                        : "images/onlycamimg.png"
                    }
                    alt='nftimg'
                  />
                </figure>
                <Typography variant='h6'>
                  &nbsp;&nbsp;
                  {user.userData && user?.userData?.name
                    ? user?.userData?.name
                    : sortAddress(user?.userData?.walletAddress)}
                </Typography>
              </Box>
              <Box className={classes.price3}>
                {isCreateOrder ? (
                  <Typography variant='h5'>{price ? price : 0}</Typography>
                ) : (
                  <Typography variant='h5'>{price ? price : 0}</Typography>
                )}
                <Typography className={classes.likecount}>
                  &nbsp;&nbsp;
                  <IconButton>
                    <FaThumbsUp />
                  </IconButton>
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={8} className='order2'>
            <Box mb={2} className={classes.mainBoxcreate}>
              <Grid container spacing={2} className=''>
                <Grid item xs={12} sm={12} md={12}>
                  <Box className='cardCreate' mb={3} mt={3} textAlign='center'>
                    <Button
                      disabled={isLoading}
                      variant='contained'
                      color='secondary'
                      className={classes.button}
                      style={
                        isCreateOrder
                          ? {
                              marginRight: "5px",
                              backgroundColor: "#f30065",
                              color: "white",
                            }
                          : {
                              marginRight: "5px",
                            }
                      }
                      onClick={() => setIsCreateOrder(true)}
                    >
                      {" "}
                      LAZY MINT
                    </Button>
                    <Button
                      disabled={isLoading}
                      variant='contained'
                      color='secondary'
                      className={classes.button}
                      style={
                        !isCreateOrder
                          ? {
                              marginRight: "5px",
                              backgroundColor: "#f30065",
                              color: "white",
                            }
                          : {
                              marginRight: "5px",
                            }
                      }
                      onClick={() => setIsCreateOrder(false)}
                    >
                      {" "}
                      REGULAR MINT
                    </Button>
                    <Button>
                      <Tooltip
                        title={
                          <>
                            <Typography
                              color='inherit'
                              style={{ paddingTop: ".5rem" }}
                            >
                              LAZY MINT - you make your NFT available for sale
                              and it is minted on the chain when someone buys
                              it.
                            </Typography>
                            <br />
                            <Typography
                              color='inherit'
                              style={{ paddingBotttom: ".4rem" }}
                            >
                              REGULAR MINT - you mint it on the blockchain at
                              the time of creation (incurs gas fee charges for
                              the creator)
                            </Typography>
                          </>
                        }
                        style={{
                          color: "rgb(36, 175, 172)",
                          // filter: "drop-shadow(rgb(36, 175, 172) 0px 0px 3px)",
                          fontSize: "1.6rem",
                          cursor: "pointer",
                        }}
                      >
                        <Box className={classes.iconimg}>
                          <IconButton>
                            <Help
                              style={{
                                backgroundColor: "rgb(243, 0, 101)",
                                color: "white",
                                borderRadius: "100%",
                              }}
                            />
                          </IconButton>
                        </Box>
                      </Tooltip>
                    </Button>
                  </Box>
                  <Box className='cardCreate' mb={3} mt={3}>
                    <label>Upload file</label>
                    <Box className='uploadBox' mb={2}>
                      <Typography variant='h6'>
                        JPG, PNG, GIF, WEBP, MP4 or MP3. Max 100mb.
                      </Typography>

                      <Typography variant='body2'>
                        (500 x 500 recommended)
                      </Typography>
                      <input
                        disabled={isLoading}
                        accept='image/*,.mp4,.webp,.mp3'
                        style={{ display: "none" }}
                        id='raised-button-file-img'
                        multiple
                        type='file'
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            setImgBlob(URL.createObjectURL(e.target.files[0]));
                            setImgFile(e.target.files[0]);

                            setImgFileBase(e.target.files[0]);

                            // getBase64(e.target.files[0], (result) => {
                            //   setImgFileBase(result);
                            // });
                            var fileExtention = e.target.files[0].name
                              .split(".")
                              .pop();
                            var fileType =
                              fileExtention == "mp4" || fileExtention == "webp"
                                ? "video"
                                : fileExtention == "mp3"
                                ? "audio"
                                : "image";

                            setFileTypeCheck(fileType);
                          }
                        }}
                      />
                      <FormHelperText error>
                        {imgFile &&
                          imgFile.size > 100000000 &&
                          "File limit 100MB"}
                      </FormHelperText>
                      <label htmlFor='raised-button-file-img'>
                        {imgBlob && (
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Box
                              className={classes.NftImg}
                              style={{
                                height: "100px",
                                paddingBottom: ".5rem",
                              }}
                            >
                              {fileTypeCheck === "video" && (
                                <video
                                  controls='false'
                                  autoplay='true'
                                  loop
                                  muted
                                  playsinline='true'
                                  style={{ height: "98px" }}
                                >
                                  <source src={imgBlob} type='video/mp4' />
                                </video>
                              )}
                              {fileTypeCheck === "audio" && (
                                <audio controls>
                                  <source src={imgBlob} type='audio/mpeg' />
                                </audio>
                              )}

                              {fileTypeCheck === "image" && (
                                <img
                                  src={
                                    imgBlob !== ""
                                      ? imgBlob
                                      : "images/card/2.png"
                                  }
                                  alt=''
                                  style={{
                                    borderRadius: "5px",
                                    Width: "100%",
                                    maxHeight: "100%",
                                  }}
                                />
                              )}
                            </Box>
                          </Box>
                        )}
                        <Button
                          disabled={isLoading}
                          variant='contained'
                          color='secondary'
                          component='span'
                        >
                          {imgBlob ? "Change" : "Choose"} File
                        </Button>
                      </label>
                      {isSubmit && imgBlob === "" && (
                        <FormHelperText error>
                          Please select image
                        </FormHelperText>
                      )}
                    </Box>
                  </Box>
                  {(fileTypeCheck === "video" || fileTypeCheck === "audio") && (
                    <Box className='cardCreate' mb={3}>
                      {/* {selectedCategory && selectedCategory === "Music" && ( */}
                      <label>Upload cover(Optional)</label>
                      {/* )}{" "} */}
                      {/* {selectedCategory && selectedCategory === "Music" && ( */}
                      <Box className='uploadBox'>
                        <Typography variant='h6'>
                          JPG, PNG, GIF Max 1mb.
                        </Typography>
                        <Typography variant='body2'>
                          (1400 x 400 recommended)
                        </Typography>

                        <input
                          disabled={isLoading}
                          accept='image/*'
                          style={{ display: "none" }}
                          id='raised-button-file-cover'
                          multiple
                          type='file'
                          onChange={(e) => {
                            setCoverBlob(
                              URL.createObjectURL(e.target.files[0])
                            );
                            setCoverFile(e.target.files[0]);
                            setCoverFileBase(e.target.files[0]);

                            // getBase64(e.target.files[0], (result) => {
                            //   setCoverFileBase(result);
                            // });
                          }}
                        />

                        <label htmlFor='raised-button-file-cover'>
                          {coverBlob && (
                            <Box
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <Box
                                className={classes.NftImg}
                                style={{
                                  height: "100px",
                                  paddingBottom: ".5rem",
                                }}
                              >
                                <img
                                  src={
                                    coverBlob !== ""
                                      ? coverBlob
                                      : "images/card/2.png"
                                  }
                                  alt=''
                                  style={{
                                    borderRadius: "5px",
                                    Width: "100%",
                                    maxHeight: "100%",
                                  }}
                                />
                              </Box>
                            </Box>
                          )}
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Button
                              disabled={isLoading}
                              variant='contained'
                              color='secondary'
                              component='span'
                            >
                              {coverBlob ? "Change" : "Choose"} File
                            </Button>
                          </Box>
                        </label>
                        {/* {isSubmit &&
                          // selectedCategory &&
                          // selectedCategory === "Music" &&
                          coverBlob === '' && (
                            <FormHelperText error>
                              Please select cover image
                            </FormHelperText>
                          )} */}
                      </Box>
                    </Box>
                  )}

                  {/* )}{" "} */}
                  <Box mt={3}>
                    <Box className='cardCreate' mb={3}>
                      <label>Select Blockchain</label>

                      <Box mt={2} mb={2}>
                        <FormControl
                          className={`${classes.formControl} createSelect`}
                        >
                          <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            fullWidth
                            // value={network.name}
                            onChange={(e) => {
                              setNetwork(e.target.value);
                              setPayableToken("select");
                            }}
                          >
                            <MenuItem
                              value={{
                                name: "select",
                              }}
                            >
                              Select
                            </MenuItem>
                            {networkList.map((data, i) => {
                              return (
                                <MenuItem key={data.name} value={data}>
                                  {data.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          {isSubmit && network === "select" && (
                            <FormHelperText error>
                              Please select network
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Box>
                      {isCreateOrder && (
                        <>
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
                                {network.chainId == ACTIVE_NETWORK_BNB && (
                                  <MenuItem value={"OnlyCam"}>$ONLY</MenuItem>
                                )}
                                {network.chainId == ACTIVE_NETWORK_BNB && (
                                  <MenuItem value={"BNB"}>BNB</MenuItem>
                                )}

                                {network.chainId == ACTIVE_NETWORK_BNB && (
                                  <MenuItem value={"BUSD"}>BUSD</MenuItem>
                                )}

                                {network.chainId == ACTIVE_NETWORK_ETH && (
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
                        </>
                      )}
                      <label>Item Category</label>
                      <Box mb={3} className={classes.FilterDiv}>
                        {/* {CategoryButtons.map((data, i) => {
                          return (
                            <Button
                              disabled={isLoading}
                              key={i}
                              variant="contained"
                              color="secondary"
                              className={classes.button}
                              // style={
                              //   data.name === selectedCategory
                              //     ? {
                              //         marginRight: "5px",
                              //         backgroundColor: "#f30065",
                              //         color: "white",
                              //       }
                              //     : {
                              //         marginRight: "5px",
                              //       }
                              // }
                              startIcon={data.startIcon}
                              // onClick={() => setSelectedCategory(data.name)}
                            >
                              {data.selectedCategory}
                            </Button>
                          );
                        })} */}
                        <Button
                          disabled={isLoading}
                          variant='contained'
                          color='secondary'
                          className={classes.button}
                          style={{
                            marginRight: "5px",
                            backgroundColor: "#f30065",
                            color: "white",
                          }}
                        >
                          {selectedCategory}
                        </Button>
                      </Box>

                      <Box mt={2}>
                        <div className={classes.demo}>
                          <List
                            className={
                              isUnlock
                                ? classes.buttonColor
                                : classes.buttonColor1
                            }
                          >
                            <ListItem style={{ padding: "0px !important" }}>
                              <ListItemText
                                primary='Unlock once purchased'
                                secondary='Content will be unlocked after successful transaction'
                              />
                              <ListItemSecondaryAction>
                                <Typography component='div'>
                                  <Grid
                                    component='label'
                                    container
                                    alignItems='center'
                                    spacing={1}
                                  >
                                    <Grid item>
                                      <AntSwitch
                                        onClick={() => setIsUnlock(!isUnlock)}
                                        name='checkedC'
                                      />
                                    </Grid>
                                  </Grid>
                                </Typography>
                              </ListItemSecondaryAction>
                            </ListItem>
                          </List>
                          {isUnlock && (
                            <>
                              <FormControl fullWidth className={classes.margin}>
                                <TextField
                                  value={unloackData}
                                  onChange={(e) =>
                                    setUnloackData(e.target.value)
                                  }
                                  placeholder='Digital key, code to redeem or link to a file...'
                                  disabled={isLoading}
                                  error={isSubmit && unloackData === ""}
                                  helperText={
                                    isSubmit &&
                                    unloackData === "" &&
                                    "Please enter Digital key, code to redeem or link to a file..."
                                  }
                                />
                              </FormControl>
                              <small>Markdown is supported</small>
                              <small>Unicode symbols are NOT supported</small>
                            </>
                          )}
                        </div>
                      </Box>
                    </Box>
                    {isCreateOrder && (
                      <Box className='cardCreate' mb={3}>
                        <Box mt={2}>
                          <label>Price</label>
                          <FormControl fullWidth className={classes.margin}>
                            <TextField
                              disabled={isLoading}
                              type='number'
                              placeholder='0.124'
                              value={price}
                              onKeyPress={(event) => {
                                if (event?.key === "-" || event?.key === "+") {
                                  event.preventDefault();
                                }
                              }}
                              onChange={(e) => {
                                if (e.target.value && e.target.value != "-") {
                                  setPrice(Math.abs(Number(e.target.value)));
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
                                (price === "" || parseFloat(price) <= 0) &&
                                "Please enter price"
                              }
                            />
                          </FormControl>
                          <Box mt={2}>
                            <FormControlLabel
                              title='NFT will expires in 12 months'
                              control={
                                <Checkbox
                                  checked={isNonExpiring}
                                  onChange={(e) => {
                                    setIsNonExpiring(e.target.checked);
                                    if (e.target.checked) {
                                      setEndDate(moment().add(12, "M"));
                                    } else {
                                      setEndDate(moment().add(6, "M"));
                                    }
                                  }}
                                />
                              }
                              label='NFT will expires in 12 months'
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
                                  format='DD/MM/yyyy hh:mm A'
                                  minDate={moment(startDate)}
                                />
                              </FormControl>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    )}
                  </Box>
                  <Box className='cardCreate' mb={3}>
                    <Box mt={2}>
                      <Box>
                        {!isCreateOrder && (
                          <Box>
                            <label>Choose collection</label>
                            <Grid container>
                              <Grid Item xs={6}>
                                <Box
                                  className={
                                    selectedCollection === "create"
                                      ? "setPrice active"
                                      : "setPrice  "
                                  }
                                  onClick={() => {
                                    if (isLoading) {
                                      return;
                                    } else {
                                      setSelectedCollection("create");
                                      handleClickOpen();
                                    }
                                  }}
                                >
                                  <MdAddCircle />
                                  <Typography variant='h6'>Create</Typography>
                                  <Typography variant='body2'>
                                    ERC-721
                                  </Typography>
                                </Box>
                              </Grid>

                              {collectionList.map((data, i) => {
                                return (
                                  <Grid Item xs={6} key={i}>
                                    <CollectionCard
                                      isLoading={isLoading}
                                      selectedCollection={selectedCollection}
                                      setSelectedCollection={(selectedColl) =>
                                        setSelectedCollection(selectedColl)
                                      }
                                      data={data}
                                    />
                                  </Grid>
                                );
                              })}
                            </Grid>
                            {isSubmit && selectedCollection === "create" && (
                              <FormHelperText error>
                                Please select collection
                              </FormHelperText>
                            )}
                          </Box>
                        )}
                        {isCreateOrder && (
                          <Box>
                            <label>Choose collection</label>
                            <Grid container>
                              <Grid Item xs={6}>
                                <Box
                                  className={
                                    selectedCollection === "create"
                                      ? "setPrice active"
                                      : "setPrice  "
                                  }
                                  onClick={() => {
                                    if (network.chainId) {
                                      if (isLoading) {
                                        return;
                                      } else {
                                        setSelectedCollection("create");
                                        handleClickOpen();
                                      }
                                    } else {
                                      toast.error("Please select Blockchain");
                                    }
                                  }}
                                >
                                  <MdAddCircle />
                                  <Typography variant='h6'>Create</Typography>
                                  {/* <Typography variant='body2'>
                                    ERC-721
                                  </Typography> */}
                                </Box>
                              </Grid>

                              {collectionList.map((data, i) => {
                                return (
                                  <Grid Item xs={6} key={i}>
                                    <CollectionCard
                                      isLoading={isLoading}
                                      selectedCollection={selectedCollection}
                                      setSelectedCollection={(selectedColl) =>
                                        setSelectedCollection(selectedColl)
                                      }
                                      data={data}
                                    />
                                  </Grid>
                                );
                              })}
                            </Grid>
                            {isSubmit && selectedCollection === "create" && (
                              <FormHelperText error>
                                Please select collection
                              </FormHelperText>
                            )}
                          </Box>
                        )}
                        <Box>
                          <Box mt={2}>
                            <label>Title</label>
                            <FormControl fullWidth className={classes.margin}>
                              <TextField
                                disabled={isLoading}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                error={isSubmit && title === ""}
                                inputProps={{ maxLength: 50 }}
                                helperText={
                                  isSubmit &&
                                  title === "" &&
                                  "Please enter title"
                                }
                                placeholder="e. g. 'Redeemable T-Shirt with logo'"
                              />
                            </FormControl>

                            <Box mt={2}>
                              <label>Description(Optional)</label>
                              <FormControl fullWidth className={classes.margin}>
                                <TextField
                                  disabled={isLoading}
                                  value={description}
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                  multiline
                                  maxRows={3}
                                  // error={isSubmit && description === ''}
                                  // helperText={
                                  //   isSubmit &&
                                  //   description === '' &&
                                  //   'Please enter description'
                                  // }
                                  placeholder=" e. g. 'After purchasing you’ll be able to get the real T-Shirt'"
                                />
                                <small>With preserved line-breaks</small>
                              </FormControl>
                            </Box>
                            <Box mt={2}>
                              <label>Royalty</label>
                              <FormControl fullWidth className={classes.margin}>
                                <TextField
                                  fullWidth
                                  disabled={isLoading}
                                  type='number'
                                  inputProps={{ min, max }}
                                  value={royalties}
                                  onChange={(e) => {
                                    var value = parseInt(e.target.value);
                                    if (value > max) value = max;
                                    if (value < min) value = min;

                                    setRoyalties(value);
                                  }}
                                />
                              </FormControl>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Box mt={4} textAlign='Center'>
                      <Button
                        variant='outlined'
                        size='small'
                        color='secondary'
                        onClick={() => setIsAdvance(!isAdvance)}
                        disabled={isLoading}
                      >
                        {isAdvance ? "Hide" : "Show"} advanced settings
                      </Button>
                    </Box>

                    {isAdvance && (
                      <Box mt={4}>
                        {" "}
                        <label>Properties(Optional)</label>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              value={propertyFirst}
                              onChange={(e) => setpropertyFirst(e.target.value)}
                              inputProps={{ maxLength: 50 }}
                              placeholder='e.g. Size'
                              disabled={isLoading}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <label>&nbsp;</label>
                            <TextField
                              inputProps={{ maxLength: 50 }}
                              value={properySecond}
                              onChange={(e) => setProperySecond(e.target.value)}
                              placeholder='e.g. M'
                              disabled={isLoading}
                            />
                          </Grid>
                        </Grid>
                        <Box mt={2}>
                          <label>Alternative text for NFT(Optional)</label>
                          <TextField
                            value={alternateText}
                            onChange={(e) => setAlternateText(e.target.value)}
                            placeholder='Image description in details (do not start with word “image”)'
                            fullWidth
                            disabled={isLoading}
                            inputProps={{ maxLength: 50 }}
                          />
                        </Box>
                      </Box>
                    )}

                    <Box mt={4} className={classes.spacebtn}>
                      <Button
                        onClick={() =>
                          isCreateOrder
                            ? submitHanlder()
                            : submitCreateNFTHanlder()
                        }
                        variant='contained'
                        color='secondary'
                        disabled={isLoading || network.chainId != chainId}
                      >
                        {transactionStatus}{" "}
                        {isLoading && <ButtonCircularProgress />}
                      </Button>
                    </Box>
                    <Box mt={2}>
                      {network.name !== "select" &&
                        network.chainId != chainId && (
                          <FormHelperText error>
                            Please switch network to {network.name}
                          </FormHelperText>
                        )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          className={classes.createbox}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          classes={{ paper: classes.paper }}
        >
          <DialogActions>
            <IconButton
              onClick={handleClose}
              className={classes.customizedButton}
            >
              <GiCancel />
            </IconButton>
          </DialogActions>
          <DialogContent className={classes.dialogBox}>
            {isCreateOrder ? (
              <CollectionCreateLazy
                isCreateOrder={isCreateOrder}
                selectedNetwork={network}
                handleClose={handleClose}
                chianId={network.chainId}
                setNewCollectionId={(data) => setNewCollectionId(data)}
              />
            ) : (
              <CollectionCreate
                isCreateOrder={isCreateOrder}
                selectedNetwork={network}
                handleClose={handleClose}
              />
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}
