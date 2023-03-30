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
} from "@material-ui/core";

import Button from "@material-ui/core/Button";

import { FaThumbsUp } from "react-icons/fa";
import { UserContext } from "src/context/User";
import { useHistory } from "react-router";
import { useWeb3React } from "@web3-react/core";
import {
  createCollectionAPIHanlder,
  createNFTHandler,
  getBase64,
  isUrlValid,
} from "src/services";
import {
  getNetworkDetails,
  networkList,
  ACTIVE_NETWORK_BNB,
  ACTIVE_NETWORK_ETH,
  bscApiKey,
  ethApiKey,
} from "src/constants";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import axios from "axios";
import { toast } from "react-toastify";
import { sortAddress, getContract } from "src/utils";

const useStyles = makeStyles((theme) => ({
  customizedButton: {
    position: "absolute",
    top: "-42px",
    right: "-9px",
    color: "#fff",
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

const CategoryButtons = [
  {
    name: "Erotic",
    startIcon: <i className="icon-palette"></i>,
  },
  {
    name: "Music",
    startIcon: <i className="icon-music"></i>,
  },
  {
    name: "Games",
    startIcon: <i className="icon-games"></i>,
  },
];

export default function ResellNFT() {
  const history = useHistory();
  const { account, chainId, library } = useWeb3React();
  const user = useContext(UserContext);
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [coverBlob, setCoverBlob] = useState("");
  const [coverFile, setCoverFile] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [propertyFirst, setpropertyFirst] = useState("");
  const [properySecond, setProperySecond] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState("Create Item");
  const [isLoading, setIsLoading] = useState(false);
  const [coverFileBase, setCoverFileBase] = useState("");
  // const [network] = useState(networkList[0]);
  const [royalties, setRoyalties] = useState("");
  const [unloackData, setUnloackData] = useState("");
  const [network, setNetwork] = useState({
    name: "select",
  });
  const [nftURL, setNftURL] = useState("");
  const [nftTokenId, setNftTokenId] = useState("");
  const [nftContractAddress, setNftContractAddress] = useState("");
  const [isContractValid, setIsContractValid] = useState(false);
  const [colImgBlob, setColImgBlob] = useState("");
  const [colImg, setColImg] = useState("");

  const [colBannerImage, setColBannerImage] = useState("");
  const [colBannerImageBlob, setColBannerImageBlob] = useState("");
  const [colBannerImageBase, setColBannerImageBase] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [collectionSymbol, setCollectionSymbol] = useState("");
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
        network?.name !== "select" &&
        title !== "" &&
        nftURL !== "" &&
        isUrlValid(nftURL) &&
        nftTokenId !== "" &&
        selectedCategory !== "" &&
        coverFile !== "" &&
        collectionName !== "" &&
        colBannerImageBase !== "" &&
        colImg !== "" &&
        collectionSymbol !== "" &&
        nftContractAddress !== "" &&
        nftTokenId != "" &&
        isContractValid
      ) {
        setIsLoading(true);
        setTransactionStatus("Loading...");
        toast.warn("Please do not refresh the page");
        {
          setTransactionStatus("Uploading...");

          let advanceSettings = {
            propertyFirst: propertyFirst,
            properySecond: properySecond,
            // alternateText: alternateText,
          };

          try {
            let abi = undefined;
            let tokenURI = undefined;

            if (network.chainId == ACTIVE_NETWORK_ETH) {
              const abiRes = await axios.get(
                `https://api-kovan.etherscan.io/api?module=contract&action=getabi&address=${nftContractAddress}&apikey=${ethApiKey}`
              );
              if (abiRes.data.status == "1") {
                abi = JSON.parse(abiRes.data.result);
              } else {
                toast.error(abiRes.data.result);
              }
            }
            if (network.chainId == ACTIVE_NETWORK_BNB) {
              const abiRes = await axios.get(
                `https://api-testnet.bscscan.com/api?module=contract&action=getabi&address=${nftContractAddress}&apikey=${bscApiKey}`
              );
              if (abiRes.data.status == "1") {
                abi = JSON.parse(abiRes.data.result);
              } else {
                toast.error(abiRes.data.result);
              }
            }

            const contractObj = getContract(
              nftContractAddress,
              abi,
              library,
              account
            );

            const ownerOf = await contractObj.ownerOf(nftTokenId);

            try {
              tokenURI = await contractObj.tokenURI(nftTokenId);
            } catch (error) {
              toast.error("Please enter valid Token Id");
            }

            if (ownerOf == account && tokenURI) {
              const resResult = await createCollectionAPIHanlder(
                collectionName,
                collectionSymbol ? collectionSymbol : "NA",
                nftURL ? nftURL : "NA",
                colImg,
                nftContractAddress,
                "NA",
                "NA",
                network.chainId,
                colBannerImageBase,
                false,
                "createCollection"
              );

              if (
                resResult &&
                resResult.data.statusCode === 200 &&
                resResult.data?.result?._id
              ) {
                let createBody = {
                  coverFile: coverFileBase,
                  imgFile: coverFileBase, // ? coverFileBase : imgFileBase,
                  uri: nftURL,
                  title: title,
                  categoryType: selectedCategory,
                  collectionId: resResult.data?.result?._id,
                  contractAddress: nftContractAddress,
                  description: description,
                  currentOwner: account,
                  isDirectSale: false,
                  isAuction: false,
                  saleType: "ONSALE",
                  orderType: "NONE",
                  network: network.chainId,
                  royalties: royalties ? royalties.toString() : "0",
                  unlockableContent: unloackData ? unloackData : "NA",
                  currentOwnerId: user?.userData?._id,
                  mediaType: "image",
                };
                let tokenIdN = parseInt(nftTokenId);

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
                toast.error(resResult.data.responseMessage);
              }
            } else {
              if (ownerOf !== account) {
                toast.error("Not NFT owner");
              } else if (!tokenURI) {
                toast.error("Please enter valid Token Id");
              }
              toast.error(
                "Please enter valid NFT Contract Address or Token Id"
              );
            }
          } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
          }
        }
      } else {
        if (!isContractValid) {
          toast.error("Please enter valid NFT Contract Address or Token Id");
        } else {
          toast.warn("Please enter valid data ");
        }
      }
    } else {
      swichNetworkHandler();
      toast.warn("Please swich network to " + network.name);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    setIsContractValid(false);

    if (nftContractAddress && network.name != "select" && nftTokenId) {
      fetchContractData();
    }
    return () => {
      cancelTokenSource.cancel();
    };
  }, [nftContractAddress, network, account, nftTokenId]);

  const fetchContractData = async (cancelTokenSource) => {
    try {
      let abi = undefined;
      let tokenURI = undefined;
      if (network.chainId == ACTIVE_NETWORK_ETH) {
        const abiRes = await axios.get(
          `https://api-kovan.etherscan.io/api?module=contract&action=getabi&address=${nftContractAddress}&apikey=${ethApiKey}`,
          {
            cancelToken: cancelTokenSource && cancelTokenSource.token,
          }
        );
        if (abiRes.data.status == "1") {
          abi = JSON.parse(abiRes.data.result);
        } else {
          toast.error(abiRes.data.result);
        }
      }
      if (network.chainId == ACTIVE_NETWORK_BNB) {
        const abiRes = await axios.get(
          `https://api-testnet.bscscan.com/api?module=contract&action=getabi&address=${nftContractAddress}&apikey=${bscApiKey}`,
          {
            cancelToken: cancelTokenSource && cancelTokenSource.token,
          }
        );
        if (abiRes.data.status == "1") {
          abi = JSON.parse(abiRes.data.result);
        } else {
          toast.error(abiRes.data.result);
        }
      }
      if (abi && nftTokenId) {
        const contractObj = getContract(
          nftContractAddress,
          abi,
          library,
          account
        );

        const ownerOf = await contractObj.ownerOf(nftTokenId);

        try {
          tokenURI = await contractObj.tokenURI(nftTokenId);
        } catch (error) {
          toast.error("Please enter valid Token Id");
        }

        if (ownerOf == account && tokenURI) {
          setIsContractValid(true);
        } else {
          if (ownerOf !== account) {
            toast.error("Not NFT owner");
          } else if (!tokenURI) {
            toast.error("Please enter valid Token Id");
          }
          setIsContractValid(false);
        }
      } else {
        setIsContractValid(false);
      }
    } catch (error) {
      setIsContractValid(false);
      toast.error("Please enter valid NFT Contract Address or Token Id");
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    if (network.chainId) {
      swichNetworkHandler();
    }
  }, [network]);

  return (
    <Box className={classes.NftBreed}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} className="order1">
            <Box className={classes.boxsection}>
              <label style={{ color: "#3B0D60" }}>Preview</label>
              <Box
                className={classes.nftImg}
                style={{
                  background: `url(${
                    coverBlob !== "" ? coverBlob : "images/card/2.png"
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
                  &nbsp;&nbsp;
                  {user.userData && user?.userData?.name
                    ? user?.userData?.name
                    : sortAddress(user?.userData?.walletAddress)}
                </Typography>
              </Box>
              <Box className={classes.price3}>
                <Typography variant="h5">{price ? price : 0}</Typography>
                <Typography className={classes.likecount}>
                  &nbsp;&nbsp;
                  <IconButton>
                    <FaThumbsUp />
                  </IconButton>
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={8} className="order2">
            <Box mb={2} className={classes.mainBoxcreate}>
              <Grid container spacing={2} className="">
                <Grid item xs={12} sm={12} md={12}>
                  <Box className="cardCreate" mb={3}>
                    <label>Upload NFT cover Image</label>
                    <Box className="uploadBox">
                      <Typography variant="h6">
                        JPG, PNG, GIF Max 1mb.
                      </Typography>
                      <Typography variant="body2">
                        (1400 x 400 recommended)
                      </Typography>

                      <input
                        disabled={isLoading}
                        accept="image/*"
                        style={{ display: "none" }}
                        id="raised-button-file-cover"
                        multiple
                        type="file"
                        onChange={(e) => {
                          setCoverBlob(URL.createObjectURL(e.target.files[0]));
                          setCoverFile(e.target.files[0]);
                          getBase64(e.target.files[0], (result) => {
                            setCoverFileBase(result);
                          });
                        }}
                      />

                      <label htmlFor="raised-button-file-cover">
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
                                alt=""
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
                            variant="contained"
                            color="secondary"
                            component="span"
                          >
                            Choose File
                          </Button>
                        </Box>
                      </label>
                      {isSubmit && coverBlob === "" && (
                        <FormHelperText error>
                          Please select NFT cover image
                        </FormHelperText>
                      )}
                    </Box>
                  </Box>
                  <Box mt={3}>
                    <Box className="cardCreate" mb={3}>
                      <label>Select Blockchain</label>

                      <Box mt={2} mb={2}>
                        <FormControl
                          className={`${classes.formControl} createSelect`}
                        >
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            fullWidth
                            // value={network.name}
                            onChange={(e) => setNetwork(e.target.value)}
                            style={{
                              color: "#7E6196",
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
                                <MenuItem value={data}>{data.name}</MenuItem>
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
                      <label>NFT Contract Address</label>
                      <FormControl fullWidth className={classes.margin}>
                        <TextField
                          placeholder="Enter token symbol"
                          name="symbol"
                          value={nftContractAddress}
                          onChange={(e) =>
                            setNftContractAddress(e.target.value)
                          }
                          error={isSubmit && nftContractAddress === ""}
                          helperText={
                            isSubmit &&
                            nftContractAddress === "" &&
                            "Please enter address"
                          }
                        />
                      </FormControl>
                      <label>Token Id</label>
                      <FormControl fullWidth className={classes.margin}>
                        <TextField
                          disabled={isLoading}
                          value={nftTokenId}
                          onChange={(e) => setNftTokenId(e.target.value)}
                          error={isSubmit && title === ""}
                          inputProps={{ maxLength: 50 }}
                          helperText={
                            isSubmit &&
                            nftTokenId === "" &&
                            "Please enter Token Id"
                          }
                        />
                      </FormControl>
                      <label>NFT URL</label>
                      <FormControl fullWidth className={classes.margin}>
                        <TextField
                          disabled={isLoading}
                          value={nftURL}
                          onChange={(e) => setNftURL(e.target.value)}
                          error={
                            isSubmit && (nftURL === "" || !isUrlValid(nftURL))
                          }
                          helperText={
                            isSubmit &&
                            (nftURL === "" || !isUrlValid(nftURL)) &&
                            "Please enter NFT Image URL"
                          }
                        />
                      </FormControl>
                      <label>Item Category</label>
                      <Box mb={3} className={classes.FilterDiv}>
                        {CategoryButtons.map((data, i) => {
                          return (
                            <Button
                              disabled={isLoading}
                              key={i}
                              variant="contained"
                              color="secondary"
                              className={classes.button}
                              style={
                                data.name === selectedCategory
                                  ? {
                                      marginRight: "5px",
                                      backgroundColor: "#f30065",
                                      color: "white",
                                    }
                                  : {
                                      marginRight: "5px",
                                    }
                              }
                              startIcon={data.startIcon}
                              onClick={() => setSelectedCategory(data.name)}
                            >
                              {" "}
                              {data.name}
                            </Button>
                          );
                        })}
                        {isSubmit && selectedCategory == "" && (
                          <FormHelperText error>
                            Please select category
                          </FormHelperText>
                        )}
                      </Box>
                    </Box>
                  </Box>
                  <Box className="cardCreate" mb={3}>
                    <label>Upload Collection Image</label>
                    <Box className="uploadBox">
                      <Typography variant="h6">
                        JPG, PNG, GIF Max 1mb.
                      </Typography>
                      <Typography variant="body2">
                        (500 x 500 recommended)
                      </Typography>

                      <input
                        disabled={isLoading}
                        accept="image/*"
                        style={{ display: "none" }}
                        id="raised-button-file-col-cover"
                        multiple
                        type="file"
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            setColImgBlob(
                              URL.createObjectURL(e.target.files[0])
                            );
                            setColImg(e.target.files[0]);
                          }
                        }}
                      />

                      <label htmlFor="raised-button-file-col-cover">
                        {colImgBlob && (
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
                                  colImgBlob !== ""
                                    ? colImgBlob
                                    : "images/card/2.png"
                                }
                                alt=""
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
                            variant="contained"
                            color="secondary"
                            component="span"
                          >
                            Choose File
                          </Button>
                        </Box>
                      </label>
                      {isSubmit && colImgBlob === "" && (
                        <FormHelperText error>
                          Please select collection image
                        </FormHelperText>
                      )}
                    </Box>

                    <label>Upload Collection Banner Image</label>
                    <Box className="uploadBox">
                      <Typography variant="h6">
                        JPG, PNG, GIF Max 1mb.
                      </Typography>
                      <Typography variant="body2">
                        (1400 x 400 recommended)
                      </Typography>

                      <input
                        disabled={isLoading}
                        accept="image/*"
                        style={{ display: "none" }}
                        id="raised-button-file-col-banner"
                        multiple
                        type="file"
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            setColBannerImageBlob(
                              URL.createObjectURL(e.target.files[0])
                            );
                            setColBannerImage(e.target.files[0]);
                            getBase64(e.target.files[0], (result) => {
                              setColBannerImageBase(result);
                            });
                          }
                        }}
                      />

                      <label htmlFor="raised-button-file-col-banner">
                        {colBannerImageBlob && (
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
                                  colBannerImageBlob !== ""
                                    ? colBannerImageBlob
                                    : "images/card/2.png"
                                }
                                alt=""
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
                            variant="contained"
                            color="secondary"
                            component="span"
                          >
                            Choose File
                          </Button>
                        </Box>
                      </label>
                      {isSubmit && colBannerImageBlob === "" && (
                        <FormHelperText error>
                          Please select collection cover image
                        </FormHelperText>
                      )}
                    </Box>
                    <label>Collection Title</label>
                    <FormControl fullWidth className={classes.margin}>
                      <TextField
                        disabled={isLoading}
                        value={collectionName}
                        onChange={(e) => setCollectionName(e.target.value)}
                        error={isSubmit && collectionName === ""}
                        inputProps={{ maxLength: 50 }}
                        helperText={
                          isSubmit &&
                          collectionName === "" &&
                          "Please enter title"
                        }
                      />
                    </FormControl>
                    <label>Collection Symbol</label>
                    <FormControl fullWidth className={classes.margin}>
                      <TextField
                        disabled={isLoading}
                        value={collectionSymbol}
                        onChange={(e) => setCollectionSymbol(e.target.value)}
                        error={isSubmit && collectionSymbol === ""}
                        inputProps={{ maxLength: 16 }}
                        helperText={
                          isSubmit &&
                          collectionSymbol === "" &&
                          "Please enter symbol"
                        }
                      />
                    </FormControl>
                  </Box>

                  <Box className="cardCreate" mb={3}>
                    <Box mt={2}>
                      <Box>
                        <Box>
                          <Box mt={2}>
                            <label>NFT Title</label>
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
                              <label>NFT Description(Optional)</label>
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
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Box mt={4} className={classes.spacebtn}>
                      <Button
                        onClick={() => submitCreateNFTHanlder()}
                        variant="contained"
                        color="secondary"
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
      </Container>
    </Box>
  );
}
