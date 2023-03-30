import {
  Box,
  Button,
  Grid,
  makeStyles,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  DialogActions,
  FormControl,
  InputAdornment,
  Input,
  Container,
  List,
  ListItem,
  TextField,
  withStyles,
  Switch,
  FormHelperText,
  Select,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import React, { useState, useRef, useEffect, useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { GiCancel } from "react-icons/gi";
import { BiLockOpen } from "react-icons/bi";
import { SiFacebook } from "react-icons/si";
import { FaRegCopy, FaTwitter } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { FiMoreHorizontal } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import NftTokenABI from "src/constants/ABI/NftTokenABI.json";
import IERC20ABI from "src/constants/ABI/IERC20ABI.json";

import apiConfig from "src/connectors/config/ApiConfig";
import axios from "axios";
import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import CopyToClipboard from "react-copy-to-clipboard";

import {
  getContract,
  getWeb3ContractObject,
  sortAddress,
  calculateTimeLeft,
  swichNetworkHandler,
  getWeb3Obj,
} from "src/utils";

import {
  ACTIVE_NETWORK_BNB,
  ACTIVE_NETWORK_ETH,
  deadAddress,
  getMarketplaceContractAddress,
  getNetworkDetails,
  getNormalMarketplaceContractAddress,
  getPayableTokenContractAddress,
  payableTokenAddewssBinanceBUSD,
  payableTokenAddewssBinanceBNB,
  payableTokenAddewssBinanceOnlyCam,
  approveAmount,
  payableTokenAddewssEthereunETH,
  payableTokenAddewssBinanceBNBLazy,
  payableTokenAddewssEthereunETHLazy,
} from "src/constants";
import { UserContext } from "src/context/User";
import moment from "moment";
import LazyMarketPlaceABI from "src/constants/ABI/MarketPlaceABI.json";
import NormalMarketplaceABI from "src/constants/ABI/MarketplaceABINormal.json";

import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";
import MoreFromCollection from "./MoreFromCollection";
import { ethers } from "ethers";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { DateTimePicker } from "@material-ui/pickers";

import {
  createNFTBlockchainHanlder,
  getTokenId,
  approveTokenHandler,
  placeNormalOrderBlockchainHandler,
  uploadContractHandler,
  uploadNFTHandler,
} from "src/services";
import ShareSocialMedia from "src/component/ShareSocialMedia";
import LazyMinterBidBNB from "src/constants/LazyMinterBidBNB";
import LazyMinterBidETH from "src/constants/LazyMinterBidETH";
import AmountConvertorModal from "./AmountConvertorModal";

const useStyles = makeStyles((theme) => ({
  headbox: {
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "30px",
    padding: "30px",
  },
  headboxDuration: {
    display: "flex",
    justifyContent: "space-between",
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "30px",
    padding: "30px",
    "& h4": {
      fontSize: "14px",
    },
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
      whiteSpace: "pre",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  creatorbox: {
    alignItems: "center",
    marginTop: "12px",
    "& figure": {
      "& img": {},
    },
    "& h4": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      paddingBottom: "10px",
      whiteSpace: "pre",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  heading: { display: "flex" },
  creColl: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    cursor: "pointer",
    "& h4": {
      fontStyle: "normal",
      // fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "130%",
      marginLeft: "10px",
    },
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // borderRadius: "100%",
      // overflow: "hidden",
      // width: "100px",
      // height: "100px",
      width: "50px",
      height: "50px",
      minWidth: "50px",
      borderRadius: "50%",
      overflow: "hidden",
      background: "rgba(0,0,0,0.1)",
      "& img": {
        // minHeight: "100%",
        maxWidth: "100%",
        display: "block",
      },
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
      padding: "1px 0px",
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
      marginLeft: "-13px",
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
      marginLeft: "-13px",
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
    justifyContent: "flex-start",
    paddingTop: "13px",
    "& h6": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "130%",
      marginLeft: "10px",
      color: "#3B0D60",
    },
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "50px",
      height: "50px",
      minWidth: "50px",
      borderRadius: "50%",
      overflow: "hidden",
      background: "rgba(0,0,0,0.1)",
      "& img": {
        maxWidth: "100%",
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
  BabycornerBoxAvtar: {
    height: "65px",
    width: "65px",
    marginTop: "-19px",
    cursor: "pointer",
    // background: "rgb(121 77 169)",
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

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 41,
    height: 20,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
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

export default function Sale({
  orderId,
  setOrderDetailsParent,
  setBidListParent,
  setIsLoadingParent,
  setPropertiesParent,
}) {
  const history = useHistory();
  const { account, chainId, library } = useWeb3React();
  const classes = useStyles();
  const [openPlaceBid, setOpenPlaceBid] = useState(false);
  const [openBuy, setOpenBuy] = useState(false);
  const moreRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [openSale, setOpenSale] = useState(false);
  const user = useContext(UserContext);

  const [openReport, setOpenReport] = useState(false);
  const [orderDetails, setOrderDetails] = useState();

  const [orderExtraDeails, setOderExtraDeails] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [expiryDate, setExpiryDate] = useState(moment().add(1, "h"));
  const [price, setPrice] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [bidList, setBidList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const [isUpdatingAcceptBid, setIsUpdatingAcceptBid] = useState(false);
  const [openResale, setOpenResale] = useState(false);
  const [isCancelOrderUpdating, setIsCancelOrderUpdating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isLike, setIsLike] = useState(false);
  const [currentOwner, setCurrentOwner] = useState("");
  const [isOrderExpired, setIsOrderExpired] = useState(false);
  const [bidExtraDetails, setBidExtraDetails] = useState();
  const [cancelBidUpdating, setCancelBidUpdating] = useState(false);
  const [networkDetails, setNetworkDetails] = useState();
  const [properties, setProperties] = useState("");
  const [isCancelled, setIsCancelled] = useState(false);
  const [message, setMessage] = useState("");
  const [payableToken, setPayableToken] = useState("select");
  const [coinName, setCoinName] = useState();
  const [isNonExpiring, setIsNonExpiring] = useState(false);
  const [signatureObject, setSignatureObject] = useState();
  const [userWalletBalnce, setUserWalletBalnce] = useState(0);
  const [isAmountConvertorOpen, setIsAmountConvertorOpen] = useState(false);

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
          getNftDetails(orderDetails._id);
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

  useEffect(() => {
    if (orderDetails) {
      setOrderDetailsParent(orderDetails);
    }
  }, [orderDetails]);
  useEffect(() => {
    if (properties) {
      setPropertiesParent(properties);
    }
  }, [properties]);

  useEffect(() => {
    if (bidList) {
      setBidListParent(bidList);
    }
  }, [bidList]);

  useEffect(() => {
    setIsLoadingParent(isLoading);
  }, [isLoading]);

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
    setIsSubmit(false);

    try {
      const res = await axios.get(apiConfig.viewOrder + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setOrderDetails(res.data.result[0]);
        const bidL = res.data.result[0].bidId.reverse();
        setBidList(bidL);
        if (res.data.result[0]?.nftId[0]?.properties) {
          setProperties(JSON.parse(res.data.result[0].nftId[0].properties));
        }
        if (user.userData && res.data.result[0]) {
          let likesUsers = res.data.result[0].likesUsers.filter(
            (order) => order === user.userData._id
          );
          setIsLike(likesUsers.length > 0);
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
            res.data.result[0].nftId[0]?.isResale,
            res.data.result[0],
            bidL
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
    isResale,
    orderData,
    bidData
  ) => {
    const OpenMarketplace =
      isLazyMinting && !isResale
        ? getMarketplaceContractAddress(chianId)
        : getNormalMarketplaceContractAddress(chianId);
    const networkDetails = getNetworkDetails(chianId);
    if (networkDetails) {
      setNetworkDetails(networkDetails[0]);
      const contractObj = await getWeb3ContractObject(
        isLazyMinting && !isResale ? LazyMarketPlaceABI : NftTokenABI,
        contractAddress,
        networkDetails[0].rpcUrls[0]
      );

      const contractObjNormal = await getWeb3ContractObject(
        isLazyMinting && !isResale ? LazyMarketPlaceABI : NormalMarketplaceABI,
        OpenMarketplace,
        networkDetails[0].rpcUrls[0]
      );
      console.log("contractObjNormal", contractObjNormal);

      try {
        const ownerOf = await contractObj.methods.ownerOf(tokenID).call();
        setCurrentOwner(ownerOf);
      } catch (error) {
        console.log("ERROR", error);
      }

      try {
        if (isLazyMinting && !isResale) {
          const payableTokenAddress = getPayableTokenContractAddress(
            orderData?.network,
            orderData?.currencyName
          );
          console.log("payableTokenAddress", payableTokenAddress);

          const signatureObj = {
            seller: orderData.currentOwner[0].walletAddress,
            nftAddress: orderData.collectionId[0]?.contractAddress,
            price: ethers.utils
              .parseEther(orderData.price.toString())
              .toString(),
            expiresAt: Number(orderData.endTime).toString(),
            currency: payableTokenAddress,
            royalty: Number(orderData.royalties).toString(),
            uri: orderData.nftId[0].uri,
            isNewColl: false,
            lockedContent: orderData.nftId[0].unlockableContent,
            signature: orderData.nftId[0].tokenId,
          };
          console.log("signatureObj", signatureObj);
          setSignatureObject(signatureObj);
          try {
            const _verifyOrder = await contractObjNormal.methods
              ._verifyOrder(signatureObj)
              .call();
            console.log("_verifyOrder", _verifyOrder);
          } catch (error) {
            console.log("ERROR", error);
          }
          const ordersData = {
            currency: payableTokenAddress,
            seller: orderData.currentOwner[0].walletAddress,
            isNewColl: false,
            lockedContent: orderData.nftId[0].unlockableContent,
            nftAddress: orderData.collectionId[0]?.contractAddress,
          };
          // const ordersData = await contractObjNormal.methods
          //   .orderByAssetId(tokenID)
          //   .call();
          setOderExtraDeails(ordersData);
          // if (ordersData?.seller == deadAddress) {
          //   setIsCancelled(true);
          // }
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
          //  await contractObjNormal.methods
          //   .bidByOrderId(tokenID)
          //   .call();

          console.log("bidData", bidData[0]);
          const currentBidData = bidData[0].bidStatus == "PENDING";
          console.log("currentBidData", currentBidData);

          if (currentBidData) {
            const bidByOrderId = {
              bidder: bidData[0]?.userId[0].walletAddress,
              price: ethers.utils
                .parseEther(bidData[0]?.price.toString())
                .toString(),
              expiresAt: Number(bidData[0]?.date),
              signature: bidData[0]?.bidSignature,
            };

            setBidExtraDetails(bidByOrderId);
          } else {
            setBidExtraDetails();
          }
        } else {
          const bidByOrderId = await contractObjNormal.methods
            .bidByOrderId(contractAddress, tokenID)
            .call();
          setBidExtraDetails(bidByOrderId);
        }
      } catch (error) {
        console.log("ERROR", error);
      }
    }
  };

  const getUserWalletBalance = async () => {
    const web3 = await getWeb3Obj(networkDetails.rpcUrls[0]);
    const balanceOfMain = await web3.eth.getBalance(account);

    const balanceOfMainInETH = ethers.utils.formatEther(
      balanceOfMain.toString()
    );
    console.log("balanceOfMainInETH", balanceOfMainInETH);

    setUserWalletBalnce(balanceOfMainInETH);
  };

  useEffect(() => {
    if (
      orderExtraDeails?.currency &&
      networkDetails?.rpcUrls?.length > 0 &&
      networkDetails?.rpcUrls[0] &&
      account
    ) {
      getUserWalletBalance();
    }
  }, [orderExtraDeails?.currency, account, networkDetails?.rpcUrls]);

  useEffect(() => {
    if (orderExtraDeails && orderDetails?.network) {
      const current =
        payableTokenAddewssBinanceBNB == orderExtraDeails?.currency &&
        orderDetails?.network == ACTIVE_NETWORK_BNB
          ? "BNB"
          : payableTokenAddewssEthereunETH == orderExtraDeails?.currency &&
            orderDetails?.network == ACTIVE_NETWORK_ETH
          ? "ETH"
          : payableTokenAddewssBinanceBUSD == orderExtraDeails?.currency
          ? "BUSD"
          : payableTokenAddewssBinanceOnlyCam == orderExtraDeails?.currency
          ? "$ONLY"
          : "";

      setCoinName(current);
    }
  }, [orderExtraDeails, orderDetails]);

  const checkWrappedHandler = () => {
    if (
      orderExtraDeails?.currency != payableTokenAddewssBinanceBNB ||
      orderExtraDeails?.currency != payableTokenAddewssEthereunETH
    ) {
      toast.error(
        `You don't have enough wrapped ${coinName},
         Please add first and try again`
      );

      setIsAmountConvertorOpen(true);
    } else {
      toast.error("Your wallet balance is too low");
      setOpenPlaceBid(false);
      setIsUpdatingData(false);
    }
  };

  const placeBidBlockchainHandler = async () => {
    if (orderDetails.network && chainId == orderDetails.network) {
      if (
        !isOrderExpired &&
        orderExtraDeails.seller.toLowerCase() !== deadAddress.toLowerCase()
      ) {
        if (orderExtraDeails.seller.toLowerCase() !== account.toLowerCase()) {
          setIsSubmit(true);
          if (parseFloat(price) > 0) {
            const checkPrice =
              bidExtraDetails && bidList.length > 0
                ? parseFloat(price) > parseFloat(bidList[0].price)
                : true;
            if (checkPrice) {
              try {
                setIsUpdatingData(true);
                const OpenMarketplace = getMarketplaceContractAddress(
                  orderDetails.network
                );

                const contractObj = getContract(
                  OpenMarketplace,
                  LazyMarketPlaceABI,
                  library,
                  account
                );

                let LazyMinterObj = undefined;
                if (orderDetails.network == ACTIVE_NETWORK_ETH) {
                  LazyMinterObj = new LazyMinterBidETH(
                    contractObj,
                    contractObj.signer
                  );
                }
                if (orderDetails.network == ACTIVE_NETWORK_BNB) {
                  LazyMinterObj = new LazyMinterBidBNB(
                    contractObj,
                    contractObj.signer
                  );
                }

                if (
                  true
                  // orderExtraDeails?.currency != payableTokenAddewssBinanceBNB &&
                  // orderExtraDeails?.currency != payableTokenAddewssEthereunETH
                ) {
                  const acceptedToken = orderExtraDeails?.currency;

                  const contractApp = getContract(
                    acceptedToken,
                    IERC20ABI,
                    library,
                    account
                  );

                  const balanceOf = await contractApp.balanceOf(account);

                  const balanceOfInETH = ethers.utils.formatEther(
                    balanceOf.toString()
                  );
                  console.log("balanceOfInETH", balanceOfInETH);
                  if (parseFloat(price) <= parseFloat(balanceOfInETH)) {
                    const isApproved = await checkAllowanceHandler(
                      contractApp,
                      OpenMarketplace,
                      price
                    );
                    console.log("isApproved", isApproved);

                    if (!isApproved) {
                      const appRes = await contractApp.approve(
                        OpenMarketplace,
                        approveAmount
                      );
                      await appRes.wait();
                    }

                    const createVoucherRes = await LazyMinterObj.createVoucher(
                      orderDetails?.nftId[0]?.tokenId,
                      account,
                      ethers.utils.parseEther(price.toString()).toString(),
                      moment(expiryDate).unix()
                    );
                    console.log("createVoucherRes", createVoucherRes);

                    // const safePlaceBid = await contractObj.safePlaceBid(
                    //   {
                    //     seller: account,
                    //     nftAddress:
                    //       orderDetails?.collectionId[0]?.contractAddress,
                    //     price: ethers.utils.parseEther(
                    //       orderDetails.price.toString()
                    //     ),
                    //     expiresAt: orderDetails?.endTime,
                    //     currency: orderExtraDeails?.currency,
                    //     royalty: orderDetails?.royalties,
                    //     uri: orderDetails.nftId[0].uri,
                    //     signature: orderDetails.nftId[0].tokenId,
                    //     isNewColl: orderExtraDeails.isNewColl,
                    //     lockedContent: orderExtraDeails.lockedContent,
                    //   },
                    //   ethers.utils.parseEther(price.toString()),
                    //   moment(expiryDate).unix()
                    // );

                    // await safePlaceBid.wait();

                    createBidHanlder(createVoucherRes?.signature);
                  } else {
                    checkWrappedHandler();
                  }
                } else {
                  const web3 = await getWeb3Obj(networkDetails.rpcUrls[0]);
                  const balanceOf = await web3.eth.getBalance(account);

                  const balanceOfInETH = ethers.utils.formatEther(
                    balanceOf.toString()
                  );

                  if (parseFloat(price) < parseFloat(balanceOfInETH)) {
                    const createVoucherRes = await LazyMinterObj.createVoucher(
                      orderDetails?.nftId[0]?.tokenId,
                      account,
                      ethers.utils.parseEther(price.toString()).toString(),
                      moment(expiryDate).unix()
                    );

                    // const safePlaceBid = await contractObj.safePlaceBid(
                    //   {
                    //     seller: account,
                    //     nftAddress:
                    //       orderDetails?.collectionId[0]?.contractAddress,
                    //     price: ethers.utils.parseEther(
                    //       orderDetails.price.toString()
                    //     ),
                    //     expiresAt: orderDetails?.endTime,
                    //     currency: orderExtraDeails?.currency,
                    //     royalty: orderDetails?.royalties,
                    //     uri: orderDetails.nftId[0].uri,
                    //     signature: orderDetails.nftId[0].tokenId,
                    //     isNewColl: orderExtraDeails.isNewColl,
                    //     lockedContent: orderExtraDeails.lockedContent,
                    //   },
                    //   ethers.utils.parseEther(price.toString()),
                    //   moment(expiryDate).unix(),
                    //   {
                    //     value: ethers.utils.parseEther(price.toString()),
                    //   }
                    // );
                    // await safePlaceBid.wait();
                    createBidHanlder(createVoucherRes?.signature);
                  } else {
                    toast.error("Your wallet balance is too low");
                    setIsUpdatingData(false);
                  }
                }

                setIsUpdatingData(false);
              } catch (error) {
                setIsUpdatingData(false);

                console.log("ERROR", error);
                toast.error(error.message);
              }
            } else {
              setIsUpdatingData(false);

              toast.error("Bid amount should be greater then last bid amount");
            }
          } else {
            setIsUpdatingData(false);

            toast.error("Please enter valid price");
          }
        } else {
          setIsUpdatingData(false);

          toast.warn("Owner can't place a bid");
        }
      } else {
        setIsUpdatingData(false);

        toast.warn("Order expired");
      }
    } else {
      swichNetworkHandler(orderDetails.network);
      toast.warn(
        "Please switch network to " + networkDetails?.nativeCurrency?.name
      );
    }
  };

  const placeNormalBidBlockchainHandler = async () => {
    if (orderDetails.network && chainId == orderDetails.network) {
      if (
        !isOrderExpired &&
        orderExtraDeails.seller.toLowerCase() !== deadAddress.toLowerCase()
      ) {
        if (orderExtraDeails.seller.toLowerCase() !== account.toLowerCase()) {
          setIsSubmit(true);
          if (parseFloat(price) > 0) {
            const checkPrice =
              bidExtraDetails && bidList.length > 0
                ? parseFloat(price) > parseFloat(bidList[0].price)
                : true;
            if (checkPrice) {
              try {
                setIsUpdatingData(true);

                const OpenMarketplace = getNormalMarketplaceContractAddress(
                  orderDetails.network
                );
                const contractObj = getContract(
                  OpenMarketplace,
                  NormalMarketplaceABI,
                  library,
                  account
                );

                if (
                  orderExtraDeails?.currency !=
                    payableTokenAddewssBinanceBNBLazy &&
                  orderExtraDeails?.currency !=
                    payableTokenAddewssEthereunETHLazy
                ) {
                  const acceptedToken = orderExtraDeails?.currency;

                  const contractApp = getContract(
                    acceptedToken,
                    IERC20ABI,
                    library,
                    account
                  );

                  const balanceOf = await contractApp.balanceOf(account);

                  const balanceOfInETH = ethers.utils.formatEther(
                    balanceOf.toString()
                  );
                  if (parseFloat(price) <= parseFloat(balanceOfInETH)) {
                    const isApproved = await checkAllowanceHandler(
                      contractApp,
                      OpenMarketplace,
                      price
                    );
                    console.log("isApproved", isApproved);

                    if (!isApproved) {
                      const appRes = await contractApp.approve(
                        OpenMarketplace,
                        approveAmount
                      );
                      await appRes.wait();
                    }

                    const safePlaceBid = await contractObj.safePlaceBid(
                      orderDetails?.collectionId[0]?.contractAddress,
                      orderDetails.nftId[0].tokenId,
                      ethers.utils.parseEther(price.toString()),
                      moment(expiryDate).unix()
                    );

                    await safePlaceBid.wait();
                    createBidHanlder();
                  } else {
                    toast.error("Your wallet balance is too low");
                    setOpenPlaceBid(false);
                    setIsUpdatingData(false);
                  }
                } else {
                  const web3 = await getWeb3Obj(networkDetails.rpcUrls[0]);
                  const balanceOf = await web3.eth.getBalance(account);

                  const balanceOfInETH = ethers.utils.formatEther(
                    balanceOf.toString()
                  );

                  if (parseFloat(price) < parseFloat(balanceOfInETH)) {
                    const safePlaceBid = await contractObj.safePlaceBid(
                      orderDetails?.collectionId[0]?.contractAddress,
                      orderDetails.nftId[0].tokenId,
                      ethers.utils.parseEther(price.toString()),
                      moment(expiryDate).unix(),
                      {
                        value: ethers.utils.parseEther(price.toString()),
                      }
                    );
                    await safePlaceBid.wait();
                    createBidHanlder();
                  } else {
                    toast.error("Your wallet balance is too low");
                    setOpenPlaceBid(false);
                    setIsUpdatingData(false);
                  }
                }
              } catch (error) {
                setIsUpdatingData(false);

                console.log("ERROR", error);
                toast.error(error.message);
              }
            } else {
              setIsUpdatingData(false);

              toast.error("Bid amount should be greater then last bid amount");
            }
          } else {
            setIsUpdatingData(false);

            toast.error("Please enter valid price");
          }
        } else {
          setIsUpdatingData(false);

          toast.warn("Owner can't place a bid");
        }
      } else {
        setIsUpdatingData(false);

        toast.warn("Order expired");
      }
    } else {
      swichNetworkHandler(orderDetails.network);
      toast.warn(
        "Please switch network to " + networkDetails?.nativeCurrency?.name
      );
    }
  };

  const createBidHanlder = async (bidSignature) => {
    try {
      const res = await axios.post(
        apiConfig.createBid,
        {
          orderId: orderDetails._id,
          bid: price.toString(),
          price: parseFloat(price),
          date: moment(expiryDate).unix().toString(),
          bidSignature: bidSignature ? bidSignature : "NA",
        },
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      getNftDetails(orderDetails._id);
      if (res.data.statusCode === 200) {
        setIsUpdatingData(false);
        toast.success(res.data.responseMessage);
        setOpenPlaceBid(false);
        setPrice("");
      } else {
        toast.warn(res.data.responseMessage);
      }
    } catch (error) {
      setIsUpdatingData(false);

      toast.error(error.message);
    }
  };

  const cancelOrderHanlder = async () => {
    if (chainId == orderDetails.network) {
      setIsCancelOrderUpdating(true);
      try {
        const OpenMarketplace = getMarketplaceContractAddress(
          orderDetails.network
        );
        const contractObj = getContract(
          OpenMarketplace,
          LazyMarketPlaceABI,
          library,
          account
        );

        let cancelObj = signatureObject;
        cancelObj["signature"] = orderDetails?.nftId[0]?.tokenId;
        console.log("cancelObj", cancelObj);
        const res = await contractObj.cancelOrder(cancelObj);
        await res.wait();
        await cancelOrderAPIHanlder();
      } catch (error) {
        toast.error(error.message);
        setIsCancelOrderUpdating(false);
      }
    } else {
      swichNetworkHandler(orderDetails.network);
      toast.warn(
        "Please switch network to " + networkDetails?.nativeCurrency?.name
      );
    }
  };

  const cancelNormalOrderHanlder = async () => {
    if (chainId == orderDetails.network) {
      setIsCancelOrderUpdating(true);
      try {
        const OpenMarketplace = getNormalMarketplaceContractAddress(
          orderDetails.network
        );
        const contractObj = getContract(
          OpenMarketplace,
          NormalMarketplaceABI,
          library,
          account
        );
        const res = await contractObj.cancelOrder(
          orderDetails?.collectionId[0]?.contractAddress,
          orderDetails.nftId[0].tokenId
        );
        await res.wait();
        await cancelOrderAPIHanlder();
      } catch (error) {
        toast.error(error.message);
        setIsCancelOrderUpdating(false);
      }
    } else {
      swichNetworkHandler(orderDetails.network);
      toast.warn(
        "Please switch network to " + networkDetails?.nativeCurrency?.name
      );
    }
  };

  const cancelOrderAPIHanlder = async () => {
    try {
      const res = await axios.put(
        apiConfig.cancelOrder,
        {
          _id: orderDetails._id,
        },
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      getNftDetails(orderDetails._id);
      if (res.data.statusCode === 200) {
        toast.success(res.data.responseMessage);
        history.push("/profile");
      } else {
        toast.warn(res.data.responseMessage);
      }
      setIsCancelOrderUpdating(false);
    } catch (error) {
      toast.error(error.message);
      setIsCancelOrderUpdating(false);
    }
  };

  const cancelBidBlockchainhandler = async () => {
    if (chainId == orderDetails.network) {
      try {
        setCancelBidUpdating(true);
        const OpenMarketplace = getMarketplaceContractAddress(
          orderDetails.network
        );
        const contractObj = getContract(
          OpenMarketplace,
          LazyMarketPlaceABI,
          library,
          account
        );

        let cancelObj = signatureObject;
        cancelObj["signature"] = orderDetails?.nftId[0]?.tokenId;
        console.log("cancelObj", cancelObj);

        let bidObj = {
          // orderId: orderDetails?.nftId[0]?.tokenId,
          bidder: bidExtraDetails?.bidder,
          price: bidExtraDetails?.price,
          expiresAt: bidExtraDetails?.expiresAt,
          signature: bidExtraDetails?.signature,
        };

        console.log("bidObj", bidObj);

        const _verifyBid = await contractObj._verifyBid(bidObj);
        console.log("_verifyBid", _verifyBid);

        const res = await contractObj.cancelBid(cancelObj, bidObj);
        await res.wait();
        getNftDetails(orderDetails._id);
        toast.success("Cancelled successfully");
        cancelBidHanlder();
      } catch (error) {
        setCancelBidUpdating(false);
        toast.error(error.message);
      }
    } else {
      swichNetworkHandler(orderDetails.network);
      toast.warn(
        "Please switch network to " + networkDetails.nativeCurrency.name
      );
    }
  };

  const cancelNormalBidBlockchainhandler = async () => {
    if (chainId == orderDetails.network) {
      try {
        setCancelBidUpdating(true);
        const OpenMarketplace = getNormalMarketplaceContractAddress(
          orderDetails.network
        );
        const contractObj = getContract(
          OpenMarketplace,
          NormalMarketplaceABI,
          library,
          account
        );
        const res = await contractObj.cancelBid(
          orderDetails?.collectionId[0]?.contractAddress,
          orderDetails.nftId[0].tokenId
        );
        await res.wait();
        getNftDetails(orderDetails._id);
        cancelBidHanlder();
        // toast.success("Cancelled successfully");
      } catch (error) {
        setCancelBidUpdating(false);
        toast.error(error.message);
      }
    } else {
      swichNetworkHandler(orderDetails.network);
      toast.warn(
        "Please switch network to " + networkDetails.nativeCurrency.name
      );
    }
  };

  const cancelBidHanlder = async () => {
    try {
      const res = await axios.put(
        apiConfig.cancelBid + "?_id=" + bidList[0]._id,
        {},
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      getNftDetails(orderDetails._id);
      if (res.data.statusCode === 200) {
        toast.success(res.data.responseMessage);
      } else {
      }
      setCancelBidUpdating(false);
    } catch (error) {
      setIsUpdatingData(false);
      setCancelBidUpdating(false);

      toast.error(error.message);
    }
  };

  const resaleNFTHandler = async () => {
    setIsSubmit(true);
    if (chainId == orderDetails.network) {
      if (
        price !== "" &&
        payableToken != "select" &&
        parseFloat(price) > 0 &&
        user?.collectionList
      ) {
        try {
          const OpenMarketplace = getNormalMarketplaceContractAddress(
            orderDetails.network
          );

          setIsUpdatingData(true);

          if (
            await approveTokenHandler(
              orderDetails.nftId[0]?.tokenId.toString(),
              orderDetails?.collectionId[0]?.contractAddress,
              NftTokenABI,
              library,
              account,
              OpenMarketplace
            )
          ) {
            const payableTokenAddress = getPayableTokenContractAddress(
              orderDetails?.network,
              payableToken,
              "No"
            );
            if (
              await placeNormalOrderBlockchainHandler(
                OpenMarketplace,
                NormalMarketplaceABI,
                library,
                account,
                orderDetails?.collectionId[0]?.contractAddress,
                orderDetails.nftId[0]?.tokenId,
                price,
                expiryDate,
                orderDetails?.royalties,
                payableTokenAddress
              )
            ) {
              const placeres = await axios.put(
                apiConfig.editOrder,
                {
                  _id: orderDetails._id,
                  saleType: "ONSALE",
                  price: price,
                  expiryTime: moment(expiryDate).unix().toString(),
                  endTime: moment(expiryDate).unix().toString(),
                  collectionId: orderDetails?.collectionId[0]?._id,
                  isResale: true,
                },
                {
                  headers: {
                    token: sessionStorage.getItem("token"),
                  },
                }
              );
              if (placeres) {
                if (placeres && placeres.data.statusCode === 200) {
                  toast.success(placeres.data.responseMessage);
                  setIsSubmit(false);
                  setIsUpdatingData(false);
                  getNftDetails(orderDetails._id);
                  setOpenResale(false);
                  history.push("/profile");
                } else {
                  toast.error(placeres.data.responseMessage);
                  setIsUpdatingData(false);
                }
              } else {
                toast.error("Something went to wrong");
                setIsUpdatingData(false);
              }
            } else {
              toast.error("Something went to wrong");
              setIsUpdatingData(false);
            }
          } else {
            toast.error("Something went to wrong");
            setIsUpdatingData(false);
          }
        } catch (error) {
          toast.error(error.message);
          setIsUpdatingData(false);
        }
      } else {
        setIsUpdatingData(false);
        toast.error("Please enter valid data");
      }
    } else {
      swichNetworkHandler(orderDetails.network);
      toast.warn(
        "Please switch network to " + networkDetails?.nativeCurrency?.name
      );
    }
  };

  const acceptBidBlockchainHandler = async () => {
    console.log("bidExtraDetails", bidExtraDetails);
    if (chainId == orderDetails.network) {
      if (
        bidList.length > 0 &&
        bidList[0].price &&
        bidExtraDetails &&
        bidExtraDetails.bidder.toLowerCase() !== deadAddress.toLowerCase()
      ) {
        setIsUpdatingAcceptBid(true);
        try {
          if (orderExtraDeails.isNewColl) {
            const deployRes = await deployNewCollectionNFTHandler(true);
            if (!deployRes) {
              setIsUpdatingAcceptBid(false);
              toast.error("Something went to wrong");

              return;
            }
          }

          const OpenMarketplace = getMarketplaceContractAddress(
            orderDetails.network
          );
          const contractObj = getContract(
            OpenMarketplace,
            LazyMarketPlaceABI,
            library,
            account
          );

          const _verifyBid = await contractObj._verifyBid({
            bidder: bidExtraDetails?.bidder,
            price: bidExtraDetails?.price,
            expiresAt: bidExtraDetails?.expiresAt,
            signature: bidExtraDetails?.signature,
          });
          console.log("_verifyBid", _verifyBid);

          const res = await contractObj.acceptBid(signatureObject, {
            bidder: bidExtraDetails?.bidder,
            price: bidExtraDetails?.price,
            expiresAt: bidExtraDetails?.expiresAt,
            signature: bidExtraDetails?.signature,
          });
          await res.wait();
          if (orderExtraDeails.isNewColl) {
            toast.success("Transferred successfully");
            history.push("/profile");
          } else {
            acceptBidAPIHandler(true);
          }
        } catch (error) {
          setIsUpdatingAcceptBid(false);
          toast.error(error.message);
        }
      } else {
        toast.warn("Bid not found");
      }
    } else {
      swichNetworkHandler(orderDetails.network);
      toast.warn(
        "Please switch network to " + networkDetails?.nativeCurrency?.name
      );
    }
  };

  const acceptNormalBidBlockchainHandler = async () => {
    if (chainId == orderDetails.network) {
      if (
        bidList.length > 0 &&
        bidList[0].price &&
        bidExtraDetails &&
        bidExtraDetails.bidder.toLowerCase() !== deadAddress.toLowerCase()
      ) {
        setIsUpdatingAcceptBid(true);
        try {
          const OpenMarketplace = getNormalMarketplaceContractAddress(
            orderDetails.network
          );
          const contractObj = getContract(
            OpenMarketplace,
            NormalMarketplaceABI,
            library,
            account
          );
          const res = await contractObj.acceptBid(
            orderDetails?.collectionId[0]?.contractAddress,
            orderDetails.nftId[0].tokenId,
            ethers.utils.parseEther(bidList[0].price.toString())
          );
          await res.wait();
          acceptBidAPIHandler(false);
        } catch (error) {
          setIsUpdatingAcceptBid(false);
          toast.error(error.message);
        }
      } else {
        toast.warn("Bid not found");
      }
    } else {
      swichNetworkHandler(orderDetails.network);
      toast.warn(
        "Please switch network to " + networkDetails?.nativeCurrency?.name
      );
    }
  };

  const acceptBidAPIHandler = async (isAccept) => {
    try {
      const tokenId = await getTokenId(
        orderDetails.collectionId[0].contractAddress,
        isAccept ? LazyMarketPlaceABI : NftTokenABI,
        library,
        account
      );

      if (tokenId !== false) {
        const res = await axios({
          method: "post",
          url: apiConfig.sendOrderToUser,
          headers: {
            token: sessionStorage.getItem("token"),
          },
          data: {
            description: orderDetails.description,
            royalties: orderDetails.royalties,

            currentOwner: bidList[0].userId[0]._id,
            collectionId: orderDetails.collectionId[0]._id,
            orderId: orderDetails._id,
            userId: bidList[0].userId[0]._id,
            network: orderDetails.network,
            tokenId: tokenId,
          },
        });
        // getNftDetails(orderDetails._id);
        if (res.data.statusCode === 200) {
          if (isAccept) {
            // deleteOrderHandler();
          }
          toast.success(res.data.responseMessage);
          history.push("/profile");
        } else {
          toast.warn(res.data.responseMessage);
        }
      } else {
        toast.error("Something went to wrong");
      }
      setIsUpdatingAcceptBid(false);
    } catch (error) {
      setIsUpdatingAcceptBid(false);
      toast.error(error.message);
    }
  };

  const buyOrderBlockchainHandler = async () => {
    if (orderDetails.network && chainId == orderDetails.network) {
      if (
        !isOrderExpired &&
        orderExtraDeails.seller.toLowerCase() !== deadAddress.toLowerCase()
      ) {
        if (orderExtraDeails.seller.toLowerCase() !== account.toLowerCase()) {
          try {
            setIsUpdatingData(true);

            const OpenMarketplace = getMarketplaceContractAddress(
              orderDetails.network
            );

            const contractObj = getContract(
              OpenMarketplace,
              LazyMarketPlaceABI,
              library,
              account
            );

            if (
              true
              // orderExtraDeails?.currency != payableTokenAddewssBinanceBNB &&
              // orderExtraDeails?.currency != payableTokenAddewssEthereunETH
            ) {
              const acceptedToken = orderExtraDeails?.currency;

              const contractApp = getContract(
                acceptedToken,
                IERC20ABI,
                library,
                account
              );

              const balanceOf = await contractApp.balanceOf(account);

              const balanceOfInETH = ethers.utils.formatEther(
                balanceOf.toString()
              );
              if (
                parseFloat(orderDetails?.price) <= parseFloat(balanceOfInETH)
              ) {
                if (orderExtraDeails.isNewColl) {
                  const deployRes = await deployNewCollectionNFTHandler(false);
                  if (!deployRes) {
                    setIsUpdatingAcceptBid(false);
                    toast.error("Something went to wrong");
                    return;
                  }
                }

                const isApproved = await checkAllowanceHandler(
                  contractApp,
                  OpenMarketplace,
                  orderDetails?.price
                );
                console.log("isApproved", isApproved);

                if (!isApproved) {
                  const appRes = await contractApp.approve(
                    OpenMarketplace,
                    approveAmount
                  );
                  await appRes.wait();
                }

                const safeExecute = await contractObj.safeExecuteOrder(
                  signatureObject
                );
                await safeExecute.wait();
                if (orderExtraDeails.isNewColl) {
                  toast.success("Bought successfully");
                  history.push("/profile");
                } else {
                  await buyOrderHandler(true);
                }
              } else {
                checkWrappedHandler();
                // toast.error("Your wallet balance is too low");
                // setIsUpdatingData(false);
              }
            } else {
              const web3 = await getWeb3Obj(networkDetails.rpcUrls[0]);
              const balanceOf = await web3.eth.getBalance(account);

              const balanceOfInETH = ethers.utils.formatEther(
                balanceOf.toString()
              );

              if (
                parseFloat(orderDetails?.price) < parseFloat(balanceOfInETH)
              ) {
                const safeExecute = await contractObj.safeExecuteOrder(
                  signatureObject,
                  {
                    value: ethers.utils.parseEther(
                      orderDetails.price.toString()
                    ),
                  }
                );
                await safeExecute.wait();
                if (orderExtraDeails.isNewColl) {
                  toast.success("Bought successfully");
                  history.push("/profile");
                } else {
                  await buyOrderHandler(true);
                }
              } else {
                toast.error("Your wallet balance is too low");
              }
            }

            setIsUpdatingData(false);
          } catch (error) {
            setIsUpdatingData(false);
            console.log(error);
            toast.error(error.message);
          }
        } else {
          toast.warn("Owner can't buy it");
          setIsUpdatingData(false);
        }
      } else {
        toast.error("Order expired");
        setIsUpdatingData(false);
      }
    } else {
      swichNetworkHandler(orderDetails.network);
      toast.warn(
        "Please switch network to " + networkDetails?.nativeCurrency?.name
      );
    }
  };

  const buyNormalOrderBlockchainHandler = async () => {
    if (orderDetails.network && chainId == orderDetails.network) {
      if (
        !isOrderExpired &&
        orderExtraDeails.seller.toLowerCase() !== deadAddress.toLowerCase()
      ) {
        if (orderExtraDeails.seller.toLowerCase() !== account.toLowerCase()) {
          try {
            setIsUpdatingData(true);

            const OpenMarketplace = getNormalMarketplaceContractAddress(
              orderDetails.network
            );

            const contractObj = getContract(
              OpenMarketplace,
              NormalMarketplaceABI,
              library,
              account
            );

            if (
              orderExtraDeails?.currency != payableTokenAddewssBinanceBNBLazy &&
              orderExtraDeails?.currency != payableTokenAddewssEthereunETHLazy
            ) {
              const acceptedToken = orderExtraDeails?.currency;

              const contractApp = getContract(
                acceptedToken,
                IERC20ABI,
                library,
                account
              );

              const balanceOf = await contractApp.balanceOf(account);

              const balanceOfInETH = ethers.utils.formatEther(
                balanceOf.toString()
              );
              if (
                parseFloat(orderDetails?.price) <= parseFloat(balanceOfInETH)
              ) {
                const isApproved = await checkAllowanceHandler(
                  contractApp,
                  OpenMarketplace,
                  orderDetails?.price
                );
                console.log("isApproved", isApproved);

                if (!isApproved) {
                  const appRes = await contractApp.approve(
                    OpenMarketplace,
                    approveAmount
                  );
                  await appRes.wait();
                }
                const safeExecute = await contractObj.safeExecuteOrder(
                  orderDetails?.collectionId[0]?.contractAddress,
                  orderDetails.nftId[0].tokenId,
                  ethers.utils.parseEther(orderDetails.price.toString())
                );
                await safeExecute.wait();
                await buyOrderHandler(false);
              } else {
                toast.error("Your wallet balance is too low");
                setOpenPlaceBid(false);
                setIsUpdatingData(false);
              }
            } else {
              const web3 = await getWeb3Obj(networkDetails.rpcUrls[0]);
              const balanceOf = await web3.eth.getBalance(account);

              const balanceOfInETH = ethers.utils.formatEther(
                balanceOf.toString()
              );

              if (
                parseFloat(orderDetails?.price) < parseFloat(balanceOfInETH)
              ) {
                const safeExecute = await contractObj.safeExecuteOrder(
                  orderDetails?.collectionId[0]?.contractAddress,
                  orderDetails.nftId[0].tokenId,
                  ethers.utils.parseEther(orderDetails.price.toString()),
                  {
                    value: ethers.utils.parseEther(
                      orderDetails.price.toString()
                    ),
                  }
                );
                await safeExecute.wait();
                await buyOrderHandler(false);
              } else {
                toast.error("Your wallet balance is too low");
                setOpenPlaceBid(false);
              }
            }
            setIsUpdatingData(false);
          } catch (error) {
            setIsUpdatingData(false);
            console.log(error);
            toast.error(error.message);
          }
        } else {
          toast.warn("Owner can't buy it");
          setIsUpdatingData(false);
        }
      } else {
        toast.error("Order expired");
        setIsUpdatingData(false);
      }
    } else {
      swichNetworkHandler(orderDetails.network);
      toast.warn(
        "Please switch network to " + networkDetails?.nativeCurrency?.name
      );
    }
  };

  const buyOrderHandler = async (isAccept) => {
    try {
      const tokenId = await getTokenId(
        orderDetails?.collectionId[0]?.contractAddress,
        isAccept ? LazyMarketPlaceABI : NftTokenABI,
        library,
        account
      );

      if (tokenId !== false) {
        const res = await axios.post(
          apiConfig.buyOrder,
          {
            orderId: orderDetails._id,
            collectionId: orderDetails.collectionId[0]._id,
            description: orderDetails.description,
            royalties: orderDetails.royalties,
            currentOwner: user?.userData?._id,
            network: orderDetails.network,
            tokenId: tokenId,
          },
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        );
        getNftDetails(orderDetails._id);
        if (res.data.statusCode === 200) {
          if (isAccept) {
            // deleteOrderHandler();
          }
          toast.success(res.data.responseMessage);
          setOpenBuy(false);
          history.push("/profile");
        } else {
          toast.warn(res.data.responseMessage);
        }
      } else {
        toast.error("Something went to wrong");
      }
      setIsUpdatingData(false);
    } catch (error) {
      setIsUpdatingData(false);
      toast.error(error.message);
    }
  };

  const postReport = async () => {
    setIsSubmit(true);
    if (message !== "") {
      try {
        setIsUpdatingData(true);
        const res = await axios.post(
          apiConfig.createReports,
          {
            orderId: orderDetails._id,
            artist: orderDetails.currentOwner[0].name
              ? orderDetails.currentOwner[0].name
              : orderDetails.currentOwner[0].walletAddress,
            message,
          },
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        );
        setIsUpdatingData(false);

        if (res.data.statusCode === 200) {
          toast.success(res.data.responseMessage);
          setOpenReport(false);
        } else {
          toast.error(res.data.responseMessage);
        }
      } catch (error) {
        setIsUpdatingData(false);
        toast.error(error.message);
        console.log("ERROR", error);
      }
    }
  };

  const deployNewCollectionNFTHandler = async (isAccept) => {
    try {
      if (orderExtraDeails.isNewColl) {
        let NFTcontractAddress = "";
        await uploadContractHandler(
          orderDetails?.collectionId[0]?.displayName,
          orderDetails?.collectionId[0]?.symbol,
          orderDetails?.collectionId[0]?.shortURL,
          "null",
          account,
          (result) => {
            NFTcontractAddress = result;
          }
        );
        const body = new FormData();

        body.append("tokenName", orderDetails?.nftId[0]?.title);
        body.append("description", orderDetails?.nftId[0]?.description);
        body.append("image", orderDetails?.nftId[0]?.uri);
        const ipfsHash = await uploadNFTHandler(body, "", "uploadNFT");

        if (NFTcontractAddress && ipfsHash) {
          let createBody = {
            coverFile: orderDetails?.nftId[0]?.coverImage,
            imgFile: orderDetails?.nftId[0]?.mediaFile,
            uri: orderDetails?.nftId[0]?.uri,
            title: orderDetails?.nftId[0]?.title,
            categoryType: orderDetails?.nftId[0]?.itemCategory,
            collectionId: orderDetails?.collectionId[0]?._id,
            contractAddress: NFTcontractAddress,
            description: orderDetails?.nftId[0]?.description,
            currentOwner: isAccept
              ? bidList[0].userId[0].walletAddress
              : account,
            isDirectSale: false,
            isAuction: false,
            saleType: "ONSALE",
            orderType: "NONE",
            network: orderDetails?.nftId[0]?.network,
            royalties: orderDetails?.nftId[0]?.royalties,
            unlockableContent: orderDetails?.nftId[0]?.unlockableContent
              ? orderDetails?.nftId[0]?.unlockableContent
              : "NA",
            currentOwnerId: isAccept
              ? bidList[0].userId[0]._id
              : user?.userData?._id,
            mediaType: orderDetails?.nftId[0]?.mediaType,
          };
          if (
            await createNFTBlockchainHanlder(
              NFTcontractAddress,
              NftTokenABI,
              library,
              account,
              ipfsHash,
              orderDetails?.nftId[0]?.title,
              orderDetails?.nftId[0]?.royalties,
              orderDetails?.nftId[0]?.unlockableContent
                ? orderDetails?.nftId[0]?.unlockableContent
                : "NA"
            )
          ) {
            const tokenId = await getTokenId(
              NFTcontractAddress,
              NftTokenABI,
              library,
              account
            );

            let tokenIdN = parseInt(tokenId);

            const creRes = await axios({
              method: "post",
              url: apiConfig.sendOrderToUser,
              headers: {
                token: sessionStorage.getItem("token"),
              },
              data: {
                description: orderDetails.description,
                royalties: orderDetails.royalties,
                currentOwner: isAccept
                  ? bidList[0].userId[0]._id
                  : user?.userData?._id,
                collectionId: orderDetails.collectionId[0]._id,
                orderId: orderDetails._id,
                userId: isAccept
                  ? bidList[0].userId[0]._id
                  : user?.userData?._id,
                network: orderDetails.network,
                tokenId: tokenIdN.toString(),
              },
            });

            if (creRes && creRes.data.statusCode === 200) {
              const editColRes = await axios.put(
                apiConfig.editCollection,
                {
                  _id: orderDetails?.collectionId[0]?._id,
                  contractAddress: NFTcontractAddress,
                  isLazyMinting: false,
                },
                {
                  headers: {
                    token: sessionStorage.getItem("token"),
                  },
                }
              );

              if (editColRes && editColRes.data.statusCode === 200) {
                return true;
              } else {
                setIsUpdatingAcceptBid(false);
                if (editColRes) {
                  toast.error(editColRes.data.responseMessage);
                } else {
                }
                return false;
              }
            } else {
              setIsUpdatingAcceptBid(false);

              if (creRes) {
                toast.error(creRes.data.responseMessage);
              } else {
              }
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const deleteOrderHandler = async () => {
    try {
      const res = await axios.delete(apiConfig.deleteOrder, {
        params: {
          _id: orderDetails._id,
        },
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
    } catch (error) {}
  };

  const checkAllowanceHandler = async (
    contractERC,
    contractAddress,
    checkAmount
  ) => {
    try {
      const checkAllowance = await contractERC.allowance(
        account,
        contractAddress
      );
      const allowanceInETH = ethers.utils.formatEther(
        checkAllowance.toString()
      );
      console.log("allowanceInETH", allowanceInETH);
      return Number(allowanceInETH) >= Number(checkAmount);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(
        calculateTimeLeft(new Date(parseInt(orderDetails?.endTime) * 1000))
      );
    }, 1000);
    return () => clearTimeout(timer);
  });
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
                  <Typography
                    variant="h4"
                    title={orderDetails?.nftId[0]?.title}
                  >
                    {orderDetails?.nftId[0]?.title}
                  </Typography>

                  <Box>
                    <IconButton
                      style={{ color: "#fff" }}
                      size="small"
                      className="m-l-10"
                      onClick={() => setOpenMenu(!openMenu)}
                      ref={moreRef}
                    >
                      <FiMoreHorizontal />
                    </IconButton>
                  </Box>
                </Box>
                <Box mt={2}>
                  <Box mb={2}>
                    {!account && (
                      <Typography variant="h4">
                        Please Connect Your Wallet
                      </Typography>
                    )}
                    {orderExtraDeails?.nftAddress == deadAddress && (
                      <Typography variant="h4">NOT FOR SALE</Typography>
                    )}
                    {account &&
                      isCancelled &&
                      currentOwner &&
                      currentOwner.toLowerCase() != account.toLowerCase() && (
                        <Typography variant="h4" style={{ color: "red" }}>
                          Expired
                        </Typography>
                      )}
                  </Box>
                  <Grid container spacing={1}>
                    {account &&
                      orderExtraDeails &&
                      !isCancelled &&
                      orderExtraDeails.seller.toLowerCase() !==
                        account.toLowerCase() && (
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            fullWidth
                            onClick={() => setOpenBuy(true)}
                          >
                            Buy for ~ {orderDetails?.price}
                            {coinName}
                          </Button>
                        </Grid>
                      )}
                    {account &&
                      !isCancelled &&
                      orderExtraDeails &&
                      orderExtraDeails.seller.toLowerCase() !==
                        account.toLowerCase() && (
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            fullWidth
                            onClick={() => {
                              setIsUpdate(false);
                              setOpenPlaceBid(true);
                              setExpiryDate(
                                new Date(parseInt(orderDetails?.endTime) * 1000)
                              );
                            }}
                          >
                            PLACE A BID
                          </Button>
                        </Grid>
                      )}
                    {account &&
                      orderExtraDeails &&
                      bidList.length > 0 &&
                      orderExtraDeails.seller.toLowerCase() ===
                        account.toLowerCase() && (
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            fullWidth
                            onClick={() => {
                              if (
                                orderDetails?.collectionId[0]?.isLazyMinting &&
                                !orderDetails?.nftId[0]?.isResale
                              ) {
                                acceptBidBlockchainHandler();
                              } else {
                                acceptNormalBidBlockchainHandler();
                              }
                            }}
                            disabled={
                              isUpdatingAcceptBid ||
                              isCancelOrderUpdating ||
                              cancelBidUpdating ||
                              !account
                            }
                          >
                            Accept bid{" "}
                            {isUpdatingAcceptBid && <ButtonCircularProgress />}
                          </Button>
                        </Grid>
                      )}

                    {account &&
                      orderExtraDeails &&
                      orderExtraDeails.seller.toLowerCase() ===
                        account.toLowerCase() && (
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            fullWidth
                            onClick={() => {
                              if (
                                orderDetails?.collectionId[0]?.isLazyMinting &&
                                !orderDetails?.nftId[0]?.isResale
                              ) {
                                cancelOrderHanlder();
                              } else {
                                cancelNormalOrderHanlder();
                              }
                            }}
                            disabled={
                              isUpdatingAcceptBid ||
                              isCancelOrderUpdating ||
                              cancelBidUpdating ||
                              !account
                            }
                          >
                            Cancel order{" "}
                            {isCancelOrderUpdating && (
                              <ButtonCircularProgress />
                            )}
                          </Button>
                        </Grid>
                      )}

                    {account &&
                      orderDetails &&
                      currentOwner &&
                      isCancelled &&
                      currentOwner.toLowerCase() == account.toLowerCase() && (
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            fullWidth
                            onClick={() => {
                              setOpenResale(true);
                            }}
                            disabled={
                              isUpdatingAcceptBid ||
                              isCancelOrderUpdating ||
                              cancelBidUpdating ||
                              !account
                            }
                          >
                            Resale
                          </Button>
                        </Grid>
                      )}

                    {account &&
                      orderExtraDeails &&
                      bidExtraDetails &&
                      bidExtraDetails.bidder.toLowerCase() ===
                        account.toLowerCase() && (
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            fullWidth
                            onClick={() => {
                              if (
                                orderDetails?.collectionId[0]?.isLazyMinting &&
                                !orderDetails?.nftId[0]?.isResale
                              ) {
                                cancelBidBlockchainhandler();
                              } else {
                                cancelNormalBidBlockchainhandler();
                              }
                            }}
                            disabled={
                              isUpdatingAcceptBid ||
                              isCancelOrderUpdating ||
                              cancelBidUpdating ||
                              !account
                            }
                          >
                            Cancel Bid{" "}
                            {cancelBidUpdating && <ButtonCircularProgress />}
                          </Button>
                        </Grid>
                      )}

                    {/* {account &&
                      orderExtraDeails &&
                      orderExtraDeails.seller.toLowerCase() ===
                        account.toLowerCase() && (
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                          <Button
                            variant='contained'
                            size='small'
                            color='primary'
                            fullWidth
                            onClick={() => {
                              setIsUpdate(true);
                              setOpenPlaceBid(true);
                            }}
                            style={{ marginLeft: "10px !important" }}
                            disabled={
                              isUpdatingAcceptBid ||
                              isCancelOrderUpdating ||
                              cancelBidUpdating ||
                              !account
                            }
                          >
                            Update order
                          </Button>
                        </Grid>
                      )} */}
                  </Grid>
                </Box>
                {bidList.length > 0 && (
                  <Box className={classes.highBids}>
                    <Typography variant="h4">
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
                    <Typography variant="h4">Creator</Typography>
                    <Box className={classes.creColl}>
                      <figure
                        onClick={() => {
                          history.push({
                            pathname: "/author",
                            search: orderDetails.userId[0]._id,
                          });
                        }}
                      >
                        <img
                          src={
                            orderDetails.userId[0]?.profilePic
                              ? orderDetails.userId[0]?.profilePic
                              : "/images/onlycamimg.png"
                          }
                          alt=""
                        />
                      </figure>
                      <Typography variant="h4">
                        {" "}
                        <span
                          onClick={() => {
                            history.push({
                              pathname: "/author",
                              search: orderDetails.userId[0]._id,
                            });
                          }}
                        >
                          {orderDetails.userId[0].name
                            ? orderDetails.userId[0].name
                            : sortAddress(
                                orderDetails.userId[0].walletAddress
                              )}{" "}
                        </span>
                        <CopyToClipboard
                          text={orderDetails.userId[0].walletAddress}
                        >
                          <FaRegCopy
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => toast.info("Copied")}
                          />
                        </CopyToClipboard>
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
                    <Typography variant="h4">Collection</Typography>
                    <Box
                      className={classes.creColl}
                      onClick={() => {
                        history.push({
                          pathname: "/nft-collection",
                          search: orderDetails.collectionId[0]._id,
                        });
                      }}
                    >
                      <figure>
                        <img
                          src={
                            orderDetails.collectionId[0] &&
                            orderDetails.collectionId[0].collectionImage
                              ? orderDetails.collectionId[0].collectionImage
                              : "/images/onlycamimg.png"
                          }
                          alt=""
                        />
                      </figure>
                      <Typography variant="h4">
                        {" "}
                        {orderDetails.collectionId[0]?.displayName}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Grid lg={12}>
                <Box className={classes.headboxDuration} mt={3}>
                  <Box>
                    <Typography variant="h4">Price</Typography>
                    <Typography variant="h4">
                      {orderDetails?.price}&nbsp;{coinName}
                    </Typography>
                  </Box>
                  {parseFloat(orderDetails?.endTime) < moment().unix() ||
                  !orderDetails?.endTime ? (
                    <Typography variant="h4">Expired</Typography>
                  ) : (
                    <>
                      <Box>
                        <Typography variant="h4">Duration</Typography>
                        <Typography variant="h4">
                          {" "}
                          {timeLeft.days ? timeLeft.days && timeLeft.days : "0"}
                          d :
                          {timeLeft.hours
                            ? timeLeft.hours && timeLeft.hours
                            : "0"}
                          h :
                          {timeLeft.minutes
                            ? timeLeft.minutes && timeLeft.minutes
                            : "0"}
                          m :{" "}
                          {timeLeft.seconds
                            ? timeLeft.seconds && timeLeft.seconds
                            : "0"}
                          s
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
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
                      <img src="/images/onlycamimg.png" alt="" />
                    </figure>
                    <Box className={classes.name1}>
                      <Typography variant="h4">
                        {bidList[0].userId[0]?.name
                          ? bidList[0].userId[0]?.name
                          : sortAddress(
                              bidList[0].userId[0]?.walletAddress
                            )}{" "}
                        <CopyToClipboard
                          text={bidList[0].userId[0]?.walletAddress}
                        >
                          <FaRegCopy
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => toast.info("Copied")}
                          />
                        </CopyToClipboard>
                      </Typography>
                      {/* <Typography variant='h6'></Typography> */}
                      <Box className={classes.bidauction}>
                        <Box className={classes.bestbid}>
                          <Typography variant="h6">
                            Best bid &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </Typography>
                          <Typography variant="h4">
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
                            <Typography variant="h6">Status</Typography>
                            <Typography variant="h4">Order Expired</Typography>
                          </Box>
                        ) : (
                          <Box className={classes.auctionend}>
                            <Typography variant="h6">Acution End</Typography>
                            <Typography variant="h4">
                              {timeLeft.days
                                ? timeLeft.days && timeLeft.days
                                : "0"}
                              d :
                              {timeLeft.hours
                                ? timeLeft.hours && timeLeft.hours
                                : "0"}
                              h :
                              {timeLeft.minutes
                                ? timeLeft.minutes && timeLeft.minutes
                                : "0"}
                              m :{" "}
                              {timeLeft.seconds
                                ? timeLeft.seconds && timeLeft.seconds
                                : "0"}
                              s
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
              <Box className={classes.headbox} mt={3}>
                {orderDetails?.nftId[0]?.description &&
                  orderDetails?.nftId[0]?.description != "NA" && (
                    <Box className={classes.chain}>
                      <Typography variant="h4">Description</Typography>
                      <Typography
                        variant="h6"
                        style={{
                          wordBreak: "break-all",
                          color: "#fff",
                          paddingBottom: "8px",
                        }}
                      >
                        {orderDetails?.nftId[0]?.description}
                      </Typography>

                      <Typography variant="h4">Chain info</Typography>
                    </Box>
                  )}
                <TableContainer>
                  <Table>
                    <TableBody>
                      {orderDetails?.nftId[0]?.description &&
                        orderDetails?.nftId[0]?.description != "NA" && (
                          <TableRow className={classes.blockchain}></TableRow>
                        )}
                      <TableRow className={classes.contract}>
                        <TableCell>
                          <Typography variant="h6">
                            Contract Address :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h4">
                            {sortAddress(
                              orderDetails?.collectionId[0].contractAddress
                            )}{" "}
                            <CopyToClipboard
                              text={
                                orderDetails?.collectionId[0].contractAddress
                              }
                            >
                              <FaRegCopy
                                style={{
                                  cursor: "pointer",
                                }}
                                onClick={() => toast.info("Copied")}
                              />
                            </CopyToClipboard>
                          </Typography>
                        </TableCell>
                      </TableRow>

                      <TableRow className={classes.blockchain}>
                        <TableCell>
                          <Typography variant="h6">Blockchain :</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h4">
                            {networkDetails && networkDetails?.chainName}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow className={classes.blockchain}>
                        <TableCell>
                          {orderDetails?.collectionId[0].isLazyMinting ===
                            !true && (
                            <Typography variant="h6">Token Id :</Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography variant="h4">
                            {orderDetails?.collectionId[0].isLazyMinting ===
                              !true && (
                              <>
                                {orderDetails?.collectionId[0]
                                  .collectionType === "REGULAR" && (
                                  <>{orderDetails?.nftId[0].tokenId}</>
                                )}
                              </>
                            )}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              <MoreFromCollection
                classes={classes}
                orderId={orderId}
                collectionId={orderDetails?.collectionId[0]?._id}
                user={user}
                likeDislikeNftHandler={(id) => likeDislikeNftHandler(id)}
              />

              <Box>
                <Container>
                  {openPlaceBid && (
                    <Dialog
                      fullWidth="xs"
                      maxWidth="xs"
                      open={openPlaceBid}
                      onClose={() => setOpenPlaceBid(false)}
                      aria-labelledby="max-width-dialog-title"
                      disableBackdropClick={isUpdatingData}
                      disableEscapeKeyDown={isUpdatingData}
                    >
                      <DialogActions>
                        <IconButton
                          disabled={isUpdatingData}
                          onClick={() => setOpenPlaceBid(false)}
                          className={classes.customizedButton}
                        >
                          <GiCancel />
                        </IconButton>
                      </DialogActions>
                      <DialogContent className={classes.dialogContent1}>
                        <Typography variant="h2" className="modalTitle">
                          {isUpdate ? "Update Order" : "Place A Bid"}
                        </Typography>
                        {!isUpdate && (
                          <Typography variant="body2" component="small">
                            You are about to place a bid for{" "}
                            <b>{orderDetails.nftId[0].tokenName}</b> from{" "}
                            <span>
                              {orderDetails.userId[0].name
                                ? orderDetails.userId[0].name
                                : sortAddress(
                                    orderDetails.userId[0].walletAddress
                                  )}
                            </span>
                          </Typography>
                        )}

                        <Box>
                          <label style={{ fontSize: "16px" }}>
                            {isUpdate ? "Price" : "Your bid"}
                          </label>
                          <FormControl fullWidth className={classes.margin}>
                            <TextField
                              disabled={isUpdatingData}
                              type="number"
                              placeholder="0.124"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                              error={
                                !isUpdate &&
                                isSubmit &&
                                bidList.length > 0 &&
                                bidExtraDetails &&
                                parseFloat(price) <=
                                  parseFloat(bidList[0].price.toString())
                              }
                              helperText={
                                isSubmit && price === ""
                                  ? "Please enter value"
                                  : isSubmit &&
                                    !isUpdate &&
                                    bidList.length > 0 &&
                                    bidExtraDetails &&
                                    parseFloat(price) <=
                                      parseFloat(bidList[0].price.toString())
                                  ? "Bid amount should be gretter the higest bid amount"
                                  : ""
                              }
                            />
                          </FormControl>
                        </Box>

                        <Box mt={1}>
                          <label style={{ fontSize: "16px" }}>
                            Expiry Time
                          </label>
                          <FormControl fullWidth className={classes.margin}>
                            <DateTimePicker
                              disabled={isUpdatingData || !isUpdate}
                              value={expiryDate}
                              onChange={(date) => {
                                setExpiryDate(date);
                              }}
                              // animateYearScrolling
                              format="DD/MM/yyyy hh:mm"
                              minDate={new Date()}
                              maxDate={
                                !isUpdate &&
                                new Date(
                                  parseFloat(orderDetails.endTime) * 1000
                                )
                              }
                            />
                          </FormControl>
                        </Box>

                        <Box align="center" className="modal_button_div" mt={4}>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            className={classes.btnWidth}
                            mb={2}
                            disabled={isUpdatingData}
                            onClick={(e) => {
                              if (isUpdate) {
                                // updateOrderBlockchainHandler();
                              } else {
                                if (
                                  orderDetails?.collectionId[0]
                                    ?.isLazyMinting &&
                                  !orderDetails?.nftId[0]?.isResale
                                ) {
                                  placeBidBlockchainHandler();
                                } else {
                                  placeNormalBidBlockchainHandler();
                                }
                              }
                            }}
                          >
                            {isUpdate ? "Update Order" : "PLACE A BID"}{" "}
                            {isUpdatingData && <ButtonCircularProgress />}
                          </Button>
                        </Box>
                      </DialogContent>
                    </Dialog>
                  )}
                </Container>
                {openBuy && (
                  <Dialog
                    fullWidth="xs"
                    maxWidth="xs"
                    open={openBuy}
                    onClose={() => setOpenBuy(false)}
                    aria-labelledby="max-width-dialog-title"
                    disableBackdropClick={isUpdatingData}
                    disableEscapeKeyDown={isUpdatingData}
                  >
                    <DialogActions>
                      <IconButton
                        disabled={isUpdatingData}
                        onClick={() => setOpenBuy(false)}
                        className={classes.customizedButton}
                      >
                        <GiCancel />
                      </IconButton>
                    </DialogActions>
                    <DialogContent className={classes.dialogContent1}>
                      <Typography variant="h2" className="modalTitle">
                        Checkout
                      </Typography>
                      <Typography variant="body2" component="small">
                        You are about to purchase{" "}
                        <b>{orderDetails.nftId[0].tokenName}</b> from{" "}
                        <span>
                          {orderDetails.userId[0].name
                            ? orderDetails.userId[0].name
                            : sortAddress(orderDetails.userId[0].walletAddress)}
                        </span>
                      </Typography>

                      <Box>
                        <FormControl fullWidth className={classes.margin}>
                          <small>Price </small>

                          <Input
                            id="standard-adornment-amount"
                            value={orderDetails.price}
                            disabled={true}
                          />
                        </FormControl>
                      </Box>

                      <Box align="center" className="modal_button_div" mt={3}>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                          className={classes.btnWidth}
                          mb={1}
                          onClick={() => {
                            if (
                              orderDetails?.collectionId[0]?.isLazyMinting &&
                              !orderDetails?.nftId[0]?.isResale
                            ) {
                              buyOrderBlockchainHandler();
                            } else {
                              buyNormalOrderBlockchainHandler();
                            }
                          }}
                          disabled={isUpdatingData}
                        >
                          PROCCED TO PAYMENT{" "}
                          {isUpdatingData && <ButtonCircularProgress />}
                        </Button>
                        <Button
                          variant="contained"
                          size="large"
                          color="primary"
                          onClick={() => setOpenBuy(false)}
                          className={classes.btnWidth}
                          disabled={isUpdatingData}
                        >
                          CANCEL
                        </Button>
                      </Box>
                    </DialogContent>
                  </Dialog>
                )}

                {openSale && (
                  <Dialog
                    fullWidth="sm"
                    maxWidth="sm"
                    open={openSale}
                    onClose={() => setOpenSale(false)}
                    aria-labelledby="max-width-dialog-title"
                  >
                    <DialogActions>
                      <IconButton
                        onClick={() => setOpenSale(false)}
                        className={classes.customizedButton}
                      >
                        <GiCancel />
                      </IconButton>
                    </DialogActions>
                    <DialogContent className={classes.dialogContent1}>
                      <Typography variant="h2" className="modalTitle">
                        Put On Sale
                      </Typography>
                      <Box className="checktoggel">
                        <label style={{ padding: "0" }}>
                          Instant Sale Price
                        </label>
                        <Typography className="checktoggel2" component="div">
                          <Grid
                            component="label"
                            container
                            alignItems="center"
                            spacing={1}
                          >
                            <Grid item>
                              <AntSwitch name="checkedC" />
                            </Grid>
                          </Grid>
                        </Typography>
                        <small>
                          Enter the price for which the item will be instantly
                          sold.
                        </small>
                      </Box>
                      <Box mt={3}>
                        <FormControl fullWidth className={classes.margin}>
                          <Input
                            id="standard-adornment-amount"
                            placeholder="0.4"
                            endAdornment={
                              <InputAdornment position="end">
                                {" "}
                                <span style={{ color: "#039BE3" }}>
                                  {networkDetails &&
                                    networkDetails?.nativeCurrency?.symbol}
                                </span>{" "}
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </Box>

                      <Box align="center" className="modal_button_div" mt={4}>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                          onClick={() => setOpenBuy(false)}
                          className={classes.btnWidth}
                          mb={2}
                        >
                          Next step
                        </Button>
                        <Button
                          variant="contained"
                          size="large"
                          onClick={() => setOpenBuy(false)}
                          className={classes.btnWidth}
                        >
                          CANCEL
                        </Button>
                      </Box>
                    </DialogContent>
                  </Dialog>
                )}

                <Dialog
                  fullWidth="sm"
                  maxWidth="sm"
                  open={openResale}
                  onClose={() => setOpenResale(false)}
                  aria-labelledby="max-width-dialog-title"
                  disableBackdropClick={isUpdatingData}
                  disableEscapeKeyDown={isUpdatingData}
                >
                  <DialogActions>
                    <IconButton
                      onClick={() => setOpenResale(false)}
                      className={classes.customizedButton}
                    >
                      <GiCancel />
                    </IconButton>
                  </DialogActions>
                  <DialogContent className={classes.dialogContent1}>
                    <Typography variant="h2" className="modalTitle">
                      Resale NFT
                    </Typography>

                    <Box>
                      <label>Price</label>
                      <FormControl fullWidth className={classes.margin}>
                        <TextField
                          disabled={isUpdatingData}
                          type="number"
                          placeholder="0.124"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          error={
                            isSubmit && (price === "" || parseFloat(price) <= 0)
                          }
                          helperText={
                            isSubmit &&
                            (price === "" || parseFloat(price) <= 0) &&
                            "Please enter valid price"
                          }
                        />
                      </FormControl>
                    </Box>
                    <Box mt={1}>
                      <label>Select Payable Token</label>

                      <Box mt={2} mb={2}>
                        <FormControl
                          className={`${classes.formControl} createSelect`}
                          fullWidth
                        >
                          <Select
                            fullWidth
                            value={payableToken}
                            onChange={(e) => setPayableToken(e.target.value)}
                          >
                            {orderDetails?.network == ACTIVE_NETWORK_BNB && (
                              <MenuItem value={"OnlyCam"}>$ONLY</MenuItem>
                            )}
                            {orderDetails?.network == ACTIVE_NETWORK_BNB && (
                              <MenuItem value={"BNB"}>BNB</MenuItem>
                            )}
                            {orderDetails?.network == ACTIVE_NETWORK_BNB && (
                              <MenuItem value={"BUSD"}>BUSD</MenuItem>
                            )}

                            {orderDetails?.network == ACTIVE_NETWORK_ETH && (
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
                    <Box p={1}>
                      <FormControlLabel
                        title="NFT will expires in 6 months"
                        control={
                          <Checkbox
                            checked={isNonExpiring}
                            onChange={(e) => {
                              console.log("e.target.checked", e.target.checked);
                              setIsNonExpiring(e.target.checked);
                              if (e.target.checked) {
                                setExpiryDate(moment().add(6, "M"));
                              } else {
                                setExpiryDate(moment().add(1, "h"));
                              }
                            }}
                          />
                        }
                        label="Non Expiring"
                      />
                    </Box>
                    {!isNonExpiring && (
                      <Box mt={1}>
                        <label>Expiry Time</label>
                        <FormControl fullWidth className={classes.margin}>
                          <DateTimePicker
                            disabled={isUpdatingData}
                            value={expiryDate}
                            onChange={(date) => {
                              setExpiryDate(date);
                            }}
                            format="DD/MM/yyyy hh:mm"
                            minDate={new Date()}
                          />
                        </FormControl>
                      </Box>
                    )}

                    <Box align="center" className="modal_button_div" mt={4}>
                      <Button
                        disabled={isUpdatingData}
                        variant="contained"
                        color="secondary"
                        size="large"
                        className={classes.btnWidth}
                        mb={2}
                        onClick={resaleNFTHandler}
                      >
                        Submit
                        {isUpdatingData && <ButtonCircularProgress />}
                      </Button>
                    </Box>
                  </DialogContent>
                </Dialog>

                {openShare && (
                  <Dialog
                    maxWidth="xs"
                    open={openShare}
                    onClose={() => setOpenShare(false)}
                    aria-labelledby="max-width-dialog-title"
                    disableBackdropClick={isUpdatingData}
                    disableEscapeKeyDown={isUpdatingData}
                  >
                    <DialogActions>
                      <IconButton
                        onClick={() => setOpenShare(false)}
                        className={classes.customizedButton}
                      >
                        <GiCancel />
                      </IconButton>
                    </DialogActions>
                    <DialogContent>
                      <Box className="share_Box share_Box2 ">
                        <Typography veriant="h4"> Share this NFT</Typography>
                        <ShareSocialMedia url={window.location} />
                      </Box>
                    </DialogContent>
                  </Dialog>
                )}

                {openReport && (
                  <Dialog
                    fullWidth="sm"
                    maxWidth="sm"
                    open={openReport}
                    onClose={() => setOpenReport(false)}
                    aria-labelledby="max-width-dialog-title"
                  >
                    <DialogActions>
                      <IconButton
                        disabled={isUpdatingData}
                        onClick={() => setOpenReport(false)}
                        className={classes.customizedButton}
                      >
                        <GiCancel />
                      </IconButton>
                    </DialogActions>
                    <DialogContent>
                      <Typography variant="h4">
                        Why are you reporting?
                      </Typography>
                      <Typography variant="body2" component="span">
                        Describe why you think this item should be removed from
                        marketplace
                      </Typography>

                      <Box mt={2}>
                        <label style={{ paddingTop: "10px" }}>Message</label>
                        <TextField
                          fullWidth
                          type="text"
                          variant="outlined"
                          multiline
                          rows={4}
                          rowsMax={4}
                          placeholder="Tell us some details"
                          className={classes.textfildBorder}
                          onChange={(e) => setMessage(e.target.value)}
                          value={message}
                        />
                        {isSubmit && message === "" && (
                          <FormHelperText error>
                            Please enter message
                          </FormHelperText>
                        )}
                      </Box>
                      <Box align="center" className="modal_button_div" mt={4}>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                          onClick={() => postReport()}
                          className={classes.btnWidth}
                          mb={2}
                          disabled={isUpdatingData}
                        >
                          REPORT {isUpdatingData && <ButtonCircularProgress />}
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                          onClick={() => setOpenReport(false)}
                          className={classes.btnWidth}
                          disabled={isUpdatingData}
                        >
                          CANCEL
                        </Button>
                      </Box>
                    </DialogContent>
                  </Dialog>
                )}

                {openMenu && (
                  <Menu
                    anchorEl={moreRef.current}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    onClose={() => setOpenMenu(false)}
                    open={openMenu}
                    PaperProps={{ className: classes.menu }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    elevation={3}
                  >
                    <MenuItem>
                      <ListItemText
                        primary="Share"
                        onClick={() => setOpenShare(true)}
                      />
                    </MenuItem>
                    <MenuItem>
                      <ListItemText
                        primary="Report"
                        onClick={() => setOpenReport(true)}
                      />
                    </MenuItem>

                    {/* <MenuItem>
                      <ListItemText
                        primary='Put On Sale'
                        onClick={() => setOpenSale(true)}
                      />
                    </MenuItem> */}
                  </Menu>
                )}
                {isAmountConvertorOpen && (
                  <AmountConvertorModal
                    classes={classes}
                    open={isAmountConvertorOpen}
                    handelClose={() => setIsAmountConvertorOpen(false)}
                    currency={orderExtraDeails?.currency}
                    userWalletBalnce={userWalletBalnce}
                    orderDetails={orderDetails}
                    price={
                      price && Number(price) > 0 ? price : orderDetails?.price
                    }
                    getUserWalletBalance={getUserWalletBalance}
                  />
                )}
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
}
