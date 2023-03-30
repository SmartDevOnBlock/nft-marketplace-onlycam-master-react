import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useContext } from "react";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { UserContext } from "src/context/User";

const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: "100px" },

  biobox: {
    padding: "30px 0px",
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "30px",
    marginTop: "26px",
    wordBreak: "break-all",
    "& h4": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "28px",
      lineHeight: "130%",
      color: "#FFFFFF",
    },
    "& h5": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#FFFFFF",
      paddingTop: "15px",
      // wordBreak: "break-all",
    },
  },
  conrnerBox: {
    width: "65px",
    height: "65px",
    background: "#3B0D60",
    borderRadius: "15px",
    color: "#D200A5",
    marginRight: "20px",
  },
  socialMediaIcon: {
    fontSize: "30px",
    color: "#C6BECC",
  },
}));

export default function Bio(props) {
  const { profileData } = props;
  const classes = useStyles();
  console.log("profileData", profileData);
  return (
    <>
      <Box className={classes.biobox}>
        <Container>
          <Typography variant="h4">Bio:</Typography>
          <Typography variant="h5">{profileData?.bio}</Typography>
        </Container>
      </Box>
      <Box className={classes.biobox}>
        <Container>
          <Typography variant="h4">Links:</Typography>
          {/* <Box style={{ display: "flex", paddingTop: "30px" }}> */}
          <Grid container spacing={1}>
            {profileData?.twitter && (
              <Grid item sm={6}>
                <a href={profileData?.twitter} target="_blank">
                  <Button className={classes.conrnerBox}>
                    <FaTwitter className={classes.socialMediaIcon} />
                  </Button>
                </a>
              </Grid>
            )}

            {profileData?.facebook && (
              <Grid item sm={6}>
                <a href={profileData?.facebook} target="_blank">
                  <Button className={classes.conrnerBox}>
                    <FaFacebookF className={classes.socialMediaIcon} />
                  </Button>
                </a>
              </Grid>
            )}

            {profileData?.youtube && (
              <Grid item sm={6}>
                <a href={profileData?.youtube} target="_blank">
                  <Button className={classes.conrnerBox}>
                    <FaYoutube className={classes.socialMediaIcon} />
                  </Button>
                </a>
              </Grid>
            )}

            {profileData?.telegram && (
              <Grid item sm={6}>
                <a href={profileData?.telegram} target="_blank">
                  <Button className={classes.conrnerBox}>
                    <FaTelegramPlane className={classes.socialMediaIcon} />
                  </Button>
                </a>
              </Grid>
            )}

            {profileData?.instagram && (
              <Grid item sm={6}>
                <a href={profileData?.instagram} target="_blank">
                  <Button className={classes.conrnerBox}>
                    <FaInstagram className={classes.socialMediaIcon} />
                  </Button>
                </a>
              </Grid>
            )}
          </Grid>
          {/* </Box> */}
        </Container>
      </Box>
    </>
  );
}
