import React from "react";
import { Typography, Box } from "@material-ui/core";
import moment from "moment";
import { sortAddress } from "src/utils";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles(() => ({}));
export default function MyActivityCard(props) {
  const { data, classes } = props;
  const history = useHistory();
  return (
    <Box className={classes.bidsDetails} mt={1}>
      <Box style={{ alignItems: "center", display: "flex" }}>
        <Box className={classes.profileimg}>
          <figure
            onClick={() => {
              history.push({
                pathname: "/author",
                search: data?.userId?._id,
              });
            }}
            style={{ cursor: "pointer" }}
          >
            <img
              src={
                data?.userId?.profilePic
                  ? data?.userId?.profilePic
                  : "/images/onlycmimg.png"
              }
              alt=""
            />
          </figure>
        </Box>
        <Box className={classes.price1}>
          <Typography variant="h5">
            {" "}
            {data.type === "CREATE_COLLECTION"
              ? data.collectionId.displayName
              : data?.nftId?.tokenName}
          </Typography>
          <Typography variant="h6">
            {data.type === "ORDER_CREATE"
              ? "Created by"
              : data.type === "LIKE" || data.type === "DISLIKE"
              ? data.type.toLowerCase() + "d by"
              : data.type === "NFT_CREATE"
              ? "created this NFT"
              : data.type === "SEND_NFT" ||
                data.type === "SEND_ORDER" ||
                data.type === "ORDER_SELL"
              ? "bought by"
              : data.type === "BID_CREATE"
              ? `palced a bid by`
              : data.type === "CREATE_COLLECTION"
              ? "added collection"
              : ""}
          </Typography>
          <Typography variant="h6">
            {" "}
            {data?.userId?.name
              ? data?.userId?.name.toUpperCase()
              : sortAddress(data?.userId?.walletAddress)}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.time}>
        <Typography variant="h6">
          {" "}
          {moment(data?.updatedAt).format("DD-MM-YYYY")}
        </Typography>
        <Typography variant="h6">
          {" "}
          {moment(data?.updatedAt).format("hh:mm A")}
        </Typography>
      </Box>
    </Box>
  );
}

export function FolloWUnfollowCard(props) {
  const { data, classes } = props;
  const history = useHistory();
  return (
    <Box className={classes.bidsDetails} mt={1}>
      <Box style={{ alignItems: "center", display: "flex" }}>
        <Box className={classes.profileimg}>
          <figure
            onClick={() => {
              history.push({
                pathname: "/author",
                search: data?.userId?._id,
              });
            }}
          >
            <img
              src={
                data.followerId.profilePic
                  ? data.followerId.profilePic
                  : "/images/onlycamimg.png"
              }
              alt=""
            />
          </figure>
        </Box>
        <Box className={classes.price1}>
          <Typography variant="h5">
            {" "}
            {data.followerId.name
              ? data.followerId.name
              : sortAddress(data.followerId.walletAddress)}
          </Typography>
          <Typography variant="h6">
            {" "}
            {data.type === "FOLLOW" ? "Followed by" : "Unfollowed by"} {` `}
          </Typography>
          <Typography variant="h6">
            {" "}
            {data.userId.name
              ? data.userId.name
              : sortAddress(data.userId.walletAddress)}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.time}>
        <Typography variant="h6">
          {" "}
          {moment(data?.updatedAt).format("DD-MM-YYYY")}
        </Typography>
        <Typography variant="h6">
          {" "}
          {moment(data?.updatedAt).format("hh:mm A")}
        </Typography>
      </Box>
    </Box>
  );
}
