import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useHistory } from "react-router-dom";
import { sortAddress } from "src/utils";

const useStyles = makeStyles((theme) => ({
  heading: {
    "& h3": {
      color: theme.palette.secondary.main,
      fontSize: "40px",
      fontWeight: "700",
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
  nftimg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80px",
      width: "80px",
      overflow: "hidden",
      borderRadius: "100%",

      "& img": {
        maxHeight: "100%",
        // maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
      },
    },
  },
  colorbox: {
    display: "flex",
    alignItems: "center",
    marginTop: "16px",
    width: "100%",
    height: "auto",
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "15px",
    padding: "10px",
  },
  textbox: {
    "& h3": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "21px",
      color: "#D200A5",
    },
    "& h4": {
      marginTop: "3px",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "12px",
      lineHeight: "18px",
    },
    "& h5": {
      marginTop: "3px",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "12px",
      lineHeight: "18px",
      color: "#E4C3DE",
    },
  },
}));

export default function Following(props) {
  const { type, data, activityNFTList } = props;
  const history = useHistory();

  const classes = useStyles();
  return (
    <Box>
      <Grid container spacing={2}>
        {activityNFTList &&
          activityNFTList.map((data, index) => {
            return (
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <Box className={classes.colorbox}>
                  <Box
                    style={{ cursor: "pointer" }}
                    className={classes.nftimg}
                    onClick={() => {
                      history.push({
                        pathname: "/author",
                        search: data?.followerId?._id,
                      });
                    }}
                  >
                    <figure>
                      <img
                        src={
                          data?.followerId?.profilePic
                            ? data?.followerId?.profilePic
                            : "/images/onlycamimg.png"
                        }
                        alt=""
                      />
                    </figure>
                  </Box>
                  <Box className={classes.textbox} ml={2}>
                    <Typography variant="h5">
                      {" "}
                      {data?.followerId?.name
                        ? data?.followerId?.name
                        : sortAddress(data?.followerId?.walletAddress)}
                    </Typography>
                    <Typography variant="h4">
                      {data.type === "FOLLOW" ? "Followed by" : "Unfollowed by"}
                    </Typography>
                    <Typography
                      style={{ cursor: "pointer" }}
                      variant="h5"
                      onClick={() => {
                        history.push({
                          pathname: "/profile",
                          search: data?._id,
                        });
                      }}
                    >
                      {data?.userId?.name
                        ? data?.userId?.name
                        : sortAddress(data?.userId?.walletAddress)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}
