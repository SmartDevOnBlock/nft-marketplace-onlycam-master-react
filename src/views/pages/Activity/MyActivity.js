import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useHistory } from "react-router-dom";
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
      height: "90px",
      width: "90px",
      overflow: "hidden",
      borderRadius: "100%",
      "& img": {
        maxHeight: "100%",
        // maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
        height: "90px",
        width: "90px",
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

export default function MyActivity(props) {
  const classes = useStyles();
  const { type, data, activityNFTList } = props;
  const history = useHistory();

  return (
    <Box>
      {activityNFTList &&
        activityNFTList.map((data, index) => {
          return (
            <Box className={classes.colorbox}>
              <Box className={classes.nftimg} style={{ cursor: "pointer" }}>
                {data?.type === "BID_CREATE" && (
                  <figure>
                    <img
                      src={data?.nftId?.coverImage}
                      alt=""
                      onClick={() => {
                        history.push({
                          pathname: "/nft",
                          search: data?.orderId?._id,
                        });
                      }}
                    />
                  </figure>
                )}
                {data?.type === "FOLLOW" && (
                  <figure>
                    <img
                      src={data?.userId?.profilePic}
                      alt=""
                      onClick={() => {
                        history.push({
                          pathname: "/author",
                          search: data?.followerId?._id,
                        });
                      }}
                    />
                  </figure>
                )}
                {data?.type === "UNFOLLOW" && (
                  <figure>
                    <img
                      src={data?.userId?.profilePic}
                      alt=""
                      onClick={() => {
                        history.push({
                          pathname: "/author",
                          search: data?.followerId?._id,
                        });
                      }}
                    />
                  </figure>
                )}
                {data?.type === "ORDER_SELL" && (
                  <figure>
                    <img
                      src={data?.nftId?.coverImage}
                      alt=""
                      onClick={() => {
                        history.push({
                          pathname: "/nft",
                          search: data?.orderId?._id,
                        });
                      }}
                    />
                  </figure>
                )}
                {data?.type === "LIKE" && (
                  <figure>
                    <img
                      src={data?.nftId?.coverImage}
                      alt=""
                      onClick={() => {
                        history.push({
                          pathname: "/nft",
                          search: data?.orderId?._id,
                        });
                      }}
                    />
                  </figure>
                )}
                {data?.type === "DISLIKE" && (
                  <figure>
                    <img
                      src={data?.nftId?.coverImage}
                      alt=""
                      onClick={() => {
                        history.push({
                          pathname: "/nft",
                          search: data?.orderId?._id,
                        });
                      }}
                    />
                  </figure>
                )}
                {/* {data?.type === "CREATE_COLLECTION" && (
                  <figure>
                    <img
                      src={data?.collectionId?.collectionImage}
                      alt=""
                      onClick={() => {
                        history.push({
                          pathname: "/nft",
                          search: data?.orderId?._id,
                        });
                      }}
                    />
                  </figure>
                )} */}
                {data?.type === "ORDER_CREATE" && (
                  <figure>
                    <img
                      src={data?.nftId?.coverImage}
                      alt=""
                      onClick={() => {
                        history.push({
                          pathname: "/nft",
                          search: data?.orderId?._id,
                        });
                      }}
                    />
                  </figure>
                )}
                {data?.type === "NFT_CREATE" && (
                  <figure>
                    <img
                      src={data?.nftId?.coverImage}
                      alt=""
                      onClick={() => {
                        history.push({
                          pathname: "/profile",
                          search: data?._id,
                        });
                      }}
                    />
                  </figure>
                )}
                {data?.type === "CREATE_COLLECTION" && (
                  <figure>
                    <img
                      src={data?.collectionId?.collectionImage}
                      alt=""
                      onClick={() => {
                        history.push({
                          pathname: "/nft-collection",
                          search: data?.collectionId?._id,
                        });
                      }}
                    />
                  </figure>
                )}
                {/* <figure>
                  <img src={data?.userId?.profilePic} alt="" />
                </figure> */}
              </Box>
              <Box className={classes.textbox} ml={2}>
                <Typography variant="h3">{data?.nftId?.tokenName}</Typography>
                <Typography variant="h3" style={{ textTransform: "lowercase" }}>
                  {data?.type} by {data?.userId?.name}
                </Typography>
                <Typography>{data?.updatedAt}</Typography>

                <Typography variant="h4">
                  {data?.orderId?.collectionId}
                </Typography>
                <Typography variant="h5">{data?.orderId?.updatedAt}</Typography>
              </Box>
            </Box>
          );
        })}
    </Box>
  );
}
