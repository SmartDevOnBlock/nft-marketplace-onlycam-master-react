import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  IconButton,
  Hidden,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useContext, useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { GiCancel } from "react-icons/gi";
import Following from "./Following";
import Bio from "./Bio";
import { UserContext } from "src/context/User";
import { sortAddress } from "src/utils";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import axios from "axios";
import apiConfig from "src/connectors/config/ApiConfig";
import DataNotFound from "src/component/DataNotFound";
import ProfileNft from "../Author/ProfileNft";
import NormalNFTCardList from "./NormalNFTList";
import DataLoading from "src/component/DataLoading";
import { FcApproval } from "react-icons/fc";
import { FcDisapprove } from "react-icons/fc";
import { useHistory } from "react-router-dom";

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
    display: "flex",
    alignItems: "center",
    "& h4": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "40px",
      lineHeight: "130%",
      display: "flex",
      alignItems: "center",
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
  whitebox: {
    background: "#FFFFFF",
    boxShadow: "0px 14px 24px rgba(210, 0, 165, 0.2)",
    borderRadius: "22px",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  hr: {
    margin: "0px 0px 0px 12.5px",
    // height: "40px",
    color: "rgba(0, 0, 0, 0.08)",
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
  file: {
    padding: "10px 10px 10px 10px",
    // background: "#FCF2FA",
    borderRadius: "50%",
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
      textAlign: "center",
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
  btnbox1: {
    marginTop: "1rem",
    "& h6": {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#987EAB",
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
  btnfollow2: {
    background: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(24px)",
    borderRadius: "22px",
    marginRight: "10px",
    padding: "15px 15px",
    "@media(max-width:818px)": {
      padding: "6px 16px",
    },
    "& h2": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "28px",
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

  headbox2: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 20px",
    marginBottom: "15px",
    "@media(max-width:767px)": {
      display: "block",
      padding: "0 10px",
    },
  },
  btnhead: {
    display: "flex",
    marginTop: "-140px",
    "@media(max-width:800px)": { marginTop: "20px", marginBottom: "20px" },
  },
  profileimg: {
    marginTop: "-140px",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "100% !important",
    backgroundRepeat: " no-repeat !important",
    background: "rgba(0 , 0, 0, 1)",
    width: "200px",
    height: "200px",
    borderRadius: "45px",
    zIndex: "1",
    "@media(max-width:800px)": {
      marginTop: "-35px",
      width: "95px",
      height: "95px",
      borderRadius: "25px",
      zIndex: 9,
    },
    "& img": {
      minHeight: "100%",
      minWidth: "100%",
      height: "auto",
      width: "auto",
      borderRadius: "50%",
    },
  },
  btnbox1: {
    "& button": {
      borderRadius: "10px",
      fontWeight: "600",
      fontSize: "14px",
      marginRight: "4px",
      "@media(max-width:767px)": {
        marginTop: "1rem",
      },
      "&.active": {
        color: "#fff",
        boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
        backgroundColor: "#D200A5",
      },
    },
  },

  FollowingBox: {
    overflowx: "scroll",
  },
  profileWallet: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    "& h3": {
      fontSize: "16px",
      "@media(max-width:800px)": { fontSize: "17px" },
    },
  },
}));

export default function Profile() {
  const classes = useStyles();
  const history = useHistory();
  const [openBuy, setOpenBuy] = useState(false);
  const user = useContext(UserContext);
  const [tabview, setTabView] = useState("all");
  const [likesCount, setLikesCount] = useState([]);
  const [onSaleList, setOnSaleList] = useState([]);

  const [followersCount, setFollowersCounts] = useState([]);
  const [followingCount, setFollowingCounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openPlaceBid, setOpenPlaceBid] = useState(false);
  const [bougthNftCount, setBougthNftCount] = useState([]);

  const [createdNftoCount, setCreatedNftoCount] = useState([]);

  const [normalNFTList, setNormalNFTList] = useState([]);
  const [allNftList, setAllNftList] = useState([]);
  const setBougthNftCountHandler = async (id) => {
    try {
      const res = await axios.get(apiConfig.userOwendCount + id, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });

      if (res.data.statusCode === 200) {
        setBougthNftCount(res.data.result);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const normalNFTListHandler = async (id) => {
    try {
      const res = await axios.get(apiConfig.listNFT, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        const dataList = res.data.result.filter(
          (data) =>
            data.isPlace == false &&
            data.collectionId[0]?.isLazyMinting == false &&
            data.isResale === false
        );

        setNormalNFTList(dataList);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const getLikesHandler = async (id) => {
    try {
      const res = await axios.get(apiConfig.userLikesCount + id, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode == 200) {
        setLikesCount(res.data.result);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const userOnSaleCountHandler = async (id, cancelTokenSource) => {
    try {
      const res = await axios.get(apiConfig.userOnSaleCount + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
      });

      if (res.data.statusCode === 200) {
        if (res.data.result.docs) {
          setOnSaleList(res.data.result.docs);
        } else {
          setOnSaleList([]);
        }
      } else {
        setOnSaleList([]);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const setCreatedNftoCountHandler = async (id) => {
    try {
      const res = await axios.get(apiConfig.userCreatedCount + id, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setCreatedNftoCount(res.data.result);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const userBuyAndCreatedListHandler = async (id) => {
    try {
      const res = await axios.get(apiConfig.userBuyAndCreatedList + id, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setAllNftList(res.data.result);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    updateDatahandler();
  }, [user?.userData._id]);

  const updateDatahandler = () => {
    if (user?.userData._id) {
      const id = user?.userData._id;
      setBougthNftCountHandler(id);
      getLikesHandler(id);
      userOnSaleCountHandler(id);
      setCreatedNftoCountHandler(id);
      getFollowersCountsApiData(id);
      getFollowingCountsApiData(id);
      userBuyAndCreatedListHandler(id);
      normalNFTListHandler();
      user.getProfileHandler(window.sessionStorage.getItem("token"));
    }
  };

  const getFollowersCountsApiData = async (id, cancelTokenSource) => {
    try {
      const res = await axios.get(apiConfig.userFollowerCount + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
      });

      if (res.status === 200) {
        setFollowersCounts(res.data.result);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const getFollowingCountsApiData = async (id, cancelTokenSource) => {
    try {
      const res = await axios.get(apiConfig.userFollowingCount + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
      });

      if (res.status === 200) {
        setFollowingCounts(res.data.result);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const followUnfollowHandler = async (id) => {
    if (user.isLogin) {
      try {
        const res = await axios.get(apiConfig.followUnfollow + id, {
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          toast.success(res.data.responseMessage);
          updateDatahandler();
        } else {
          toast.warn(res.data.responseMessage);
        }
      } catch (error) {
        console.log("ERRROR", error);
        toast.error(error.message);
      }
    } else {
      toast.warn("Please login");
    }
  };

  useEffect(() => {
    if (user?.walletData?.status === "BLOCK") {
      history.push("/request-message");
    }
  }, [user?.walletData?.status === "BLOCK"]);

  return (
    <Box className={classes.root}>
      <Container maxWidth="lg">
        <Box
          className={classes.bannerimg}
          // style={{
          //   background:
          //     "url(" +
          //     `${
          //       user?.userData?.coverPic
          //         ? user?.userData?.coverPic
          //         : "/images/onlycamimg.png"
          //     }` +
          //     ")",
          // }}
        >
          <img
            src={
              user?.userData?.coverPic
                ? user?.userData?.coverPic
                : "/images/bannerpic.png"
            }
            alt=""
          />
        </Box>
        <Box className={classes.headbox2}>
          <Box
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Box
              style={{
                background:
                  "url(" +
                  `${
                    user?.userData?.profilePic
                      ? user?.userData?.profilePic
                      : "/images/onlycamimg.png"
                  }` +
                  ")",
                backgroundColor: "#d7aaf0",
                borderRadius: "100%",
              }}
              className={classes.profileimg}
            ></Box>
            &nbsp;&nbsp;
            <Box className={classes.text1}>
              <Box>
                <Typography variant="h4">
                  {user?.userData?.name}
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#000",
                    }}
                  >
                    {user?.kycStatusRes?.kycStatus == "APPROVE" &&
                      user?.isAdmin && <FcApproval />}
                    {user?.kycStatusRes?.kycStatus == "PENDING" && (
                      <Typography
                        variant="h5"
                        style={{
                          marginLeft: "10px",
                          color: "#D200A5",
                          fontSize: "17px",
                        }}
                      >
                        ( KYC Pending )
                      </Typography>
                    )}
                    {user?.kycStatusRes?.kycStatus == "REJECT" && (
                      <Typography
                        variant="h5"
                        style={{
                          marginLeft: "10px",
                          color: "#D200A5",
                          fontSize: "17px",
                        }}
                      >
                        ( KYC Rejected )
                      </Typography>
                    )}
                  </span>
                </Typography>
                <Typography variant="h5">{user?.userData?.userName}</Typography>
              </Box>
              &nbsp;
              {user?.kycStatusRes?.kycStatus == "APPROVE" && (
                <>
                  <Typography variant="h4">
                    <FcApproval />
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      history.push({
                        pathname: "/creator-kyc",
                        search: user?.kycStatusRes?._id,
                        state: {
                          data: user?.kycStatusRes,
                        },
                      });
                    }}
                  >
                    View
                  </Button>
                </>
              )}
              {user?.kycStatusRes?.kycStatus == "PENDING" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    history.push({
                      pathname: "/creator-kyc",
                      search: user?.kycStatusRes?._id,
                      state: {
                        data: user?.kycStatusRes,
                      },
                    });
                  }}
                >
                  View
                </Button>
              )}
              {user?.kycStatusRes?.kycStatus == "REJECT" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    history.push({
                      pathname: "/creator-kyc",
                      search: user?.kycStatusRes?._id,
                      state: {
                        data: user?.kycStatusRes,
                      },
                    });
                  }}
                >
                  View
                </Button>
              )}
            </Box>
          </Box>

          <Box className={classes.btnhead}>
            <Box
              className={classes.btnfollow2}
              style={{ cursor: "pointer" }}
              onClick={() => setOpenBuy(true)}
            >
              <Typography variant="h2">
                {" "}
                {user?.userData?.followersCount}
              </Typography>
              <Typography variant="h5">Followers</Typography>
            </Box>
            <Box
              style={{ cursor: "pointer" }}
              className={classes.btnfollow2}
              onClick={() => setOpenPlaceBid(true)}
            >
              <Typography variant="h2">
                {" "}
                {user?.userData?.followingCount}
              </Typography>
              <Typography variant="h5">Following</Typography>
            </Box>
          </Box>
        </Box>
        <Box my={3}>
          <Hidden mdUp>
            <Bio profileData={user?.userData} />
          </Hidden>
        </Box>
        <Box className={classes.whitebox}>
          <Container>
            <Box className={classes.idtxt}>
              <Box className={classes.profileWallet}>
                <Typography variant="h3">id&nbsp;&nbsp;&nbsp;</Typography>
                <Typography variant="h3">
                  {sortAddress(user?.userData?.walletAddress)}&nbsp;
                </Typography>
                <Box className={classes.file}>
                  &nbsp;&nbsp;
                  <CopyToClipboard text={user?.userData?.walletAddress}>
                    <img
                      src="/images/file.png"
                      alt="hghgh"
                      style={{ cursor: "pointer" }}
                      onClick={() => toast.info("Copied")}
                    />
                  </CopyToClipboard>
                </Box>
              </Box>
              <Box className={classes.btnbox1}>
                <Button
                  className={tabview === "all" ? "active" : ""}
                  onClick={() => setTabView("all")}
                >
                  <Typography variant="h6">All</Typography>
                </Button>
                <Button
                  className={tabview === "created" ? "active" : ""}
                  onClick={() => setTabView("created")}
                >
                  <Typography variant="h6"> Created</Typography>
                </Button>
                <Button
                  className={tabview === "sale" ? "active" : ""}
                  onClick={() => setTabView("sale")}
                >
                  <Typography variant="h6">On sale</Typography>
                </Button>
                <Button
                  className={tabview === "bougth" ? "active" : ""}
                  onClick={() => setTabView("bougth")}
                >
                  <Typography variant="h6">Bought</Typography>
                </Button>
                <Button
                  className={tabview === "liked" ? "active" : ""}
                  onClick={() => setTabView("liked")}
                >
                  <Typography variant="h6">Liked</Typography>
                </Button>
                <Button
                  className={tabview === "normal_nft" ? "active" : ""}
                  onClick={() => setTabView("normal_nft")}
                >
                  <Typography variant="h6">Unlisted NFT</Typography>
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
        <Grid container spacing={3}>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Hidden smDown>
              {" "}
              <Bio profileData={user?.userData} />
            </Hidden>
          </Grid>

          <Grid item md={9} sm={12} xs={12} lg={9}>
            {isLoading ? (
              <DataLoading />
            ) : (
              <>
                <Box mt={3}>
                  <Grid container spacing={3}>
                    {tabview === "liked" ? (
                      <ProfileNft
                        nftList={likesCount}
                        callbackFun={() => updateDatahandler()}
                      />
                    ) : (
                      ""
                    )}
                    {tabview === "created" ? (
                      <ProfileNft
                        nftList={createdNftoCount}
                        callbackFun={() => updateDatahandler()}
                      />
                    ) : (
                      ""
                    )}
                    {tabview === "sale" ? (
                      <ProfileNft
                        nftList={onSaleList}
                        callbackFun={() => updateDatahandler()}
                      />
                    ) : (
                      ""
                    )}
                    {tabview === "bougth" ? (
                      <ProfileNft
                        nftList={bougthNftCount}
                        callbackFun={() => updateDatahandler()}
                      />
                    ) : (
                      ""
                    )}
                    {tabview === "all" ? (
                      <ProfileNft
                        nftList={allNftList}
                        callbackFun={() => updateDatahandler()}
                      />
                    ) : (
                      ""
                    )}
                    {tabview === "normal_nft" ? (
                      <NormalNFTCardList
                        nftList={normalNFTList}
                        callbackFun={() => updateDatahandler()}
                      />
                    ) : (
                      ""
                    )}
                  </Grid>
                </Box>
              </>
            )}
          </Grid>
        </Grid>
        <Box>
          {openPlaceBid && (
            <Dialog
              open={openPlaceBid}
              onClose={() => setOpenPlaceBid(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              classes={{ paper: classes.paper }}
              maxWidth="xs"
            >
              <DialogActions>
                <IconButton
                  onClick={() => setOpenPlaceBid(false)}
                  className={classes.customizedButton}
                >
                  <GiCancel />
                </IconButton>
              </DialogActions>
              <DialogContent className={classes.padding0}>
                <Box align="center" mb={5}>
                  <img src="images/Following.svg" />
                  <Typography variant="h5">Following</Typography>
                </Box>
                <Box className={classes.FollowingBox}>
                  <Grid container>
                    {followingCount?.followingCount === 0 && (
                      <Box style={{ padding: "0px 50px" }}>
                        <DataNotFound />
                      </Box>
                    )}
                    {followingCount?.following &&
                      followingCount?.following.map((data, i) => {
                        return (
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            key={i}
                            className="walletSet "
                          >
                            <Following
                              userData={user?.userData}
                              followUnfollowHandler={(id) =>
                                followUnfollowHandler(id)
                              }
                              data={data}
                              type="timing"
                              index={i}
                            />
                          </Grid>
                        );
                      })}
                  </Grid>
                </Box>
              </DialogContent>
            </Dialog>
          )}
        </Box>
        <Box>
          {openBuy && (
            <Dialog
              open={openBuy}
              onClose={() => setOpenBuy(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              classes={{ paper: classes.paper }}
              maxWidth="xs"
            >
              <DialogActions>
                <IconButton
                  onClick={() => setOpenBuy(false)}
                  className={classes.customizedButton}
                >
                  <GiCancel />
                </IconButton>
              </DialogActions>
              <DialogContent className={classes.padding0}>
                <Box align="center" mb={5}>
                  <img src="images/Following.svg" />
                  <Typography variant="h5">Followers</Typography>
                </Box>
                <Box className={classes.FollowingBox}>
                  <Grid container>
                    {followersCount?.followersCount === 0 && (
                      <Box style={{ padding: "0px 50px" }}>
                        <DataNotFound />
                      </Box>
                    )}
                    {followersCount?.followers &&
                      followersCount?.followers.map((data, i) => {
                        return (
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            key={i}
                            className="walletSet "
                          >
                            <Following
                              userData={user?.userData}
                              isFollowers={true}
                              followUnfollowHandler={(id) =>
                                followUnfollowHandler(id)
                              }
                              data={data}
                              type="timing"
                              index={i}
                            />
                          </Grid>
                        );
                      })}
                  </Grid>
                </Box>
              </DialogContent>
            </Dialog>
          )}
        </Box>
      </Container>
    </Box>
  );
}
