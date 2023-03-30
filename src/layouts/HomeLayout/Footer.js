import React from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
  IconButton,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {} from "react-feather";
import { FaInstagram, FaMedium, FaTelegramPlane } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaRedditAlien } from "react-icons/fa";
import { useHistory, Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  footerSection: {
    background: "#241043",
    position: "relative",
    padding: "50px 0px",
    backgroundPosition: " bottom left",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(4),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(4),
    },
    // "&"
    "& h5": {
      fontWeight: "bold",
      fontSize: "16px",
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "#2f086a",
    },
    "& ul": {
      paddingLeft: "0",
    },
    "& p": {
      marginBottom: "0px",
      marginTop: "10px",
      fontWeight: "500",
      fontSize: "12px",
      lineHeight: "18px",
      color: "#000000",
    },
  },
  iconSetting: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
    flexWrap: "wrap",
  },
  conrnerBox: {
    width: "65px",
    height: "65px",
    background: "rgba(0, 0, 0, 0.2)",
    borderRadius: "15px",
    color: "#D200A5",
    [theme.breakpoints.down("md")]: {
      width: "55px",
      height: "55px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "45px",
      height: "45px",
      marginTop: ".5rem",
    },
  },
  socialMediaIcon: {
    fontSize: "30px",
    [theme.breakpoints.down("md")]: {
      fontSize: "25px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },
  boxfooter: {
    background:
      "linear-gradient(106.77deg, rgba(59, 13, 96, 0.4) 4.81%, rgba(129, 15, 148, 0.148) 98.47%)",
    backdropFilter: "blur(44px)",
    borderRadius: "30px",
    paddingBottom: "30px",
    marginTop: "30px",
  },
  imageBox: {
    border: "5px solid #E5E5E5",
    boxSizing: "border-box",
    borderRadius: "11px",
    marginTop: "-14px",
    background: "#fff",
    minHeight: "94px",
    minWidth: "94px",
    position: "absolute",
    right: "26px",
    textAlign: "center",
    // "@media(max-width: 380px)": {
    //   minWidth: "75px",
    //   minHeight: "75px",
    //   right: "7px",
    // },
  },
  BabyCornerBoxText: {
    paddingTop: "30px",
    "& h2": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "30px",
      lineHeight: "37px",
      textTransform: "capitalize",
      color: "#FFFFFF",
      [theme.breakpoints.down("sm")]: {
        fontSize: "16px",
      },
      "@media(max-width:380px)": {
        fontSize: "16px",
        marginTop: "55px",
      },
    },
    "& h6": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "17px",
      textTransform: "capitalize",
      color: "rgba(255, 255, 255, 0.4)",
    },
  },
  footerfeature: {
    "& h4": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "17px",
      textTransform: "capitalize",
      color: "#FFFFFF",
      paddingTop: "5px",
    },
    "& h6": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "17px",
      textTransform: "capitalize",
      color: "#FFFFFF",
      paddingTop: "10px",
      cursor: "pointer",
      "@media(max-width:375px)": {
        fontSize: "11px",
      },
    },
  },
  withtext: {
    width: "68%",
    paddingTop: "20px",
    "@media(max-width:375px)": {
      width: "100%",
    },
  },
}));

export default function Liquidity() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <Box
        className={classes.footerSection}
        style={{ backgroundImage: "url('./images/footerIMG.png')" }}
      >
        <Box
          style={{ margin: "20px 10px 0", position: "relative", zIndex: "2" }}
        >
          <Container>
            <Grid container justify="space-around" spacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Box>
                  <img
                    src="images/logo.png"
                    alt=""
                    style={{ paddingTop: "10px" }}
                  />
                </Box>
                <Box style={{ paddingTop: "25px" }}>
                  <Grid container>
                    <Grid item lg={4} md={4} sm={6} xs={6}>
                      <Box className={classes.footerfeature}>
                        <Typography variant="h4">Marketplace</Typography>
                        <Link to={"/auction"}>
                          <Typography variant="h6">Explore</Typography>
                        </Link>
                        {/* <Typography variant="h6">How it works</Typography> */}
                        <Typography
                          variant="h6"
                          style={{ cursor: "pointer" }}
                          onClick={() => history.push("/support")}
                        >
                          Support
                        </Typography>
                        <Typography
                          variant="h6"
                          onClick={() => history.push("/partner")}
                        >
                          Become a partner
                        </Typography>
                      </Box>
                    </Grid>
                    {/* <Grid item lg={4} md={4} sm={6} xs={6}>
                      <Box className={classes.footerfeature}>
                        <Typography variant="h4">Community</Typography>
                        <Typography variant="h6">RARI Token</Typography>
                        <Typography variant="h6">Discussion</Typography>
                        <Typography variant="h6">Voting</Typography>
                        <Typography variant="h6">Suggest feature</Typography>
                      </Box>
                    </Grid> */}
                    <Grid item lg={4} md={4} sm={6} xs={6}>
                      <Box className={classes.footerfeature}>
                        <Typography variant="h4">General</Typography>
                        <Typography
                          variant="h6"
                          onClick={() => history.push("/faq")}
                        >
                          Help Center
                        </Typography>
                        <Typography
                          variant="h6"
                          onClick={() => history.push("/term")}
                        >
                          Terms of Service
                        </Typography>
                        <Typography
                          variant="h6"
                          onClick={() => history.push("/privacy")}
                        >
                          Privacy Policy
                        </Typography>
                        <Typography
                          variant="h6"
                          onClick={() => history.push("/seller-buyer-privacy")}
                        >
                          Seller Buyer Policy
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Box className={classes.boxfooter}>
                  <Container>
                    <Box className={classes.imageBox}>
                      <img
                        src=" ./images/light.png"
                        alt=""
                        style={{ paddingTop: "20px" }}
                      />
                    </Box>
                    <Box className={classes.BabyCornerBoxText}>
                      <Typography variant="h2">Join our community</Typography>
                      <Box>
                        <Typography variant="h6" className={classes.withtext}>
                          Become an important part of our fast growing
                          community! Connect with the team and other investors
                          and users! Join Us Today And Together Let's Help
                          ONLYCAM Change The Adult Industry For The Better!
                        </Typography>
                      </Box>
                    </Box>
                    <Box className={classes.iconSetting}>
                      <Box>
                        <a
                          href={`https://t.me/onlycamofficial`}
                          target="_blank"
                        >
                          <IconButton className={classes.conrnerBox}>
                            <FaTelegramPlane
                              className={classes.socialMediaIcon}
                            />
                          </IconButton>
                        </a>
                      </Box>{" "}
                      &nbsp;&nbsp;
                      <Box>
                        <a href={`https://medium.com/@onlycam`} target="_blank">
                          <IconButton className={classes.conrnerBox}>
                            <FaMedium className={classes.socialMediaIcon} />
                          </IconButton>
                        </a>
                      </Box>{" "}
                      &nbsp;&nbsp;
                      <Box>
                        <a
                          href={`https://twitter.com/OnlyCamOfficial`}
                          target="_blank"
                        >
                          <IconButton className={classes.conrnerBox}>
                            <FaTwitter className={classes.socialMediaIcon} />
                          </IconButton>
                        </a>
                      </Box>{" "}
                      &nbsp;&nbsp;
                      <Box>
                        <a
                          href={`https://www.instagram.com/onlycam.art`}
                          target="_blank"
                        >
                          <IconButton className={classes.conrnerBox}>
                            <FaInstagram className={classes.socialMediaIcon} />
                          </IconButton>
                        </a>
                      </Box>{" "}
                    </Box>
                  </Container>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
}
