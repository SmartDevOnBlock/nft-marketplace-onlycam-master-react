import React, { useEffect, useState, useContext } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Dialog,
  // DialogContent,
  Button,
  Hidden,
  withStyles,
  IconButton,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import Warning from "src/component/Warning";
import { GiCancel } from "react-icons/gi";
// import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { UserContext } from "src/context/User";
import ConnectWallet from "src/component/ConnectWallet";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    position: "relative",
    backgroundPosition: "center bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    padding: "150px 0px 50px",
    paddingBottom: "100px",
    overflow: "hidden",
    [theme.breakpoints.down("md")]: {
      padding: "70px 0px 50px",
    },
  },

  marginleft: {
    marginLeft: "10px !important",
  },

  textsection: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "40px",
    lineHeight: "130%",
    color: "#3B0D60",
    paddingTop: "80px",
    [theme.breakpoints.down("md")]: {
      fontSize: "28px",
      lineHeight: "36px",
    },
    "& span": {
      fontSize: "40px",
      color: "#D200A5",
      [theme.breakpoints.down("md")]: {
        fontSize: "28px",
        lineHeight: "36px",
      },
    },
  },
  subtext: {
    paddingTop: "10px",
    "& h5": {
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "18px",
      lineHeight: "130%",
      color: "#3B0D60",
    },
  },
  buttonright: {
    marginLeft: "10px !important",
    minWidth: "150px",
    borderRadius: "30px",
    border: "2px solid",
    "@media(max-width:350px)": {
      marginLeft: "0px !important",
      marginTop: ".5rem",
    },
  },
  buttonleft: {
    minWidth: "150px",
  },
  img3: { width: "100%" },
  img1: {
    position: "absolute",
    bottom: "24px",
    left: "-16px",
    // width: "100%",
    "@media (max-width: 1100px)": {
      bottom: "auto",
    },
  },
  img2: { paddingTop: "50px", width: "100%" },
  imgsection: { display: "flex" },
  dialogBox: {
    padding: "20px !important",
    "& h5": {
      color: "#3B0D60",
      fontSize: "20px",
    },
  },
  customizedButton: {
    fontSize: "20px",
    padding: "5px 10px 10px 0px",
    display: "flex",
    justifyContent: "end",
  },
  customizedButton1: {
    display: "flex !important",
    justifyContent: "end",
    "& div": {
      display: "flex !important",
    },
  },
  dailogOpen: {
    "& .MuiDialog-paperWidthMd": { maxWidth: "100%" },
  },
}));
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    overflow: "hidden !important",
  },
}))(MuiDialogContent);

export default function BestSeller() {
  const user = useContext(UserContext);
  const history = useHistory();
  const classes = useStyles();
  const [openwarning, setWarning] = useState(false);
  const [walletPopup, setWalletPopup] = useState(false);
  const [isOpenConnect, setIsOpenWallet] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isAdult") == "true") {
      setWarning(false);
    } else {
      setWarning(true);
    }
  }, []);
  useEffect(() => {
    if (user.walletData.status === "BLOCK") {
      toast.warn("You are blocked");
    }
  }, [user.walletData.status]);

  return (
    <Box className={classes.bannerBox}>
      <Container>
        <Grid container spacing={0}>
          <Grid item xs={12} md={5} lg={5} className={classes.gridflex}>
            <Box className="textbox">
              <Typography variant="body1" className={classes.textsection}>
                Discover, collect, create and sell your
                <span> Erotic NFTs!</span>
              </Typography>
              <Box className={classes.subtext}>
                <Typography variant="h5">
                  OnlyCam.art - bringing more power to adult content creators!
                </Typography>
              </Box>
              <Box mt={3}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  component={Link}
                  to="/auction"
                  className={classes.buttonleft}
                >
                  Auctions
                </Button>
                {user.walletData.status === "BLOCK" ? (
                  <Button
                    variant="outlined"
                    color="secondary"
                    component={Link}
                    to="/request-message"
                    className={classes.buttonright}
                  >
                    UnBlock Request
                  </Button>
                ) : (
                  <></>
                )}
                &nbsp;
                {!user?.isLogin && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.buttonright}
                    onClick={() => setIsOpenWallet(true)}
                  >
                    Become A Creator
                  </Button>
                )}
                {user?.isLogin && (
                  <>
                    {user?.kycStatusRes?.kycStatus == "APPROVE" ||
                    user?.isAdmin ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        component={Link}
                        to="/create-nft"
                        className={classes.buttonright}
                      >
                        Create
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="secondary"
                        className={classes.buttonright}
                        onClick={() => {
                          setWalletPopup(true);
                          // toast.warn("Please complte your KYC");
                        }}
                      >
                        Become A Creator
                      </Button>
                    )}
                  </>
                )}
                {/* <Button
                  variant="outlined"
                  color="secondary"
                  component={Link}
                  to="/create-nft"
                  className={classes.buttonright}
                >
                  Create
                </Button> */}
              </Box>
            </Box>
          </Grid>
          <Hidden smDown>
            <Grid item xs={12} md={7} lg={7}>
              <Box className={classes.imgsection}>
                <Box>
                  <img
                    src="/images/banner1.png"
                    alt="hgfs"
                    className={classes.img3}
                  />
                </Box>
                <Box position="relative">
                  <Box>
                    <img
                      src="/images/newopensea.png"
                      alt="dfe"
                      className={classes.img2}
                    />
                  </Box>
                  <Box>
                    <img
                      src="/images/banner3.png"
                      alt="dfght"
                      className={classes.img1}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Hidden>
          <Box></Box>
        </Grid>
      </Container>
      {openwarning && (
        <Dialog
          open={openwarning}
          onClose={() => {
            setWarning(false);
          }}
          maxWidth="sm"
        >
          <DialogContent style={{ overflow: "hidden" }}>
            <Warning
              onClose={() => {
                setWarning(false);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
      <Box>
        {walletPopup && (
          <Dialog
            open={walletPopup}
            onClose={() => setWalletPopup(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm"
            className={classes.dailogOpen}
          >
            <DialogContent
              style={{
                // width: "500px",
                overflow: "hidden",
                background: "#fff",
                borderRadius: "25px",
                padding: "10px !important",
              }}
            >
              <Box
                className={classes.customizedButton1}
                style={{ display: "flex !important" }}
              >
                <IconButton
                  onClick={() => setWalletPopup(false)}
                  className={classes.customizedButton}
                >
                  <GiCancel />
                </IconButton>
              </Box>
              <Box mb={2}>
                <Typography variant="h6">
                  We are required by law to verify content creators in our
                  platform due to the nature of our business. Please verify
                  below in order to become a creator.
                </Typography>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/become-creator")}
                >
                  Verify
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        )}
        {isOpenConnect && (
          <Dialog
            open={isOpenConnect}
            onClose={() => {
              setIsOpenWallet(false);
            }}
            maxWidth="sm"
          >
            <DialogContent>
              <ConnectWallet
                onClose={() => {
                  setIsOpenWallet(false);
                }}
              />
            </DialogContent>
          </Dialog>
        )}
      </Box>
    </Box>
  );
}
