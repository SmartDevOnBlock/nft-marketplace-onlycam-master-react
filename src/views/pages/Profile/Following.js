import React from "react";
import { Typography, Box, makeStyles, Button } from "@material-ui/core";
import { sortAddress } from "src/utils";

const useStyles = makeStyles((theme) => ({
  NftImg: {
    borderRadius: 10,
    display: "block",
    miHeight: "300px",
    position: "relative",
  },
  bottomblock: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    padding: "0 !important",
  },
  bottomTop: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    margin: "10px 0 0",
  },
  playbutton: {
    position: "absolute",
    bottom: 5,
    right: 10,
  },
  //   Follow: {
  //     fontWeight: "500",
  //     fontSize: "15px",
  //     lineHeight: "22px",
  //     color: "#FFFFFF",
  //     width: "100px",
  //     background: " #0D8CCD",
  //   },
}));

export default function UsersCard(props) {
  const { data, followUnfollowHandler, userData } = props;
  const classes = useStyles();
  let isFollowing = false;
  if (userData) {
    const resArr = data.followers.filter((data) => data === userData._id);
    isFollowing = resArr.length > 0;
  }
  return (
    <Box className="CardBox following_cardBox">
      <Box className="User_card following_card">
        <Box className={classes.bottomblock}>
          <figure class="user_img following">
            <img
              class="rounded-circle"
              src={
                data?.profilePic ? data?.profilePic : "/images/onlycamimg.png"
              }
              alt=""
            />
            {/* <img src={data.check} className='check_icon2' /> */}
          </figure>
          <Box>
            <Typography variant="h5">
              {" "}
              {data.userName ? data.userName : sortAddress(data.walletAddress)}
            </Typography>
            <Typography variant="body2">
              {" "}
              {data?.followersCount} followers
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          size="medium"
          color="primary"
          className={classes.Follow}
          onClick={() => followUnfollowHandler(data._id)}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Box>
  );
}
