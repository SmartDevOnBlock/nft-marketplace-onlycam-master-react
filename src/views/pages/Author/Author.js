import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  IconButton,
  List,
  ListItem,
  Hidden,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect, useContext } from "react";
import { FaTwitter } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { SiFacebook } from "react-icons/si";
import { FaTelegramPlane } from "react-icons/fa";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { GiCancel } from "react-icons/gi";
import Owned from "./Owned";
import OnSale from "./OnSale";
import { useLocation } from "react-router-dom";
import apiConfig from "src/connectors/config/ApiConfig";
import axios from "axios";
import { UserContext } from "src/context/User";
import ShareSocialMedia from "src/component/ShareSocialMedia";
import { sortAddress } from "src/utils";
import CopyToClipboard from "react-copy-to-clipboard";
import HelpIcon from "@material-ui/icons/Help";

import { toast } from "react-toastify";
import KYCDetails from "./KYCDetails";
import DataLoading from "src/component/DataLoading";
import ProfileNft from "./ProfileNft";
import Bio from "../Profile/Bio";
import Following from "../Activity/Following";
import DataNotFound from "src/component/DataNotFound";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import CancelIcon from "@material-ui/icons/Cancel";
import ReportIcon from "@material-ui/icons/Report";

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
    "@media(max-width:650px)": {
      display: "block",
      padding: "0 0px",
    },
  },
  btnhead: {
    display: "flex",
    marginTop: "-140px",
    alignItems: "center",
    "@media(max-width:650px)": {
      marginTop: "20px",
      marginBottom: "20px",
      padding: "0px",
    },
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
  btnhead1: {
    display: "flex",
    marginTop: "-140px",
    "@media(max-width:650px)": { marginTop: "20px", marginBottom: "20px" },
  },
  btnfollow3: {
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
}));

export default function Author() {
  const [openBuy, setOpenBuy] = useState(false);
  const [openPlaceBid, setOpenPlaceBid] = useState(false);
  const [tabview, setTabView] = useState("OnSale");
  const handleClose = () => {
    setOpenBuy(false);
  };
  const classes = useStyles();
  const user = useContext(UserContext);

  const [isActive, setActive] = useState(false);
  const location = useLocation();
  const [userId, setUserId] = useState();
  const [profileData, setProfileData] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [onOwnedCount, setOnOwnedCount] = useState([]);
  const [createdNftoCount, setCreatedNftoCount] = useState([]);
  const [likesCount, setLikesCount] = useState([]);
  const [onSaleList, setOnSaleList] = useState([]);
  const [kycId, setKycId] = useState();
  const [kycDetails, setKycDetails] = useState();
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (location.search && location.search.length > 0) {
      const ids = location.search.split("?");
      if (ids[1]) {
        setUserId(ids[1]);
      }
      const kid = location.hash.split("#");
      if (kid[1]) {
        setKycId(kid[1]);
      }
    }
  }, [location]);

  const getKycDetailsHandler = async () => {
    try {
      const res = await axios.get(apiConfig.viewKyc + kycId, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode == 200) {
        setKycDetails(res.data.result);

        setTabView("KYC");
      }
      console.log("res", res);
    } catch (error) {
      setKycDetails("");
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    if (kycId) {
      if (user?.isAdmin) {
        getKycDetailsHandler();
      } else {
        setTabView("OnSale");
      }
    } else {
      setTabView("OnSale");
    }
  }, [kycId, user?.isAdmin]);

  const getProfileHandler = async (id, cancelTokenSource) => {
    try {
      const res = await axios.get(apiConfig.getUserDetails + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
      });

      if (res.data.statusCode === 200) {
        setProfileData(res.data.result[0]);

        if (user.userData?._id) {
          const resArr = res.data?.result[0]?.followers.filter(
            (data) => data === user.userData._id
          );
          setIsFollowing(resArr.length > 0 ? true : false);
        }
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
      setIsLoadingData(false);
    } catch (error) {
      setIsLoadingData(false);

      console.log("ERROR", error);
    }
  };
  const userOwnedCountHAndler = async (id) => {
    try {
      const res = await axios.get(apiConfig.userOwendCount + id, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setOnOwnedCount(res.data.result);
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

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    if (userId) {
      getProfileHandler(userId, cancelTokenSource);
      userOnSaleCountHandler(userId, cancelTokenSource);
      userOwnedCountHAndler(userId);
      setCreatedNftoCountHandler(userId);
      getLikesHandler(userId);
    }
    return () => {
      cancelTokenSource.cancel();
    };
  }, [userId, user.userData]);

  const updateDatahandler = async () => {
    if (userId) {
      getProfileHandler(userId);
      userOnSaleCountHandler(userId);
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
          updateDatahandler(userId);
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

  return (
    <Box className={classes.root}>
      <Container>
        <figure className={classes.bannerimg}>
          <img
            src={
              profileData?.coverPic
                ? profileData?.coverPic
                : "/images/onlycamimg.png"
            }
          />
        </figure>
        <Box className={classes.headbox2}>
          <Box style={{ display: "flex", flexWrap: "wrap", zIndex: "99" }}>
            <Box
              style={{
                background:
                  "url(" +
                  `${
                    profileData?.profilePic
                      ? profileData?.profilePic
                      : "/images/bannerpic.png"
                  }` +
                  ")",
                backgroundColor: "#d7aaf0",
                borderRadius: "100%",
              }}
              className={classes.profileimg}
            ></Box>

            <Box className={classes.text1}>
              <Typography variant="h4">
                {profileData?.name ? profileData?.name : "-"}
                {profileData?.kycDetails?.kycStatus === "APPROVE" && (
                  <span>
                    <VerifiedUserIcon style={{ color: "green" }} />
                  </span>
                )}
              </Typography>
              <Typography variant="h5">{profileData?.userName}</Typography>

              {profileData?.kycDetails?.kycStatus === "PENDING" && (
                <span>
                  <ReportIcon style={{ color: "yellow" }} />
                </span>
              )}
              {/* {profileData?.kycDetails?.kycStatus !== "PENDING" &&
                profileData?.kycDetails?.kycStatus !== "REJECT" &&
                profileData?.kycDetails?.kycStatus !== "APPROVE" && (
                  <span>Not Apply</span>
                )} */}
              {profileData?.kycDetails?.kycStatus === "REJECT" && (
                <span>
                  <CancelIcon style={{ color: "red" }} />
                </span>
              )}

              <Box className={classes.address} mt={1}>
                <Typography variant="h3">
                  {sortAddress(profileData?.walletAddress)}&nbsp;
                </Typography>

                <CopyToClipboard text={profileData?.walletAddress}>
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
            </Box>
          </Box>
          <Box className={classes.btnhead1}>
            <Box
              className={classes.btnfollow3}
              // style={{ cursor: "pointer" }}
              // onClick={() => setOpenBuy(true)}
            >
              <Typography variant="h2">
                {profileData?.followersCount}
              </Typography>
              <Typography variant="h5">Followers</Typography>
            </Box>
            <Box
              // style={{ cursor: "pointer" }}
              className={classes.btnfollow3}
              // onClick={() => setOpenPlaceBid(true)}
            >
              <Typography variant="h2">
                {" "}
                {profileData?.followingCount}
              </Typography>
              <Typography variant="h5">Following</Typography>
            </Box>
          </Box>
          <Box className={classes.btnhead}>
            <Box className={classes.btnfollow}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => followUnfollowHandler(userId)}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </Box>
            <Box className="share_Box">
              <Box>
                <Box
                  className={isActive ? "toggel_box show" : "toggel_box hide"}
                >
                  Share link to this page
                  <ShareSocialMedia url={window.location} />
                </Box>
                <IconButton
                  className={classes.btnfollow2}
                  onClick={() => setActive(!isActive)}
                >
                  <img src="/images/share.png" alt="" width={20} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box my={3}>
          <Hidden mdUp>
            {" "}
            <Bio profileData={profileData} />
          </Hidden>
        </Box>

        <Box className={classes.btnbox1}>
          <Button
            variant="h6"
            className={tabview === "OnSale" ? "active" : ""}
            onClick={() => setTabView("OnSale")}
          >
            On sale
          </Button>
          <Button
            className={tabview === "Owned" ? "active" : " "}
            onClick={() => setTabView("Owned")}
          >
            Owned
          </Button>
          <Button
            className={tabview === "liked" ? "active" : ""}
            onClick={() => setTabView("liked")}
          >
            <Typography variant="h6">Liked</Typography>
          </Button>
          <Button
            className={tabview === "created" ? "active" : ""}
            onClick={() => setTabView("created")}
          >
            <Typography variant="h6"> Created</Typography>
          </Button>

          {user?.isAdmin && kycId && (
            <Button
              className={tabview === "KYC" ? "active" : " "}
              onClick={() => setTabView("KYC")}
            >
              KYC Details
            </Button>
          )}
        </Box>
        <hr
          style={{
            border: "1px solid rgba(255, 255, 255, 0.16)",
            marginTop: "8px",
          }}
        />
        <Grid container spacing={3}>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            {" "}
            <Hidden smDown>
              {" "}
              <Bio profileData={profileData} />
            </Hidden>
          </Grid>
          <Grid item md={9} sm={12} xs={12} lg={9}>
            {isLoadingData ? (
              <DataLoading />
            ) : (
              <Box mt={3}>
                {tabview === "Owned" ? (
                  <Owned onOwnedCount={onOwnedCount} />
                ) : (
                  ""
                )}
                {tabview === "OnSale" ? (
                  <OnSale
                    onSaleList={onSaleList}
                    userId={userId}
                    callbackFun={() => updateDatahandler()}
                  />
                ) : (
                  ""
                )}
                {tabview === "created" ? (
                  <OnSale
                    onSaleList={createdNftoCount}
                    callbackFun={() => updateDatahandler()}
                  />
                ) : (
                  ""
                )}
                {tabview === "liked" ? (
                  <OnSale
                    onSaleList={likesCount}
                    callbackFun={() => updateDatahandler()}
                  />
                ) : (
                  ""
                )}

                {tabview === "KYC" ? (
                  <KYCDetails
                    kycDetails={kycDetails}
                    getKycDetailsHandler={getKycDetailsHandler}
                  />
                ) : (
                  ""
                )}
              </Box>
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
                    {profileData?.followingCount === 0 && (
                      <Box style={{ padding: "0px 50px" }}>
                        <Typography
                          variant="h6"
                          style={{ color: "rgb(59, 13, 96)" }}
                        >
                          No data found
                        </Typography>
                      </Box>
                    )}
                    {profileData?.following &&
                      profileData?.following?.map((data, i) => {
                        return (
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            key={i}
                            className="walletSet "
                          >
                            <Following data={data} type="timing" index={i} />
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
                  onClick={handleClose}
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
                    {profileData?.followerDetails === 0 && (
                      <Box style={{ padding: "0px 50px" }}>
                        <Typography
                          variant="h6"
                          style={{ color: "rgb(59, 13, 96)" }}
                        >
                          No data found
                        </Typography>
                      </Box>
                    )}
                    {profileData?.followerDetails &&
                      profileData?.followerDetails?.map((data, i) => {
                        return (
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            key={i}
                            className="walletSet "
                          >
                            <Following data={data} type="timing" index={i} />
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
